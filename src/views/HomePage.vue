<template>
  <div class="min-h-screen relative">
    <!-- Background Image with Dark Overlay -->
    <div
      class="absolute inset-0 bg-cover bg-center bg-no-repeat"
      :style="{ backgroundImage: `url(${backgroundUrl})` }"
    >
      <div class="absolute inset-0 bg-black bg-opacity-50 dark:bg-opacity-70"></div>
    </div>

    <!-- Content -->
    <div
      class="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 pt-20 pb-8"
    >
      <!-- Welcome Section -->
      <div class="text-center max-w-4xl mx-auto">
        <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 px-4">
          Find Your Perfect Doctor
        </h1>
        <p class="text-lg sm:text-xl md:text-2xl text-white mb-4 opacity-90 px-4">
          Book appointments with trusted healthcare professionals in your area
        </p>
        <h3 class="text-base sm:text-lg md:text-xl text-white mb-8 opacity-100 px-4">
          The Ultimate Guide to Human Maintenance
        </h3>

        <!-- Search Section -->
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 sm:p-8 max-w-2xl mx-auto">
          <h2 class="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
            Search for Doctors
          </h2>

          <!-- Search Form -->
          <form @submit.prevent="handleSearch" class="space-y-4">
            <!-- Search Input -->
            <div class="relative">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search by doctor name or specialty..."
                class="w-full px-4 py-3 pl-12 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg"
              />
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  class="h-6 w-6 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            <!-- Specialty Filter -->
            <div class="relative">
              <select
                v-model="selectedSpecialty"
                class="w-full px-4 py-3 pr-10 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg appearance-none"
              >
                <option value="">All Specialties</option>
                <option value="Cardiologist">Cardiologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatrician">Pediatrician</option>
                <option value="Dentist">Dentist</option>
                <option value="Neurologist">Neurologist</option>
              </select>
              <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg
                  class="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>

            <!-- Search Button -->
            <button
              type="submit"
              class="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold text-lg hover:bg-indigo-700 transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <span>Search Doctors</span>
            </button>
          </form>
        </div>

        <!-- Quick Actions -->
        <div class="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div
            class="bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-90 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-opacity-100 dark:hover:bg-opacity-100 transition-all duration-200"
          >
            <div
              class="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <svg
                class="h-6 w-6 text-indigo-600"
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
            <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-2">Expert Doctors</h3>
            <p class="text-gray-600 dark:text-gray-300">Find qualified healthcare professionals</p>
          </div>

          <div
            class="bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-90 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-opacity-100 dark:hover:bg-opacity-100 transition-all duration-200"
          >
            <div
              class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <svg
                class="h-6 w-6 text-green-600"
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
            </div>
            <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-2">Easy Booking</h3>
            <p class="text-gray-600 dark:text-gray-300">
              Schedule appointments in just a few clicks
            </p>
          </div>

          <div
            class="bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-90 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-opacity-100 dark:hover:bg-opacity-100 transition-all duration-200"
          >
            <div
              class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <svg
                class="h-6 w-6 text-blue-600"
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
            </div>
            <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-2">24/7 Support</h3>
            <p class="text-gray-600 dark:text-gray-300">Get help whenever you need it</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import background from '@/assets/background.png'

const router = useRouter()
const backgroundUrl = background
const searchQuery = ref('')
const selectedSpecialty = ref('')

const handleSearch = () => {
  // Navigate to doctors page with search parameters
  const query = {
    search: searchQuery.value,
    specialty: selectedSpecialty.value,
  }

  // Remove empty parameters
  Object.keys(query).forEach((key) => {
    if (!query[key]) {
      delete query[key]
    }
  })

  router.push({
    path: '/doctors',
    query: query,
  })
}
</script>

<style scoped>
/* Custom styles for the home page */
</style>
