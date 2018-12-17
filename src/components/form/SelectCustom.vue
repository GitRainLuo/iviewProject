<template>
  <div>
    <Select v-model="optionsArr" @on-change="emitAllSelectFruits" placeholder="请选择" multiple>
      <Option v-for="item in optionList" :value="item.code" :key="item.code">{{item.name}}</Option>
    </Select>
    <div>选中的:{{optionsArr}}</div>
    <div>数据list:{{optionList}}</div>
  </div>
</template>

<script>
  export default{
    props:{
      //父组件传递过来的 选中的
      optionsArr:{
        type:Array,
        require:true,
        default:()=>[]
      },
      //数据
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
        //触发父组件事件
        this.$emit("on-change",val)
      }
    }
  }
</script>

<style>
</style>
