<template>
  <div>
    <!-- =============================================================================================================== 地图 -->
    <baseMap ref="baseMap"/>
    <!-- =============================================================================================================== 抬头 -->
    <div class="zIndex logo">
      <div class="zIndex logoImg"></div>
      <div class="logoTitle">
        GIS智慧大数据平台
        <i class="el-icon-s-operation" style="cursor: pointer;" @click="showTop"></i>
      </div>
    </div>
    <!-- =============================================================================================================== 顶部菜单 -->
    <div class="navMenu zIndex" v-if="topShow">
      <el-dropdown @command="handleCommand" placement="bottom-start">
        <div class="navMenuItem" :class="{navMenuItemChked:commandType == 0}" >在线监控</div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="item in onLineMonList" :key = item :command = item  @click.native="handleToChange(0)">{{item}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-dropdown @command="handleCommand" placement="bottom-start">
        <div class="navMenuItem" :class="{navMenuItemChked:commandType == 1}" >环境质量</div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="item in evnList" :key = item :command = item  @click.native="handleToChange(1)">{{item}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!-- =============================================================================================================== 左侧容器 -->
    <div v-if="leftPanelShow">
      <div v-show="leftPanelTagShow" @click="openLeftPanel" class="zIndex tagLeftBtn tagLeftBtn-AlwayShow">&gt;</div>
      <transition name="leftPanel" @before-enter="leftPanelBfEnter" @after-leave="leftPanelAfLeave">
        <div v-show="leftContainerShow" class="zIndex leftPanelWrap">
          <div @click="closeLeftPanel" class="tagLeftBtn tagLeftBtn-Active">&lt;</div>
          <div>
            <dataLeft v-if="valueSrc==='数据展示'" @loadAllPoints="loadAllPoints"/>
            <alarmLeft v-if="valueSrc==='报警信息'"/>
            <gasLeft v-if="valueSrc==='环境空气'"/>
            <waterLeft v-if="valueSrc==='地表水'"/>
            <noiseLeft v-if="valueSrc==='环境噪声'"/>
          </div>
        </div>
      </transition>
    </div>
    <!-- =============================================================================================================== 右侧容器 -->
    <div v-if="rightPanelShow">
      <div v-show="rightPanelTagShow" @click="openRightPanel" class="zIndex tagRightBtn tagRightBtn-AlwayShow"><span class="tagRightBtnTxt">&lt;</span></div>
      <transition name="rightPanel" @before-enter="rightPanelBfEnter" @after-leave="rightPanelAfLeave">
        <div v-show="rightContainerShow" class="zIndex rightPanelWrap">
          <div @click="closeRightPanel" class="tagRightBtn tagRightBtn-Active"><span class="tagRightBtnTxt">&gt;</span></div>
          <div>
            <dataRight v-if="valueSrc==='数据展示'"/>
            <alarmRight v-if="valueSrc==='报警信息'"/>
            <gasRight v-if="valueSrc==='环境空气'"/>
            <waterRight v-if="valueSrc==='地表水'"/>
            <noiseRight v-if="valueSrc==='环境噪声'"/>
          </div>
        </div>
      </transition>
    </div>
    <!-- =============================================================================================================== 底部容器 -->
    <!-- =============================================================================================================== 图例容器 -->
    <!-- =============================================================================================================== 左下工具容器 -->
  </div>
</template>

<script>
import baseMap from '@/components/map';
// 在线监控 --数据展示
import dataLeft from '@/views/onlineMonitor/dataShow/DataLeft.vue';
import dataRight from '@/views/onlineMonitor/dataShow/DataRight.vue';
// 在线监控 --报警信息
import alarmLeft from '@/views/onlineMonitor/alarmInfo/AlarmLeft.vue';
import alarmRight from '@/views/onlineMonitor/alarmInfo/AlarmRight.vue';
// 环境质量 --环境空气
import gasLeft from '@/views/envirQuality/envirGas/GasLeft.vue';
import gasRight from '@/views/envirQuality/envirGas/GasRight.vue';
// 环境质量 --地表水
import waterLeft from '@/views/envirQuality/surfaceWater/WaterLeft.vue';
import waterRight from '@/views/envirQuality/surfaceWater/WaterRight.vue';
// 环境质量 --环境噪声
import noiseLeft from '@/views/envirQuality/envirNoise/NoiseLeft.vue';
import noiseRight from '@/views/envirQuality/envirNoise/NoiseRight.vue';

export default {
  components: {
    baseMap,
    dataLeft,
    dataRight,
    alarmLeft,
    alarmRight,
    gasLeft,
    gasRight,
    waterLeft,
    waterRight,
    noiseLeft,
    noiseRight
  },
  name: 'Home',
  data() {
    return {
      fullScreenLoading: true,
      topShow: true, // 【顶部菜单展示】
      leftPanelShow: true, // 【左侧容器是否展示】
      leftPanelTagShow: false, // 【左侧折叠按钮是否展示】
      leftContainerShow: true, // 【左侧内容是否展示】
      rightPanelShow: true, // 【右侧容器是否展示】
      rightPanelTagShow: false, // 【右侧折叠按钮是否展示】
      rightContainerShow: true, // 【右侧内容是否展示】
      bottomPanelShow: false, // 【底部容器是否展示】
      legendPanelShow: false, // 【图例容器是否展示】
      toolPanelShow: false, // 【工具条容器是否展示】
      onLineMonList: ['数据展示', '报警信息'],
      evnList: ['环境空气', '地表水', '环境噪声'],
      commandType: 0,
      valueSrc: '数据展示'
    }
  },
  methods: {
    loadingScreen() {
      const loading = this.$loading({
        lock: true,
        text: 'loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
        customClass: 'zIndex'
      });
      return loading;
    },
    // ================================================================================================================= 顶部菜单
    showTop() {
      this.topShow = !this.topShow;
    },
    handleCommand(command) {
      console.log(command);
      this.valueSrc = command;
    },
    handleToChange(num) {
      this.commandType = num;
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
      this.leftContainerShow = true;
    },
    // 折叠【左侧容器】内的内容
    closeLeftPanel() {
      this.leftContainerShow = false;
    },
    // ================================================================================================================= 左侧容器 end
    // ================================================================================================================= 右侧容器 start
    rightPanelBfEnter() {
      this.rightPanelTagShow = false;
    },
    rightPanelAfLeave() {
      this.rightPanelTagShow = true;
    },
    // 展开【左侧容器】内的内容
    openRightPanel() {
      this.rightContainerShow = true;
    },
    closeRightPanel() {
      this.rightContainerShow = false;
    },
    // ================================================================================================================= 右侧容器 end
    loadBaseMap() {
      this.$refs.baseMap.loadMap();
    },
    loadAllPoints(points) {
      this.$refs.baseMap.loadPoints(points);
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.loadingScreen().close();
      this.loadBaseMap();
      // this.$Message({
      //   showClose: true,
      //     message: '这是一条消息提示'
      // });
    });
  }

}
</script>

<style lang="scss" scoped>
.zIndex{
  z-index: 600;
}
.head{
  position: absolute;
  left: 200px;
  top: 10px;
}
/* ===================================================================================================================== 抬头 */
.logo{
    position: absolute;
    top: 15px;
    left: 15px;
    width:500px;
    height: 70px;
    line-height: 70px;
    .logoImg{
      position: absolute;
      background: url('~@/assets/imgs/logo.jpg') center center no-repeat;
      height: 69px;
      width: 69px;
      border-radius: 50%;
      border: 1px solid rgba(219, 219, 219, 0.5);
    }
    .logoTitle{
      position: absolute;
      top: 15px;
      left: 30px;
      background-color: rgba(255, 255, 255, 1);
      border-radius: 40px;
      text-align: right;
      color: #2d8cf0;
      font-size: 22px;
      width: 275px;
      height: 40px;
      line-height: 40px;
      padding-right: 16px;
    }
}
/* ===================================================================================================================== 顶部菜单 */
.navMenu{
    position: absolute;
    top: 30px;
    left: 348px;
    padding-left: 20px;
    width: 220px;
    // width: 450px;
    height: 40px;
    line-height: 40px;
    background-color: rgba(255, 255, 255, 1);
    border-radius: 40px;
    .navMenuItem{
      margin-top:5px;
      width: 100px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      background-color: rgba(255, 255, 255, 1);
      border-radius: 40px;
      font-size: 18px;
      color: black;
      &:hover{
         cursor: pointer;
      }
    }
    .navMenuItemChked{
      background-color: #2d8cf0 !important;
      color: #fff !important;
    }
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
.tagLeftBtn {
  position: absolute;
  background: url(~@/assets/imgs/bgArrow.jpg) no-repeat -283px -145px;
  width: 19px;
  height: 50px;
  padding-top:5px;
  padding-left:4px;
  cursor: pointer;
  color:rgba(255,255,255,1);
}
.tagLeftBtn-Active {
  right: -23px;
}
.tagLeftBtn-AlwayShow {
  top: 100px;
}
/* ===================================================================================================================== 右侧面板 */
.rightPanel-leave-active, .rightPanel-enter-active {
  transition: all 0.2s;
}
.rightPanel-enter, .rightPanel-leave-to {
  transform: translate3d(427px, 0, 0)
}
.rightPanel-leave, .rightPanel-enter-to {
  transform: translate3d(0, 0, 0)
}
.rightPanelWrap {
  position: fixed;
  display:block;
  clear:both;
  right: 5px;
  top: 0px;
  color: #333;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 0 0 5px 0;
  height: 100vh;
  width: 380px;
}
.tagRightBtn {
  position: absolute;
  top: 50%;
  background: url(~@/assets/imgs/bgArrow.jpg) no-repeat 0px 0;
  width: 19px;
  height: 95px;
  line-height: 95px;
  cursor: pointer;
  color:rgba(255,255,255,1);
  font-size: 18px;
}
.tagRightBtnTxt{
  position: relative;
  left: 4px;
}
.tagRightBtn-Active {
  right: 380px;
}
.tagRightBtn-AlwayShow {
  right: 0px !important;
}
</style>