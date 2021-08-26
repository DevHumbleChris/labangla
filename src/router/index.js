import Vue from 'vue'
import VueRouter from 'vue-router'
import Homepage from '@/views/Homepage.vue'
import NewPost from '@/views/NewPost.vue'
import Post from '@/views/Post.vue'
import Error404 from '@/views/Error.vue'
import Feeds from '@/views/Feeds.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Homepage
  },
  {
    path: '/new-post',
    name: 'NewPost',
    component: NewPost
  },
  {
    path: '/post/:id',
    name: 'Post',
    component: Post
  },
  {
    path: '/feeds',
    name: 'Feeds',
    component: Feeds
  },
  {
    path: '*',
    name: 'Error404',
    component: Error404
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
