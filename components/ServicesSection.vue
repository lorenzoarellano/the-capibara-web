<template>
  <section id="servicios" class="py-24 sm:py-32">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <!-- Header -->
      <div class="text-center mb-16">
        <span class="section-badge gsap-reveal">{{ $t('services.badge') }}</span>
        <h2 class="section-title mt-6 gsap-reveal">{{ $t('services.title') }}</h2>
        <p class="section-subtitle mt-4 gsap-reveal">{{ $t('services.subtitle') }}</p>
      </div>

      <!-- Contenedor de cards para la animación scroll-pinned -->
      <div ref="cardsContainer" class="relative min-h-[500px]">
        <div
          ref="cardsWrapper"
          class="flex flex-wrap justify-center gap-4 items-start"
        >
          <div
            v-for="(service, index) in allServicesData"
            :key="index"
            ref="cardRefs"
            class="service-card service-gradient-border rounded-3xl p-[2px] overflow-hidden w-full sm:w-[340px] lg:w-[320px] opacity-0"
          >
            <article
              class="relative rounded-[22px] overflow-hidden group min-h-[400px] h-full flex flex-col justify-end"
            >
              <!-- Imagen de fondo -->
              <img
                :src="allServiceImages[index]"
                :alt="service.title"
                class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <!-- Overlay oscuro -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/35" />

              <!-- Contenido sobre la imagen -->
              <div class="relative z-10 p-8">
                <!-- Icono -->
                <div
                  class="w-12 h-12 rounded-xl flex items-center justify-center mb-5 bg-white/15 backdrop-blur-sm"
                >
                  <component
                    :is="allServiceIcons[index]"
                    :size="24"
                    class="text-white"
                  />
                </div>

                <h3 class="font-heading text-xl font-bold text-white mb-3">
                  {{ service.title }}
                </h3>
                <p class="font-body text-white/80 leading-relaxed mb-5 text-sm">
                  {{ service.description }}
                </p>

                <!-- Tags -->
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="tag in service.tags"
                    :key="tag"
                    class="px-3 py-1 text-xs font-body font-medium rounded-full bg-white/15 backdrop-blur-sm text-white/90"
                  >
                    {{ tag }}
                  </span>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Globe, Bot, Monitor, Search, GraduationCap } from 'lucide-vue-next'

const { t, tm, rt } = useI18n()
const { $gsap, $ScrollTrigger } = useNuxtApp()

const cardsContainer = ref<HTMLElement | null>(null)
const cardsWrapper = ref<HTMLElement | null>(null)
const cardRefs = ref<HTMLElement[]>([])

// Iconos e imágenes de todos los servicios en orden
const allServiceIcons = [Globe, Bot, Monitor, Search, GraduationCap]
const allServiceImages = [
  '/services/web-desing.webp',
  '/services/ai-automation.webp',
  '/services/saas.webp',
  '/services/seo.webp',
  '/services/tech-ai.webp',
]

// Rotaciones finales para el layout en abanico (en grados)
const fanRotations = [-6, -3, 0, 3, 6]
// Desplazamientos verticales para el efecto cascada
const fanOffsets = [20, 8, 0, 8, 20]

const allServicesData = computed(() => {
  const raw = tm('services.items')
  if (!Array.isArray(raw)) return []
  return raw.map((item: any) => ({
    title: rt(item.title),
    description: rt(item.description),
    tags: Array.isArray(item.tags) ? item.tags.map((tag: any) => rt(tag)) : [],
  }))
})

onMounted(() => {
  const gsap = $gsap as typeof import('gsap').gsap
  const ScrollTrigger = $ScrollTrigger as typeof import('gsap/ScrollTrigger').ScrollTrigger

  if (!cardsContainer.value || !cardRefs.value.length) return

  // Animación del header
  gsap.utils.toArray<HTMLElement>('#servicios .gsap-reveal').forEach((el) => {
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

  // Timeline principal con pin
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: cardsContainer.value,
      start: 'top 20%',
      end: `+=${cardRefs.value.length * 400}`,
      pin: true,
      scrub: 1,
      anticipatePin: 1,
    },
  })

  // Cada card entra una a una desde abajo con rotación
  cardRefs.value.forEach((card, i) => {
    tl.fromTo(
      card,
      {
        opacity: 0,
        y: 200,
        rotate: 15,
        scale: 0.85,
      },
      {
        opacity: 1,
        y: fanOffsets[i],
        rotate: fanRotations[i],
        scale: 1,
        duration: 1,
        ease: 'power3.out',
      },
      i * 0.6, // Escalonamiento entre cards
    )
  })
})
</script>

<style scoped>
/* Borde degradado multicolor */
.service-gradient-border {
  background: linear-gradient(135deg, #0E7C7B, #17BEBB, #D4F4DD, #D62246, #4B1D3F);
}

.service-card {
  will-change: transform, opacity;
}
</style>
