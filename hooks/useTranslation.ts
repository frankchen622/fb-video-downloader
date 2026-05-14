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
