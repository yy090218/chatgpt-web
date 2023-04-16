import { defineStore } from 'pinia'
import { getToken, removeToken, setToken } from './helper'
import { store } from '@/store'
import { fetchAccountInfo, fetchSession } from '@/api'

interface SessionResponse {
  auth: boolean
  model: 'ChatGPTAPI' | 'ChatGPTUnofficialProxyAPI'
}

export interface AuthState {
  token: string | undefined
  session: SessionResponse | null
  balance: number | null
}

export const useAuthStore = defineStore('auth-store', {
  state: (): AuthState => ({
    token: getToken(),
    session: null,
    balance: null,
  }),

  getters: {
    isChatGPTAPI(state): boolean {
      return state.session?.model === 'ChatGPTAPI'
    },
  },

  actions: {
    async getSession() {
      try {
        const [{ data: session }, { data: accountInfo }] = await Promise.all([
          fetchSession<SessionResponse>(),
          fetchAccountInfo<{ remainToken: number }>(),
        ])
        this.session = { ...session }
        this.balance = accountInfo.remainToken
        return Promise.resolve(session)
      }
      catch (error) {
        return Promise.reject(error)
      }
    },

    reduceBalance(balance: number) {
      if (this.balance !== null)
        this.balance -= balance
    },

    setToken(token: string) {
      this.token = token
      setToken(token)
    },

    removeToken() {
      this.token = undefined
      removeToken()
    },
  },
})

export function useAuthStoreWithout() {
  return useAuthStore(store)
}
