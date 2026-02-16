import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'

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

const navbar = (
  <Navbar
    logo={<span style={{ fontWeight: 800, fontSize: '1.1rem' }}>Synkra AIOS</span>}
    projectLink="https://github.com/SynkraAI/aios-core"
  />
)

const footer = (
  <Footer>MIT {new Date().getFullYear()} © Synkra AI</Footer>
)

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const pageMap = await getPageMap()
  return (
    <html lang="pt-BR" dir="ltr" suppressHydrationWarning>
      <Head />
      <body>
        <Layout
          navbar={navbar}
          pageMap={pageMap}
          docsRepositoryBase="https://github.com/SynkraAI/aios-core/tree/main"
          footer={footer}
          editLink="Edit this page"
          sidebar={{ defaultMenuCollapseLevel: 1 }}
          toc={{ title: 'Nesta pagina' }}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
