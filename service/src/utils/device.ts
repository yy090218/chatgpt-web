/**
 * 获取 header 里面携带的基本参数
 */
export function getBaseHeaderInfo(req) {
  const Authorization = req.header('Authorization') || ''
  const authSecretKey = Authorization.replace('Bearer ', '').trim()
  const ip = getRealIP(req)
  const deviceId = getDeviceId(req)

  return { authSecretKey, ip, deviceId }
}

/**
 * 创建一个名为 getRealIP 的函数，接收一个 HTTP 请求对象作为参数
 */
export function getRealIP(req) {
  // 从请求头中获取可能包含真实 IP 地址的字段
  let ip = req.headers['x-forwarded-for'] // 获取经过代理或负载均衡时的真实 IP
           || req.headers['x-real-ip'] // 获取 Nginx 代理时的真实 IP
           || req.connection.remoteAddress // 获取 TCP 连接的远程 IP
           || req.socket.remoteAddress // 获取 socket 连接的远程 IP
           || req.connection.socket?.remoteAddress

  // 如果 IP 地址包含多个值，取第一个值（例如，经过多个代理时）
  if (ip && ip.includes(','))
    ip = ip.split(',')[0]

  // 删除 IPv6 地址的前缀（::ffff:），以便于处理
  if (ip && ip.startsWith('::ffff:'))
    ip = ip.slice(7)

  // 返回获取到的 IP 地址
  return ip
}

/**
 * 获取设备 id
 */
export function getDeviceId(req) {
  return req.header('deviceId')
}
