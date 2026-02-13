<template>
  <section class="py-24 sm:py-32 overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <!-- Header -->
      <div class="text-center mb-16">
        <span class="section-badge gsap-reveal text-capibara-600 dark:text-capibara-400 uppercase tracking-widest text-xs font-bold">{{ $t('trust.badge') }}</span>
        <h2 class="section-title mt-6 gsap-reveal text-3xl sm:text-4xl font-heading font-bold text-capibara-900 dark:text-capibara-100 italic tracking-tight">{{ $t('trust.title') }}</h2>
        <p class="section-subtitle mt-4 gsap-reveal text-capibara-600 dark:text-capibara-400 font-body max-w-2xl mx-auto">{{ $t('trust.subtitle') }}</p>
      </div>

      <!-- Logos Marquee — Dos filas en direcciones opuestas -->
      <div class="relative gsap-reveal space-y-8 py-10">

        <!-- Fila 1: izquierda a derecha -->
        <div class="flex animate-marquee gap-8 items-center h-32">
          <div
            v-for="(client, index) in row1Loop"
            :key="`row1-${index}`"
            class="flex-shrink-0 relative group"
          >
            <!-- Card -->
            <component
              :is="client.url ? 'a' : 'div'"
              v-bind="client.url ? { href: client.url, target: '_blank', rel: 'noopener noreferrer' } : {}"
              class="client-card glass-card !rounded-2xl px-8 py-5 flex items-center justify-center min-w-[200px] h-20 transition-all duration-500 hover:scale-105 active:scale-95 cursor-pointer relative z-10 block shadow-sm hover:shadow-xl hover:bg-white/50 dark:hover:bg-white/10"
            >
              <img
                :src="`/clients/${client.slug}.webp`"
                :alt="client.name"
                class="h-10 w-auto object-contain opacity-80 group-hover:opacity-100 transition-all duration-500"
                loading="lazy"
              />

              <!-- Tooltip popup -->
              <div class="client-tooltip">
                <div class="flex items-center gap-4">
                  <div class="w-12 h-12 rounded-xl bg-capibara-50 dark:bg-capibara-900/50 flex items-center justify-center p-2 border border-capibara-100 dark:border-capibara-800">
                    <img
                      :src="`/clients/${client.slug}.webp`"
                      :alt="client.name"
                      class="w-full h-full object-contain"
                    />
                  </div>
                  <div class="flex flex-col text-left">
                    <span class="text-sm font-heading font-bold text-capibara-900 dark:text-capibara-100 leading-tight">
                      {{ client.name }}
                    </span>
                    <span v-if="client.url" class="text-[11px] font-body font-medium text-capibara-500 dark:text-capibara-400 mt-0.5 flex items-center gap-1.5 group/link">
                      Click para visitar sitio
                      <span class="inline-block transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform">↗</span>
                    </span>
                    <span v-else class="text-[11px] font-body text-capibara-400 dark:text-capibara-500 italic mt-0.5 leading-none">
                      Solo diseño gráfico
                    </span>
                  </div>
                </div>
              </div>
            </component>
          </div>
        </div>

        <!-- Fila 2: derecha a izquierda -->
        <div class="flex animate-marquee-reverse gap-8 items-center h-32">
          <div
            v-for="(client, index) in row2Loop"
            :key="`row2-${index}`"
            class="flex-shrink-0 relative group"
          >
            <component
              :is="client.url ? 'a' : 'div'"
              v-bind="client.url ? { href: client.url, target: '_blank', rel: 'noopener noreferrer' } : {}"
              class="client-card glass-card !rounded-2xl px-8 py-5 flex items-center justify-center min-w-[200px] h-20 transition-all duration-500 hover:scale-105 active:scale-95 cursor-pointer relative z-10 block shadow-sm hover:shadow-xl hover:bg-white/50 dark:hover:bg-white/10"
            >
              <img
                :src="`/clients/${client.slug}.webp`"
                :alt="client.name"
                class="h-10 w-auto object-contain opacity-80 group-hover:opacity-100 transition-all duration-500"
                loading="lazy"
              />

              <!-- Tooltip popup -->
              <div class="client-tooltip">
                <div class="flex items-center gap-4">
                  <div class="w-12 h-12 rounded-xl bg-capibara-50 dark:bg-capibara-900/50 flex items-center justify-center p-2 border border-capibara-100 dark:border-capibara-800">
                    <img
                      :src="`/clients/${client.slug}.webp`"
                      :alt="client.name"
                      class="w-full h-full object-contain"
                    />
                  </div>
                  <div class="flex flex-col text-left">
                    <span class="text-sm font-heading font-bold text-capibara-900 dark:text-capibara-100 leading-tight">
                      {{ client.name }}
                    </span>
                    <span v-if="client.url" class="text-[11px] font-body font-medium text-capibara-500 dark:text-capibara-400 mt-0.5 flex items-center gap-1.5 group/link">
                      Click para visitar sitio
                      <span class="inline-block transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform">↗</span>
                    </span>
                    <span v-else class="text-[11px] font-body text-capibara-400 dark:text-capibara-500 italic mt-0.5 leading-none">
                      Solo diseño gráfico
                    </span>
                  </div>
                </div>
              </div>
            </component>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { $gsap } = useNuxtApp()

