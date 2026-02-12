<template>
  <section class="relative min-h-screen flex items-center overflow-hidden pt-28 pb-16 bg-white dark:bg-[#010101]">
    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <!-- Lado izquierdo: Contenido -->
        <div class="text-center lg:text-left">
          <!-- Badge -->
          <div ref="heroBadge" class="gsap-reveal mb-8">
            <span class="section-badge">
              {{ $t('hero.badge') }}
            </span>
          </div>

          <!-- Título -->
          <h1 ref="heroTitle" class="gsap-reveal mb-6">
            <span
              class="block text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-heading font-bold text-capibara-900 dark:text-capibara-100 leading-tight"
            >
              {{ $t('hero.title') }}
            </span>
            <span
              class="block text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-heading font-bold gradient-text leading-tight mt-2"
            >
              {{ $t('hero.titleHighlight') }}
            </span>
          </h1>

          <!-- Subtítulo -->
          <p
            ref="heroSubtitle"
            class="gsap-reveal font-body text-lg sm:text-xl md:text-2xl text-capibara-600 dark:text-capibara-400 max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed"
          >
            {{ $t('hero.subtitle') }}
          </p>

          <!-- CTAs -->
          <div ref="heroCtas" class="gsap-reveal flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4">
            <button class="btn-primary text-base sm:text-lg" @click="handleSchedule">
              <CalendarCheck :size="20" />
              {{ $t('hero.cta') }}
            </button>
            <a
              href="#servicios"
              class="btn-secondary text-base sm:text-lg"
              @click.prevent="scrollToServices"
            >
              <ArrowDown :size="20" />
              {{ $t('hero.ctaSecondary') }}
            </a>
          </div>
        </div>

        <!-- Lado derecho: Imagen -->
        <div ref="heroImageWrapper" class="gsap-reveal relative">
          <div class="relative">
            <img
              v-show="$colorMode.value !== 'dark'"
              ref="heroImageLight"
              src="/hero-light.webp"
              alt="The Capibara Web - Software Engineering"
              class="w-full h-auto object-cover"
              loading="eager"
              fetchpriority="high"
            />
            <img
              v-show="$colorMode.value === 'dark'"
              ref="heroImageDark"
              src="/hero-dark.webp"
              alt="The Capibara Web - AI Solutions"
              class="w-full h-auto object-cover"
              loading="eager"
              fetchpriority="high"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Indicador de scroll -->
    <div
      ref="scrollIndicator"
      class="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-60"
    >
      <div class="w-6 h-10 rounded-full border-2 border-capibara-400 dark:border-capibara-600 flex items-start justify-center p-1.5">
        <div class="w-1.5 h-2.5 rounded-full bg-capibara-400 dark:bg-capibara-500 animate-bounce" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { CalendarCheck, ArrowDown } from 'lucide-vue-next'
import { useWhatsappNotification } from '~/composables/useWhatsappNotification'

const { openWhatsApp } = useWhatsappNotification()
const { $gsap } = useNuxtApp()

const heroImageWrapper = ref<HTMLElement | null>(null)
const heroImageLight = ref<HTMLImageElement | null>(null)
const heroImageDark = ref<HTMLImageElement | null>(null)
const heroBadge = ref<HTMLElement | null>(null)
const heroTitle = ref<HTMLElement | null>(null)
const heroSubtitle = ref<HTMLElement | null>(null)
const heroCtas = ref<HTMLElement | null>(null)
const scrollIndicator = ref<HTMLElement | null>(null)

function handleSchedule() {
  openWhatsApp()
}

function scrollToServices() {
  const el = document.getElementById('servicios')
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

onMounted(() => {
  const gsap = $gsap as typeof import('gsap').gsap

  // Animaciones de entrada del contenido
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

  tl.fromTo(
    heroBadge.value,
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.8 },
  )
    .fromTo(
      heroTitle.value,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1 },
      '-=0.5',
    )
    .fromTo(
      heroSubtitle.value,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8 },
      '-=0.6',
    )
    .fromTo(
      heroCtas.value,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8 },
      '-=0.4',
    )
    // Animación de entrada de la imagen desde la derecha
    .fromTo(
      heroImageWrapper.value,
      { opacity: 0, x: 60, scale: 0.95 },
      { opacity: 1, x: 0, scale: 1, duration: 1.2 },
      '-=1',
    )
    .fromTo(
      scrollIndicator.value,
      { opacity: 0 },
      { opacity: 0.6, duration: 1 },
      '-=0.2',
    )
})
</script>
