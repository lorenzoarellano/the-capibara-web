<template>
  <footer class="relative border-t border-capibara-100 dark:border-capibara-800 pt-16 pb-8 bg-white dark:bg-capibara-950">

    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        <!-- Brand Column -->
        <div class="lg:col-span-1">
          <NuxtLink to="/" aria-label="The Capibara Web">
            <img
              :src="$colorMode.value === 'dark' ? '/logo-dark.webp' : '/logo.webp'"
              alt="The Capibara Web"
              class="h-10 w-auto mb-4"
              width="160"
              height="40"
              loading="lazy"
            />
          </NuxtLink>
          <p class="font-body text-sm text-capibara-500 dark:text-capibara-400 leading-relaxed mb-6">
            {{ $t('footer.description') }}
          </p>
          <!-- Social Links -->
          <div class="flex items-center gap-3">
            <a
              href="https://www.instagram.com/thecapibaraweb/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              class="w-10 h-10 rounded-full bg-capibara-100 dark:bg-capibara-800 flex items-center justify-center hover:bg-capibara-200 dark:hover:bg-capibara-700 transition-colors cursor-pointer"
            >
              <Instagram :size="18" class="text-capibara-600 dark:text-capibara-400" />
            </a>
            <a
              href="https://www.facebook.com/arellanolorenzo4"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              class="w-10 h-10 rounded-full bg-capibara-100 dark:bg-capibara-800 flex items-center justify-center hover:bg-capibara-200 dark:hover:bg-capibara-700 transition-colors cursor-pointer"
            >
              <Facebook :size="18" class="text-capibara-600 dark:text-capibara-400" />
            </a>
            <a
              href="https://wa.me/526181835957"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              class="w-10 h-10 rounded-full bg-capibara-100 dark:bg-capibara-800 flex items-center justify-center hover:bg-capibara-200 dark:hover:bg-capibara-700 transition-colors cursor-pointer"
              @click="sendNotification('Footer WhatsApp')"
            >
              <MessageCircle :size="18" class="text-capibara-600 dark:text-capibara-400" />
            </a>
          </div>
        </div>

        <!-- Services Column -->
        <div>
          <h4 class="font-heading text-sm font-bold uppercase tracking-wider text-capibara-900 dark:text-capibara-100 mb-4">
            {{ $t('footer.sections.services') }}
          </h4>
          <ul class="space-y-3">
            <li>
              <a href="#servicios" class="font-body text-sm text-capibara-500 dark:text-capibara-400 hover:text-capibara-900 dark:hover:text-capibara-200 transition-colors cursor-pointer">
                {{ $t('footer.links.software') }}
              </a>
            </li>
            <li>
              <a href="#servicios" class="font-body text-sm text-capibara-500 dark:text-capibara-400 hover:text-capibara-900 dark:hover:text-capibara-200 transition-colors cursor-pointer">
                {{ $t('footer.links.ai') }}
              </a>
            </li>
            <li>
              <a href="#servicios" class="font-body text-sm text-capibara-500 dark:text-capibara-400 hover:text-capibara-900 dark:hover:text-capibara-200 transition-colors cursor-pointer">
                {{ $t('footer.links.healthtech') }}
              </a>
            </li>
            <li>
              <a href="#servicios" class="font-body text-sm text-capibara-500 dark:text-capibara-400 hover:text-capibara-900 dark:hover:text-capibara-200 transition-colors cursor-pointer">
                {{ $t('footer.links.cloud') }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Company Column -->
        <div>
          <h4 class="font-heading text-sm font-bold uppercase tracking-wider text-capibara-900 dark:text-capibara-100 mb-4">
            {{ $t('footer.sections.company') }}
          </h4>
          <ul class="space-y-3">
            <li>
              <a href="#proyectos" class="font-body text-sm text-capibara-500 dark:text-capibara-400 hover:text-capibara-900 dark:hover:text-capibara-200 transition-colors cursor-pointer">
                {{ $t('footer.links.projects') }}
              </a>
            </li>
            <li>
              <a href="#capacitacion" class="font-body text-sm text-capibara-500 dark:text-capibara-400 hover:text-capibara-900 dark:hover:text-capibara-200 transition-colors cursor-pointer">
                {{ $t('footer.links.training') }}
              </a>
            </li>
            <li>
              <a href="#contacto" class="font-body text-sm text-capibara-500 dark:text-capibara-400 hover:text-capibara-900 dark:hover:text-capibara-200 transition-colors cursor-pointer">
                {{ $t('footer.links.contact') }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Legal Column -->
        <div>
          <h4 class="font-heading text-sm font-bold uppercase tracking-wider text-capibara-900 dark:text-capibara-100 mb-4">
            {{ $t('footer.sections.legal') }}
          </h4>
          <ul class="space-y-3">
            <li>
              <NuxtLink
                to="/aviso-de-privacidad"
                class="font-body text-sm text-capibara-500 dark:text-capibara-400 hover:text-capibara-900 dark:hover:text-capibara-200 transition-colors cursor-pointer"
              >
                {{ $t('footer.links.privacy') }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/terminos-y-condiciones"
                class="font-body text-sm text-capibara-500 dark:text-capibara-400 hover:text-capibara-900 dark:hover:text-capibara-200 transition-colors cursor-pointer"
              >
                {{ $t('footer.links.terms') }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>

      <!-- Capibara caminando centrado sobre la línea -->
      <div class="flex justify-center -mb-4">
        <img
          v-show="$colorMode.value !== 'dark'"
          src="/footer-walking.webp"
          alt="Capibara caminando"
          class="h-28 sm:h-36 w-auto"
          loading="lazy"
        />
        <img
          v-show="$colorMode.value === 'dark'"
          src="/footer-walking-dark.webp"
          alt="Capibara caminando"
          class="h-28 sm:h-36 w-auto"
          loading="lazy"
        />
      </div>

      <!-- Bottom Bar -->
      <div class="border-t border-capibara-100 dark:border-capibara-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p class="font-body text-sm text-capibara-400 dark:text-capibara-500">
          &copy; {{ currentYear }} {{ $t('footer.copyright') }}
        </p>
        <p class="font-body text-sm text-capibara-400 dark:text-capibara-500">
          {{ $t('footer.location') }}
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { Instagram, Facebook, MessageCircle } from 'lucide-vue-next'
import { useWhatsappNotification } from '~/composables/useWhatsappNotification'

const { sendNotification } = useWhatsappNotification()
const currentYear = new Date().getFullYear()
</script>
