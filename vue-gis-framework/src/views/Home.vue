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
    <div v-if="leftPanelShow && valueSrc !== '环境噪声'">
      <div v-show="leftPanelTagShow" @click="openLeftPanel" class="zIndex tagLeftBtn tagLeftBtn-AlwayShow">&gt;</div>
      <transition name="leftPanel" @before-enter="leftPanelBfEnter" @after-leave="leftPanelAfLeave">
        <div v-show="leftContainerShow" class="zIndex leftPanelWrap">
          <div @click="closeLeftPanel" class="tagLeftBtn tagLeftBtn-Active">&lt;</div>
          <div>
            <dataLeft v-if="valueSrc==='数据展示'" @loadAllPoints="loadAllPoints" @location="location" />
            <alarmLeft v-if="valueSrc==='报警信息'" @loadAllPoints="loadAllPoints" @location="location"/>
            <gasLeft v-if="valueSrc==='环境空气'" @loadAllPoints="loadAllPoints" @location="location"/>
            <waterLeft v-if="valueSrc==='地表水'" @loadAllPoints="loadAllPoints" @location="location"/>
            <!-- <noiseLeft v-if="valueSrc==='环境噪声'"/> -->
          </div>
        </div>
      </transition>
    </div>
    <!-- =============================================================================================================== 右侧容器 -->
    <div v-if="rightPanelShow  && commandType === 0">
      <div v-show="rightPanelTagShow" @click="openRightPanel" class="zIndex tagRightBtn tagRightBtn-AlwayShow"><span class="tagRightBtnTxt">&lt;</span></div>
      <transition name="rightPanel" @before-enter="rightPanelBfEnter" @after-leave="rightPanelAfLeave">
        <div v-show="rightContainerShow" class="zIndex rightPanelWrap">
          <div @click="closeRightPanel" class="tagRightBtn tagRightBtn-Active"><span class="tagRightBtnTxt">&gt;</span></div>
            <div>
              <dataRight v-if="valueSrc==='数据展示'"/>
              <alarmRight v-if="valueSrc==='报警信息'"/>
            </div>
        </div>
      </transition>
    </div>
    <div v-if="rightPanelShow  && commandType === 1">
      <div v-show="rightPanelTagShow" @click="openRightPanel" class="zIndex tagRightBtn3 tagRightBtn-AlwayShow"><span class="tagRightBtnTxt">&lt;</span></div>
      <transition name="rightPanel" @before-enter="rightPanelBfEnter" @after-leave="rightPanelAfLeave">
        <div v-show="rightContainerShow" class="zIndex rightPanelWrap2">
          <div @click="closeRightPanel" class="tagRightBtn2 tagRightBtn-Active"><span class="tagRightBtnTxt">&gt;</span></div>
            <div>
              <gasRight v-if="valueSrc==='环境空气'"/>
              <waterRight v-if="valueSrc==='地表水'"/>
              <noiseRight v-if="valueSrc==='环境噪声'" @loadAllPoints="loadAllPoints"/>
            </div>
        </div>
      </transition>
    </div>
    <!-- =============================================================================================================== 图例容器 -->
    <div v-if="legendPanelShow" class="zIndex">
      <!-- // -->
      <transition name="BottomLengend" @before-enter="bottomLengendEnter" @after-leave="bottomLengendLeave">
        <div v-show="legendContainerShow" class="zIndex legendPanelWrap">
          <div class="bLegendMarker bLegendMarker-hide" @click="closeLegend()"><i class="el-icon-arrow-down legend-icon"></i></div>
          <img v-if="valueSrc==='数据展示' || valueSrc==='报警信息' || valueSrc==='环境空气'" :src="gasLegend" />
          <img v-if="valueSrc==='地表水'" :src="waterLegend" />
          <img v-if="valueSrc==='环境噪声'" :src="noiseLegend" />
        </div>
      </transition>
      <div v-show="legendPanelTagShow" @click="openLegend()" :class="{'zIndex': true,'bLegendMarker': true, 'bLegendMarker-show': true,}" ><i class="el-icon-arrow-up legend-icon2"></i></div>
    </div>
    <!-- =============================================================================================================== 底部容器 -->
    <!-- =============================================================================================================== 左下工具容器 -->
  </div>
</template>

