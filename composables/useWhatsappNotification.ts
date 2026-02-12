const RATE_LIMIT_KEY = 'tcw_wa_last_sent'
const RATE_LIMIT_MS = 30_000 // 30 seconds between notifications

export function useWhatsappNotification() {
  /**
   * Sends a notification to the internal WhatsApp tracking endpoint.
   * Rate-limited to 1 request per 30 seconds via localStorage.
   */
  async function sendNotification(buttonName: string = 'CTA') {
    if (import.meta.server) return

    const lastSent = localStorage.getItem(RATE_LIMIT_KEY)
    if (lastSent && Date.now() - parseInt(lastSent, 10) < RATE_LIMIT_MS) {
      return // Rate limited
    }

    const now = new Date()
    const hora = now.toLocaleTimeString('es-MX', { hour12: false })
    const mensaje = `Click sitio web TheCapibaraWeb en el boton ${buttonName} a las: ${hora}`

    try {
      await fetch('https://cybertbot.com/masivo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          number: '6181835957',
          message: mensaje,
        }),
      })
      localStorage.setItem(RATE_LIMIT_KEY, Date.now().toString())
    } catch (error) {
      console.error('Error en la notificación:', error)
    }
  }

  /**
   * Opens a WhatsApp chat with a predefined or custom message
   * and fires the internal tracking notification.
   */
  function openWhatsApp(message?: string) {
    if (import.meta.server) return

    const defaultMsg =
      message ??
      'Hola, me interesa conocer más sobre sus servicios de desarrollo de software e IA.'
    const url = `https://wa.me/526181835957?text=${encodeURIComponent(defaultMsg)}`
    window.open(url, '_blank')
    sendNotification('WhatsApp')
  }

  return { sendNotification, openWhatsApp }
}
