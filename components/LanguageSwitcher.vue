<template>
  <div class="relative">
    <button
      class="flex items-center gap-1.5 px-3 py-1.5 text-sm font-body font-medium rounded-full transition-colors duration-300 hover:bg-capibara-100 dark:hover:bg-capibara-800 cursor-pointer focus:outline-none focus:ring-2 focus:ring-teal-light focus:ring-offset-2"
      :aria-label="$t('nav.switchLanguage', { lang: locale === 'es' ? 'English' : 'Español' })"
      :title="$t('nav.switchLanguage', { lang: locale === 'es' ? 'English' : 'Español' })"
      @click="switchLocale"
    >
      <Globe :size="16" />
      <span class="uppercase" aria-hidden="true">{{ locale === 'es' ? 'EN' : 'ES' }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { Globe } from 'lucide-vue-next'

const { locale, locales, setLocale } = useI18n()
const currentLocale = computed(() =>
  (locales.value as Array<{ code: string; name: string }>).find(
    (l) => l.code === locale.value,
  ),
)

function switchLocale() {
  const next = locale.value === 'es' ? 'en' : 'es'
  setLocale(next)
}
</script>
