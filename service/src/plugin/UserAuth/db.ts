import type { Document } from 'mongoose'
import { Schema } from 'mongoose'
import { dbConn } from 'src/plugin/dbConn'

// 定义用户 token 数据模型接口
export interface IUserAuth extends Document {
  secretKey: string // 授权码
  model: string
  tokenCount: number
  remainToken: number
  isFree: boolean
  originalPrice: number // 原价
  salePrice: number // 销售价格
  ip: string // ip
  deviceId: string // 设备 id
  agentHostName: string // 代理商
  createdAt: Date
  updatedAt: Date
}

// 定义免费用户 token 数据模型 Schema
const UserAuthSchema = new Schema({
  secretKey: {
    type: String,
    index: true,
  },
  model: { type: String, enum: ['gpt-3.5-turbo', 'gpt-4'], required: true, index: true },
  tokenCount: { type: Number, required: true, index: true },
  remainToken: { type: Number, required: true, index: true },
  isFree: { type: Boolean, default: true, index: true },
  originalPrice: { type: Number, default: 0, index: true },
  salePrice: { type: Number, default: 0, index: true },
  ip: { type: String, index: true },
  deviceId: { type: String, index: true },
  agentHostName: { type: String, index: true },
}, {
  timestamps: {
    createdAt: true,
    updatedAt: true,
  },
})

const UserAuth = dbConn?.model<IUserAuth>('user_auth', UserAuthSchema)

export { UserAuth }
