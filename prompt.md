# 🚀 Prompt Maestro: Proyecto TheCapbaraWeb Informático

Este documento contiene el prompt definitivo para recrear la experiencia visual y técnica de **TheCapbaraWeb** como una página web Factoría de Soluciones Digitales de alto impacto, utilizando las mejores prácticas de UI/UX y el stack tecnológico actual.

Dominio: thecapibaraweb.com.mx

---

## 🎭 1. Perfil del Proyecto y ADN Visual
**Nombre:** TheCapbaraWeb (Versión Informática/Landing)  
**Estética:** Premium SaaS / High-Tech Minimal / Glassmorphism.  
**Objetivo:** Transmitir innovación, conectividad y profesionalidad mediante una interfaz "limpia" y fluida.

### Especificaciones de Diseño (CSS/UI)
*   **Fondo Mesh Aura:** Base blanca con gradientes radiales sutiles (`at 0% 0%`, `at 100% 0%`, `at 50% 100%`)
-Paleta de colores del logo version light: #282121 (principal), #cecece (secundario) y blanco para el fondo de la web, la idea es que uses gamas de colores similares a las del logo.
-Paleta de colores del logo version dark: #cecece (logo), #282121 (secundario) y #282121 para el fondo de la web, la idea es que uses gamas de colores similares a las del logo.
Añadir textura de ruido (noise) al 3%.
*   **Glassmorphism:** Tarjetas con `background: rgba(255, 255, 255, 0.3)`, `backdrop-filter: blur(40px)` y bordes `border-white/60`.
*   **Tipografía:** 
    *   **Headings:** `Cinzel` (Bold) - Estética moderna y geométrica.
    *   **Body:** `Open Sans` - Legibilidad excepcional.
*   **Botones:** Gradientes lineales (los colores te los dejo a tu eleccion de acuerdo con la paleta principal) con `shadow-xl` y efectos de escala (`hover:scale-105`) con transiciones de 300ms.
*   **Light y Dark mode:** Según la paleta de colores, por default light.

*   **Recursos:** 
    #logo.webp logo principal light
    #logo.webp  logo version dark mode
    #hero-light.webp este video necesito que aparezca en la version light en hero section
    #hero-dark.webp este video necesito que aparezca en la version dark mode en hero section
---

## 🛠 2. Stack Tecnológico Sugerido
Para replicar el rendimiento y la fluidez de TheCapbaraWeb, utiliza el siguiente stack:

*   **Framework:** `Nuxt 3/4` (SSR disabled para SPA estática de alto rendimiento).
*   **Styling:** `Tailwind CSS 3/4` para diseño atómico y utilitario.
*   **Animaciones:** `GSAP` (GreenSock Animation Platform) para *ScrollTriggers* y entradas cinemáticas de elementos.
*   **Iconografía:** `Lucide Vue Next` (Íconos de trazo fino para look premium).
*   **Fuentes:** Google Fonts (Inter y Outfit).
*   **Idiomas:** Debe ser en español por default pero con opcion a Inglés.


---

> **Instrucción:** Actúa como un Experto SEO,AEO, LLMO, GEO, Desarrollador Full-Stack, experto Diseñador UI/UX especializado en Nuxt y Tailwind para la plataforma "TheCapbaraWeb" siguiendo estas reglas estrictas:
>
> **1. Configuración de Nuxt:**
> - Implementa un layout limpio con un componente de Navbar flotante estilo "Capsule Glass".
> - Configura `nuxt.config.ts` con tipografías `Cinzel` e `Open Sans` vía Google Fonts.
>
> **2. Implementación de Tailwind (Custom layer):**
> - Crea una clase `.glass-card` que combine `backdrop-blur-md`, bordes semi-transparentes y esquinas `rounded-4xl`.
> - -Paleta de colores del logo version light: #282121 (principal), #cecece (secundario) y blanco para el fondo de la web, la idea es que uses gamas de colores similares a las del logo.
> - -Paleta de colores del logo version dark: #cecece (logo), #282121 (secundario) y #282121 para el fondo de la web, la idea es que uses gamas de colores similares a las del logo.
Añadir textura de ruido (noise) al 3%.
>
> **3. Secciones Requeridas:**
> - **Hero Section:** Título con gradiente de texto, una "Mesh Aura" de fondo y CTAs con micro-interacciones de escala.
> - **Grid de Servicios:** Usa tarjetas Glassmórficas con íconos de `Lucide` para explicar las ventajas de la plataforma.
> - **Sección de Confianza:** Carrusel o grid de logotipos de empresas en escala de grises con transición a color.
>
Informacion del sitio:

Contexto del Experto: The Capibara Web tiene 12 años de experiencia. Ha desarrollado sistemas para en EE. UU., portales nacionales de empleo en Canadá y SaaS médicos exitosos.

Secciones requeridas:

