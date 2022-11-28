<template>
        <el-form ref="form" label-width="70px" :model="form" :inline="true" :rules="rules" class="Login-container">
            <h3 class="login_title">系统登录</h3>
            <el-form-item label="用户名" prop="username">
                <el-input v-model="form.username" placeholder="请输入账号"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password"  v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="submit" style="margin-left:105px ; margin-top: 10px;" type="primary">登录</el-button>
            </el-form-item>
        </el-form>
</template>

<script>
import Mock from 'mockjs'
import Cookie from 'js-cookie'
import { getMenu } from '../api'
export default {
    data(){
        return {
            form: {
                username:'',
                password:''
            },
            rules: {
                username:[ {
                    required:true,
                    trigger:'blur',
                    message:'请输入用户名'
                }],
                password:[{
                    required:true,
                    trigger:'blur',
                    message:'请输入密码'
                }]
            }
        }
    },
    methods:{
        //登录
        submit(){
/*             //token信息
            const token = Mock.Random.guid()
            //将token信息存入cookie用于不同页面的通信
            Cookie.set('token',token) */

            // 1、校验通过
            this.$refs.form.validate((valid) => {
                if(valid){
                    getMenu(this.form).then(({ data }) => {
                        console.log(data)
                        if(data.code === 20000){
                            //将token信息存入cookie用于不同页面的通信
                            Cookie.set('token',data.data.token)

                            //获取菜单的数据，存入store中
                            this.$store.commit('setMenu', data.data.menu)
                            this.$store.commit('addMenu', this.$router)
                            //跳转到系统的页面
                            this.$router.push('/home')
                        } else {
                            this.$message.error(data.data.message)
                        }
                    })
                }
            })

        }
    }
}
</script>

<style lang="less" scoped>
.Login-container{
    width:350px;
    border:1px solid #eaeaea;
    margin:180px auto;
    padding:35px;
    background-color: #fff;
    border-radius:15px;
    box-shadow: 0 0 25px #cac6c6;
    box-sizing: border-box;  /* 使外边距和border不影响宽高 */
    .login_title{
        text-align: center;
        margin-bottom: 40px;
        color:#505458;

    }
    .el-input{
        width:198px;
    }  /* 这里样式应用上了 只是这个样式类没有显示写出 所以reference是0 */

}
</style>