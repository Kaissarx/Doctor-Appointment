import { ref } from 'vue'

// Global error state
const globalError = ref(null)
const isLoading = ref(false)

// Error types
export const ERROR_TYPES = {
  NETWORK: 'NETWORK_ERROR',
  VALIDATION: 'VALIDATION_ERROR',
  API: 'API_ERROR',
  UNKNOWN: 'UNKNOWN_ERROR',
}

// Error handling composable
export function useErrorHandling() {
  const setError = (error, type = ERROR_TYPES.UNKNOWN) => {
    globalError.value = {
      message: error.message || error,
      type,
      timestamp: new Date().toISOString(),
    }
  }

  const clearError = () => {
    globalError.value = null
  }

  const setLoading = (loading) => {
    isLoading.value = loading
  }

  const handleAsyncOperation = async (operation, errorMessage = 'An error occurred') => {
    try {
      setLoading(true)
      clearError()
      const result = await operation()
      return result
    } catch (error) {
      console.error('Async operation failed:', error)
      setError(errorMessage, ERROR_TYPES.API)
      throw error
    } finally {
      setLoading(false)
    }
  }

  return {
    globalError,
    isLoading,
    setError,
    clearError,
    setLoading,
    handleAsyncOperation,
    ERROR_TYPES,
  }
}

// Toast notification system
const toasts = ref([])

export function useToast() {
  const addToast = (message, type = 'info', duration = 5000) => {
    const id = Date.now() + Math.random()
    const toast = {
      id,
      message,
      type, // 'success', 'error', 'warning', 'info'
      duration,
    }

    toasts.value.push(toast)

    // Auto remove toast after duration
    setTimeout(() => {
      removeToast(id)
    }, duration)

    return id
  }

  const removeToast = (id) => {
    const index = toasts.value.findIndex((toast) => toast.id === id)
    if (index > -1) {
      toasts.value.splice(index, 1)
    }
  }

  const clearAllToasts = () => {
    toasts.value = []
  }

  // Convenience methods
  const success = (message, duration) => addToast(message, 'success', duration)
  const error = (message, duration) => addToast(message, 'error', duration)
  const warning = (message, duration) => addToast(message, 'warning', duration)
  const info = (message, duration) => addToast(message, 'info', duration)

  return {
    toasts,
    addToast,
    removeToast,
    clearAllToasts,
    success,
    error,
    warning,
    info,
  }
}
