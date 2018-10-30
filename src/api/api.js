/**
 * @Auther: 10040
 * @Description:api.js
 * @Date: 2018/10/30 13:47
 * @Version:1.0
 */
import axios from 'axios'

let base = "";

//登录请求
export const requestLogin = params =>{return axios.post(`${base}/login`,params).then(res=>res.data)}
