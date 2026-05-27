import Head from 'next/head'
import Link from 'next/link'
import Logo from '@/components/Logo'
import { useRouter } from 'next/router'

// Import translations
import enTranslations from '@/locales/pages-en.json'
import esTranslations from '@/locales/pages-es.json'

const translations: Record<string, any> = {
  en: enTranslations,
  es: esTranslations,
}

export default function PrivacyPolicy() {
  const router = useRouter()
  const { locale = 'en' } = router
  
  const t = translations[locale]?.privacyPolicy || translations.en.privacyPolicy
  
  const siteUrl = 'https://dlfb.io'
  const pagePath = '/privacy-policy'
  const canonicalUrl = locale === 'en' ? `${siteUrl}${pagePath}` : `${siteUrl}/${locale}${pagePath}`
  
  return (
    <>
      <Head>
        <title>{t.title}</title>
        <meta name="description" content={t.metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <header className="container mx-auto px-4 py-6 border-b border-gray-200">
          <Logo />
        </header>

        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <h1 className="text-4xl font-bold mb-8">{t.heading}</h1>
            <p className="text-gray-600 mb-8">{t.lastUpdated}</p>

            <div className="prose prose-lg max-w-none">
              <h2>{t.introTitle}</h2>
              <p>{t.introText}</p>

              <h2>{t.infoCollectTitle}</h2>
              <h3>{t.infoProvideTitle}</h3>
              <ul>
                {t.infoProvideItems.map((item: string, i: number) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>

              <h3>{t.autoCollectTitle}</h3>
              <ul>
                {t.autoCollectItems.map((item: string, i: number) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>

              <h2>{t.howUseTitle}</h2>
              <p>{t.howUseText}</p>
              <ul>
                {t.howUseItems.map((item: string, i: number) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>

              <h2>{t.dataStorageTitle}</h2>
              <ul>
                {t.dataStorageItems.map((item: string, i: number) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>

              <h2>{t.cookiesTitle}</h2>
              <p>{t.cookiesText}</p>

              <h2>{t.thirdPartyTitle}</h2>
              <p>{t.thirdPartyText}</p>

              <h2>{t.yourRightsTitle}</h2>
              <p>{t.yourRightsText}</p>
              <ul>
                {t.yourRightsItems.map((item: string, i: number) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>

              <h2>{t.childrenTitle}</h2>
              <p>{t.childrenText}</p>

              <h2>{t.changesTitle}</h2>
              <p>{t.changesText}</p>

              <h2>{t.contactTitle}</h2>
              <p>
                {t.contactText}{' '}
                <Link href={`/${locale === 'en' ? '' : locale + '/'}contact`} className="text-blue-600 hover:underline">
                  {t.contactLink}
                </Link>.
              </p>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <Link href="/" className="text-blue-600 hover:underline">
                ← {locale === 'es' ? 'Volver al Inicio' : 'Back to Home'}
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
