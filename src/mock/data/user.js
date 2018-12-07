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
    //@占位符引用的是Mock.Random里的方法
    //随机生成一个guid
    id:Mock.Random.guid(),
    //随机生成一个18位身份证号码
    // id:Mock.Random.id(),
    //随机生成中文名
    name:Mock.Random.cname(),
    //随机生成英文名
    egName:Mock.Random.name(),
    // addr:Mock.mock('@county(true)'),
    addr:Mock.Random.county(true),
    'age|18-50':1,
    //birth:Mock.Random.date('yyyy-MM-dd'),
    //Mock.Random.date() ==> string
    // birth:Mock.Random.date(),
    birth:"@date()",
    // age:Mock.Random.now().toString().substring(0,4)- birth.toString().substring(0,4),
    sex:Mock.Random.integer(0,1)
  }))
}

export {loginUsers,users};
