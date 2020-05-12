import Vue from 'vue'
import VueRouter from 'vue-router'
// import Main from '../components/main.vue'
const Main = () => import(/* webpackChunkName: "main" */ '../components/main.vue')
// import Homepage from '../components/homepage.vue'
const Homepage = () => import(/* webpackChunkName: "homepage" */ '../components/homepage.vue')
// import User from '../components/user.vue'
const User = () => import(/* webpackChunkName: "user" */ '../components/user.vue')
// import Editor from '../components/editor.vue'
const Editor = () => import(/* webpackChunkName: "editor" */ '../components/editor.vue')
// import Article from '../components/article.vue'
const Article = () => import(/* webpackChunkName: "article" */ '../components/article.vue')
// import Question from '../components/question.vue'
const Question = () => import(/* webpackChunkName: "question" */ '../components/question.vue')
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Main,
    redirect: '/homepage',
    children: [
      { path: '/homepage', component: Homepage },
      {
        path: '/:id', component: User
      },
      { path: '/editor/:type', component: Editor },
      { path: '/article/:id', component: Article },
      { path: '/question/:id', component: Question }
    ]
  }
]
const router = new VueRouter({
  routes
})

export default router
