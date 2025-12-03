import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import SearchPage from '@/pages/SearchPage.vue'
import MovieDetail from '@/pages/MovieDetail.vue'

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/search/:query', name: 'SearchPage', component: SearchPage },
  { path: '/genres/:id', name: 'GenrePage', component: () => import('@/pages/GenrePage.vue')},
  { path: '/movie/:id', name: 'MovieDetail', component: MovieDetail },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('@/pages/NotFound.vue') }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

