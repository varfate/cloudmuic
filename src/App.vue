<template>
    <div>
      <transition name="router-fade" mode="out-in">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </transition>
    <player-mini></player-mini>
  </div>
</template>

<script>
import PlayerMini from '@/components/PlayerMini'
export default {
  name: 'app',
  data() {
    return {
    }
  },
  components: {
    PlayerMini
  }
}
</script>

<style lang="stylus">
@import 'stylus/mixin.styl'
#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
.router-fade-enter-active, .router-fade-leave-active
  transition: opacity .5s
.router-fade-enter, .router-fade-leave-to
  opacity: 0

</style>
