import Vue from 'vue';
// import {Row, Button} from 'element-ui';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './router'
import store from './store'   //默认引用index文件
import './api/mock'
import Cookies from 'js-cookie';

Vue.config.productionTip = false
//完全引入
Vue.use(ElementUI)

//按需引入
// Vue.use(Row)
// Vue.use(Button)

//添加全局前置导航守卫
router.beforeEach((to, from, next) => {
  //判断token存不存在
  const token = Cookies.get('token')
  //token不存在，说明用户未登录，应跳转至登录页
  if(!token && to.name !== 'login'){
    next({name: 'login'})
  }else if(token && to.name === 'login'){
    //token存在,说明用户登录，此时跳转至首页
    next({name: 'home'})
  }else{
    next()
  }
})


new Vue({
  store,
  router,
  render: h => h(App),
  created(){
    store.commit('addMenu',router)  //解决页面刷新路由消失问题
  }
}).$mount('#app')
