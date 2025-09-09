<script setup>
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'
import Toast from '@/components/Toast.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import ErrorBoundary from '@/components/ErrorBoundary.vue'
import { useErrorHandling } from '@/composables/useErrorHandling'

const { isLoading } = useErrorHandling()
</script>

<template>
  <div id="app" class="min-h-screen flex flex-col">
    <ErrorBoundary>
      <NavBar />
      <main class="flex-1">
        <router-view />
      </main>
      <Footer />
    </ErrorBoundary>

    <!-- Global Components -->
    <Toast />
    <LoadingSpinner :show="isLoading" message="Processing your request..." />
  </div>
</template>

<style scoped></style>
