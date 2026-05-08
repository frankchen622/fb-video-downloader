import Head from 'next/head'
import Link from 'next/link'
import Logo from '@/components/Logo'

export default function TermsOfUse() {
  return (
    <>
      <Head>
        <title>Terms of Use - dlfb.io</title>
        <meta name="description" content="Terms of use for dlfb.io Facebook video downloader. Read our terms and conditions before using our service." />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <header className="container mx-auto px-4 py-6 border-b border-gray-200">
          <Logo />
        </header>

        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <h1 className="text-4xl font-bold mb-8">Terms of Use</h1>
            <p className="text-gray-600 mb-8">Last updated: May 8, 2024</p>

            <div className="prose prose-lg max-w-none">
              <h2>Acceptance of Terms</h2>
              <p>
                By accessing and using dlfb.io, you accept and agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use our service.
              </p>

              <h2>Service Description</h2>
              <p>
                dlfb.io provides a free online tool to download publicly available videos from Facebook. Our service allows users to convert and download Facebook videos in various formats (MP4, MP3) for personal use.
              </p>

              <h2>Acceptable Use</h2>
              <p>You agree to use our service only for lawful purposes. You must not:</p>
              <ul>
                <li>Download copyrighted content without permission from the copyright holder</li>
                <li>Use downloaded content for commercial purposes without proper authorization</li>
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe on the rights of content creators or copyright holders</li>
                <li>Use our service to harass, abuse, or harm others</li>
                <li>Attempt to circumvent any security measures</li>
                <li>Use automated tools to abuse our service</li>
              </ul>

              <h2>Copyright and Intellectual Property</h2>
              <p>
                Users are responsible for ensuring they have the right to download and use any content. We respect intellectual property rights and expect our users to do the same. Downloaded content remains the property of the original copyright holders.
              </p>

              <h2>Disclaimer of Warranties</h2>
              <p>
                Our service is provided "as is" without any warranties, express or implied. We do not guarantee:
              </p>
              <ul>
                <li>Uninterrupted or error-free service</li>
                <li>Accuracy or reliability of downloaded content</li>
                <li>Compatibility with all devices or browsers</li>
                <li>Availability of specific videos or formats</li>
              </ul>

              <h2>Limitation of Liability</h2>
              <p>
                dlfb.io and its operators shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from:
              </p>
              <ul>
                <li>Use or inability to use our service</li>
                <li>Unauthorized access to your data</li>
                <li>Any content downloaded through our service</li>
                <li>Any errors or omissions in our service</li>
              </ul>

              <h2>Third-Party Content</h2>
              <p>
                We are not affiliated with Facebook or Meta. All Facebook trademarks, logos, and content belong to their respective owners. We do not host, store, or distribute any Facebook content.
              </p>

              <h2>User Responsibilities</h2>
              <p>Users are solely responsible for:</p>
              <ul>
                <li>Compliance with copyright laws and regulations</li>
                <li>Obtaining necessary permissions before downloading content</li>
                <li>How downloaded content is used or distributed</li>
                <li>Respecting content creators' rights and privacy</li>
              </ul>

              <h2>Service Modifications</h2>
              <p>
                We reserve the right to modify, suspend, or discontinue our service at any time without notice. We may also update these Terms of Use periodically.
              </p>

              <h2>Termination</h2>
              <p>
                We reserve the right to terminate or restrict access to our service for users who violate these terms or engage in abusive behavior.
              </p>

              <h2>Governing Law</h2>
              <p>
                These Terms of Use shall be governed by and construed in accordance with applicable international laws and regulations.
              </p>

              <h2>Contact Information</h2>
              <p>
                For questions about these Terms of Use, please visit our <Link href="/contact" className="text-blue-600 hover:underline">Contact page</Link>.
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
