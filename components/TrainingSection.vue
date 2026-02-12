<template>
  <section id="capacitacion" class="py-24 sm:py-32">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <!-- Left: Content -->
        <div>
          <span class="section-badge gsap-reveal">{{ $t('training.badge') }}</span>
          <h2 class="section-title mt-6 gsap-reveal">{{ $t('training.title') }}</h2>
          <p class="section-subtitle mt-4 !mx-0 !text-left gsap-reveal">
            {{ $t('training.subtitle') }}
          </p>
          <p
            class="font-body text-capibara-600 dark:text-capibara-400 leading-relaxed mt-4 gsap-reveal"
          >
            {{ $t('training.description') }}
          </p>

          <!-- Placeholder de imagen de capacitación -->
          <div class="relative w-full aspect-video rounded-2xl overflow-hidden mt-6 bg-capibara-100 dark:bg-capibara-800/50 gsap-reveal">
            <div class="w-full h-full flex items-center justify-center">
              <ImageIcon :size="48" class="text-capibara-300 dark:text-capibara-700" />
            </div>
          </div>

          <div class="mt-8 gsap-reveal">
            <button class="btn-primary" @click="handleCTA">
              <Sparkles :size="20" />
              {{ $t('training.cta') }}
            </button>
          </div>
        </div>

        <!-- Right: Feature Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div
            v-for="(feature, index) in features"
            :key="index"
            class="glass-card p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 gsap-reveal"
          >
            <div
              class="w-10 h-10 rounded-xl flex items-center justify-center mb-4 bg-capibara-900/5 dark:bg-capibara-300/10"
            >
              <component
                :is="featureIcons[index]"
                :size="22"
                class="text-capibara-900 dark:text-capibara-300"
              />
            </div>
            <h3
              class="font-heading text-lg font-bold text-capibara-900 dark:text-capibara-100 mb-2"
            >
              {{ feature.title }}
            </h3>
            <p class="font-body text-sm text-capibara-600 dark:text-capibara-400 leading-relaxed">
              {{ feature.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Sparkles, Workflow, Bot, TrendingUp, GraduationCap, ImageIcon } from 'lucide-vue-next'
import { useWhatsappNotification } from '~/composables/useWhatsappNotification'

const { openWhatsApp } = useWhatsappNotification()
const { tm, rt } = useI18n()
const { $gsap } = useNuxtApp()

const featureIcons = [Workflow, Bot, TrendingUp, GraduationCap]

const features = computed(() => {
  const raw = tm('training.features')
  if (!Array.isArray(raw)) return []
  return raw.map((item: any) => ({
    title: rt(item.title),
    description: rt(item.description),
  }))
})

function handleCTA() {
  openWhatsApp('Hola, me interesa su programa de capacitación en IA para empresas.')
}

onMounted(() => {
  const gsap = $gsap as typeof import('gsap').gsap

  gsap.utils.toArray<HTMLElement>('#capacitacion .gsap-reveal').forEach((el, i) => {
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
