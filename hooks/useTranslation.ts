import { useRouter } from 'next/router'
import en from '@/locales/en.json'
import es from '@/locales/es.json'
import pt from '@/locales/pt.json'
import fr from '@/locales/fr.json'
import de from '@/locales/de.json'
import ja from '@/locales/ja.json'
import id from '@/locales/id.json'
import vi from '@/locales/vi.json'
import th from '@/locales/th.json'
import zh from '@/locales/zh.json'
import ar from '@/locales/ar.json'
import ru from '@/locales/ru.json'

const translations: Record<string, any> = {
  en,
  es,
  pt,
  fr,
  de,
  ja,
  id,
  vi,
  th,
  zh,
  ar,
  ru,
}

export function useTranslation() {
  const router = useRouter()
  const { locale = 'en' } = router
  
  const t = (key: string, options?: { returnObjects?: boolean }): any => {
    const keys = key.split('.')
    let value: any = translations[locale] || translations.en
    
    for (const k of keys) {
      value = value?.[k]
    }
    
    // If value is undefined, return the key
    if (value === undefined) {
      return key
    }
    
    // If returnObjects is explicitly true, return the value as-is (could be object/array)
    if (options?.returnObjects === true) {
      return value
    }
    
    // Otherwise, convert to string (for normal text translations)
    if (typeof value === 'object') {
      // If it's an object but returnObjects wasn't requested, return the key
      return key
    }
    
    return String(value)
  }
  
  return { t, locale }
}
