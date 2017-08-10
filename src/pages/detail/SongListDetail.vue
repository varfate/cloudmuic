<template>
  <div class="song-list-detail" >
    <div class="header">
      <div class="bg" :style="{backgroundImage:'url('+($route.query.coverImgUrl ? $route.query.coverImgUrl : listInfo.coverImgUrl)+')',opacity: headerOpacity }"></div>
      <div class="content">
        <p class="go-back iconfont icon-back" @click="goBack"></p>
        <p class="title ellipsis">
          <span class="ellipsis">歌单</span>
          <span class="ellipsis" v-if="$route.query.copyWriter">{{$route.query.copyWriter}}</span>
        </p>
        <p class="search iconfont icon-search"></p>
        <p class="action iconfont icon-dian"></p>
      </div>
    </div>
    <!--歌单信息-->
    <div class="wrap">
      <div class="info-wrap" :style="{opacity: 1 - headerOpacity}">
        <div class="bg" :style="{backgroundImage:'url('+($route.query.coverImgUrl ? $route.query.coverImgUrl : listInfo.coverImgUrl)+')'}"></div>
        <div class="content" ref="infoContent">
          <div class="row">
            <div class="cd">
              <div class="img-wrap">
                <img :src="($route.query.coverImgUrl ? $route.query.coverImgUrl : listInfo.coverImgUrl)">
              </div>
              <p class="cdbg">
                <span class="tran"></span>
                <span class="s-black"></span>
                <span class="b-black"></span>
              </p>
            </div>
            <div class="song-info">
              <p class="title">{{!decodeURI($route.query.name) ?decodeURI($route.query.name) : listInfo.name }}</p>
              <p class="singer">歌手：奇奇</p>
              <p class="time">发行日期：{{listInfo.createTime}}</p>
            </div>
          </div>
          <ul class="operation">
              <li class="item">
                <p class="iconfont icon-folderadd"></p>
                <p class="count">{{listInfo.subscribedCount}}</p>
              </li>
              <li class="item">
                <p class="iconfont icon-pinglun"></p>
                <p class="count">{{listInfo.commentCount}}</p>
              </li>
              <li class="item">
                <p class="iconfont icon-fenxiang"></p>
                <p class="count">{{listInfo.shareCount}}</p>
              </li>
              <li class="item">
                <p class="iconfont icon-xiazai"></p>
                <p class="count">下载</p>
              </li>
            </ul>
        </div>
      </div>
      <div class="loading" v-show="!listContent.length">
        <loading></loading>
      </div>
      <!--歌曲列表-->
      <div class="list-wrap" ref="list">
        <ul class="list-inner" ref="listContent">
          <li v-show="listContent.length">
            <p class="play-all">
              <i class="iconfont icon-all"></i>播放全部<span class="all-count">(共{{listContent.length}}首)</span>
            </p>
            <p class="multi-select"><i class="iconfont"></i>多选</p>
          </li>

          <li class="list-item" v-for="(item, index) in listContent" :key="item.id">
            <span class="num" v-if="listInfo.ordered">{{index+1}}</span>
            <div :to="{name:'Playboard',params:{id:item.id}}" class="name ellipsis" @click="addPlayOneSong(item)">
              <p class="song-name ellipsis">{{item.name}}</p>
              <p class="singer ellipsis">{{item.ar[0].name}}<span v-if="item.al.name"> - </span>{{item.al.name}}</p>
            </div>
            <span class="option iconfont icon-dian"></span>
          </li>
        </ul>
      </div>
    </div>
    <player-mini-gap />
  </div>
</template>

<script>
  import {formatDate} from '@/js/utils'
  import Loading from '@/components/Loading'
  import PlayerMiniGap from '@/components/PlayerMiniGap'
  import {mapState, mapMutations} from 'vuex'
  import api from '@/api/api'
  const INFO_HEIGHT = 200 // 歌单介绍滚动高度
  export default {
    data() {
      return {
        headerOpacity: .01,
        bscrollOut: null,
        bscrollInner: null,
        listInfo: {},
        listContent: [],
        h: 0, // 屏幕高度
        outY: 0,
        innerY: 0
      }
    },
    mounted() {
      console.log(this.$route.query.id)
      this.initData()
      window.onscroll = this.winScroll
      this.$nextTick(() => {
        this.outY = this.$refs.infoContent.getBoundingClientRect().height
      })
      this.listContent = []
    },
    beforeRouteLeave(to, from, next) {
      window.onscroll = null
      next()
    },
    watch: {
      '$route'(to, from) {
        this.initData()
      }

    },
    computed: {
      ...mapState([
        'audio',
        'isPlaying',
        'currentTime',
        'durationTime',
        'index',
        'list'])
    },
    methods: {
      ...mapMutations(['setAudioIndex','addToList', 'play']),
      // 初始化数据
      initData() {
        let tmpArr = this.$route.path.split('/')
        if('songlistdetail' == tmpArr[1]) {
          axios.get(api.getPlayListDetail(this.$route.query.id))
            .then((res) => {
              this.listInfo = res.data.playlist
              // 格式化时间
              this.listInfo.createTime = formatDate(this.listInfo.createTime,'yyyy.MM.dd')
              this.listContent = this.listInfo.tracks
            })
        }
      },
      goBack() {
        this.$router.go(-1)
      },
      //  窗口滚动，改变header的透明度
      winScroll() {
        let top = Math.abs(document.documentElement.scrollTop || document.body.scrollTop)
        if(top >= INFO_HEIGHT) {
          this.headerOpacity=1
          return
        }
        this.headerOpacity = top / INFO_HEIGHT
      },
      // 点击歌曲，添加至列表并播放
      addPlayOneSong(song) {
          let audio = {
            id: song.id,
            name: song.name,
            singer: song.ar[0].name,
            picUrl: song.al.picUrl, // 默认图片
            src:''  // 歌曲链接
          };
        // 检查是否重复
        //  把list转化为Map对象(用forEach无法打断循环，直接用for...of 无法获取index，所以需要先转化,为了练习新语法)
        let arrList = this.list.map((item, index) => [index, item])
        let mapList = new Map(arrList);
        for([index, item] of mapList) {
          //  如果列表中已经包含了这首歌曲，直接播放
          if (item.id == song.id) {
            this.$store.commit('setAudioIndex', index)
            return
          }
        }
        this.$store.commit('addToList', audio)
        this.$store.commit('setAudioIndex', this.list.length - 1)
        this.$store.commit('play')
        console.log(this.list)
      }
    },
    components: {
      Loading,PlayerMiniGap
    }
  }
