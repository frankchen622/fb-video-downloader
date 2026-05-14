import { useRouter } from 'next/router'
import en from '@/locales/en.json'
import es from '@/locales/es.json'
import pt from '@/locales/pt.json'
import zh from '@/locales/zh.json'
import ar from '@/locales/ar.json'
import ru from '@/locales/ru.json'

const translations: Record<string, any> = {
  en,
  es,
  pt,
  zh,
  ar,
  ru,
}

export function useTranslation() {
  const router = useRouter()
  const { locale = 'en' } = router
  
  const t = (key: string): string => {
    const keys = key.split('.')
    let value: any = translations[locale] || translations.en
    
    for (const k of keys) {
      value = value?.[k]
    }
    
    return value || key
  }
  
  return { t, locale }
}
