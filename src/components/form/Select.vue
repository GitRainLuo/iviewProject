<template>
    <div>
      <Select v-model="optionsArr" @on-change="emitAllSelectFruits" placeholder="请选择" multiple>
        <Option v-for="item in optionList" :value="item.code" :key="item.code">{{item.name}}</Option>
      </Select>
      <div>{{optionsArr}}</div>
    </div>
</template>

<script>
    export default{
        props:{
            optionsArr:{
                type:Array,
                require:true,
                default:()=>[]
            },
            optionList:{
                type:Object
            },
        },
        data () {
            return {
              //选择的
//              optionsArr:[],
              //上次选择的
//              oldOptions:[]
            }
        },
        methods:{
//          allSelectFruits(val){
//            let allV = []
//            for(let item of this.optionList){
//              allV.push(item.code)
//            }
//            const oldV = this.oldOptions.length == 1 ? this.oldOptions[0] : []
//            if(val.includes("all")){
//              this.optionsArr = allV
//
//            }
//            if(!val.includes("all")&&oldV.includes("all")){
//              this.optionsArr = []
//            }
//            this.oldOptions[0] = this.optionsArr
//          },
          emitAllSelectFruits(val){
              this.$emit("on-change",val)
          }
        }
    }
</script>

<style>
</style>
