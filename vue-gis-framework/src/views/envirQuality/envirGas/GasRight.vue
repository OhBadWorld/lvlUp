<template>
  <div>
    <div class="topTitle">监测数据一览</div>
    <div class="rightHead">
      <div class="titleIcon"></div>
      <div class="titleName">日均值</div>
    </div>

    <div style="margin: 0px 0px 6px 18px;">
      <div :class="{'tab':true, 'checked': item.checked}"
        v-for="(item) in choseList" :key="item.code"
        @click="choseType(item)">
        {{item.label}}
      </div>
      <div v-if="tabType == '小时值'" style="height:32px;">
        <div style="margin: 8px 0px;">
          <el-date-picker
              style="width:292px;height:32px;"
              v-model="dateValue"
              popper-class="dateRangeStyle"
              type="datetimerange"
              value-format="yyyy-MM-dd HH:mm:00"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
          </el-date-picker>
          <span class="searchBtn" @click="handle_searchData"><i class="el-icon-search"></i></span>
        </div>
      </div>
      <div v-if="tabType == '日数据'" style="height:32px;">
        <div style="margin: 8px 0px;">
          <el-date-picker
              style="width:292px;height:32px;"
              v-model="dateValue"
              popper-class="dateRangeStyle"
              type="daterange"
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
          </el-date-picker>
          <span class="searchBtn" @click="handle_searchData"><i class="el-icon-search"></i></span>
        </div>
      </div>
    </div>

    <div style="height: calc(100vh - 482px);overflow-x: hidden;overflow-y: auto;">
      <div>
        <div style="margin: 10px;" class="dataTable">
          <el-table border height="360"
            :row-class-name="tableRowClassName"
            :data="dealTableData"
            style="width: 100%">
            <el-table-column prop="pointName" label="站点名称" width="100" fixed></el-table-column>
            <el-table-column prop="tstamp" label="时间" width="80"  sortable>
              <template slot-scope="scope" >
                <span v-if="tabType == '小时值'" >{{scope.row.tstamp.substr(11, 8)}}</span>
                <span v-if="tabType == '日数据'" >{{scope.row.tstamp.substr(0, 10)}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="pm25" label="PM2.5" > </el-table-column>
            <el-table-column prop="pm10" label="PM10" > </el-table-column>
            <el-table-column prop="so2" label="SO2" > </el-table-column>
            <el-table-column prop="co" label="CO" > </el-table-column>
            <el-table-column prop="o3" label="O3" > </el-table-column>
            <el-table-column prop="no2" label="NO2" > </el-table-column>
          </el-table>
        </div>
      </div>
      <div>
        <el-pagination
          class="productParts-paging data-page"
          layout="total,prev, pager, next,jumper"
          :total="total"
          :page-size="pagesize"
          :page-sizes="pagesizes"
          @current-change="current_change"
          @size-change="size_change"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      choseList: [
        { code: 'tab1', label: '小时值', checked: true },
        { code: 'tab2', label: '日数据', checked: false },
      ],
      tabType: '小时值',
      dateValue: [],
      tableData: [
        {
          pointName: '测点名称1', tstamp: '2019-07-01 00:23:00', pm25: '0.045', pm10: '0.070', so2: '0.009', co: '2.456', o3: '0.002', no2: 0,
        },
        {
          pointName: '测点名称2', tstamp: '2019-07-01 00:23:00', pm25: '0.041', pm10: '0.069', so2: '0.008', co: '2.432', o3: '0.013', no2: 0,
        },
        {
          pointName: '测点名称3', tstamp: '2019-07-01 00:23:00', pm25: '0.040', pm10: '0.071', so2: '0.019', co: '2.442', o3: '0.012', no2: 0,
        },
        {
          pointName: '测点名称4', tstamp: '2019-07-01 00:23:00', pm25: '0.043', pm10: '0.060', so2: '0.012', co: '2.446', o3: '0.032', no2: 0,
        },
        {
          pointName: '测点名称5', tstamp: '2019-07-01 00:23:00', pm25: '0.044', pm10: '0.065', so2: '0.009', co: '2.251', o3: '0.001', no2: 0,
        },
        {
          pointName: '测点名称6', tstamp: '2019-07-01 00:23:00', pm25: '0.032', pm10: '0.074', so2: '0.018', co: '2.346', o3: '0.026', no2: 0,
        },
        {
          pointName: '测点名称7', tstamp: '2019-07-01 00:23:00', pm25: '0.014', pm10: '0.060', so2: '0.026', co: '2.254', o3: '0.055', no2: 0,
        },
        {
          pointName: '乐测点名称8', tstamp: '2019-07-01 00:23:00', pm25: '0.025', pm10: '0.072', so2: '0.027', co: '2.456', o3: '0.034', no2: 0,
        },
        {
          pointName: '杨舍', tstamp: '2019-07-01 00:23:00', pm25: '0.035', pm10: '0.071', so2: '0.033', co: '2.342', o3: '0.031', no2: 0,
        },
      ],
      total: 0, // 默认数据总数
      pagesize: 6, // 每页的数据条数,template 中:page-size="pagesize"  表示所有的数据按每页显示的数量生个具体多少个页码按钮
      pagesizes: [6, 12, 18, 24], // 每页要显示的数据条数
      currentPage: 1, // 默认开始页面
      dealTableData: [],
    };
  },
  mounted() {
    this.handleDate();
    this.handle_getTableData();
  },
  methods: {
    choseType(item) {
      this.choseList.forEach((element) => {
        // eslint-disable-next-line no-param-reassign
        element.checked = false;
      });
      // eslint-disable-next-line no-param-reassign
      item.checked = true;
      this.tabType = item.label;
      this.handleDate();
    },
    // ================================================================================================================= 处理默认显示日期
    handleDate() {
      const bgDate = new Date();
      const edDate = new Date();
      let beginTime;
      let endTime;
      if (this.tabType === '小时值') {
        bgDate.setTime(bgDate.getTime() - (3600 * 1000 * 24 * 1));
        edDate.setTime(edDate.getTime());
        beginTime = this.$mp.datetime(bgDate, 'yyyy-MM-dd HH:00:00');
        endTime = this.$mp.datetime(edDate, 'yyyy-MM-dd HH:00:00');
      } else {
        bgDate.setTime(bgDate.getTime() - (3600 * 1000 * 24 * 6));
        edDate.setTime(edDate.getTime());
        beginTime = this.$mp.datetime(bgDate, 'yyyy-MM-dd');
        endTime = this.$mp.datetime(edDate, 'yyyy-MM-dd');
      }

      // 如何获取一周？
      this.dateValue = [beginTime, endTime];
    },
    handle_getTableData() {
      this.dealTableData = this.tableData.slice(
        (this.currentPage - 1) * this.pagesize,
        this.currentPage * this.pagesize,
      );
      this.total = this.tableData.length;
    },
    // ================================================================================================================= 查询数据
    handle_searchData() {
      // 具体逻辑...
      console.log(this.dateValue);
    },
    // ================================================================================================================= 设置单行，双行样式
    tableRowClassName({ rowIndex }) {
      if (rowIndex % 2 !== 1) {
        return 'single-row';
      }
      return 'double-row';
    },
    // ================================================================================================================= 翻页 改变当前页码
    current_change(currentPage) {
      this.dealTableData = this.tableData.slice(
        (currentPage - 1) * this.pagesize,
        currentPage * this.pagesize,
      );
      this.currentPage = currentPage;
    },
    // ================================================================================================================= 翻页 改变每页展示的数据
    size_change(pagesizes) {
      this.pagesize = pagesizes;
      this.dealTableData = this.tableData.slice(
        (this.currentPage - 1) * this.pagesize,
        this.currentPage * this.pagesize,
      );
    },
  },
};
</script>

