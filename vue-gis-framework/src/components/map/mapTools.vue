<template>
  <div :class="['map-tools', 'gisToolsPanel-active', {'gisToolsPanel-leave': pIsFold, 'gisToolsPanel-enter': !pIsFold}]">
     <div class="icon-content"><i class="icon iconfont icon-gengduo icons" @click="selectFuc('gengduo')"></i></div>
     <div class="icon-content"><i class="icon iconfont icon-fangda icons" @click="selectFuc('fangda')"></i></div>
     <div class="icon-content"><i class="icon iconfont icon-suoxiao icons" @click="selectFuc('suoxiao')"></i></div>
     <div class="icon-content"><i class="icon iconfont icon-miaozhun icons" @click="selectFuc('zuobiao')"></i></div>
     <div class="icon-content"><i class="icon iconfont icon-tuceng icons" @click="selectFuc('tuceng')"></i></div>
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
          break;
        case 'suoxiao':
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
  height: 218px;
  z-index: 9999;
  border: 1px solid red;
}

.gisToolsPanel-leave {
  transform: translate3d(0, 82px, 0)
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
}
.icons {
  font-size: 30px;
  margin-top: 4px;
  display: block;
  cursor: pointer;
}
</style>
