// AI Assistant Composable for n8n Integration
import { ref } from 'vue'

export const useAIAssistant = () => {
  const { askAIAssistant } = useApi()
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const response = ref<any>(null)

  const ask = async (message: string, context?: any) => {
    isLoading.value = true
    error.value = null
    response.value = null

    try {
      const result = await askAIAssistant(message, context)
      response.value = result
      return result
    } catch (err: any) {
      error.value = err.message || 'Failed to get AI response'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const reset = () => {
    isLoading.value = false
    error.value = null
    response.value = null
  }

  return {
    ask,
    reset,
    isLoading,
    error,
    response
  }
}
