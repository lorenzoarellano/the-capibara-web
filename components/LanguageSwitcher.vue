<template>
  <div class="relative">
    <button
      class="flex items-center gap-1.5 px-3 py-1.5 text-sm font-body font-medium rounded-full transition-colors duration-300 hover:bg-capibara-100 dark:hover:bg-capibara-800 cursor-pointer"
      :aria-label="`Current language: ${currentLocale?.name}`"
      @click="switchLocale"
    >
      <Globe :size="16" />
      <span class="uppercase">{{ locale === 'es' ? 'EN' : 'ES' }}</span>
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
