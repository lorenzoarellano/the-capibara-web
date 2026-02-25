<template>
  <section class="relative min-h-screen flex items-center overflow-hidden pt-28 pb-16 bg-white dark:bg-[#010101]">
    <!-- Aurora Borealis Background -->
    <div ref="gradientBg" class="absolute inset-0 z-0 overflow-hidden">
      <!-- Aurora Band 1: Teal wave -->
      <div
        ref="aurora1"
        class="absolute w-[140%] h-[300px] opacity-0 -left-[20%]"
        :style="{
          top: '5%',
          background: $colorMode.value === 'dark'
            ? 'linear-gradient(180deg, transparent 0%, rgba(23,190,187,0.3) 30%, rgba(23,190,187,0.15) 60%, transparent 100%)'
            : 'linear-gradient(180deg, transparent 0%, rgba(14,124,123,0.25) 30%, rgba(14,124,123,0.1) 60%, transparent 100%)',
          filter: 'blur(40px)',
          borderRadius: '50%',
          transform: 'rotate(-8deg) skewX(-15deg)',
        }"
      />
      <!-- Aurora Band 2: Plum/Red wave -->
      <div
        ref="aurora2"
        class="absolute w-[130%] h-[250px] opacity-0 -left-[15%]"
        :style="{
          top: '25%',
          background: $colorMode.value === 'dark'
            ? 'linear-gradient(180deg, transparent 0%, rgba(212,244,221,0.2) 35%, rgba(23,190,187,0.15) 65%, transparent 100%)'
            : 'linear-gradient(180deg, transparent 0%, rgba(214,34,70,0.2) 35%, rgba(75,29,63,0.15) 65%, transparent 100%)',
          filter: 'blur(50px)',
          borderRadius: '50%',
          transform: 'rotate(5deg) skewX(10deg)',
        }"
      />
      <!-- Aurora Band 3: Accent shimmer -->
      <div
        ref="aurora3"
        class="absolute w-[120%] h-[200px] opacity-0 -left-[10%]"
        :style="{
          top: '50%',
          background: $colorMode.value === 'dark'
            ? 'linear-gradient(180deg, transparent 0%, rgba(23,190,187,0.18) 40%, rgba(212,244,221,0.12) 70%, transparent 100%)'
            : 'linear-gradient(180deg, transparent 0%, rgba(14,124,123,0.18) 40%, rgba(214,34,70,0.12) 70%, transparent 100%)',
          filter: 'blur(45px)',
          borderRadius: '50%',
          transform: 'rotate(-3deg) skewX(-8deg)',
        }"
      />
      <!-- Aurora Band 4: Bottom glow -->
      <div
        ref="aurora4"
        class="absolute w-[150%] h-[280px] opacity-0 -left-[25%]"
        :style="{
          bottom: '0%',
          background: $colorMode.value === 'dark'
            ? 'linear-gradient(180deg, transparent 0%, rgba(23,190,187,0.12) 50%, rgba(212,244,221,0.08) 80%, transparent 100%)'
            : 'linear-gradient(180deg, transparent 0%, rgba(75,29,63,0.12) 50%, rgba(14,124,123,0.08) 80%, transparent 100%)',
          filter: 'blur(60px)',
          borderRadius: '50%',
          transform: 'rotate(6deg) skewX(12deg)',
        }"
      />
      <!-- Soft vignette overlay -->
      <div
        class="absolute inset-0"
        :class="$colorMode.value === 'dark'
          ? 'bg-gradient-to-b from-[#010101]/50 via-transparent to-[#010101]/60'
          : 'bg-gradient-to-b from-white/40 via-transparent to-white/50'"
      />
    </div>

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
          <div ref="heroCtas" class="gsap-reveal flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-3">
            <button class="btn-primary text-sm sm:text-base !px-6 !py-3" @click="handleSchedule">
              <CalendarCheck :size="18" />
              {{ $t('hero.cta') }}
            </button>
            <a
              href="#servicios"
              class="btn-secondary text-sm sm:text-base !px-6 !py-3"
              @click.prevent="scrollToServices"
            >
              <ArrowDown :size="18" />
              {{ $t('hero.ctaSecondary') }}
            </a>
          </div>
        </div>

        <!-- Lado derecho: Video/Imagen animada -->
        <div ref="heroImageWrapper" class="gsap-reveal relative flex items-center justify-center">
          <div class="relative max-w-xs sm:max-w-sm lg:max-w-md mx-auto">
            <img
              v-show="$colorMode.value !== 'dark'"
              ref="heroImageLight"
              src="/hero-light.webp"
              alt="The Capibara Web - Software Engineering"
              class="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
              loading="eager"
            />
            <img
              v-show="$colorMode.value === 'dark'"
              ref="heroImageDark"
              src="/hero-dark.webp"
              alt="AI Solutions Durango"
              class="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-1000"
              loading="eager"
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

// Aurora refs
const gradientBg = ref<HTMLElement | null>(null)
const aurora1 = ref<HTMLElement | null>(null)
const aurora2 = ref<HTMLElement | null>(null)
const aurora3 = ref<HTMLElement | null>(null)
const aurora4 = ref<HTMLElement | null>(null)

function handleSchedule() {
  openWhatsApp()
}

function scrollToServices() {
  const el = document.getElementById('servicios')
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

onMounted(() => {
  const gsap = $gsap as typeof import('gsap').gsap

  // ── Aurora Borealis: Fade in + flowing wave motion ──
  const auroras = [aurora1.value, aurora2.value, aurora3.value, aurora4.value]

  // Fade in all aurora bands
  gsap.to(auroras, {
    opacity: 1,
    duration: 3,
    stagger: 0.5,
    ease: 'power2.out',
  })

  // Band 1: Slow horizontal wave + vertical pulse
  gsap.to(aurora1.value, {
    x: '8%',
    y: 30,
    scaleY: 1.3,
    skewX: '-20deg',
    duration: 7,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  })
  gsap.to(aurora1.value, {
    rotation: -12,
    duration: 11,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  })

  // Band 2: Counter-direction flow + height morph
  gsap.to(aurora2.value, {
    x: '-6%',
    y: -25,
    scaleY: 0.7,
    skewX: '18deg',
    duration: 9,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  })
  gsap.to(aurora2.value, {
    rotation: 10,
    duration: 13,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  })

  // Band 3: Gentle shimmer + drift
  gsap.to(aurora3.value, {
    x: '5%',
    y: 20,
    scaleY: 1.5,
    scaleX: 0.95,
    duration: 11,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  })
  gsap.to(aurora3.value, {
    rotation: -7,
    skewX: '5deg',
    duration: 15,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  })

  // Band 4: Bottom wave
  gsap.to(aurora4.value, {
    x: '-4%',
    y: -15,
    scaleY: 1.2,
    duration: 8,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  })
  gsap.to(aurora4.value, {
    rotation: -8,
    skewX: '-6deg',
    duration: 10,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  })

  // ── Animaciones de entrada del contenido ──
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
