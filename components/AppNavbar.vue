<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 px-4 transition-all duration-500"
    :class="[scrolled ? 'pt-2' : 'pt-4']"
  >
    <nav
      class="max-w-6xl mx-auto glass-card px-4 sm:px-6 py-3 flex items-center justify-between gap-4"
    >
      <!-- Logo -->
      <NuxtLink to="/" class="flex-shrink-0" aria-label="The Capibara Web - Inicio">
        <img
          :src="$colorMode.value === 'dark' ? '/logo-dark.webp' : '/logo.webp'"
          alt="The Capibara Web"
          class="h-8 sm:h-10 w-auto"
          width="160"
          height="40"
          loading="eager"
        />
      </NuxtLink>

      <!-- Desktop Navigation -->
      <div class="hidden lg:flex items-center gap-6 xl:gap-8">
        <a
          v-for="item in navItems"
          :key="item.id"
          :href="`#${item.id}`"
          class="text-sm font-body font-medium text-capibara-700 dark:text-capibara-300 hover:text-capibara-900 dark:hover:text-white transition-colors duration-200 cursor-pointer"
          @click.prevent="scrollToSection(item.id)"
        >
          {{ $t(`nav.${item.key}`) }}
        </a>
      </div>

      <!-- Desktop Actions -->
      <div class="hidden lg:flex items-center gap-2">
        <LanguageSwitcher />
        <ThemeToggle />
        <button class="btn-primary text-sm !px-6 !py-2.5" @click="handleSchedule">
          {{ $t('nav.schedule') }}
        </button>
      </div>

      <!-- Mobile Menu Button -->
      <button
        class="lg:hidden p-2 rounded-xl hover:bg-capibara-100 dark:hover:bg-capibara-800 transition-colors cursor-pointer"
        :aria-label="mobileOpen ? 'Cerrar menú' : 'Abrir menú'"
        @click="mobileOpen = !mobileOpen"
      >
        <component :is="mobileOpen ? X : Menu" :size="24" />
      </button>
    </nav>

    <!-- Mobile Menu -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div v-if="mobileOpen" class="lg:hidden mt-2 max-w-6xl mx-auto glass-card p-6">
        <div class="flex flex-col gap-4">
          <a
            v-for="item in navItems"
            :key="item.id"
            :href="`#${item.id}`"
            class="text-base font-body font-medium text-capibara-700 dark:text-capibara-300 hover:text-capibara-900 dark:hover:text-white transition-colors cursor-pointer py-2"
            @click.prevent="scrollToSection(item.id); mobileOpen = false"
          >
            {{ $t(`nav.${item.key}`) }}
          </a>
          <hr class="border-capibara-200 dark:border-capibara-700" />
          <div class="flex items-center justify-between">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
          <button class="btn-primary text-sm w-full" @click="handleSchedule(); mobileOpen = false">
            {{ $t('nav.schedule') }}
          </button>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { Menu, X } from 'lucide-vue-next'
import { useWhatsappNotification } from '~/composables/useWhatsappNotification'

const { openWhatsApp } = useWhatsappNotification()
const mobileOpen = ref(false)
const scrolled = ref(false)
let lastScrollY = 0

const navItems = [
  { key: 'services', id: 'servicios' },
  { key: 'projects', id: 'proyectos' },
  { key: 'training', id: 'capacitacion' },
  { key: 'tech', id: 'tecnologias' },
  { key: 'faq', id: 'faq' },
  { key: 'contact', id: 'contacto' },
]

function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

function handleSchedule() {
  openWhatsApp()
}

function onScroll() {
  const currentY = window.scrollY
  scrolled.value = currentY > 20
  lastScrollY = currentY
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>
