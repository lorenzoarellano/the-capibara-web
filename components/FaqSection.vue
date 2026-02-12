<template>
  <section id="faq" class="py-24 sm:py-32">
    <div class="max-w-4xl mx-auto px-4 sm:px-6">
      <!-- Header -->
      <div class="text-center mb-16">
        <span class="section-badge gsap-reveal">{{ $t('faq.badge') }}</span>
        <h2 class="section-title mt-6 gsap-reveal">{{ $t('faq.title') }}</h2>
        <p class="section-subtitle mt-4 gsap-reveal">{{ $t('faq.subtitle') }}</p>
      </div>

      <!-- FAQ Items -->
      <div class="space-y-4">
        <div
          v-for="(item, index) in faqItems"
          :key="index"
          class="glass-card overflow-hidden gsap-reveal"
        >
          <button
            class="w-full px-8 py-6 flex items-center justify-between gap-4 text-left cursor-pointer group"
            :aria-expanded="openIndex === index"
            @click="toggle(index)"
          >
            <h3
              class="font-heading text-base sm:text-lg font-bold text-capibara-900 dark:text-capibara-100 group-hover:text-capibara-700 dark:group-hover:text-capibara-200 transition-colors"
            >
              {{ item.question }}
            </h3>
            <ChevronDown
              :size="20"
              class="flex-shrink-0 text-capibara-500 transition-transform duration-300"
              :class="{ 'rotate-180': openIndex === index }"
            />
          </button>
          <Transition
            enter-active-class="transition-all duration-300 ease-out"
            enter-from-class="max-h-0 opacity-0"
            enter-to-class="max-h-96 opacity-100"
            leave-active-class="transition-all duration-200 ease-in"
            leave-from-class="max-h-96 opacity-100"
            leave-to-class="max-h-0 opacity-0"
          >
            <div v-show="openIndex === index" class="overflow-hidden">
              <p
                class="px-8 pb-6 font-body text-capibara-600 dark:text-capibara-400 leading-relaxed"
              >
                {{ item.answer }}
              </p>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ChevronDown } from 'lucide-vue-next'

const { tm, rt } = useI18n()
const { $gsap } = useNuxtApp()

const openIndex = ref<number | null>(0)

const faqItems = computed(() => {
  const raw = tm('faq.items')
  if (!Array.isArray(raw)) return []
  return raw.map((item: any) => ({
    question: rt(item.question),
    answer: rt(item.answer),
  }))
})

function toggle(index: number) {
  openIndex.value = openIndex.value === index ? null : index
}

onMounted(() => {
  const gsap = $gsap as typeof import('gsap').gsap

  gsap.utils.toArray<HTMLElement>('#faq .gsap-reveal').forEach((el, i) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        delay: i * 0.08,
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      },
    )
  })
})
</script>
