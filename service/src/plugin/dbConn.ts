import mongoose from 'mongoose'
import { isPermissionRequired } from 'src/utils/auth'

export const dbConn = isPermissionRequired() ? mongoose.createConnection(process.env.MONGOOSE_DB_ADDRESS) : null

dbConn?.on('open', () => globalThis.console.log('mongodb connection success.'))
