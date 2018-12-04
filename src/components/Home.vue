<template>
  <div>
    <Row>
      <Col :span="24" class="header">
        <Col :span="10" class="logo">{{sysName}}</Col>
        <Col :span="10">
          <div></div>
        </Col>
      <Col :span="4" class="user-info">
        <Dropdown>
          <!--利用缓存拿头像-->
          <span><img :src="this.sysUserAvater"/>{{sysUserName}}</span>
          <!--直接拿本地的头像  assets下 得用require()-->
          <!--<span><img :src="require('../assets/avater.gif')"/>{{sysUserName}}</span>-->
          <DropdownMenu slot="list">
            <DropDownItem>我的消息</DropDownItem>
            <br/>
            <DropDownItem>设置</DropDownItem>
            <br/>
            <br/>
            <DropDownItem @click="logout">退出</DropDownItem>
          </DropdownMenu>
        </Dropdown>
      </Col>
      </Col>
    </Row>
    <div>
      <Form>
        <Button @click="jumpBaiduMap1">百度地图1(js)</Button>
        <Button @click="jumpBaiduMap2">百度地图2(vue-baidu-map)</Button>
        <Button @click="jumpBaiduMap3">百度地图</Button>
      </Form>
    </div>
  </div>
</template>

<script>
    export default{
        data () {
            return {
              sysName:"iview-project",
              sysUserName:"",
              sysUserAvater:""
            }
        },
        methods:{
            logout:function () {
              let _this = this;
              this.$Modal.confirm({
                title:'提示',
                content:'确认退出吗?',
                okText:'确认',
                cancelText:'取消',
                onOk:()=>{
                    //清除缓存 退出达到登录页面
                    sessionStorage.removeItem('user');
                    _this.$router.push({path:'/login'})
                    this.$Message.success("退出成功")
                },
                onCancel:()=>{

                }
              })
            },
            jumpBaiduMap1(){
              this.$router.push({path:"/map"})
            },
            jumpBaiduMap2(){
              this.$router.push({path:"/baiduMapVue"})
            },
            jumpBaiduMap3(){
                this.$router.push({path:"/bdMap"})
            }
        },
        mounted(){
          //取缓存
          let user = sessionStorage.getItem('user')
          if(user){
              //将字符串转化为对象
              user = JSON.parse(user);
              this.sysUserName = user.name||"";
              this.sysUserAvater = user.avatar||"";
          }
        }
    }
</script>

<style>
    body {

    }
</style>
