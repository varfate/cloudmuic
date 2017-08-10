<template>
  <div class="index">
    <!--头部-->
    <header>
      <span class="iconfont icon-menu menu"></span>
      <div class="nav">
        <router-link to="/index/mine" class="iconfont icon-yinfu2" :class="{active: curPage == 'mine'}"></router-link>
        <router-link :to="'/index/home/'+'reco'" class="iconfont icon-yinfu1" :class="{active: curPage == 'home'}"></router-link>
        <router-link to="/index/topic" class="iconfont icon-19" :class="{active: curPage == 'topic'}" ></router-link>
      </div>
      <span class="iconfont icon-search search"></span>
    </header>
    <div class="router-wrap">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
      <player-mini-gap />
    </div>
  </div>
</template>

<script type="text/javascript">
  import PlayerMiniGap from '@/components/PlayerMiniGap'
  export default {
    data() {
      return {
        line: {
          x: 0,
          w: '25%'
        },
        url:['per-reco','song-list','radio','rank'],
        curPage: 'home',
        swiperOption: {
          autoplay: 3500,
          setWrapperSize :true,
          pagination : '.swiper-pagination',
          paginationClickable :true,
          mousewheelControl : true,
          observeParents:true,
        },
        swiperSlides: [1, 2, 3, 4, 5]
      }
    },
    created() {
      let tmpArr = this.$route.path.split('/')
      if (tmpArr[1] === 'index') {
        this.curPage = tmpArr[2]
      }
    },
    components: {
      PlayerMiniGap
    },
    watch: {
      '$route'(to,from) {
        let tmpArr = to.path.split('/')
        if (tmpArr[1] === 'index') {
          this.curPage = tmpArr[2]
        }
      }
    },
    methods: {

    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../../stylus/mixin"
header
  position fixed
  top 0
  left: 0
  display: flex
  width 100%
  height 50px
  line-height: 50px
  background-color mc
  z-index 990
  .iconfont
    font-size 24px
    color: rgba(255,255,255,.6)
  .menu
    width 2rem
    text-align right
    color: rgba(255,255,255,1)
  .search
    width 2rem
    text-align left
    color: rgba(255,255,255,1)
  .nav
    flex: 1
    text-align center
    a
      padding 0 rem(30)
      display: inline-block
      vertical-align top
      &.active
        color: rgba(255,255,255,1)
.router-wrap
  margin-top: 50px
</style>

