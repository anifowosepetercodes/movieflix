<template>
  <div class="not-found">
    <h1>404 - Page Not Found</h1>
    <p>The page you’re looking for doesn’t exist.</p>
    <router-link to="/" class="home-link">Go back home</router-link>
  </div>
</template>

<style scoped>
.not-found {
  text-align: center;
  padding: 5rem 1rem;
  color: white;
  background-color: #0d0d0d;
}
h1 {
  font-size: 3rem;
  color: #e50914;
}
.home-link {
  display: inline-block;
  margin-top: 1.5rem;
  background: #e50914;
  padding: 0.6rem 1.2rem;
  color: white;
  border-radius: 5px;
  text-decoration: none;
}
</style>
