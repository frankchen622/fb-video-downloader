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

export default function TermsOfUse() {
  const router = useRouter()
  const { locale = 'en' } = router
  
  const t = translations[locale]?.termsOfUse || translations.en.termsOfUse
  
  const siteUrl = 'https://dlfb.io'
  const pagePath = '/terms-of-use'
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
              <h2>{t.acceptanceTitle}</h2>
              <p>{t.acceptanceText}</p>

              <h2>{t.serviceTitle}</h2>
              <p>{t.serviceText}</p>

              <h2>{t.acceptableTitle}</h2>
              <p>{t.acceptableText}</p>
              <ul>
                {t.acceptableItems.map((item: string, i: number) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>

              <h2>{t.copyrightTitle}</h2>
              <p>{t.copyrightText}</p>

              <h2>{t.disclaimerTitle}</h2>
              <p>{t.disclaimerText}</p>
              <ul>
                {t.disclaimerItems.map((item: string, i: number) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>

              <h2>{t.limitationTitle}</h2>
              <p>{t.limitationText}</p>
              <ul>
                {t.limitationItems.map((item: string, i: number) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>

              <h2>{t.thirdPartyTitle}</h2>
              <p>{t.thirdPartyText}</p>

              <h2>{t.userRespTitle}</h2>
              <p>{t.userRespText}</p>
              <ul>
                {t.userRespItems.map((item: string, i: number) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>

              <h2>{t.modificationsTitle}</h2>
              <p>{t.modificationsText}</p>

              <h2>{t.terminationTitle}</h2>
              <p>{t.terminationText}</p>

              <h2>{t.governingTitle}</h2>
              <p>{t.governingText}</p>

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