// Interfaz para cada cliente
interface Client {
  name: string
  slug: string
  url?: string
}

// Fila 1: primeros 9 clientes (Según lista de usuario)
const row1: Client[] = [
  { name: 'Columbus Networks', slug: 'columbus', url: 'https://columbusnetworks.com/' },
  { name: 'Education Canada', slug: 'ecn', url: 'https://educationcanada.com/' },
  { name: 'Education America', slug: 'ean', url: 'https://educationamerica.us/' },
  { name: 'jFairs', slug: 'jfairs', url: 'http://jfairs.com/' },
  { name: 'Emirsa', slug: 'emirsa', url: 'https://emirsa.mx/' },
  { name: 'Alvarado Mining', slug: 'alvarado', url: 'https://alvaradomining.mx/' },
  { name: 'Ag-Tronix', slug: 'agtronix', url: 'https://ag-tronix.com/' },
  { name: 'Doctor Digital', slug: 'doctordigital', url: 'https://doctordigital.mx/' },
  { name: 'Medicynia', slug: 'medicynia', url: 'https://medicynia.com/' },
]

// Fila 2: últimos 9 clientes (Según lista de usuario)
const row2: Client[] = [
  { name: 'CyberTayoltita', slug: 'cybert', url: 'https://cybertayoltita.com/' },
  { name: 'Dra. Karen Soto', slug: 'drakarensoto', url: 'https://drakarensotogeriatra.com/' },
  { name: 'Dra. Marlene Soto', slug: 'dramarlenesoto', url: 'https://dramarlenesotogeriatra.com/' },
  { name: 'Dr. Edgar Arrieta', slug: 'dredgar', url: 'https://reumatologiadurango.com/' },
  { name: 'Dr. Jeheiziel', slug: 'drjeheiziel', url: 'https://internistalaguna.com/' },
  { name: 'Dr. José Luis Reveles', slug: 'drjoseluis', url: 'https://drjoseluisrevelestraumatologo.com/' },
  { name: 'Dr. Ricardo Rubio', slug: 'drricardorubio' },
  { name: 'Dra. Denise Medina', slug: 'denisemedina', url: 'https://dradenisemedina.com/' },
  { name: 'Dra. Saira Rosales', slug: 'sairarosales', url: 'https://drasairarosales.com/' },
]

// Duplicar cada fila para crear el loop infinito sin saltos
const row1Loop = [...row1, ...row1]
const row2Loop = [...row2, ...row2]

onMounted(() => {
  const gsap = $gsap as typeof import('gsap').gsap

  gsap.utils.toArray<HTMLElement>('.gsap-reveal').forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      },
    )
  })
})
</script>

<style scoped>
@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

@keyframes marquee-reverse {
  0% { transform: translateX(-50%); }
  100% { transform: translateX(0); }
}

.animate-marquee {
  animation: marquee 40s linear infinite;
}

.animate-marquee-reverse {
  animation: marquee-reverse 40s linear infinite;
}

.animate-marquee:hover,
.animate-marquee-reverse:hover {
  animation-play-state: paused;
}

/* Tooltip Popup Premium */
.client-tooltip {
  position: absolute;
  bottom: calc(100% + 20px);
  left: 50%;
  transform: translateX(-50%) translateY(15px) scale(0.95);
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(24px);
  border: 1px solid rgba(14, 124, 123, 0.15);
  border-radius: 20px;
  padding: 16px;
  box-shadow: 
    0 15px 40px -5px rgba(14, 124, 123, 0.2),
    0 5px 15px -3px rgba(0, 0, 0, 0.05);
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  z-index: 100;
  min-width: 240px;
}

/* Flecha inferior del tooltip */
.client-tooltip::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 10px solid transparent;
  border-top-color: rgba(255, 255, 255, 0.98);
  filter: drop-shadow(0 2px 2px rgba(0,0,0,0.05));
}

/* Mostrar tooltip en hover */
.group:hover .client-tooltip {
  opacity: 1;
  visibility: visible;
  transform: translateX(-50%) translateY(0) scale(1);
}

/* Dark mode para tooltip */
.dark .client-tooltip {
  background: rgba(15, 15, 15, 0.98);
  border-color: rgba(23, 190, 187, 0.25);
  box-shadow: 
    0 20px 50px -10px rgba(0, 0, 0, 0.5),
    0 10px 20px -5px rgba(23, 190, 187, 0.1);
}

.dark .client-tooltip::after {
  border-top-color: rgba(15, 15, 15, 0.98);
}
</style>
