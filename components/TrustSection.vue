<template>
  <section class="py-24 sm:py-32 overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <!-- Header -->
      <div class="text-center mb-16">
        <span class="section-badge gsap-reveal">{{ $t('trust.badge') }}</span>
        <h2 class="section-title mt-6 gsap-reveal">{{ $t('trust.title') }}</h2>
        <p class="section-subtitle mt-4 gsap-reveal">{{ $t('trust.subtitle') }}</p>
      </div>

      <!-- Logos Marquee -->
      <div class="relative gsap-reveal">
        <!-- Gradient fades -->
        <div
          class="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-white dark:from-capibara-900 to-transparent pointer-events-none"
        />
        <div
          class="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-white dark:from-capibara-900 to-transparent pointer-events-none"
        />

        <!-- Scrolling track -->
        <div class="flex animate-marquee gap-12 items-center">
          <div
            v-for="(client, index) in [...clients, ...clients]"
            :key="`trust-${index}`"
            class="flex-shrink-0 glass-card !rounded-2xl px-8 py-6 flex items-center justify-center min-w-[200px] h-24 group transition-all duration-500"
          >
            <!-- Placeholder: shows name, replace with <img> when logos are available -->
            <img
              v-if="client.hasLogo"
              :src="`/clients/${client.slug}.webp`"
              :alt="client.name"
              class="h-10 w-auto object-contain grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
              loading="lazy"
            />
            <span
              v-else
              class="font-heading text-lg font-bold text-capibara-400 group-hover:text-capibara-900 dark:group-hover:text-capibara-100 transition-colors duration-500 whitespace-nowrap"
            >
              {{ client.name }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { $gsap } = useNuxtApp()

const clients = [
  { name: 'Agtronix', slug: 'agtronix', hasLogo: false },
  { name: 'Education America', slug: 'education-america', hasLogo: false },
  { name: 'Medicynia', slug: 'medicynia', hasLogo: false },
  { name: 'Doctor Digital', slug: 'doctor-digital', hasLogo: false },
]

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

.animate-marquee {
  animation: marquee 25s linear infinite;
}

.animate-marquee:hover {
  animation-play-state: paused;
}
</style>
