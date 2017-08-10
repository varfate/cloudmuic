<!-- 个性推荐 -->
<template>
    <div class="reco">
      <!--<div class="banner-wrap" v-if="banner.length">-->
          <!--<banner :banner="banner"></banner>-->
      <!--</div>-->
      <ul class="nav">
          <li><span class="iconfont icon-FM"></span><p class="text">私人FM</p></li>
          <li><span class="iconfont icon-rili"><i>4</i></span><p class="text">每日歌曲推荐</p></li>
          <li><span class="iconfont icon-rank"></span><p class="text">云音乐热歌榜</p></li>
      </ul>
      <!--推荐歌单-->
      <template v-show="recoSongs.length">
        <div class="section-title">
          <span>推荐歌单</span><i class="iconfont icon-jiantou"></i>
        </div>
        <div class="content-wrap recd-wrap">
          <router-link v-for="item in recoSongs" :to="{path:'/songlistdetail',query:{id: item.id,name: encodeURI(item.name) ,coverImgUrl: item.coverImgUrl,copyWriter: item.copywriter}}" :key="item.id" class="recd-item">
            <div class="img-wrap">
              <img :src="item.coverImgUrl" class="u-img">
              <span class="mark"><i class="iconfont icon-erji"></i> {{item.playCount}}</span>
            </div>
            <p class="text word-limit2">{{item.name}}</p>
          </router-link>
        </div>
      </template>
      <!--推荐歌单-->
      <template v-show="recoSongs.length">
        <div class="section-title">
          <span>推荐歌单</span><i class="iconfont icon-jiantou"></i>
        </div>
        <div class="content-wrap recd-wrap">
          <router-link v-for="item in recoSongs" :to="{path:'/songlistdetail',query:{id: item.id,name: encodeURI(item.name) ,coverImgUrl: item.coverImgUrl,copyWriter: item.copywriter}}" :key="item.id" class="recd-item">
            <div class="img-wrap">
              <img :src="item.coverImgUrl" class="u-img">
              <span class="mark"><i class="iconfont icon-erji"></i> {{item.playCount}}</span>
            </div>
            <p class="text word-limit2">{{item.name}}</p>
          </router-link>
        </div>
      </template>
      <!--推荐歌单-->
      <template v-show="recoSongs.length">
        <div class="section-title">
          <span>推荐歌单</span><i class="iconfont icon-jiantou"></i>
        </div>
        <div class="content-wrap recd-wrap">
          <router-link v-for="item in recoSongs" :to="{path:'/songlistdetail',query:{id: item.id,name: encodeURI(item.name) ,coverImgUrl: item.coverImgUrl,copyWriter: item.copywriter}}" :key="item.id" class="recd-item">
            <div class="img-wrap">
              <img :src="item.coverImgUrl" class="u-img">
              <span class="mark"><i class="iconfont icon-erji"></i> {{item.playCount}}</span>
            </div>
            <p class="text word-limit2">{{item.name}}</p>
          </router-link>
        </div>
      </template>
      <div class="loading" v-show="loading">
          <loading width="200px"></loading>
      </div>
    </div>
</template>

<script>
    import Banner from '@/components/Banner'
    import Loading from '@/components/Loading'
    import api from '@/api/api'
    export default {
      data() {
        return {
          loading: true,
          recoSongs: []
        }
      },
      components: {
        Banner,Loading
      },
      computed: {

      },
      methods: {

      },
      created() {

      },
      mounted() {
        axios.get(api.getPlayListByWhere('全部', 'hot', 0, true, 6))
          .then((res) => {
            this.recoSongs = res.data.playlists
            this.loading = false
          })
      }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../../stylus/mixin'
.reco
  width 100%
  overflow-x hidden
  .banner-wrap
      height rem(292)
  .nav
    display: flex
    padding 15px
    border-bottom 1px solid #e3e7e6
    align-items center
    li
      flex 1
      text-align center
      .iconfont
        display block
        margin 0 auto 10px
        text-align center
        width 56px
        height 56px
        padding 12px
        border-radius 50%
        box-sizing border-box
        border 1px solid mc
        color mc
        font-size 28px
        position relative
      i
        position absolute
        left 50%
        top 50%
        transform translate(-50%,-30%)
        margin auto
        font-size 12px
        font-style normal
    .text
      white-space nowrap
      font-size 14px
      line-height 14px
      color #333
  .section-title
    position relative
    height 44px
    padding-left 10px
    &::after
      content ''
      position absolute
      left 0
      top 50%
      transform translateY(-50%)
      height 17px
      width 2px
      background-color mc
    span,.iconfont
      display inline-block
      vertical-align top
      height 100%
      font-size 16px
      line-height 44px
      overflow hidden
    .iconfont
      color #999
      fz(30)
      margin-left rem(15)
.content-wrap
  display flex
  flex-wrap wrap
  &>a
    position relative
    padding-bottom 16px
    display block
    width 33.33%
    padding-left:1px;
    padding-right 1px
    &:first-child
      padding-left 0
      padding-right 2px
    &:last-child
      padding-left:2px
      padding-right:0
    .mark
      position absolute
      right 8px
      top:5px
      font-size 12px
      line-height 16px
      color #fff
      z-index:3
      .iconfont
        font-size 12px
    .text
      padding:6px 2px 0 6px
      font-size 14px
      line-height 18px
.recd-wrap
  li
    display flex
    .img-wrap::after
      content ''
      position absolute
      top 0
      left 0
      width 100%
      height 18px
      background-image linear-gradient(180deg,rgba(0,0,0,.2),transparent)
      z-index 1
.loading
  position relative
  margin-top 30px
  height 300px
</style>
