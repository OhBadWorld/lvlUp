<template>
  <div>
    <!-- =============================================================================================================== 地图 -->
    <baseMap />
    <!-- =============================================================================================================== 抬头 -->
    <div class="zIndex head">
      我是抬头
    </div>
    <!-- =============================================================================================================== 左侧容器 -->
    <div v-if="leftPanelShow">
      <div v-if="leftPanelTagShow" @click="openLeftPanel">&gt;</div>
      <transition name="leftPanelShow" @before-enter="leftPanelBfEnter" @after-leave="leftPanelAfLeave">
        <div v-if="leftContainerShow" class="zIndex leftPanelWrap">
          <div @click="closeLeftPanel">&lt;</div>
          <div>
            我是左侧容器内的内容
          </div>
        </div>
      </transition>
    </div>
    <!-- =============================================================================================================== 右侧容器 -->
    <!-- =============================================================================================================== 底部容器 -->
    <!-- =============================================================================================================== 图例容器 -->
    <!-- =============================================================================================================== 左下工具容器 -->
  </div>
</template>

<script>
import baseMap from '@/components/map';

export default {
  components: {
    baseMap,
  },
  name: 'Home',
  data() {
    return {
      fullScreenLoading: true,
      leftPanelShow: true, // 【左侧容器是否展示】
      leftPanelTagShow: false, // 【左侧折叠按钮是否展示】
      leftContainerShow: true, // 【左侧内容是否展示】
      rightPanelShow: false, // 【右侧容器是否展示】
      bottomPanelShow: false, // 【底部容器是否展示】
      legendPanelShow: false, // 【图例容器是否展示】
      toolPanelShow: false, // 【工具条容器是否展示】
    };
  },
  methods: {
    loadingScreen() {
      const loading = this.$loading({
        lock: true,
        text: 'loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
        customClass: 'zIndex',
      });
      return loading;
    },
    // ================================================================================================================= 左侧容器 start
    leftPanelBfEnter() {
      this.leftPanelTagShow = false;
    },
    leftPanelAfLeave() {
      this.leftPanelTagShow = true;
    },
    // 展开【左侧容器】内的内容
    openLeftPanel() {
      //
    },
    // 折叠【左侧容器】内的内容
    closeLeftPanel() {
      //
    },
    // ================================================================================================================= 左侧容器 end
  },
  mounted() {
    this.$nextTick(() => {
      this.loadingScreen().close();
    });
  },

};
</script>

<style scoped>
.zIndex{
  z-index: 600;
}
.head{
  position: absolute;
  left: 200px;
  top: 10px;
}
/* ===================================================================================================================== 左侧面板 */
.leftPanel-enter, .leftPanel-leave-to {
  transform: translate3d(-100%, 0, 0)
}
.leftPanel-leave, .leftPanel-enter-to {
  transform: translate3d(0, 0, 0)
}
.leftPanel-enter-active, .leftPanel-leave-active {
  transition: all .2s
}
.leftPanelWrap {
  position: fixed;
  display:block;
  clear:both;
  left: 5px;
  top: 100px;
  color: #333;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 0 0 5px 0;
}
</style>
