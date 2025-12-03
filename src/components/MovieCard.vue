<template>
  <div class="movie-card" @click="goToDetail">
    <div class="poster-wrapper">
      <img
        :src="posterUrl"
        :alt="movie.title"
        class="poster"
        loading="lazy"
      />
      <div class="overlay">
        <i class="fas fa-play play-icon"></i>
      </div>
    </div>

    <div class="details">
      <h2 class="title">
        {{ movie.title }}
        <span v-if="movie.adult" class="adult-badge">18+</span>
      </h2>
        <div class="overview-block">
        <h2 class="section-heading">📝 Overview</h2>
        <p class="overview">
          {{ movie.overview ? movie.overview : 'No description available for this movie.' }}
        </p>
      </div>


      <div class="info">
        <span class="vote">⭐ {{ movie.vote_average }}</span>
        <span class="popularity">🔥 {{ Math.round(movie.popularity) }}</span>
      </div>

      <div class="meta">
        <span class="date">{{ movie.release_date }}</span>
        <span class="lang">{{ movie.original_language.toUpperCase() }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MovieCard',
  props: {
    movie: {
      type: Object,
      required: true
    }
  },
  computed: {
    posterUrl() {
      return this.movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${this.movie.poster_path}`
        : 'https://via.placeholder.com/300x450?text=No+Image'
    }
  },
  methods: {
    goToDetail() {
      this.$router.push(`/movie/${this.movie.id}`)
    }
  }
}
</script>

<style scoped>
.movie-card {
  background: #1c1c1c;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.6);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  font-family: 'Plus Jakarta Sans', sans-serif;
  position: relative;
}

.movie-card:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 24px rgba(255, 0, 0, 0.3);
}

.poster-wrapper {
  position: relative;
  width: 100%;
  height: 300px;
  overflow: hidden;
}

.poster {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(14, 14, 14, 0.7);
  opacity: 0;
  transition: opacity 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.movie-card:hover .overlay {
  opacity: 1;
}

.play-icon {
  font-size: 32px;
  color: #e50914;
}

.details {
  padding: 1rem;
  color: #fff;
}

.title {
  font-size: 1rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.adult-badge {
  background: #e50914;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
}

.info {
  font-size: 0.9rem;
  display: flex;
  gap: 1rem;
  margin-bottom: 0.3rem;
  color: #bbb;
}

.meta {
  font-size: 0.8rem;
  display: flex;
  justify-content: space-between;
  color: #888;
}
</style>
