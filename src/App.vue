<template>
  <div id="app">
    <toast></toast>
   <!-- 公共页头组件 -->
        <com-header :comHeaderFlag="comHeaderFlag" :carCount="carCount"></com-header>
     <transition name="fade">
            <!-- exclude指定不用缓存的组件 -->
            <keep-alive :include="['index','class','my']">
                <router-view></router-view>
            </keep-alive>
        </transition>
    <!-- 公共页脚组件 -->
        <com-footer :activeIndex="activeIndex" :activeClass="activeClass" :activeMy="activeMy" :comFooterFlag="comFooterFlag"></com-footer>
  </div>
</template>

<script>
import toast from '@/components/toast'
import comHeader from '@/components/comHeader'
import comFooter from '@/components/comFooter'
import store from '@/vuex/index.js';
import js from '@/js/common.js';
import { mapState, mapActions } from 'vuex';
export default {
  name: 'app',
  store,
   data() {
        return {
        }
    },
    computed : {
        ...mapState([
            'comHeaderFlag',
            'comFooterFlag',
            'activeIndex',
            'activeClass',
            'activeMy',
            'carCount'
        ])
    },
     mounted() {

      /*  this.axios.post(this.API.checkUser).then( ( data ) => {
            this.changeIsLogin(data.data.flag);
        });*/
        var oThis =this;
        $.ajax({
                  type:'post',
                  url:'https://www.easy-mock.com/mock/5a0bad8922eff44db04955c0/example_1510714761014/carCount',
                  dataType:'json',
                  success:function(data){
                    oThis.changeCarCount(data.data.count);
                   
                  }   
                })
              
    },
  components: {
      comHeader,
      comFooter,
      toast
    },
   methods : {
        ...mapActions({
            changeIsLogin : 'changeIsLogin1',
            changeCarCount : 'changeCarCount1'
        })
    }
}
</script>


<style>
/*公共重置样式*/
body,div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,pre,form,fieldset,input,textarea,p,blockquote,th,td{font-family:Helvetica,HelveticaNeue,Arial,Verdana,Sans-serif;;margin:0;padding:0}html{font-size:1rem;}address,caption,cite,code,dfn,em,strong,th,var{font-style:normal}table{border-collapse:collapse;border-spacing:0}q:before,q:after{content:''}object,embed{vertical-align:top}hr,legend{display:none}img,abbr,acronym,fieldset{border:0}ul li{list-style-type:none}a,label{cursor:pointer}img{vertical-align:bottom;margin:0;padding:0}a{text-decoration:none;outline:0}h1,h2,h3,h4,h5,h6{font-weight: 400}.clearfix:after{content:".";visibility:hidden;display:block;height:.1px;font-size:.1em;line-height:0;clear:both}.clearfix{*zoom:1}input,textarea,select{outline:0;border:1px solid #ccc;border-radius: 0;}input:-ms-input-placeholder,textarea:-ms-input-placeholder{color:#ccc}input::-webkit-input-placeholder,textarea::-webkit-input-placeholder{color:#ccc}*{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}button{cursor:pointer;color:#666}textarea{resize:none;outline:0;overflow:hidden;padding:5px}select{outline:0}img{max-width: 100%}*{-webkit-tap-highlight-color:rgba(255,255,255,0); -webkit-appearance: none;}body{max-width: 640px;margin: 0 auto;background-color: #f8f9fc;}img{outline:none;}



</style>
