<template>
  <div>
    <div :class="['map-tools', 'gisToolsPanel-active', {'gisToolsPanel-leave': pIsFold, 'gisToolsPanel-enter': !pIsFold}]">
      <div class="icon-content shadow">
        <el-tooltip content="更多" placement="right" effect="light">
          <i class="icon iconfont icon-gengduo icons" @click="selectFuc('gengduo')"></i>
        </el-tooltip>
      </div>
      <div class="icon-content shadow">
        <el-tooltip content="放大" placement="right" effect="light">
          <i class="icon iconfont icon-fangda icons" @click="selectFuc('fangda')"></i>
        </el-tooltip>
      </div>
      <div class="icon-content shadow">
        <el-tooltip content="缩小" placement="right" effect="light">
          <i class="icon iconfont icon-suoxiao icons" @click="selectFuc('suoxiao')"></i>
        </el-tooltip>
      </div>
      <div class="icon-content shadow">
        <el-tooltip content="坐标" placement="right" effect="light">
          <i class="icon iconfont icon-miaozhun icons" @click="selectFuc('zuobiao')"></i>
        </el-tooltip>
        <div v-show="pActiveTool == 'zuobiao'" class="shadow toolsZuoBiao">
          <div class="zuobiao"><span>经度：{{zuobiao.lat}}</span></div>
          <div class="zuobiao"><span>纬度：{{zuobiao.lng}}</span></div>
          <div class="zuobiao"><span>层级：{{zuobiao.level}}</span></div>
        </div>
      </div>
      <div class="icon-content shadow">
        <el-tooltip content="图层" placement="right" effect="light">
          <i class="icon iconfont icon-tuceng icons" @click="selectFuc('tuceng')"></i>
        </el-tooltip>
      </div>
    </div>
    <div>
      <div v-show="pActiveTool == 'dituqiehuan'" class="shadow toolsLayersChange">
        <div class="gf-mapStyleS">
          <!-- <img :src="huangshanVectorMap" alt="" @click="changeMapLayer('谷歌')"> -->
          <p>矢量图</p>
        </div>
        <div class="gf-mapStyleS">
          <!-- <img :src="huangshanImg" alt="" @click="changeMapLayer('高德')"> -->
          <p>影像图</p>
        </div>
        <!-- <div style="margin-left: 8px;" class="showNames">
          <el-checkbox v-model="showBusinessName" @change="isShowBusName" color="white">展示企业名称</el-checkbox>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    zuobiao: {
      type: Object,
      default() {
        return {
          lng: '0',
          lat: '0',
          level: 10,
        };
      },
    },
  },
  watch: {
    zuobiao: {
      handler(oldVal, newVal) {
        return newVal;
      },
      deep: true,
    },
  },
  data() {
    return {
      pIsFold: true, // true:收缩工具栏， false:展开工具栏
      pActiveTool: '',
      showBusinessName: true,
    };
  },
  methods: {
    selectFuc(type) {
      switch (type) {
        case 'gengduo':
          this.pIsFold = !this.pIsFold;
          this.pActiveTool = '';
          break;
        case 'fangda':
          this.pActiveTool = '';
          this.$emit('zoomIn');
          break;
        case 'suoxiao':
          this.pActiveTool = '';
          this.$emit('zoomOut');
          break;
        case 'zuobiao':
          this.pActiveTool = 'zuobiao';
          break;
        case 'tuceng':
          this.pActiveTool = 'dituqiehuan';
          break;
        default:
          //
      }
    },
  },
  changeMapLayer() {},
  isShowBusName(val) {
    this.showBusinessName = val;
  },
};
</script>

<style lang="scss" scoped>
.map-tools {
  position: absolute;
  left: 5px;
  bottom: 0px;
  width: 40px;
  height: 236px;
  z-index: 9999;
}

.gisToolsPanel-leave {
  transform: translate3d(0, 92px, 0)
}
.gisToolsPanel-enter {
  transform: translate3d(0, 0, 0)
}
.gisToolsPanel-active {
  transition: all .5s
}
.icon-content{
  text-align: center;
  height: 40px;
  border-radius: 6px;
  background-color: rgba(251, 250, 246, 0.63);
  color: rgba(45,140,240,1);

}
.icons {
  font-size: 30px;
  margin-top: 6px;
  display: block;
  cursor: pointer;
  height: 40px;
  line-height: 40px;
}
.shadow{
  /* box-shadow: inset 0px 0px 6px 3px rgba(45,140,240,1); */
  box-shadow: inset 0px 0px 6px 3px white;
}
.toolsZuoBiao {
  position: relative;
  padding: 10px;
  left: 50px;
  width: 145px;
  height: 62px;
  color: black;
  border: 2px solid #fff;
  border-radius: 7px;
  background: rgba(251, 250, 246, 0.63);
  top: -85px;
  font-size: 14px;
  text-align: left;
}

.gf-mapStyleS{
    border-radius: 3px;
    width: 111px;
    height: 90px;
    float: left;
    cursor: pointer;
    margin: 5px 7px;
    img{
      width: 100%;
      height: 100%;
    }
    p{
      font-size: 12px;
      position: relative;
      top: -26px;
      left: 63px;
      margin: 0;
      padding: 3px 6px;
      border-radius: 2px;
      color: #FFFFFF;
      background: #0094ff;
      width: 36px;
    }
}
</style>
