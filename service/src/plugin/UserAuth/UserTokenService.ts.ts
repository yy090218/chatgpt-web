import type { IBaseUserParam } from 'src/utils/device'
import { dbConn } from '../dbConn'
import type { IUserAuth } from './db'
import { UserAuth } from './db'
import type { OpenAIModel } from './helper'

/**
 * 获取 user_auth 表记录
 */
const getUserAuth = async ({ secretKey, ip, deviceId }: Partial<IBaseUserParam>) => {
  let paidUserToken = await UserAuth.findOne({ secretKey })

  if (!paidUserToken)
    paidUserToken = await UserAuth.findOne({ deviceId })

  if (!paidUserToken)
    paidUserToken = await UserAuth.findOne({ ip })

  return paidUserToken
}

/**
 * 判断当前 secretKey 是否有效（未过期、有余额）
 * 如果是付费用户，一般是提供一个 secretKey 即可
 * 如果是免费用户，则需要提供 ip、deviceId
 */
export async function authSecretKeyIsValid({ secretKey, ip, deviceId, agentHostName }: Partial<IBaseUserParam>): Promise<boolean> {
  if (!dbConn)
    return false

  const userAuthRecord = await getUserAuth({ secretKey, ip, deviceId })

  if (!secretKey && !userAuthRecord && +process.env.FREE_TOKENS) {
    if (!ip || !deviceId)
      return false

    await addAuthSecretKeyToDB({ ip, deviceId, model: 'gpt-3.5-turbo', agentHostName })
    return true
  }

  return !!(userAuthRecord && userAuthRecord.remainToken > 0)
}

/**
 * 向数据库中增加 key（免费或付费用户）。
 * 根据 secretKey 的存在与否判断用户类型。
 * 免费用户 tokenCount 取默认值
 */
export async function addAuthSecretKeyToDB({ secretKey, ip, deviceId, model, agentHostName, originalPrice = 0, salePrice = 0, tokenCount = +(process.env.FREE_TOKENS || 0) }: Partial<IBaseUserParam> & { model: OpenAIModel; originalPrice?: number; salePrice?: number; tokenCount?: number }): Promise<void> {
  if (!dbConn)
    return

  if (secretKey) {
    const newUserToken = new UserAuth({ secretKey, model, agentHostName, tokenCount, remainToken: tokenCount, isFree: false, originalPrice, salePrice })
    await newUserToken.save()
    return
  }

  if (!ip || !deviceId)
    return

  // 免费用户
  const newUserToken = new UserAuth({ ip, deviceId, model, agentHostName, tokenCount, remainToken: tokenCount, salePrice: 0, originalPrice: 0 })
  await newUserToken.save()
}

/**
 * 消费 token。
 * 如果 secretKey 传入，更新付费用户；否则更新免费用户。
 */
export async function consumeToken({ secretKey, ip, deviceId, consumedTokens, agentHostName }: IBaseUserParam & { consumedTokens: number }): Promise<void> {
  if (!dbConn)
    return

  // 创建一个事务 session
  const session = await dbConn.startSession()
  session.startTransaction()

  try {
    const userAuthRecord = await getUserAuth({ secretKey, ip, deviceId })
    userAuthRecord.remainToken -= consumedTokens
    userAuthRecord.ip = ip
    userAuthRecord.deviceId = deviceId
    userAuthRecord.agentHostName = agentHostName
    await userAuthRecord.save({ session })

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
 * 如果 secretKey 传入，查询付费用户；否则查询免费用户。
 */
export async function queryUserAuthRecord({ secretKey, ip, deviceId, agentHostName }: IBaseUserParam): Promise<IUserAuth | undefined> {
  if (!dbConn)
    return

  const isValid = await authSecretKeyIsValid({ secretKey, ip, deviceId, agentHostName })
  if (!isValid)
    return

  const userAuthRecord = await getUserAuth({ secretKey, ip, deviceId })
  return userAuthRecord
}
