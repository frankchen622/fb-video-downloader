# 🌍 Multilingual Setup

## Supported Languages

- 🇺🇸 English (en) - Default
- 🇪🇸 Spanish (es)
- 🇵🇹 Portuguese (pt)
- 🇨🇳 Chinese (zh)
- 🇸🇦 Arabic (ar)
- 🇷🇺 Russian (ru)
- 🇫🇷 French (fr)
- 🇩🇪 German (de)
- 🇯🇵 Japanese (ja)
- 🇮🇩 Indonesian (id)
- 🇻🇳 Vietnamese (vi)
- 🇹🇭 Thai (th)

## URL Structure

```
dlfb.io/          → English (default)
dlfb.io/es/       → Spanish
dlfb.io/pt/       → Portuguese
dlfb.io/zh/       → Chinese
dlfb.io/ar/       → Arabic
dlfb.io/ru/       → Russian
```

## How to Use Translations

### In Components

```tsx
import { useTranslation } from '@/hooks/useTranslation'

export default function MyComponent() {
  const { t } = useTranslation()
  
  return (
    <div>
      <h1>{t('home.title')}</h1>
      <p>{t('home.description')}</p>
    </div>
  )
}
```

### Add Language Switcher

```tsx
import LanguageSwitcher from '@/components/LanguageSwitcher'

<LanguageSwitcher />
```

## Translation Files

Located in `/locales/*.json`

- `en.json` - English (complete)
- `es.json` - Spanish (complete)
- `pt.json` - Portuguese (complete)
- `zh.json` - Chinese (complete)
- `ar.json` - Arabic (complete)
- `ru.json` - Russian (complete)
- `fr.json` - French (TODO)
- `de.json` - German (TODO)
- `ja.json` - Japanese (TODO)
- `id.json` - Indonesian (TODO)
- `vi.json` - Vietnamese (TODO)
- `th.json` - Thai (TODO)

## SEO Features

✅ Automatic hreflang tags
✅ Multilingual sitemap at `/sitemap.xml`
✅ RTL support for Arabic
✅ Language-specific meta tags
✅ Canonical URLs per language

## Google Search Console

After deployment:

1. Submit sitemap: `https://dlfb.io/sitemap.xml`
2. Google will automatically discover all language versions
3. Each language will be indexed separately

## Next Steps

1. Complete translations for remaining languages (fr, de, ja, id, vi, th)
2. Add LanguageSwitcher to navigation
3. Update page components to use `useTranslation` hook
4. Test all language routes
5. Submit sitemap to Google Search Console
