import { Footer, Layout, LocaleSwitch, Navbar, ThemeSwitch } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'

const footer = (
  <Footer>
    <div style={{ textAlign: 'center' }}>
      <p>MIT {new Date().getFullYear()} © Synkra AI</p>
      <p style={{ fontSize: '0.85rem', opacity: 0.7, marginTop: '0.5rem' }}>
        Built with ❤️ by{' '}
        <a
          href="https://github.com/bychrisr"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'inherit', textDecoration: 'underline' }}
        >
          @bychrisr
        </a>
        {' • '}
        Maintained by AIOS Community
      </p>
    </div>
  </Footer>
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
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var theme = localStorage.getItem('theme');
                if (!theme) {
                  localStorage.setItem('theme', 'light');
                  document.documentElement.classList.add('light');
                }
              } catch (e) {}
            `
          }}
        />
      </Head>
      <body>
        <Layout
          navbar={
            <Navbar
              logo={
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontWeight: 800, fontSize: '1.1rem' }}>Synkra AIOS</span>
                  <span className="logo-subtitle" style={{ fontWeight: 400, fontSize: '0.85rem', opacity: 0.6 }}>{subtitles[lang] || subtitles.en}</span>
                </span>
              }
            >
              <ThemeSwitch />
              <LocaleSwitch />
              <a
                href="https://github.com/SynkraAI/aios-core"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Project repository"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  color: 'inherit'
                }}
              >
                <svg height="24" width="24" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                </svg>
              </a>
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
