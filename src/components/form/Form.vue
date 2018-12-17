<template>
    <div>
      <Form :label-width="75" label-position="right">
        <FormItem label="树状:">
          <Col span="6">
            <Tree :data="data" @on-select-change="getTreeData"></Tree>
          </Col>
        </FormItem>
        <FormItem label="值:">
          <Col span="6">
            <Input v-model="treeData" readonly :placeholder="'name:'+$router.options.routes[1].name"/>
          </Col>
        </FormItem>
       <FormItem>
         <Col span="1">
          <Button @click="showModal">上传</Button>
         </Col>
       </FormItem>
      </Form>
      <!--<Col span="6">-->
        <!--<Upload action="//jsonplaceholder.typicode.com/posts/">-->
          <!--<Button>上传</Button>-->
        <!--</Upload>-->
      <!--</Col>-->
      <Modal v-model="isModalShow" title="上传">
        <Upload action="//jsonplaceholder.typicode.com/posts/" :before-upload="beforeUpload"
        >
          <Button>选择文件</Button>
          <div slot="tip">{{fileName}}</div>
        </Upload>
        <div slot="footer">
          <Button @click="submitForm">确定</Button>
          <Button style="margin-left: 5px;" @click="closeModal">取消</Button>
        </div>
      </Modal>
    </div>
</template>

<script>
    export default{
        data () {
            return {
                treeData:"",
                title1:"测试",
                isModalShow:false,
                file:"",
                fileName:"",
                data:[
                  {
                    code: 'parent 1',
                    expand: false,
                    children: [
                      {
                        code: 'parent 1-1',
                        expand: false,
                        children: [
                          {
                            code: 'leaf 1-1-1'
                          },
                          {
                            title: 'leaf 1-1-2'
                          }
                        ]
                      },
                      {
                        title: 'parent 1-2',
                        expand: false,
                        children: [
                          {
                            title: 'leaf 1-2-1'
                          },
                          {
                            title: 'leaf 1-2-1'
                          }
                        ]
                      }
                    ]
                  }

                ]
            }
        },
      mounted(){
        let  newdata = JSON.parse(JSON.stringify(this.data).replace(/code/g,"title"));
//        alert(JSON.stringify(newdata)+"new")
        this.data = newdata
//          alert(JSON.stringify(this.data))
//        this.data[0].title = this.title1
//        for(let i = 0;i<this.data.length;i++){
//          this.data[i].title = this.title1
//          for(let j = 0;j<this.data[i].children.length;j++){
//              this.data[i].children[j].title = this.title1
//            for(let m = 0 ;m<this.data[i].children.length;m++){
//              this.data[i].children[j].children[m].title = this.title1
//            }
//          }
//        }
      },
      methods:{
        showModal(){
            this.isModalShow = true
        },
        //获取选中的树的节点的值
        getTreeData(val){
            //val是一个数组
//            alert(JSON.stringify(val))
            this.treeData = val[0].title
        },
        beforeUpload(file){
            console.log(file)
            this.file = file
            const extension = file.name.split(".")[1];//xlsx
            const limitSize = file.size/1024/1024
            if(extension != "xls" && extension != "xlsx"){
                this.$Message.warning("只能上传xls或者xlsx格式的文件")
                return false
            }
            if(limitSize>5){
                this.$Message.warning("上传文件大小不能超过5M")
                return false
            }
            this.fileName = file.name
            //return false不会自动上传
            return false
        },
        submitForm(){
//            alert(this.file.name)
          if(this.fileName == ""){
              this.$Message.warning("上传文件不能为空,请选择需要上传的文件。")
              return false
          }
          let fileFormData = new FormData();
          fileFormData.append("file",this.file,this.fileName)
          let requestConfig = {
              headers:{
                  "Content-Type":"multipart/form-data"
              }
          }

        },
        closeModal(){
          this.isModalShow = false
        }
      }
    }
</script>

<style>
</style>
