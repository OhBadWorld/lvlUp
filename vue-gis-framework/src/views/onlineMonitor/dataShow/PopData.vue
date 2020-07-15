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
          <el-radio-group v-model="radio">
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
            <span :class="{'tabBtn': true, 'checkTab': choseTab, 'uncheckTab': !choseTab}" @click="choseType('hour')">小时数据</span>
            <span :class="{'tabBtn': true, 'checkTab': !choseTab, 'uncheckTab': choseTab}" @click="choseType('history')">历史数据</span>
          </div>
          <div v-if="choseTab" style="margin-top: 6px;">
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
              <el-select v-model="value" placeholder="请选择" style="width: 120px;">
                <el-option
                  v-for="item in factorList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div>
              <!-- <Echart theme="ovilia-green" :options="echartObj"/> -->
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    
    
  </div>
</template>

<script>
export default {
  props: {
    pointInfo: {
      type: Object,
      default() {
        return {
          name: '123'
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
      radio: 1,
      dealPortList: [],
      detailName: '',
      choseTab: true,
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
          label: 'COD'
        }, {
          value: '选项2',
          label: 'O3'
        }, {
          value: '选项3',
          label: 'NO'
        }, {
          value: '选项4',
          label: 'PM2.5'
        }, {
          value: '选项5',
          label: 'PM10'
        }
      ],
      value: '选项1',
      echartObj: {
        title : {
            text: '会员数据统计',
            subtext: '动态数据',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            show: true,
            orient: 'vertical',
            left: 'left',
            data: ['微信访问','公众号访问','扫码进入','分享进入','搜索访问']
        },
        series : [
            {
                name: '访问来源',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:[
                    {value:335, name:'微信访问'},
                    {value:310, name:'公众号访问'},
                    {value:234, name:'扫码进入'},
                    {value:135, name:'分享进入'},
                    {value:1548, name:'搜索访问'}
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
         ]
      },
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {
      // 这里是用来调接口的
      this.dealPortList = this.portList;
      this.radio = this.portList[0].id;
      this.detailName = this.portList[0].portName;
    },
    queryData(){
      if (this.queryName === '') {
        this.dealPortList = this.portList;
      } else {
        this.dealPortList = this.portList.filter(x => x.portName.indexOf(this.queryName) !== -1);
      }
    },
    checkRow(val, item) {
      console.log(val, item);
      this.detailName = item.portName;
    },
    choseType(type) {
      this.choseTab = !this.choseTab;
      switch(type) {
        case 'hour':
          break;
        case 'history':
          break;
        default:

      }
    }
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