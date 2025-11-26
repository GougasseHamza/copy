<template>
  <div class="chat-input-container">
    <!-- File Preview -->
    <div v-if="selectedFiles.length > 0" class="file-preview-container">
      <div class="file-preview-grid">
        <div
          v-for="(file, index) in selectedFiles"
          :key="index"
          class="file-preview-item"
        >
          <div v-if="file.type.startsWith('image/')" class="image-preview">
            <img :src="file.preview" :alt="file.name" />
          </div>
          <div v-else class="file-icon">
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
                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
              />
            </svg>
          </div>
          <div class="file-info">
            <p class="file-name">{{ file.name }}</p>
            <p class="file-size">{{ formatFileSize(file.size) }}</p>
          </div>
          <button
            @click="removeFile(index)"
            class="remove-file-btn"
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              class="w-5 h-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Input Area -->
    <div class="input-wrapper">
      <!-- File Upload Button -->
      <label for="file-upload" class="file-upload-label">
        <input
          id="file-upload"
          ref="fileInput"
          type="file"
          multiple
          accept="image/*,.pdf,.doc,.docx,.txt"
          @change="handleFileSelect"
          class="hidden"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"
          />
        </svg>
      </label>

      <!-- Text Input -->
      <textarea
        ref="textareaRef"
        v-model="message"
        :placeholder="placeholder"
        @keydown.enter.exact.prevent="handleSubmit"
        @input="adjustTextareaHeight"
        class="message-input"
        rows="1"
      />

      <!-- Send Button -->
      <button
        @click="handleSubmit"
        :disabled="!canSend || isLoading"
        class="send-btn"
        type="button"
      >
        <svg
          v-if="!isLoading"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          class="w-5 h-5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
          />
        </svg>
        <svg
          v-else
          class="animate-spin w-5 h-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  placeholder?: string
  isLoading?: boolean
}>()

const emit = defineEmits<{
  submit: [{ message: string; files: File[] }]
}>()

const message = ref('')
const selectedFiles = ref<Array<File & { preview?: string }>>([])
const textareaRef = ref<HTMLTextAreaElement | null>(null)
const fileInput = ref<HTMLInputElement | null>(null)

const canSend = computed(() => {
  return (message.value.trim().length > 0 || selectedFiles.value.length > 0) && !props.isLoading
})

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  const files = Array.from(target.files || [])

  files.forEach((file) => {
    const fileWithPreview = file as File & { preview?: string }

    if (file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        fileWithPreview.preview = e.target?.result as string
        selectedFiles.value.push(fileWithPreview)
      }
      reader.readAsDataURL(file)
    } else {
      selectedFiles.value.push(fileWithPreview)
    }
  })

  // Reset input
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

const removeFile = (index: number) => {
  selectedFiles.value.splice(index, 1)
}

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
}

const adjustTextareaHeight = () => {
  const textarea = textareaRef.value
  if (!textarea) return

  textarea.style.height = 'auto'
  textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px'
}

const handleSubmit = () => {
  if (!canSend.value) return

  emit('submit', {
    message: message.value.trim(),
    files: [...selectedFiles.value]
  })

  // Reset
  message.value = ''
  selectedFiles.value = []
  if (textareaRef.value) {
    textareaRef.value.style.height = 'auto'
  }
}
</script>

<style scoped>
.chat-input-container {
  @apply w-full;
}

.file-preview-container {
  @apply mb-3 p-3 bg-beige-50 dark:bg-beige-900/20 rounded-xl border border-beige-200 dark:border-beige-700;
}

.file-preview-grid {
  @apply flex flex-wrap gap-2;
}

.file-preview-item {
  @apply relative flex items-center gap-2 p-2 bg-white dark:bg-beige-800 rounded-lg border border-beige-200 dark:border-beige-600 transition-all hover:shadow-md;
}

.image-preview {
  @apply w-12 h-12 rounded overflow-hidden flex-shrink-0;
}

.image-preview img {
  @apply w-full h-full object-cover;
}

.file-icon {
  @apply w-12 h-12 flex items-center justify-center bg-nature-50 dark:bg-nature-900/30 text-nature-600 dark:text-nature-400 rounded flex-shrink-0;
}

.file-info {
  @apply flex-1 min-w-0;
}

.file-name {
  @apply text-sm font-medium text-gray-900 dark:text-gray-100 truncate;
}

.file-size {
  @apply text-xs text-gray-500 dark:text-gray-400;
}

.remove-file-btn {
  @apply p-1 text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors rounded-full hover:bg-red-50 dark:hover:bg-red-900/20;
}

.input-wrapper {
  @apply relative flex items-end gap-2 p-3 bg-white dark:bg-beige-800 rounded-2xl border-2 border-beige-200 dark:border-beige-600 shadow-lg shadow-nature-600/5 transition-all duration-300;
  @apply focus-within:border-nature-500 focus-within:shadow-xl focus-within:shadow-nature-600/10;
}

.file-upload-label {
  @apply flex-shrink-0 p-2 text-nature-600 dark:text-nature-400 hover:text-nature-700 dark:hover:text-nature-300 hover:bg-nature-50 dark:hover:bg-nature-900/30 rounded-xl transition-all cursor-pointer;
}

.message-input {
  @apply flex-1 bg-transparent border-none outline-none resize-none text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 text-base leading-relaxed;
  @apply max-h-[200px] overflow-y-auto;
  font-family: inherit;
}

.message-input::-webkit-scrollbar {
  @apply w-2;
}

.message-input::-webkit-scrollbar-thumb {
  @apply bg-beige-300 dark:bg-beige-600 rounded-full;
}

.send-btn {
  @apply flex-shrink-0 p-2.5 bg-nature-600 hover:bg-nature-700 disabled:bg-beige-300 dark:disabled:bg-beige-600 text-white rounded-xl transition-all duration-300 shadow-lg shadow-nature-600/30 hover:shadow-xl hover:shadow-nature-600/40 disabled:shadow-none disabled:cursor-not-allowed;
}
</style>
