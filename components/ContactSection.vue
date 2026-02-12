<template>
  <section id="contacto" class="py-24 sm:py-32">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <!-- Header -->
      <div class="text-center mb-16">
        <span class="section-badge gsap-reveal">{{ $t('contact.badge') }}</span>
        <h2 class="section-title mt-6 gsap-reveal">{{ $t('contact.title') }}</h2>
        <p class="section-subtitle mt-4 gsap-reveal">{{ $t('contact.subtitle') }}</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
        <!-- Contact Form -->
        <div class="lg:col-span-3 glass-card p-8 sm:p-10 gsap-reveal">
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <!-- Name -->
              <div>
                <label for="contact-name" class="block text-sm font-body font-semibold text-capibara-700 dark:text-capibara-300 mb-2">
                  {{ $t('contact.form.name') }}
                </label>
                <input
                  id="contact-name"
                  v-model="form.name"
                  type="text"
                  required
                  class="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-capibara-800/50 border border-capibara-200 dark:border-capibara-700 font-body text-capibara-900 dark:text-capibara-100 placeholder:text-capibara-400 focus:outline-none focus:ring-2 focus:ring-capibara-900/20 dark:focus:ring-capibara-300/20 transition-all"
                  :placeholder="$t('contact.form.name')"
                />
              </div>
              <!-- Email -->
              <div>
                <label for="contact-email" class="block text-sm font-body font-semibold text-capibara-700 dark:text-capibara-300 mb-2">
                  {{ $t('contact.form.email') }}
                </label>
                <input
                  id="contact-email"
                  v-model="form.email"
                  type="email"
                  required
                  class="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-capibara-800/50 border border-capibara-200 dark:border-capibara-700 font-body text-capibara-900 dark:text-capibara-100 placeholder:text-capibara-400 focus:outline-none focus:ring-2 focus:ring-capibara-900/20 dark:focus:ring-capibara-300/20 transition-all"
                  :placeholder="$t('contact.form.email')"
                />
              </div>
            </div>

            <!-- Phone -->
            <div>
              <label for="contact-phone" class="block text-sm font-body font-semibold text-capibara-700 dark:text-capibara-300 mb-2">
                {{ $t('contact.form.phone') }}
              </label>
              <input
                id="contact-phone"
                v-model="form.phone"
                type="tel"
                class="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-capibara-800/50 border border-capibara-200 dark:border-capibara-700 font-body text-capibara-900 dark:text-capibara-100 placeholder:text-capibara-400 focus:outline-none focus:ring-2 focus:ring-capibara-900/20 dark:focus:ring-capibara-300/20 transition-all"
                :placeholder="$t('contact.form.phone')"
              />
            </div>

            <!-- Message -->
            <div>
              <label for="contact-message" class="block text-sm font-body font-semibold text-capibara-700 dark:text-capibara-300 mb-2">
                {{ $t('contact.form.message') }}
              </label>
              <textarea
                id="contact-message"
                v-model="form.message"
                required
                rows="5"
                class="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-capibara-800/50 border border-capibara-200 dark:border-capibara-700 font-body text-capibara-900 dark:text-capibara-100 placeholder:text-capibara-400 focus:outline-none focus:ring-2 focus:ring-capibara-900/20 dark:focus:ring-capibara-300/20 transition-all resize-none"
                :placeholder="$t('contact.form.message')"
              />
            </div>

            <!-- Submit -->
            <button
              type="submit"
              :disabled="sending"
              class="btn-primary w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <Send :size="18" />
              {{ sending ? $t('contact.form.sending') : $t('contact.form.submit') }}
            </button>

            <!-- Status Messages -->
            <Transition
              enter-active-class="transition duration-300"
              enter-from-class="opacity-0 -translate-y-2"
              enter-to-class="opacity-100 translate-y-0"
            >
              <p
                v-if="status === 'success'"
                class="font-body text-sm text-emerald-600 dark:text-emerald-400"
              >
                {{ $t('contact.form.success') }}
              </p>
              <p
                v-else-if="status === 'error'"
                class="font-body text-sm text-red-500 dark:text-red-400"
              >
                {{ $t('contact.form.error') }}
              </p>
            </Transition>
          </form>
        </div>

        <!-- Contact Info Sidebar -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Info Card -->
          <div class="glass-card p-8 gsap-reveal">
            <h3 class="font-heading text-xl font-bold text-capibara-900 dark:text-capibara-100 mb-6">
              {{ $t('contact.info.title') }}
            </h3>
            <ul class="space-y-5">
              <li class="flex items-start gap-4">
                <Mail :size="20" class="flex-shrink-0 mt-0.5 text-capibara-500" />
                <div>
                  <a
                    href="mailto:contacto@thecapibaraweb.mx"
                    class="font-body text-capibara-900 dark:text-capibara-200 hover:underline cursor-pointer"
                  >
                    {{ $t('contact.info.email') }}
                  </a>
                </div>
              </li>
              <li class="flex items-start gap-4">
                <Phone :size="20" class="flex-shrink-0 mt-0.5 text-capibara-500" />
                <div>
                  <a
                    href="tel:+526181835957"
                    class="font-body text-capibara-900 dark:text-capibara-200 hover:underline cursor-pointer"
                  >
                    {{ $t('contact.info.phone') }}
                  </a>
                </div>
              </li>
              <li class="flex items-start gap-4">
                <MapPin :size="20" class="flex-shrink-0 mt-0.5 text-capibara-500" />
                <span class="font-body text-capibara-600 dark:text-capibara-400">
                  {{ $t('contact.info.location') }}
                </span>
              </li>
            </ul>
          </div>

          <!-- WhatsApp CTA -->
          <button
            class="w-full glass-card p-8 flex items-center gap-4 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group gsap-reveal"
            @click="handleWhatsApp"
          >
            <div class="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
              <svg class="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </div>
            <div class="text-left">
              <span class="block font-heading text-lg font-bold text-capibara-900 dark:text-capibara-100">
                {{ $t('contact.whatsapp') }}
              </span>
              <span class="block font-body text-sm text-capibara-500 dark:text-capibara-400">
                +52 618 183 5957
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Send, Mail, Phone, MapPin } from 'lucide-vue-next'
import { useWhatsappNotification } from '~/composables/useWhatsappNotification'

const { openWhatsApp, sendNotification } = useWhatsappNotification()
const { $gsap } = useNuxtApp()

const form = reactive({
  name: '',
  email: '',
  phone: '',
  message: '',
})

const sending = ref(false)
const status = ref<'idle' | 'success' | 'error'>('idle')

async function handleSubmit() {
  if (sending.value) return
  sending.value = true
  status.value = 'idle'

  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: {
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: form.message,
      },
    })
    status.value = 'success'
    form.name = ''
    form.email = ''
    form.phone = ''
    form.message = ''
    sendNotification('Formulario de contacto')
  } catch {
    status.value = 'error'
  } finally {
    sending.value = false
  }
}

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
