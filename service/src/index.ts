import express from 'express'
import type { RequestProps } from './types'
import type { ChatMessage } from './chatgpt'
import { chatConfig, chatReplyProcess, currentModel } from './chatgpt'
import { auth } from './middleware/auth'
import { limiter } from './middleware/limiter'
import { getBaseHeaderInfo } from './utils/device'
import type { OpenAIModel } from './plugin/UserAuth'
import { addAuthSecretKeyToDB, authSecretKeyIsValid, consumeToken, generateAuthSecretKey, queryUserAuthRecord } from './plugin/UserAuth'
import { isPermissionRequired } from './utils/auth'

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
    const { prompt, options = {}, systemMessage, temperature, top_p } = req.body as RequestProps
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
    }) as { data: ChatMessage }

    // 返回 usage 信息
    if (data?.detail?.usage?.total_tokens) {
      const accountInfo = await queryUserAuthRecord({ ...getBaseHeaderInfo(req), agentHostName: req.hostname })
      const withBalanceData = { ...data, balance: 0 }

      if (accountInfo) {
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

    const isValid = await authSecretKeyIsValid({ authSecretKey: token, agentHostName: req.hostname })
    if (!isValid)
      throw new Error('密钥无效或余额不足 | The key is invalid or the balance is insufficient')

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
    const response = isPermissionRequired() ? (await queryUserAuthRecord({ ...getBaseHeaderInfo(req), agentHostName: req.hostname })) : null
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
      const authSecretKey = generateAuthSecretKey(model, tokenCount)
      await addAuthSecretKeyToDB({ authSecretKey, model, agentHostName: req.hostname, tokenCount: +tokenCount, originalPrice: +originalPrice, salePrice: +salePrice })
      authSecretKeyList.push(authSecretKey)
    }

    res.send({ status: 'Success', message: 'Add successfully', data: authSecretKeyList })
  }
  catch (error) {
    res.send({ status: 'Fail', message: error.message, data: null })
  }
})

app.use('', router)
app.use('/api', router)
app.set('trust proxy', 1)

app.listen(3002, () => globalThis.console.log('Server is running on port 3002'))
