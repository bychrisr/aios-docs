import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'

const navbar = (
  <Navbar
    logo={<span style={{ fontWeight: 800, fontSize: '1.1rem' }}>Synkra AIOS</span>}
    projectLink="https://github.com/SynkraAI/aios-core"
  />
)

const footer = (
  <Footer>MIT {new Date().getFullYear()} © Synkra AI</Footer>
)

const tocTitles: Record<string, string> = {
  'pt-BR': 'Nesta página',
  en: 'On this page'
}

export default async function LangLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const pageMap = await getPageMap(lang)
  return (
    <html lang={lang} dir="ltr" suppressHydrationWarning>
      <Head />
      <body>
        <Layout
          navbar={navbar}
          pageMap={pageMap}
          docsRepositoryBase="https://github.com/SynkraAI/aios-core/tree/main"
          footer={footer}
          editLink={lang === 'en' ? 'Edit this page' : 'Editar esta página'}
          sidebar={{ defaultMenuCollapseLevel: 1 }}
          toc={{ title: tocTitles[lang] || 'On this page' }}
          i18n={[
            { locale: 'pt-BR', name: 'Português' },
            { locale: 'en', name: 'English' }
          ]}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
