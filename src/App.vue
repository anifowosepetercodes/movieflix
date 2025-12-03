<template>
  <div id="app">
    <AppNavbar />
    <router-view /> 
    <FooterSection />
    <button v-show="scrollY > 300" @click="scrollToTop" class="scroll-btn">↑</button>
  </div>
</template>

<script>
import AppNavbar from './components/AppNavbar.vue'
import FooterSection from './components/FooterSection.vue'

export default {
  components: { AppNavbar, FooterSection },
  data() {
    return { scrollY: 0 }
  },
  mounted() {
    window.addEventListener('scroll', () => {
      this.scrollY = window.scrollY
    })
  },
  methods: {
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }
}
</script>

<style scoped>
body {
  margin: 0;
  font-family: 'Plus Jakarta Sans', sans-serif;
  background: #0b0c2a;
  color: white;
}
.scroll-btn {
  position: fixed;
  bottom: 30px;
  right: 30px;
  background: #e50914;
  color: #fff;
  border: none;
  padding: 0.6rem 1rem;
  border-radius: 50%;
  font-size: 1.2rem;
  cursor: pointer;
  box-shadow: 0 0 10px rgba(0,0,0,0.4);
  z-index: 999;
}
</style>
