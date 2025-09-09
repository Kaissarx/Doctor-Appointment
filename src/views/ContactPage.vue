<template>
  <div class="pt-24 relative min-h-screen">
    <!-- Background Image with Dark Overlay -->
    <div
      class="absolute inset-0 bg-cover bg-center bg-no-repeat"
      :style="{ backgroundImage: `url(${geminiImage})` }"
    ></div>
    <div class="absolute inset-0 bg-black bg-opacity-50 dark:bg-opacity-70"></div>

    <!-- Content -->
    <div class="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1
        class="text-4xl font-bold text-center text-indigo-600 dark:text-white mb-8 drop-shadow-lg"
      >
        Contact Us
      </h1>

      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-8 backdrop-blur-sm">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Contact Form -->
          <div>
            <h2 class="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
              Send us a Message
            </h2>
            <form @submit.prevent="handleSubmit" class="space-y-4">
              <div>
                <label
                  for="name"
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >Name *</label
                >
                <input
                  v-model="contactForm.name"
                  type="text"
                  id="name"
                  required
                  :class="[
                    'w-full px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white',
                    formErrors.name
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 dark:border-gray-600 focus:ring-indigo-500',
                  ]"
                  placeholder="Your full name"
                  @blur="validateForm"
                />
                <p v-if="formErrors.name" class="mt-1 text-sm text-red-600 dark:text-red-400">
                  {{ formErrors.name }}
                </p>
              </div>

              <div>
                <label
                  for="email"
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >Email *</label
                >
                <input
                  v-model="contactForm.email"
                  type="email"
                  id="email"
                  required
                  :class="[
                    'w-full px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white',
                    formErrors.email
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 dark:border-gray-600 focus:ring-indigo-500',
                  ]"
                  placeholder="your.email@example.com"
                  @blur="validateForm"
                />
                <p v-if="formErrors.email" class="mt-1 text-sm text-red-600 dark:text-red-400">
                  {{ formErrors.email }}
                </p>
              </div>

              <div>
                <label
                  for="message"
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >Message *</label
                >
                <textarea
                  v-model="contactForm.message"
                  id="message"
                  rows="4"
                  required
                  :class="[
                    'w-full px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white',
                    formErrors.message
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 dark:border-gray-600 focus:ring-indigo-500',
                  ]"
                  placeholder="How can we help you?"
                  @blur="validateForm"
                ></textarea>
                <p v-if="formErrors.message" class="mt-1 text-sm text-red-600 dark:text-red-400">
                  {{ formErrors.message }}
                </p>
              </div>

              <button
                type="submit"
                :disabled="!isFormValid || isSubmitting"
                :class="[
                  'w-full py-2 px-4 rounded-lg font-semibold transition-colors',
                  isFormValid && !isSubmitting
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed',
                ]"
              >
                {{ isSubmitting ? 'Sending...' : 'Send Message' }}
              </button>
            </form>
          </div>

          <!-- Contact Information -->
          <div>
            <h2 class="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Get in Touch</h2>
            <div class="space-y-6">
              <div class="flex items-start space-x-3">
                <div
                  class="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0"
                >
                  <svg
                    class="h-4 w-4 text-indigo-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 class="font-semibold text-gray-800 dark:text-white">Phone</h3>
                  <p class="text-gray-600 dark:text-gray-300">+1 (555) 123-4567</p>
                </div>
              </div>

              <div class="flex items-start space-x-3">
                <div
                  class="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0"
                >
                  <svg
                    class="h-4 w-4 text-indigo-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 class="font-semibold text-gray-800 dark:text-white">Email</h3>
                  <p class="text-gray-600 dark:text-gray-300">support@sayheeeelp.com</p>
                </div>
              </div>

              <div class="flex items-start space-x-3">
                <div
                  class="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0"
                >
                  <svg
                    class="h-4 w-4 text-indigo-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 class="font-semibold text-gray-800 dark:text-white">Address</h3>
                  <p class="text-gray-600 dark:text-gray-300">
                    123 Medical Center Dr<br />Healthcare City, HC 12345
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useToast, useErrorHandling } from '@/composables/useErrorHandling'
import geminiImage from '@/assets/Gemini_Generated_Image_sg05u0sg05u0sg05.png'

// Contact form data
const contactForm = ref({
  name: '',
  email: '',
  message: '',
})

// Form validation errors
const formErrors = ref({
  name: '',
  email: '',
  message: '',
})

// Form validation state
const isFormValid = ref(false)
const isSubmitting = ref(false)

// Error handling and toast
const { handleAsyncOperation } = useErrorHandling()
const { success, error } = useToast()

// Validation function
const validateForm = () => {
  const errors = {
    name: '',
    email: '',
    message: '',
  }

  // Validate name
  if (!contactForm.value.name.trim()) {
    errors.name = 'Name is required'
  } else if (contactForm.value.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters'
  }

  // Validate email
  if (!contactForm.value.email.trim()) {
    errors.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactForm.value.email)) {
    errors.email = 'Please enter a valid email address'
  }

  // Validate message
  if (!contactForm.value.message.trim()) {
    errors.message = 'Message is required'
  } else if (contactForm.value.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters'
  }

  formErrors.value = errors
  isFormValid.value = Object.values(errors).every((error) => error === '')

  return isFormValid.value
}

// Handle form submission
const handleSubmit = async () => {
  if (!validateForm()) {
    return
  }

  try {
    await handleAsyncOperation(async () => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Show success message
      success("Message sent successfully! We'll get back to you soon.")

      // Reset form
      contactForm.value = {
        name: '',
        email: '',
        message: '',
      }
      formErrors.value = {
        name: '',
        email: '',
        message: '',
      }
      isFormValid.value = false
    }, 'Failed to send message. Please try again.')
  } catch (err) {
    // Error is already handled by handleAsyncOperation
    error('Failed to send message. Please try again.')
  }
}
</script>

<style scoped>
/* Styles for contact page */
</style>
