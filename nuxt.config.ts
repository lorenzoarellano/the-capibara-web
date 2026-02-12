export default defineNuxtConfig({
  ssr: true,

  app: {
    head: {
      htmlAttrs: { lang: 'es' },
      title: 'The Capibara Web | Software Engineering & AI Solutions',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Transformamos ideas complejas en infraestructuras digitales escalables. Más de 12 años desarrollando software, IA y soluciones SaaS para empresas en México, EE. UU. y Canadá.',
        },
        {
          property: 'og:title',
          content: 'The Capibara Web | Software Engineering & AI Solutions',
        },
        {
          property: 'og:description',
          content:
            'Factoría de Soluciones Digitales. Desarrollo de software senior, consultoría de IA para empresas y SaaS especializados en HealthTech y EdTech.',
        },
        { property: 'og:image', content: 'https://thecapibaraweb.com.mx/og-image.webp' },
        { property: 'og:url', content: 'https://thecapibaraweb.com.mx' },
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'es_MX' },
        { property: 'og:locale:alternate', content: 'en_US' },
        { property: 'og:site_name', content: 'The Capibara Web' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'The Capibara Web | Software Engineering & AI Solutions' },
        {
          name: 'twitter:description',
          content:
            'Factoría de Soluciones Digitales con más de 12 años de experiencia en desarrollo de software e IA.',
        },
        { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1' },
        { name: 'author', content: 'The Capibara Web' },
        { name: 'geo.region', content: 'MX-DUR' },
        { name: 'geo.placename', content: 'Durango' },
      ],
      link: [
        { rel: 'canonical', href: 'https://thecapibaraweb.com.mx' },
        { rel: 'icon', type: 'image/webp', href: '/logo.webp' },
      ],
    },
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    '@nuxtjs/color-mode',
    '@nuxtjs/google-fonts',
  ],

  css: ['~/assets/css/main.css'],

  colorMode: {
    classSuffix: '',
    preference: 'light',
    fallback: 'light',
  },

  googleFonts: {
    families: {
      Cinzel: [400, 700],
      'Open+Sans': [300, 400, 500, 600, 700],
    },
    display: 'swap',
    preload: true,
    download: true,
  },

  i18n: {
    locales: [
      { code: 'es', name: 'Español', file: 'es.json' },
      { code: 'en', name: 'English', file: 'en.json' },
    ],
    defaultLocale: 'es',
    lazy: true,
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_lang',
      redirectOn: 'root',
    },
    bundle: {
      optimizeTranslationDirective: false,
    },
  },

  nitro: {
    prerender: {
      routes: ['/'],
    },
  },

  compatibilityDate: '2024-12-01',
})
