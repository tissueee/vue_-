<template>
    <div class="manage">
        <el-dialog :before-close="handleClose" title="提示" :visible.sync="dialogVisible" width="50%">
            <!--用户的表单信息 -->
            <el-form :inline="true" :rules="rules" ref="form" :model="form" label-width="80px">
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item label="年龄" prop="age">
                    <el-input v-model="form.age" placeholder="请输入年龄"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                    <el-select v-model="form.sex" placeholder="请选择">
                        <el-option label="男" :value="1"></el-option>
                        <!-- label：显示的值 ，value:传递给form.sex的值 -->
                        <el-option label="女" :value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="出生日期" prop="birth">
                        <el-date-picker 
                        type="date" 
                        placeholder="选择日期" 
                        v-model="form.birth"
                        value-format="yyyy-MM-DD">
                        </el-date-picker>
                </el-form-item>
                <el-form-item label="地址" prop="addr">
                    <el-input v-model="form.addr" placeholder="请输入地址"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </span>
        </el-dialog>
        <div class="manage-header">
            <el-button size="mini" type="primary" @click="handleAdd">
                + 新增
            </el-button>
            <!-- 搜索区 -->
            <el-form :inline="true" :model="userform" >
                <el-form-item>
                    <el-input size="mini" type="text" placeholder="请输入名称" v-model="userform.name"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button size="mini" type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>

            </el-form>
        </div>
        <div class="common-table">
            <el-table
            stripe
            height="90%"
            :data="tableData"
            style="width: 100%">
            <el-table-column
                prop="name"
                label="姓名">
            </el-table-column>
            <el-table-column
                prop="sex"
                label="性别">
                <template slot-scope="scope"> <!-- slot-scope="scope":子组件拿到父组件的数据 就是当前行的数据-->
                    <span style="margin-left: 10px">{{ scope.row.sex === 1 ? '男' : '女' }}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="age"
                label="年龄">
            </el-table-column>
            <el-table-column
                prop="birth"
                label="出生日期">
            </el-table-column>
            <el-table-column
                prop="addr"
                label="地址">
            </el-table-column>
            <el-table-column
                prop="addr"
                label="地址">
                <template slot-scope="scope"> <!-- slot-scope="scope":子组件拿到父组件的数据  就是当前行的数据 -->
                    <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
            </el-table>
            <div class="pager">
                <el-pagination
                layout="prev, pager, next"
                :total="total"
                @current-change="handlePage">
                </el-pagination>
            </div>
        </div>
    </div>

</template>

<script>
import {getUser,addUser,editUser,delUser} from '../api'
export default {

    data() {
        return {
            dialogVisible: false,
            form: {
                name: '',
                age: '',
                sex: '',
                birth: '',
                addr: ''
            },
            rules:{
                name:[
                    {required:true, message:'请输入姓名', }
                ],
                age:[
                    {required:true, message:'请输入年龄', }
                ],
                sex:[
                    {required:true, message:'请选择性别', }
                ],
                birth:[
                    {required:true, message:'请选择出生日期', }
                ],
                addr:[
                    {required:true, message:'请输入地址', }
                ],

        },
        tableData: [
        ],
        modalType: 0 ,//0表示是新增的弹窗  1：表示编辑的弹窗
        total:0 ,//当前总条数
        pageData:{
            page:1,
            limit:10
        },
        userform:{
            name:'',
        }
        }
    },
    methods:{
        //提交用户表单
        submit(){
            this.$refs.form.validate((valid) => {
                if(valid){
                    //后续对表单数据的处理
                    if(this.modalType === 0){
                        addUser(this.form).then(() => {
                            //新增完更新列表,重新获取列表的接口
                            this.getList()
                        })
                    }else{
                        //调用编辑的接口
                        editUser(this.form).then(() => {
                            //编辑完更新列表,重新获取列表的接口
                            this.getList()
                        })
                    }

                    //关闭弹窗
                    this.dialogVisible = false
                    this.handleClose()

                }
            })
        },
        //弹窗关闭的时候触发 
        handleClose(){
            this.$refs.form.resetFields()
        },
        cancel(){
            this.handleClose()
            this.dialogVisible = false
        },
        handleEdit(row){
            this.modalType === 1
            this.dialogVisible = true
            //这里不能直接赋值 需要对当前行数据进行深拷贝，否则出错
            this.form = JSON.parse(JSON.stringify(row))
        },
        handleDelete(row){
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                delUser({id:row.id}).then(() => {
                    this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                //重新获取列表接口
                this.getList()
                })
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });

        },
        handleAdd(){
            this.modalType === 0
            this.dialogVisible = true
        },
        getList(){
        //获取列表数据
            getUser({params:{...this.userform, ...this.pageData}}).then(({ data }) => { /* es6语法 解构赋值 */
                console.log(data)
                this.tableData = data.list
                this.total = data.count || 0
            } )
        },
        //选择页码时的回调函数
        handlePage(val){
            //val是当前的页码
            this.pageData.page = val 
            this.getList()
        },
        onSubmit(){
            //列表的查询
            this.getList()
        }
    },
    mounted(){
        this.getList()
    }
}
</script>

<style lang="less" scoped>
.manage{
    height: 90%;
    .manage-header{
        display:flex;
        justify-content: space-between;
        align-items: center;
    }
    .common-table{
        position: relative;
        height: calc(100% - 40px);
        .pager{
            position: absolute;
            bottom:0;
            right: 20px;
        }
    }
    
}

</style>