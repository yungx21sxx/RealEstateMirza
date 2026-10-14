export default function useFavorites() {
  const favoriteListingIDs = useState<number[]>('favorite-listing-ids', () => [])

  if (import.meta.client) {
    const cachedFavorites = localStorage.getItem('favorite-listing-ids')

    if (cachedFavorites && favoriteListingIDs.value.length === 0) {
      favoriteListingIDs.value = cachedFavorites
        .split(',')
        .map(item => Number.parseInt(item, 10))
        .filter(id => !Number.isNaN(id))
    }

    watch(
      favoriteListingIDs,
      (ids: number[]) => {
        localStorage.setItem('favorite-listing-ids', ids.join(','))
      },
      { deep: true }
    )
  }

  function addToFavorites(id: number) {
    if (!favoriteListingIDs.value.includes(id)) {
      favoriteListingIDs.value = [...favoriteListingIDs.value, id]
    }
  }

  function removeFromFavorites(id: number) {
    favoriteListingIDs.value = favoriteListingIDs.value.filter(item => item !== id)
  }

  return {
    favoriteListingIDs,
    addToFavorites,
    removeFromFavorites
  }
}
