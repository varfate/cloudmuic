<template>
    <div class="loading">
      <img src="../../static/img/loading.gif" alt="loading" :style="{width: width}">
    </div>
</template>

<script type="javascript">
    export default {
      props:['width']
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../stylus/mixin"
.loading
    center()
    color mc
    text-align center
    img
      width 100px
      height auto
</style>
