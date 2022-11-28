<template>
    <div class="tabs">
        <el-tag 
        v-for="(item,index) in tags" 
        :key="item.path" 
        :closable="item.name !== 'home'"
        :effect="$route.name === item.name ? 'dark' : 'plain'"
        @click="changeMenu(item)"
        @close="handleClose(item,index)"   
        size="small"
        ><!-- 常用@事件名, 给dom标签绑定事件, 以及=右侧事件处理函数 -->
            {{ item.label }}
        </el-tag>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
    name:'CommonTag',
    data(){
        return {

        }
    },
    computed:{
        ...mapState({
            tags:state => state.tab.tabsList
        })
    },
    methods:{
        ...mapMutations(['closeTag']),
        //点击tag跳转的功能
        changeMenu(item){
            //this.$router.push(item.path) 通过路径跳转
            //路由跳转:通过名称跳转
            this.$router.push({name:item.name})
        },
        //点击tag删除事件
        handleClose(item,index){
            //调用store中的mutation
            this.closeTag(item)
            const length = this.tags.length
            //删除之后的跳转逻辑
            //
            if(item.name !== this.$route.name){
                return
            }
            //删除的是最后一项
            if(index === length){
                this.$router.push({
                    name:this.tags[index - 1].name
                })
            }else{
                this.$router.push({
                    name:this.tags[index].name
                })
            }
            
            
        }
    },
    mounted(){
        //检查错误用
        // console.log(this.$route)
    }

}
</script>

<style lang="less" scoped>
.tabs{
    height:20px;
    padding:10px;
    .el-tag{
        margin-right: 15px;
        cursor:pointer

    }
}

</style>