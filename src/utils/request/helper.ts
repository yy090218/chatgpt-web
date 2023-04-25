/**
 * 获取设备指纹
 */
export async function getFingerprint() {
  // 优先获取 canvas 指纹，为了避免噪音影响，这里取 2 次指纹，判断是否相同
  // 如果不同，说明 canvas 中加入了随机噪音
  const fingerprint1 = await getCanvasFingerprint()
  const fingerprint2 = await getCanvasFingerprint()
  if (fingerprint1 && fingerprint1 === fingerprint2)
    return fingerprint1

  // 无法获取 canvas 指纹的情况下通过 fingerprintjs 获取
  const FingerprintJS = await import('@fingerprintjs/fingerprintjs')
  const fpPromise = await FingerprintJS.load()
  const deviceInfo = await fpPromise.get()
  return deviceInfo.visitorId
}

/**
 * 获取 canvas 指纹
 */
async function getCanvasFingerprint() {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  if (!context)
    return

  canvas.width = 200
  canvas.height = 200

  // Draw a unique shape
  context.fillStyle = '#f60'
  context.fillRect(50, 50, 100, 100)

  // Encode the image data as a data URL
  const res = await hashString(canvas.toDataURL())
  return res
}

/**
 * 将字符串转换为 hash
 * @param str 字符串
 */
async function hashString(str: string) {
  // 将字符串转换为Uint8Array，因为SubtleCrypto.digest()接受的是一个 ArrayBuffer 或 ArrayBufferView 类型的参数
  const encoder = new TextEncoder()
  const data = encoder.encode(str)

  // 对数据进行SHA-256哈希
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)

  // 将生成的哈希值转换为十六进制字符串
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')

  return hashHex
}
