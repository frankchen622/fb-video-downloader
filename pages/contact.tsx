import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Logo from '@/components/Logo'
import { useRouter } from 'next/router'

const loadTranslations = (locale: string) => {
  try {
    return require(`@/locales/pages-${locale}.json`)
  } catch {
    return require('@/locales/pages-en.json')
  }
}

export default function Contact() {
  const router = useRouter()
  const { locale = 'en' } = router
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  
  const translations = loadTranslations(locale)
  const t = translations.contact
  
  const siteUrl = 'https://dlfb.io'
  const pagePath = '/contact'
  const canonicalUrl = locale === 'en' ? `${siteUrl}${pagePath}` : `${siteUrl}/${locale}${pagePath}`

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          locale
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit form')
      }

      setSubmitted(true)
      setFormData({ name: '', email: '', message: '' })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit form')
    } finally {
      setIsSubmitting(false)
    }
  }

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
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              <h1 className="text-4xl font-bold mb-4">{t.heading}</h1>
              <p className="text-gray-600 mb-8">{t.subtitle}</p>

              {submitted ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                  <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <h2 className="text-2xl font-bold text-green-900 mb-2">{t.thankYouTitle}</h2>
                  <p className="text-green-700">{t.thankYouMessage}</p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                  >
                    {t.sendAnotherButton}
                  </button>
                </div>
              ) : (
                <>
                  {error && (
                    <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 text-red-700">
                      {error}
                    </div>
                  )}
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                        {t.nameLabel}
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition"
                        placeholder={t.namePlaceholder}
                        disabled={isSubmitting}
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                        {t.emailLabel}
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition"
                        placeholder={t.emailPlaceholder}
                        disabled={isSubmitting}
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                        {t.messageLabel}
                      </label>
                      <textarea
                        id="message"
                        required
                        rows={6}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition resize-none"
                        placeholder={t.messagePlaceholder}
                        disabled={isSubmitting}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-semibold rounded-xl hover:shadow-lg transform hover:-translate-y-0.5 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (locale === 'es' ? 'Enviando...' : 'Sending...') : t.submitButton}
                    </button>
                  </form>
                </>
              )}

              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="font-bold text-lg mb-4">{t.otherWaysTitle}</h3>
                <div className="space-y-3 text-gray-600">
                  <p>
                    <strong>{t.supportLabel}</strong> {t.supportText}
                  </p>
                  <p>
                    <strong>{t.feedbackLabel}</strong> {t.feedbackText}
                  </p>
                  <p>
                    <strong>{t.businessLabel}</strong> {t.businessText}
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <Link href="/" className="text-blue-600 hover:underline">
                  {t.backToHome}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
