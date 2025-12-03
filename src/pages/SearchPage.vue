<!-- SearchResults.vue -->
<template>
    <div class="search-results">
      <h1 class="heading">Search Results for: "{{ $route.params.query }}"</h1>
  
      <div v-if="loading" class="loading">Loading...</div>
      <div v-else-if="error" class="error">{{ error }}</div>
      <div v-else>
        <div v-if="results.length" class="results-grid">
          <MovieCard v-for="movie in results" :key="movie.id" :movie="movie" />
        </div>
        <div v-else class="no-results">No results found.</div>
      </div>
    </div>
  </template>
  
<script>
import axios from 'axios'
import MovieCard from '@/pages/MovieCard.vue'

export default {
  name: 'SearchPage',
  components: { MovieCard },
  data() {
    return {
      movies: [],
      loading: false,
      error: null
    }
  },
  watch: {
    '$route.params.query': {
      immediate: true,
      handler() {
        this.fetchSearchResults()
      }
    }
  },
methods: {
  async fetchSearchResults() {
    const query = this.$route.params.query
    const apiKey = '43435737ce9b21c469c5ee154ddadf54'

    this.loading = true
    this.error = null

    try {
      const urlBase = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}`
      const fullUrl1 = `${urlBase}&api_key=${apiKey}&language=en-US&page=1`
      const fullUrl2 = `${urlBase}&api_key=${apiKey}&language=en-US&page=2`

      const [res1, res2] = await Promise.all([
        axios.get(fullUrl1),
        axios.get(fullUrl2)
      ])

      this.results = [...res1.data.results, ...res2.data.results]
    } catch (err) {
      this.error = 'Failed to load search results.'
      this.results = []
    } finally {
      this.loading = false
    }
  }
 }
}
</script>
  
  
  <style scoped>
  .search-results {
    background-color: #0d0d0d;
    color: #fff;
    min-height: 100vh;
    padding: 2rem;
    font-family: 'Plus Jakarta Sans', sans-serif;
  }
  
  .heading {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
    color: #e50914;
    text-align: center;
  }
  
  .loading, .error, .no-results {
    text-align: center;
    color: #bbb;
    font-size: 1.2rem;
    margin-top: 3rem;
  }
  
  .results-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
  }
  </style>
  