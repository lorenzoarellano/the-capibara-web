<template>
  <div class="noise-overlay min-h-screen mesh-aura flex items-center justify-center p-4">
    <BackgroundOrbs />
    
    <div class="max-w-xl w-full text-center relative z-10">
      <div class="glass-card p-8 md:p-12 gsap-reveal overflow-hidden">
        <!-- Error Code -->
        <span class="text-8xl md:text-9xl font-heading font-extrabold gradient-text block mb-6 drop-shadow-2xl">
          {{ error.statusCode }}
        </span>
        
        <!-- Error Content -->
        <h1 class="text-2xl md:text-4xl font-heading font-bold text-capibara-900 dark:text-capibara-100 mb-4">
          {{ error.statusCode === 404 ? $t('error.404.title') : $t('error.generic.title') }}
        </h1>
        
        <p class="font-body text-capibara-600 dark:text-capibara-400 text-lg mb-10 leading-relaxed">
          {{ error.statusCode === 404 ? $t('error.404.description') : $t('error.generic.description') }}
        </p>

        <!-- CTAs -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button @click="handleError" class="btn-primary w-full sm:w-auto">
            <Home :size="20" />
            {{ $t('error.goHome') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Home } from 'lucide-vue-next'

const props = defineProps({
  error: {
    type: Object,
    required: true
  }
})

const handleError = () => clearError({ redirect: '/' })

const { $gsap } = useNuxtApp()

onMounted(() => {
  if ($gsap) {
    const gsap = $gsap as typeof import('gsap').gsap
    gsap.from('.gsap-reveal', {
      opacity: 0,
      y: 40,
      duration: 1,
      ease: 'power3.out'
    })
  }
})
</script>
