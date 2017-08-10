<template>
    <transition name="fade">
        <div class="alert" :class="[position]">
            <span class="iconfont" :class="[iconType[type]]"></span>
            <span class="msg">{{msg}}</span>
        </div>
    </transition>
</template>

<script type="text/ecmascript-6">
    export default {
        props: ['type','msg','position'],
        data() {
            return {
                iconType: {
                    wrong:'icon-wrongquestion',
                    correct:'icon-correct',
                    info:'icon-info'
                } // 错，对，警告
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "../../stylus/mixin"
    .alert
        position fixed
        display: flex
        height: rem(96)
        align-items center
        padding 10px
        transition all .5s
        z-index 1000
        box-shadow 0 0 10px 0 rgba(33,33,33,.5)
        border-radius rem(20)
        .iconfont
            fz(50)
        .msg
            padding-left: 10px
            fz(30)
            white-space nowrap
    .top
        top: 5%
        left: 50%
        transform: translateX(-50%)
    .center
        top: 50%
        left: 50%
        transform: translate(-50%,-50%)
    .bottom
        bottom: 5%
        left: 50%
        transform: translateX(-50%)
    .fade-enter-active, .fade-leave-active
        opacity: 1

    .fade-enter, .fade-leave-to
        opacity: 0

    .icon-wrongquestion
        color: red
    .icon-correct
        color: green
    .icon-info
        color: orange
</style>
