import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BookView from '../views/BookView.vue'
import AuthorView from '../views/AuthorView.vue'
import PublisherView from '../views/PublisherView.vue'
import EquipmentView from '../views/EquipmentView.vue'
import TypeView from '../views/TypeView.vue'
import GenreView from '../views/GenreView.vue'
import OrderView from '../views/OrderView.vue'
import MyOrderView from '../views/MyOrderView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },{
    path: '/order',
    name: 'order',
    component: OrderView
  },{
    path: '/my-order',
    name: 'my-order',
    component: MyOrderView
  },{
    path: '/equipment',
    name: 'equipment',
    component: EquipmentView
  },{
    path: '/genres',
    name: 'genres',
    component: GenreView
  },{
    path: '/book-types',
    name: 'type',
    component:TypeView
  },{
    path: '/authors',
    name: 'author',
    component: AuthorView
  },{
    path: '/publishers',
    name: 'publisher',
    component: PublisherView
  },
  {
    path: '/books',
    name: 'book',
    component: BookView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
