import nodemailer from 'nodemailer'

// Simple in-memory rate limiting
const rateLimitMap = new Map<string, number>()
const RATE_LIMIT_WINDOW = 60_000 // 1 minute

export default defineEventHandler(async (event) => {
  // Rate limit by IP
  const ip =
    getHeader(event, 'x-forwarded-for')?.split(',')[0]?.trim() ||
    getHeader(event, 'x-real-ip') ||
    'unknown'

  const lastRequest = rateLimitMap.get(ip)
  if (lastRequest && Date.now() - lastRequest < RATE_LIMIT_WINDOW) {
    throw createError({
      statusCode: 429,
      message: 'Demasiadas solicitudes. Intenta de nuevo en un momento.',
    })
  }
  rateLimitMap.set(ip, Date.now())

  // Clean old entries periodically
  if (rateLimitMap.size > 1000) {
    const now = Date.now()
    for (const [key, time] of rateLimitMap.entries()) {
      if (now - time > RATE_LIMIT_WINDOW * 5) {
        rateLimitMap.delete(key)
      }
    }
  }

  const body = await readBody(event)
  const { name, email, phone, message } = body

  // Validation
  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    throw createError({ statusCode: 400, message: 'Nombre es requerido (mínimo 2 caracteres).' })
  }
  if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw createError({ statusCode: 400, message: 'Correo electrónico válido es requerido.' })
  }
  if (!message || typeof message !== 'string' || message.trim().length < 10) {
    throw createError({ statusCode: 400, message: 'Mensaje es requerido (mínimo 10 caracteres).' })
  }

  // Sanitize input
  const sanitize = (str: string) => str.replace(/[<>]/g, '').trim()
  const safeName = sanitize(name)
  const safeEmail = sanitize(email)
  const safePhone = phone ? sanitize(phone) : 'No proporcionado'
  const safeMessage = sanitize(message)

  // Configure SMTP transporter
  const config = useRuntimeConfig()
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  try {
    await transporter.sendMail({
      from: `"TheCapibaraWeb Contacto" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL || 'contacto@thecapibaraweb.mx',
      replyTo: safeEmail,
      subject: `Nuevo contacto web: ${safeName}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: 'Open Sans', Arial, sans-serif; color: #282121; }
            .container { max-width: 600px; margin: 0 auto; padding: 24px; }
            .header { background: #282121; color: #fff; padding: 20px; border-radius: 12px 12px 0 0; }
            .content { background: #f8f8f8; padding: 24px; border-radius: 0 0 12px 12px; }
            .field { margin-bottom: 16px; }
            .label { font-weight: 600; color: #605555; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; }
            .value { margin-top: 4px; font-size: 16px; color: #282121; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2 style="margin:0;">Nuevo Mensaje de Contacto</h2>
              <p style="margin:4px 0 0;opacity:0.8;font-size:14px;">thecapibaraweb.com.mx</p>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Nombre</div>
                <div class="value">${safeName}</div>
              </div>
              <div class="field">
                <div class="label">Correo Electrónico</div>
                <div class="value"><a href="mailto:${safeEmail}">${safeEmail}</a></div>
              </div>
              <div class="field">
                <div class="label">Teléfono</div>
                <div class="value">${safePhone}</div>
              </div>
              <div class="field">
                <div class="label">Mensaje</div>
                <div class="value">${safeMessage.replace(/\n/g, '<br>')}</div>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    })

    return { success: true, message: 'Mensaje enviado correctamente.' }
  } catch (error: any) {
    console.error('Error sending contact email:', error)
    throw createError({
      statusCode: 500,
      message: 'Error al enviar el mensaje. Intente más tarde.',
    })
  }
})
