import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'
const Index = () => import('@/pages/index/Index')
const Home = () => import('@/pages/index/children/Home')
const Reco = () => import('@/pages/index/children/Reco')
const Topic = () => import('@/pages/index/children/Topic')
const Mine = () => import('@/pages/index/children/Mine')
const SongList = () => import('@/pages/index/children/SongList')
const Radio = () => import('@/pages/index/children/Radio')
const Rank = () => import('@/pages/index/children/Rank')
const SongListDetail = () => import('@/pages/detail/SongListDetail')
const Playboard = () => import('@/pages/tools/Playboard')
// const Search = () => import('@/pages/tools/Search')

Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    {
      path: '/',
      component: App,
      redirect: '/index/home/reco'
    },
    {
      path: '/index',
      component: Index,
      redirect: '/index/home/reco',
      meta: { keepAlive: true },
      children: [
        {
          path: 'Home',
          component: Home,
          children: [
            {
              path: 'reco',
              meta: { keepAlive: true },
              component: Reco
            },
            {
              path: 'songlist',
              component: SongList
            },
            {
              path: 'radio',
              component: Radio
            },
            {
              path: 'rank',
              component: Rank
            }
          ]
        },
        {
          path: 'mine',
          component: Mine,
        },
        {
          path: 'topic',
          component: Topic,
        }
      ]
    },
    {
      name: 'SongListDetail',
      path: '/songlistdetail',
      component: SongListDetail
    },
    {
      name: 'Playboard',
      path: '/playboard',
      component: Playboard
    },
    {
      path: '*',
      redirect: '/'
    }
  ],
  crollBehavior(to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    return savedPosition
  }
})
