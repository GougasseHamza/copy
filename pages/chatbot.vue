<template>
  <NuxtLayout name="default">
    <div class="min-h-screen bg-gradient-to-br from-beige-50 via-white to-nature-50 dark:from-beige-950 dark:via-beige-900 dark:to-nature-950 py-8">
      <div class="container-custom">
        <!-- Header -->
        <div class="text-center mb-8">
          <h1 class="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-nature-600 via-earth-600 to-nature-700 bg-clip-text text-transparent">
            🤖 Assistant IA PharmFinder
          </h1>
          <p class="text-beige-600 dark:text-beige-300 text-lg">
            Posez vos questions sur les médicaments et pharmacies
          </p>
        </div>

        <!-- Chat Container -->
        <div class="max-w-4xl mx-auto bg-white dark:bg-beige-900/50 backdrop-blur-lg rounded-2xl border-2 border-beige-200 dark:border-beige-700 shadow-2xl overflow-hidden flex flex-col" style="height: calc(100vh - 300px);">

          <!-- Messages Area -->
          <div ref="messagesContainer" class="flex-1 overflow-y-auto p-6 space-y-4">
            <!-- Welcome Message -->
            <div v-if="messages.length === 0" class="text-center py-12">
              <div class="inline-block p-6 bg-gradient-to-br from-nature-100 to-earth-100 dark:from-nature-900/30 dark:to-earth-900/30 rounded-2xl mb-4">
                <svg class="h-16 w-16 mx-auto text-nature-600 dark:text-nature-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-beige-900 dark:text-beige-50 mb-2">
                Bienvenue sur votre assistant IA
              </h3>
              <p class="text-beige-600 dark:text-beige-300 mb-6">
                Commencez une conversation en posant une question
              </p>

              <!-- Suggested Questions -->
              <div class="max-w-md mx-auto space-y-2">
                <p class="text-sm text-beige-500 dark:text-beige-400 font-medium mb-3">Suggestions :</p>
                <button
                  v-for="suggestion in suggestions"
                  :key="suggestion"
                  @click="sendMessage(suggestion)"
                  class="block w-full text-left px-4 py-3 bg-beige-50 dark:bg-beige-800/50 hover:bg-nature-100 dark:hover:bg-nature-900/30 rounded-xl border border-beige-200 dark:border-beige-700 transition-all duration-300 text-beige-700 dark:text-beige-200 hover:border-nature-400"
                >
                  {{ suggestion }}
                </button>
              </div>
            </div>

            <!-- Messages -->
            <div
              v-for="(message, index) in messages"
              :key="index"
              :class="[
                'flex',
                message.role === 'user' ? 'justify-end' : 'justify-start'
              ]"
            >
              <div
                :class="[
                  'max-w-[80%] rounded-2xl px-5 py-3 shadow-md',
                  message.role === 'user'
                    ? 'bg-gradient-to-r from-nature-600 to-nature-700 text-white'
                    : 'bg-beige-100 dark:bg-beige-800 text-beige-900 dark:text-beige-50 border border-beige-200 dark:border-beige-700'
                ]"
              >
                <div class="flex items-start gap-3">
                  <div class="flex-shrink-0 mt-1">
                    <div
                      :class="[
                        'w-8 h-8 rounded-full flex items-center justify-center text-sm',
                        message.role === 'user'
                          ? 'bg-white/20'
                          : 'bg-nature-500 text-white'
                      ]"
                    >
                      {{ message.role === 'user' ? '👤' : '🤖' }}
                    </div>
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium mb-1 opacity-75">
                      {{ message.role === 'user' ? 'Vous' : 'Assistant IA' }}
                    </p>
                    <p class="whitespace-pre-wrap break-words">{{ message.content }}</p>
                    <p class="text-xs opacity-60 mt-2">
                      {{ formatTime(message.timestamp) }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Loading Indicator -->
            <div v-if="isLoading" class="flex justify-start">
              <div class="max-w-[80%] rounded-2xl px-5 py-3 bg-beige-100 dark:bg-beige-800 border border-beige-200 dark:border-beige-700">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-full bg-nature-500 flex items-center justify-center text-sm">
                    🤖
                  </div>
                  <div class="flex gap-1">
                    <div class="w-2 h-2 bg-nature-500 rounded-full animate-bounce"></div>
                    <div class="w-2 h-2 bg-nature-500 rounded-full animate-bounce" style="animation-delay: 0.2s;"></div>
                    <div class="w-2 h-2 bg-nature-500 rounded-full animate-bounce" style="animation-delay: 0.4s;"></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Error Message -->
            <div v-if="error" class="flex justify-center">
              <div class="bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-xl px-4 py-3 flex items-center gap-2 text-red-700 dark:text-red-300">
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>{{ error }}</span>
              </div>
            </div>
          </div>

          <!-- Input Area -->
          <div class="border-t-2 border-beige-200 dark:border-beige-700 bg-beige-50 dark:bg-beige-900/70 p-4">
            <form @submit.prevent="handleSubmit" class="flex gap-3">
              <input
                v-model="inputMessage"
                type="text"
                placeholder="Posez votre question..."
                :disabled="isLoading"
                class="flex-1 px-4 py-3 rounded-xl border-2 border-beige-200 dark:border-beige-700 bg-white dark:bg-beige-800 text-beige-900 dark:text-beige-50 placeholder-beige-400 focus:outline-none focus:border-nature-500 focus:ring-4 focus:ring-nature-500/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <button
                type="submit"
                :disabled="!inputMessage.trim() || isLoading"
                class="px-6 py-3 bg-gradient-to-r from-nature-600 to-nature-700 text-white rounded-xl font-semibold hover:from-nature-700 hover:to-nature-800 hover:shadow-lg hover:shadow-nature-600/30 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none flex items-center gap-2"
              >
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                </svg>
                Envoyer
              </button>
            </form>

            <!-- Quick Actions -->
            <div class="flex gap-2 mt-3">
              <button
                @click="clearChat"
                class="text-xs px-3 py-1.5 rounded-lg bg-beige-200 dark:bg-beige-800 text-beige-600 dark:text-beige-300 hover:bg-beige-300 dark:hover:bg-beige-700 transition-all"
              >
                🗑️ Effacer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

const inputMessage = ref('')
const messages = ref<Message[]>([])
const messagesContainer = ref<HTMLElement | null>(null)
const isLoading = ref(false)
const error = ref<string | null>(null)

const { ask } = useAIAssistant()

const suggestions = [
  "Où trouver du paracétamol près de moi ?",
  "Quelle pharmacie est ouverte maintenant ?",
  "Quels sont les médicaments pour la grippe ?",
  "Comment utiliser l'application ?"
]

const handleSubmit = async () => {
  if (!inputMessage.value.trim() || isLoading.value) return

  const userMessage = inputMessage.value.trim()
  inputMessage.value = ''
  error.value = null

  // Add user message
  messages.value.push({
    role: 'user',
    content: userMessage,
    timestamp: new Date()
  })

  // Scroll to bottom
  await nextTick()
  scrollToBottom()

  // Get AI response
  isLoading.value = true

  try {
    const response = await ask(userMessage)

    // Add AI response
    messages.value.push({
      role: 'assistant',
      content: response.data?.message || response.data?.response || 'Désolé, je n\'ai pas pu traiter votre demande.',
      timestamp: new Date()
    })
  } catch (err: any) {
    error.value = err.message || 'Erreur lors de la communication avec l\'assistant'

    // Add error message
    messages.value.push({
      role: 'assistant',
      content: 'Désolé, je rencontre des difficultés techniques. Veuillez réessayer dans quelques instants.',
      timestamp: new Date()
    })
  } finally {
    isLoading.value = false
    await nextTick()
    scrollToBottom()
  }
}

const sendMessage = async (message: string) => {
  inputMessage.value = message
  await handleSubmit()
}

const clearChat = () => {
  messages.value = []
  error.value = null
}

const scrollToBottom = () => {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

const formatTime = (date: Date) => {
  return new Intl.DateTimeFormat('fr-FR', {
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

useHead({
  title: 'Assistant IA - PharmFinder',
  meta: [
    { name: 'description', content: 'Posez vos questions sur les médicaments et pharmacies à notre assistant IA' }
  ]
})
</script>
