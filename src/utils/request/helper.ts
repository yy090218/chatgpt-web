let deviceId = ''
let locked = false

/**
 * 获取设备指纹
 */
export async function getFingerprint() {
  if (locked) {
    return new Promise<string>((resolve) => {
      if (deviceId) {
        resolve(deviceId)
        return
      }

      document.addEventListener('DEVICE_ID_HAS_GENERATED', () => {
        resolve(deviceId)
      })
    })
  }

  locked = true
  // 优先获取 canvas 指纹，为了避免噪音影响，这里先判断是否含有噪音
  const hasNoise = await checkCanvasHasNoise()
  if (!hasNoise) {
    const visitorId = await getCanvasFingerprint()
    if (visitorId) {
      deviceId = visitorId
      locked = false
      dispatchEvent()
      return deviceId
    }
  }

  // 无法获取 canvas 指纹或存在噪音的情况下通过 fingerprintjs 获取
  const FingerprintJS = await import('@fingerprintjs/fingerprintjs')
  const fpPromise = await FingerprintJS.load()
  const deviceInfo = await fpPromise.get()
  deviceId = deviceInfo.visitorId
  locked = false
  dispatchEvent()

  return deviceId
}

/**
 * 派发事件
 */
function dispatchEvent() {
  const event = new Event('DEVICE_ID_HAS_GENERATED')
  document.dispatchEvent(event)
}

/**
 * 判断 canvas 中是否含有噪音
 */
async function checkCanvasHasNoise() {
  const base64F = await getPngDataURLByCanvas()
  const base64S = await getPngDataURLByCanvas()
  return base64F !== base64S
}

/**
 * 获取 canvas 指纹
 */
async function getCanvasFingerprint() {
  const base64 = await getPngDataURLByCanvas()
  if (!base64)
    return

  const res = await hashString(base64)
  return res
}

/**
 * 获取 canvas 绘制 image 的 data URL
 */
async function getPngDataURLByCanvas(size = 200) {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (!ctx)
    return

  canvas.width = size
  canvas.height = size

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
  const base64 = canvas.toDataURL('image/png').replace('data:image/png;base64,', '')
  return base64
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
