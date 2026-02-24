<template>
  <div v-if="post" class="pt-20">
    <!-- Hero Section -->
    <section class="relative h-[60vh] min-h-[400px] flex items-center overflow-hidden">
      <img
        :src="featuredImage"
        :alt="post.title.rendered"
        class="absolute inset-0 w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-capibara-950 via-capibara-950/40 to-transparent" />
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 w-full">
        <div class="max-w-4xl">
          <NuxtLink 
            :to="localePath('/news')" 
            class="inline-flex items-center gap-2 text-sm font-mono text-capibara-400 hover:text-white transition-colors mb-8 group"
          >
            <ArrowLeft :size="16" class="transition-transform group-hover:-translate-x-1" />
            {{ $t('news.all') }}
          </NuxtLink>
          
          <div class="flex items-center gap-4 mb-6">
            <span v-if="category" class="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-mono uppercase tracking-widest text-white">
              {{ category }}
            </span>
            <span class="text-[10px] font-mono text-capibara-300 uppercase tracking-widest">
              {{ formattedDate }}
            </span>
          </div>
          
          <h1 
            class="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-tight mb-8"
            v-html="post.title.rendered"
          />
        </div>
      </div>
    </section>

    <!-- Content Section -->
    <section class="py-20 relative">
      <div class="max-w-7xl mx-auto px-4 sm:px-6">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <!-- Main Content -->
          <article class="lg:col-span-8">
            <div 
              class="prose prose-lg dark:prose-invert prose-capibara max-w-none 
                prose-headings:font-heading prose-headings:font-bold prose-headings:text-capibara-900 dark:prose-headings:text-white
                prose-p:font-body prose-p:text-capibara-600 dark:prose-p:text-capibara-400
                prose-a:text-capibara-600 dark:prose-a:text-capibara-400 prose-a:font-semibold hover:prose-a:text-capibara-400
                prose-strong:text-capibara-900 dark:prose-strong:text-white
                prose-img:rounded-3xl prose-img:shadow-2xl
                wp-content"
              v-html="post.content.rendered"
            />

            <!-- Share Section (Placeholder) -->
            <div class="mt-16 pt-8 border-t border-capibara-100 dark:border-capibara-800 flex items-center justify-between">
               <div class="flex items-center gap-4">
                 <!-- Add share icons if needed -->
               </div>
            </div>
          </article>

          <!-- Sidebar -->
          <aside class="lg:col-span-4 space-y-12">
            <!-- Related Posts -->
            <div v-if="relatedPosts && relatedPosts.length > 0">
              <h3 class="font-heading text-xl font-bold text-capibara-900 dark:text-white mb-8">
                {{ $t('news.related') }}
              </h3>
              <div class="space-y-8">
                <NuxtLink 
                  v-for="rel in relatedPosts" 
                  :key="rel.id"
                  :to="localePath(`/news/${rel.slug}`)"
                  class="group block"
                >
                  <div class="flex gap-4 items-start">
                    <div class="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 bg-capibara-100 dark:bg-capibara-800">
                      <img 
                        :src="rel._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/placeholder-news.webp'" 
                        :alt="rel.title.rendered"
                        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div>
                      <h4 
                        class="font-body font-bold text-capibara-900 dark:text-white group-hover:text-capibara-600 transition-colors line-clamp-2 mb-1"
                        v-html="rel.title.rendered"
                      />
                      <span class="text-[10px] font-mono text-capibara-400 uppercase">
                        {{ new Date(rel.date).toLocaleDateString() }}
                      </span>
                    </div>
                  </div>
                </NuxtLink>
              </div>
            </div>

            <!-- WhatsApp CTA -->
            <div class="glass-card p-8 sticky top-28 text-center">
              <div class="w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#25D366]/20">
                <Phone :size="28" class="text-white" />
              </div>
              <h4 class="font-heading font-bold text-capibara-900 dark:text-white mb-4">
                {{ $t('nav.schedule') }}
              </h4>
              <p class="font-body text-sm text-capibara-500 mb-8">
                {{ $t('contact.subtitle') }}
              </p>
              <button class="btn-primary w-full" @click="handleSchedule">
                {{ $t('contact.whatsapp') }}
              </button>
            </div>
          </aside>
        </div>
      </div>
    </section>
  </div>
  
  <!-- Loading State -->
  <div v-else class="min-h-screen flex items-center justify-center">
    <Loader2 :size="48" class="animate-spin text-capibara-600" />
  </div>
</template>

<script setup lang="ts">
import { ArrowLeft, Phone, Loader2 } from 'lucide-vue-next'
import { useWordPress } from '~/composables/useWordPress'
import { useWhatsappNotification } from '~/composables/useWhatsappNotification'

const route = useRoute()
const slug = route.params.slug as string
const { fetchPostBySlug, fetchRelatedPosts } = useWordPress()
const { openWhatsApp } = useWhatsappNotification()
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()
const { locale } = useI18n()

// Redirect to Spanish if trying to access in English
if (locale.value === 'en') {
  await navigateTo(switchLocalePath('es'))
}

const { data: post } = await useAsyncData(`post-${slug}`, () => fetchPostBySlug(slug))

const { data: relatedPosts } = await useAsyncData(`related-${slug}`, () => {
  if (!post.value) return Promise.resolve([])
  const catIds = post.value._embedded?.['wp:term']?.[0]?.map(t => t.id) || []
  return fetchRelatedPosts(catIds, post.value.id)
}, { watch: [post] })

const featuredImage = computed(() => {
  return post.value?._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/placeholder-news-hero.webp'
})

const category = computed(() => {
  const terms = post.value?._embedded?.['wp:term']?.[0]
  return terms && terms.length > 0 ? terms[0].name : ''
})

const formattedDate = computed(() => {
  if (!post.value) return ''
  return new Intl.DateTimeFormat('es-MX', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }).format(new Date(post.value.date))
})

function handleSchedule() {
  openWhatsApp()
}

// SEO
useHead({
  title: computed(() => post.value ? `${decodeHtml(post.value.title.rendered)} | The Capibara Web` : 'Noticia'),
  meta: [
    { name: 'description', content: computed(() => post.value ? decodeHtml(post.value.excerpt.rendered) : '') }
  ]
})
</script>

<style>
/* Custom WordPress content styling */
.wp-content img {
  @apply max-w-full h-auto my-12 mx-auto;
}

.wp-content .wp-block-gallery {
  @apply grid grid-cols-2 lg:grid-cols-3 gap-4 my-12;
}

.wp-content .wp-block-gallery img {
  @apply my-0 aspect-square;
}

.wp-content iframe {
  @apply w-full aspect-video rounded-3xl my-12 shadow-2xl;
}
</style>
