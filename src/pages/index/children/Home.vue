<template>
  <div class="home">
    <ul class="nav">
      <li v-for="link in nav">
        <router-link :to="'/index/home/'+link.url" :class="{active: curPage == link.url}" ref="navItem">{{link.name}}</router-link>
      </li>
      <span class="line" :style="{transform: 'translateX('+line.x+')'}"></span>
    </ul>
    <div class="router-wrap">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script type="text/javascript">
  export default {
    data() {
      return {
        line: {
          x: 0,
          w: '25%'
        },
        nav:[{
          url: 'reco',
          name: '个性推荐'
        },{
          url: 'songlist',
          name: '歌单'
        }, {
          url: 'radio',
          name: '主播电台'
        }, {
          url: 'rank',
          name: '排行榜'
        }],
        curPage: 'reco',
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
      // 根据路由，判断导航的状态(防止刷新错误)
      let tmpArr = this.$route.path.split('/')
      if (tmpArr[2] === 'home') {
        this.curPage = tmpArr[3]
        for(var i=0; i< this.nav.length; i++) {
          if(this.nav[i].url == tmpArr[3]) break;
        }
        this.$nextTick(() => {
          this.line.x = this.$refs.navItem[i].$el.offsetLeft + 'px'
          this.line.w = this.$refs.navItem[i].$el.clientWidth + 'px'
        })
      }
    },
    watch: {
      '$route'(to, from) {
        let tmpArr = to.path.split('/');
        if(tmpArr[2] === 'home') {
          this.curPage = tmpArr[3]
          for(var i=0; i< this.nav.length; i++) {
            if(this.nav[i].url == tmpArr[3]) break;
          }
          this.$nextTick(() => {
            this.line.x = this.$refs.navItem[i].$el.offsetLeft + 'px'
            this.line.w = this.$refs.navItem[i].$el.clientWidth + 'px'
          })
        }

      }
    },
    methods: {

    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../../stylus/mixin"
  .nav
    width: 100%
    display: flex
    position relative
    li
      flex 1
      color: #666
      text-align center
      font-size 15px
      &>a
        display block
        height 50px
        line-height: 50px
        &.active
          color: mc
    .line
      width: 25%
      height 2px
      background-color: mc
      position: absolute
      left 0
      bottom 0
      transition all .3s ease-out
</style>

