<!-- pages/MovieDetail.vue -->
<template>
  <div v-if="movie" class="movie-detail">
    <div class="backdrop" :style="{ backgroundImage: `url(${backdropUrl})` }"></div>

    <div class="detail-content">
      <img class="poster" :src="posterUrl" alt="Poster" />

      <div class="info">
        <h1 class="title">{{ movie.title }}</h1>
        <p class="meta">
          <i class="fas fa-star" style="font-size: 17px; color: #ffd700;"></i> {{ movie.vote_average }} | <i class="fas fa-calendar-alt" style="font-size: 17px; color: #4caf50;"></i> {{ movie.release_date }} | <i class="fas fa-language" style="font-size: 17px; color: #ff9800;"></i> {{ movie.original_language.toUpperCase() }}
        </p>

        <p class="overview">
          {{ movie.overview || 'No description available for this movie.' }}
        </p>

        <div v-if="trailerUrl" class="trailer">
          <h3><i class="fas fa-play-circle" style="font-size: 17px; color: #f44336;"></i> Trailer</h3>
          <iframe
            :src="trailerUrl"
            width="100%"
            height="400"
            frameborder="0"
            allowfullscreen
          ></iframe>
        </div>

        <router-link to="/" class="back-btn">⬅ Back to Home</router-link>
      </div>
    </div>
  </div>

  <div v-else class="loading">Loading movie details...</div>
</template>


<script>
import axios from 'axios'

export default {
  name: 'MovieDetail',
  data() {
    return {
      movie: null,
      trailerUrl: null,
    }
  },
  async created() {
    const id = this.$route.params.id
    const apiKey = '43435737ce9b21c469c5ee154ddadf54'

    try {
      const [movieRes, videoRes] = await Promise.all([
        axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`),
        axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}&language=en-US`)
      ])

      this.movie = movieRes.data

      const trailer = videoRes.data.results.find(
        vid => vid.type === 'Trailer' && vid.site === 'YouTube'
      )
      this.trailerUrl = trailer ? `https://www.youtube.com/embed/${trailer.key}` : null
    } catch (err) {
      console.error('Failed to fetch movie details:', err)
    }
  },
    computed: {
      posterUrl() {
        return this.movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${this.movie.poster_path}`
          : require('@/assets/fall.jpg'); // 
      },
      backdropUrl() {
        return this.movie.backdrop_path
          ? `https://image.tmdb.org/t/p/original${this.movie.backdrop_path}`
          : 'https://via.placeholder.com/1280x720?text=No+Backdrop';
      }
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;700&display=swap');

.movie-detail {
  background: #0e0e0e;
  color: white;
  font-family: 'Plus Jakarta Sans', sans-serif;
  min-height: 100vh;
  overflow-x: hidden;
}

.backdrop {
  height: 320px;
  background-size: cover;
  background-position: center;
  filter: brightness(0.3);
  border-bottom: 4px solid #e50914;
}

.detail-content {
  display: flex;
  flex-wrap: wrap;
  gap: 2.5rem;
  padding: 2rem 5%;
  margin-top: -180px;
  position: relative;
  z-index: 1;
  justify-content: center;
}

.poster {
  width: 500px;
  max-width: 90vw;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.7);
  transition: transform 0.3s ease;
}
.poster:hover {
  transform: scale(1.02);
}

.info {
  flex: 1;
  max-width: 700px;
}

.title {
  font-size: 2.5rem;
  color: #e50914;
  font-weight: 700;
  margin-bottom: 0.4rem;
  line-height: 1.2;
}

.meta {
  color: #ccc;
  font-size: 1rem;
  margin-bottom: 1.2rem;
  font-weight: 500;
}

.overview {
  color: #ddd;
  font-size: 1.05rem;
  line-height: 1.7;
  margin-bottom: 2rem;
}

.trailer {
  margin-bottom: 2rem;
}
.trailer h3 {
  margin-bottom: 1rem;
  color: #fff;
  font-size: 1.3rem;
  font-weight: 600;
}
.trailer iframe {
  border-radius: 10px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.6);
  max-width: 100%;
}

.back-btn {
  display: inline-block;
  background: #e50914;
  color: white;
  padding: 0.7rem 1.4rem;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
  transition: background 0.3s ease;
}
.back-btn:hover {
  background: #b0060f;
}

/* Responsive */
@media (max-width: 768px) {
  .detail-content {
    flex-direction: column;
    margin-top: -120px;
    gap: 2rem;
    padding: 1.5rem 1rem;
  }

  .title {
    font-size: 2rem;
  }

  .meta {
    font-size: 0.95rem;
  }

  .overview {
    font-size: 1rem;
  }

  .poster {
    width: 100%;
    max-width: 280px;
    margin: 0 auto;
  }

  .trailer iframe {
    height: 220px;
  }
}

</style>
