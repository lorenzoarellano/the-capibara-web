export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig(event)
    const body = await readBody(event)

    if (!config.webcybert) {
        throw createError({
            statusCode: 500,
            message: 'Configuración de notificación no encontrada.',
        })
    }

    try {
        await $fetch(config.webcybert as string, {
            method: 'POST',
            body,
        })
        return { success: true }
    } catch (error) {
        console.error('Error forwarding notification:', error)
        return { success: false }
    }
})
