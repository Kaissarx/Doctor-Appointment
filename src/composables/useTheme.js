import { ref, computed, watch } from 'vue'

// Theme state
const isDarkMode = ref(false)

// Initialize theme from localStorage or system preference
const initializeTheme = () => {
  const savedTheme = localStorage.getItem('theme')
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

  if (savedTheme) {
    isDarkMode.value = savedTheme === 'dark'
  } else {
    isDarkMode.value = systemPrefersDark
  }

  applyTheme()
}

// Apply theme to document
const applyTheme = () => {
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

// Theme composable
export function useTheme() {
  // Initialize theme on first use
  if (
    typeof window !== 'undefined' &&
    !document.documentElement.classList.contains('theme-initialized')
  ) {
    initializeTheme()
    document.documentElement.classList.add('theme-initialized')
  }

  const toggleTheme = () => {
    isDarkMode.value = !isDarkMode.value
    localStorage.setItem('theme', isDarkMode.value ? 'dark' : 'light')
    applyTheme()
  }

  const setTheme = (theme) => {
    isDarkMode.value = theme === 'dark'
    localStorage.setItem('theme', theme)
    applyTheme()
  }

  // Watch for system theme changes
  if (typeof window !== 'undefined') {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        isDarkMode.value = e.matches
        applyTheme()
      }
    })
  }

  return {
    isDarkMode: computed(() => isDarkMode.value),
    toggleTheme,
    setTheme,
  }
}
