<template>
  <section class="py-24 sm:py-32">
    <div class="max-w-5xl mx-auto px-4 sm:px-6">
      <!-- Header -->
      <div class="text-center mb-16">
        <span class="section-badge gsap-reveal">{{ $t('beforeAfter.badge') }}</span>
        <h2 class="section-title mt-6 gsap-reveal">{{ $t('beforeAfter.title') }}</h2>
        <p class="section-subtitle mt-4 gsap-reveal">{{ $t('beforeAfter.subtitle') }}</p>
      </div>

      <!-- Comparison Table -->
      <div class="glass-card overflow-hidden gsap-reveal">
        <!-- Desktop Table -->
        <div class="hidden md:block overflow-x-auto">
          <table class="w-full text-left">
            <thead>
              <tr class="border-b border-capibara-200/50 dark:border-capibara-700/50">
                <th
                  class="px-8 py-5 font-heading text-sm font-bold uppercase tracking-wider text-capibara-500 dark:text-capibara-400"
                >
                  {{ $t('beforeAfter.headers.aspect') }}
                </th>
                <th
                  class="px-8 py-5 font-heading text-sm font-bold uppercase tracking-wider text-red-500/70"
                >
                  {{ $t('beforeAfter.headers.before') }}
                </th>
                <th
                  class="px-8 py-5 font-heading text-sm font-bold uppercase tracking-wider text-emerald-600/80 dark:text-emerald-400/80"
                >
                  {{ $t('beforeAfter.headers.after') }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(row, index) in rows"
                :key="index"
                class="border-b border-capibara-100/50 dark:border-capibara-800/50 last:border-0 transition-colors duration-200 hover:bg-capibara-50/50 dark:hover:bg-capibara-800/20"
              >
                <td
                  class="px-8 py-5 font-body font-semibold text-capibara-900 dark:text-capibara-100"
                >
                  {{ row.aspect }}
                </td>
                <td class="px-8 py-5 font-body text-capibara-500 dark:text-capibara-400">
                  {{ row.before }}
                </td>
                <td
                  class="px-8 py-5 font-body font-semibold text-emerald-700 dark:text-emerald-400"
                >
                  {{ row.after }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Mobile Cards -->
        <div class="md:hidden divide-y divide-capibara-100/50 dark:divide-capibara-800/50">
          <div v-for="(row, index) in rows" :key="index" class="p-6">
            <h4
              class="font-heading text-base font-bold text-capibara-900 dark:text-capibara-100 mb-3"
            >
              {{ row.aspect }}
            </h4>
            <div class="flex flex-col gap-2">
              <div class="flex items-center gap-3">
                <span
                  class="flex-shrink-0 w-2 h-2 rounded-full bg-red-400/60"
                />
                <span class="font-body text-sm text-capibara-500 dark:text-capibara-400">
                  {{ row.before }}
                </span>
              </div>
              <div class="flex items-center gap-3">
                <span
                  class="flex-shrink-0 w-2 h-2 rounded-full bg-emerald-500"
                />
                <span class="font-body text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                  {{ row.after }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { tm, rt } = useI18n()
const { $gsap } = useNuxtApp()

const rows = computed(() => {
  const raw = tm('beforeAfter.rows')
  if (!Array.isArray(raw)) return []
  return raw.map((item: any) => ({
    aspect: rt(item.aspect),
    before: rt(item.before),
    after: rt(item.after),
  }))
})

onMounted(() => {
  const gsap = $gsap as typeof import('gsap').gsap

  gsap.utils.toArray<HTMLElement>('.gsap-reveal').forEach((el, i) => {
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
