<template>
  <div class="genre-page">
    <h1 class="genre-title" v-if="!loading">
      Movies in Genre: {{ genreName }}
   </h1>


    <div v-if="loading">Loading movies...</div>
    <div v-else>
      <div v-if="movies.length" class="grid">
        <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie" />
      </div>
      <div v-else>No movies found for this genre.</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import MovieCard from '@/pages/MovieCard.vue'

export default {
  name: 'GenrePage',
  components: { MovieCard },
  data() {
    return {
      movies: [],
      genreName: '',
      loading: true,
    }
  },
  watch: {
    '$route.params.id': {
      immediate: true,
      handler(newId) {
        this.fetchGenreMovies(newId)
      }
    }
  },
  methods: {
    async fetchGenreMovies(genreId) {
      this.loading = true
      const apiKey = '43435737ce9b21c469c5ee154ddadf54'

      try {
        // Build URLs for page 1 and 2
        const baseUrl = `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}`
        const url1 = `${baseUrl}&api_key=${apiKey}&language=en-US&page=1`
        const url2 = `${baseUrl}&api_key=${apiKey}&language=en-US&page=2`

        const [res1, res2, genreListRes] = await Promise.all([
          axios.get(url1),
          axios.get(url2),
          axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`)
        ])

        this.movies = [...res1.data.results, ...res2.data.results]

        const genreObj = genreListRes.data.genres.find(g => g.id === Number(genreId))
        this.genreName = genreObj ? genreObj.name : 'Unknown Genre'
      } catch (err) {
        console.error('Error fetching genre movies:', err)
        this.movies = []
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.genre-page {
  padding: 2rem;
  background-color: #0d0d0d;
  min-height: 100vh;
  color: white;
}

.genre-title {
  font-size: 2rem;
  color: #e50914;
  margin-bottom: 1.5rem;
  text-align: center;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
}
</style>
