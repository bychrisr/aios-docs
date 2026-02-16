import nextra from 'nextra'

const withNextra = nextra({
  search: true,
  latex: true,
  defaultShowCopyCode: true
})

export default withNextra({
  reactStrictMode: true,
  i18n: {
    locales: ['pt-BR', 'en'],
    defaultLocale: 'pt-BR'
  }
})
