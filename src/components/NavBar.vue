<template>
  <nav
    class="bg-white dark:bg-gray-800 shadow-lg fixed top-0 left-0 right-0 z-50 transition-colors"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo and Brand -->
        <div class="flex items-center">
          <router-link to="/" class="flex items-center space-x-2">
            <img :src="logoUrl" alt="Doctor Appointment Logo" class="h-8 w-8 object-contain" />
            <span class="text-xl font-bold text-gray-800 dark:text-white">SayHeeelp</span>
          </router-link>
        </div>

        <!-- Search Bar -->
        <div class="hidden md:flex items-center flex-1 max-w-md mx-8">
          <div class="relative w-full">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search doctors..."
              class="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
              @keyup.enter="handleSearch"
            />
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                class="h-4 w-4 text-gray-400"
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
        </div>

        <!-- Navigation Links -->
        <div class="hidden md:flex items-center space-x-6">
          <router-link
            to="/"
            class="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            :class="{
              'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20':
                $route.path === '/',
            }"
          >
            Home
          </router-link>
          <router-link
            to="/doctors"
            class="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            :class="{
              'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20':
                $route.path === '/doctors',
            }"
          >
            Doctors
          </router-link>
          <router-link
            to="/appointments"
            class="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            :class="{
              'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20':
                $route.path === '/appointments',
            }"
          >
            My Appointments
          </router-link>
          <router-link
            to="/contact"
            class="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            :class="{
              'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20':
                $route.path === '/contact',
            }"
          >
            Contact
          </router-link>

          <!-- Theme Toggle -->
          <ThemeToggle />
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden">
          <button
            @click="toggleMobileMenu"
            class="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 focus:outline-none focus:text-indigo-600 dark:focus:text-indigo-400"
          >
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile menu -->
      <div v-show="isMobileMenuOpen" class="md:hidden">
        <div
          class="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700"
        >
          <!-- Mobile Search Bar -->
          <div class="px-3 py-2">
            <div class="relative">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search doctors..."
                class="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                @keyup.enter="handleSearch"
              />
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  class="h-4 w-4 text-gray-400"
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
          </div>

          <router-link
            to="/"
            class="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 block px-3 py-2 rounded-md text-base font-medium"
            @click="closeMobileMenu"
          >
            Home
          </router-link>
          <router-link
            to="/doctors"
            class="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 block px-3 py-2 rounded-md text-base font-medium"
            @click="closeMobileMenu"
          >
            Doctors
          </router-link>
          <router-link
            to="/appointments"
            class="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 block px-3 py-2 rounded-md text-base font-medium"
            @click="closeMobileMenu"
          >
            My Appointments
          </router-link>
          <router-link
            to="/contact"
            class="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 block px-3 py-2 rounded-md text-base font-medium"
            @click="closeMobileMenu"
          >
            Contact
          </router-link>

          <!-- Mobile Theme Toggle -->
          <div class="px-3 py-2">
            <div class="flex items-center justify-between">
              <span class="text-gray-700 dark:text-gray-300 text-base font-medium">Theme</span>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import logo from '@/assets/logo.png'
import ThemeToggle from '@/components/ThemeToggle.vue'

const router = useRouter()
const logoUrl = logo
const isMobileMenuOpen = ref(false)
const searchQuery = ref('')

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({
      path: '/doctors',
      query: { search: searchQuery.value.trim() },
    })
    closeMobileMenu()
  }
}
</script>

<style scoped>
/* Additional custom styles if needed */
</style>
