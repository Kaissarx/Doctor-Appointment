<template>
  <footer class="bg-black text-white py-8 mt-auto">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col md:flex-row items-center justify-between">
        <!-- Developer Logo and Info -->
        <div class="flex items-center space-x-4 mb-4 md:mb-0">
          <img
            :src="footerLogo"
            alt="Developer Logo"
            class="h-14 w-14 object-contain rounded-full"
          />
          <div>
            <p class="text-sm text-gray-300">Developed by</p>
            <p class="font-semibold text-white">Mohamed Abdelrazek</p>
          </div>
        </div>

        <!-- Copyright -->
        <div class="text-center md:text-right">
          <p class="text-sm text-gray-400">© 2025 Mohamed Abdelrazek. All rights reserved.</p>
          <p class="text-xs text-gray-500 mt-1">SayHeeelp - Doctor Appointment System</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import footerLogo from '@/assets/footer.png'
</script>

<style scoped>
/* Footer styles */
</style>
