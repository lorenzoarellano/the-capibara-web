import nodemailer from 'nodemailer'

// Simple in-memory rate limiting
const rateLimitMap = new Map<string, number>()
const RATE_LIMIT_WINDOW = 5_000 // 5 seconds (relaxed for testing)

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
  if (!phone || typeof phone !== 'string' || phone.length < 10) {
    throw createError({ statusCode: 400, message: 'Número de teléfono válido es requerido.' })
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
  const config = useRuntimeConfig(event)
  const port = parseInt((config.smtpPort as string) || '587')

  const smtpConfig = {
    host: (config.smtpHost as string) || 'smtp.gmail.com',
    port: port,
    secure: port === 465, // Use SSL for port 465
    auth: {
      user: config.smtpUser as string,
      pass: config.smtpPass as string,
    },
  }
  const transporter = nodemailer.createTransport(smtpConfig)

  try {
    const mailOptions = {
      from: `"The Capibara Web Contact" <${config.smtpUser as string}>`,
      to: (config.contactEmail as string) || 'contacto@thecapibaraweb.com.mx',
      replyTo: safeEmail,
      subject: `Nuevo mensaje de contacto: ${safeName}`,
      text: `
        Nuevo mensaje de contacto desde thecapibaraweb.com.mx
        
        Nombre: ${safeName}
        Correo: ${safeEmail}
        Teléfono: ${safePhone}
        
        Mensaje:
        ${safeMessage}
        
        ---
        Este es un mensaje automático enviado desde el formulario de contacto.
      `.trim(),
      html: `
        <!DOCTYPE html>
        <html lang="es">
        <head>
          <meta charset="utf-8">
          <style>
            .email-wrapper {
              background-color: #f6f9fc;
              padding: 40px 0;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            }
            .email-content {
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              border-radius: 8px;
              overflow: hidden;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
            }
            .email-header {
              background-color: #1a1a1a;
              color: #ffffff;
              padding: 30px;
              text-align: center;
            }
            .email-body {
              padding: 40px;
              color: #333333;
              line-height: 1.6;
            }
            .field-group {
              margin-bottom: 25px;
            }
            .field-label {
              font-size: 12px;
              font-weight: 700;
              color: #8898aa;
              text-transform: uppercase;
              letter-spacing: 0.04em;
              margin-bottom: 5px;
            }
            .field-value {
              font-size: 16px;
              color: #1a1a1a;
            }
            .field-message {
              background-color: #f8fafc;
              padding: 20px;
              border-radius: 6px;
              border-left: 4px solid #1a1a1a;
              font-style: italic;
            }
            .email-footer {
              padding: 20px;
              text-align: center;
              font-size: 12px;
              color: #8898aa;
              background-color: #f8fafc;
            }
          </style>
        </head>
        <body>
          <div class="email-wrapper">
            <div class="email-content">
              <div class="email-header">
                <h1 style="margin:0;font-size:24px;letter-spacing:0.02em;">NUEVO CONTACTO</h1>
                <p style="margin:10px 0 0;font-size:14px;opacity:0.8;">thecapibaraweb.com.mx</p>
              </div>
              <div class="email-body">
                <div class="field-group">
                  <div class="field-label">Nombre del Cliente</div>
                  <div class="field-value">${safeName}</div>
                </div>
                <div class="field-group">
                  <div class="field-label">Información de Contacto</div>
                  <div class="field-value">
                    <strong>Email:</strong> <a href="mailto:${safeEmail}" style="color:#1a1a1a;text-decoration:none;">${safeEmail}</a><br>
                    <strong>Teléfono:</strong> ${safePhone}
                  </div>
                </div>
                <div class="field-group">
                  <div class="field-label">Mensaje</div>
                  <div class="field-message">
                    ${safeMessage.replace(/\n/g, '<br>')}
                  </div>
                </div>
              </div>
              <div class="email-footer">
                &copy; ${new Date().getFullYear()} The Capibara Web. Todos los derechos reservados.
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    }

    await transporter.sendMail(mailOptions)

    return { success: true, message: 'Mensaje enviado correctamente.' }
  } catch (error: any) {
    console.error('Error sending contact email:', error)

    // Check for specific SMTP errors to give better feedback
    if (error.code === 'EAUTH' || error.responseCode === 535) {
      throw createError({
        statusCode: 401,
        message: 'Error de autenticación SMTP: Usuario o contraseña incorrectos en el servidor de correo.',
      })
    }

    if (error.code === 'ECONNREFUSED' || error.code === 'ETIMEDOUT') {
      throw createError({
        statusCode: 503,
        message: 'No se pudo conectar con el servidor de correo. Verifica el host y puerto.',
      })
    }

    throw createError({
      statusCode: 500,
      message: 'Error interno al enviar el mensaje. Intente más tarde.',
    })
  }
})
