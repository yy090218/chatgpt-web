import { dbConn } from '../dbConn'
import type { IUserAuth } from './db'
import { UserAuth } from './db'
import type { OpenAIModel } from './helper'

interface IUserIdParam { authSecretKey?: string; ip: string; deviceId: string }

/**
 * 判断当前 authSecretKey 是否有效（未过期、有余额）
 * 如果是付费用户，一般是提供一个 authSecretKey 即可
 * 如果是免费用户，则需要提供 ip、deviceId
 */
export async function authSecretKeyIsValid({ authSecretKey, ip, deviceId }: Partial<IUserIdParam>): Promise<boolean> {
  if (!dbConn)
    return false

  const paidUserToken = await UserAuth.findOne({ authSecretKey: { $elemMatch: { $in: authSecretKey ? [authSecretKey] : [ip, deviceId] } } })
  if (!authSecretKey && !paidUserToken && +process.env.FREE_TOKENS) {
    await addAuthSecretKeyToDB({ ip, deviceId, model: 'gpt-3.5-turbo' })
    return true
  }
  return !!(paidUserToken && paidUserToken.remainToken > 0)
}

/**
 * 向数据库中增加 key（免费或付费用户）。
 * 根据 authSecretKey 的存在与否判断用户类型。
 * 免费用户 tokenCount 取默认值
 */
export async function addAuthSecretKeyToDB({ authSecretKey, ip, deviceId, model, originalPrice = 0, salePrice = 0, tokenCount = +(process.env.FREE_TOKENS || 0) }: Partial<IUserIdParam> & { model: OpenAIModel; originalPrice?: number; salePrice?: number; tokenCount?: number }): Promise<void> {
  if (!dbConn)
    return

  if (authSecretKey) {
    const newUserToken = new UserAuth({ authSecretKey: [authSecretKey], model, tokenCount, remainToken: tokenCount, isFree: false, originalPrice, salePrice })
    await newUserToken.save()
    return
  }

  if (!ip || !deviceId)
    return

  // 免费用户
  const newUserToken = new UserAuth({ authSecretKey: [ip, deviceId], model, tokenCount, remainToken: tokenCount, salePrice: 0, originalPrice: 0 })
  await newUserToken.save()
}

/**
 * 消费 token。
 * 如果 authSecretKey 传入，更新付费用户；否则更新免费用户。
 */
export async function consumeToken({ authSecretKey, ip, deviceId, consumedTokens }: IUserIdParam & { consumedTokens: number }): Promise<void> {
  if (!dbConn)
    return

  // 创建一个事务 session
  const session = await dbConn.startSession()
  session.startTransaction()

  try {
    await UserAuth.findOneAndUpdate({ authSecretKey: { $elemMatch: { $in: authSecretKey ? [authSecretKey] : [ip, deviceId] } } }, { $inc: { remainToken: -consumedTokens } }, { session })

    // 提交事务
    await session.commitTransaction()
  }
  catch (error) {
    // 发生错误时，回滚事务
    await session.abortTransaction()
    throw error
  }
  finally {
    // 结束 session
    session.endSession()
  }
}

/**
 * 查询记录。
 * 如果 authSecretKey 传入，查询付费用户；否则查询免费用户。
 */
export async function queryUserAuthRecord({ authSecretKey, ip, deviceId }: IUserIdParam): Promise<IUserAuth | undefined> {
  if (!dbConn)
    return

  const isValid = await authSecretKeyIsValid({ authSecretKey, ip, deviceId })
  if (!isValid)
    return

  const record = await UserAuth.findOne({ authSecretKey: { $elemMatch: { $in: authSecretKey ? [authSecretKey] : [ip, deviceId] } } })
  return record
}
