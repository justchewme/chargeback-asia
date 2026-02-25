import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Inter, JetBrains_Mono } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: "ChargeBack.asia — Win Back What's Yours",
    template: '%s | ChargeBack.asia',
  },
  description: 'AI-powered chargeback recovery for Asian merchants. We fight every dispute automatically. Pay 20% only when you win.',
  keywords: ['chargeback', 'dispute', 'recovery', 'asia', 'merchant', 'payment', 'xendit', 'midtrans', 'stripe', 'paymongo'],
  openGraph: {
    title: "ChargeBack.asia — Win Back What's Yours",
    description: 'AI-powered chargeback recovery for Asian merchants. Pay 20% only when you win.',
    url: 'https://chargebackasia.com',
    siteName: 'ChargeBack.asia',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ChargeBack.asia',
    description: 'AI-powered chargeback recovery. No win, no fee.',
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://chargebackasia.com'),
}

// Only wrap with ClerkProvider when we have a real publishable key
// This allows the app to be previewed locally without credentials
const hasValidClerkKey = (() => {
  const key = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ?? ''
  return key.startsWith('pk_') && key.length > 30
})()

function AppWrapper({ children }: { children: React.ReactNode }) {
  if (hasValidClerkKey) {
    return <ClerkProvider>{children}</ClerkProvider>
  }
  return <>{children}</>
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AppWrapper>
      <html
        lang="en"
        className={`${plusJakarta.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      >
        <body className="font-body antialiased">
          {children}
        </body>
      </html>
    </AppWrapper>
  )
}
