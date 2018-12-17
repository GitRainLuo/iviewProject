<template>
    <div>
       <Form :label-width="75" label-position="right">
         <!--<Col span="6">-->
           <!--<FormItem label="水果:">-->
             <!--<Select  v-model="optionsArr" @on-change="allSelect" placeholder="请选择" multiple>-->
               <!--<Option v-for="item in optionList" :value="item.code" :label="item.name" :key="item.code">{{item.name}}</Option>-->
             <!--</Select>-->
           <!--</FormItem>-->
         <!--</Col>-->
         <Col span="6">
           <FormItem label="水果:">
             <Select  v-model="optionsArr" @on-change="allSelectFruits" placeholder="请选择" multiple>
               <Option v-for="item in optionList" :value="item.code" :key="item.code">{{item.name}}</Option>
             </Select>
           </FormItem>
         </Col>
         <Col span="4">
            <Button @click="submitInfo">提交</Button>
         </Col>
       </Form>
    </div>
</template>

<script>
    export default{
        name:"Test",
        data () {
            return {
                optionList:[
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
                //选择的
                optionsArr:[],
                //上次选择的
                oldOptions:[]
            }
        },
        watch:{
            "optionsArr":function (val,oldV) {
              if(val.includes("all")){
                this.oldOptions[0] = oldV
//                alert(this.oldOptions[0]+"上一次-")
//                alert(val+"当前")
              }
            }
        },
        methods:{
            allSelect(val){
//                alert(val)
//              alert(this.oldOptions[0]+"上次的")
                let allValues = []
                //保留值
                for(let item of this.optionList){
                      allValues.push(item.code)
                }
//                allValues = this.optionList.filter(item => item.code != "all")
                console.log("opsArr:"+this.optionsArr)
                console.log("allValues:"+allValues)
                //用来存放上一次的值，进行对比
                const oldVal = this.oldOptions.length == 1 ? this.oldOptions[0] : []
                console.log("oldOptions的length:"+this.oldOptions.length+"--"+this.oldOptions)
                console.log("选中的:"+val)
                console.log("上一次选的:"+oldVal)
                console.log("是否含全选:"+val.includes("all"))
                console.log("上次选的是否含全选:"+oldVal.includes("all"))
                console.log("\n")
                debugger
                //如果是全选 则把所有的都选上
                if(val.includes("all")){
                    console.log(-1111111111111)
                    this.optionsArr = allValues
                }
                //取消全部选择 再次点击全选 上次有 当前没有 表示全部取消
                if(oldVal.includes("all") && !val.includes("all")){
                    console.log(11111111)
                    //清空选择的数组就ok
                    this.optionsArr = []
                }
                //点击的不是全部选择 点击的是单个选项 则需要排除全选 以及当前选择的
                //这样新的和上一次的都含有全选
                if(oldVal.includes("all") && val.includes("all")){
//                    alert(val)
                    console.log(222222222222)
                    //拿到全选的索引值
                    const index = val.indexOf("all")
                    console.log("index:"+index)
                    //把全选排除
                    val.splice(index,1)
                    console.log("这时候的val:"+val)
                    this.optionsArr = val
                    console.log("新的opArr:"+this.optionsArr)
//                  alert(3)
                }
//                alert(4)
                //没有点全选 但是把所有选项都选上 也是全选 上次和当前都没有全选
                if(!oldVal.includes("all") && !val.includes("all")){
                    console.log("oldVal:"+oldVal+" "+!oldVal.includes("all"))
                    console.log("val:"+val+" "+!val.includes("all"))
                    console.log("没加"+this.optionsArr)
                    console.log("val的长度:"+val.length)
                    console.log("all的长度减一:"+(allValues.length-1))
//                  alert(allValues.length-1)
                    if(val.length == (allValues.length - 1)){
                        this.optionsArr = ["all"].concat(val)
//                      alert(typeof val)
                        console.log("加上"+this.optionsArr)
                    }
                }
                //存下来当前的结果作为下一次选择的上一次数据
                this.oldOptions[0] = this.optionsArr
//                alert(this.oldOptions+"需要放到上一次数据的")
                console.log("oldOptions:"+this.oldOptions[0])
//              alert(6)
            },
            allSelectFruits(val){
                let allV = []
//                alert(val+"选中的")
//                alert(this.oldOptions[0]+"上次的")
                for(let item of this.optionList){
                    allV.push(item.code)
                }
                const oldV = this.oldOptions.length == 1 ? this.oldOptions[0] : []
                //全选
                if(val.includes("all")){
                  this.optionsArr = allV

                }
                //清除全选
                if(!val.includes("all")&&oldV.includes("all")){
                    this.optionsArr = []
//                  alert("清除")
                }
                //当前和上次都有全选 在点击某一项的时候全选和当前选择的取消选中状态
                if(val.includes("all") && oldV.includes("all")){
                  const index = val.indexOf("all")
                  val.splice(index,1)
                  this.optionsArr = val
//                  alert("----")
                }
              //所有的选项勾选上 全选进入选中状态
                if(!val.includes("all") && !oldV.includes("all")){
                      if(val.length == (allV.length-1)){
                        this.optionsArr = ["all"].concat(val)
//                        alert("++++++")
                      }
  //                alert("单个")
                }
                  this.oldOptions[0] = this.optionsArr
  //                alert(this.oldOptions+"需要放到上一次数据的")
            },
            submitInfo(){
//              this.optionsArr = this.optionsArr.splice(0,1)
//              for(let i = 0;i<this.optionsArr.length;i++){
//                  if(this.optionsArr[0]  == "all"){
//                      this.optionsArr.splice(0,1)
//                  }
//              }
              this.optionsArr = this.optionsArr.filter(item=>item!="all")
              alert(this.optionsArr+"提交")
            }
        }
    }
</script>

<style>

</style>
