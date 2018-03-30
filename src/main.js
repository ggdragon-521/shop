// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import router from './router'
import store from '@/vuex';
import API from './js/api.js';

Vue.prototype.axios = axios;
Vue.prototype.API = API;
Vue.config.productionTip = false

//先获取用户登录状态
/* axios.post('https://www.easy-mock.com/mock/5a0bad8922eff44db04955c0/example_1510714761014/checkUser')
  .then(data => {

    alert(data.data.message);
    store.dispatch('changeIsLogin1', data.data.message);
     router.beforeEach((to, from, next) => {
        let loginArr = ['my'];
        // 下面是需要登录权限的组件
        if ( loginArr.join(",").indexOf(to.name) !==-1 && !store.state.isLogin  ) {
            next('login');
        }
        next();
    });

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
})*/

$.ajax({
    type:'post',
    url:'https://www.easy-mock.com/mock/5a0bad8922eff44db04955c0/example_1510714761014/checkUser',
    dataType:'json',
    success:function(data){
    	var data = data.data;
    	//alert(data.message);
     store.dispatch('changeIsLogin1', data.message);
     router.beforeEach((to, from, next) => {
        let loginArr = ['my'];
        // 下面是需要登录权限的组件
        if ( to.fullPath.indexOf('my')!=-1&& !store.state.isLogin  ) {
            next('login');

        }
        next();
    });
    
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
}
   })

