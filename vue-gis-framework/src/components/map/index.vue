<template>
<div>
  <div id="map">
    <mapTool @zoomIn="zoomIn" @zoomOut="zoomOut" :zuobiao="zuobiaoData" @changeMapLayer="changeMapLayer"/>
  </div>

</div>
</template>

<script>
import Vue from 'vue';
// eslint-disable-next-line vue/no-parsing-error
import popDataShow from '@/views/onlineMonitor/dataShow/PopData';
import popAlarmShow from '@/views/onlineMonitor/alarmInfo/PopAlarm';
import popGasShow from '@/views/envirQuality/envirGas/PopGas';

// import shadowImg from '@/assets/imgs/marker-shadow.png';
import airImgI from '../../assets/imgs/air/p1.png';
import airImgII from '../../assets/imgs/air/p2.png';
import airImgIII from '../../assets/imgs/air/p3.png';
import airImgIV from '../../assets/imgs/air/p4.png';
import airImgV from '../../assets/imgs/air/p5.png';
import airImgVI from '../../assets/imgs/air/p6.png';
import airImgVII from '../../assets/imgs/air/p0.png';

import mapTool from './mapTools.vue';

let map; // 定义全局变量
const googelMapurl = 'http://mt3.google.cn/vt/lyrs=m@207000000&hl=zh-CN&gl=CN&src=app&s=Galile&x={x}&y={y}&z={z}'; // 谷歌矢量图
const gaodeMapurl = 'http://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}'; // 高德地图

const ExDataShowPopup = Vue.extend(popDataShow); // 【在线监测】弹框
const ExAlarmShowPopup = Vue.extend(popAlarmShow); // 【在线监测】弹框
const ExGasShowPopup = Vue.extend(popGasShow); // 【环境空气】弹框

