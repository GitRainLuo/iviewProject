<template>
   <div>
     <div id="allMap" :style="mapStyle" ref="allMap"></div>
     <div style="margin: 5px auto">
       <Form :label-width="60">
         <Col span="4">
           <FormItem label="经度:">
             <Input v-model="lgtude" placeholder="输入经度:"/>
           </FormItem>
         </Col>
         <Col span="4">
           <FormItem label="经度:">
             <Input v-model="latude" placeholder="输入维度:"/>
           </FormItem>
         </Col>
         <Col span="1">
           <FormItem>
             <Button @click="theLocation()">查询</Button>
           </FormItem>
         </Col>
       </Form>
     </div>
   </div>
</template>

<script>
    import BMap from 'BMap'
    export default{
        data () {
            return {
                mapStyle:{
                    width:"100%",
                    height:this.mapHeight+"px"
                },
                lgtude:"",
                latude:""
            }
        },
        props:{
            // 地图在该视图上的高度
            mapHeight:{
                type:Number,
                default:450
            },
            //经度
            logintude:{
                type:Number,
                default:116.404
            },
            //维度
            latitude:{
                type:Number,
                default:39.915
            },
            description:{
              type:String,
              default:'天安门'
            }
        },
        mounted(){
            //写在mounted
            this.baiduMap();
        },
        methods:{
            baiduMap(){
//                let map = new BMap.Map("allMap");
                let map = new BMap.Map(this.$refs.allMap);//创建Map实例
//                let point = new BMap.Point(this.logintude,this.latitude);
                let point = new BMap.Point(116.307852,40.057031);
                let marker = new BMap.Marker(point); //创建标注
                map.addOverlay(marker);//添加Overlay(将标注添加到地图中)
                map.centerAndZoom(point,11); //初始化地图,设置中心点坐标和地图级别
                map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放

//               //信息窗的配置信息
//                let opts ={
//                  width :250,//信息窗口宽度
//                  height:75,//信息窗口高度
//                  title :"地址：",//信息窗口标题
//                }
//                let infoWindow =new BMap.InfoWindow(this.description, opts);// 创建信息窗口对象
//                marker.addEventListener("click",function(){
//                  //点击时的信息窗口开启
//                  //alert("你点击了")
//                  map.openInfoWindow(infoWindow,point);
//                });
//
//                //开启信息窗口(自定默认的地点)
//                map.openInfoWindow(infoWindow,point);
//                //map.openInfoWindow(infoWindow,map.getCenter());


                //检索功能的信息窗口
              let content = '<div style="margin:0;line-height:20px;padding:2px;">' +
                '<img src="../img/baidu.jpg" alt="" style="float:right;zoom:1;overflow:hidden;width:100px;height:100px;margin-left:3px;"/>' +
                '地址：北京市海淀区上地十街10号<br/>电话：(010)59928888<br/>简介：百度大厦位于北京市海淀区西二旗地铁站附近，为百度公司综合研发及办公总部。' +
                '</div>';

              //创建检索信息窗口对象
              let searchInfoWindow = null;
              searchInfoWindow = new BMapLib.SearchInfoWindow(map, content, {
                title  : "百度大厦",      //标题
                width  : 290,             //宽度
                height : 105,              //高度
                panel  : "panel",         //检索结果面板
                enableAutoPan : true,     //自动平移
                searchTypes   :[
                  BMAPLIB_TAB_SEARCH,   //周边检索
                  BMAPLIB_TAB_TO_HERE,  //到这里去
                  BMAPLIB_TAB_FROM_HERE //从这里出发
                ]
              });
              marker.enableDragging(); //marker可拖拽
              marker.addEventListener("click", function(e){
                searchInfoWindow.open(marker);
              })
              map.addOverlay(marker); //在地图中添加marker
            },
            theLocation(){
                if(this.lgtude != ""&& this.latude !=""){
                  map.clearOverlays();
                  var new_point = new BMap.Point(this.lgtude,this.latude);
                  var marker = new BMap.Marker(new_point);  // 创建标注
                  map.addOverlay(marker);              // 将标注添加到地图中
                  map.panTo(new_point);
                }
            }
        }
    }
</script>

<style>
#allMap{
  width: 100%;
  height: 100%;
}
/*去掉左下角图标*/
.BMap_cpyCtrl{
  display: none;
}
.anchorBL{
  display: none;
}
</style>
