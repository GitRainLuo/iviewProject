/**
 * @Auther: 10040
 * @Description:mock.js
 * @Date: 2018/10/30 13:55
 * @Version:1.0
 */
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {loginUsers} from './data/user';

export default {
  bootstrap(){
    //定义一个mock adapter实例
    let mock = new MockAdapter(axios);

    // 模拟GET请求
    // arguments for reply are (status, data, headers)
    //success request
    mock.onGet('/success').reply(200,{
      msg:"success"
    });

    //failed request
    mock.onGet('/error').reply(500,{
      msg:"error"
    });

    //登录
    mock.onPost('/login').reply(config =>{
      console.log(JSON.stringify(config))
      //config:{"transformRequest":{},"transformResponse":{},"timeout":0,"xsrfCookieName":"XSRF-TOKEN","xsrfHeaderName":"X-XSRF-TOKEN","maxContentLength":-1,"headers":{"Accept":"application/json, text/plain, */*","Content-Type":"application/json;charset=utf-8"},"method":"post","url":"/login","data":"{\"username\":\"admin\",\"password\":\"123456\",\"email\":\"admin@163.com\"}"}
      // `config`是axios的配置项包含的有url
      // return an array in the form of [status, data, headers]
      //config.data 是一个string  用 JSON.parse()解析
      let {username,password,rePassword,email} = JSON.parse(config.data);
      return new Promise((resolve,reject) =>{
        //东西都放到user  最后需要缓存user
        let user = null;
        //默认邮箱 为true
        let emailFlag = true;
        setTimeout(()=>{
          let hasUser =loginUsers.some(u=>{
            // alert(JSON.stringify(u))
            // alert(username +" "+password+" "+rePassword+" "+email)
            if(u.username == username && u.password == password && u.password == rePassword){
              //验证邮箱
              if(u.email == email){
                //转换为对象
                user = JSON.parse(JSON.stringify(u));
                user.password = undefined;
                emailFlag = true;
                return true;
              }else {
                emailFlag = false;
                return false;
              }
            }else {
              return false;
            }
          });
          if(hasUser && emailFlag){
            resolve([200,{code:200,msg:"登录成功",user}]);
          }else if(!hasUser && emailFlag){
            resolve([200,{code:500,msg:"账号或密码错误"}])
          }else if(!emailFlag){
            resolve([200,{code:500,msg:"邮箱错误"}])
          }
        },1000);
      });
    });
  }
}
