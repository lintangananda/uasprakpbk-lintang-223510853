// FILE: src/router/index.js

import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import WeatherPage from '../pages/WeatherPage.vue'
import TaskPage from '../pages/TaskPage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },

  { path: '/weather', component: WeatherPage },
  { path: '/task/:taskName', component: TaskPage, name: 'Task' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
