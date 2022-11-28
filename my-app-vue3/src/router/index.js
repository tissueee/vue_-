import {createRouter,createWebHashHistory } from 'vue-router'

const routes = [
    {
        path:'/',
        compotent:() => import ('../views/Main.vue'),
        name:'Main',
        redirect: '/home',
        children:[
            {
                path:'/home',
                name:'home',
                compotent:() => import ('../views/home/Home.vue')
            }
        ]
    }
]

const router = createRouter({
    history:createWebHashHistory(),
    routes
})

export default router