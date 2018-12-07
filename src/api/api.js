/**
 * @Auther: 10040
 * @Description:api.js
 * @Date: 2018/10/30 13:47
 * @Version:1.0
 */
import axios from 'axios'

let base = "";

//登录请求
// export const requestLogin = params =>{return axios.post(`${base}/login`,params).then(res=>res.data)}
export const requestLogin = params =>{return axios.post(`${base}/login`,params)}
//获取用户列表
export const getUserList = params => {return axios.get(`${base}/user/list`,{params:params});};
//获取用户列表 分页
export const getUsetListPages = params =>{return axios.get(`${base}/user/listPage`,{params:params});};
//删除用户
export const deleteUser = params =>{return axios.get(`${base}/user/deleteUserById`,{params:params});};
//批量删除
export const batchDeleteUser = params =>{return axios.get(`${base}/user/batchDeleteUsersByIds`,{params:params})};
//编辑
export const editUserInfo = params =>{return axios.get(`${base}/user/editUser`,{params:params});};
//新增
export const addUser = params =>{return axios.get(`${base}/user/addUser`,{params:params});};
//根据用户名查询
export const searchByName = params =>{return axios.get(`${base}/user/searchByName`,{params:params})}
