<template>
  <div class="playboard">
    <div class="bg">
      <div class="bg-img" :style="{backgroundImage: 'url('+audio.picUrl+')'}"></div>
      <div class="bg-color"></div>
    </div>
    <div class="song">
      <!--头部-->
      <div class="header">
        <p class="go-back iconfont icon-back" @click="goBack"></p>
        <p class="title ellipsis">
          <span class="ellipsis">{{audio.name}}</span>
          <span class="ellipsis">{{audio.name}}</span>
        </p>
        <p class="action iconfont icon-fenxiang"></p>
      </div>
      <!-- 封面 -->
      <div class="cover" :class="{rotate: isPlaying}"><img :src="audio.picUrl"></div>
      <div class="operation">
        <div></div>
        <!--进度条-->
        <div class="progress">
          <span class="time cur-time">{{curTime}}</span>
          <p class="line" :style="{background:'linear-gradient(to right,rgba(255,255,255,.9) 0%,rgba(255,255,255,.9) '+curRate+'%,rgba(255,255,255,.3) '+curRate+'%,rgba(255,255,255,.3) 100%)'}" ref="progLine">
            <span class="dot" :style="{transform: 'translateX('+dotX+'px)'}"></span>
          </p>
          <span class="time total-time">{{durationTime}}</span>
        </div>
        <!--按钮-->
        <div class="btns">
          <p class="mode iconfont icon-liebiaoxunhuan" @click=""></p>
          <p class="prev iconfont icon-prev" @click="prev"></p>
          <p class="play-pause" @click="togglePlayStatus">
            <span v-show="!isPlaying" class="iconfont icon-play"></span>
            <span v-show="isPlaying" class="iconfont icon-pause"></span>
          </p>
          <p class="next iconfont icon-next" @click="next"></p>
          <p class="list iconfont icon-listview" @click=""></p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {formatDate} from '@/js/utils'
  import api from '@/api/api'
  import {mapState, mapMutations} from 'vuex'
  export default {
    data() {
      return {
        curRate: 0,          // 当前进度条背景色的比例
        raf: null,          // 动画返回的一个ID值，通过把这个ID值传给window.cancelAnimationFrame()可以取消该次动画。
        progWidth: null,    // 进度条宽度
        dotX: null,         // 进度条上小球的（translateX）位置
        curTime: '00:00',      // 当前时间
        durationTime: '--:--'  // 歌曲总时间
      }
    },
    methods: {
      ...mapMutations(['setAudioIndex','addToList', 'pause']),
      prev() {

      },
      next() {

      },
      togglePlayStatus() {
        if(this.isPlaying) {
          this.$store.commit('pause')
          document.getElementById('song').pause()
        } else {
          this.$store.commit('play')
          document.getElementById('song').play()
        }
      },
      goBack() {
        this.$router.go(-1)
      },
      // 进度条
      progress() {
          this.raf = requestAnimationFrame(() => {
            this.curRate = this.audio.currentTime / this.audio.duration * 100
            this.dotX = this.progWidth * this.curRate / 100
            this.curTime = formatDate(Math.ceil(this.audio.currentTime * 1000),'mm:ss')
            this.progress()
          })

      }
    },
    created() {
      
    },
    computed: {
      ...mapState(['audio', 'isPlaying'])
    },
    activated() {
//      axios.get(BASEURL+'/music/url?id='+id)
//      .then((res) => {
//        that.url = res.data.data[0].url
//        that.$nextTick(() => {
//          that.audio = that.$refs.audio
//          that.audio.src = that.url
//          // 获取进度条的宽度
//          that.progWidth = this.$refs.progLine.getBoundingClientRect().width
//          console.log(that.progWidth)
//          // 当元数据（比如分辨率和时长）被加载时运行的脚本
//          that.audio.addEventListener('loadedmetadata', () => {
//            that.durationTime = formatDate(Math.ceil(that.audio.duration * 1000),'mm:ss')
//          })
//          // 播放的时候
//          that.audio.addEventListener('play', () => {
//          // 开始动画
//            that.progress()
//          })
//          // 暂定时
//          that.audio.addEventListener('pause', () => {
//            // 清除动画
//            cancelAnimationFrame(that.raf)
//            that.isPlaying = false
//          })
//        })
//
//      })
//      .catch((err) => {
//        console.log("错误："+err)
//      })
    }
  }
</script>
<style lang="stylus">
@import '../../stylus/mixin'
.playboard
  allcover()
  z-index 999
  .bg
    allcover()
    z-index 1
    .bg-img
      position absolute
      width 100%
      height 100%
      filter blur(50px)
      background-size 100% 100%
    .bg-color
      position absolute
      width 100%
      height 100%
      background-color rgba(0,0,0,.6)
  .song
    allcover()
    z-index 3
    .header
      display flex
      align-items center
      width 100%
      height 60px
      padding 0 18px
      background-color transparent
      color #fff
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
    .cover
      width rem(500)
      height rem(500)
      padding rem(80)
      background-color rgba(0,0,0,1)
      center()
      top 43%
      border-radius 50%
      overflow hidden
      border 4px solid rgba(255,255,255,.2)
      img
        border-radius 50%
        width 100%
        height 100%
    .rotate
      animation rotate 30s linear 0s infinite
    .operation
      position absolute
      bottom 4%
      width 100%
      .progress
        position relative
        margin-bottom 20px
        .time
          position absolute
          top -6px
          font-size 12px
          line-height: 12px
          padding 0 10px
        .cur-time
          color rgba(255,255,255,.6)
          right 82%
        .total-time
          color rgba(255,255,255,.3)
          left 82%
        .line
          position relative
          margin 0 auto
          width 60%
          height 2px
          background-color rgba(255,255,255,.3)
          .dot
            position absolute
            left -7px
            top -6px
            width: 14px
            height 14px
            border-radius 50%
            background-color: rgba(255,255,255,.9)
      .btns
        width 100%
        height 50px
        display flex
        align-items center
        color rgba(255,255,255,.9)
        p
          flex 1
          text-align center
          font-size 24px
          position relative
          line-height 50px
        .play-pause
          span
            font-size 24px
          &::after
            content: ''
            position: absolute
            width: 46px
            height 46px
            center()
            border 1px solid #fff
            border-radius 50%
</style>
