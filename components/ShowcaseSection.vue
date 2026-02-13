<template>
  <section id="proyectos" class="py-24 sm:py-32">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <!-- Header -->
      <div class="text-center mb-16">
        <span class="section-badge gsap-reveal">{{ $t('showcase.badge') }}</span>
        <h2 class="section-title mt-6 gsap-reveal">{{ $t('showcase.title') }}</h2>
        <p class="section-subtitle mt-4 gsap-reveal">{{ $t('showcase.subtitle') }}</p>
      </div>

      <!-- Projects Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        <article
          v-for="(project, index) in projects"
          :key="index"
          class="glass-card overflow-hidden group hover:shadow-2xl transition-all duration-500 gsap-reveal flex flex-col"
        >
          <!-- Imagen del proyecto con efecto mask luminance -->
          <div class="relative w-full aspect-video bg-capibara-100 dark:bg-capibara-800/50 overflow-hidden">
            <img
              :src="projectImages[index]"
              :alt="project.title"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
          </div>

          <!-- Zona de contenido con color ambiental de la imagen -->
          <div class="relative overflow-hidden bg-white/40 dark:bg-white/[0.03] flex-grow flex flex-col">
            <!-- Imagen difuminada como fondo ambiental -->
            <img
              :src="projectImages[index]"
              :alt="''"
              aria-hidden="true"
              class="absolute inset-0 w-full h-full object-cover scale-150 blur-[60px] opacity-30 dark:opacity-25 pointer-events-none"
            />

            <!-- Contenido sobre el fondo ambiental -->
            <div class="relative z-10 flex-grow flex flex-col">
              <!-- Top Bar with metric -->
              <div class="px-8 pt-8 pb-4 flex items-start justify-between">
                <div>
                  <span
                    class="text-xs font-body font-semibold uppercase tracking-wider text-capibara-500 dark:text-capibara-400"
                  >
                    {{ project.category }}
                  </span>
                  <h3
                    class="font-heading text-2xl sm:text-3xl font-bold text-capibara-900 dark:text-capibara-100 mt-2"
                  >
                    {{ project.title }}
                  </h3>
                </div>
                <!-- Metric Badge -->
                <div
                  class="flex-shrink-0 ml-4 glass-card !rounded-2xl px-5 py-3 text-center group-hover:scale-105 transition-transform duration-300"
                >
                  <span
                    class="block text-xl font-heading font-bold text-capibara-900 dark:text-capibara-100"
                  >
                    {{ project.metric }}
                  </span>
                  <span class="block text-[10px] font-body text-capibara-500 dark:text-capibara-400 uppercase tracking-wider mt-0.5">
                    {{ project.metricLabel }}
                  </span>
                </div>
              </div>

              <!-- Description -->
              <div class="px-8 pb-6">
                <p class="font-body text-capibara-600 dark:text-capibara-400 leading-relaxed">
                  {{ project.description }}
                </p>
              </div>

              <!-- Tags & CTA -->
              <div
                class="px-8 pb-8 flex flex-wrap items-center justify-between gap-4 mt-auto"
              >
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="tag in project.tags"
                    :key="tag"
                    class="px-3 py-1 text-xs font-body font-medium rounded-full bg-capibara-900/5 dark:bg-capibara-300/10 text-capibara-700 dark:text-capibara-300"
                  >
                    {{ tag }}
                  </span>
                </div>
                <div class="flex flex-wrap gap-4">
                  <template v-if="projectLinks[index]">
                    <a
                      v-for="(link, li) in projectLinks[index]"
                      :key="li"
                      :href="link.url"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="group/link flex items-center gap-2 text-sm font-heading font-bold text-capibara-600 dark:text-capibara-400 hover:text-capibara-900 dark:hover:text-capibara-100 transition-all duration-300"
                    >
                      <span class="relative">
                        {{ link.label || $t('showcase.viewProject') }}
                        <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-capibara-500 transition-all duration-300 group-hover/link:w-full"></span>
                      </span>
                      <ArrowRight :size="16" class="transform group-hover/link:translate-x-1 transition-transform" />
                    </a>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'

const { tm, rt } = useI18n()
const { $gsap } = useNuxtApp()

// Mapa de imágenes de los proyectos (mismo orden que en i18n)
const projectImages = [
  '/success/columbus.webp',
  '/success/medicynia.webp',
  '/success/emirsa.webp',
  '/success/alvarado.webp',
  '/success/doctordigital.webp',
  '/success/agtronix.webp',
]

// Links externos de cada proyecto
const projectLinks: { label?: string; url: string }[][] = [
  [
    { label: 'Education Canada', url: 'https://educationcanada.com/' },
    { label: 'jFairs', url: 'https://jfairs.com/' },
  ],
  [{ url: 'https://medicynia.com/' }],
  [{ url: 'https://emirsa.mx/' }],
  [{ url: 'https://alvaradomining.mx/' }],
  [{ url: 'https://doctordigital.mx/' }],
  [{ url: 'https://ag-tronix.com/' }],
]

const projects = computed(() => {
  const raw = tm('showcase.projects')
  if (!Array.isArray(raw)) return []
  return raw.map((item: any) => ({
    title: rt(item.title),
    category: rt(item.category),
    description: rt(item.description),
    metric: rt(item.metric),
    metricLabel: rt(item.metricLabel),
    tags: Array.isArray(item.tags) ? item.tags.map((tag: any) => rt(tag)) : [],
  }))
})

onMounted(() => {
  const gsap = $gsap as typeof import('gsap').gsap

  gsap.utils.toArray<HTMLElement>('#proyectos .gsap-reveal').forEach((el, i) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        delay: i * 0.12,
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      },
    )
  })
})
</script>
