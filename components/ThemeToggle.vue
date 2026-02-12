<template>
  <button
    aria-label="Toggle dark mode"
    class="relative w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 hover:bg-capibara-100 dark:hover:bg-capibara-800 cursor-pointer"
    @click="toggle"
  >
    <Transition name="theme-icon" mode="out-in">
      <Sun
        v-if="colorMode.value === 'dark'"
        :size="20"
        class="text-capibara-300"
      />
      <Moon v-else :size="20" class="text-capibara-700" />
    </Transition>
  </button>
</template>

<script setup lang="ts">
import { Sun, Moon } from 'lucide-vue-next'

const colorMode = useColorMode()

function toggle() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>

<style scoped>
.theme-icon-enter-active,
.theme-icon-leave-active {
  transition: all 0.2s ease;
}
.theme-icon-enter-from {
  opacity: 0;
  transform: rotate(-90deg) scale(0.6);
}
.theme-icon-leave-to {
  opacity: 0;
  transform: rotate(90deg) scale(0.6);
}
</style>
