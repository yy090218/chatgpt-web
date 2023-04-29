import type { App } from 'vue'
import { createI18n } from 'vue-i18n'
// import enUS from './en-US'
// import zhCN from './zh-CN'
// import zhTW from './zh-TW'
import { useAppStoreWithOut } from '@/store/modules/app'
import type { Language } from '@/store/modules/app/helper'

type LimitReferer = 'en' | 'cn' | 'tw'

const appStore = useAppStoreWithOut()

const referrer = window.location.host.split('.').slice(-3, -2)[0]
const defaultLanguageHooks: Record<LimitReferer, Language> = { en: 'en-US', cn: 'zh-CN', tw: 'zh-TW' }
const defaultLanguage = referrer in defaultLanguageHooks ? defaultLanguageHooks[referrer as LimitReferer] : null
const defaultLocale = appStore.language || defaultLanguage || 'zh-CN'

const i18n = createI18n({
  locale: defaultLocale,
  fallbackLocale: 'en-US',
  allowComposition: true,
  messages: {
    'en-US': {},
    'zh-CN': {},
    'zh-TW': {},
  },
})

// 加载默认语言
addLocale(defaultLocale)

export const t = i18n.global.t

export function setLocale(locale: Language) {
  i18n.global.locale = locale
}

export function setupI18n(app: App) {
  app.use(i18n)
}

export async function addLocale(locale: Language) {
  const localMap: { [K in Language]: () => Promise<{ default: Record<string, any> }> } = {
    'en-US': () => import('@/locales/en-US'),
    'zh-CN': () => import('@/locales/zh-CN'),
    'zh-TW': () => import('@/locales/zh-TW'),
  }
  const { default: message } = await localMap[locale]()
  i18n.global.setLocaleMessage(locale, message)
}

export default i18n
