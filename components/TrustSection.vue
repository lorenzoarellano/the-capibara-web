<template>
  <section class="py-24 sm:py-32 overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <!-- Header -->
      <div class="text-center mb-16">
        <span class="section-badge gsap-reveal">{{ $t('trust.badge') }}</span>
        <h2 class="section-title mt-6 gsap-reveal">{{ $t('trust.title') }}</h2>
        <p class="section-subtitle mt-4 gsap-reveal">{{ $t('trust.subtitle') }}</p>
      </div>

      <!-- Logos Marquee — Dos filas en direcciones opuestas -->
      <div class="relative gsap-reveal space-y-6">

        <!-- Fila 1: izquierda a derecha -->
        <div class="flex animate-marquee gap-8 items-center">
          <div
            v-for="(client, index) in row1Loop"
            :key="`row1-${index}`"
            class="flex-shrink-0 glass-card !rounded-2xl px-8 py-5 flex items-center justify-center min-w-[180px] h-20 group transition-all duration-500"
          >
            <img
              :src="`/clients/${client.slug}.webp`"
              :alt="client.name"
              class="h-10 w-auto object-contain opacity-70 group-hover:opacity-100 transition-all duration-500"
              loading="lazy"
            />
          </div>
        </div>

        <!-- Fila 2: derecha a izquierda -->
        <div class="flex animate-marquee-reverse gap-8 items-center">
          <div
            v-for="(client, index) in row2Loop"
            :key="`row2-${index}`"
            class="flex-shrink-0 glass-card !rounded-2xl px-8 py-5 flex items-center justify-center min-w-[180px] h-20 group transition-all duration-500"
          >
            <img
              :src="`/clients/${client.slug}.webp`"
              :alt="client.name"
              class="h-10 w-auto object-contain opacity-70 group-hover:opacity-100 transition-all duration-500"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { $gsap } = useNuxtApp()

// Fila 1: primeros 9 clientes
const row1 = [
  { name: 'Columbus Networks', slug: 'columbus' },
  { name: 'Education Canada', slug: 'ecn' },
  { name: 'Education America', slug: 'ean' },
  { name: 'jFairs', slug: 'jfairs' },
  { name: 'Emirsa', slug: 'emirsa' },
  { name: 'Alvarado Mining', slug: 'alvarado' },
  { name: 'Ag-Tronix', slug: 'agtronix' },
  { name: 'Doctor Digital', slug: 'doctordigital' },
  { name: 'Medicynia', slug: 'medicynia' },
]

// Fila 2: últimos 9 clientes
const row2 = [
  { name: 'CyberTayoltita', slug: 'cybert' },
  { name: 'Dra. Karen Soto', slug: 'drakarensoto' },
  { name: 'Dra. Marlene Soto', slug: 'dramarlenesoto' },
  { name: 'Dr. Edgar', slug: 'dredgar' },
  { name: 'Dr. Jeheiziel', slug: 'drjeheiziel' },
  { name: 'Dr. José Luis', slug: 'drjoseluis' },
  { name: 'Dr. Ricardo Rubio', slug: 'drricardorubio' },
  { name: 'Denise Medina', slug: 'denisemedina' },
  { name: 'Saira Rosales', slug: 'sairarosales' },
]

// Duplicar cada fila para crear el loop infinito sin saltos
const row1Loop = [...row1, ...row1]
const row2Loop = [...row2, ...row2]

onMounted(() => {
  const gsap = $gsap as typeof import('gsap').gsap

  gsap.utils.toArray<HTMLElement>('.gsap-reveal').forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      },
    )
  })
})
</script>

<style scoped>
@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

@keyframes marquee-reverse {
  0% {
    transform: translateX(-50%);
  }
  100% {
    transform: translateX(0);
  }
}

.animate-marquee {
  animation: marquee 30s linear infinite;
}

.animate-marquee-reverse {
  animation: marquee-reverse 30s linear infinite;
}

.animate-marquee:hover,
.animate-marquee-reverse:hover {
  animation-play-state: paused;
}
</style>
