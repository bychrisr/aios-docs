import { cookies } from 'next/headers'

const messages = {
  'pt-BR': {
    title: '404 — Página não encontrada',
    description: 'A página que você procura não existe ou foi movida.',
    docs: 'Documentação',
    playbook: 'Playbook',
    home: 'Página inicial',
    search: 'Tente buscar pelo conteúdo usando a barra de pesquisa.',
  },
  en: {
    title: '404 — Page not found',
    description: 'The page you are looking for does not exist or has been moved.',
    docs: 'Documentation',
    playbook: 'Playbook',
    home: 'Home',
    search: 'Try searching for content using the search bar.',
  },
  es: {
    title: '404 — Página no encontrada',
    description: 'La página que buscas no existe o fue movida.',
    docs: 'Documentación',
    playbook: 'Playbook',
    home: 'Inicio',
    search: 'Intenta buscar el contenido usando la barra de búsqueda.',
  },
} as const

type Locale = keyof typeof messages

export default async function NotFound() {
  const cookieStore = await cookies()
  const rawLocale = cookieStore.get('NEXT_LOCALE')?.value ?? 'pt-BR'
  const locale: Locale = rawLocale in messages ? (rawLocale as Locale) : 'pt-BR'
  const msg = messages[locale]

  return (
    <div style={{ textAlign: 'center', padding: '4rem 1rem', maxWidth: '480px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem' }}>
        {msg.title}
      </h1>
      <p style={{ color: 'var(--nextra-text-secondary)', marginBottom: '0.5rem' }}>
        {msg.description}
      </p>
      <p style={{ color: 'var(--nextra-text-secondary)', marginBottom: '2rem', fontSize: '0.9rem' }}>
        {msg.search}
      </p>
      <nav style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <a
          href={`/${locale}/docs`}
          style={{ color: 'var(--nextra-primary)', textDecoration: 'underline' }}
        >
          {msg.docs}
        </a>
        <a
          href={`/${locale}/playbook`}
          style={{ color: 'var(--nextra-primary)', textDecoration: 'underline' }}
        >
          {msg.playbook}
        </a>
        <a
          href={`/${locale}`}
          style={{ color: 'var(--nextra-primary)', textDecoration: 'underline' }}
        >
          {msg.home}
        </a>
      </nav>
    </div>
  )
}
