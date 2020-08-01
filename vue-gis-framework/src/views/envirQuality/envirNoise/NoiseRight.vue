<template>
  <div>
    <div class="topTitle">监测数据一览</div>
    <div class="rightHead">
      <div class="titleIcon"></div>
      <div class="titleName">噪声信息总览</div>
    </div>
    <el-table border :data="tableData">
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
    };
  },
  mounted() {
    this.loadPoints();
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
          airQuality: 'I',
        },
        {
          id: '34',
          pId: 'AC5E532C-B666-4B98-A4C1-BF70E8BBDCEF',
          name: '沙洲湖',
          IsPoint: '1',
          X: '120.56709498',
          Y: '31.90134260',
          airQuality: 'II',
        },
        {
          id: '39',
          pId: 'AC5E532C-B666-4B98-A4C1-BF70E8BBDCEF',
          name: '城北小学',
          IsPoint: '1',
          X: '120.55362585',
          Y: '31.87984724',
          airQuality: 'I',
        },
        {
          id: '35',
          pId: 'AC5E532C-B666-4B98-A4C1-BF70E8BBDCEF',
          name: '南丰',
          IsPoint: '1',
          X: '120.67973971',
          Y: '31.87697911',
          airQuality: 'I',
        },
        {
          id: '29',
          pId: 'AC5E532C-B666-4B98-A4C1-BF70E8BBDCEF',
          name: '凤凰',
          IsPoint: '1',
          X: '120.594177',
          Y: '31.767289',
          airQuality: 'Deaflet',
        },
        {
          id: '38',
          pId: 'AC5E532C-B666-4B98-A4C1-BF70E8BBDCEF',
          name: '大新',
          IsPoint: '1',
          X: '120.54830896',
          Y: '31.97094306',
          airQuality: 'I',
        },
        {
          id: '26',
          pId: 'AC5E532C-B666-4B98-A4C1-BF70E8BBDCEF',
          name: '双山岛',
          IsPoint: '1',
          X: '120.40354772',
          Y: '31.97611551',
          airQuality: 'I',
        },
        {
          id: '28',
          pId: 'AC5E532C-B666-4B98-A4C1-BF70E8BBDCEF',
          name: '保税区',
          IsPoint: '1',
          X: '120.44927288',
          Y: '31.95719416',
          airQuality: 'I',
        },
      ];
      this.allPoints.forEach((item) => {
        // eslint-disable-next-line no-param-reassign
        item.portType = 'envirGas'; // 设置点位类型，打开点位弹框的时候用
      });
      this.$emit('loadAllPoints', this.allPoints);
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
</style>
