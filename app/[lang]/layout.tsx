import { Footer, Layout, LocaleSwitch, Navbar } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'

const footer = (
  <Footer>MIT {new Date().getFullYear()} © Synkra AI</Footer>
)


const subtitles: Record<string, string> = {
  'pt-BR': 'Framework Universal de Agentes IA',
  en: 'Universal AI Agent Framework',
  es: 'Framework Universal de Agentes IA'
}

const tocTitles: Record<string, string> = {
  'pt-BR': 'Nesta página',
  en: 'On this page',
  es: 'En esta página'
}

const editLabels: Record<string, string> = {
  'pt-BR': 'Editar esta página',
  en: 'Edit this page',
  es: 'Editar esta página'
}

export default async function LangLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const pageMap = await getPageMap(lang)
  return (
    <html lang={lang} dir="ltr" suppressHydrationWarning>
      <Head />
      <body>
        <Layout
          navbar={
            <Navbar
              logo={
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontWeight: 800, fontSize: '1.1rem' }}>Synkra AIOS</span>
                  <span style={{ fontWeight: 400, fontSize: '0.85rem', opacity: 0.6 }}>{subtitles[lang] || subtitles.en}</span>
                </span>
              }
              projectLink="https://github.com/SynkraAI/aios-core"
            >
              <LocaleSwitch />
            </Navbar>
          }
          pageMap={pageMap}
          docsRepositoryBase="https://github.com/SynkraAI/aios-core/tree/main"
          footer={footer}
          editLink={editLabels[lang] || 'Edit this page'}
          sidebar={{ defaultMenuCollapseLevel: 1 }}
          toc={{ title: tocTitles[lang] || 'On this page' }}
          i18n={[
            { locale: 'pt-BR', name: 'PT-BR' },
            { locale: 'en', name: 'EN' },
            { locale: 'es', name: 'ES' }
          ]}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
