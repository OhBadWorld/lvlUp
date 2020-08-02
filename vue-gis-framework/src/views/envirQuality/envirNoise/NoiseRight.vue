<template>
  <div>
    <div class="topTitle">监测数据一览</div>
    <div class="rightHead">
      <div class="titleIcon"></div>
      <div class="titleName">噪声信息总览</div>
    </div>
    <div style="height: calc(100vh - 403px);overflow-x: hidden;overflow-y: auto;">
      <div>
        <div style="margin: 10px;" class="dataTable">
        <el-table border height="427" :data="tableData">
          <el-table-column prop="name" label="站点名称" width="100" fixed></el-table-column>
          <el-table-column prop="date" label="时间" width="100" ></el-table-column>
          <el-table-column prop="L5" label="L5" width="40" ></el-table-column>
          <el-table-column prop="L10" label="L10" width="50" ></el-table-column>
          <el-table-column prop="L50" label="L50" width="50" ></el-table-column>
          <el-table-column prop="L90" label="L90" width="50" ></el-table-column>
          <el-table-column prop="L9S" label="L9S" width="50" ></el-table-column>
          <el-table-column prop="Leq" label="Leq" width="50" ></el-table-column>
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
      colConfigs: [
        { prop: 'name', label: '站点名称' },
        { prop: 'date', label: '时间' },
        { prop: 'L5', label: 'L5' },
        { prop: 'L10', label: 'L10' },
        { prop: 'L50', label: 'L50' },
        { prop: 'L90', label: 'L90' },
        { prop: 'L9S', label: 'L9S' },
        { prop: 'Leq', label: 'Leq' },
      ],
      tableData: [
        {
          date: '2016-05-02',
          name: '站点名称1',
          L5: 72,
          L10: 69,
          L50: 61,
          L90: 58,
          L9S: 57,
          Leq: 62,
        },
        {
          date: '2016-05-04',
          name: '站点名称2',
          L5: 66,
          L10: 69,
          L50: 61,
          L90: 58,
          L9S: 57,
          Leq: 62,
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
    this.loadPoints();
    this.handle_getTableData();
  },
  methods: {
    loadPoints() {
      this.allPoints = [
        {
          id: '40',
          pId: 'AC5E532C-B666-4B98-A4C1-BF70E8BBDCEF',
          name: '锦丰',
          IsPoint: '1',
          X: '120.64626101',
          Y: '31.95789128',
          status: '在线',
        },
        {
          id: '34',
          pId: 'AC5E532C-B666-4B98-A4C1-BF70E8BBDCEF',
          name: '沙洲湖',
          IsPoint: '1',
          X: '120.56709498',
          Y: '31.90134260',
          status: '离线',
        },
        {
          id: '39',
          pId: 'AC5E532C-B666-4B98-A4C1-BF70E8BBDCEF',
          name: '城北小学',
          IsPoint: '1',
          X: '120.55362585',
          Y: '31.87984724',
          status: '在线',
        },
        {
          id: '35',
          pId: 'AC5E532C-B666-4B98-A4C1-BF70E8BBDCEF',
          name: '南丰',
          IsPoint: '1',
          X: '120.67973971',
          Y: '31.87697911',
          status: '在线',
        },
        {
          id: '29',
          pId: 'AC5E532C-B666-4B98-A4C1-BF70E8BBDCEF',
          name: '凤凰',
          IsPoint: '1',
          X: '120.594177',
          Y: '31.767289',
          status: 'Deaflet',
        },
        {
          id: '38',
          pId: 'AC5E532C-B666-4B98-A4C1-BF70E8BBDCEF',
          name: '大新',
          IsPoint: '1',
          X: '120.54830896',
          Y: '31.97094306',
          status: '离线',
        },
        {
          id: '26',
          pId: 'AC5E532C-B666-4B98-A4C1-BF70E8BBDCEF',
          name: '双山岛',
          IsPoint: '1',
          X: '120.40354772',
          Y: '31.97611551',
          status: '离线',
        },
        {
          id: '28',
          pId: 'AC5E532C-B666-4B98-A4C1-BF70E8BBDCEF',
          name: '保税区',
          IsPoint: '1',
          X: '120.44927288',
          Y: '31.95719416',
          status: '在线',
        },
      ];
      this.allPoints.forEach((item) => {
        // eslint-disable-next-line no-param-reassign
        item.portType = 'noisePoints'; // 设置点位类型，打开点位弹框的时候用
      });
      this.$emit('loadAllPoints', this.allPoints);
    },
    // ================================================================================================================= 分页处理table数据
    handle_getTableData() {
      this.dealTableData = this.tableData.slice(
        (this.currentPage - 1) * this.pagesize,
        this.currentPage * this.pagesize,
      );
      this.total = this.tableData.length;
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

<style scoped>
*{
  margin: 0;
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
.productParts-paging{
  float: right;
  margin-right: 10px;
}
</style>
