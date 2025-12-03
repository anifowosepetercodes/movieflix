<template>
  <div class="hero-section">
    <div class="content">
      <img src="@/assets/hero.png" alt="Snack Image" class="top-image" />
      <h1>Find Movies You'll Enjoy Without the Hassle</h1>
    </div>
  </div>
</template>


<script>
export default {
  name: 'HeroSection'
};
</script>
<style scoped>
.hero-section {
  background-image: url('@/assets/hero-bg.png'); /* Background image */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
}

.top-image {
  width: 300px;
  height: 300px;
  margin: 1rem 0;
}
</style>