<script>
import baseMap from '@/components/map';
// 在线监控 --数据展示
// eslint-disable-next-line vue/no-parsing-error
import dataLeft from '@/views/onlineMonitor/dataShow/DataLeft.vue';
// eslint-disable-next-line vue/no-parsing-error
import dataRight from '@/views/onlineMonitor/dataShow/DataRight.vue';
// 在线监控 --报警信息
import alarmLeft from '@/views/onlineMonitor/alarmInfo/AlarmLeft.vue';
import alarmRight from '@/views/onlineMonitor/alarmInfo/AlarmRight.vue';
// 环境质量 --环境空气
import gasLeft from '@/views/envirQuality/envirGas/GasLeft.vue';
import gasRight from '@/views/envirQuality/envirGas/GasRight.vue';
import gasLegend from '@/assets/imgs/air/Legend.png';
// 环境质量 --地表水
import waterLeft from '@/views/envirQuality/surfaceWater/WaterLeft.vue';
import waterRight from '@/views/envirQuality/surfaceWater/WaterRight.vue';
import waterLegend from '@/assets/imgs/water/waterLegend.png';
// 环境质量 --环境噪声
// import noiseLeft from '@/views/envirQuality/envirNoise/NoiseLeft.vue';
import noiseRight from '@/views/envirQuality/envirNoise/NoiseRight.vue';
import noiseLegend from '@/assets/imgs/noise/noiseLegend.png';

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
    // noiseLeft,
    noiseRight,
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
      legendPanelShow: true, // 【图例容器是否展示】
      legendPanelTagShow: false, // 【图例折叠按钮是否展示】
      legendContainerShow: true, // 【图例内容是否展示】
      bottomPanelShow: false, // 【底部容器是否展示】
      toolPanelShow: false, // 【工具条容器是否展示】
      gasLegend,
      waterLegend,
      noiseLegend,
      onLineMonList: ['数据展示', '报警信息'],
      evnList: ['环境空气', '地表水', '环境噪声'],
      commandType: 0,
      valueSrc: '数据展示',
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
    // ================================================================================================================= 顶部菜单
    showTop() {
      this.topShow = !this.topShow;
    },
    handleCommand(command) {
      console.log(command);
      if (this.valueSrc !== command) {
        this.openLeftPanel(); // 每次切换选项，都默认左容器是打开状态
        this.openRightPanel(); // 每次切换选项，都默认右容器是打开状态
        this.valueSrc = command;
        this.clearLayer();
      }
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
    // ================================================================================================================= 图例容器 start
    bottomLengendEnter() {
      this.legendPanelTagShow = false;
    },
    bottomLengendLeave() {
      this.legendPanelTagShow = true;
    },
    // 展开【底部】图例
    openLegend() {
      this.legendContainerShow = true;
    },
    closeLegend() {
      this.legendContainerShow = false;
    },
    // ================================================================================================================= 图例容器 end
    loadBaseMap() {
      this.$refs.baseMap.loadMap();
    },
    loadAllPoints(points) {
      this.$refs.baseMap.loadPoints(points);
    },
    location(popupType, point) {
      this.$refs.baseMap.drawPopup(popupType, point);
    },
    clearLayer() {
      this.$refs.baseMap.clearPoints();
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.loadingScreen().close();
      // this.loadBaseMap(); // 加载地图图层
      // this.$Message({
      //   showClose: true,
      //     message: '这是一条消息提示'
      // });
    });
  },

};
</script>

<style lang="scss" scoped>
* {
  outline: none;
}
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
  transform: translate3d(100%, 0, 0)
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
  background: rgba(251, 250, 246, 0.63);
  border-radius: 0 0 5px 0;
  height: 100vh;
  width: 380px;
}
.rightPanelWrap2 {
  position: fixed;
  display:block;
  clear:both;
  right: 5px;
  top: 100px;
  color: #333;
  background: white;
  border-radius: 0 0 5px 0;
  height: 590px;
  width: 380px;
}
.tagRightBtn2 {
  position: absolute;
  top: 247.5px;
  background: url(~@/assets/imgs/bgArrow.jpg) no-repeat 0px 0;
  width: 19px;
  height: 95px;
  line-height: 95px;
  cursor: pointer;
  color:rgba(255,255,255,1);
  font-size: 18px;
}
.tagRightBtn3 {
  position: absolute;
  top: 347.5px;
  background: url(~@/assets/imgs/bgArrow.jpg) no-repeat 0px 0;
  width: 19px;
  height: 95px;
  line-height: 95px;
  cursor: pointer;
  color:rgba(255,255,255,1);
  font-size: 18px;
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
// ===================================================================================================================== 图库容器
.BottomLengend-leave-active, .BottomLengend-enter-active {
  transition: all 0.22s;
}
.BottomLengend-enter, .BottomLengend-leave-to {
  transform: translate3d(0, 100%, 0)
}
.BottomLengend-leave, .BottomLengend-enter-to {
  transform: translate3d(0, 0, 0)
}
.legendPanelWrap{
  position: absolute;
  bottom: 0px;
  right: 390px;
}
.bLegendMarker{
  background: url(~@/assets/imgs/bgArrow.jpg) no-repeat -138px -1px;
  width: 54px;
  height: 19px;
  cursor: pointer;
}
.bLegendMarker-hide{
  position: absolute;
  bottom: 60px;
  right: 0px;
  color: white;
  text-align: right;
}
.legend-icon{
  margin-right: 9px;
}
.bLegendMarker-show{
  position: absolute;
  bottom: 0px;
  right: 390px;
  color: white;
}
.legend-icon2{
  position: relative;
  right: -28px;
  top: -2px;
}
</style>
