<template>

  <div class="homepage">
    <h1 class="main-title">🎬 MovieFlix</h1>

    <div v-for="section in sections" :key="section.title" class="movie-section">
      <div class="section-header">
        <h2 class="section-title">
          <i :class="section.icon" style="color: red;"></i> {{ section.title }}
        </h2>
    </div>

      <div class="movie-grid">
        <MovieCard
          v-for="movie in section.movies.slice(0, section.displayLimit)"
          :key="movie.id"
          :movie="movie"
        />
      </div>

  <!--     <button class="view-more" @click="viewMore(section)">View More</button> -->
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import MovieCard from '@/pages/MovieCard.vue'

export default {
  name: 'HomePage',
  components: { MovieCard },
  data() {
    return {
      apiKey: '43435737ce9b21c469c5ee154ddadf54',
      sections: [
        { title: 'Trending Now', icon: 'fas fa-fire', endpoint: 'trending/movie/week', movies: [], displayLimit: 40 },
        { title: 'Popular Movies', icon: 'fas fa-thumbs-up', endpoint: 'movie/popular', movies: [], displayLimit: 40 },
        { title: 'Top Rated', icon: 'fas fa-star', endpoint: 'movie/top_rated', movies: [], displayLimit: 40 },
        { title: 'Now Playing', icon: 'fas fa-play-circle', endpoint: 'movie/now_playing', movies: [], displayLimit: 40 },
        { title: 'Upcoming Movies', icon: 'fas fa-calendar-alt', endpoint: 'movie/upcoming', movies: [], displayLimit: 40 },
        { title: 'Best of Action', icon: 'fas fa-bolt', endpoint: 'discover/movie?with_genres=28', movies: [], displayLimit: 40 },
        { title: 'Critically Acclaimed', icon: 'fas fa-award', endpoint: 'discover/movie?vote_average.gte=8', movies: [], displayLimit: 40 },
        { title: 'Released This Year', icon: 'fas fa-calendar-alt', endpoint: 'discover/movie?primary_release_year=2025', movies: [], displayLimit: 40 },
        { title: 'Most Voted', icon: 'fas fa-vote-yea', endpoint: 'discover/movie?sort_by=vote_count.desc', movies: [], displayLimit: 40 },
        { title: 'Foreign Gems', icon: 'fas fa-globe-europe', endpoint: 'discover/movie?with_original_language=ja', movies: [], displayLimit: 40 },
      ]
    }
  },

  async created() {
    const baseUrl = 'https://api.themoviedb.org/3/'
    const apiKey = this.apiKey

    for (let section of this.sections) {
      try {
        const fullUrlBase = `${baseUrl}${section.endpoint}`
        const connector = fullUrlBase.includes('?') ? '&' : '?'
        const fullUrl1 = `${fullUrlBase}${connector}api_key=${apiKey}&language=en-US&page=1`
        const fullUrl2 = `${fullUrlBase}${connector}api_key=${apiKey}&language=en-US&page=2`

        const [res1, res2] = await Promise.all([
          axios.get(fullUrl1),
          axios.get(fullUrl2),
        ])

        const merged = [...res1.data.results, ...res2.data.results]
        console.log(`${section.title}: Page 1 = ${res1.data.results.length}, Page 2 = ${res2.data.results.length}`)

        section.movies = merged.slice(0, section.displayLimit)
      } catch (err) {
        console.error(`❌ Failed to load ${section.title}:`, err.message)
        section.movies = []
      }
    }
  }
}
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;700&display=swap');

.homepage {
  background-color: #1a1a1a;
  color: #fff;
  font-family: 'Plus Jakarta Sans', sans-serif;
  padding-bottom: 100px;
  padding-top: 1rem;
  min-height: 100vh;
}

.main-title {
  font-size: 2.8rem;
  font-weight: 800;
  text-align: center;
  margin: 3rem 0 2rem;
  color: #e50914;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.6);
}

.movie-section {
  margin-bottom: 4rem;
}

.section-header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 2rem 1rem;
}

.section-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: #fff;
  border-left: 5px solid #e50914;
  padding-left: 0.8rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
}

.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
  padding: 0 1rem;
}

/* Optional card hover animation if you want to add */
.movie-grid > * {
  transition: transform 0.3s ease;
}
.movie-grid > *:hover {
  transform: scale(1.03);
}

/* Responsive Adjustments */
@media (max-width: 1024px) {
  .section-title {
    font-size: 1.5rem;
  }
  .main-title {
    font-size: 2.2rem;
  }
}

@media (max-width: 768px) {
  .movie-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 1rem;
  }
  .main-title {
    font-size: 2rem;
    margin: 2rem 0;
  }
}

@media (max-width: 480px) {
  .movie-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.8rem;
    padding: 0 1rem;
  }
  .section-title {
    font-size: 1.2rem;
  }
}
</style>
