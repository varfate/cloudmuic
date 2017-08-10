<template>
  <div class="mine">
    <canvas width="375" height="500" ref="hacker"></canvas>
  </div>
</template>
<script>
  import {hacker} from '@/js/utils'

  export default {
    activated() {
      this.$nextTick(() => {
        let cv = this.$refs.hacker
        cv.height =cv.parentNode.getBoundingClientRect().height
        hacker(cv)
      })
    },
    components: {
    }
  }
</script>
<style lang="stylus">
  .mine
    width 100%
    height 100%
    overflow hidden
</style>