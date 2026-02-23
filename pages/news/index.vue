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

        <!-- Categories -->
        <div class="flex flex-wrap justify-center gap-2 mb-12 gsap-reveal">
          <button
            @click="selectedCategory = undefined"
            class="px-5 py-2 rounded-full text-sm font-body font-medium transition-all"
            :class="!selectedCategory ? 'bg-capibara-900 text-white dark:bg-white dark:text-capibara-900' : 'bg-capibara-100 text-capibara-600 dark:bg-capibara-800 dark:text-capibara-400 hover:bg-capibara-200 dark:hover:bg-capibara-700'"
          >
            {{ $t('news.all') }}
          </button>
          <button
            v-for="cat in categories"
            :key="cat.id"
            @click="selectedCategory = cat.id"
            class="px-5 py-2 rounded-full text-sm font-body font-medium transition-all"
            :class="selectedCategory === cat.id ? 'bg-capibara-900 text-white dark:bg-white dark:text-capibara-900' : 'bg-capibara-100 text-capibara-600 dark:bg-capibara-800 dark:text-capibara-400 hover:bg-capibara-200 dark:hover:bg-capibara-700'"
          >
            {{ cat.name }}
          </button>
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
            :disabled="pending || (posts && posts.length < 9)"
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

const { fetchPosts, fetchCategories } = useWordPress()
const { locale, t } = useI18n()
const localePath = useLocalePath()

// Page state
const page = ref(1)
const selectedCategory = ref<number | undefined>(undefined)

// Reset page on category or locale change
watch([selectedCategory, locale], () => {
  page.value = 1
})

// Fetch Categories
const { data: categories } = await useAsyncData('news-categories', () => fetchCategories())

// Fetch Posts
const { data: posts, pending } = await useAsyncData(
  `news-posts-${locale.value}-p${page.value}-c${selectedCategory.value || 'all'}`,
  () => fetchPosts({ 
    page: page.value, 
    perPage: 9, 
    category: selectedCategory.value 
  }),
  { watch: [page, selectedCategory, locale] }
)

// SEO
useHead({
  title: `${t('news.title')} | The Capibara Web`,
})

const { $gsap } = useNuxtApp()

onMounted(() => {
  const gsap = $gsap as typeof import('gsap').gsap
  gsap.utils.toArray<HTMLElement>('.gsap-reveal').forEach((el, i) => {
    gsap.fromTo(el, { opacity: 0, y: 20 }, {
      opacity: 1, y: 0, duration: 0.6, delay: i * 0.05,
      scrollTrigger: { trigger: el, start: 'top 95%' }
    })
  })
})
</script>
