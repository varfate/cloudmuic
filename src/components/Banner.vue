<!---->
<template>
    <swiper :options="swiperOption" ref="mySwiper">
        <!-- slides -->
        <swiper-slide v-for="item in banner" :key="item.id" class="img-wrap">
            <img :src="item.pic" class="ripple-effect u-img">
        </swiper-slide>
        <!-- Optional controls -->
        <div class="swiper-pagination"  slot="pagination"></div>
    </swiper>
</template>

<script>
    export default {
        name: 'banner',
        props: ['banner'],
        data() {
            return {
                swiperOption: {
                    autoplay: 3000,
                    grabCursor : true,
                    setWrapperSize :true,
                    autoHeight: true,
                    pagination : '.swiper-pagination',
                    paginationClickable :true,
                    observeParents:true,
                    loop: true,
                    // swiper的各种回调函数也可以出现在这个对象中，和swiper官方一样
                    onTransitionStart(swiper){
                    //  console.log(swiper)
                    }
                }
            }
        },
        created() {},
        mounted() {},
        components: {
        },
        computed: {
            swiper() {
                return this.$refs.mySwiper.swiper
            }
        }
    }
</script>

<style lang="stylus">
   .img-wrap
       position: relative
</style>
