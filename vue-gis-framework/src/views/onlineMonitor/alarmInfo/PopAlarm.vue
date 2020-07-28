<template>
  <div style="height:265px;">
    <el-row :gutter="20">
      <el-col :span="9" style="border-right: 1px solid #717171;">
        <div class="leftInfo">
          <div class="leftHeader">
            <div class="titleIcon"></div>
            <div class="titleName">{{pointInfo.name}}</div>
          </div>
          <div>
            <el-input v-model="queryName" placeholder="站点选择" clearable class="search" @keyup.enter.native="queryData"></el-input>
            <el-button type="primary" icon="el-icon-search" size="mini" class="searchBtn" @click="queryData">查询</el-button>
          </div>
        </div>
        <div class="leftBody">
          <el-radio-group v-model="curPortId">
            <div v-for="item in dealPortList" :key="item.id" style="margin: 2px;width: 100%;height: 20px;">
              <el-radio :label="item.id" :disabled="!item.isOnline" @change="(val)=>checkRow(val, item)">{{item.portName}}</el-radio>
            </div>
          </el-radio-group>
        </div>
      </el-col>
      <el-col :span="14">
        <div class="rightInfo">
          <div class="detailName">{{detailName}}</div>
          <div style="height: 28px;line-height: 28px;">
            <span :class="{'tabBtn': true, 'checkTab': choseTab==='hour', 'uncheckTab': choseTab==='history'}" @click="choseType('hour')">小时数据</span>
            <span :class="{'tabBtn': true, 'checkTab': choseTab==='history', 'uncheckTab': choseTab==='hour'}" @click="choseType('history')">历史数据</span>
          </div>
          <div v-if="choseTab === 'hour'" style="margin-top: 6px;">
            <div style="text-align: right;margin: 0px 3px 2px 0px;">更新时间：8/23  18 : 23</div>
            <el-table :data="tableData" height="200" border
              :header-cell-style="{'background': '#d3e7fc', 'color': '#2d8cf0'}"
              :row-style="{height: '10px'}"
              :cell-style="{padding: '5px 0'}"
              >
              <el-table-column prop="factorName" label="因子名称"></el-table-column>
              <el-table-column prop="value" label="检测值">
                <template slot-scope="scope" >
                  <span v-if="scope.row.value.substr(0, scope.row.value.length-5)*1 <16" style="color:red;">{{scope.row.value}}</span>
                  <span v-else>{{scope.row.value}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="standardValue" label="标准值"></el-table-column>
            </el-table>
          </div>

          <div v-else style="margin-top: 15px;">
            <div style="display:inline-block;font-size: 16px;width: 242px;">最近48小时历史数据</div>
            <div style="display:inline-block;">
              <el-select v-model="curFactorCode" placeholder="请选择" style="width: 120px;" @change="((val)=>{changeFactorCode(val)})">
                <el-option
                  v-for="item in factorList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div style="width: 95%;height: 170px;">
              <Echart :options="echartObj" :autoResize="true" style="width:100%;height:100%"/>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import echart from 'vue-echarts';

export default {
  props: {
    pointInfo: {
      type: Object,
      default() {
        return {
          name: '123',
        };
      },
    },
  },
  data() {
    return {
      queryName: '',
      portList: [
        { id: '1', portName: 'xx排口1', isOnline: true },
        { id: '2', portName: 'xx排口2', isOnline: true },
        { id: '3', portName: 'xx排口3', isOnline: true },
        { id: '4', portName: 'xx排口4', isOnline: true },
        { id: '5', portName: 'xx排口5', isOnline: false },
        { id: '6', portName: 'xx排口6', isOnline: false },
        { id: '7', portName: 'xx排口7', isOnline: false },
        { id: '8', portName: 'xx排口8', isOnline: false },
        { id: '9', portName: 'xx排口9', isOnline: false },
        { id: '10', portName: 'xx排口10', isOnline: false },
      ],
      curPortId: 1, // // 当前选中的排口编码
      dealPortList: [],
      detailName: '',
      choseTab: 'hour',
      tableData: [
        { factorName: '因子名称1', value: '23.65 mg/m3', standardValue: '54.36 mg/m3' },
        { factorName: '因子名称2', value: '15.03 mg/m3', standardValue: '16.35 mg/m3' },
        { factorName: '因子名称3', value: '68.33 mg/m3', standardValue: '52.16 mg/m3' },
        { factorName: '因子名称4', value: '22.65 mg/m3', standardValue: '35.68 mg/m3' },
        { factorName: '因子名称5', value: '12.39 mg/m3', standardValue: '15.43 mg/m3' },
        { factorName: '因子名称6', value: '13.65 mg/m3', standardValue: '44.36 mg/m3' },
        { factorName: '因子名称7', value: '33.65 mg/m3', standardValue: '64.36 mg/m3' },
      ],
      factorList: [
        {
          value: '选项1',
          label: 'COD',
        }, {
          value: '选项2',
          label: 'O3',
        }, {
          value: '选项3',
          label: 'NO',
        }, {
          value: '选项4',
          label: 'PM2.5',
        }, {
          value: '选项5',
          label: 'PM10',
        },
      ],
      curFactorCode: '', // 当前选中的因子编码
      echartsData: [],
      echartObj: {},
    };
  },
  mounted() {
    this.loadData();
    this.choseTab = 'hour'; // 默认选中小时数据选项卡
    this.choseType('hour'); // 默认展示小时数据
  },
  methods: {
    loadData() {
      // --------------------------------------------------------------------------------------------------------------- 这里是用来调接口的
      // 获取排口数据 调接口
      this.dealPortList = this.portList;
      this.curPortId = this.portList[0].id;
      this.detailName = this.portList[0].portName;
      // 获取因子下拉框数据 调接口
      this.curFactorCode = this.factorList[0].value;
    },
    queryData() {
      if (this.queryName === '') {
        this.dealPortList = this.portList;
      } else {
        this.dealPortList = this.portList.filter((x) => x.portName.indexOf(this.queryName) !== -1);
      }
    },
    // ================================================================================================================= 切换排口
    checkRow(curPortId, item) {
      console.log(curPortId, item);
      this.detailName = item.portName;
      if (this.choseTab === 'history') { // 说明切换到48小时选项卡
        this.getEchartData(curPortId, this.curFactorCode);
      }
    },
    // ================================================================================================================= 切换选项卡
    choseType(type) {
      this.choseTab = type;
      switch (type) {
        case 'hour':
          // this.tableData 调接口获取数据
          break;
        case 'history':
          this.getEchartData(this.curPortId, this.curFactorCode);
          break;
        default:
          // this.tableData 调接口获取数据
      }
    },
    // ================================================================================================================= 切换因子
    changeFactorCode(curFactorCode) {
      this.getEchartData(this.curPortId, curFactorCode);
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
          top: '6%',
          left: '6%',
          right: '6%',
          bottom: '3%',
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

<style scoped>
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

.search{
  height: 30px;
  width: 110px;
  display: inline-block;
}
::v-deep .el-input__inner{
  height: 30px;
}
::v-deep .el-input__icon{
  line-height: 30px;
}
.searchBtn{
  margin-left: 10px;
  position: relative;
  top: -1px;
}
.leftBody{
  margin-top: 10px;
  overflow: auto;
  height: 200px;
}
::v-deep .el-radio__label {
  font-size: 16px;
  padding-left: 10px;
}
.detailName{
  font-size: 16px;
  margin-left: 6px;
  position: relative;
  top: -4px;
}
.tabBtn{
  display: inline-block;
  height: 100%;
  width: 70px;
  text-align: center;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;
}
.checkTab{
  border: 1px solid #409eff;
  background-color: #409eff;
  color: white;
}
.uncheckTab{
  border: 1px solid #409eff6e;
  background-color: #409eff6e;
  color: black;
}
::v-deep .el-table td, .el-table th {
    padding: 8px 0 !important;
}
</style>
