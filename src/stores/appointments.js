import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAppointmentsStore = defineStore('appointments', () => {
  // State
  const appointments = ref([])
  const isLoading = ref(false)
  const error = ref(null)

  // Getters
  const allAppointments = computed(() => appointments.value)

  const confirmedAppointments = computed(() =>
    appointments.value.filter((appointment) => appointment.status === 'confirmed'),
  )

  const cancelledAppointments = computed(() =>
    appointments.value.filter((appointment) => appointment.status === 'cancelled'),
  )

  const completedAppointments = computed(() =>
    appointments.value.filter((appointment) => appointment.status === 'completed'),
  )

  const appointmentsByDoctor = computed(() => {
    return (doctorId) =>
      appointments.value.filter((appointment) => appointment.doctorId === doctorId)
  })

  const appointmentsByDate = computed(() => {
    return (date) => appointments.value.filter((appointment) => appointment.date === date)
  })

  const appointmentsByPatient = computed(() => {
    return (email) => appointments.value.filter((appointment) => appointment.email === email)
  })

  // Actions
  const loadAppointments = () => {
    try {
      isLoading.value = true
      error.value = null

      const storedAppointments = localStorage.getItem('medibook_appointments')
      if (storedAppointments) {
        appointments.value = JSON.parse(storedAppointments)
      }
    } catch (err) {
      error.value = 'Failed to load appointments'
      console.error('Error loading appointments:', err)
    } finally {
      isLoading.value = false
    }
  }

  const saveAppointments = () => {
    try {
      localStorage.setItem('medibook_appointments', JSON.stringify(appointments.value))
    } catch (err) {
      error.value = 'Failed to save appointments'
      console.error('Error saving appointments:', err)
    }
  }

  const addAppointment = (appointmentData) => {
    try {
      const newAppointment = {
        id: Date.now() + Math.random(), // Unique ID
        ...appointmentData,
        status: 'confirmed',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      appointments.value.push(newAppointment)
      saveAppointments()

      return newAppointment
    } catch (err) {
      error.value = 'Failed to add appointment'
      console.error('Error adding appointment:', err)
      throw err
    }
  }

  const updateAppointment = (appointmentId, updates) => {
    try {
      const index = appointments.value.findIndex((appointment) => appointment.id === appointmentId)
      if (index !== -1) {
        appointments.value[index] = {
          ...appointments.value[index],
          ...updates,
          updatedAt: new Date().toISOString(),
        }
        saveAppointments()
        return appointments.value[index]
      }
      throw new Error('Appointment not found')
    } catch (err) {
      error.value = 'Failed to update appointment'
      console.error('Error updating appointment:', err)
      throw err
    }
  }

  const cancelAppointment = (appointmentId) => {
    return updateAppointment(appointmentId, { status: 'cancelled' })
  }

  const completeAppointment = (appointmentId) => {
    return updateAppointment(appointmentId, { status: 'completed' })
  }

  const deleteAppointment = (appointmentId) => {
    try {
      const index = appointments.value.findIndex((appointment) => appointment.id === appointmentId)
      if (index !== -1) {
        appointments.value.splice(index, 1)
        saveAppointments()
        return true
      }
      return false
    } catch (err) {
      error.value = 'Failed to delete appointment'
      console.error('Error deleting appointment:', err)
      throw err
    }
  }

  const getAppointmentById = (appointmentId) => {
    return appointments.value.find((appointment) => appointment.id === appointmentId)
  }

  const clearAllAppointments = () => {
    appointments.value = []
    saveAppointments()
  }

  const exportAppointments = () => {
    return JSON.stringify(appointments.value, null, 2)
  }

  const importAppointments = (appointmentsData) => {
    try {
      const parsedAppointments = JSON.parse(appointmentsData)
      if (Array.isArray(parsedAppointments)) {
        appointments.value = parsedAppointments
        saveAppointments()
        return true
      }
      throw new Error('Invalid appointments data format')
    } catch (err) {
      error.value = 'Failed to import appointments'
      console.error('Error importing appointments:', err)
      throw err
    }
  }

  // Initialize store
  const initializeStore = () => {
    loadAppointments()
  }

  return {
    // State
    appointments,
    isLoading,
    error,

    // Getters
    allAppointments,
    confirmedAppointments,
    cancelledAppointments,
    completedAppointments,
    appointmentsByDoctor,
    appointmentsByDate,
    appointmentsByPatient,

    // Actions
    loadAppointments,
    saveAppointments,
    addAppointment,
    updateAppointment,
    cancelAppointment,
    completeAppointment,
    deleteAppointment,
    getAppointmentById,
    clearAllAppointments,
    exportAppointments,
    importAppointments,
    initializeStore,
  }
})
