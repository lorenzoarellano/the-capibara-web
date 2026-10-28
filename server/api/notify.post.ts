// Rate limit state (in-memory, per instance)
const hits = new Map<string, number[]>()
const WINDOW_MS = 60_000
const MAX_HITS = 5

// Only these button names are accepted; the message is built server-side
const ALLOWED_BUTTONS = new Set(['CTA', 'WhatsApp', 'Footer WhatsApp'])

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)

  if (!config.webcybert || !config.notifyNumber) {
    throw createError({ statusCode: 500, message: 'Service unavailable.' })
  }

  const ip = getRequestIP(event, { xForwardedFor: true }) || 'unknown'
  const now = Date.now()
  const recent = (hits.get(ip) || []).filter(t => now - t < WINDOW_MS)
  if (recent.length >= MAX_HITS) {
    throw createError({ statusCode: 429, message: 'Too many requests.' })
  }
  recent.push(now)
  hits.set(ip, recent)

  if (hits.size > 5000) {
    for (const [key, times] of hits.entries()) {
      if (!times.some(t => now - t < WINDOW_MS)) hits.delete(key)
    }
  }

  const body = await readBody(event).catch(() => null)
  const button = body && typeof body.button === 'string' ? body.button : ''
  if (!ALLOWED_BUTTONS.has(button)) {
    throw createError({ statusCode: 400, message: 'Invalid request.' })
  }

  const hora = new Date().toLocaleTimeString('es-MX', {
    hour12: false,
    timeZone: 'America/Mexico_City',
  })

  try {
    await $fetch(config.webcybert as string, {
      method: 'POST',
      body: {
        number: config.notifyNumber,
        message: `Click sitio web TheCapibaraWeb en el boton ${button} a las: ${hora}`,
      },
      timeout: 5000,
    })
    return { success: true }
  } catch (error) {
    console.error('Error forwarding notification:', error)
    return { success: false }
  }
})
