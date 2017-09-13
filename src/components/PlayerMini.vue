<template>
    <div class="player-mini">
        <div class="inner">
          <p class="img"><img :src="audio.picUrl" /></p>
          <p class="song">
            <span class="song-name">{{audio.name}}</span>
            <span class="singer">{{audio.singer}}</span>
          </p>
          <p class="paly-btn iconfont" :class="{'icon-play': !isPlaying, 'icon-pause': isPlaying }"></p>
          <p class="list-btn iconfont icon-listview"></p>
        </div>
        <div class="list">
        </div>
    </div>
</template>

<script>
  import { mapState } from 'vuex'
    export default {
      mounted(){
        this.test()
      },
      methods: {
        test() {
          console.log(this.audio.id)
        }
      },
      computed:{
        ...mapState([
          'audio',
          'isPlaying',
          'currentTime',
          'durationTime',
          'index',
          'list'])
      }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../stylus/mixin"
.player-mini
  position fixed
  bottom:0
  left:0
  width 100%
  font-size 14px
  background-color rgba(255,255,255,.9)
  box-shadow 0 0 3px 0 rgba(200,200,200,.8)
  z-index 900
  .inner
    display: flex
    padding 0 5px
    height 50px
    background-color transparent
    p
      height 100%
    .img
      width 50px
      height 50px
      padding 5px
    .song
      flex 1
      span
        display: block
        &:first-child
          height 26px
          line-height: 26px
          font-size 16px
        &:last-child
          height 24px
          line-height: 24px
          color: #999
    .paly-btn,.list-btn
      height 50px
      padding 0 5px
      line-height: 50px
</style>
