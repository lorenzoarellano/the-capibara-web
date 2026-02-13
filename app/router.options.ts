import type { RouterConfig } from '@nuxt/schema'

// Configuración del router para manejar navegación con hash
// Permite que los links del navbar funcionen desde páginas internas
export default <RouterConfig>{
    scrollBehavior(to, _from, savedPosition) {
        // Si hay posición guardada (botón atrás), restaurarla
        if (savedPosition) {
            return savedPosition
        }

        // Si hay un hash en la URL (ej: /#servicios), hacer scroll al elemento
        if (to.hash) {
            return new Promise((resolve) => {
                // Esperamos a que el DOM se renderice
                setTimeout(() => {
                    resolve({
                        el: to.hash,
                        behavior: 'smooth',
                        top: 80, // Offset para el navbar fijo
                    })
                }, 300)
            })
        }

        // Por defecto, ir al inicio
        return { top: 0 }
    },
}
