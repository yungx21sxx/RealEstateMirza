export function useDebounce() {
  const debounceTimer = ref<NodeJS.Timeout | null>(null)

  function debounce<TArgs extends unknown[]>(fn: (...args: TArgs) => void, delay = 500) {
    return function (...args: TArgs) {
      if (debounceTimer.value) {
        clearTimeout(debounceTimer.value)
      }
      debounceTimer.value = setTimeout(() => {
        fn(...args)
        debounceTimer.value = null
      }, delay)
    }
  }

  onBeforeUnmount(() => {
    if (debounceTimer.value) {
      clearTimeout(debounceTimer.value)
    }
  })

  return {
    debounce
  }
}
