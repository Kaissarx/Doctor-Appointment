<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 pt-24">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Loading State -->
      <div v-if="!doctor" class="text-center py-12">
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
          Loading Doctor Information...
        </h2>
        <p class="text-gray-600 dark:text-gray-300">
          Please wait while we fetch the doctor details.
        </p>
      </div>

      <!-- Main Content -->
      <div v-else>
        <!-- Back Button -->
        <button
          @click="goBack"
          class="flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 mb-6 transition-colors"
        >
          <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Doctors
        </button>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Doctor Information -->
          <div class="lg:col-span-1">
            <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sticky top-32">
              <div class="text-center">
                <img
                  :src="doctor.photo"
                  :alt="`Photo of ${doctor.name}`"
                  class="w-32 h-32 rounded-full object-cover mx-auto mb-4 border-4 border-indigo-500"
                />
                <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                  {{ doctor.name }}
                </h2>
                <p class="text-lg text-indigo-600 dark:text-indigo-400 font-semibold mb-2">
                  {{ doctor.specialty }}
                </p>
                <p class="text-gray-600 dark:text-gray-300 mb-4">{{ doctor.location }}</p>

                <!-- Doctor Rating (placeholder) -->
                <div class="flex items-center justify-center mb-4">
                  <div class="flex items-center">
                    <svg
                      v-for="i in 5"
                      :key="i"
                      class="h-5 w-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                      />
                    </svg>
                  </div>
                  <span class="ml-2 text-sm text-gray-600">4.8 (124 reviews)</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Booking Form -->
          <div class="lg:col-span-2">
            <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
              <h1 class="text-3xl font-bold text-gray-800 dark:text-white mb-8">
                Book an Appointment
              </h1>

              <!-- Progress Steps -->
              <div class="mb-8">
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <div
                      class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold"
                      :class="
                        currentStep >= 1 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'
                      "
                    >
                      1
                    </div>
                    <span
                      class="ml-2 text-sm font-medium"
                      :class="currentStep >= 1 ? 'text-indigo-600' : 'text-gray-500'"
                    >
                      Select Date & Time
                    </span>
                  </div>
                  <div
                    class="flex-1 h-0.5 mx-4"
                    :class="currentStep >= 2 ? 'bg-indigo-600' : 'bg-gray-200'"
                  ></div>
                  <div class="flex items-center">
                    <div
                      class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold"
                      :class="
                        currentStep >= 2 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'
                      "
                    >
                      2
                    </div>
                    <span
                      class="ml-2 text-sm font-medium"
                      :class="currentStep >= 2 ? 'text-indigo-600' : 'text-gray-500'"
                    >
                      Patient Information
                    </span>
                  </div>
                  <div
                    class="flex-1 h-0.5 mx-4"
                    :class="currentStep >= 3 ? 'bg-indigo-600' : 'bg-gray-200'"
                  ></div>
                  <div class="flex items-center">
                    <div
                      class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold"
                      :class="
                        currentStep >= 3 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'
                      "
                    >
                      3
                    </div>
                    <span
                      class="ml-2 text-sm font-medium"
                      :class="currentStep >= 3 ? 'text-indigo-600' : 'text-gray-500'"
                    >
                      Confirmation
                    </span>
                  </div>
                </div>
              </div>

              <!-- Step 1: Date & Time Selection -->
              <div v-if="currentStep === 1" class="space-y-6">
                <h2 class="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                  Select Date & Time
                </h2>

                <!-- Date Selection -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >Select Date</label
                  >
                  <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <svg
                      class="inline h-4 w-4 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Appointments are available from tomorrow onwards. Today's date is not available
                    for booking.
                  </p>
                  <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                    <!-- Today's date (unavailable) -->
                    <div
                      class="p-3 text-center border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 rounded-lg opacity-50"
                    >
                      <div class="text-sm font-medium text-gray-400">{{ getTodayInfo().day }}</div>
                      <div class="text-xs text-gray-400">{{ getTodayInfo().month }}</div>
                      <div class="text-xs text-gray-400">{{ getTodayInfo().date }}</div>
                      <div class="text-xs text-red-500 dark:text-red-400 mt-1">Today</div>
                    </div>

                    <!-- Available dates -->
                    <button
                      v-for="date in availableDates"
                      :key="date.value"
                      @click="selectDate(date)"
                      class="p-3 text-center border rounded-lg transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      :class="
                        selectedDate?.value === date.value
                          ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300'
                          : 'border-gray-300 dark:border-gray-600 hover:border-indigo-300 dark:hover:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/10'
                      "
                    >
                      <div class="text-sm font-medium">{{ date.day }}</div>
                      <div class="text-xs text-gray-500 dark:text-gray-400">{{ date.month }}</div>
                      <div class="text-xs text-gray-500 dark:text-gray-400">{{ date.date }}</div>
                    </button>
                  </div>

                  <!-- No available days message -->
                  <div
                    v-if="availableDates.length === 0"
                    class="text-center py-8 bg-gray-50 dark:bg-gray-700 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 mt-4"
                  >
                    <svg
                      class="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto mb-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <h3 class="text-lg font-medium text-gray-800 dark:text-white mb-2">
                      No Available Days
                    </h3>
                    <p class="text-gray-600 dark:text-gray-300">
                      This doctor doesn't have any available days at the moment.
                    </p>
                    <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">
                      Please try selecting a different doctor or contact them directly.
                    </p>
                  </div>
                </div>

                <!-- Time Slots -->
                <div v-if="selectedDate">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >Available Time Slots</label
                  >

                  <!-- Available Time Slots -->
                  <div
                    v-if="availableTimeSlots.length > 0"
                    class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3"
                  >
                    <button
                      v-for="slot in availableTimeSlots"
                      :key="slot"
                      @click="selectTimeSlot(slot)"
                      class="p-3 text-center border rounded-lg transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      :class="
                        selectedTimeSlot === slot
                          ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300'
                          : 'border-gray-300 dark:border-gray-600 hover:border-indigo-300 dark:hover:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/10'
                      "
                    >
                      {{ slot }}
                    </button>
                  </div>

                  <!-- No Available Slots Message -->
                  <div
                    v-else
                    class="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300"
                  >
                    <svg
                      class="h-12 w-12 text-gray-400 mx-auto mb-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <h3 class="text-lg font-medium text-gray-800 dark:text-white mb-2">
                      No Available Time Slots
                    </h3>
                    <p class="text-gray-600 dark:text-gray-300">
                      This doctor doesn't have any available time slots at the moment.
                    </p>
                    <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">
                      Please try selecting a different date or contact the doctor directly.
                    </p>
                  </div>
                </div>

                <div class="flex justify-end">
                  <button
                    @click="nextStep"
                    :disabled="
                      !selectedDate || !selectedTimeSlot || availableTimeSlots.length === 0
                    "
                    class="px-6 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  >
                    Next Step
                  </button>
                </div>
              </div>

              <!-- Step 2: Patient Information -->
              <div v-if="currentStep === 2" class="space-y-6">
                <h2 class="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                  Patient Information
                </h2>

                <form @submit.prevent="nextStep" class="space-y-4">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        for="patientName"
                        class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Full Name *
                      </label>
                      <input
                        id="patientName"
                        v-model="appointmentForm.patientName"
                        type="text"
                        required
                        :class="[
                          'w-full px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white',
                          formErrors.patientName
                            ? 'border-red-500 focus:ring-red-500'
                            : 'border-gray-300 dark:border-gray-600 focus:ring-indigo-500',
                        ]"
                        placeholder="Enter your full name"
                        @blur="validateForm"
                      />
                      <p
                        v-if="formErrors.patientName"
                        class="mt-1 text-sm text-red-600 dark:text-red-400"
                      >
                        {{ formErrors.patientName }}
                      </p>
                    </div>

                    <div>
                      <label
                        for="phone"
                        class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Phone Number *
                      </label>
                      <input
                        id="phone"
                        v-model="appointmentForm.phone"
                        type="tel"
                        required
                        :class="[
                          'w-full px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white',
                          formErrors.phone
                            ? 'border-red-500 focus:ring-red-500'
                            : 'border-gray-300 dark:border-gray-600 focus:ring-indigo-500',
                        ]"
                        placeholder="Enter your phone number"
                        @blur="validateForm"
                      />
                      <p
                        v-if="formErrors.phone"
                        class="mt-1 text-sm text-red-600 dark:text-red-400"
                      >
                        {{ formErrors.phone }}
                      </p>
                    </div>
                  </div>

                  <div>
                    <label
                      for="email"
                      class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Email Address *
                    </label>
                    <input
                      id="email"
                      v-model="appointmentForm.email"
                      type="email"
                      required
                      :class="[
                        'w-full px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white',
                        formErrors.email
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-gray-300 dark:border-gray-600 focus:ring-indigo-500',
                      ]"
                      placeholder="Enter your email address"
                      @blur="validateForm"
                    />
                    <p v-if="formErrors.email" class="mt-1 text-sm text-red-600 dark:text-red-400">
                      {{ formErrors.email }}
                    </p>
                  </div>

                  <div>
                    <label
                      for="reason"
                      class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Reason for Visit
                    </label>
                    <textarea
                      id="reason"
                      v-model="appointmentForm.reason"
                      rows="3"
                      class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Briefly describe the reason for your visit (optional)"
                    ></textarea>
                  </div>

                  <div class="flex justify-between">
                    <button
                      type="button"
                      @click="prevStep"
                      class="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                    >
                      Previous
                    </button>
                    <button
                      type="submit"
                      :disabled="!isFormValid"
                      :class="[
                        'px-6 py-2 rounded-lg font-semibold transition-colors',
                        isFormValid
                          ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                          : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed',
                      ]"
                    >
                      Review & Confirm
                    </button>
                  </div>
                </form>
              </div>

              <!-- Step 3: Confirmation -->
              <div v-if="currentStep === 3" class="space-y-6">
                <h2 class="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                  Confirm Your Appointment
                </h2>

                <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 space-y-4">
                  <div class="flex justify-between">
                    <span class="font-medium text-gray-700 dark:text-gray-300">Doctor:</span>
                    <span class="text-gray-900 dark:text-white"
                      >{{ doctor.name }} - {{ doctor.specialty }}</span
                    >
                  </div>
                  <div class="flex justify-between">
                    <span class="font-medium text-gray-700 dark:text-gray-300">Date:</span>
                    <span class="text-gray-900 dark:text-white">{{ selectedDate?.display }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="font-medium text-gray-700 dark:text-gray-300">Time:</span>
                    <span class="text-gray-900 dark:text-white">{{ selectedTimeSlot }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="font-medium text-gray-700 dark:text-gray-300">Patient:</span>
                    <span class="text-gray-900 dark:text-white">{{
                      appointmentForm.patientName
                    }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="font-medium text-gray-700 dark:text-gray-300">Phone:</span>
                    <span class="text-gray-900 dark:text-white">{{ appointmentForm.phone }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="font-medium text-gray-700 dark:text-gray-300">Email:</span>
                    <span class="text-gray-900 dark:text-white">{{ appointmentForm.email }}</span>
                  </div>
                  <div v-if="appointmentForm.reason" class="flex justify-between">
                    <span class="font-medium text-gray-700 dark:text-gray-300">Reason:</span>
                    <span class="text-gray-900 dark:text-white">{{ appointmentForm.reason }}</span>
                  </div>
                </div>

                <div class="flex justify-between">
                  <button
                    @click="prevStep"
                    class="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                  >
                    Previous
                  </button>
                  <button
                    @click="confirmBooking"
                    class="px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
                  >
                    Confirm Booking
                  </button>
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
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { doctors } from '@/data/doctor.js'
import { useAppointmentsStore } from '@/stores/appointments.js'
import { useToast, useErrorHandling } from '@/composables/useErrorHandling'

// Import images individually for better reliability
import DrJohnDoe from '@/assets/Dr. John Doe, Cardiologist.png'
import DrJaneSmith from '@/assets/Dr. Jane Smith, Dermatologist.png'
import DrEmilyWhite from '@/assets/Dr. Emily White, Pediatrician.png'
import DrMichaelBrown from '@/assets/Dr. Michael Brown, Dentist.png'
import DrSarahWilson from '@/assets/Dr. Sarah Wilson, Neurologist.png'

// Create a mapping of doctor photos to imported images
const imageMap = {
  'Dr. John Doe, Cardiologist.png': DrJohnDoe,
  'Dr. Jane Smith, Dermatologist.png': DrJaneSmith,
  'Dr. Emily White, Pediatrician.png': DrEmilyWhite,
  'Dr. Michael Brown, Dentist.png': DrMichaelBrown,
  'Dr. Sarah Wilson, Neurologist.png': DrSarahWilson,
}

const route = useRoute()
const router = useRouter()
const appointmentsStore = useAppointmentsStore()
const { success, error } = useToast()
const { handleAsyncOperation } = useErrorHandling()

// Doctor data
const doctor = ref(null)

// Booking state
const currentStep = ref(1)
const selectedDate = ref(null)
const selectedTimeSlot = ref(null)

// Appointment form
const appointmentForm = ref({
  patientName: '',
  phone: '',
  email: '',
  reason: '',
})

// Form validation errors
const formErrors = ref({
  patientName: '',
  phone: '',
  email: '',
})

// Form validation state
const isFormValid = ref(false)

// Available dates (starting from tomorrow - dynamic)
const availableDates = ref([])

// Available time slots (will be set based on doctor's available slots)
const availableTimeSlots = ref([])

// Available days (will be set based on doctor's available days)
const availableDays = ref([])

// Initialize component
onMounted(() => {
  console.log('BookingPage mounted')
  console.log('Route params:', route.params)

  const doctorId = parseInt(route.params.id)
  console.log('Doctor ID:', doctorId)

  const foundDoctor = doctors.find((d) => d.id === doctorId)
  console.log('Found doctor:', foundDoctor)

  if (!foundDoctor) {
    console.log('Doctor not found, redirecting to doctors page')
    router.push('/doctors')
    return
  }

  // Process the doctor data with the correct image URL
  doctor.value = {
    ...foundDoctor,
    photo: imageMap[foundDoctor.photo] || '',
  }

  console.log('Processed doctor:', doctor.value)

  // Set doctor's available time slots
  availableTimeSlots.value = foundDoctor.availableSlots || []
  console.log('Doctor available slots:', availableTimeSlots.value)

  // Set doctor's available days
  availableDays.value = foundDoctor.availableDays || []
  console.log('Doctor available days:', availableDays.value)

  generateAvailableDates()
  console.log('Available dates generated:', availableDates.value.length)
})

// Generate available dates starting from tomorrow (dynamic)
const generateAvailableDates = () => {
  const today = new Date()
  const dates = []

  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const shortDayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]

  // Generate dates for the next 30 days to ensure we have enough options
  for (let i = 1; i <= 30; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() + i)

    const dayName = dayNames[date.getDay()]
    const shortDayName = shortDayNames[date.getDay()]

    // Check if this day is available for the doctor
    const isAvailable = availableDays.value.length === 0 || availableDays.value.includes(dayName)

    if (isAvailable) {
      dates.push({
        value: date.toISOString().split('T')[0],
        display: date.toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        day: shortDayName,
        month: monthNames[date.getMonth()],
        date: date.getDate(),
        dayName: dayName,
      })
    }
  }

  availableDates.value = dates
  console.log('Generated available dates for doctor:', availableDates.value.length, 'dates')
}

// Get today's date information for display
const getTodayInfo = () => {
  const today = new Date()
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]

  return {
    day: dayNames[today.getDay()],
    month: monthNames[today.getMonth()],
    date: today.getDate(),
  }
}

// Methods
const selectDate = (date) => {
  selectedDate.value = date
  selectedTimeSlot.value = null // Reset time slot when date changes
}

const selectTimeSlot = (slot) => {
  selectedTimeSlot.value = slot
}

// Validation functions
const validateForm = () => {
  const errors = {
    patientName: '',
    phone: '',
    email: '',
  }

  // Validate patient name
  if (!appointmentForm.value.patientName.trim()) {
    errors.patientName = 'Full name is required'
  } else if (appointmentForm.value.patientName.trim().length < 2) {
    errors.patientName = 'Name must be at least 2 characters'
  }

  // Validate phone
  if (!appointmentForm.value.phone.trim()) {
    errors.phone = 'Phone number is required'
  } else if (
    !/^[\+]?[1-9][\d]{0,15}$/.test(appointmentForm.value.phone.replace(/[\s\-\(\)]/g, ''))
  ) {
    errors.phone = 'Please enter a valid phone number'
  }

  // Validate email
  if (!appointmentForm.value.email.trim()) {
    errors.email = 'Email address is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(appointmentForm.value.email)) {
    errors.email = 'Please enter a valid email address'
  }

  formErrors.value = errors
  isFormValid.value = Object.values(errors).every((error) => error === '')

  return isFormValid.value
}

const nextStep = () => {
  if (currentStep.value === 2) {
    // Validate form before proceeding to step 3
    if (!validateForm()) {
      return
    }
  }

  if (currentStep.value < 3) {
    currentStep.value++
  }
}

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

const goBack = () => {
  router.push('/doctors')
}

const confirmBooking = async () => {
  try {
    await handleAsyncOperation(async () => {
      // Create appointment object
      const appointmentData = {
        doctorId: doctor.value.id,
        doctorName: doctor.value.name,
        doctorSpecialty: doctor.value.specialty,
        doctorPhoto: doctor.value.photo,
        doctorLocation: doctor.value.location,
        date: selectedDate.value.value,
        time: selectedTimeSlot.value,
        patientName: appointmentForm.value.patientName,
        phone: appointmentForm.value.phone,
        email: appointmentForm.value.email,
        reason: appointmentForm.value.reason,
      }

      // Add appointment using Pinia store
      const newAppointment = appointmentsStore.addAppointment(appointmentData)

      // Show success message and redirect
      success('Appointment booked successfully!')
      router.push('/appointments')
    }, 'Failed to book appointment. Please try again.')
  } catch (err) {
    // Error is already handled by handleAsyncOperation
    error('Failed to book appointment. Please try again.')
  }
}
</script>

<style scoped>
/* Custom styles for booking page */
</style>