Hero:Título con gradiente de texto, una "Mesh Aura" de fondo y CTAs con micro-interacciones de escala. Enfocado en 'Software Engineering & AI Solutions'. Un mensaje que diga que transformamos ideas complejas en infraestructuras digitales escalables.

Servicios:

'Custom Software Development' (Vue/Node/AWS).

'AI Implementation & Training' (Integración de OpenAI y capacitación a empresas).

'Specialized Vertical Solutions' (HealthTech y EdTech).

'Cloud Migration & Performance'.

Proyectos Destacados (Showcase): Crea tarjetas interactivas para:

Agtronix: Ecosistema IoT para 1 millón de plantas con IA.

Education America: Portal de empleo líder en EE. UU.

Medicynia: SaaS de gestión médica en México.

Doctor Digital: Red de más de 10 plataformas para especialistas médicos.

Sección de Capacitación: 'IA para Empresas'. Un módulo sobre cómo enseñamos a equipos a usar IA para optimizar flujos de trabajo.

Tecnologías: Mostrar logotipos de Vue.js, Node.js, MariaDB, AWS, OpenAI, Tailwind.

Contacto: CTA a whatsapp 6181835957
Redes sociales:
https://www.instagram.com/thecapibaraweb/
https://www.facebook.com/arellanolorenzo4





> **4. Animaciones:**
> - Usa GSAP en el hook `onMounted` para animar la entrada del Hero (opacity 0 -> 1, y un ligero desplazamiento hacia arriba).
>
> **5. Calidad UI/UX:**
> - No uses emojis.
> - Asegura que todos los elementos clickeables tengan `cursor-pointer`.
> - El diseño debe ser 100% responsive y accesible (contraste 4.5:1).

---

## 💡 4. Consejos de Implementación
*   **Imágenes:** Usa formato `.webp` para optimizar el tiempo de carga.
*   **SVGs:** No uses imágenes para iconos; mantén el código limpio usando directamente los componentes de Lucide.
*   **Rendimiento:** 1. Configuración de Rendimiento (Google Core Web Vitals)
Dile a la IA que el código debe seguir estas reglas para obtener un Score de 100 en PageSpeed Insights:

Arquitectura: Generación Estática (SSG) o Renderizado en el Servidor (SSR) usando Nuxt 3 para asegurar que el HTML esté listo para los rastreadores.

Imágenes: Implementar formato WebP/Avif con Lazy Loading nativo y dimensiones explícitas para evitar el Cumulative Layout Shift (CLS).

CSS: Uso estricto de Tailwind CSS para minimizar el tamaño del bundle eliminando estilos no usados (PurgeCSS).

Fonts: Carga local de tipografías con font-display: swap para eliminar el tiempo de espera de renderizado de texto.

2. De SEO a AEO, LLMO y GEO (Estrategia de Contenido)
Para que las IAs te citen como autoridad, la información debe ser estructurada y semántica. Copia y añade esto a tu prompt:

A. Datos Estructurados (Schema.org)
"Genera un archivo JSON-LD de tipo ProfessionalService y SoftwareApplication. Incluye metadatos específicos sobre mi stack tecnológico (Vue, Node, OpenAI API) y mi ubicación en Durango, México, para que Google SGE (Search Generative Experience) me identifique como entidad líder."

B. Optimización para Respuestas (AEO/GEO)
Las IAs buscan respuestas directas. Reestructura tus textos así:

Sección FAQ Semántica: Crea una sección de "Preguntas sobre Implementación de IA" con un formato de Pregunta-Respuesta directa (Ej: ¿Cómo ayuda la IA a mi empresa? La IA de The Capibara Web automatiza el 40% de tus tareas repetitivas...).

Citas de Autoridad: Incluye frases como: "Como expertos en MEVN Stack con más de 12 años de trayectoria...". Esto ayuda al LLMO a asociar tu marca con conceptos de alta autoridad.

C. Arquitectura de Información para LLMs
Los modelos de lenguaje prefieren listas claras y tablas comparativas.

"Diseña una tabla comparativa de 'Antes y Después de implementar nuestras soluciones de IA' para que sea fácilmente escaneable por algoritmos de búsqueda generativa."

3. Texto de Copywriting Optimizado (Prompt de Contenido)
Agrega este bloque a tu solicitud para que el contenido sea "amigable" para Gemini, GPT-4 y buscadores:

"Redacta el contenido siguiendo el framework E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness).

Experiencia: Resalta los 12 años.

Autoridad: Menciona el impacto en el extrajero.

Claridad: Usa lenguaje natural pero técnico. Evita adjetivos vacíos;

Estructura: Usa encabezados H1, H2 y H3 jerárquicos que contengan keywords de intención: 'Desarrollo de Software Senior', 'Consultoría de IA para empresas', 'SaaS para Médicos en México'."
