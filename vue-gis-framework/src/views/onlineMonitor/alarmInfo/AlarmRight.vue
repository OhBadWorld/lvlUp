<template>
  <div style="overflow:auto;height:100vh;">
    <div class="echartItem">
      <div class="rightHead">
        <div class="titleIcon"></div>
        <div class="titleName">数据完整率</div>
      </div>
      <div style="width: 95%;height: 262px;">
      <Echart :options="dataIntegrityRateOption" :autoResize="true" style="width:100%;height:100%"/>
      </div>
    </div>

    <div class="echartItem" style="height:365px;">
      <div class="rightHead">
        <div class="titleIcon"></div>
        <div class="titleName">报警日历</div>
      </div>
      <AirCalendar />
    </div>

    <div class="echartItem">
      <div class="rightHead">
        <div class="titleIcon"></div>
        <div class="titleName">重点排污单位一周报警排名</div>
      </div>
      <div style="width: 95%;height: 262px;">
        <Echart :options="sewageWeekOption" :autoResize="true" style="width:100%;height:100%"/>
      </div>
    </div>
  </div>
</template>

<script>
import echart from 'vue-echarts';
import AirCalendar from '../components/AirCalendar.vue';

export default {
  components: {
    AirCalendar,
  },
  data() {
    return {
      dataIntegrityRateOption: {},
      sewageWeekOption: {},
    };
  },
  methods: {
    loadPschart() {
      // 初始化数据
      const category = ['企业1', '企业2', '企业3', '企业4', '企业5', '企业6', '企业7'];
      // let barData = [20, 30, 40, 50, 60, 70, 80];
      this.dataIntegrityRateOption = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        grid: {
          left: '5%',
          right: '15%',
          bottom: '3%',
          top: '10%',
          containLabel: true,
        },
        xAxis: {
          type: 'value', // value
          data: [40, 50, 60, 70, 80, 100],
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
        },
        yAxis: {
          type: 'category', // category
          data: category,
          splitLine: { show: false },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          offset: 10,
          nameTextStyle: {
            fontSize: 15,
          },
        },
        series: [
          {
            name: '完整率%',
            type: 'bar',
            data: [20, 30, 40, 50, 60, 70, 80],
            // data: barData,
            barWidth: 14,
            barGap: 10,
            smooth: true,
            markLine: { // 设置平均值
              data: [
                { type: 'average', name: '平均值' },
              ],
            },
            label: {
              normal: {
                show: true,
                position: 'right',
                offset: [5, -2],
                textStyle: {
                  color: '#F68300',
                  fontSize: 13,
                },
              },
            },
            itemStyle: {
              emphasis: {
                barBorderRadius: 7,
              },
              normal: {
                barBorderRadius: 7,
                color: new echart.graphic.LinearGradient(
                  0, 0, 1, 0,
                  [
                    { offset: 0, color: '#3977E6' },
                    { offset: 1, color: '#37BBF8' },
                  ],
                ),
              },
            },
          },
        ],
      };
      this.sewageWeekOption = {
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        grid: {
          left: '3%',
          right: '15%',
          bottom: '3%',
          top: '8%',
          containLabel: true,
        },
        xAxis: [
          {
            type: 'category',
            data: ['企业1', '企业2', '企业3', '企业4', '企业5', '企业6'],
            axisTick: {
              alignWithLabel: false,
            },

          },
        ],
        yAxis: [
          {
            type: 'value',
          },
        ],
        series: [
          {
            name: '完整率%',
            type: 'bar',
            // barWidth: '60%',
            data: [23, 52, 55, 69, 78, 95],
            // 设置柱状图大小
            barWidth: 14,
            label: {
              normal: {
                show: true,
                position: 'top',
                offset: [5, -2],
                textStyle: {
                  color: '#F68300',
                  fontSize: 13,
                },
              },
            },
            itemStyle: { // 设置一列柱形的颜色
              normal: {
                color: new echart.graphic.LinearGradient(
                  0, 0, 1, 0,
                  [
                    { offset: 0, color: '#3977E6' },
                    { offset: 1, color: '#37BBF8' },

                  ],
                ),
                // 柱形图圆角，初始化效果
                barBorderRadius: [25, 25, 0, 0], // [左上角圆角值,右上角圆角值,右下角圆角值,左下角圆角值]
              },
            },
            markLine: { // 设置平均值
              data: [
                { type: 'average', name: '平均值' },
              ],
            },
          },
        ],
      };
    },
  },
  mounted() {
    this.loadPschart();
  },
};
</script>

<style scoped>
.echartItem{
  margin: 6px;
  padding: 6px;
  width: 355px;
  height: 320px;
  border-radius: 10px;
  background-color: white;
}
.rightHead{
  margin: 10px;
}
.titleIcon{
  display: inline-block;
  width: 8px;
  height:20px;
  border-radius: 4px;
  background-color: #2D8CF0;
}
.titleName{
  display: inline-block;
  color: #2D8CF0;
  margin-left: 6px;
  position: relative;
  top: -4px;
  font-size: 16px;
}
</style>
