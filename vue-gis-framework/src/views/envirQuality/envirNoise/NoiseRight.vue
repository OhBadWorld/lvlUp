<template>
  <div>
    <div class="topTitle">监测数据一览</div>
    <div class="rightHead">
      <div class="titleIcon"></div>
      <div class="titleName">噪声信息总览</div>
    </div>
    <el-table border :data="tableData">
      <el-table-column
        v-for="{ prop, label } in colConfigs"
        :key="prop"
        :prop="prop"
        :label="label">
      </el-table-column>
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
