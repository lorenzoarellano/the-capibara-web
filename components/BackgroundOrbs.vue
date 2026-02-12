<template>
  <div ref="orbContainer" class="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
    <!-- Orbes de gradiente animados -->
    <div
      v-for="orb in orbs"
      :key="orb.id"
      :ref="(el) => { if (el) orbElements[orb.id] = el as HTMLElement }"
      class="absolute rounded-full blur-3xl will-change-transform"
      :class="orb.classes"
      :style="{ width: orb.size, height: orb.size, left: orb.x, top: orb.y }"
    />
  </div>
</template>

<script setup lang="ts">
const { $gsap } = useNuxtApp()
const orbContainer = ref<HTMLElement | null>(null)
const orbElements: Record<string, HTMLElement> = {}

const orbs = [
  {
    id: 'orb-teal',
    classes: 'bg-teal/[0.07] dark:bg-teal-light/[0.05]',
    size: '500px',
    x: '10%',
    y: '20%',
  },
  {
    id: 'orb-crimson',
    classes: 'bg-crimson/[0.05] dark:bg-crimson/[0.04]',
    size: '400px',
    x: '70%',
    y: '60%',
  },
  {
    id: 'orb-plum',
    classes: 'bg-plum/[0.06] dark:bg-plum-light/[0.05]',
    size: '450px',
    x: '60%',
    y: '10%',
  },
  {
    id: 'orb-mint',
    classes: 'bg-mint/[0.12] dark:bg-mint/[0.04]',
    size: '350px',
    x: '20%',
    y: '70%',
  },
  {
    id: 'orb-teal2',
    classes: 'bg-teal-light/[0.06] dark:bg-teal/[0.04]',
    size: '300px',
    x: '80%',
    y: '40%',
  },
]

onMounted(() => {
  const gsap = $gsap as typeof import('gsap').gsap

  // Animar cada orbe con movimiento flotante independiente
  Object.entries(orbElements).forEach(([id, el]) => {
    // Movimiento flotante lento y orgánico
    gsap.to(el, {
      x: () => `+=${gsap.utils.random(-80, 80)}`,
      y: () => `+=${gsap.utils.random(-60, 60)}`,
      scale: gsap.utils.random(0.8, 1.2),
      duration: gsap.utils.random(12, 20),
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    })

    // Rotación sutil y cambio de opacidad
    gsap.to(el, {
      opacity: gsap.utils.random(0.5, 1),
      duration: gsap.utils.random(6, 10),
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      delay: gsap.utils.random(0, 3),
    })
  })
})
</script>
