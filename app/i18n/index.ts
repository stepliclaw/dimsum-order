'use client'

import i18next from 'i18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import { initReactI18next } from 'react-i18next/initReactI18next'
import { useEffect, useState } from 'react'

const supportedLanguages = ['en', 'zh'] as const
export type SupportedLanguage = typeof supportedLanguages[number]

i18next
  .use(initReactI18next)
  .use(
    resourcesToBackend((language: string, namespace: string) =>
      import(`@/app/i18n/${language}.${namespace}.json`)
    )
  )
  .init({
    supportedLngs: supportedLanguages,
    fallbackLng: 'en',
    lng: undefined, // Will be set by useTranslation hook
    interpolation: {
      escapeValue: false,
    },
    defaultNS: 'translation',
  })

export function useAppTranslation(initialLanguage: SupportedLanguage = 'en') {
  const [language, setLanguage] = useState<SupportedLanguage>(initialLanguage)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('dimsum-language') : null
    const lang = (stored as SupportedLanguage) || initialLanguage
    
    i18next.changeLanguage(lang).then(() => {
      setLanguage(lang)
      setReady(true)
    })
  }, [initialLanguage])

  const changeLanguage = (lang: SupportedLanguage) => {
    i18next.changeLanguage(lang)
    setLanguage(lang)
    if (typeof window !== 'undefined') {
      localStorage.setItem('dimsum-language', lang)
    }
  }

  return { t: i18next.t.bind(i18next), language, changeLanguage, ready }
}

export { i18next }
export default i18next
