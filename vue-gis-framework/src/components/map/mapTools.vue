<template>
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
      </div>
     <div class="icon-content shadow">
       <el-tooltip content="图层" placement="right" effect="light">
        <i class="icon iconfont icon-tuceng icons" @click="selectFuc('tuceng')"></i>
       </el-tooltip>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pIsFold: true, // true:收缩工具栏， false:展开工具栏
    };
  },
  methods: {
    selectFuc(type) {
      switch (type) {
        case 'gengduo':
          this.pIsFold = !this.pIsFold;
          break;
        case 'fangda':
          this.$emit('zoomIn');
          break;
        case 'suoxiao':
          this.$emit('zoomOut');
          break;
        case 'zuobiao':
          break;
        case 'tuceng':
          break;
        default:
          //
      }
    },
  },
};
</script>

<style scoped>
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

</style>
