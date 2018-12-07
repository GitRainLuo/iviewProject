/**
 * @Auther: 10040
 * @Description:user.js
 * @Date: 2018/10/30 13:55
 * @Version:1.0
 */
import Mock from 'mockjs';

const loginUsers = [
  {
    id:1,
    username:"admin",
    password:"123456",
    email:"admin@163.com",
    name:"admin",
    avatar:'http://47.106.248.123/upload/5a438677084c4a29b22d9c053fce8a3f_avater.gif',
  },
  {
    id:2,
    username:'jay',
    password:'123456',
    email:"jay@163.com",
    avatar:'http://47.106.248.123/upload/5a438677084c4a29b22d9c053fce8a3f_avater.gif',
    name:'jay'
  },
];

//产生模拟数据
const users = [];
for(let i = 0;i<86;i++){
  users.push(Mock.mock({
    id:Mock.Random.guid(),
    //随机生成中文名
    name:Mock.Random.cname(),
    //随机生成英文名
    egName:Mock.Random.name(),
    addr:Mock.mock('@county(true)'),
    'age|18-50':1,
    birth:Mock.Random.date(),
    sex:Mock.Random.integer(0,1)
  }))
}

export {loginUsers,users};
