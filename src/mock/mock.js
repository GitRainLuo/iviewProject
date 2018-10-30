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
    let mock = new MockAdapter(axios);
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
      //config.data 是一个string  用 JSON.parse()解析
      let {username,password} = JSON.parse(config.data);
      return new Promise((resolve,reject) =>{
        //东西都放到user  最后需要缓存user
        let user = null;
        setTimeout(()=>{
          let hasUser =loginUsers.some(u=>{
            // alert(username +" "+password)
            if(u.username == username && u.password == password){
              //转换为对象
              user = JSON.parse(JSON.stringify(u));
              user.password = undefined;
              return true;
            }
          });
          if(hasUser){
            resolve([200,{code:200,msg:"登录成功",user}]);
          }else {
            resolve([200,{code:500,msg:"账号或密码错误"}])
          }
        },1000);
      });
    });
  }
}
