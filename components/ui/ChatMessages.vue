<template>
  <div ref="messagesContainer" class="messages-container">
    <div v-if="messages.length === 0" class="empty-state">
      <div class="empty-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-16 h-16"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
          />
        </svg>
      </div>
      <h3 class="empty-title">Commencez une conversation</h3>
      <p class="empty-description">
        Posez-moi des questions sur les pharmacies, les médicaments, ou demandez de l'aide pour trouver ce dont vous avez besoin.
      </p>
    </div>

    <div v-else class="messages-list">
      <div
        v-for="(message, index) in messages"
        :key="index"
        :class="['message-item', message.role === 'user' ? 'user-message' : 'assistant-message']"
      >
        <!-- Avatar -->
        <div class="message-avatar">
          <div v-if="message.role === 'user'" class="user-avatar">
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
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
          </div>
          <div v-else class="assistant-avatar">
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
                d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
              />
            </svg>
          </div>
        </div>

        <!-- Message Content -->
        <div class="message-content-wrapper">
          <div class="message-bubble">
            <!-- Files Preview -->
            <div v-if="message.files && message.files.length > 0" class="message-files">
              <div
                v-for="(file, fileIndex) in message.files"
                :key="fileIndex"
                class="message-file-item"
              >
                <img
                  v-if="file.type?.startsWith('image/')"
                  :src="file.preview"
                  :alt="file.name"
                  class="message-image"
                />
                <div v-else class="message-file-info">
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
                      d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                    />
                  </svg>
                  <span>{{ file.name }}</span>
                </div>
              </div>
            </div>

            <!-- Message Text -->
            <div v-if="message.content" class="message-text" v-html="formatMessage(message.content)" />

            <!-- Loading Indicator -->
            <div v-if="message.isLoading" class="message-loading">
              <div class="loading-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>

          <!-- Timestamp -->
          <div class="message-timestamp">
            {{ formatTime(message.timestamp) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  files?: Array<{ name: string; type?: string; preview?: string }>
  isLoading?: boolean
}

const props = defineProps<{
  messages: Message[]
}>()

const messagesContainer = ref<HTMLDivElement | null>(null)

// Auto-scroll to bottom when new messages arrive
watch(
  () => props.messages.length,
  () => {
    nextTick(() => {
      if (messagesContainer.value) {
        messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
      }
    })
  }
)

const formatMessage = (content: string): string => {
  // Convert markdown-style formatting to HTML
  let formatted = content
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`(.*?)`/g, '<code>$1</code>')
    .replace(/\n/g, '<br>')

  return formatted
}

const formatTime = (date: Date): string => {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const minutes = Math.floor(diff / 60000)

  if (minutes < 1) return 'À l\'instant'
  if (minutes < 60) return `Il y a ${minutes} min`

  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `Il y a ${hours}h`

  return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })
}
</script>

<style scoped>
.messages-container {
  @apply flex-1 overflow-y-auto px-4 py-6;
  scrollbar-width: thin;
  scrollbar-color: theme('colors.beige.300') transparent;
}

.messages-container::-webkit-scrollbar {
  @apply w-2;
}

.messages-container::-webkit-scrollbar-thumb {
  @apply bg-beige-300 dark:bg-beige-600 rounded-full;
}

.messages-container::-webkit-scrollbar-track {
  @apply bg-transparent;
}

/* Empty State */
.empty-state {
  @apply flex flex-col items-center justify-center h-full text-center px-6;
}

.empty-icon {
  @apply text-nature-400 dark:text-nature-600 mb-4;
}

.empty-title {
  @apply text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2;
}

.empty-description {
  @apply text-gray-600 dark:text-gray-400 max-w-md;
}

/* Messages List */
.messages-list {
  @apply space-y-6;
}

.message-item {
  @apply flex gap-3 animate-fade-in;
}

.user-message {
  @apply flex-row-reverse;
}

.assistant-message {
  @apply flex-row;
}

/* Avatars */
.message-avatar {
  @apply flex-shrink-0;
}

.user-avatar {
  @apply w-10 h-10 rounded-full bg-nature-100 dark:bg-nature-900/50 text-nature-700 dark:text-nature-300 flex items-center justify-center;
}

.assistant-avatar {
  @apply w-10 h-10 rounded-full bg-gradient-to-br from-nature-500 to-nature-600 text-white flex items-center justify-center shadow-lg shadow-nature-600/30;
}

/* Message Content */
.message-content-wrapper {
  @apply flex flex-col gap-1 max-w-[70%];
}

.user-message .message-content-wrapper {
  @apply items-end;
}

.assistant-message .message-content-wrapper {
  @apply items-start;
}

.message-bubble {
  @apply rounded-2xl px-4 py-3 shadow-md transition-all duration-300 hover:shadow-lg;
}

.user-message .message-bubble {
  @apply bg-nature-600 text-white rounded-tr-sm;
}

.assistant-message .message-bubble {
  @apply bg-white dark:bg-beige-800 text-gray-900 dark:text-gray-100 border border-beige-200 dark:border-beige-600 rounded-tl-sm;
}

/* Message Files */
.message-files {
  @apply flex flex-wrap gap-2 mb-2;
}

.message-file-item {
  @apply rounded-lg overflow-hidden;
}

.message-image {
  @apply max-w-xs rounded-lg;
}

.message-file-info {
  @apply flex items-center gap-2 px-3 py-2 bg-white/10 rounded-lg text-sm;
}

.assistant-message .message-file-info {
  @apply bg-beige-50 dark:bg-beige-700;
}

/* Message Text */
.message-text {
  @apply text-base leading-relaxed whitespace-pre-wrap break-words;
}

.message-text :deep(strong) {
  @apply font-semibold;
}

.message-text :deep(em) {
  @apply italic;
}

.message-text :deep(code) {
  @apply px-1.5 py-0.5 rounded text-sm font-mono;
}

.user-message .message-text :deep(code) {
  @apply bg-white/20;
}

.assistant-message .message-text :deep(code) {
  @apply bg-beige-100 dark:bg-beige-700 text-nature-700 dark:text-nature-300;
}

/* Loading Indicator */
.message-loading {
  @apply flex items-center;
}

.loading-dots {
  @apply flex gap-1;
}

.loading-dots span {
  @apply w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce;
}

.loading-dots span:nth-child(2) {
  animation-delay: 0.1s;
}

.loading-dots span:nth-child(3) {
  animation-delay: 0.2s;
}

/* Timestamp */
.message-timestamp {
  @apply text-xs text-gray-500 dark:text-gray-400 px-2;
}

/* Animation */
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}
</style>
