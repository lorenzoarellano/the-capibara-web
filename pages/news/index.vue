<template>
  <div class="pt-24 pb-16">
    <section class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6">
        <!-- Header -->
        <div class="text-center mb-16">
          <span class="section-badge gsap-reveal">{{ $t('news.badge') }}</span>
          <h1 class="section-title mt-6 gsap-reveal">{{ $t('news.title') }}</h1>
          <p class="section-subtitle mt-4 gsap-reveal">{{ $t('news.subtitle') }}</p>
        </div>

        <!-- Grid -->
        <div v-if="pending" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="i in 6" :key="i" class="glass-card aspect-[4/5] animate-pulse bg-capibara-100/50 dark:bg-capibara-800/50" />
        </div>

        <div v-else-if="posts && posts.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <NewsCard 
            v-for="post in posts" 
            :key="post.id" 
            :post="post" 
            class="gsap-reveal"
          />
        </div>

        <div v-else class="text-center py-20 glass-card gsap-reveal">
          <p class="font-body text-capibara-500">{{ $t('news.noResults') }}</p>
        </div>

        <!-- Pagination -->
        <div v-if="posts && posts.length >= 9 || page > 1" class="flex justify-center items-center gap-4 gsap-reveal">
          <button
            :disabled="page === 1 || pending"
            @click="page--"
            class="p-2 rounded-xl glass-card hover:bg-capibara-100 dark:hover:bg-capibara-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft :size="20" />
          </button>
          <span class="font-mono text-sm font-bold text-capibara-900 dark:text-capibara-100">
            {{ page }}
          </span>
          <button
            :disabled="pending || !!(posts && posts.length < 9)"
            @click="page++"
            class="p-2 rounded-xl glass-card hover:bg-capibara-100 dark:hover:bg-capibara-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <ChevronRight :size="20" />
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { useWordPress } from '~/composables/useWordPress'

const { fetchPosts } = useWordPress()
const { locale, t } = useI18n()
const switchLocalePath = useSwitchLocalePath()

// Redirect to Spanish if trying to access in English
if (locale.value === 'en') {
  await navigateTo(switchLocalePath('es'))
}
const localePath = useLocalePath()

// Page state
const page = ref(1)

// Reset page on locale change
watch([locale], () => {
  page.value = 1
})

// Fetch Posts - Opción Lazy para evitar bloqueos en el servidor (SSR)
const { data: posts, pending } = useLazyAsyncData(
  `news-posts-${locale.value}-${page.value}`,
  () => fetchPosts({
    page: page.value,
    perPage: 9,
    lang: locale.value
  }),
  { watch: [page, locale], server: true }
)

// SEO
useHead({
  title: `${t('news.title')} | The Capibara Web`,
})

const { $gsap } = useNuxtApp()

function animateRevealElements() {
  const gsap = $gsap as typeof import('gsap').gsap
  nextTick(() => {
    gsap.utils.toArray<HTMLElement>('.gsap-reveal').forEach((el, i) => {
      // Skip elements already animated
      if (el.dataset.gsapDone) return
      el.dataset.gsapDone = '1'
      gsap.fromTo(el, { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.6, delay: i * 0.05,
        scrollTrigger: { trigger: el, start: 'top 95%' }
      })
    })
  })
}

// Re-animate when posts load or change
watch([posts, pending], () => {
  if (!pending.value && posts.value) {
    animateRevealElements()
  }
})

onMounted(() => {
  animateRevealElements()
})
</script>
