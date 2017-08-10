<template>
    <div class="header">
        <header>
            <span class="iconfont icon-menu menu"></span>
            <div class="nav">
                <router-link to="/mine" class="iconfont icon-yinfu2" :class="curPage == 0 ? 'active' : ''"></router-link>
                <router-link to="/reco" class="iconfont icon-yinfu1" :class="curPage == 1 ? 'active' : ''"></router-link>
                <router-link to="/topic" class="iconfont icon-19" :class="curPage == 2 ? 'active' : ''"></router-link>
            </div>
            <span class="iconfont icon-search search"></span>
        </header>
    </div>
</template>

<script type="text/javascript">
    export default {
        name: "header",
        props:['curPage']
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

@import "../../stylus/mixin"

header
    position fixed
    top 0
    left 0
    display: flex
    width 100%
    padding: rem(30) 0
    background-color mc
    .iconfont
        font-size rem(50)
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
            &.active
                color: rgba(255,255,255,1)

</style>
