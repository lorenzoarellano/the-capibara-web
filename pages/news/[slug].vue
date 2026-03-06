<template>
  <div v-if="post && !postPending">
    <!-- Hero Section: Full-bleed behind navbar -->
    <section class="relative h-[75vh] min-h-[500px] flex items-end overflow-hidden">
      <img
        :src="featuredImage"
        :alt="post.title.rendered"
        class="absolute inset-0 w-full h-full object-cover"
      />
      <!-- Top gradient for navbar readability -->
      <div class="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-capibara-950/70 to-transparent z-[1]" />
      <!-- Bottom gradient for content -->
      <div class="absolute inset-0 bg-gradient-to-t from-capibara-950 via-capibara-950/50 to-transparent" />
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 w-full pb-12">
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

            <!-- Back to News -->
            <NuxtLink 
              :to="localePath('/news')" 
              class="btn-secondary w-full flex items-center justify-center gap-2 mt-8"
            >
              <ArrowLeft :size="16" />
              {{ $t('news.all') }}
            </NuxtLink>

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

// Fetch Post - useAsyncData (NO lazy) para que SSR espere los datos y Google indexe contenido real
const { data: post, pending: postPending } = await useAsyncData(`post-${slug}`, () => fetchPostBySlug(slug))

const { data: relatedPosts, pending: relatedPending } = useLazyAsyncData(`related-${slug}`, () => {
  if (!post.value) return Promise.resolve([])
  const catIds = post.value._embedded?.['wp:term']?.[0]?.map(t => t.id) || []
  return fetchRelatedPosts(catIds, post.value.id)
}, { watch: [post], server: true })

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

// SEO — robots explícito + meta completa para garantizar indexación
useSeoMeta({
  title: () => post.value ? `${decodeHtml(post.value.title.rendered)} | The Capibara Web` : 'Noticia | The Capibara Web',
  ogTitle: () => post.value ? decodeHtml(post.value.title.rendered) : 'Noticia',
  description: () => post.value ? decodeHtml(post.value.excerpt.rendered) : '',
  ogDescription: () => post.value ? decodeHtml(post.value.excerpt.rendered) : '',
  ogImage: () => featuredImage.value,
  ogType: 'article',
  robots: 'index, follow, max-image-preview:large',
})

useHead({
  link: [
    { rel: 'canonical', href: `https://thecapibaraweb.com.mx/news/${slug}` },
  ],
})
</script>

<style>
/* ── WordPress Content: Premium Typography ── */

/* Base prose overrides */
.wp-content {
  @apply text-base sm:text-lg leading-relaxed;
  font-family: 'Open Sans', sans-serif;
  color: #374151;
}

.dark .wp-content {
  color: #9ca3af;
}

/* Headings */
.wp-content h1,
.wp-content h2,
.wp-content h3,
.wp-content h4,
.wp-content h5,
.wp-content h6 {
  font-family: 'Cinzel', serif;
  @apply font-bold leading-tight;
  color: #0a0a0a;
}

.dark .wp-content h1,
.dark .wp-content h2,
.dark .wp-content h3,
.dark .wp-content h4,
.dark .wp-content h5,
.dark .wp-content h6 {
  color: #f5f5f5;
}

.wp-content h1 {
  @apply text-3xl sm:text-4xl mt-16 mb-6;
}

.wp-content h2 {
  @apply text-2xl sm:text-3xl mt-14 mb-5 pb-3;
  border-bottom: 2px solid rgba(14, 124, 123, 0.15);
}

.dark .wp-content h2 {
  border-bottom-color: rgba(23, 190, 187, 0.2);
}

.wp-content h3 {
  @apply text-xl sm:text-2xl mt-10 mb-4;
}

.wp-content h4 {
  @apply text-lg sm:text-xl mt-8 mb-3;
}

/* Paragraphs */
.wp-content p {
  @apply mb-6 leading-[1.85];
}

/* Strong / Bold */
.wp-content strong,
.wp-content b {
  @apply font-bold;
  color: #1a1a1a;
}

.dark .wp-content strong,
.dark .wp-content b {
  color: #e5e5e5;
}

/* Links */
.wp-content a {
  color: #0E7C7B;
  @apply font-semibold underline decoration-1 underline-offset-2 transition-colors duration-200;
}

.wp-content a:hover {
  color: #D62246;
}

.dark .wp-content a {
  color: #17BEBB;
}

.dark .wp-content a:hover {
  color: #D4F4DD;
}

/* Blockquotes */
.wp-content blockquote {
  @apply my-10 py-6 px-8 rounded-2xl relative;
  border-left: 4px solid #0E7C7B;
  background: rgba(14, 124, 123, 0.04);
}

