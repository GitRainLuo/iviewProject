<template>
    <div>
      <Form :label-width="100" label-position="right">
        <Col span="6">
          <FormItem label="水果">
            <select-t :optionsArr="optionsArr1" :optionList="optionList1" @on-change="allSelectFruits"></select-t>
          </FormItem>
        </Col>
      </Form>
      <Button @click="submitInfo">提交</Button>
    </div>
</template>

<script>
  import selectT from "./Select.vue"
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
              oldOptions:[]
            }
        },
        components:{
          selectT
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
          }
        }

    }
</script>

<style>
</style>
