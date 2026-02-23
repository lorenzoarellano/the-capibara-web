<template>
  <section id="noticias" class="py-24 sm:py-32 relative overflow-hidden">
    <!-- Background Decor -->
    <div class="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-capibara-100/20 dark:bg-capibara-900/10 rounded-full blur-3xl -z-10" />

    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <!-- Header -->
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div class="max-w-2xl">
          <span class="section-badge gsap-reveal-news">{{ $t('news.badge') }}</span>
          <h2 class="section-title mt-6 gsap-reveal-news">{{ $t('news.title') }}</h2>
          <p class="section-subtitle mt-4 gsap-reveal-news">{{ $t('news.subtitle') }}</p>
        </div>
        <div class="gsap-reveal-news">
          <NuxtLink :to="localePath('/news')" class="btn-secondary !py-3">
            {{ $t('news.viewAll') }}
          </NuxtLink>
        </div>
      </div>

      <!-- Grid -->
      <div v-if="pending" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="i in 6" :key="i" class="glass-card aspect-[4/5] animate-pulse bg-capibara-100/50 dark:bg-capibara-800/50" />
      </div>
      
      <div v-else-if="posts && posts.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
        <div 
          v-for="(post, i) in posts" 
          :key="post.id"
          class="gsap-reveal-news relative z-10"
        >
          <NewsCard :post="post" />
        </div>
      </div>

      <div v-else class="text-center py-20 glass-card">
        <p class="font-body text-capibara-500">{{ $t('news.noResults') }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useWordPress } from '~/composables/useWordPress'

const { fetchPosts } = useWordPress()
const { locale } = useI18n()
const localePath = useLocalePath()

const { data: posts, pending } = await useAsyncData(
  `home-posts-${locale.value}`,
  () => fetchPosts({ perPage: 6 }),
  { watch: [locale] }
)

const { $gsap } = useNuxtApp()

onMounted(() => {
  const gsap = $gsap as typeof import('gsap').gsap
  
  gsap.utils.toArray<HTMLElement>('.gsap-reveal-news').forEach((el, i) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: i * 0.05,
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
