import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Logo from '@/components/Logo'

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real implementation, this would send the form data to a backend
    setSubmitted(true)
  }

  return (
    <>
      <Head>
        <title>Contact Us - dlfb.io</title>
        <meta name="description" content="Contact dlfb.io for support, feedback, or inquiries about our Facebook video downloader service." />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <header className="container mx-auto px-4 py-6 border-b border-gray-200">
          <Logo />
        </header>

        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
              <p className="text-gray-600 mb-8">
                Have questions, feedback, or need support? We'd love to hear from you.
              </p>

              {submitted ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                  <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <h2 className="text-2xl font-bold text-green-900 mb-2">Thank You!</h2>
                  <p className="text-green-700">
                    Your message has been received. We'll get back to you as soon as possible.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition resize-none"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-semibold rounded-xl hover:shadow-lg transform hover:-translate-y-0.5 transition"
                  >
                    Send Message
                  </button>
                </form>
              )}

              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="font-bold text-lg mb-4">Other Ways to Reach Us</h3>
                <div className="space-y-3 text-gray-600">
                  <p>
                    <strong>Support:</strong> For technical issues or questions about using our service
                  </p>
                  <p>
                    <strong>Feedback:</strong> We welcome your suggestions for improving dlfb.io
                  </p>
                  <p>
                    <strong>Business Inquiries:</strong> For partnership or collaboration opportunities
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <Link href="/" className="text-blue-600 hover:underline">
                  ← Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
