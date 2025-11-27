/**
 * Server-side API endpoint to securely call n8n webhook
 * The n8n URL is kept private on the server and not exposed to clients
 *
 * Usage from frontend:
 * await $fetch('/api/webhook', { method: 'POST', body: { data } })
 */
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)

  // The n8nWebhookUrl is only available server-side
  const webhookUrl = config.n8nWebhookUrl

  if (!webhookUrl) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Webhook URL not configured'
    })
  }

  try {
    // Call the n8n webhook from the server
    const response = await $fetch(webhookUrl, {
      method: 'POST',
      body: body
    })

    return {
      success: true,
      data: response
    }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to call webhook',
      data: error.message
    })
  }
})
