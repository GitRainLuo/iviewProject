<template>
  <div>
    <Row class="container">
      <Col span="24" class="header">
        <Col span="10" class="logo">{{sysName}}</Col>
        <Col span="4" class="user-info">
          <Dropdown>
            <!--利用缓存拿头像-->
            <span><img :src="this.sysUserAvater"/>{{sysUserName}}</span>
            <!--直接拿本地的头像  assets下 得用require()-->
            <!--<span><img :src="require('../assets/avater.gif')"/>{{sysUserName}}</span>-->
            <DropdownMenu slot="list">
              <DropdownItem>我的消息</DropdownItem>
              <DropdownItem>设置</DropdownItem>
              <DropdownItem @click.native="logout" divided>退出</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </Col>
      </Col>
      <!--主菜单-->
      <Col span="24" class="main">
        <!--侧边栏导航菜单-->
        <aside>
          <!--accordion 每次至多展开一个菜单栏-->
          <!--iview Menu 不支持router 用on-select事件 根据获取的name(path)进行相应的跳转-->
          <Menu :active-name="acName" :model="vertical" accordion @on-select="routeTo" :open-names="open" ref="acName">
            <template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
              <!--name ==> 菜单项的唯一标识-->
              <Submenu :name="index+''">
                <!--标题-->
                <!--<template slot="title"><i :class="item.iconCls"></i>{{item.name}}</template>-->
                <template slot="title"><Icon :type="item.iconCls" />{{item.name}}</template>
                <!--子菜单-->
                <!--name ==> 子菜单项的唯一标识-->
                <MenuItem v-for="child in item.children" :name="child.path" :key="child.path" v-if="!child.hidden">{{child.name}}</MenuItem>
              </Submenu>
                <!--<MenuItem v-if="item.children.length>0" :index="item.children[0].path"><i :class="item.iconCls"></i>{{item.children[0].name}}</MenuItem>-->
            </template>
          </Menu>
        </aside>
        <section class="content-container">
          <div>
            <Col span="24" class="breadcrumb-container">
              <strong class="title">{{$route.name}}</strong>
              <Breadcrumb class="breadcrumb-inner">
                <BreadcrumbItem v-for="item in $route.matched" :key="item.path">{{item.name}}</BreadcrumbItem>
              </Breadcrumb>
            </Col>
            <Col span="24" class="breadcrumb-wrapper">
              <transition :name="fade" mode="out-in">
                <router-view></router-view>
              </transition>
            </Col>
          </div>
        </section>
      </Col>
    </Row>
  </div>
</template>

<script>
    export default{
        data () {
            return {
              sysName:"iview-project",
              sysUserName:"",
              sysUserAvater:"",
              acName:'/map',
              open:"['2']"
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
            routeTo(name){
//                alert(name)
                  this.$router.push(name)
            },
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
          this.$nextTick(()=>{
              //页面刷新时menu展开 以及默认的页面
              this.acName = '/map'
              this.open = ['2']
              this.$router.push({path:'/map'})
              this.$refs.acName.updateActiveName();
              this.$refs.acName.updateOpened();
          })
        }
    }
</script>

<style lang="scss" scoped>
.container{
  position: absolute;
  top: 0;
  width: 100%;
  .header{
    position: relative;
    height: 60px;
    line-height: 60px;
    background: rgb(32,160,255);
    color:#fff;
    .logo{
      font-size: 24px;
    }
    .user-info{
      position: absolute;
      right: 0;
      font-size:15px;
      line-height: 60px;
      img{
        width: 40px;
        height: 40px;
        margin: 0 5px;
        border-radius: 20px;
        vertical-align: middle;
      }
    }
  }
  .main{
    display: flex;
    position: absolute;
    top: 60px;
    overflow: hidden;
    aside{
      flex: 0 0 240px;
      /*flex-basis 分配时先预留这么多出来*/
      /*flex-basis: 240px;*/
      width: 240px;
      text-align: left;
      Menu{
        height: 100%;
      }
    }
    .content-container{
      /*剩余空间分配*/
      flex: 1;
      overflow-y: scroll;
      padding: 10px;
      .breadcrumb-container{
        .title{
          width: 100px;
          font-size: 20px;
          float: left;
        }
        .breadcrumb-inner{
          float: right;
        }
        .breadcrumb-wrapper{
          box-sizing: border-box;
        }
      }
    }
  }
}
</style>
