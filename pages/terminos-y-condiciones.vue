<template>
  <div class="pt-28 pb-16">
    <div class="max-w-4xl mx-auto px-4 sm:px-6">
      <h1 class="section-title mb-4">{{ $t('terms.title') }}</h1>
      <p class="section-subtitle !text-left !mx-0 mb-12">{{ $t('terms.lastUpdated') }}</p>

      <article class="prose prose-lg max-w-none font-body text-capibara-700 dark:text-capibara-300 space-y-8">
        <section>
          <h2 class="font-heading text-2xl font-bold text-capibara-900 dark:text-capibara-100">1. Aceptación de los Términos</h2>
          <p>
            Al acceder y utilizar el sitio web <strong>thecapibaraweb.com.mx</strong> (en adelante, "el Sitio"),
            usted acepta estar sujeto a los presentes Términos y Condiciones. Si no está de acuerdo con alguno de estos términos,
            le solicitamos que no utilice el Sitio. The Capibara Web se reserva el derecho de modificar estos términos en cualquier momento,
            siendo efectivos a partir de su publicación en esta página.
          </p>
        </section>

        <section>
          <h2 class="font-heading text-2xl font-bold text-capibara-900 dark:text-capibara-100">2. Descripción de los Servicios</h2>
          <p>
            The Capibara Web es una empresa de desarrollo de software y consultoría tecnológica con sede en Durango, México.
            A través del Sitio, ofrecemos información sobre nuestros servicios, que incluyen pero no se limitan a:
          </p>
          <ul class="list-disc pl-6 space-y-2">
            <li>Desarrollo de software a medida con Vue.js, Node.js y AWS.</li>
            <li>Implementación y capacitación en inteligencia artificial (IA).</li>
            <li>Soluciones SaaS especializadas para los sectores de salud (HealthTech) y educación (EdTech).</li>
            <li>Migración a la nube y optimización de rendimiento.</li>
            <li>Posicionamiento web y estrategias SEO, AEO y LLMO.</li>
          </ul>
          <p>
            La información presentada en el Sitio es de carácter informativo y no constituye una oferta vinculante.
            Los términos específicos de cada proyecto se definirán mediante contrato individual entre las partes.
          </p>
        </section>

        <section>
          <h2 class="font-heading text-2xl font-bold text-capibara-900 dark:text-capibara-100">3. Propiedad Intelectual</h2>
          <p>
            Todo el contenido del Sitio, incluyendo pero no limitado a textos, imágenes, logotipos, diseños, código fuente,
            gráficos e iconografía, es propiedad de The Capibara Web o de sus respectivos licenciatarios y está protegido por
            las leyes de propiedad intelectual aplicables en México y tratados internacionales.
          </p>
          <p>
            Queda estrictamente prohibida la reproducción, distribución, modificación o uso comercial de cualquier contenido del Sitio
            sin autorización previa y por escrito de The Capibara Web.
          </p>
        </section>

        <section>
          <h2 class="font-heading text-2xl font-bold text-capibara-900 dark:text-capibara-100">4. Uso Aceptable del Sitio</h2>
          <p>El usuario se compromete a utilizar el Sitio de manera lícita y conforme a estos Términos. Queda prohibido:</p>
          <ul class="list-disc pl-6 space-y-2">
            <li>Utilizar el Sitio para fines ilícitos o no autorizados.</li>
            <li>Intentar acceder a áreas restringidas del Sitio o sus sistemas.</li>
            <li>Transmitir virus, malware o cualquier código malicioso a través del Sitio.</li>
            <li>Realizar ingeniería inversa, descompilar o desensamblar cualquier parte del Sitio.</li>
            <li>Recopilar información de otros usuarios sin su consentimiento.</li>
          </ul>
        </section>

        <section>
          <h2 class="font-heading text-2xl font-bold text-capibara-900 dark:text-capibara-100">5. Formulario de Contacto</h2>
          <p>
            Al enviar información a través del formulario de contacto del Sitio, usted declara que los datos proporcionados son verídicos
            y acepta que The Capibara Web utilice dicha información conforme a lo establecido en nuestro
            <NuxtLink to="/aviso-de-privacidad" class="text-capibara-900 dark:text-capibara-200 underline">Aviso de Privacidad</NuxtLink>.
          </p>
        </section>

        <section>
          <h2 class="font-heading text-2xl font-bold text-capibara-900 dark:text-capibara-100">6. Limitación de Responsabilidad</h2>
          <p>
            The Capibara Web no garantiza que el Sitio esté disponible de forma ininterrumpida o libre de errores.
            No seremos responsables de daños directos, indirectos, incidentales o consecuentes derivados del uso o la imposibilidad
            de uso del Sitio.
          </p>
          <p>
            La información sobre casos de éxito, métricas y resultados presentada en el Sitio se basa en experiencias pasadas
            y no garantiza resultados idénticos para todos los clientes, ya que cada proyecto tiene variables únicas.
          </p>
        </section>

        <section>
          <h2 class="font-heading text-2xl font-bold text-capibara-900 dark:text-capibara-100">7. Enlaces a Terceros</h2>
          <p>
            El Sitio puede contener enlaces a sitios web de terceros (redes sociales, WhatsApp, etc.).
            The Capibara Web no se hace responsable del contenido, políticas de privacidad o prácticas de dichos sitios externos.
            El acceso a estos enlaces es bajo la responsabilidad exclusiva del usuario.
          </p>
        </section>

        <section>
          <h2 class="font-heading text-2xl font-bold text-capibara-900 dark:text-capibara-100">8. Legislación Aplicable y Jurisdicción</h2>
          <p>
            Los presentes Términos y Condiciones se rigen por las leyes vigentes en los Estados Unidos Mexicanos.
            Para la resolución de cualquier controversia derivada de estos términos, las partes se someten a la jurisdicción
            de los tribunales competentes de la ciudad de Durango, Durango, México, renunciando a cualquier otro fuero
            que pudiera corresponderles por razón de domicilio presente o futuro.
          </p>
        </section>

        <section>
          <h2 class="font-heading text-2xl font-bold text-capibara-900 dark:text-capibara-100">9. Contacto</h2>
          <p>
            Para cualquier duda, aclaración o reclamación relacionada con estos Términos y Condiciones, puede contactarnos en:
          </p>
          <ul class="list-disc pl-6 space-y-2">
            <li>Correo: <a href="mailto:contacto@thecapibaraweb.mx" class="text-capibara-900 dark:text-capibara-200 underline">contacto@thecapibaraweb.mx</a></li>
            <li>Teléfono: +52 618 183 5957</li>
            <li>Ubicación: Durango, Durango, México</li>
          </ul>
        </section>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

useHead({
  title: `${t('terms.title')} | The Capibara Web`,
  meta: [
    {
      name: 'description',
      content:
        'Términos y Condiciones de uso del sitio web thecapibaraweb.com.mx. Conozca las condiciones de uso de nuestros servicios de desarrollo de software y consultoría de IA.',
    },
  ],
})
</script>
