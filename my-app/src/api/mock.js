import Mock from 'mockjs'
import homeApi from './mockServeData/home'
import user from './mockServeData/user'
import permission from './mockServeData/permission'

//mock是端模拟后端数据的工具
//定义mock请求拦截
Mock.mock('/api/home/getData','get',homeApi.getStatisticalData)

//用户列表的数据
Mock.mock('/api/user/add', 'post',user.createUser)
Mock.mock('/api/user/edit', 'post',user.updateUser)
/* 把路径写死 */
Mock.mock('/api/user/del', 'post',user.deleteUser)
/* 改写成正则的写法，这样路由携带参数的时候才能匹配到 */
Mock.mock(/api\/user\/getUser/,user.getUserList)

Mock.mock(/api\/permission\/getMenu/, 'post', permission.getMenu)