<template>
  <div style="overflow:auto;height:100vh;">
    <div class="echartItem">
      <div class="rightHead">
        <div class="titleIcon"></div>
        <div class="titleName">重点非重点排污单位</div>
      </div>
      <div style="width: 95%;height: 262px;">
      <Echart :options="sewageOption" :autoResize="true" style="width:100%;height:100%"/>
      </div>
    </div>

    <div class="echartItem">
      <div class="rightHead">
        <div class="titleIcon"></div>
        <div class="titleName">在线离线占比</div>
      </div>
      <div style="width: 95%;height: 262px;">
        <Echart :options="onlineOption" :autoResize="true" style="width:100%;height:100%"/>
      </div>
    </div>

    <div class="echartItem">
      <div class="rightHead">
        <div class="titleIcon"></div>
        <div class="titleName">企业类型占比</div>
      </div>
    </div>
  </div>
</template>

<script>
// import echart from 'vue-echarts';

export default {

  data() {
    return {
      sewageOption: {},
      onlineOption: {},
    };
  },
  methods: {
    loadPschart() {
      this.sewageOption = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)',
        },
        legend: {
          orient: 'vertical',
          right: 10,
          data: ['非重点排污单位', '重点排污单位'],
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            color: ['#ffc002', '#00b0ee'],
            label: {
              show: false,
              position: 'center',
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '16',
                fontWeight: 'bold',
              },
            },
            labelLine: {
              show: true,
            },
            data: [
              { value: 25, name: '非重点排污单位' },
              { value: 75, name: '重点排污单位' },
            ],
          },
        ],
      };
      this.onlineOption = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)',
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                formatter: '{d}%\n {b} ',
                rich: {
                  a: {
                    color: '#999',
                    fontSize: 20,
                    lineHeight: 22,
                    align: 'center',
                  },
                  hr: {
                    borderColor: '#aaa',
                    width: '100%',
                    borderWidth: 0.5,
                    height: 0,
                  },
                  b: {
                    fontSize: 16,
                    lineHeight: 33,
                  },
                  per: {
                    color: '#eee',
                    backgroundColor: '#334455',
                    padding: [2, 4],
                    borderRadius: 2,
                  },
                },
                textStyle: {
                  fontSize: 20,
                  fontWeight: 'bold',
                },
                show: false,
                position: 'center',
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '22',
                  fontWeight: 'bold',
                  backgroundColor: '#fff',
                },
              },
            },
            labelLine: {
              normal: {
                show: false,
              },
            },
            color: ['#bfc2c3', '#26d32d'],
            data: [
              { value: 335, name: '离线率' },
              { value: 1548, name: '在线率', label: { normal: { show: true } } },
            ],
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
