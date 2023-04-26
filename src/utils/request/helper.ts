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
  const ctx = canvas.getContext('2d')
  if (!ctx)
    return

  canvas.width = 200
  canvas.height = 200

  // Text with lowercase/uppercase/punctuation symbols
  const txt = 'BrowserLeaks,com <canvas> 1.0'
  ctx.textBaseline = 'top'
  // The most common type
  ctx.font = '14px \'Arial\''
  ctx.textBaseline = 'alphabetic'
  ctx.fillStyle = '#f60'
  ctx.fillRect(125, 1, 62, 20)
  // Some tricks for color mixing to increase the difference in rendering
  ctx.fillStyle = '#069'
  ctx.fillText(txt, 2, 15)
  ctx.fillStyle = 'rgba(102, 204, 0, 0.7)'
  ctx.fillText(txt, 4, 17)

  // Encode the image data as a data URL
  const res = await hashString(canvas.toDataURL())
  return res
}

/**
 * 将字符串转换为 hash
 * @param str 字符串
 */
async function hashString(str: string) {
  const { default: md5 } = await import('md5')
  const hashHex = md5(str)

  return hashHex.toLocaleUpperCase()
}
