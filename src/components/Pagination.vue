<template>
  <div
    v-if="totalPages > 1"
    class="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 sm:px-6 rounded-lg"
  >
    <!-- Mobile pagination -->
    <div class="flex flex-1 justify-between sm:hidden">
      <button
        @click="previousPage"
        :disabled="!hasPreviousPage"
        class="relative inline-flex items-center rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>
      <button
        @click="nextPage"
        :disabled="!hasNextPage"
        class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>

    <!-- Desktop pagination -->
    <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
      <div>
        <p class="text-sm text-gray-700 dark:text-gray-300">
          Showing
          <span class="font-medium">{{ startIndex + 1 }}</span>
          to
          <span class="font-medium">{{ Math.min(endIndex, totalItems) }}</span>
          of
          <span class="font-medium">{{ totalItems }}</span>
          results
        </p>
      </div>

      <div>
        <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
          <!-- First page button -->
          <button
            @click="goToFirstPage"
            :disabled="!hasPreviousPage"
            class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 dark:text-gray-500 ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span class="sr-only">First</span>
            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path
                fill-rule="evenodd"
                d="M15.79 14.77a.75.75 0 01-1.06.02l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 111.04 1.08L11.832 10l3.938 3.71a.75.75 0 01.02 1.06zm-6.58 0a.75.75 0 00.02-1.06L5.832 10l3.938-3.71a.75.75 0 10-1.04-1.08l-4.5 4.25a.75.75 0 000 1.08l4.5 4.25a.75.75 0 001.06-.02z"
                clip-rule="evenodd"
              />
            </svg>
          </button>

          <!-- Previous page button -->
          <button
            @click="previousPage"
            :disabled="!hasPreviousPage"
            class="relative inline-flex items-center px-2 py-2 text-gray-400 dark:text-gray-500 ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span class="sr-only">Previous</span>
            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path
                fill-rule="evenodd"
                d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                clip-rule="evenodd"
              />
            </svg>
          </button>

          <!-- Page numbers -->
          <button
            v-for="page in getPageNumbers()"
            :key="page"
            @click="goToPage(page)"
            :class="[
              'relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 dark:ring-gray-600 focus:z-20 focus:outline-offset-0',
              page === currentPage
                ? 'z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                : 'text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700',
            ]"
          >
            {{ page }}
          </button>

          <!-- Next page button -->
          <button
            @click="nextPage"
            :disabled="!hasNextPage"
            class="relative inline-flex items-center px-2 py-2 text-gray-400 dark:text-gray-500 ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span class="sr-only">Next</span>
            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path
                fill-rule="evenodd"
                d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                clip-rule="evenodd"
              />
            </svg>
          </button>

          <!-- Last page button -->
          <button
            @click="goToLastPage"
            :disabled="!hasNextPage"
            class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 dark:text-gray-500 ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span class="sr-only">Last</span>
            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path
                fill-rule="evenodd"
                d="M4.21 14.77a.75.75 0 001.06.02l4.5-4.25a.75.75 0 000-1.08l-4.5-4.25a.75.75 0 10-1.04 1.08L8.168 10 4.23 13.71a.75.75 0 00-.02 1.06zm6.58 0a.75.75 0 00-.02-1.06L14.168 10l-3.938-3.71a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 00-1.06-.02z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  totalPages: {
    type: Number,
    required: true,
  },
  totalItems: {
    type: Number,
    required: true,
  },
  startIndex: {
    type: Number,
    required: true,
  },
  endIndex: {
    type: Number,
    required: true,
  },
  hasNextPage: {
    type: Boolean,
    required: true,
  },
  hasPreviousPage: {
    type: Boolean,
    required: true,
  },
})

defineEmits(['goToPage', 'nextPage', 'previousPage', 'goToFirstPage', 'goToLastPage'])

// Get page numbers for display
const getPageNumbers = (maxVisible = 5) => {
  const pages = []
  const start = Math.max(1, currentPage - Math.floor(maxVisible / 2))
  const end = Math.min(totalPages, start + maxVisible - 1)

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  return pages
}
</script>

<style scoped>
/* Additional styles if needed */
</style>
