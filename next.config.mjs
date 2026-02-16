import nextra from 'nextra'

const withNextra = nextra({
  search: true,
  latex: true,
  defaultShowCopyCode: true
})

export default withNextra({
  reactStrictMode: true,
  i18n: {
    locales: ['pt-BR', 'en', 'es'],
    defaultLocale: 'pt-BR'
  },
  async redirects() {
    return [
      {
        source: '/:lang(pt-BR|en|es)',
        destination: '/:lang/docs',
        permanent: false
      }
    ]
  }
})
