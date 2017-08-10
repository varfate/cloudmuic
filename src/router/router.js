import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'
const Index = r => require.ensure([], () => r(require('@/pages/index/Index')), 'Index')
const Home = r => require.ensure([], () => r(require('@/pages/index/children/Home')), 'Home')
const Reco = r => require.ensure([], () => r(require('@/pages/index/children/Reco')), 'Reco')
const Topic = r => require.ensure([], () => r(require('@/pages/index/children/Topic')), 'Topic')
const Mine = r => require.ensure([], () => r(require('@/pages/index/children/Mine')), 'Mine')
const SongList = r => require.ensure([], () => r(require('@/pages/index/children/SongList')), 'SongList')
const Radio = r => require.ensure([], () => r(require('@/pages/index/children/Radio')), 'Radio')
const Rank = r => require.ensure([], () => r(require('@/pages/index/children/Rank')), 'Rank')
const SongListDetail = r => require.ensure([], () => r(require('@/pages/detail/SongListDetail')), 'SongListDetail')
const Playboard = r => require.ensure([], () => r(require('@/pages/tools/Playboard')), 'Playboard')
// const Search = r => require.ensure([], () => r(require('@/pages/tools/Search')), 'Search')

Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    {
      path: '/',
      component: App,
      redirect: '/index/home/reco',
      saveScrollPosition: true,
      children: [
        {
          path: 'index',
          component: Index,
          redirect: '/index/home/reco',
          meta: {keepAlive: true},
          children: [
            {
              path: 'Home',
              component: Home,
              children: [
                {
                  path: 'reco',
                  meta: {keepAlive: true},
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
      path: '/playboard/:id',
      component: Playboard
    },
    {
      path: '*',
      redirect: '/'
    }
  ],
  crollBehavior (to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    return savedPosition
  }
})
