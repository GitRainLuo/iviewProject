<template>
  <div>
    <Form :label-width="100" label-position="right">
      <Col span="6">
        <FormItem label="水果">
          <select-custom :optionsArr="list.optionsArr1" :optionList="list.optionList1" @on-change="allSelectFruits('list.optionsArr1',list.optionList1,'oldOptions',arguments)"></select-custom>
        </FormItem>
      </Col>
      <Col span="6">
        <FormItem label="花">
          <select-custom :optionsArr="optionsFlowerArr" :optionList="flowerList" @on-change="allSelectFruits('optionsFlowerArr',flowerList,'oldFlowerOptions',arguments)"></select-custom>
        </FormItem>
      </Col>
    </Form>
    <Button @click="submitInfo">提交</Button>
  </div>
</template>

<script>
  import selectCustom from "./SelectCustom.vue"
  export default{
    name:"SelectForm",
    data () {
      return {
        list:{
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
        },
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
        optionsFlowerArr:[],
        oldOptions:[],
        oldFlowerOptions:[],
      }
    },
    components:{
      selectCustom
    },
    watch:{
      //侦听选择的变化 尤其是包含全选与不含全选是 上一次选中的处理
      "list.optionsArr1":function (val,oldV) {
        if(val.includes("all")){
          this.oldOptions[0] = oldV
        }
      },
      "optionsFlowerArr":function (val,oldV) {
        if(val.includes("all")){
          this.oldFlowerOptions[0] = oldV
        }
      }
    },
    methods:{
//      allSelectFruits(val){
//        let allV = []
//        for(let item of this.optionList1){
//          allV.push(item.code)
//        }
//        const oldV = this.oldOptions.length == 1 ? this.oldOptions[0] : []
//        //全选
//        if(val.includes("all")){
//          this.optionsArr1 = allV
//
//        }
//        //清除全选
//        if(!val.includes("all")&&oldV.includes("all")){
//          this.optionsArr1 = []
//        }
//        //当前和上次都有全选 在点击某一项的时候全选和当前选择的取消选中状态
//        if(val.includes("all") && oldV.includes("all")){
//          const index = val.indexOf("all")
//          val.splice(index,1)
//          this.optionsArr1 = val
//        }
//        //所有的选项勾选上 全选进入选中状态
//        if(!val.includes("all") && !oldV.includes("all")){
//          if(val.length == (allV.length-1)){
//            this.optionsArr1 = ["all"].concat(val)
//          }
//        }
//        this.oldOptions[0] = this.optionsArr1
//      },


      //封装的通用方法
      allSelectFruits(arg,argList,argOldOption,val){
          //arg:data里面的属性 => 选中的  argList:list argOldOption:上一次选中的 val:子组件传过来的
        //this[arg] arg:data里面的属性 如:this[optionsFlowerArr] ==> this.optionsFlowerArr
        //arg = arg.indexOf(".") ? arg.split(".")[0] : arg
        //对传进来的参数判断是否有点处理如:list.optionsArr1
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
        if(flag){
          this[argOldOption][0] = this[newArg[0]][newArg[1]]
        }else {
          this[argOldOption][0] = this[arg]
        }
      },
      submitInfo(){
        this.list.optionsArr1 = this.list.optionsArr1.filter(item => item != "all")
//        this.optionsFlowerArr = this.optionsFlowerArr.filter(item => item != "all")
        alert("提交:"+this.list.optionsArr1)
//          alert("提交:"+this.optionsFlowerArr)
      }
    }

  }
</script>

<style>
</style>
