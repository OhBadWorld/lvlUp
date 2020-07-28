/* eslint-disable no-plusplus */
<template>
  <div>
    <div class="rightHead">
      <div class="titleIcon"></div>
      <div class="titleName">{{tabName}}</div>
    </div>
    <div class="popContent">
      <div v-if="tabType == 'realGas'">
        <div>
          <span class="pointName">点位名称</span>
          <span style="float: right;" class="pointName">2018-05-02 16:00:23</span>
        </div>
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <div style="display: inline-block;height:134px;width:142px;">
                <span class="aqiTitle">AQI指数</span>
                <img :src="lvlImgI" alt="" class="aqiImg">
              </div>
              <div class="aqiVal">
                <span class="aqiValTxt">52</span>
                <div class="aqiValLvl">优</div>
              </div>
              <div style="width: 205px;margin-left: 22px;">
                <div>
                  <span class="poll">首要污染物</span>
                  <span class="poll">PM2.5</span>
                </div>
                <div>
                  <span class="poll">浓度值</span>
                  <span class="poll">36 μg/m³</span>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="healthEffect">对健康的影响</div>
            <div class="healthTxt">
              空气质量可接受，但是某些污染物可能对极少数异常敏感人群健康有较弱影响
            </div>
            <div class="healthEffect">建议采取的措施</div>
            <div class="healthTxt">
              极少数异常敏感人群应减少户外运动
            </div>
          </el-col>
        </el-row>
      </div>
      <div v-if="tabType == 'readFactor'" style="height: calc(100vh - 682px);overflow-x: hidden;overflow-y: auto;">
        <div>
          <!-- :header-cell-style="{'height': '50px'}" -->
          <div style="margin: 10px;" class="factorTable">
            <el-table border height="200"
              :row-class-name="tableRowClassName"
              :data="tableData"
              style="width: 100%">
              <el-table-column prop="tstamp" label="时间" sortable>
                <template slot-scope="scope" >
                  <span>{{scope.row.tstamp.substr(11,8)}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="factorName" label="因子名称" > </el-table-column>
              <el-table-column prop="factorValue" label="浓度值" > </el-table-column>
              <el-table-column prop="area" label="浓度值范围" > </el-table-column>
              <el-table-column prop="unit" label="单位" > </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <div v-if="tabType == 'last24Hours'">
        <div>
          <div :class="{'factor':true, 'checkedFactor': item.checked}"
            v-for="(item) in factorList" :key="item.code"
            @click="choseFactor(item)">
            {{item.label}}
          </div>
        </div>
        <div style="width: 95%;height: 170px;">
          <Echart :options="echartObj" :autoResize="true" style="width:100%;height:100%"/>
        </div>
      </div>
      <div v-if="tabType == 'last30Days'"></div>
    </div>
    <div>
      <div :class="{'tab':true, 'checked': item.checked}"
        v-for="(item) in choseList" :key="item.code"
        @click="choseType(item)">
        {{item.label}}
      </div>
    </div>
  </div>
</template>

<script>
import echart from 'vue-echarts';

import lvlImgI from '../../../assets/imgs/air/1.png';
import lvlImgII from '../../../assets/imgs/air/2.png';
import lvlImgIII from '../../../assets/imgs/air/3.png';
import lvlImgIV from '../../../assets/imgs/air/4.png';
import lvlImgV from '../../../assets/imgs/air/5.png';
import lvlImgVI from '../../../assets/imgs/air/6.png';
import lvlImgVII from '../../../assets/imgs/air/-1.png';

export default {
  data() {
    return {
      lvlImgI,
      lvlImgII,
      lvlImgIII,
      lvlImgIV,
      lvlImgV,
      lvlImgVI,
      lvlImgVII,
      tabType: 'realGas',
      tabName: '小时空气质量情况',
      choseList: [
        { code: 'realGas', label: '小时空气质量情况', checked: true },
        { code: 'readFactor', label: '实时因子浓度', checked: false },
        { code: 'last24Hours', label: '最近24小时浓度趋势', checked: false },
        { code: 'last30Days', label: '最近30天浓度趋势', checked: false },
      ],
      tableData: [
        {
          factorName: 'PM2.5', tstamp: '2019-07-01 00:23:00', factorValue: '0.045', area: '0.035-0.075', unit: 'mg/m3',
        },
        {
          factorName: 'SO2', tstamp: '2019-07-01 00:23:00', factorValue: '0.009', area: '0.050-0.150', unit: 'mg/m3',
        },
        {
          factorName: 'NO2', tstamp: '2019-07-01 00:23:00', factorValue: '0.051', area: '0.040-0.080', unit: 'mg/m3',
        },
        {
          factorName: 'O3', tstamp: '2019-07-01 00:23:00', factorValue: '0.112', area: '0.160-0.200', unit: 'mg/m3',
        },
        {
          factorName: 'CO', tstamp: '2019-07-01 00:23:00', factorValue: '2.463', area: '2.000-4.000', unit: 'mg/m3',
        },
        {
          factorName: 'PM10', tstamp: '2019-07-01 00:23:00', factorValue: '0.070', area: '0.050-0.150', unit: 'mg/m3',
        },
      ],
      factorList: [
        { code: 'SO2', label: 'SO2', checked: true },
        { code: 'NO2', label: 'NO2', checked: false },
        { code: 'PM10', label: 'PM10', checked: false },
        { code: 'CO', label: 'CO', checked: false },
        { code: 'O31', label: 'O3-1', checked: false },
        { code: 'O38', label: 'O3-8', checked: false },
        { code: 'PM25', label: 'PM2.5', checked: false },
        { code: 'aqi', label: 'AQI', checked: false },
      ],
      echartsData: [],
      echartObj: {},
      curPortId: '',
    };
  },
  methods: {
    choseType(item) {
      this.choseList.forEach((element) => {
        // eslint-disable-next-line no-param-reassign
        element.checked = false;
      });
      // eslint-disable-next-line no-param-reassign
      item.checked = true;
      this.tabType = item.code;
      this.tabName = item.label;
      if (this.tabName === '最近24小时浓度趋势') {
        this.getEchartData(this.curPortId, this.factorList[0].code);
      }
    },
    tableRowClassName({ rowIndex }) {
      if (rowIndex % 2 !== 1) {
        return 'single-row';
      }
      return 'double-row';
    },
    choseFactor(item) {
      this.factorList.forEach((element) => {
        // eslint-disable-next-line no-param-reassign
        element.checked = false;
      });
      // eslint-disable-next-line no-param-reassign
      item.checked = true;
      this.getEchartData(this.curPortId, item.code);
    },
    // ================================================================================================================= 获取echarts 折线数据
    getEchartData(portId, factorCode) {
      this.echartObj = {};
      this.echartsData = [];
      this.$apiMethods.getLately48HoursData(portId, factorCode).then((res) => {
        if (res.code === 200) {
          this.echartsData = res.data[0].values;
          const XData = [];
          const YData = [];
          if (this.echartsData.length > 0) {
            this.echartsData.forEach((item) => {
              XData.push(item.tstamp);
              YData.push(item.value);
            });
            this.loadEchartData(XData, YData);
          }
        }
      });
    },
    // ================================================================================================================= 渲染echarts 折线数据
    loadEchartData(XData, YData) {
      this.echartObj = {
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
          top: '15%',
          left: '6%',
          right: '6%',
          bottom: '4%',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          data: XData,
          axisLabel: { // 坐标轴刻度标签的相关设置。
            formatter(params) {
              let newParamsName = '';// 最终拼接成的字符串
              const paramsNameNumber = params.length;// 实际标签的个数
              const provideNumber = 10;// 每行能显示的字的个数
              const rowNumber = Math.ceil(paramsNameNumber / provideNumber);// 换行的话，需要显示几行，向上取整
              /**
              * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
              */
              // 条件等同于rowNumber>1
              if (paramsNameNumber > provideNumber) {
                /** 循环每一行,p表示行 */
                // eslint-disable-next-line no-plusplus
                for (let p = 0; p < rowNumber; p++) {
                  let tempStr = '';// 表示每一次截取的字符串
                  const start = p * provideNumber;// 开始截取的位置
                  const end = start + provideNumber;// 结束截取的位置
                  // 此处特殊处理最后一行的索引值
                  if (p === rowNumber - 1) {
                    // 最后一次不换行
                    tempStr = params.substring(start, paramsNameNumber);
                  } else {
                    // 每一次拼接字符串并换行
                    tempStr = `${params.substring(start, end)}\n`;
                  }
                  newParamsName += tempStr;// 最终拼成的字符串
                }
              } else {
                // 将旧标签的值赋给新标签
                newParamsName = params;
              }
              // 将最终的字符串返回
              return newParamsName;
            },

          },
        },
        yAxis: {
          type: 'value',
          name: 'mg/m3',
        },
        series: [
          {
            data: YData,
            type: 'line',
            smooth: true, // true: 折线变成曲线
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
          },
        ],
      };
    },
  },
};
</script>

