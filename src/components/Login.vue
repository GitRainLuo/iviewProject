<template>
  <div>
    <!--登录界面-->
    <Form :model="userForm" ref="userForm" class="form-containter" :rules="formRules">
      <h3 class="title">登录系统</h3>
      <FormItem prop="account" class="marginbottom20">
        <Input type="text" placeholder="请输入账号" v-model="userForm.account" clearable prefix="ios-person-outline"/>
        <!--&lt;!&ndash;slot方式&ndash;&gt;-->
        <!--<Input type="text" placeholder="请输入账号" v-model="userForm.account" clearable>-->
          <!--<Icon type="ios-person" slot="prefix"/>-->
        <!--</Input>-->
      </FormItem>
      <FormItem prop="password" class="marginbottom20">
        <Input type="password" placeholder="请输入密码" v-model="userForm.password"  icon="ios-eye-outline" ref="password" @on-click="showPassword" prefix="ios-lock-outline"/>
      </FormItem>
      <FormItem prop="password" class="marginbottom20">
        <Input type="password" placeholder="请输入密码" v-model="userForm.rePassword"  icon="ios-eye-outline" ref="rePassword" @on-click="showRePassword" prefix="ios-lock-outline"/>
      </FormItem>
      <FormItem prop="email" class="marginbottom20">
        <Input type="email" placeholder="请输入邮箱" v-model="userForm.email" clearable @keyup.enter.native="handleSubmit" prefix="ios-mail-outline"/>
      </FormItem>
      <FormItem class="marginbottom20">
        <Checkbox v-model="isChecked" class="rememberPassword">记住密码</Checkbox>
      </FormItem>
      <FormItem class="marginbottom20">
        <Button type="primary" style="width: 100%" @click="handleSubmit" :loading="loading">登录</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
    import {requestLogin} from '../api/api'
    export default{
        data () {
            return {
              userForm:{
                account:'admin',
                password:'123456',
                rePassword:"123456",
                email:'admin@163.com'
              },
              isChecked:true,
              loading:false,
//              验证
              formRules:{
                  account:[
                    {
                      required:true,
                      message:"请输入账号",
                      trigger:"blur"
                    }
                  ],
                  password:[
                    {
                      required:true,
                      message:"请输入密码",
                      trigger:"blur"
                    }
                  ],
                  email:[
                    {
                      required:true,
                      message:"请输入邮箱",
                      trigger:"blur"
                    },
                    {
                      type:"string",
//                      \w:字母或数字或下划线或汉字 不等于[a-zA-Z0-9] 多了下划线
//                      邮箱验证
                      pattern:/^\w+@[a-zA-Z0-9]+\.[a-z]{2,4}$/,
                      message:"邮箱格式不正确",
                      trigger:"blur"
                    }
                  ]
              }
            }
        },
        methods:{
            handleSubmit:function () {
              this.$refs.userForm.validate((valid) => {
                  if(valid){
                      this.loading = true
                      if(this.userForm.password != this.userForm.rePassword){
                          this.$Message.error("两次输入密码不一致,请重新输入")
                          this.loading = false;
                      }else {
                        let loginParams = {username:this.userForm.account,password:this.userForm.password,rePassword:this.userForm.rePassword,email:this.userForm.email}
                        requestLogin(loginParams).then(({data})=>{
//                          alert(JSON.stringify(data))
                          this.loading = false;
                          let {msg,code,user} = data;
                          if(code!=200){
                            //请求失败
                            this.$Message.error(msg)
                          }else {
                            //成功
                            //缓存user信息
                            sessionStorage.setItem('user',JSON.stringify(user));
                            this.$Message.success(msg)
                            this.$router.push({path:"/map"})
                          }
                        })
                      }
                  }else {
                      console.log("error  submit");
                      return false;
                  }
              })
            },
            showPassword(){
                if(this.$refs.password.type == "password"){
                    this.$refs.password.type = "text"
                    this.$refs.password.icon = "ios-eye-off"
                }else {
                  this.$refs.password.type = "password"
                  this.$refs.password.icon = "ios-eye-outline"
                }
            },
            showRePassword(){
              if(this.$refs.rePassword.type == "password"){
                this.$refs.rePassword.type = "text"
                this.$refs.rePassword.icon = "ios-eye-off"
              }else {
                this.$refs.rePassword.type = "password"
                this.$refs.rePassword.icon = "ios-eye-outline"
              }
            }
        }
    }
</script>

<style lang="scss" scoped>
    /*规则顺序*/
    /*1.位置*/
    /*2.自身属性 如宽高大小*/
    /*3.文字系列(font line-height...)*/
    /*4.背景 边框*/
    /*5.其他 (如animation transition...)*/

    /*兼容写法*/
    /*兼容(浏览器私有)属性写在标准属性之前*/
    .form-containter{
      width: 400px;
      padding: 25px 15px 5px 15px;
      margin: 0 auto;
      border:1px solid #eaeaea;
      -webkit-border-radius: 3px;
      -moz-border-radius: 3px;
      border-radius: 3px;
      .title{
        padding-bottom: 15px;
        font-size: 15px;
        font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
        line-height: 1;
      }
      .rememberPassword{
        float: left;
      }
      .marginbottom20{
        margin-bottom: 20px;
      }
    }
</style>
