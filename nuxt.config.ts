export default defineNuxtConfig({
  ssr: true,
  devServer: {
    port: parseInt(process.env.MAIN_PORT || '3003'),
  },

  app: {
    head: {
      // htmlAttrs will be handled by useHead in index.vue or globally
      title: 'The Capibara Web | Software Engineering & AI Solutions',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'The Capibara Web: Factoría de Ingeniería de Software e IA. Especialistas en desarrollo web premium, sistemas SaaS y consultoría de Inteligencia Artificial en México, EE. UU. y Canadá.',
        },
        {
          property: 'og:title',
          content: 'The Capibara Web | Ingeniería de Software & Soluciones de IA',
        },
        {
          property: 'og:description',
          content:
            'Desarrollo de software senior, consultoría de IA para empresas y plataformas SaaS. Transformamos tu visión en infraestructura digital escalable.',
        },
        { property: 'og:image', content: 'https://thecapibaraweb.com.mx/social-share-cover.jpg' },
        { property: 'og:url', content: 'https://thecapibaraweb.com.mx' },
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'es_MX' },
        { property: 'og:locale:alternate', content: 'en_US' },
        { property: 'og:site_name', content: 'The Capibara Web' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'The Capibara Web | Ingeniería de Software & Soluciones de IA' },
        { name: 'twitter:image', content: 'https://thecapibaraweb.com.mx/social-share-cover.jpg' },
        {
          name: 'twitter:description',
          content:
            'Factoría de Soluciones Digitales con más de 12 años de experiencia en desarrollo de software e IA.',
        },
        { name: 'robots', content: 'index, follow, max-image-preview:large' },
        { name: 'author', content: 'The Capibara Web' },
        { name: 'geo.region', content: 'MX-DUR' },
        { name: 'geo.placename', content: 'Durango' },
        { name: 'keywords', content: 'desarrollo web, sistemas web, inteligencia artificial, software a medida, SaaS, Durango, México, IA empresas' },
      ],
      link: [
        { rel: 'canonical', href: 'https://thecapibaraweb.com.mx' },
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'dns-prefetch', href: 'https://fonts.googleapis.com' },
      ],
    },
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    '@nuxtjs/color-mode',
    '@nuxtjs/google-fonts',
    '@nuxt/image',
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
      'Open+Sans': [400, 700],
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
    detectBrowserLanguage: false,
    bundle: {
      optimizeTranslationDirective: false,
    },
  },

  nitro: {
    compressPublicAssets: {
      brotli: true,
      gzip: true,
    },
    prerender: {
      routes: [],
    },
    // Cache de larga duración para activos estáticos (ahorro ~8MB)
    routeRules: {
      '/_nuxt/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
      '/**/*.webp': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
      '/**/*.jpg': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
      '/**/*.png': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
      '/**/*.woff2': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
    },
  },

  compatibilityDate: '2024-12-01',
  runtimeConfig: {
    smtpHost: process.env.SMTP_HOST,
    smtpPort: process.env.SMTP_PORT,
    smtpUser: process.env.SMTP_USER,
    smtpPass: process.env.SMTP_PASS,
    contactEmail: process.env.CONTACT_EMAIL,
    webcybert: process.env.WEBCYBERT,
  },
})
