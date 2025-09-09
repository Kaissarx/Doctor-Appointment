<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 pt-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 class="text-4xl font-bold text-center text-gray-800 dark:text-white mb-8">
        My Appointments
      </h1>

      <!-- Loading State -->
      <div v-if="isLoading" class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
        <div
          class="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <svg
            class="h-8 w-8 text-indigo-600 animate-spin"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </div>
        <h2 class="text-xl font-semibold text-gray-800 dark:text-white mb-2">
          Loading Appointments...
        </h2>
        <p class="text-gray-600 dark:text-gray-300">
          Please wait while we fetch your appointments.
        </p>
      </div>

      <!-- Error State -->
      <div
        v-else-if="error"
        class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-8 text-center"
      >
        <div
          class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <svg class="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h2 class="text-xl font-semibold text-red-800 dark:text-red-400 mb-2">
          Error Loading Appointments
        </h2>
        <p class="text-red-600 dark:text-red-400 mb-4">{{ error }}</p>
        <button
          @click="appointmentsStore.loadAppointments()"
          class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Try Again
        </button>
      </div>

      <!-- No Appointments State -->
      <div
        v-else-if="appointments.length === 0"
        class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center"
      >
        <div
          class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <svg class="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
        <h2 class="text-xl font-semibold text-gray-800 dark:text-white mb-2">
          No Appointments Yet
        </h2>
        <p class="text-gray-600 dark:text-gray-300 mb-6">
          You haven't booked any appointments yet. Start by finding a doctor!
        </p>
        <router-link
          to="/doctors"
          class="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          Find Doctors
        </router-link>
      </div>

      <!-- Appointments List -->
      <div v-else class="space-y-6">
        <!-- Reminder Settings -->
        <ReminderSettings />
        <div
          v-for="appointment in appointments"
          :key="appointment.id"
          class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
        >
          <div class="flex flex-col md:flex-row md:items-center md:justify-between">
            <div class="flex-1">
              <div class="flex items-center mb-4">
                <div class="w-16 h-16 mr-4">
                  <img
                    v-if="appointment.doctorPhoto"
                    :src="appointment.doctorPhoto"
                    :alt="`Photo of ${appointment.doctorName}`"
                    class="w-16 h-16 rounded-full object-cover border-2 border-indigo-500"
                  />
                  <div
                    v-else
                    class="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center border-2 border-indigo-500"
                  >
                    <svg
                      class="h-8 w-8 text-indigo-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-gray-800 dark:text-white">
                    {{ appointment.doctorName }}
                  </h3>
                  <p class="text-sm text-indigo-600 dark:text-indigo-400">
                    {{ appointment.doctorSpecialty }}
                  </p>
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span class="font-medium text-gray-700 dark:text-gray-300">Date:</span>
                  <p class="text-gray-600 dark:text-gray-400">{{ formatDate(appointment.date) }}</p>
                </div>
                <div>
                  <span class="font-medium text-gray-700 dark:text-gray-300">Time:</span>
                  <p class="text-gray-600 dark:text-gray-400">{{ appointment.time }}</p>
                </div>
                <div>
                  <span class="font-medium text-gray-700 dark:text-gray-300">Patient:</span>
                  <p class="text-gray-600 dark:text-gray-400">{{ appointment.patientName }}</p>
                </div>
              </div>

              <div v-if="appointment.reason" class="mt-4">
                <span class="font-medium text-gray-700 dark:text-gray-300">Reason:</span>
                <p class="text-gray-600 dark:text-gray-400">{{ appointment.reason }}</p>
              </div>
            </div>

            <div class="flex flex-col sm:flex-row gap-2 mt-4 md:mt-0 md:ml-6">
              <span
                class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
                :class="getStatusClass(appointment.status)"
              >
                {{ appointment.status }}
              </span>
              <button
                v-if="appointment.status === 'confirmed'"
                @click="cancelAppointment(appointment.id)"
                class="px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 border border-red-300 dark:border-red-600 bg-white dark:bg-gray-700 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useAppointmentsStore } from '@/stores/appointments.js'
import ReminderSettings from '@/components/ReminderSettings.vue'

const appointmentsStore = useAppointmentsStore()

// Use computed properties from the store
const appointments = computed(() => appointmentsStore.allAppointments)
const isLoading = computed(() => appointmentsStore.isLoading)
const error = computed(() => appointmentsStore.error)

onMounted(() => {
  appointmentsStore.loadAppointments()
})

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const getStatusClass = (status) => {
  switch (status) {
    case 'confirmed':
      return 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400'
    case 'cancelled':
      return 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400'
    case 'completed':
      return 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400'
    default:
      return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
  }
}

const cancelAppointment = async (appointmentId) => {
  if (confirm('Are you sure you want to cancel this appointment?')) {
    try {
      await appointmentsStore.cancelAppointment(appointmentId)
    } catch (error) {
      console.error('Error cancelling appointment:', error)
      alert('Failed to cancel appointment. Please try again.')
    }
  }
}
</script>

<style scoped>
/* Styles for appointments page */
</style>
