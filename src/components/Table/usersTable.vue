<template>
    <div>
      <Form style="margin-bottom: 5px">
        <Col span="4">
          <FormItem>
            <Input v-model="searchCondition.name" placeholder="输入姓名查询" clearable/>
          </FormItem>
        </Col>
        <Col span="2">
          <Button @click="getUsersListPages" style="margin-left: 5px">查询</Button>
        </Col>
        <Col span="2">
        <Button @click="resetSearchCondition">清空</Button>
        </Col>
      </Form>
      <div class="contentAndButton">
        <span class="content">共有<span class="colorBlue">{{table.total}}</span>条数据</span>
        <Button @click="batchDelete">批量删除</Button>
        <Button @click="addNewUser">新增</Button>
      </div>
      <Table :columns="table.userColumns" :data="table.users" style="width: 950px" border stripe :loading="loading" @on-selection-change="selectChange" no-data-text="没有数据"></Table>
      <Page :total="table.total" show-elevator show-total show-sizer @on-change="pageChange" @on-page-size-change="pageSizeChange"></Page>
      <!--编辑弹窗-->
      <Modal v-model="isModalShow" title="编辑">
        <Form :model="formData" ref="formData" :rules="formDataRules" :label-width="75" label-position="right">
          <FormItem label="姓名:" prop="name">
            <Input v-model="formData.name" placeholder="请输入姓名" clearable/>
          </FormItem>
          <FormItem label="年龄:" prop="age">
            <Input v-model="formData.age" placeholder="输入年龄" clearable/>
          </FormItem>
          <FormItem label="性别" prop="sex">
            <RadioGroup v-model="formData.sex">
              <Radio :label="1">男</Radio>
              <Radio :label="0">女</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="出生日期:" prop="birth">
            <DatePicker v-model="formData.birth" placeholder="选择出生日期" clearable></DatePicker>
          </FormItem>
          <FormItem label="地址:" prop="addr">
            <Input v-model="formData.addr" placeholder="输入地址" clearable/>
          </FormItem>
        </Form>
        <div slot="footer">
          <Button @click="submitConfirm">确认</Button>
          <Button>取消</Button>
        </div>
      </Modal>
    </div>
</template>

