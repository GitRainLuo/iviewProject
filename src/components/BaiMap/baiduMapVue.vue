<template>
    <div>
      <div style="margin-bottom: 10px">
        <label>关键词：<input v-model="keyword"></label>
        <label>地区：<input v-model="location"></label>
      </div>
      <baidu-map :center="center" :zoom="zoom" @ready="handlerMap" class="map" :scroll-wheel-zoom="true" @click="getClickInfo">
          <!--比例尺-->
          <bm-scale anchor="BMAP_ANCHOR_TOP_LEFT"></bm-scale>
          <!--地图类型-->
          <bm-map-type :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']" anchor="BMAP_ANCHOR_TOP_LEFT"></bm-map-type>
          <!--缩放-->
          <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
          <!--定位-->
          <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
          <bm-marker :position="{lng: center.lng, lat: center.lat}" :dragging="true" animation="BMAP_ANIMATION_BOUNCE"></bm-marker>
          <!--自动填充-->
          <bm-control :offset="{width: '10px', height: '10px'}">
            <bm-auto-complete v-model="keyword" :sugStyle="{zIndex: 999}">
              <search-field placeholder="请输入地名关键字"></search-field> <!-- 这里指代一个自定义搜索框组件 -->
            </bm-auto-complete>
          </bm-control>
          <bm-local-search :keyword="keyword"></bm-local-search>
          <!--检索-->
          <!--<bm-local-search :keyword="keyword" :auto-viewport="true" :location="location"></bm-local-search>-->
        </baidu-map>
    </div>
</template>

<script>
    export default{
        name:"baiduMapVue",
        data () {
            return {
              center: {lng: 0, lat: 0},
              zoom: 3,
              location: '北京',
              keyword: '百度',
            }
        },
        methods:{
          handlerMap({BMap, map}) {
            console.log(BMap, map)
            this.center.lng = 116.404
            this.center.lat = 39.915
            this.zoom = 15
          },
          getClickInfo(e){
              this.center.lng = e.point.lng;
              this.center.lat = e.point.lat;
              alert(this.center.lng+"-"+this.center.lat)
          }
        }
    }
</script>

<style>
.map{
  width: 100%;
  height: 400px;
}
.BMap_cpyCtrl{
  display: none;
}
.anchorBL{
  display: none;
}
</style>