.dark .wp-content blockquote {
  border-left-color: #17BEBB;
  background: rgba(23, 190, 187, 0.06);
}

.wp-content blockquote p {
  @apply text-lg italic mb-0;
  color: #4a5568;
}

.dark .wp-content blockquote p {
  color: #a0aec0;
}

/* Lists */
.wp-content ul,
.wp-content ol {
  @apply my-6 pl-6 space-y-3;
}

.wp-content ul {
  list-style: none;
}

.wp-content ul li {
  @apply relative pl-5;
}

.wp-content ul li::before {
  content: '';
  @apply absolute left-0 top-[0.65em] w-2 h-2 rounded-full;
  background: linear-gradient(135deg, #0E7C7B, #4B1D3F);
}

.dark .wp-content ul li::before {
  background: linear-gradient(135deg, #17BEBB, #D4F4DD);
}

.wp-content ol {
  list-style: none;
  counter-reset: custom-counter;
}

.wp-content ol li {
  @apply relative pl-8;
  counter-increment: custom-counter;
}

.wp-content ol li::before {
  content: counter(custom-counter) '.';
  @apply absolute left-0 top-0 font-bold text-sm;
  font-family: 'Cinzel', serif;
  color: #0E7C7B;
}

.dark .wp-content ol li::before {
  color: #17BEBB;
}

/* Images */
.wp-content img {
  @apply max-w-full h-auto my-10 mx-auto rounded-2xl;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
}

.dark .wp-content img {
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
}

/* Galleries */
.wp-content .wp-block-gallery {
  @apply grid grid-cols-2 lg:grid-cols-3 gap-4 my-12;
}

.wp-content .wp-block-gallery img {
  @apply my-0 aspect-square;
}

/* Video / iFrame */
.wp-content iframe {
  @apply w-full aspect-video rounded-2xl my-12;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

/* Code blocks */
.wp-content pre,
.wp-content code {
  @apply font-mono text-sm;
}

.wp-content pre {
  @apply my-8 p-6 rounded-2xl overflow-x-auto;
  background: #1a1a2e;
  color: #e0e0e0;
}

.wp-content :not(pre) > code {
  @apply px-1.5 py-0.5 rounded-md text-sm;
  background: rgba(14, 124, 123, 0.08);
  color: #0E7C7B;
}

.dark .wp-content :not(pre) > code {
  background: rgba(23, 190, 187, 0.1);
  color: #17BEBB;
}

/* Horizontal rules */
.wp-content hr {
  @apply my-12 border-none h-px;
  background: linear-gradient(90deg, transparent, rgba(14, 124, 123, 0.3), rgba(75, 29, 63, 0.2), transparent);
}

.dark .wp-content hr {
  background: linear-gradient(90deg, transparent, rgba(23, 190, 187, 0.3), rgba(212, 244, 221, 0.15), transparent);
}

/* Tables */
.wp-content table {
  @apply w-full my-8 text-sm rounded-2xl overflow-hidden;
  border-collapse: separate;
  border-spacing: 0;
}

.wp-content thead {
  background: linear-gradient(135deg, #0E7C7B, #4B1D3F);
}

.wp-content thead th {
  @apply px-5 py-3 text-left text-white font-semibold text-xs uppercase tracking-wider;
}

.wp-content tbody tr {
  @apply border-b border-capibara-100 dark:border-capibara-800 transition-colors;
}

.wp-content tbody tr:hover {
  @apply bg-capibara-50 dark:bg-capibara-900/30;
}

.wp-content tbody td {
  @apply px-5 py-4;
}

/* WordPress specific blocks */
.wp-content .wp-block-pullquote {
  @apply my-12 py-8 border-y-2 border-capibara-200 dark:border-capibara-700 text-center;
}

.wp-content .wp-block-pullquote p {
  @apply text-2xl font-heading font-bold not-italic;
  color: #0a0a0a;
}

.dark .wp-content .wp-block-pullquote p {
  color: #f5f5f5;
}

/* Captions */
.wp-content figcaption {
  @apply text-center text-sm mt-3 italic;
  color: #9ca3af;
}

/* Small caps headings from WP (like the screenshot shows) */
.wp-content h2[style*="font-variant"],
.wp-content .has-small-caps {
  font-variant: small-caps;
  @apply tracking-wider;
}

/* First paragraph after heading - drop cap effect */
.wp-content h2 + p::first-letter,
.wp-content h1 + p::first-letter {
  @apply text-5xl font-heading font-bold float-left mr-3 mt-1;
  line-height: 1;
  color: #0E7C7B;
}

.dark .wp-content h2 + p::first-letter,
.dark .wp-content h1 + p::first-letter {
  color: #17BEBB;
}
</style>
