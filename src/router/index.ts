import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Home from '../views/HomeView.vue'
import Profile from '../views/ProfileView.vue'
import Login from '../views/LoginView.vue'
import Register from '../views/RegisterView.vue'
import UserDirectory from '../views/UserdirectoryView.vue'
import UserUpdate from '../views/UserupdateView.vue'
import UserAdd from '../views/UseraddView.vue'

const routes: Array<RouteRecordRaw> = [
  { path: '/', component: Home },
  { path: '/profile', component: Profile },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/user-directory', component: UserDirectory },
  { path: '/user-add', component: UserAdd },
  { path: '/user-update/:id', component: UserUpdate }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
