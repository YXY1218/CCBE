import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import index from '../components/index.vue'
import searchWeb from '../components/searchWeb.vue'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    { path: '/', redirect: '/index' },
    { path: '/Login', component: Login },
    { path: '/index', component: index },
    { path: '/searchWeb', component: searchWeb }
  ]
})