<style lang="scss" scoped>
*{
  margin: 0px;
  padding: 0;
}
.topTitle{
  height: 45px;
  width: 100%;
  background-color: #2D8CF0;
  text-align: center;
  line-height: 45px;
  color: white;
  font-size: 16px;
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
  width: 76px;
  height: 26px;
  background-color: transparent;
  /* border: 1px solid red; */
  cursor: pointer;
  text-align: center;
  line-height: 26px;
  background-color: #458bf3;
  color: white;
  border-radius: 4px;
  margin-right: 6px;
}
.checked{
  background-color: #f3b812;
}
// ===================================================================================================================== 设置时间框样式
::v-deep .el-date-editor .el-range-separator{
  line-height: 24px;;
}
::v-deep .el-date-editor .el-range__close-icon{
  line-height: 24px;
  display: none;
}
::v-deep .el-date-editor .el-range__icon{
  line-height: 24px;
  display: none;
}
::v-deep .el-date-editor .el-range-input{
  width: 122px;
}

.searchBtn{
  cursor: pointer;
  width: 52px;
  height: 28px;
  display: inline-block;
  background-color: rgb(45, 140, 240);
  color: white;
  text-align: center;
  border: 1px solid #a0daff;
  border-radius: 5px;
  margin-left: 5px;
  line-height: 28px;
}
.productParts-paging{
  float: right;
  margin-right: 10px;
}
</style>
