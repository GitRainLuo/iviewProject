<template>
    <div>
      <Form :label-width="100" label-position="right">
        <Col span="6">
          <FormItem label="水果">
            <select-t :optionsArr="optionsArr1" :optionList="optionList1" @on-change="allSelectFruits"></select-t>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="花">
            <select-custom :optionsArr="optionsFlowerArr" :optionList="flowerList" @on-change="allS('optionsFlowerArr',flowerList,'oldFlowerOptions',arguments)"></select-custom>
          </FormItem>
        </Col>
      </Form>
      <Button @click="submitInfo">提交</Button>
    </div>
</template>

<script>
  import selectT from "./Select.vue"
  import selectCustom from "./SelectCustom.vue"
    export default{
        name:"SelectParent",
        data () {
            return {
              optionList1:[
                {
                  code:"all",
                  name:"全选"
                },
                {
                  code:"apple",
                  name:"苹果"
                },
                {
                  code:"banana",
                  name:"香蕉"
                },
                {
                  code:"watermelon",
                  name:"西瓜"
                },
                {
                  code:"lemon",
                  name:"柠檬"
                },
                {
                  code:"orange",
                  name:"橙子"
                }
              ],
              optionsArr1:[],
              oldOptions:[],
              flowerList:[
                {
                  code:"all",
                  name:"全选"
                },
                {
                  code:"rose",
                  name:"玫瑰花"
                },
                {
                  code:"tulip",
                  name:"郁金香"
                },
                {
                  code:"jasmine",
                  name:"茉莉"
                },
                {
                  code:"chrysanthemum",
                  name:"菊"
                },
                {
                  code:"begonia",
                  name:"秋海棠"
                },
                {
                  code:"hydrangea",
                  name:"八仙花"
                },
                {
                  code:"azalea",
                  name:"杜鹃"
                },
                {
                  code:"gardenia",
                  name:"栀子"
                }
              ],
              //选中的
              optionsFlowerArr:[],
              oldFlowerOptions:[],
            }
        },
        components:{
          selectT,
          selectCustom
        },
        watch:{
          "optionsFlowerArr":function (val,oldV) {
            if(val.includes("all")){
              this.oldFlowerOptions[0] = oldV
            }
          }
        },
        methods:{
          allSelectFruits(val){
            let allV = []
            for(let item of this.optionList1){
              allV.push(item.code)
            }
            const oldV = this.oldOptions.length == 1 ? this.oldOptions[0] : []
            if(val.includes("all")){
              this.optionsArr1 = allV
            }
            if(!val.includes("all")&&oldV.includes("all")){
              this.optionsArr1 = []
            }
            if(!val.includes("all")&&!oldV.includes("all")){
                this.optionsArr1 = val
            }
            this.oldOptions[0] = this.optionsArr1
          },
          submitInfo(){
              this.optionsArr1 = this.optionsArr1.filter(item => item != "all")
              alert(this.optionsArr1)
          },
          allS(arg,argList,argOldOption,val){
            let flag = arg.indexOf(".")>0 ? true : false
            let newArg;
            if(flag){
              newArg = arg.split(".")
            }
            let allV = []
            for(let item of argList){
              allV.push(item.code)
            }
            const oldV = this[argOldOption].length == 1 ? this[argOldOption][0] : []
            //全选
            if(val[0].includes("all")){
              if(flag){
                this[newArg[0]][newArg[1]] = allV
              }else {
                this[arg] = allV
              }
//            alert(this.list.optionsArr1+":this.list.optionsArr1")
//          alert(this[arg]+"optionsArr1")
            }
            //清除全选
            if(!val[0].includes("all")&&oldV.includes("all")){
//          this[arg] = []
              if(flag){
                this[newArg[0]][newArg[1]] = []
              }else {
                this[arg] = []
              }
            }
            //当前和上次都有全选 在点击某一项的时候全选和当前选择的取消选中状态
            if(val[0].includes("all") && oldV.includes("all")){
              const index = val[0].indexOf("all")
              val[0].splice(index,1)
//          this[arg] = val[0]
              if(flag){
                this[newArg[0]][newArg[1]] = val[0]
              }else {
                this[arg] = val[0]
              }
            }
            //所有的选项勾选上 全选进入选中状态
            if(!val[0].includes("all") && !oldV.includes("all")){
              if(val[0].length == (allV.length-1)){
//            this[arg] = ["all"].concat(val[0])
                if(flag){
                  this[newArg[0]][newArg[1]] = ["all"].concat(val[0])
                }else {
                  this[arg] = ["all"].concat(val[0])
                }
              }
//          alert("单个")
              //单个选的 把值赋上
              if(flag){
                this[newArg[0]][newArg[1]] = val[0]
                alert("选中的:"+this.list.optionsArr1)
              }else {
                this[arg] = val[0]
              }
            }
//        this[argOldOption][0] = this[arg]
            //将本次的数据赋给oldOption作为下次选择时的上一次数据
            if(flag){
              this[argOldOption][0] = this[newArg[0]][newArg[1]]
            }else {
              this[argOldOption][0] = this[arg]
            }
          }
        }

    }
</script>

<style>
</style>
