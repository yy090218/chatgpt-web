import axios, { type AxiosResponse } from 'axios'
import { getFingerprint } from './helper'
import { useAuthStore } from '@/store'

/** 游客 id */
let visitorId = ''

const service = axios.create({
  baseURL: import.meta.env.VITE_GLOB_API_URL,
})

service.interceptors.request.use(
  async (config) => {
    // 添加设备指纹
    if (!visitorId)
      visitorId = await getFingerprint()

    config.headers.deviceId = visitorId

    const token = useAuthStore().token
    if (token)
      config.headers.Authorization = `Bearer ${token}`
    return config
  },
  (error) => {
    return Promise.reject(error.response)
  },
)

service.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    if (response.status === 200)
      return response

    throw new Error(response.status.toString())
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default service
