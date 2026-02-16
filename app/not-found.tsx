export default function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem' }}>404 — Page Not Found</h1>
      <p style={{ color: 'var(--nextra-text-secondary)', marginBottom: '2rem' }}>
        A pagina que voce procura nao existe ou foi movida.
      </p>
      <a
        href="/"
        style={{
          color: 'var(--nextra-primary)',
          textDecoration: 'underline'
        }}
      >
        Voltar para a pagina inicial
      </a>
    </div>
  )
}
