import Vue from 'vue';
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import User from '../views/User.vue'
import Main from '../views/Main.vue'
import Mall from '../views/Mall.vue'
import PageOne from '../views/PageOne.vue'
import PageTwo from '../views/PageTwo.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)
/* 
    1、创建路由组件（这里import进来）
    2、将路由与组件进行映射
    3、创建VueRouter实例
    4、导出实例，在main.js中进行挂载
*/

const routes = [
    // 主路由
    {
        path:'/',
        component:Main,
        name:'Main',
        redirect:'/home', //重定向
        children:[
            //子路由
            // { path: 'home', name:'home',component: Home }, // 首页
            // { path: 'user', name:'user',component: User }, // 用户管理
            // { path: 'mall', name:'mall',component: Mall }, // 商品管理
            // { path: 'Page1', name:'page1',component: PageOne }, // 
            // { path: 'Page2', name:'page2',component: PageTwo }, // 
        ]
    },
    {
      path: '/login',
      name: 'login',
      component:Login
    }

  ]
  
const router = new VueRouter({
    routes // (缩写) 相当于 routes: routes
  })

export default router