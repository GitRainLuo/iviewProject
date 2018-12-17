<template>
  <div>
    <Form :label-width="100" label-position="right">
      <Col span="6">
        <FormItem label="水果">
          <select-custom :optionsArr="optionsArr1" :optionList="optionList1" @on-change="allSelectFruits('optionsArr1',optionList1,'oldOptions',arguments)"></select-custom>
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
        optionsArr1:[],
        optionsFlowerArr:[],
        oldOptions:[],
        oldFlowerOptions:[],
      }
    },
    components:{
      selectCustom
    },
    watch:{
      "optionsArr1":function (val,oldV) {
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
      allSelectFruits(arg,arg1,argOld,val){
        let allV = []
        for(let item of arg1){
          allV.push(item.code)
        }
        const oldV = this[argOld].length == 1 ? this[argOld][0] : []
        //全选
        if(val[0].includes("all")){
          this[arg] = allV
//          alert(this[arg]+"optionsArr1")
        }
        //清除全选
        if(!val[0].includes("all")&&oldV.includes("all")){
          this[arg] = []
        }
        //当前和上次都有全选 在点击某一项的时候全选和当前选择的取消选中状态
        if(val[0].includes("all") && oldV.includes("all")){
          const index = val[0].indexOf("all")
          val[0].splice(index,1)
          this[arg] = val[0]
        }
        //所有的选项勾选上 全选进入选中状态
        if(!val[0].includes("all") && !oldV.includes("all")){
          if(val[0].length == (allV.length-1)){
            this[arg] = ["all"].concat(val[0])
          }
        }
        this[argOld][0] = this[arg]
      },
      submitInfo(){
        this.optionsArr1 = this.optionsArr1.filter(item => item != "all")
//        alert(this.optionsArr1+"提交")
      }
    }

  }
</script>

<style>
</style>
