<template>
    <nav class="navbar">
      <div class="nav-left">
        <router-link to="/" class="logo">🎬 MovieFlix</router-link>
        <router-link to="/" class="nav-item">Home</router-link>
        <!-- Genres Dropdown --> 
      <div class="dropdown" ref="dropdown">
        <span class="nav-item dropdown-toggle" @click="toggleDropdown">Genres ▼</span>
        <ul v-if="showDropdown" class="dropdown-menu">
          <li v-for="genre in genres" :key="genre.id">
            <router-link :to="`/genres/${genre.id}`">{{ genre.name }}</router-link>
          </li>
        </ul>
      </div>
     </div>
  
<div class="search-container">
  <input
    type="text"
    v-model="searchQuery"
    placeholder="Search movies..."
    @input="fetchSuggestions"
    @keydown.enter="goToSearch"
  />
  <button class="search-btn" @click="goToSearch">Search</button>

  <ul v-if="showSuggestions" class="suggestions">
    <li
      v-for="movie in suggestions"
      :key="movie.id"
      @click="() => goToMovie(movie.id)"
    >
      <img :src="getPoster(movie.poster_path)" alt="" />
      <span>{{ movie.title }}</span>
    </li>
    <li v-if="suggestions.length === 0" class="no-result">No movies found</li>
  </ul>
</div>


    </nav>
  </template>
  
  <script>
  import axios from 'axios'
  let timer = null
  
  export default {
    name: 'AppNavbar',
    data() {
      return {
        searchQuery: '',
        suggestions: [],
        genres: [],
        showDropdown: false, 
      }
    },
    computed: {
      showSuggestions() {
        return this.searchQuery.trim() !== ''
      }
    },
     async mounted() {
        await this.fetchGenres()
        document.addEventListener('click', this.handleClickOutside)
      },
        beforeUnmount() {
        document.removeEventListener('click', this.handleClickOutside)
      },
    methods: {
      async fetchSuggestions() {
        clearTimeout(timer)
        if (!this.searchQuery) return this.suggestions = []
        timer = setTimeout(async () => {
          try {
            const res = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
              params: {
                api_key: '43435737ce9b21c469c5ee154ddadf54',
                query: this.searchQuery,
                language: 'en-US',
                page: 1
              }
            })
            this.suggestions = res.data.results.slice(0, 8)
          } catch (err) {
            console.error('Failed to fetch search suggestions:', err)
            this.suggestions = []
          }
        }, 300)
      },
      toggleDropdown() {
        this.showDropdown = !this.showDropdown;
      },
      getPoster(path) {
        return path ? `https://image.tmdb.org/t/p/w92${path}` : 'https://via.placeholder.com/92x138?text=No+Image'
      },
        goToGenre(id) {
          if (this.$route.name === 'GenrePage' && this.$route.params.id === id.toString()) {
            // Manually trigger the watcher again
            this.$forceUpdate(); // or emit a custom event
          } else {
            this.$router.push(`/genre/${id}`);
          }
        }
        ,
        async fetchGenres() {
        if (this.genres.length) return // Avoid fetching twice

        try {
          const res = await axios.get(
            'https://api.themoviedb.org/3/genre/movie/list',
            {
              params: {
                api_key: '43435737ce9b21c469c5ee154ddadf54',
                language: 'en-US'
              }
            }
          )
          this.genres = res.data.genres
        } catch (err) {
          console.error('Failed to fetch genres:', err)
        }
      },
      openDropdown() {
        this.showDropdown = true
        this.fetchGenres()
      },
      closeDropdown() {
        this.showDropdown = false
      },
      goToSearch() {
        const trimmed = this.searchQuery.trim()
        if (!trimmed) return
        this.$router.push({ name: 'SearchPage', params: { query: trimmed } })
        this.searchQuery = ''
        this.suggestions = []
      },

      goToMovie(id) {
        this.searchQuery = ''
        this.suggestions = []
        this.$router.push(`/movie/${id}`)
      }
    }
  }
  </script>
  
  <style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;700&display=swap');

.navbar {
  background-color: #0c0c0c;
  color: #fff;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  font-family: 'Plus Jakarta Sans', sans-serif;
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 0 10px rgba(255, 0, 0, 0.2);
}

.nav-left {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.logo {
  font-weight: 700;
  font-size: 1.6rem;
  color: #e50914;
  text-decoration: none;
  transition: color 0.3s ease;
}
.logo:hover {
  color: #ff3636;
}

.nav-item {
  color: #fff;
  font-weight: 500;
  font-size: 1rem;
  text-decoration: none;
  transition: color 0.3s ease;
}
.nav-item:hover {
  color: #e50914;
}

.dropdown {
  position: relative;
}
.dropdown-toggle {
  cursor: pointer;
}

.dropdown-menu {
  position: absolute;
  top: 110%;
  left: 0;
  width: 180px;
  background-color: #1b1b1b;
  border-radius: 6px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.6);
  z-index: 1001;
  list-style: none;
  padding: 0.3rem 0;
  animation: dropdownFade 0.2s ease-in-out;
}

@keyframes dropdownFade {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.dropdown-menu li {
  width: 100%;
}

.dropdown-menu a {
  display: block;
  padding: 0.6rem 1.2rem;
  color: #fff;
  text-decoration: none;
  font-size: 0.95rem;
  transition: background 0.2s;
}
.dropdown-menu a:hover {
  background-color: #2c2c2c;
}

.search-container {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-top: 0.8rem;
}

.search-container input {
  padding: 0.5rem 0.9rem;
  border-radius: 4px;
  border: none;
  outline: none;
  background-color: #222;
  color: #fff;
  width: 180px;
  transition: width 0.3s ease;
}
.search-container input:focus {
  width: 220px;
  background-color: #2b2b2b;
}

.search-btn {
  background-color: #e50914;
  color: white;
  border: none;
  padding: 0.5rem 0.9rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.95rem;
  transition: background 0.3s ease;
}
.search-btn:hover {
  background-color: #ff1c1c;
}

.suggestions {
  position: absolute;
  top: 115%;
  left: 0;
  width: 100%;
  background-color: #1f1f1f;
  border-radius: 6px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.5);
  z-index: 1002;
  max-height: 570px;
  overflow-y: auto;
}

.suggestions li {
  display: flex;
  align-items: center;
  padding: 0.6rem 1rem;
  border-bottom: 1px solid #333;
  cursor: pointer;
  transition: background 0.2s;
}
.suggestions li:hover {
  background-color: #2d2d2d;
}

.suggestions img {
  width: 40px;
  height: 60px;
  object-fit: cover;
  margin-right: 0.6rem;
  border-radius: 3px;
}

.no-result {
  padding: 0.6rem 1rem;
  color: #aaa;
  text-align: center;
  font-size: 0.95rem;
}

/* Responsive */
@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
    align-items: flex-start;
    padding: 1rem;
  }

  .search-container {
    width: 100%;
    margin-top: 1rem;
    justify-content: space-between;
  }

  .search-container input {
    flex-grow: 1;
    width: 100%;
  }

  .nav-left {
    flex-wrap: wrap;
    gap: 1rem;
  }

  .dropdown-menu {
    width: 100%;
  }
}

</style>
 
