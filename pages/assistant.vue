<template>
  <div class="assistant-page">
    <!-- Header -->
    <div class="header">
      <div class="header-content">
        <div class="header-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-8 h-8"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
            />
          </svg>
        </div>
        <div>
          <h1 class="header-title">Assistant IA PharmFinder</h1>
          <p class="header-subtitle">
            Posez vos questions sur les pharmacies et médicaments
          </p>
        </div>
      </div>

      <!-- Suggestions -->
      <div v-if="messages.length === 0" class="suggestions-container">
        <button
          v-for="(suggestion, index) in suggestions"
          :key="index"
          @click="sendSuggestion(suggestion)"
          class="suggestion-chip"
        >
          {{ suggestion }}
        </button>
      </div>
    </div>

    <!-- Chat Container -->
    <div class="chat-container">
      <ChatMessages :messages="messages" />
    </div>

    <!-- Input Area -->
    <div class="input-area">
      <div class="input-container">
        <ChatInput
          :is-loading="isLoading"
          placeholder="Posez votre question ici..."
          @submit="handleSendMessage"
        />
      </div>
    </div>

    <!-- Error Toast -->
    <Transition name="toast">
      <div v-if="error" class="error-toast">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-5 h-5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
          />
        </svg>
        <span>{{ error }}</span>
        <button @click="error = null" class="error-close">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            class="w-4 h-4"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import ChatInput from '~/components/ui/ChatInput.vue'
import ChatMessages from '~/components/ui/ChatMessages.vue'

useHead({
  title: 'Assistant IA - PharmFinder',
  meta: [
    {
      name: 'description',
      content: 'Assistant intelligent pour vous aider à trouver des pharmacies et des informations sur les médicaments'
    }
  ]
})

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  files?: Array<{ name: string; type?: string; preview?: string }>
  isLoading?: boolean
}

const api = useApi()
const messages = ref<Message[]>([])
const isLoading = ref(false)
const error = ref<string | null>(null)

const suggestions = [
  'Quelles pharmacies sont ouvertes maintenant ?',
  'Où trouver une pharmacie de garde à Rabat ?',
  'Comment vérifier la disponibilité d\'un médicament ?',
  'Quelles sont les pharmacies les mieux notées ?'
]

const sendSuggestion = (suggestion: string) => {
  handleSendMessage({ message: suggestion, files: [] })
}

const handleSendMessage = async ({ message, files }: { message: string; files: File[] }) => {
  if (!message.trim() && files.length === 0) return

  // Add user message
  const userMessage: Message = {
    role: 'user',
    content: message,
    timestamp: new Date(),
    files: files.map(f => ({
      name: f.name,
      type: f.type,
      preview: (f as any).preview
    }))
  }
  messages.value.push(userMessage)

  // Add loading message
  const loadingMessage: Message = {
    role: 'assistant',
    content: '',
    timestamp: new Date(),
    isLoading: true
  }
  messages.value.push(loadingMessage)

  isLoading.value = true
  error.value = null

  try {
    // Prepare context with recent messages
    const context = {
      conversationHistory: messages.value
        .filter(m => !m.isLoading)
        .slice(-5)
        .map(m => ({
          role: m.role,
          content: m.content
        })),
      files: files.length > 0 ? files.map(f => ({ name: f.name, type: f.type })) : undefined
    }

    // Call n8n webhook via API composable
    const response = await api.askAIAssistant(message, context)

    // Remove loading message
    messages.value.pop()

    // Add assistant response
    const assistantMessage: Message = {
      role: 'assistant',
      content: response.message || response.response || 'Désolé, je n\'ai pas pu générer une réponse.',
      timestamp: new Date()
    }
    messages.value.push(assistantMessage)
  } catch (err: any) {
    console.error('Error calling AI assistant:', err)

    // Remove loading message
    messages.value.pop()

    // Show error
    error.value = err.message || 'Erreur lors de la communication avec l\'assistant. Veuillez réessayer.'

    // Add error message to chat
    const errorMessage: Message = {
      role: 'assistant',
      content: 'Désolé, une erreur s\'est produite. Veuillez vérifier votre connexion et réessayer.',
      timestamp: new Date()
    }
    messages.value.push(errorMessage)

    // Auto-hide error after 5 seconds
    setTimeout(() => {
      error.value = null
    }, 5000)
  } finally {
    isLoading.value = false
  }
}

// Save conversation to localStorage
watch(
  messages,
  (newMessages) => {
    if (process.client && newMessages.length > 0) {
      try {
        localStorage.setItem('pharmfinder-ai-chat', JSON.stringify(newMessages.slice(-20)))
      } catch (e) {
        console.error('Failed to save chat history:', e)
      }
    }
  },
  { deep: true }
)

// Load conversation from localStorage on mount
onMounted(() => {
  if (process.client) {
    try {
      const saved = localStorage.getItem('pharmfinder-ai-chat')
      if (saved) {
        const parsed = JSON.parse(saved)
        messages.value = parsed.map((m: any) => ({
          ...m,
          timestamp: new Date(m.timestamp)
        }))
      }
    } catch (e) {
      console.error('Failed to load chat history:', e)
    }
  }
})
</script>

<style scoped>
.assistant-page {
  @apply min-h-screen flex flex-col bg-gradient-to-br from-beige-50 via-white to-nature-50 dark:from-beige-950 dark:via-beige-900 dark:to-nature-950;
}

/* Header */
.header {
  @apply border-b border-beige-200 dark:border-beige-700 bg-white/80 dark:bg-beige-900/80 backdrop-blur-lg;
}

.header-content {
  @apply flex items-center gap-4 px-6 py-4;
}

.header-icon {
  @apply w-14 h-14 rounded-2xl bg-gradient-to-br from-nature-500 to-nature-600 text-white flex items-center justify-center shadow-lg shadow-nature-600/30;
}

.header-title {
  @apply text-2xl font-bold bg-gradient-to-r from-nature-700 to-nature-500 bg-clip-text text-transparent;
}

.header-subtitle {
  @apply text-sm text-gray-600 dark:text-gray-400;
}

.suggestions-container {
  @apply flex flex-wrap gap-2 px-6 pb-4;
}

.suggestion-chip {
  @apply px-4 py-2 bg-white dark:bg-beige-800 border border-beige-200 dark:border-beige-600 rounded-full text-sm text-gray-700 dark:text-gray-300 hover:bg-nature-50 dark:hover:bg-nature-900/30 hover:border-nature-400 dark:hover:border-nature-600 transition-all duration-300 shadow-sm hover:shadow-md;
}

/* Chat Container */
.chat-container {
  @apply flex-1 overflow-hidden max-w-5xl w-full mx-auto;
}

/* Input Area */
.input-area {
  @apply border-t border-beige-200 dark:border-beige-700 bg-white/80 dark:bg-beige-900/80 backdrop-blur-lg;
}

.input-container {
  @apply max-w-4xl w-full mx-auto px-6 py-4;
}

/* Error Toast */
.error-toast {
  @apply fixed bottom-6 right-6 flex items-center gap-3 px-5 py-3 bg-red-500 text-white rounded-xl shadow-2xl shadow-red-500/30 z-50;
}

.error-close {
  @apply p-1 hover:bg-white/20 rounded-lg transition-colors;
}

/* Toast Transitions */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