</script>

<style lang="stylus" scoped>
@import '../../stylus/mixin'
body
  allcover()
  overflow-x hidden
  overflow-y auto
.wrap
  position relative
  height 100%
.header
  position fixed
  top 0
  left 0
  width 100%
  height 60px
  padding 0 18px
  color #fff
  background-color rgba(0,0,0,.05)
  z-index 999
  .content
    position: relative
    display flex
    align-items center
    width 100%
    z-index 3
  .iconfont
    height 60px
    line-height 60px
    font-size 24px
  .go-back
    padding 0
  .title
    flex 1
    padding 0 18px
    &>span
      display block
      width 100%
      &:first-child
        font-size 18px
        line-height 20px
      &:nth-child(2)
        font-size 10px
        color rgba(255,255,255,.5)

.bg
  position absolute
  width 100%
  height 100%
  left 0
  top 0
  background-size cover
  background-color #000
  z-index 1
  overflow hidden
.info-wrap
  position relative
  height 260px
  overflow hidden
  z-index 4
  .bg
    filter blur(60px)
  &>div
    width 100%
    position absolute
    left 0
    bottom 0
  .content
    height 200px
    z-index 2
    background-color rgba(0,0,0,.05)
    .row
      display flex
      margin 0 25px 25px
      .cd
        position relative
        padding-right 34px
        .img-wrap
          width 130px
          height 130px
          background-color #fff
          position relative
          z-index 2
          img
            center()
            width 130px
            height auto
            max-height 130px
        .cdbg
          position absolute
          right 0
          top 0
          width 34px
          height 130px
          z-index 1
          .tran
            position absolute
            left 0
            top 3px
            width 5px
            height 125px
            box-shadow 0 0 2px 0 rgba(0,0,0,.3)
            background-color rgba(255,255,255,.2)
            z-index 2
          .s-black
            position absolute
            left -3px
            top 57px
            width 16px
            height 16px
            border-radius 50%
            background-color #000
            z-index 2
          .b-black
            position absolute
            left -110px
            top 0
            width 130px
            height 130px
            border-radius 50%
            background-color #000
            z-index 1
      .song-info
        flex 1
        .title
          font-size 14px
          line-height 22px
          margin-bottom 5px
          color #fff
        .singer,.time
          font-size 12px
          line-height 24px
          color rgba(255,255,255,.5)
    .operation
      display flex
      .item
        flex 1
        text-align center
        color #fff
        font-size 16px
        .iconfont
          line-height 16px
          margin-bottom 5px
        .count
          font-size 14px
          line-height 14px
.list-wrap
  position relative
  padding 0 15px
  overflow hidden
  background-color #fff
  z-index 3
  li:first-child
    display flex
    align-items center
    height 50px
    line-height: 50px
    font-size 16px
    border-bottom 1px solid #ddd
    .play-all
      flex 1

      .iconfont
        margin-right 8px
      span
        margin-left 5px
        font-size 12px
  .list-item
    display flex
    align-items center
    .num
      display block
      width 30px
      height 54px
      line-height 54px
      font-size 14px
      text-align center
      color #8f9190
    .name
      flex 1
      padding 11px 0 10px
      box-shadow 0 1px 0 0 rgba(200,200,200,.3)
      .song-name
        margin-bottom 7px
        font-size 14px
        line-height 15px
      .singer
        font-size 12px
        line-height 13px
        color #8f9190
    .option
      display block
      width 30px
      height 55px
      text-align center
      line-height 55px
      color #8f9190
      box-shadow 0 1px 0 0 rgba(200,200,200,.3)
.loading
  height 300px
  position relative
</style>
