<template>
    <div class="login">
        <ul>
            <li>
                <label ><i class="iconfont icon-shouji"></i><span class="add86">+86</span></label>
                <input v-model.trim="phone" type="text" placeholder="请输入手机号">
                <p v-show="phone" @click="clearPhone" class="clear iconfont icon-11"></p>
            </li>
            <li>
                <label><i class="iconfont icon-lock"></i></label>
                <input v-model.trim="pwd" type="password" placeholder="请输入密码">
                <p class="forget-pwd">忘记密码？</p>
            </li>
        </ul>
        <button @click="login" class="btn" v-show="!isLoginIng">登录</button>
        <button class="btn" v-show="isLoginIng">登陆中···</button>
        <!--loading-->
        <loading-circle></loading-circle>
        <alert :position="alert.position" :type="alert.type" :msg="alert.msg" v-show="error"></alert>
    </div>
</template>

<script type="text/javascript">
    import LoadingCircle from '@/components/common/LoadingCircle'
    import Alert from '@/components/common/Alert'
    import Store from '@/store/store'
    import {mapState,mapMutations} from 'vuex'
    import {BASEURL} from '@/js/config'
    import {setCookie} from '@/server/cookie'
    export default {
        data() {
            return {
                phone:'', // 手机号
                pwd: '', // 密码
                isLoginIng: false,
                error: false,
                alert: {
                    msg: '',
                    position:'bottom',
                    type: 'wrong'
                }
            }
        },
        components: {
            LoadingCircle,Alert
        },
        methods: {
        //    清除手机号
            clearPhone() {
                this.phone = '';
            },
            login() {
                //  判断是否为空
                if(!this.pwd && !this.phone) {
                    this.error = true;
                    this.alert.msg = '账号和密码不能为空'
                    setTimeout(()=> {
                        this.error = false
                    },2000)
                    return false;
                }
                this.isLoginIng = true;
                this.error = false;
                //  发送登录请求
                axios.get(BASEURL+'/login/cellphone', {
                    params:{
                        phone: this.phone,
                        password: this.pwd
                    }
                })
                .then(res=>{
                    var status = res.status;
                    console.log(res)
                    if(status == 200) {
                        let data = res.data,
                            code = data.code,
                            msg = data.msg;
                        switch(code) {
                            case 200:
                                setCookie('_ntes_nnid','96159299ff3016fa9f49571ac682fe42',10);
                                console.log(登录成功);
                                break;
                            default:
                                this.alert.msg = msg;
                                this.error = true;
                                setTimeout(()=> {
                                    this.error = false
                                },2000)
                        }
                    }
                })
                .catch(err=>{
                    this.isLogingIng = false;
                    this.alert =  {
                        msg: '网络错误',
                        position:'bottom',
                        type: 'info'
                    }
                    setTimeout(()=> {
                        this.error = false
                    },2000)
                })
            }
        },
        mounted() {
        },
        computed: {

        },
        watch: {
            //  过滤手机号
            phone: function () {
                this.phone = !parseInt(this.phone) ? '' : parseInt(this.phone)+'';
                if (this.phone.length > 11) {
                    this.phone = this.phone.substring(0, 11);
                }
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">

@import "../../stylus/mixin"

.login
    padding-top: 100px
    allcover()
    ul
        padding 0 rem(30)
    li
        display flex
        align-items center
        padding-bottom: rem(20)
        margin-bottom rem(60)
        border-bottom: 1px solid #ccc
        fz(30)
        .iconfont
            fz(38)
            color: #999
        .add86
            padding-left: rem(30)
        .clear
            fz(24)
        input
            flex 1
            padding:0 rem(60) 0 rem(20)
            border 0 none
            outline 0 none
        .forget-pwd
            color: #527fac
            fz(24)
    .btn
        display: block
        width: 80%
        height: rem(86)
        margin: 0 auto
        border-radius rem(43)
        background: mc
        color: #fff
        fz(30)
        &:hover
            transition: opacity .5s
            opacity .9
</style>
