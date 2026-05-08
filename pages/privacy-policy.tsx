import Head from 'next/head'
import Link from 'next/link'
import Logo from '@/components/Logo'

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy - dlfb.io</title>
        <meta name="description" content="Privacy policy for dlfb.io Facebook video downloader. Learn how we protect your privacy and handle your data." />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <header className="container mx-auto px-4 py-6 border-b border-gray-200">
          <Logo />
        </header>

        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
            <p className="text-gray-600 mb-8">Last updated: May 8, 2024</p>

            <div className="prose prose-lg max-w-none">
              <h2>Introduction</h2>
              <p>
                At dlfb.io, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your information when you use our Facebook video downloader service.
              </p>

              <h2>Information We Collect</h2>
              <h3>Information You Provide</h3>
              <ul>
                <li>Video URLs that you paste into our service</li>
                <li>No personal information is required to use our service</li>
                <li>We do not require registration or account creation</li>
              </ul>

              <h3>Automatically Collected Information</h3>
              <ul>
                <li>Basic analytics data (page views, browser type, device type)</li>
                <li>IP address for security and abuse prevention</li>
                <li>Cookies for essential website functionality</li>
              </ul>

              <h2>How We Use Your Information</h2>
              <p>We use the collected information to:</p>
              <ul>
                <li>Process your video download requests</li>
                <li>Improve our service and user experience</li>
                <li>Prevent abuse and ensure service security</li>
                <li>Analyze usage patterns to optimize performance</li>
              </ul>

              <h2>Data Storage and Security</h2>
              <ul>
                <li>We do not store video URLs or downloaded content</li>
                <li>All downloads are processed in real-time and not saved on our servers</li>
                <li>We use industry-standard security measures to protect your data</li>
                <li>We do not sell, rent, or share your information with third parties</li>
              </ul>

              <h2>Cookies</h2>
              <p>
                We use essential cookies to ensure our website functions properly. These cookies do not track your personal information and are necessary for the service to work.
              </p>

              <h2>Third-Party Services</h2>
              <p>
                Our service may use third-party analytics tools to understand how users interact with our website. These services have their own privacy policies.
              </p>

              <h2>Your Rights</h2>
              <p>You have the right to:</p>
              <ul>
                <li>Access any personal information we hold about you</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of analytics tracking</li>
                <li>Contact us with privacy concerns</li>
              </ul>

              <h2>Children's Privacy</h2>
              <p>
                Our service is not intended for users under 13 years of age. We do not knowingly collect information from children.
              </p>

              <h2>Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated revision date.
              </p>

              <h2>Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy, please contact us through our <Link href="/contact" className="text-blue-600 hover:underline">Contact page</Link>.
              </p>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <Link href="/" className="text-blue-600 hover:underline">
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
