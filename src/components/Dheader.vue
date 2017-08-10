<template>
  <div class="d-header" :style="{backgroundColor: 'rgba(0,0,0,'+bgOpcity+')'}">
    <div class="goBack iconfont icon-jiantou-copy"></div>
  </div>
</template>

<script>
  export default {
    props:{
      bgOpcity: {
        default: 0
      }
    }
  }
</script>
<style lang="stylus" scoped>
  .d-header
    background-color transparent
    
</style>