<template>
  <div>
    <HeroSection />
    <ServicesSection />
    <ShowcaseSection />
    <TrainingSection />
    <BeforeAfterSection />
    <TechSection />
    <TrustSection />
    <FaqSection />
    <ContactSection />
  </div>
</template>

<script setup lang="ts">
const { t, tm, rt, locale } = useI18n()

// SEO Meta
useHead({
  title: t('meta.title'),
  meta: [
    { name: 'description', content: t('meta.description') },
    { property: 'og:title', content: t('meta.title') },
    { property: 'og:description', content: t('meta.description') },
  ],
})

// JSON-LD Structured Data
const faqItems = computed(() => {
  const raw = tm('faq.items')
  if (!Array.isArray(raw)) return []
  return raw.map((item: any) => ({
    '@type': 'Question',
    name: rt(item.question),
    acceptedAnswer: {
      '@type': 'Answer',
      text: rt(item.answer),
    },
  }))
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      children: computed(() =>
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
              email: 'contacto@thecapibaraweb.mx',
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
                'https://www.facebook.com/arellanolorenzo4',
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
              '@id': 'https://thecapibaraweb.com.mx/#faq',
              mainEntity: faqItems.value,
            },
            {
              '@type': 'SoftwareApplication',
              name: 'Medicynia',
              applicationCategory: 'HealthApplication',
              operatingSystem: 'Web',
              description:
                'Plataforma SaaS de gestión médica integral en México. Expediente clínico electrónico, agenda inteligente, telemedicina y facturación automatizada.',
              author: { '@id': 'https://thecapibaraweb.com.mx/#organization' },
            },
          ],
        }),
      ),
    },
  ],
})
</script>
