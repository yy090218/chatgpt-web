import { queryUserAuthRecord } from 'src/plugin/UserAuth'
import { isPermissionRequired } from 'src/utils/auth'
import { getBaseHeaderInfo } from 'src/utils/device'

const auth = async (req, res, next) => {
  if (isPermissionRequired()) {
    try {
      const authSecret = await queryUserAuthRecord({ ...getBaseHeaderInfo(req), agentHostName: req.hostname })
      if (!authSecret)
        throw new Error('Error: 无访问权限 | No access rights')
      if (authSecret.remainToken <= 0)
        throw new Error('Error: 余额不足 | Insufficient balance')

      next()
    }
    catch (error) {
      res.send({ status: 'Unauthorized', message: error.message ?? 'Please authenticate.', data: null })
    }
  }
  else {
    next()
  }
}

export { auth }
