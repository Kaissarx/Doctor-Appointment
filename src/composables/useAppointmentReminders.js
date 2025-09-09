import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useToast } from './useErrorHandling'

// Reminder intervals (in minutes)
const REMINDER_INTERVALS = {
  ONE_HOUR: 60,
  THIRTY_MINUTES: 30,
  FIFTEEN_MINUTES: 15,
  FIVE_MINUTES: 5,
}

export function useAppointmentReminders() {
  const { info, warning } = useToast()

  // Active reminders - moved inside the function
  const activeReminders = ref(new Map())
  let reminderInterval = null

  // Check for upcoming appointments
  const checkUpcomingAppointments = (appointments) => {
    const now = new Date()
    const upcomingReminders = []

    appointments.forEach((appointment) => {
      if (appointment.status !== 'confirmed') return

      // Parse appointment date and time more carefully
      let appointmentDateTime
      try {
        // Handle different date formats
        if (typeof appointment.date === 'string') {
          // If date is in format "Saturday, September 13, 2025"
          if (appointment.date.includes(',')) {
            appointmentDateTime = new Date(appointment.date)
          } else {
            // If date is in ISO format or other format
            appointmentDateTime = new Date(`${appointment.date}T${appointment.time}`)
          }
        } else {
          appointmentDateTime = new Date(appointment.date)
        }

        // Validate the date
        if (isNaN(appointmentDateTime.getTime())) {
          console.warn('Invalid appointment date:', appointment.date, appointment.time)
          return
        }

        const timeUntilAppointment = appointmentDateTime.getTime() - now.getTime()
        const minutesUntilAppointment = Math.floor(timeUntilAppointment / (1000 * 60))

        console.log(
          `Appointment ${appointment.id}: ${minutesUntilAppointment} minutes until appointment`,
        )

        // Check if we should show a reminder
        Object.entries(REMINDER_INTERVALS).forEach(([intervalName, minutes]) => {
          const reminderKey = `${appointment.id}-${intervalName}`

          if (
            minutesUntilAppointment <= minutes &&
            minutesUntilAppointment > 0 &&
            !activeReminders.value.has(reminderKey)
          ) {
            console.log(
              `Creating reminder for appointment ${appointment.id} in ${minutesUntilAppointment} minutes`,
            )
            upcomingReminders.push({
              appointment,
              minutesUntilAppointment,
              intervalName,
              reminderKey,
            })
          }
        })
      } catch (error) {
        console.error('Error parsing appointment date:', error, appointment)
      }
    })

    return upcomingReminders
  }

  // Show reminder notification
  const showReminder = (reminder) => {
    const { appointment, minutesUntilAppointment, reminderKey } = reminder

    // Mark as shown
    activeReminders.value.set(reminderKey, true)

    // Format time message
    let timeMessage = ''
    if (minutesUntilAppointment >= 60) {
      const hours = Math.floor(minutesUntilAppointment / 60)
      const minutes = minutesUntilAppointment % 60
      timeMessage = `${hours}h ${minutes}m`
    } else {
      timeMessage = `${minutesUntilAppointment}m`
    }

    // Show appropriate notification
    if (minutesUntilAppointment <= 5) {
      warning(
        `🚨 URGENT: Your appointment with ${appointment.doctorName} is in ${timeMessage}!`,
        10000,
      )
    } else if (minutesUntilAppointment <= 15) {
      warning(
        `⏰ Reminder: Your appointment with ${appointment.doctorName} is in ${timeMessage}`,
        8000,
      )
    } else {
      info(
        `📅 Upcoming: Your appointment with ${appointment.doctorName} is in ${timeMessage}`,
        6000,
      )
    }
  }

  // Start reminder checking
  const startReminderChecking = (appointments) => {
    // Clear existing interval
    if (reminderInterval) {
      clearInterval(reminderInterval)
    }

    // Show test toast to verify toast system is working
    info(
      '🔔 Reminder system started! You will receive notifications before your appointments.',
      3000,
    )

    // Check immediately
    const upcomingReminders = checkUpcomingAppointments(appointments)
    upcomingReminders.forEach(showReminder)

    // Set up interval to check every minute
    reminderInterval = setInterval(() => {
      const upcomingReminders = checkUpcomingAppointments(appointments)
      upcomingReminders.forEach(showReminder)
    }, 60000) // Check every minute

    console.log('Reminder checking started with', appointments.length, 'appointments')
  }

  // Stop reminder checking
  const stopReminderChecking = () => {
    if (reminderInterval) {
      clearInterval(reminderInterval)
      reminderInterval = null
      console.log('Reminder checking stopped')
      info('🔕 Reminder system stopped.', 2000)
    }
  }

  // Clear all reminders
  const clearAllReminders = () => {
    console.log('Clearing all reminders, current count:', activeReminders.value.size)
    activeReminders.value.clear()
    console.log('Reminders cleared, new count:', activeReminders.value.size)
  }

  // Get reminder status
  const getReminderStatus = () => {
    return {
      activeReminders: activeReminders.value.size,
      isChecking: reminderInterval !== null,
    }
  }

  // Cleanup on unmount
  onUnmounted(() => {
    stopReminderChecking()
  })

  // Test function to create a fake appointment for testing
  const testReminder = () => {
    const testAppointment = {
      id: 'test-123',
      doctorName: 'Dr. Test',
      status: 'confirmed',
      date: new Date(Date.now() + 2 * 60 * 1000).toISOString().split('T')[0], // 2 minutes from now
      time: new Date(Date.now() + 2 * 60 * 1000).toTimeString().split(' ')[0].substring(0, 5), // 2 minutes from now
    }

    console.log('Testing reminder with appointment:', testAppointment)
    const upcomingReminders = checkUpcomingAppointments([testAppointment])
    console.log('Found upcoming reminders:', upcomingReminders)
    upcomingReminders.forEach(showReminder)
  }

  return {
    startReminderChecking,
    stopReminderChecking,
    clearAllReminders,
    getReminderStatus,
    checkUpcomingAppointments,
    testReminder,
    REMINDER_INTERVALS,
  }
}
