import { ss } from '@/utils/storage'

const DEFAULT_MODEL = 'gpt-3.5-turbo'
const LOCAL_NAME = 'SECRET_TOKEN'

export function getToken() {
  return ss.get(LOCAL_NAME)
}

export function setToken(token: string) {
  return ss.set(LOCAL_NAME, token)
}

export function removeToken() {
  return ss.remove(LOCAL_NAME)
}

export function getTokenModel() {
  const token = getToken()
  const secretKeyModel = token?.split('_').find((item: string) => item.startsWith('gpt')) || DEFAULT_MODEL
  return secretKeyModel
}
