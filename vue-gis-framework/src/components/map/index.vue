<template>
  <div id="map"></div>
</template>

<script>
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css'
var map; // 定义全局变量
var mapurl='http://mt3.google.cn/vt/lyrs=m@207000000&hl=zh-CN&gl=CN&src=app&s=Galile&x={x}&y={y}&z={z}';  //谷歌矢量图
// var mapurl='http://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}';  //高德地图

export default {
  data () {
    return {
      markLayer: undefined,
      allPoints: [],
    }
  },
  methods: {
    loadMap() {
      // console.log(this.LMap)
      map = this.LMap.map('map',{
        center:[31.95789128, 120.64626101],
        zoom:11,
        maxzoom: 18,
        minzoom: 1,
        zoomControl:false,  // 是否默认缩放控件添加到地图
        editable: true,  // 用于测绘
      });
      this.LMap.tileLayer(
        mapurl,
        {
          subdomains: ["1", "2", "3", "4"],
          attribution: "谷歌"
        }
      ).addTo(map);

    },
    loadPoints(points) {
      this.allPoints = points;
      this.clearPoints();
      let markGroup = [];
      if (this.allPoints && this.allPoints.length > 0) {
        for (let i = 0; i < this.allPoints.length; i++) {
          const Y = this.allPoints[i].Y;
          const X = this.allPoints[i].X;
          let singleMark = new this.LMap.marker([ Y, X ]);
          markGroup.push(singleMark);
        }
        this.markLayer = this.LMap.layerGroup(markGroup);
        map.addLayer(this.markLayer);
      }
      console.log(points);
      // this.LMap.marker([31.85618831, 120.56934479]).addTo(map)
      // .bindPopup('666')
      // .openPopup();
    },
    clearPoints() {
      if (this.markLayer !== undefined) {
        this.markLayer.clearLayers();
        map.removeLayer(this.markLayer);
      }
    }
  },
  mounted () {
    // this.loadMap();
  }
}
</script>

<style scoped>
#map{
  width: 100%;
  height: calc(100vh);
}
</style>