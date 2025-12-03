<template>
  <router-link :to="`/movie/${movie.id}`" class="movie-card">
    <div class="poster-wrapper">
      <img
        class="poster"
        :src="posterUrl"
        :alt="movie.title"
        loading="lazy"
        @error="handleImageError"
      />
    </div>
    <div class="info">
      <h3 class="title" :title="movie.title">{{ truncatedTitle }}</h3>
      <p class="meta"><i class="fas fa-star" style="font-size: 17px; color: #ffd700;"></i> {{ Math.floor(movie.vote_average * 10) / 10 }} • {{ movie.original_language.toUpperCase() }} •  {{ movie.release_date }}</p>  
      <p class="meta"></p>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'MovieCard',
  props: {
    movie: Object,
  },
  data() {
    return {
      fallbackImage: require('@/assets/no-movie.png'),
      imageErrored: false,
    }
  },
  computed: {
    posterUrl() {
      return !this.imageErrored && this.movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${this.movie.poster_path}`
        : this.fallbackImage;
    },
    truncatedTitle() {
      return this.movie.title.length > 22
        ? this.movie.title.slice(0, 22) + '...'
        : this.movie.title;
    }
  },
  methods: {
    handleImageError(e) {
      this.imageErrored = true;
      e.target.src = this.fallbackImage;
    }
  }
}
</script>

<style scoped>
.movie-card {
  background-color: #1a1a1a;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  color: #fff;
  height: 90%;
}

.movie-card:hover {
  transform: scale(1.03);
  box-shadow: 0 12px 30px rgba(229, 9, 20, 0.5);
}

.poster-wrapper {
  width: 100%;
  height: 300px;
  background: #0b0c2a;
  display: flex;
  align-items: center;
  justify-content: center;
}

.poster {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-bottom: 2px solid #111;
}

.info {
  padding: 0.6rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.title {
  font-size: 1rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 0.2rem;
}

.meta {
  font-size: 0.85rem;
  color: #ccc;
}
</style>