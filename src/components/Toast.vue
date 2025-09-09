<template>
  <div class="fixed top-4 right-8 z-50 space-y-2">
    <TransitionGroup name="toast" tag="div">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        :class="[
          'w-fit min-w-80 max-w-2xl bg-white dark:bg-gray-800 shadow-lg rounded-lg pointer-events-auto ring-1 ring-black dark:ring-gray-600 ring-opacity-5 overflow-hidden',
          getToastClasses(toast.type),
        ]"
      >
        <div class="p-6">
          <div class="flex items-start">
            <div class="flex-shrink-0">
              <component :is="getToastIcon(toast.type)" :class="getIconClasses(toast.type)" />
            </div>
            <div class="ml-4 w-0 flex-1 pt-1">
              <p class="text-base font-medium text-gray-900 dark:text-white">
                {{ toast.message }}
              </p>
            </div>
            <div class="ml-6 flex-shrink-0 flex">
              <button
                @click="removeToast(toast.id)"
                class="bg-white dark:bg-gray-700 rounded-md inline-flex text-gray-400 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span class="sr-only">Close</span>
                <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
import { useToast } from '@/composables/useErrorHandling'

const { toasts, removeToast } = useToast()

const getToastClasses = (type) => {
  const classes = {
    success: 'border-l-4 border-green-500 dark:border-green-400',
    error: 'border-l-4 border-red-500 dark:border-red-400',
    warning: 'border-l-4 border-yellow-500 dark:border-yellow-400',
    info: 'border-l-4 border-blue-500 dark:border-blue-400',
  }
  return classes[type] || classes.info
}

const getIconClasses = (type) => {
  const classes = {
    success: 'h-6 w-6 text-green-500 dark:text-green-400',
    error: 'h-6 w-6 text-red-500 dark:text-red-400',
    warning: 'h-6 w-6 text-yellow-500 dark:text-yellow-400',
    info: 'h-6 w-6 text-blue-500 dark:text-blue-400',
  }
  return classes[type] || classes.info
}

const getToastIcon = (type) => {
  const icons = {
    success: 'CheckCircleIcon',
    error: 'XCircleIcon',
    warning: 'ExclamationTriangleIcon',
    info: 'InformationCircleIcon',
  }

  const iconName = icons[type] || icons.info

  // Return SVG components based on type
  if (iconName === 'CheckCircleIcon') {
    return {
      template: `
        <svg class="h-6 w-6 text-green-500 dark:text-green-400" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
        </svg>
      `,
    }
  } else if (iconName === 'XCircleIcon') {
    return {
      template: `
        <svg class="h-6 w-6 text-red-500 dark:text-red-400" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
        </svg>
      `,
    }
  } else if (iconName === 'ExclamationTriangleIcon') {
    return {
      template: `
        <svg class="h-6 w-6 text-yellow-500 dark:text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
        </svg>
      `,
    }
  } else {
    return {
      template: `
        <svg class="h-6 w-6 text-blue-500 dark:text-blue-400" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
        </svg>
      `,
    }
  }
}
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.toast-move {
  transition: transform 0.3s ease;
}
</style>
