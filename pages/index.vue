<template>
  <div>
    <HeroSection />
    <ServicesSection />
    <NewsSection v-if="locale === 'es'" />
    <ShowcaseSection />
    <TrainingSection />
    <BeforeAfterSection />
    <TrustSection />
    <ContactSection />
  </div>
</template>

<script setup lang="ts">
const { t, locale } = useI18n()

// SEO Meta
useHead({
  title: t('meta.title'),
  htmlAttrs: {
    lang: locale.value
  },
  meta: [
    { name: 'description', content: t('meta.description') },
    { property: 'og:title', content: t('meta.title') },
    { property: 'og:description', content: t('meta.description') },
  ],
})

// JSON-LD Structured Data
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: computed(() =>
        JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'ProfessionalService',
              '@id': 'https://thecapibaraweb.com.mx/#organization',
              name: 'The Capibara Web',
              alternateName: 'TheCapibaraWeb',
              url: 'https://thecapibaraweb.com.mx',
              logo: 'https://thecapibaraweb.com.mx/logo.webp',
              image: 'https://thecapibaraweb.com.mx/logo.webp',
              description:
                locale.value === 'es'
                  ? 'Factoría de Soluciones Digitales con más de 12 años de experiencia. Desarrollo de software senior con Vue.js, Node.js y AWS. Consultoría de IA para empresas. SaaS especializados en HealthTech y EdTech.'
                  : 'Digital Solutions Factory with over 12 years of experience. Senior software development with Vue.js, Node.js, and AWS. AI consulting for businesses. Specialized SaaS in HealthTech and EdTech.',
              email: 'contacto@thecapibaraweb.com.mx',
              telephone: '+526181835957',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Durango',
                addressRegion: 'Durango',
                addressCountry: 'MX',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: '24.0277',
                longitude: '-104.6532',
              },
              areaServed: [
                { '@type': 'Country', name: 'Mexico' },
                { '@type': 'Country', name: 'United States' },
                { '@type': 'Country', name: 'Canada' },
              ],
              sameAs: [
                'https://www.instagram.com/thecapibaraweb/',
                'https://www.facebook.com/TheCapibaraWebCompany',
              ],
              knowsAbout: [
                'Vue.js',
                'Node.js',
                'Nuxt',
                'AWS',
                'OpenAI',
                'Tailwind CSS',
                'MariaDB',
                'Software Development',
                'Artificial Intelligence',
                'SaaS',
                'HealthTech',
                'EdTech',
                'IoT',
              ],
              foundingDate: '2014',
              priceRange: '$$',
              openingHoursSpecification: {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                opens: '09:00',
                closes: '18:00',
              },
            },
            {
              '@type': 'WebSite',
              '@id': 'https://thecapibaraweb.com.mx/#website',
              url: 'https://thecapibaraweb.com.mx',
              name: 'The Capibara Web',
              publisher: { '@id': 'https://thecapibaraweb.com.mx/#organization' },
              inLanguage: ['es-MX', 'en-US'],
            },
            {
              '@type': 'FAQPage',
              mainEntity: [
                {
                  '@type': 'Question',
                  name: locale.value === 'es' ? '¿Qué servicios ofrece The Capibara Web?' : 'What services does The Capibara Web offer?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: locale.value === 'es' 
                      ? 'Ofrecemos diseño y desarrollo web premium, inteligencia artificial, sistemas a medida (SaaS), posicionamiento digital (SEO/AEO/LLMO) y capacitación empresarial.'
                      : 'We offer premium web design and development, artificial intelligence, custom systems (SaaS), digital positioning (SEO/AEO/LLMO), and corporate training.'
                  }
                },
                {
                  '@type': 'Question',
                  name: locale.value === 'es' ? '¿Tienen experiencia en el sector minero?' : 'Do you have experience in the mining sector?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: locale.value === 'es'
                      ? 'Sí, contamos con amplia experiencia desarrollando sitios corporativos y dashboards para empresas como Emirsa y Alvarado Mining.'
                      : 'Yes, we have extensive experience developing corporate sites and dashboards for companies like Emirsa and Alvarado Mining.'
                  }
                }
              ]
            },
            {
              '@type': 'Service',
              name: 'Desarrollo Web Premium',
              description: 'Diseño y desarrollo de sitios web corporativos con Nuxt.js y Vue.js.',
              provider: { '@id': 'https://thecapibaraweb.com.mx/#organization' },
              areaServed: ['MX', 'US', 'CA']
            },
            {
              '@type': 'Service',
              name: 'Consultoría en IA',
              description: 'Implementación de chatbots, automatización y análisis de datos con IA.',
              provider: { '@id': 'https://thecapibaraweb.com.mx/#organization' },
              areaServed: ['MX', 'US', 'CA']
            }
          ],
        }),
      ),
    },
  ],
})
</script>