<script>
    import {getUserList,getUsetListPages,deleteUser,batchDeleteUser,editUserInfo,addUser,searchByName} from '../../api/api';
    import util from "../../common/js/util";
    export default{
        name:"usersTable",
        data () {
            return {
                table:{
                    userColumns:[
                      {
                          type:"selection",
                          width:60
                      },
                      {
                          type:"index",
                          title:"编号",
                          width:70,
                          align:"center"
                      },
                      {
                        key:"name",
                        title:"姓名",
                        width:100,
                        align:"center"
                      },
                      {
                        key:"egName",
                        title:"英文名",
                        width:100,
                        align:"center"
                      },
                      {
                        key:"age",
                        title:"年龄",
                        width:70,
                        align:"center"
                      },
                      {
                        key:"sex",
                        title:"性别",
                        width:70,
                        align:"center",
                        render:(h,{row,clomuns,index})=>{
                            return h("div",{},row.sex == '1' ? "男" : "女")
                        }
                      },
                      {
                        key:"birth",
                        title:"出生日期",
                        width:150,
                        align:"center"
                      },
                      {
                        key:"addr",
                        title:"地址",
                        width:200,
                        align:"center"
                      },
                      {
                          type:"action",
                          title:"操作",
                          width:150,
                          align:"center",
                          render:(h,{row,columns,index})=>{
                                return h("div",{},[
                                    h("Button",
                                      //props DOM属性操作
                                      {
                                          props:{
                                              size:"small"
                                          },
                                          on:{
                                              click:()=>{
                                                  //编辑界面带出数据
                                                  this.formData = Object.assign({},row)
                                                  this.isAddNew = false;
                                                  this.isEdit = true;
                                                  this.isModalShow = true
                                              }
                                          }
                                      },"编辑"),
                                    h("Button",
                                      {
                                          props:{
                                              size:"small"
                                          },
                                          style:{
                                              marginLeft:"5px"
                                          },
                                          on:{
                                              click:()=>{
                                                  this.$Modal.confirm({
                                                    title:"提示",
                                                    content:"确定要删除吗?",
                                                    onOk:()=>{
                                                      this.deleteUserById(row.id)
                                                    }
                                                  })
                                              }
                                          }
                                      },"删除")
                                ])
                          }
                      }
                    ],
                    users:[],
                    total:0,
                    page:1,
                    size:10
                },
                searchCondition:{
                    name:""
                },
                loading:false,
                selected:[],
                selectedIds:[],
                //编辑弹窗控制
                isModalShow:false,
                //表单
                formData:{
                    name:"",
                    age:"",
                    sex:"",
                    birth:"",
                    addr:""
                },
                //表单验证
                formDataRules:{
                    name:[
                      {required:true,message:"姓名不能为空",trigger:"blur"}
                    ],
//                    age:[
//                      {required:true,message:"年龄不能为空",trigger:"blur"},
////                      {pattern:/^[1-9]{1-3}$/,message:"年龄格式不对",trigger:"change"}
//                    ],
//                    sex:[
//                      {required:true}
//                    ],
//                    birth:[
//                      {type:"date",required:true,message:"选择出生日期",trigger:"change"}
//                    ],
//                    addr:[
//                      {required:true,message:"输入地址",trigger:"blur"}
//                    ]
                },
                //新增
                isAddNew:false,
                //编辑
                isEdit:false
            }
        },
        mounted(){
//            this.getUsersList();
            this.getUsersListPages();
        },
        methods:{
            //获取用户列表
            getUsersList(){
                let param = {
                    name:this.searchCondition.name,
                };
                getUserList(param).then(({data})=>{
                    this.table.users = data.users;
                })
            },
            //获取用户列表 分页
            getUsersListPages(){
                this.loading = true
                let param = {
                    name:this.searchCondition.name,
                    page:this.table.page,
                    size:this.table.size
                };
                getUsetListPages(param).then(({data})=>{
                    this.loading = false
                    this.table.users = data.users;
                    this.table.total = data.total;
//                    this.table.size = data.size
                })
            },
            pageChange(page){
                this.table.page = page;
                this.getUsersListPages();
            },
            pageSizeChange(size){
                this.table.size = size;
                this.getUsersListPages();
            },
            //删除
            deleteUserById(id){
                this.loading = true
                let param = {id:id}
//                alert(JSON.stringify(param))
                deleteUser(param).then(({data})=>{
                    this.loading = false
                    if(data.code == 200){
                        this.$Notice.success({
                          title:"成功提示",
                          desc:"删除成功"
                        })
                        this.getUsersListPages();
                    }
                })
            },
            selectChange(selections){
                this.selected = selections;
//                alert(JSON.stringify(this.selected))
            },
            //批量删除
            batchDelete(){
                this.loading = true
                this.selectedIds = this.selected.map((item,i)=>{
                    return item.id
                })
//                alert(JSON.stringify(this.selectedIds))
//                方法一
//                this.selectedId.forEach((item)=>{
//                    this.deleteUserById(item)
//                })
                if(this.selectedIds.length){
                  let param = {ids:this.selectedIds};
//                alert(JSON.stringify(param))
                  batchDeleteUser(param).then(({data})=>{
                    this.loading = false
                    if(data.code == 200){
                      this.$Notice.success({
                        title:"成功提示",
                        desc:"批量删除用户成功"
                      })
                      this.getUsersListPages();
                    }
                  })
                }else {
                    this.$Message.error("批量选择不能为空,请选择至少一项")
                    this.loading = false
                }

            },
            //编辑提交
            submitConfirm(){
              this.$Modal.confirm({
                title:"提示:",
                content:"确认提交吗?",
                onOk:()=>{
                    this.submitEditInfo();
                }
              })
            },
            //编辑信息提交
            submitEditInfo(){
                this.$refs.formData.validate(valid=>{
                    if(valid){
                      let param = Object.assign({},this.formData)
                      //引用工具类写的日期格式规范
                      param.birth = (!param.birth || param.birth == '') ? "": util.formatDate.format(new Date(param.birth),"yyyy-MM-dd")
//                      alert("参数:"+JSON.stringify(param))
                      if(this.isEdit){
                        editUserInfo(param).then(({data})=>{
                          if(data.code == 200){
                            this.isModalShow = false;
                            this.$Notice.success({
                              title:"成功提示",
                              desc:data.msg
                            })
                            this.getUsersListPages();
                          }
                        })
                      }else {
                        addUser(param).then(({data})=>{
                              if(data.code == 200){
                                  this.isModalShow = false;
                                  this.$Notice.success({
                                    title:"成功提示",
                                    desc:data.msg
                                  })
                                this.getUsersListPages();
                              }
                        })
                      }
                    }else {
                        this.$Message.error("请填写完所有必填项")
                    }
                })
            },
            //新增
            addNewUser(){
                this.isAddNew = true;
                this.isEdit = false;
                alert("新增"+this.isAddNew +"更新:"+this.isEdit)
                this.isModalShow = true;
                this.$refs.formData.resetFields();
            },
            //查询
            searchByName(){
                let param = this.searchCondition.name;
                searchByName(param).then(({data})=>{
                    if(data.code == 200){
                        this.table.users = data.users
                    }
                })
            },
            //清空查询条件
            resetSearchCondition(){
                this.searchCondition.name = ""
            },
        }
    }
</script>

<style lang="scss" scoped>
 .contentAndButton{
   text-align: left;
   margin-bottom: 5px;
   .content{
     margin-right: 5px;
     font-size: 13px;
   }
   .colorBlue{
     color: aqua;
   }
 }
</style>
