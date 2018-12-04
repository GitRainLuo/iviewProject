<template>
 <div>
   <!--<b-map :mapHeight="300" :longitude="116.302183" :latitude="39.830263"></b-map>-->
   <b-map></b-map>
 </div>
</template>

<script>import bMap from './BaiMap/BaiMap.vue';
export default {
    components:{
        bMap
    },
  name: 'Map',
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
