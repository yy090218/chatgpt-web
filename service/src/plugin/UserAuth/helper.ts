/** OpenAI model */
export type OpenAIModel = 'gpt-3.5-turbo' | 'gpt-4'

/**
 * 生成 AUTH_SECRET_KEY
 * @param model OpenAI model
 * @param tokenCount token 数量
 */
export function generateAuthSecretKey(model: OpenAIModel, tokenCount: number): string {
  const randomString = generateRandomString(64)
  return `${randomString}_${model}_${tokenCount}`
}

/**
 * 生产随机字符串
 * @param length 需要生产的字符串长度
 */
function generateRandomString(length: number): string {
  // 不包括空格、中横线、下划线、#、;
  const characters = shuffleString('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789~!@$%^&*()+=[]{}|:,.<>?')
  let result = ''

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    result += characters.charAt(randomIndex)
  }

  return result
}

/**
 * 随机洗牌算法
 * @param str 需要打乱顺序的字符串
 */
function shuffleString(str: string): string {
  const arr = str.split('')
  const n = arr.length

  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]
  }

  return arr.join('')
}
