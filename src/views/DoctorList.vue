<template>
  <div class="p-8 bg-gray-100 dark:bg-gray-900 min-h-screen pt-24">
    <div class="max-w-6xl mx-auto">
      <h1 class="text-4xl font-bold text-center text-gray-800 dark:text-white mb-8">
        Find a Doctor
      </h1>

      <!-- Search and Filter Section -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Search Input -->
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search by doctor name or specialty..."
              class="w-full px-4 py-3 pl-12 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              @input="filterDoctors"
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
              class="w-full px-4 py-3 pr-10 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none"
              @change="filterDoctors"
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
        </div>

        <!-- Clear Filters Button -->
        <div v-if="searchQuery || selectedSpecialty" class="mt-4 flex justify-end">
          <button
            @click="clearFilters"
            class="px-4 py-2 text-sm text-indigo-600 hover:text-indigo-800 font-medium"
          >
            Clear Filters
          </button>
        </div>
      </div>

      <!-- Results Count -->
      <div class="mb-6">
        <p class="text-gray-600">
          Showing {{ filteredDoctors.length }} of {{ allDoctors.length }} doctors
          <span v-if="searchQuery || selectedSpecialty" class="text-indigo-600"> (filtered) </span>
        </p>
      </div>

      <!-- Doctors Grid -->
      <div
        v-if="filteredDoctors.length > 0"
        class="doctors-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <DoctorCard v-for="doctor in paginatedDoctors" :key="doctor.id" :doctor="doctor" />
      </div>

      <!-- Pagination -->
      <div v-if="filteredDoctors.length > 0" class="mt-8">
        <Pagination
          :current-page="currentPage"
          :total-pages="totalPages"
          :total-items="totalItems"
          :start-index="startIndex"
          :end-index="endIndex"
          :has-next-page="hasNextPage"
          :has-previous-page="hasPreviousPage"
          @go-to-page="goToPage"
          @next-page="nextPage"
          @previous-page="previousPage"
          @go-to-first-page="goToFirstPage"
          @go-to-last-page="goToLastPage"
        />
      </div>

      <!-- No Results Message -->
      <div v-else class="text-center py-12">
        <div
          class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <svg
            class="h-12 w-12 text-gray-400"
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
        <h3 class="text-xl font-semibold text-gray-800 mb-2">No doctors found</h3>
        <p class="text-gray-600 mb-4">Try adjusting your search criteria or clearing the filters</p>
        <button
          @click="clearFilters"
          class="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Clear Filters
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import DoctorCard from '@/components/DoctorCard.vue'
import Pagination from '@/components/Pagination.vue'
import { doctors } from '@/data/doctor.js'
import { usePagination } from '@/composables/usePagination'

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

// Create a reactive list of all doctors with the correct image URLs
const allDoctors = ref(
  doctors.map((doctor) => {
    return {
      ...doctor,
      photo: imageMap[doctor.photo] || '',
    }
  }),
)

// Search and filter state
const searchQuery = ref('')
const selectedSpecialty = ref('')
const route = useRoute()

// Filtered doctors computed property
const filteredDoctors = computed(() => {
  let filtered = allDoctors.value

  // Filter by search query (name or specialty)
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(
      (doctor) =>
        doctor.name.toLowerCase().includes(query) ||
        doctor.specialty.toLowerCase().includes(query) ||
        doctor.location.toLowerCase().includes(query),
    )
  }

  // Filter by specialty
  if (selectedSpecialty.value) {
    filtered = filtered.filter((doctor) => doctor.specialty === selectedSpecialty.value)
  }

  return filtered
})

// Pagination
const {
  currentPage,
  totalPages,
  totalItems,
  paginatedItems: paginatedDoctors,
  hasNextPage,
  hasPreviousPage,
  startIndex,
  endIndex,
  goToPage,
  nextPage,
  previousPage,
  goToFirstPage,
  goToLastPage,
  resetPagination,
} = usePagination(filteredDoctors, 6)

// Filter function
const filterDoctors = () => {
  // The computed property will automatically update
  // This function is called on input/change events
}

// Clear filters function
const clearFilters = () => {
  searchQuery.value = ''
  selectedSpecialty.value = ''
  resetPagination()
}

// Initialize search parameters from URL
onMounted(() => {
  // Get search parameters from URL query
  if (route.query.search) {
    searchQuery.value = route.query.search
  }
  if (route.query.specialty) {
    selectedSpecialty.value = route.query.specialty
  }
})

// Watch for route changes to update search parameters
watch(
  () => route.query,
  (newQuery) => {
    if (newQuery.search) {
      searchQuery.value = newQuery.search
    } else {
      searchQuery.value = ''
    }

    if (newQuery.specialty) {
      selectedSpecialty.value = newQuery.specialty
    } else {
      selectedSpecialty.value = ''
    }

    // Reset pagination when filters change
    resetPagination()
  },
  { immediate: true },
)
</script>

<style scoped>
/* Scoped styles will only apply to this component */
</style>