<style>
/* table 行高设置 */
.factorTable .el-table .el-table__header /deep/ tr, .el-table__header /deep/ th {
    padding: 0;
    height: 30px;
    line-height: 30px;
}
.factorTable .el-table .el-table__body tr, .el-table__body td {
    padding: 0;
    height: 30px;
    line-height: 30px;
}
</style>
<style scoped>
*{
  margin: 0px;
  padding: 0px;
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
.tab{
  display: inline-block;
  width:152px;
  height:33px;
  background-color: transparent;
  /* border:1px solid red; */
  cursor: pointer;
  text-align: center;
  line-height: 33px;
}
.checked{
  background-color: #458bf3;
  border-radius: 4px;
  color: white;
}
.popContent{
  width: 600px;
  height: 210px;
  border: 1px solid;
  margin-bottom: 4px;
}
.pointName{
  display: inline-block;
  width: 172px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  font-size: 14px;
  font-weight: bold;
}
.aqiTitle{
  display: block;
  width: 172px;
  height: 20px;
  line-height: 20px;
  text-align: center;
}
.aqiImg{
  width: 100px;
  height: 100px;
  margin: 10px 0px 0px 20px;
}
.aqiVal{
  display: inline-block;
  width: 80px;
  position: relative;
  top: -27px;
}
.aqiValTxt{
  display: block;
  width: 100%;
  text-align: center;
  font-size: 28px;
  font-weight: bold;
  color: #00e400;
}
.aqiValLvl{
  text-align: center;
  height: 24px;
  background-color: #00e400;
  line-height: 24px;
  color: white;
}
.poll{
  display: inline-block;
  width: 50%;
}
.healthEffect{
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 5px;
}
.healthTxt{
  margin-bottom: 5px;
  height: 60px;
  overflow-x: hidden;
  overflow-y: auto;
}
.factor{
  display: inline-block;
  width:56px;
  height:28px;
  background-color: #458bf3;
  color: white;
  /* border:1px solid red; */
  cursor: pointer;
  text-align: center;
  line-height: 28px;
  margin: 6px 6px;
  border-radius: 7px;
}
.checkedFactor{
  background-color: #f3b812;
}
</style>
