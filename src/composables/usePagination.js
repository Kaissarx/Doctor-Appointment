import { ref, computed } from 'vue'

export function usePagination(items, itemsPerPage = 6) {
  const currentPage = ref(1)
  const pageSize = ref(itemsPerPage)

  // Computed properties
  const totalItems = computed(() => items.value.length)
  const totalPages = computed(() => Math.ceil(totalItems.value / pageSize.value))

  const startIndex = computed(() => (currentPage.value - 1) * pageSize.value)
  const endIndex = computed(() => startIndex.value + pageSize.value)

  const paginatedItems = computed(() => {
    return items.value.slice(startIndex.value, endIndex.value)
  })

  const hasNextPage = computed(() => currentPage.value < totalPages.value)
  const hasPreviousPage = computed(() => currentPage.value > 1)

  // Navigation methods
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page
    }
  }

  const nextPage = () => {
    if (hasNextPage.value) {
      currentPage.value++
    }
  }

  const previousPage = () => {
    if (hasPreviousPage.value) {
      currentPage.value--
    }
  }

  const goToFirstPage = () => {
    currentPage.value = 1
  }

  const goToLastPage = () => {
    currentPage.value = totalPages.value
  }

  // Reset pagination when items change
  const resetPagination = () => {
    currentPage.value = 1
  }

  // Update page size
  const updatePageSize = (newSize) => {
    pageSize.value = newSize
    resetPagination()
  }

  // Get page numbers for pagination display
  const getPageNumbers = (maxVisible = 5) => {
    const pages = []
    const start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2))
    const end = Math.min(totalPages.value, start + maxVisible - 1)

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    return pages
  }

  return {
    // State
    currentPage,
    pageSize,

    // Computed
    totalItems,
    totalPages,
    paginatedItems,
    hasNextPage,
    hasPreviousPage,
    startIndex,
    endIndex,

    // Methods
    goToPage,
    nextPage,
    previousPage,
    goToFirstPage,
    goToLastPage,
    resetPagination,
    updatePageSize,
    getPageNumbers,
  }
}
