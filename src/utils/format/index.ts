/**
 * 转义 HTML 字符
 * @param source
 */
export function encodeHTML(source: string) {
  return source
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

/**
 * 判断是否为代码块
 * @param text
 */
export function includeCode(text: string | null | undefined) {
  const regexp = /^(?:\s{4}|\t).+/gm
  return !!(text?.includes(' = ') || text?.match(regexp))
}

/**
 * 复制文本
 * @param options
 */
export function copyText(options: { text: string; origin?: boolean }) {
  const props = { origin: true, ...options }

  let input: HTMLInputElement | HTMLTextAreaElement

  if (props.origin)
    input = document.createElement('textarea')
  else
    input = document.createElement('input')

  input.setAttribute('readonly', 'readonly')
  input.value = props.text
  document.body.appendChild(input)
  input.select()
  if (document.execCommand('copy'))
    document.execCommand('copy')
  document.body.removeChild(input)
}

/**
 * 将数字格式化为带有千分位逗号分隔的字符串
 *
 * @param num - 需要格式化的数字
 * @return 格式化后的字符串，其中每三位数字用逗号分隔
 */
export function formatNumberWithCommas(num: number): string {
  // 将数字转换为字符串，方便使用正则表达式进行处理
  const numStr = num.toString()

  // 使用正则表达式匹配并替换字符串，实现千分位逗号分隔
  // \B 匹配非单词边界
  // (?=(\d{3})+(?!\d)) 正向肯定环视，用于匹配恰好在三位数字组之前的位置，但不会匹配到字符串末尾
  const formattedNumStr = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  // 返回格式化后的字符串
  return formattedNumStr
}
