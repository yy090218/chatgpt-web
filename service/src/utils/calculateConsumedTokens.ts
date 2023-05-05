import type { IBaseUserParam } from './device'

const DEFAULT_MODEL = 'gpt-3.5-turbo'

const MODEL_HOOKS = {
  'gpt-3.5-turbo': {
    'gpt-3.5-turbo': 1,
    'gpt-4': 6,
  },
  'gpt-4': {
    'gpt-3.5-turbo': 1 / 5,
    'gpt-4': 1,
  },
}

/**
 * 计算用户实际消耗 token 数量
 */
export const calculateConsumedTokens = ({ secretKey, consumedTokens, model = DEFAULT_MODEL }: IBaseUserParam & { consumedTokens: number; model?: string }) => {
  const secretKeyModel = secretKey?.split('_').find(item => item.startsWith('gpt')) || DEFAULT_MODEL

  // 如果切换了别的 model，这里需要转换 token 数量
  if (secretKeyModel !== model) {
    const ratio = MODEL_HOOKS[secretKeyModel][model] || 10
    return Math.ceil(ratio * consumedTokens)
  }

  return consumedTokens
}
