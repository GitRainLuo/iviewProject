<template>
    <div>
      <Form :label-width="60">
        <Col span="6">
          <FormItem label="经度:">
            <Input v-model="center.lng"/>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="纬度:">
            <Input v-model="center.lat"/>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="缩放:">
            <Input v-model="zoom"/>
          </FormItem>
        </Col>
      </Form>
      <baidu-map :center="center" :zoom="zoom" @ready="mapCreate" class="map" :scroll-wheel-zoom="true" @moving="syncCenterAndZoom" @moveend="syncCenterAndZoom" @zoomend="syncCenterAndZoom">
        <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true" @locationSuccess="getLocationSuccess" @locationError="getLocationError"></bm-geolocation>
        <bm-marker :position="autoLocationPoint" v-if="initLocation" :tragging="true" animation="BMAP_ANIMATION_BOUNCE" @click="infoWindowOpen">
          <!--<bm-info-window :show="showWindow" @close="infoWindowClose" @open="infoWindowOpen" v-for="(value,key) in currPosition" :key="key">{{key}}:{{value}}</bm-info-window>-->
          <bm-info-window :show="showWindow" @close="infoWindowClose" @open="infoWindowOpen" v-for="item in currPosition" :key="index">地址:{{item.address}}</bm-info-window>
          <!--<bm-label v-for="item in currPosition":key="index" :content="'<span>'+'地址:'+'</span>'+'<span>'+item.address+'</span>'" :position="autoLocationPoint" :labelStyle="{fontSize:'12px',lineHeight:'12px',title:'地址'}"/>-->
        </bm-marker>
        <!--<bm-marker v-for="(item,index) in bauduMapList" :key="index" :position="item.address">-->
          <!--<bm-label-->
            <!--:content="'<h>' + item.title + '</h></br><span>' + item.addressName + '</span>' + (item.time ? '</br><span>操作时间：' + item.time + '</span>' : '')"-->
            <!--:title="item.title + item.addressName + (item.time ? '。操作时间：' + item.time : '')"/>-->
        <!--</bm-marker>-->
      </baidu-map>
    </div>
</template>

<script>
    export default{
        name:"bdMap",
        data () {
            return {
                center:{
                    lng:0,
                    lat:0
                },
                zoom:3,
                showWindow:false,
//                currPosition:{
//                    "地址":"跨境电子产业园"
//                },
                currPosition:[
                  {
                      address:"跨境电子产业园"
                  }
                ],
                userAddress:"四川省成都市武侯区",
                userLngAndLat:{},
                bauduMapList:[]
            }
        },
        mounted(){
            this.userPoint();
        },
        methods:{
            mapCreate({BMap,map}){
                console.log({BMap,map})
//                this.center.lng = 116.404
//                this.center.lat = 39.915
//                this.zoom = 15
                //进入页面自动定位
                let _this = this //设置临时变量 百度地图回调里使用的this指向的不是vue的实例
                let geolocation = new BMap.Geolocation()
                geolocation.getCurrentPosition(function (ps) {
                  console.log(JSON.stringify(ps)+"ps")
                  //{"accuracy":null,"altitude":null,"altitudeAccuracy":null,"heading":null,"latitude":"31.50470126","longitude":"104.70551898","speed":null,"timestamp":null,"point":{"lng":104.70551898,"lat":31.50470126},"address":{"city":"绵阳市","city_code":0,"district":"","province":"四川省","street":"","street_number":""}}
                  _this.center = {lng:ps.longitude, lat:ps.latitude}//设置center
                  _this.zoom = 15
                  _this.autoLocationPoint = {lng:ps.longitude,lat:ps.latitude}//自定义覆盖物
                  _this.initLocation = true
                  console.log("center:",JSON.stringify(_this.center))
                  //center: {"lng":"104.70551898","lat":"31.50470126"}
                },{enableHightAccuracy:true})//enableHightAccuracy可达精度

//                geolocation.getCurrentPosition(function (pos) {
//                  if (this.getStats() == BMAP_STATUS_SUCCESS){
//                      let mk = new BMap.Marker(pos.point)
//                      map.addOverlay(mk)
//                      map.panTo(pos.point)
//                      alert("你的位置"+pos.point.lng+","+pos.point.lat)
//                  }else {
//                      alert("failed"+this.getStats())
//                  }
//                },{enableHeightAccuracy:true})
            },
            syncCenterAndZoom(e){
                const {lng,lat} = e.target.getCenter();
//                alert(JSON.stringify({lng,lat}))
                this.center.lng = lng;
                this.center.lat = lat;
                this.zoom = e.target.getZoom();
            },
            infoWindowOpen(){
                this.showWindow = true
            },
            infoWindowClose(){
                this.showWindow = false
            },
            //解析经纬度
           userPoint(){
             let myGeo = new BMap.Geocoder()
             let _this = this;
             if(this.userAddress){
                 myGeo.getPoint(this.userAddress,point=>{
                     if(point){
                         _this.userLngAndLat = point
                     }else {
                         _this.userLngAndLat = null
                     }
                 })
             }else {
                 this.userLngAndLat = null
             }
             this.openUserMap();
             this.mapCreate({BMap,map});
           },
          openUserMap(){
               this.bauduMapList = [];
               if(this.userLngAndLat){
                   this.bauduMapList.push({
                     title:"用户地址:",
                     address:this.userLngAndLat,
                     addressName:this.userAddress
                   })
               }else {
                   this.$Notice.warning({
                     title:"警告提示",
                     desc:"无法解析"
                   })
               }
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
