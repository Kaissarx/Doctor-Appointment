<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
    <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-4">Appointment Reminders</h3>

    <div class="space-y-4">
      <!-- Reminder Status -->
      <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <div>
          <p class="text-sm font-medium text-gray-700 dark:text-gray-300">Reminder Status</p>
          <p class="text-xs text-gray-500 dark:text-gray-400">
            {{ reminderStatus.isChecking ? 'Active' : 'Inactive' }}
          </p>
        </div>
        <div class="flex items-center space-x-2">
          <div
            class="w-3 h-3 rounded-full"
            :class="reminderStatus.isChecking ? 'bg-green-500' : 'bg-gray-400'"
          ></div>
          <span class="text-sm text-gray-600 dark:text-gray-400">
            {{ reminderStatus.activeReminders }} reminders
          </span>
        </div>
      </div>

      <!-- Reminder Intervals -->
      <div>
        <p class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Reminder Intervals</p>
        <div class="grid grid-cols-2 gap-2">
          <div
            v-for="(minutes, intervalName) in REMINDER_INTERVALS"
            :key="intervalName"
            class="flex items-center space-x-2 p-2 bg-gray-50 dark:bg-gray-700 rounded"
          >
            <div class="w-2 h-2 bg-indigo-500 rounded-full"></div>
            <span class="text-sm text-gray-600 dark:text-gray-400">
              {{ formatInterval(minutes) }}
            </span>
          </div>
        </div>
      </div>

      <!-- Controls -->
      <div class="flex space-x-3 pt-4 border-t border-gray-200 dark:border-gray-600">
        <button
          @click="toggleReminders"
          :class="[
            'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
            reminderStatus.isChecking
              ? 'bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/20 dark:text-red-400'
              : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200 dark:bg-indigo-900/20 dark:text-indigo-400',
          ]"
        >
          {{ reminderStatus.isChecking ? 'Stop Reminders' : 'Start Reminders' }}
        </button>

        <button
          @click="handleClearAll"
          class="px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 rounded-lg text-sm font-medium transition-colors"
        >
          Clear All
        </button>

        <button
          @click="testReminder"
          class="px-4 py-2 bg-yellow-100 text-yellow-700 hover:bg-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:hover:bg-yellow-900/30 rounded-lg text-sm font-medium transition-colors"
        >
          Test Reminder
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, watch } from 'vue'
import { useAppointmentReminders } from '@/composables/useAppointmentReminders'
import { useAppointmentsStore } from '@/stores/appointments'

const appointmentsStore = useAppointmentsStore()
const {
  startReminderChecking,
  stopReminderChecking,
  clearAllReminders,
  getReminderStatus,
  testReminder,
  REMINDER_INTERVALS,
} = useAppointmentReminders()

const reminderStatus = computed(() => getReminderStatus())

const formatInterval = (minutes) => {
  if (minutes >= 60) {
    const hours = Math.floor(minutes / 60)
    return `${hours}h before`
  }
  return `${minutes}m before`
}

const toggleReminders = () => {
  console.log('Toggle reminders clicked, current status:', reminderStatus.value)
  console.log('Current appointments:', appointmentsStore.allAppointments)

  if (reminderStatus.value.isChecking) {
    console.log('Stopping reminders...')
    stopReminderChecking()
  } else {
    console.log('Starting reminders...')
    startReminderChecking(appointmentsStore.allAppointments)
  }
}

const handleClearAll = () => {
  console.log('Clear all reminders clicked')
  clearAllReminders()
}

// Watch for appointment changes and restart reminders if active
watch(
  () => appointmentsStore.allAppointments,
  (newAppointments) => {
    if (reminderStatus.value.isChecking) {
      console.log('Appointments changed, restarting reminders')
      stopReminderChecking()
      startReminderChecking(newAppointments)
    }
  },
  { deep: true },
)
</script>

<style scoped>
/* Additional styles if needed */
</style>
