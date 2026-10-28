<template>
  <section id="contacto" class="py-24 sm:py-32">
    <div class="max-w-5xl mx-auto px-4 sm:px-6">
      <!-- Header -->
      <div class="text-center mb-16">
        <span class="section-badge gsap-reveal">{{ $t('contact.badge') }}</span>
        <h2 class="section-title mt-6 gsap-reveal">{{ $t('contact.title') }}</h2>
        <p class="section-subtitle mt-4 gsap-reveal">{{ $t('contact.subtitle') }}</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
        <!-- Info Card -->
        <div class="glass-card p-8 sm:p-10 gsap-reveal">
          <h3 class="font-heading text-xl font-bold text-capibara-900 dark:text-capibara-100 mb-6">
            {{ $t('contact.info.title') }}
          </h3>
          <ul class="space-y-5">
            <li class="flex items-start gap-4">
              <span class="flex-shrink-0 w-11 h-11 rounded-xl bg-capibara-900/5 dark:bg-capibara-100/10 flex items-center justify-center">
                <Clock :size="20" class="text-capibara-600 dark:text-capibara-300" />
              </span>
              <span class="font-body text-capibara-600 dark:text-capibara-400 pt-2.5">
                {{ $t('contact.info.hours') }}
              </span>
            </li>
            <li class="flex items-start gap-4">
              <span class="flex-shrink-0 w-11 h-11 rounded-xl bg-capibara-900/5 dark:bg-capibara-100/10 flex items-center justify-center">
                <MapPin :size="20" class="text-capibara-600 dark:text-capibara-300" />
              </span>
              <span class="font-body text-capibara-600 dark:text-capibara-400 pt-2.5">
                {{ $t('contact.info.location') }}
              </span>
            </li>
          </ul>

          <!-- Social links -->
          <div class="mt-8 pt-6 border-t border-capibara-100 dark:border-capibara-800">
            <p class="font-body text-sm font-semibold text-capibara-700 dark:text-capibara-300 mb-4">
              {{ $t('footer.sections.social') }}
            </p>
            <div class="flex items-center gap-3">
              <a
                v-for="s in socials"
                :key="s.label"
                :href="s.href"
                target="_blank"
                rel="noopener noreferrer"
                :aria-label="s.label"
                class="w-11 h-11 rounded-full bg-capibara-100 dark:bg-capibara-800 flex items-center justify-center hover:bg-capibara-200 dark:hover:bg-capibara-700 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-capibara-900/30 dark:focus-visible:ring-capibara-300/30"
              >
                <component :is="s.icon" :size="18" class="text-capibara-600 dark:text-capibara-400" />
              </a>
            </div>
          </div>
        </div>

        <!-- WhatsApp CTA -->
        <button
          type="button"
          class="glass-card p-8 sm:p-10 flex flex-col items-center justify-center gap-5 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group gsap-reveal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]/50"
          @click="handleWhatsApp"
        >
          <div class="w-16 h-16 rounded-full bg-[#25D366] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <svg class="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </div>
          <span class="font-heading text-xl font-bold text-capibara-900 dark:text-capibara-100">
            {{ $t('contact.whatsapp') }}
          </span>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Clock, MapPin, Instagram, Facebook, Linkedin, Youtube } from 'lucide-vue-next'
import { useWhatsappNotification } from '~/composables/useWhatsappNotification'

const { openWhatsApp } = useWhatsappNotification()

const socials = [
  { label: 'Instagram', href: 'https://www.instagram.com/thecapibaraweb/', icon: Instagram },
  { label: 'Facebook', href: 'https://www.facebook.com/TheCapibaraWebCompany', icon: Facebook },
  { label: 'YouTube', href: 'https://www.youtube.com/@TheCapibaraWeb', icon: Youtube },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/lorenzo-arellano/', icon: Linkedin },
]
const { $gsap } = useNuxtApp()

function handleWhatsApp() {
  openWhatsApp()
}

onMounted(() => {
  const gsap = $gsap as typeof import('gsap').gsap

  gsap.utils.toArray<HTMLElement>('#contacto .gsap-reveal').forEach((el, i) => {
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
