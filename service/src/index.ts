import express from 'express'
import fetch from 'node-fetch'
import type { RequestProps } from './types'
import type { ChatMessage } from './chatgpt'
import { chatConfig, chatReplyProcess, currentModel } from './chatgpt'
import { auth } from './middleware/auth'
import { limiter } from './middleware/limiter'
import { getBaseHeaderInfo } from './utils/device'
import type { OpenAIModel } from './plugin/UserAuth'
import { addAuthSecretKeyToDB, authSecretKeyIsValid, consumeToken, generateAuthSecretKey, queryUserAuthRecord, updateUserBaseInfo } from './plugin/UserAuth'
import { isPermissionRequired } from './utils/auth'
import { calculateConsumedTokens } from './utils/calculateConsumedTokens'

const app = express()
const router = express.Router()

app.use(express.static('public'))
app.use(express.json())

app.all('*', (_, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'authorization, Content-Type')
  res.header('Access-Control-Allow-Methods', '*')
  next()
})

router.post('/chat-process', [auth, limiter], async (req, res) => {
  res.setHeader('Content-type', 'application/octet-stream')

  try {
    const { prompt, options = {}, systemMessage, temperature, top_p, model } = req.body as RequestProps

    // 校验
    if (!['gpt-3.5-turbo', 'gpt-4'].includes(model))
      throw new Error('GPT Model 错误 | GPT Model error.')

    let firstChunk = true
    const { data } = await chatReplyProcess({
      message: prompt,
      lastContext: options,
      process: (chat: ChatMessage) => {
        res.write(firstChunk ? JSON.stringify(chat) : `\n${JSON.stringify(chat)}`)
        firstChunk = false
      },
      systemMessage,
      temperature,
      top_p,
      model,
    }) as { data: ChatMessage }

    // 返回 usage 信息
    if (data?.detail?.usage?.total_tokens) {
      const accountInfo = await queryUserAuthRecord(getBaseHeaderInfo(req))
      const withBalanceData = { ...data, balance: 0 }

      if (accountInfo) {
        const baseHeaderInfo = getBaseHeaderInfo(req)
        const { usage } = data.detail

        // 计算提问、回答消耗 + 修改原始数据
        usage.prompt_tokens = calculateConsumedTokens({ ...baseHeaderInfo, model, consumedTokens: usage.prompt_tokens })
        usage.completion_tokens = calculateConsumedTokens({ ...baseHeaderInfo, model, consumedTokens: usage.completion_tokens })
        usage.total_tokens = usage.prompt_tokens + usage.completion_tokens

        await consumeToken({ ...getBaseHeaderInfo(req), consumedTokens: data.detail.usage.total_tokens })
        withBalanceData.balance = accountInfo.remainToken - data.detail.usage.total_tokens
      }

      res.write(firstChunk ? JSON.stringify(withBalanceData) : `\n${JSON.stringify(withBalanceData)}`)
    }
  }
  catch (error) {
    res.write(JSON.stringify(error))
  }
  finally {
    res.end()
  }
})

router.post('/config', auth, async (req, res) => {
  try {
    const response = await chatConfig()
    res.send(response)
  }
  catch (error) {
    res.send(error)
  }
})

router.post('/session', async (req, res) => {
  try {
    res.send({ status: 'Success', message: '', data: { auth: isPermissionRequired(), model: currentModel() } })
  }
  catch (error) {
    res.send({ status: 'Fail', message: error.message, data: null })
  }
})

router.post('/verify', async (req, res) => {
  if (!isPermissionRequired()) {
    res.send({ status: 'Fail', message: '网站不需要权限 | The website does not require permission', data: null })
    return
  }

  try {
    const { token } = req.body as { token: string }
    if (!token)
      throw new Error('密钥为空 | Secret key is empty')

    const isValid = await authSecretKeyIsValid({ secretKey: token, agentHostName: req.hostname })
    if (!isValid)
      throw new Error('密钥无效或余额不足 | The key is invalid or the balance is insufficient')

    // 在验证的时候更新 ip、deviceId、agentHostName 信息
    await updateUserBaseInfo({ ...getBaseHeaderInfo(req), secretKey: token })

    res.send({ status: 'Success', message: 'Verify successfully', data: null })
  }
  catch (error) {
    res.send({ status: 'Fail', message: error.message, data: null })
  }
})

/**
 * 获取账户信息
 */
router.get('/account-info', async (req, res) => {
  try {
    const response = isPermissionRequired() ? (await queryUserAuthRecord(getBaseHeaderInfo(req))) : null
    res.send({ status: 'Success', message: '', data: { remainToken: response?.remainToken ?? 0 } })
  }
  catch (error) {
    res.send(error)
  }
})

/**
 * 添加 AUTH_SECRET_KEY
 */
router.post('/add-auth-secret-key', async (req, res) => {
  if (!isPermissionRequired()) {
    res.send({ status: 'Fail', message: '网站不需要权限 | The website does not require permission', data: null })
    return
  }

  try {
    const { pwd, tokenCount, model, authSecretKeyCount, originalPrice, salePrice } = req.body as { pwd: string; tokenCount: number; model: OpenAIModel; authSecretKeyCount: string; originalPrice?: number; salePrice?: number }
    if (!pwd || !tokenCount || !authSecretKeyCount || pwd !== process.env.ADMIN_SECRET_KEY || +authSecretKeyCount < 0)
      throw new Error('密钥或 TOKEN 数量或 AUTH_SECRET_KEY 数量无效 | The number of keys or TOKEN amount or AUTH_SECRET_KEY quantity is invalid.')

    if (model !== undefined && !['gpt-3.5-turbo', 'gpt-4'].includes(model))
      throw new Error('ChatGPT 模式无效 | ChatGPT model is invalid')

    const authSecretKeyList: string[] = []
    for (let i = 0; i < +authSecretKeyCount; i++) {
      const secretKey = generateAuthSecretKey(model, tokenCount)

      // 判断 secretKey 是否存在
      const isExist = await authSecretKeyIsValid({ secretKey })
      if (isExist) {
        i--
        continue
      }

      await addAuthSecretKeyToDB({ secretKey, model, tokenCount: +tokenCount, originalPrice: +originalPrice, salePrice: +salePrice })
      authSecretKeyList.push(secretKey)
    }

    res.send({ status: 'Success', message: 'Add successfully', data: authSecretKeyList })
  }
  catch (error) {
    res.send({ status: 'Fail', message: error.message, data: null })
  }
})

/**
 * 获取模板
 */
router.get('/prompts/:fileName', async (req, res) => {
  try {
    const { fileName } = req.params
    const response = await fetch(`https://chatgpt-1258090505.cos.ap-chengdu.myqcloud.com/prompts/${fileName}`)
    const json = await response.json()
    res.send(json)
  }
  catch (error) {
    res.send(error)
  }
})

app.use('', router)
app.use('/api', router)
app.set('trust proxy', 1)

app.listen(3002, () => globalThis.console.log('Server is running on port 3002'))
