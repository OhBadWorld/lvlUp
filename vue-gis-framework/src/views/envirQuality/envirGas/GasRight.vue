<template>
  <div>
    <div class="topTitle">监测数据一览</div>
    <div class="rightHead">
      <div class="titleIcon"></div>
      <div class="titleName">日均值</div>
    </div>
    <div style="width: 95%;height: 262px;">
     <Echart :options="lineOptionCOD" :autoResize="true" style="width:100%;height:100%"/>
  </div>
  </div>
</template>

<script>
import echart from 'vue-echarts';
// 饼状图
import 'echarts/lib/chart/pie';
// 折线
import 'echarts/lib/chart/line';
// 柱状图
import 'echarts/lib/chart/bar';

// 提示
import 'echarts/lib/component/tooltip';
// 图例
import 'echarts/lib/component/legend';
// 标题
import 'echarts/lib/component/title';

export default {

  data() {
    return {
      Pschart: [
        {
          key: 'string', sampleTime: '2020-01-01 00:00:00', sampleType: 'string', value: '1.0',
        },
        {
          key: 'string', sampleTime: '2020-02-01 00:00:00', sampleType: 'string', value: '1.0',
        },
        {
          key: 'string', sampleTime: '2020-03-01 00:00:00', sampleType: 'string', value: '1.0',
        },
        {
          key: 'string', sampleTime: '2020-04-01 00:00:00', sampleType: 'string', value: '1.0',
        },
        {
          key: 'string', sampleTime: '2020-05-01 00:00:00', sampleType: 'string', value: '1.0',
        },
        {
          key: 'string', sampleTime: '2020-06-01 00:00:00', sampleType: 'string', value: '1.0',
        },
        {
          key: 'string', sampleTime: '2020-07-01 00:00:00', sampleType: 'string', value: '1.0',
        },
        {
          key: 'string', sampleTime: '2020-08-01 00:00:00', sampleType: 'string', value: '1.0',
        },
        {
          key: 'string', sampleTime: '2020-09-01 00:00:00', sampleType: 'string', value: '1.0',
        },
        {
          key: 'string', sampleTime: '2020-10-01 00:00:00', sampleType: 'string', value: '1.0',
        },
        {
          key: 'string', sampleTime: '2020-11-01 00:00:00', sampleType: 'string', value: '1.0',
        },
        {
          key: 'string', sampleTime: '2020-12-01 00:00:00', sampleType: 'string', value: '1.0',
        },
      ],
      lineOptionCOD: {},
    };
  },
  methods: {
    loadPschart() {
      const XData = [];
      const YData = [];
      if (this.Pschart.length > 0) {
        this.Pschart.forEach((_item) => {
          XData.push(_item.sampleTime);
          YData.push(_item.value);
        });
        this.lineOptionCOD = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#6a7985',
              },
            },
          },
          grid: {
            top: '6%',
            left: '6%',
            right: '6%',
            bottom: '3%',
            containLabel: true,
          },
          xAxis: {
            type: 'category',
            data: XData,
          },
          yAxis: {
            type: 'value',
          },
          series: [{
            data: YData,
            type: 'line',
            smooth: true,
            itemStyle: { normal: { color: '#47a6ff' } },
            areaStyle: {
              normal: {
                color: new echart.graphic.LinearGradient(0, 0, 0, 1, [{ // 这里用到了echart
                  offset: 0,
                  color: '#47a6ff',
                }, {
                  offset: 1,
                  color: '#fff',
                }]),
              },
            },
          }],
        };
      }
    },
  },
  mounted() {
    this.loadPschart();
  },
};
</script>

<style scoped>
.topTitle{
  height: 45px;
  width: 100%;
  background-color: #2D8CF0;
  text-align: center;
  line-height: 45px;
  color: white;
  font-size: 16px;
}
*{
  margin: 0px;
  padding: 0;
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