export default {
  components: {
    mapTool,
  },
  data() {
    return {
      markLayer: undefined, // 存放点位集合的图层
      allPoints: [],
      zuobiaoData: {
        lat: '0', // 纬度
        lng: '0', // 经度
        level: 20, // 层级
      },
      mapGoogel: undefined, // 存放谷歌地图的底图
      mapGaode: undefined, // 存放高德地图的底图
      layerGoogel: undefined, // 存放谷歌地图的图层
      layerGaode: undefined, // 存放高德地图的图层
      // googelMap,
    };
  },
  methods: {
    changeMapLayer(layerType) {
      // 初次加载谷歌图层，预加载作用
      if (this.layerGoogel === undefined) {
        this.mapGoogel = this.LMap.tileLayer(googelMapurl, { minZoom: 10, maxZoom: 20 });
        this.layerGoogel = this.LMap.layerGroup([this.mapGoogel]);
      }
      // 初次加载高德图层，预加载作用
      if (this.layerGaode === undefined) {
        this.mapGaode = this.LMap.tileLayer(gaodeMapurl, { subdomains: ['1', '2', '3', '4'], minZoom: 10, maxZoom: 20 });
        this.layerGaode = this.LMap.layerGroup([this.mapGaode]); // 加载多个底图的时候
        // this.mapItem2 = this.LMap.tileLayer(this.oneMapNotes);
        // this.layerImg = this.LMap.layerGroup([this.mapItem1, this.mapItem2]); // 加载多个底图的时候
      }
      if (layerType === 'google') {
        map.removeLayer(this.layerGaode);
        this.layerGoogel.addTo(map);
      } else if (layerType === 'gaode') {
        map.removeLayer(this.layerGoogel);
        this.layerGaode.addTo(map);
      }
    },
    // ================================================================================================================= 使用用户自己的图标 ----气
    customIcon(icon) {
      const LeafIcon = this.LMap.Icon.extend({
        options: {
          // shadowUrl: shadowImg, // 设置阴影，因为点位图标已经自带阴影了，就不使用其他阴影了
          iconSize: [32, 52], // 图标的大小
          shadowSize: [41, 41], // 影子的大小
          iconAnchor: [16, 52], // 图标将对应标记点的位置
          // shadowAnchor: [4, 62], // 相同的影子
          popupAnchor: [1, -38], // 点的相对于iconAnchor弹出应该开放
        },
      });
      const IconI = new LeafIcon({ iconUrl: airImgI });
      const IconII = new LeafIcon({ iconUrl: airImgII });
      const IconIII = new LeafIcon({ iconUrl: airImgIII });
      const IconIV = new LeafIcon({ iconUrl: airImgIV });
      const IconV = new LeafIcon({ iconUrl: airImgV });
      const IconVI = new LeafIcon({ iconUrl: airImgVI });
      const IconVII = new LeafIcon({ iconUrl: airImgVII });

      let currentIcon = {};
      switch (icon) {
        case 'I':
          currentIcon = IconI;
          break;
        case 'II':
          currentIcon = IconII;
          break;
        case 'III':
          currentIcon = IconIII;
          break;
        case 'IV':
          currentIcon = IconIV;
          break;
        case 'V':
          currentIcon = IconV;
          break;
        case 'VI':
          currentIcon = IconVI;
          break;
        default:
          currentIcon = IconVII;
      }
      return currentIcon;
    },
    // ================================================================================================================= 加载点位
    loadPoints(points) {
      // debugger
      this.allPoints = points;
      this.clearPoints();
      const markGroup = [];
      if (this.allPoints && this.allPoints.length > 0) {
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < this.allPoints.length; i++) {
          // 处理点位信息
          if (this.allPoints[i].IsPoint === '1') {
            // eslint-disable-next-line prefer-destructuring
            const Y = this.allPoints[i].Y;
            // eslint-disable-next-line prefer-destructuring
            const X = this.allPoints[i].X;
            const icon = this.allPoints[i].airQuality; // 本地自定义测试数据有该属性，接口中没有该数据
            const currentIcon = this.customIcon(icon); // 调用自定义点位图标的方法，得到自定义的marker的icon
            // eslint-disable-next-line new-cap
            const singleMark = new this.LMap.marker([Y, X], { icon: currentIcon });

            singleMark.addEventListener('click', () => {
              // debugger;
              if (this.allPoints[i].portType === 'onlineData') { // 【数据展示】弹框
                this.drawPopup('popDataShow', this.allPoints[i]);
              }
              if (this.allPoints[i].portType === 'alarmData') { // 【报警信息】弹框
                this.drawPopup('popAlarmShow', this.allPoints[i]);
              }
              if (this.allPoints[i].portType === 'envirGas') { // 【环境空气】弹框
                this.drawPopup('popGasShow', this.allPoints[i]);
              }
            });
            markGroup.push(singleMark);
            this.markLayer = this.LMap.layerGroup(markGroup);
            map.addLayer(this.markLayer);
          }
        }
      }
      // this.LMap.marker([31.85618831, 120.56934479]).addTo(map)
      // .bindPopup('666')
      // .openPopup();
    },
    // ================================================================================================================= 清除点位图层
    clearPoints() {
      if (this.markLayer !== undefined) {
        this.markLayer.clearLayers();
        map.removeLayer(this.markLayer);
      }
    },
    // ================================================================================================================= 设置点位弹框
    drawPopup(popupType, pointInfo) {
      // debugger;
      let ExPopWinContent = null;
      switch (popupType) {
        case 'popDataShow':
          ExPopWinContent = new ExDataShowPopup({ propsData: { pointInfo } }).$mount();
          break;
        case 'popAlarmShow':
          ExPopWinContent = new ExAlarmShowPopup({ propsData: { pointInfo } }).$mount();
          break;
        case 'popGasShow':
          ExPopWinContent = new ExGasShowPopup({ propsData: { pointInfo } }).$mount();
          break;
        default:
          ExPopWinContent = new ExDataShowPopup({ propsData: { pointInfo } }).$mount();
      }
      const popWin = this.LMap.popup(); // ,offset:this.LMap.createPoint(0,-20)
      // const popWin = this.LMap.popup({minWidth: 600, minHeight: 400}); // ,offset:this.LMap.createPoint(0,-20)
      popWin.setLatLng(this.LMap.latLng(pointInfo.Y, pointInfo.X)); // 经度：lng 一般120.xxx ，纬度：lat 一般30.xxx
      popWin.setContent(ExPopWinContent.$el);
      popWin.openOn(map);
      map.setView(this.LMap.latLng(pointInfo.Y, pointInfo.X), map.getZoom()); // 定位到地图中心事件
    },
    // ================================================================================================================= 地图放大功能
    zoomIn() {
      map.zoomIn();
    },
    // ================================================================================================================= 地图缩小功能
    zoomOut() {
      map.zoomOut();
    },
    // ================================================================================================================= 实时经纬度
    RealLatLng() {
      map.on('mousemove', (e) => {
        Vue.set(this.zuobiaoData, 'lat', e.latlng.lat.toString().substring(0, 9)); // 纬度 // 通过点方法赋值，发现观察不到p的变化
        Vue.set(this.zuobiaoData, 'lng', e.latlng.lng.toString().substring(0, 9)); // 经度 // 通过点方法赋值，发现观察不到p的变化
        Vue.set(this.zuobiaoData, 'level', e.target.getZoom()); // 层级 // 通过点方法赋值，发现观察不到p的变化
        // console.log(this.zuobiaoData);
      });
    },
  },
  mounted() {
    // console.log(this.LMap)
    map = this.LMap.map('map', {
      center: [31.95789128, 120.64626101],
      zoom: 11,
      maxzoom: 18,
      minzoom: 1,
      zoomControl: false, // 是否默认缩放控件添加到地图
      attributionControl: false, // 去除‘leaflet’字样
      editable: true, // 用于测绘
    });
    this.changeMapLayer('google'); // 默认加载谷歌地图底图
    this.RealLatLng(); // 绑定地图移动事件
  },
};
</script>

<style lang="scss" scoped>
#map{
  width: 100%;
  height: calc(100vh);
}

// ===================================================================================================================== 设置弹框大小
::v-deep .leaflet-popup-content-wrapper, .leaflet-popup-tip {
    background: white;
    color: #333;
    box-shadow: 0 3px 14px rgba(0,0,0,0.4);
    width: 640px;
    height: 300px;
}
// ===================================================================================================================== 设置弹框内容大小
::v-deep .leaflet-popup-content {
    margin: 13px 19px;
    line-height: 1.4;
    width: 100% !important;
}
// ===================================================================================================================== 设置弹框弹出的相对位置
::v-deep .leaflet-popup {
  position: absolute;
  text-align: center;
  margin-bottom: 20px;
  bottom: 30px !important;
}

</style>
