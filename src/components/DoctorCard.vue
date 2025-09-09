<template>
  <div
    class="doctor-card p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg flex flex-col items-center text-center transition-transform transform hover:scale-105"
  >
    <img
      :src="photoUrl"
      :alt="`Photo of Dr. ${doctor.name}`"
      class="w-24 h-24 rounded-full object-cover mb-4 border-2 border-indigo-500"
    />
    <h3 class="text-xl font-semibold text-gray-800 dark:text-white">{{ doctor.name }}</h3>
    <p class="text-sm text-indigo-600 dark:text-indigo-400 font-medium">{{ doctor.specialty }}</p>
    <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">{{ doctor.location }}</p>
    <button
      @click="bookAppointment"
      class="mt-4 px-4 py-2 bg-indigo-500 text-white text-sm font-medium rounded-full shadow-md hover:bg-indigo-600 transition-colors"
    >
      Book Appointment
    </button>
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  doctor: {
    type: Object,
    required: true,
  },
})

const router = useRouter()

// Use the photo URL that's already processed in the parent component
const photoUrl = computed(() => props.doctor.photo)

const bookAppointment = () => {
  router.push(`/booking/${props.doctor.id}`)
}
</script>

<style scoped>
/* Scoped styles will only apply to this component */
.doctor-card {
  /* Using Tailwind for styling, but you can add custom CSS here too */
}
</style>
