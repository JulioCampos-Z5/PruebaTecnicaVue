import { createRouter, createWebHistory } from 'vue-router'
import UsersList from '../components/UsersList.vue'
import UserDetails from '../components/UserDetails.vue'

const routes = [
  {
    path: '/',
    name: 'UsersList',
    component: UsersList
  },
  {
    path: '/user/:id',
    name: 'UserDetails',
    component: UserDetails,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
