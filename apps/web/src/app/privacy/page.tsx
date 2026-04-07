import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy · Floripa with Kids',
}

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-6 pt-28 pb-16">
        <Link href="/" className="text-[#f97316] text-sm font-semibold hover:underline mb-8 inline-block">
          ← Back to home
        </Link>

        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-sm text-gray-400 mb-10">Last updated: April 1, 2025</p>

        <div className="prose prose-gray max-w-none space-y-8 text-gray-700 leading-relaxed">

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">1. Overview</h2>
            <p>
              Floripa with Kids ("we", "us", or "our") operates the Floripa with Kids mobile
              application. This policy explains what information we collect, how we use it, and
              your rights regarding that information.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">2. Information We Collect</h2>
            <p>
              We do <strong>not</strong> collect any personally identifiable information (PII)
              such as your name, email address, or phone number. The app does not require you to
              create an account.
            </p>
            <p className="mt-3">
              When you use the app, we retrieve publicly available content (events, categories,
              places) from our database hosted on Supabase. No personal data is stored or
              transmitted beyond what is necessary to display this content.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">3. Third-Party Services</h2>
            <p>The app uses the following third-party services:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>
                <strong>Supabase</strong> — our backend database provider, used to store and serve
                app content. No user data is stored. See{' '}
                <a href="https://supabase.com/privacy" className="text-[#f97316] hover:underline" target="_blank" rel="noopener noreferrer">
                  Supabase Privacy Policy
                </a>.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">4. Data Storage</h2>
            <p>
              We store your language preference (English or Portuguese) locally on your device
              using standard device storage. This data never leaves your device and is not
              shared with us or any third party.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">5. Children's Privacy</h2>
            <p>
              Floripa with Kids is designed for families. We do not knowingly collect any
              personal information from children under 13. If you believe a child has provided
              us with personal information, please contact us and we will delete it immediately.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">6. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Changes will be posted on
              this page with an updated date. Continued use of the app after changes constitutes
              acceptance of the new policy.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">7. Contact</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at{' '}
              <a href="mailto:hello@1367studio.com" className="text-[#f97316] hover:underline">
                hello@1367studio.com
              </a>.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
