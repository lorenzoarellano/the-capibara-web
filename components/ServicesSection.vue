<template>
  <section id="servicios" class="py-24 sm:py-32">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <!-- Header -->
      <div class="text-center mb-16">
        <span class="section-badge gsap-reveal">{{ $t('services.badge') }}</span>
        <h2 class="section-title mt-6 gsap-reveal">{{ $t('services.title') }}</h2>
        <p class="section-subtitle mt-4 gsap-reveal">{{ $t('services.subtitle') }}</p>
      </div>

      <!-- Services Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        <article
          v-for="(service, index) in services"
          :key="index"
          class="glass-card p-8 sm:p-10 group hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 gsap-reveal"
        >
          <!-- Icono -->
          <div
            class="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-capibara-900/5 dark:bg-capibara-300/10 group-hover:scale-110 transition-transform duration-300"
          >
            <component
              :is="serviceIcons[index]"
              :size="28"
              class="text-capibara-900 dark:text-capibara-300"
            />
          </div>

          <!-- Placeholder de imagen del servicio -->
          <div class="relative w-full aspect-[3/2] rounded-2xl overflow-hidden mb-6 bg-capibara-100 dark:bg-capibara-800/50">
            <div class="w-full h-full flex items-center justify-center">
              <ImageIcon :size="36" class="text-capibara-300 dark:text-capibara-700" />
            </div>
          </div>

          <!-- Content -->
          <h3 class="font-heading text-xl sm:text-2xl font-bold text-capibara-900 dark:text-capibara-100 mb-4">
            {{ service.title }}
          </h3>
          <p class="font-body text-capibara-600 dark:text-capibara-400 leading-relaxed mb-6">
            {{ service.description }}
          </p>

          <!-- Tags -->
          <div class="flex flex-wrap gap-2">
            <span
              v-for="tag in service.tags"
              :key="tag"
              class="px-3 py-1 text-xs font-body font-medium rounded-full bg-capibara-100 dark:bg-capibara-800 text-capibara-700 dark:text-capibara-300"
            >
              {{ tag }}
            </span>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Code2, Brain, HeartPulse, Cloud, ImageIcon } from 'lucide-vue-next'

const { t, tm, rt } = useI18n()
const { $gsap, $ScrollTrigger } = useNuxtApp()

const serviceIcons = [Code2, Brain, HeartPulse, Cloud]

const services = computed(() => {
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

  gsap.utils.toArray<HTMLElement>('#servicios .gsap-reveal').forEach((el, i) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: i * 0.1,
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
