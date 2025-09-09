<template>
  <div v-if="hasError" class="min-h-screen bg-gray-100 flex items-center justify-center px-4">
    <div class="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
      <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg class="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
          />
        </svg>
      </div>

      <h2 class="text-xl font-semibold text-gray-800 mb-2">Something went wrong</h2>
      <p class="text-gray-600 mb-6">
        {{ errorMessage || 'An unexpected error occurred. Please try refreshing the page.' }}
      </p>

      <div class="space-y-3">
        <button
          @click="retry"
          class="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
        >
          Try Again
        </button>
        <button
          @click="goHome"
          class="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
        >
          Go to Home
        </button>
      </div>
    </div>
  </div>

  <slot v-else />
</template>

<script setup>
import { ref, onErrorCaptured } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const hasError = ref(false)
const errorMessage = ref('')

onErrorCaptured((error) => {
  console.error('Error caught by boundary:', error)
  hasError.value = true
  errorMessage.value = error.message || 'An unexpected error occurred'
  return false // Prevent the error from propagating further
})

const retry = () => {
  hasError.value = false
  errorMessage.value = ''
  // Force component re-render
  window.location.reload()
}

const goHome = () => {
  router.push('/')
}
</script>

<style scoped>
/* Error boundary styles */
</style>
