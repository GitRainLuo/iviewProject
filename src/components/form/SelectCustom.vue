<template>
  <div>
    <Select v-model="optionsArr" @on-change="emitAllSelectFruits" placeholder="请选择" multiple>
      <Option v-for="item in optionList" :value="item.code" :key="item.code">{{item.name}}</Option>
    </Select>
    <div>{{optionsArr}}</div>
    <div>list:{{optionList}}</div>
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
      emitAllSelectFruits(val){
        this.$emit("on-change",val)
      }
    }
  }
</script>

<style>
</style>
