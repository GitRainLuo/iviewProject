/**
 * @Auther: 10040
 * @Description:mock.js
 * @Date: 2018/10/30 13:55
 * @Version:1.0
 */
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {loginUsers,users} from './data/user';

let _users = users;
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
      console.log(JSON.stringify(config.data))
      //config:{"transformRequest":{},"transformResponse":{},"timeout":0,"xsrfCookieName":"XSRF-TOKEN","xsrfHeaderName":"X-XSRF-TOKEN","maxContentLength":-1,"headers":{"Accept":"application/json, text/plain, */*","Content-Type":"application/json;charset=utf-8"},"method":"post","url":"/login","data":"{\"username\":\"admin\",\"password\":\"123456\",\"email\":\"admin@163.com\"}"}
      // `config`是axios的配置项包含的有url
      // return an array in the form of [status, data, headers]
      //config.data 是一个string  用 JSON.parse()解析
      //config.data  "{\"username\":\"admin\",\"password\":\"123456\",\"rePassword\":\"123456\",\"email\":\"admin@163.com\"}"
      //JSON.parse(config.data)  {"username":"admin","password":"123456","rePassword":"123456","email":"admin@163.com"}
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

    //获取用户列表
    mock.onGet('/user/list').reply(config=>{
      let {name} = config.params;
      let mockUsers = _users.filter(user =>{
        if(name && user.name.indexOf(name) == -1){
          return false;
        }
        return true;
      });
      return new Promise((resolve,reject)=>{
        setTimeout(()=>{
          resolve([200,{
            users:mockUsers
          }]);
        },1000)
      })
    });

    //获取用户列表 分页实现
    mock.onGet("/user/listPage").reply(config=>{
      let {page,size,name} = config.params;
      // alert(JSON.stringify(config.params))
      let mockUsers = _users.filter(user =>{
        if(name && user.name.indexOf(name) == -1){
          return false;
        }
        return true;
      })
      //计算用户的数量 用于分页
      let total = mockUsers.length;
      mockUsers = mockUsers.filter((u,index)=>{
        return index<size*page && index>=size*(page-1)
      });
      return new Promise((resolve,reject)=>{
        setTimeout(()=>{
          resolve([200,{
            total:total,
            users:mockUsers
          }])
        },1000)
      })
    })

    //删除用户
    mock.onGet("/user/deleteUserById").reply(config => {
      let {id} = config.params
      // alert(JSON.stringify(config.params))
      _users = _users.filter(user =>{
        return user.id != id
      })
      return new Promise((resolve,reject)=>{
        setTimeout(()=>{
          resolve([200,{
            code:200,
            msg:"删除成功"
          }])
        },500)
      })
    })

    //批量删除
    mock.onGet("/user/batchDeleteUsersByIds").reply(config=>{
      let {ids} = config.params
      // alert(JSON.stringify(ids))
      _users = _users.filter(user =>{
        // alert(JSON.stringify(user))
        return !ids.includes(user.id)
      })
      return new Promise((resolve,reject)=>{
        setTimeout(()=>{
          resolve([200,{
            code:200,
            msg:"批量删除成功"
          }])
        },500)
      })
    })

    //编辑信息
    mock.onGet("/user/editUser").reply(config =>{
      let {id,name,age,sex,birth,addr} = config.params
      _users.some(user =>{
        if(user.id == id){
          user.name = name;
          user.age = age;
          user.sex = sex;
          user.birth = birth;
          user.addr = addr;
          return true;
        }
      })
      return new Promise((resolve,reject)=>{
        setTimeout(()=>{
          resolve([200,{
            code:200,
            msg:"编辑成功"
          }])
        },500)
      })
    })

    //新增用户
    mock.onGet("/user/addUser").reply(config=>{
      let {name,age,sex,birth,addr} = config.params
      _users.push({
        name:name,
        age:age,
        sex:sex,
        birth:birth,
        addr:addr
      })
      return new Promise((resolve,reject)=>{
        setTimeout(()=>{
          resolve([200,{
            code:200,
            msg:"新增成功"
          }])
        },500)
      })
    })

    //根据用户名查询
    mock.onGet("/user/searchByName").reply(config=>{
      let name = config.params
      let matchedUsers = _users.filter(user=>{
        if(name){
          return !(user.name.indexOf(name))
        }else {
          return true
        }
      })
      return new Promise((resolve,reject)=>{
        setTimeout(()=>{
          resolve([200,{
            code:200,
            msg:"查询成功",
            users:matchedUsers
          }])
        },500)
      })
    })
  }
}
