<template>
  <div
    class="group flex flex-col h-full glass-card overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
  >
    <!-- Image -->
    <NuxtLink :to="localePath(`/news/${post.slug}`)" class="relative aspect-[16/9] overflow-hidden block">
      <img
        v-if="featuredImage"
        :src="featuredImage"
        :alt="post.title.rendered"
        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        loading="lazy"
      />
      <div v-else class="w-full h-full bg-capibara-100 dark:bg-capibara-800 flex items-center justify-center">
        <span class="text-capibara-400 font-mono text-xs">NO IMAGE</span>
      </div>
      <div class="absolute inset-0 bg-gradient-to-t from-capibara-950/80 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
      
      <!-- Category Badge -->
      <div 
        v-if="category"
        class="absolute top-4 left-4 px-3 py-1 rounded-full bg-capibara-900/40 backdrop-blur-md border border-white/10 text-[10px] font-mono uppercase tracking-widest text-white"
      >
        {{ category }}
      </div>
    </NuxtLink>

    <!-- Content -->
    <div class="p-6 flex flex-col flex-1">
      <div class="flex items-center gap-3 mb-4">
        <span class="text-[10px] font-mono text-capibara-400 uppercase tracking-wider">
          {{ formattedDate }}
        </span>
      </div>
      
      <NuxtLink :to="localePath(`/news/${post.slug}`)">
        <h3 
          class="font-heading text-lg font-bold text-capibara-900 dark:text-capibara-100 mb-3 hover:text-capibara-600 transition-colors line-clamp-2"
          v-html="post.title.rendered"
        />
      </NuxtLink>
      
      <p 
        class="font-body text-sm text-capibara-600 dark:text-capibara-400 mb-6 line-clamp-3"
      >
        {{ strippedExcerpt }}
      </p>

      <NuxtLink 
        :to="localePath(`/news/${post.slug}`)"
        class="mt-auto flex items-center gap-2 text-sm font-body font-semibold text-capibara-900 dark:text-capibara-100 group/link cursor-pointer hover:opacity-70 transition-opacity"
      >
        {{ $t('news.readMore') }}
        <ArrowRight :size="16" class="transition-transform group-hover/link:translate-x-1" />
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'
import type { WPPost } from '~/composables/useWordPress'

const { locale } = useI18n()
const localePath = useLocalePath()

const props = defineProps<{
  post: WPPost
}>()

const featuredImage = computed(() => {
  return props.post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null
})

const category = computed(() => {
  const terms = props.post._embedded?.['wp:term']?.[0]
  return terms && terms.length > 0 ? terms[0].name : ''
})

const strippedExcerpt = computed(() => {
  const raw = props.post.excerpt.rendered || ''
  // Strip HTML and decode basic entities
  return raw
    .replace(/<[^>]*>?/gm, '')
    .replace(/&hellip;/g, '...')
    .replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
})

const formattedDate = computed(() => {
  const date = new Date(props.post.date)
  return new Intl.DateTimeFormat(locale.value === 'en' ? 'en-US' : 'es-MX', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).format(date)
})
</script>
