<template>
    <div class="header-container">
        <div class="l-content">
            <el-button style="margin-right:20px" @click="handleMenu" icon="el-icon-menu" size="mini"></el-button>
            <!-- 面包屑-->
            <el-breadcrumb separator="/" class="bread">
                <el-breadcrumb-item v-for="item in tags" :key="item.path" :to="{path: item.path}">{{item.label}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="r-content">
            <el-dropdown @command="handleClick" :hide-on-click="false">
                <span class="el-dropdown-link">
                    <img class="user" src="../assets/image/sucan2.png" alt="">
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item command="cancel">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
import {mapState } from 'vuex'
import Cookie from 'js-cookie'
export default {
    data() {
        return {}
    },
    methods: {
        handleMenu() {
            this.$store.commit('collapseMenu')
        },
        handleClick(command){
            if(command === 'cancel'){
                // 清除cookie中的token
                Cookie.remove('token')
                //清除Cookie中的menu
                Cookie.remove('menu')
                //跳转到登录页面
                this.$router.push('/login')
            }

        }
    },
    computed:{
        ...mapState({
            tags:state => state.tab.tabsList
        })
    },

}
</script>

<style lang="less" scoped>

.header-container {
    padding: 0 20px;
    background-color: #333;
    height: 60px;
    display: flex;
    justify-content: space-between; //横轴
    align-items: center; //竖轴

    .text {
        color: #fff;
        font-size: 14px;
        margin-left: 10px;
    }

    .r-content {
        .user {
            width: 40px;
            height: 40px;
            border-radius: 50%;
        }
    }
    .l-content{
        display: flex;
        align-item: center;
        .bread{
            display: flex;
            align-items: center;
        }
        /deep/.el-breadcrumb__item { //样式穿透
            .el-breadcrumb__inner {
                font-weight:normal;
                &.is-link{  /* &表示并且有这个属性的时候 */
                    color:#666;

                }
            }
            &:last-child{
                .el-breadcrumb__inner{
                    color:white;

                }
            }
        }
    }

}
</style>