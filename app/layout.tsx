import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import 'nextra-theme-docs/style.css'
import './custom.css'

export const metadata = {
  title: {
    default: 'Synkra AIOS Docs',
    template: '%s | AIOS Docs'
  },
  description: 'Documentation for the Synkra AIOS Framework — AI-Orchestrated System for Full Stack Development',
  openGraph: {
    title: 'Synkra AIOS Docs',
    description: 'AI-Orchestrated System for Full Stack Development',
    siteName: 'AIOS Docs',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Synkra AIOS Docs',
    description: 'AI-Orchestrated System for Full Stack Development'
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://docs.synkra.ai')
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Analytics />
      <SpeedInsights />
    </>
  )
}
