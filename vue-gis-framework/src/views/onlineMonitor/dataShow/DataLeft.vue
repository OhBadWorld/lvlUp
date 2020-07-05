<template>
  <div style="width:310px;height:442px;">
    <!-- 数据展示-左侧内容 -->
    <div class="topTitle">{{siteName}}</div>
    <el-row>
      <el-col :span="12">
        <el-select v-model="categoryName" placeholder="类别" class="topSel">
          <el-option
            v-for="item in categoryList"
            :key="item.id"
            :label="item.label"
            :value="item.type">
          </el-option>
      </el-select>
      </el-col>
      <el-col :span="12">
        <el-select v-model="typeValue" placeholder="类型" class="topSelType">
          <el-option
            v-for="item in typeList"
            :key="item.id"
            :label="item.label"
            :value="item.type">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-input v-model="queryname" placeholder="站点名称" class="topInp"></el-input>
      </el-col>
      <el-col :span="12" style="text-align: center;">
        <el-button type="primary" size="mini" @click="handleToQuery" icon="el-icon-search">
          快&nbsp;&nbsp;&nbsp;&nbsp;速&nbsp;&nbsp;&nbsp;&nbsp;查&nbsp;&nbsp;&nbsp;&nbsp;询
        </el-button>
      </el-col>
    </el-row>
    <div style="height:317px;overflow:auto;width:100%;">
      <el-tree
        :data="treeList"
        show-checkbox
        node-key="id"
        ref="onlineTree"
        :default-expand-all="true"
        :default-checked-keys="checkedKeys"
        :filter-node-method="filterNode"
        @check="handleCheckChange"
        @node-click="Location"
      >
      </el-tree>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      siteName: '站点选择',
      categoryName: '',
      categoryList: [
        { id:'000', label: '全部', type: 'all' },
        { id:'001', label: '重点排污单位', type: 'zdpwdw' },
        { id:'002', label: '废水', type: 'fs' },
        { id:'003', label: '非重点排污单位', type: 'fzdpwdw' },
        { id:'004', label: '废气', type: 'fq' },
      ],
      typeValue: '',
      typeList: [
        { id:'001', label: '行政区划', type: 'xzqh' },
        { id:'002', label: '站点归属', type: 'zdgs' },
      ],
      queryname: '',
      treeList: [
        {
          portId: 1,
          label: '标准空气站',
          children: [
            {
              id: 11,
              label: '标准空气站A',
            },
          ],
        },
        {
          portId: 2,
          label: 'VOC空气站',
          children: [
            {
              id: 21,
              label: 'VOC空气站A',
            },
          ],
        },
        {
          portId: 3,
          label: '网格化',
          children: [
            {
              id: 31,
              label: '泵站名称2',
            },
          ],
        },
        {
          id: 4,
          label: '敏感点',
          children: [
            {
              id: 41,
              label: '敏感点A',
            },
          ],
        },
        {
          id: 5,
          label: '厂界站',
          children: [
            {
              id: 51,
              label: '厂界站A',
            },
          ],
        },
        {
          id: 6,
          label: '废气站点',
          children: [
            {
              id: 61,
              label: '废气排口1',
            },
          ],
        },
      ],
      checkedKeys: [], // 默认选中的节点

    }
  },
  methods: {
    loadTreeData() {
      this.$axios.get('/mock/treeData.json').then((res) => {
        console.log(res);
      });
      // const treeData = this.$axios.getTreeData;
      // console.log(treeData);
    },
    handleToQuery() {},
    // 树过滤方法
    filterNode(value, data) {},
    // 树 check选中事件
    handleCheckChange() {},
    // 树点击定位事件
    Location() {},
  },
  mounted() {
    this.loadTreeData();
  }
}
</script>

<style lang="scss" scoped>
.topTitle{
  height: 45px;
  width: 100%;
  background-color: #2D8CF0;
  text-align: center;
  line-height: 45px;
  color: white;
  font-size: 16px;
}
// ===================================================================================================================== select框样式
::v-deep .topSel .el-input__inner {
  height: 30px;
  width: 146px;
  margin: 10px 10px 10px 10px;
}
::v-deep .topSel .el-input__suffix {
    right: 13px;
    transition: all .3s;
}
.topSelType{
  margin-left: 10px;
}
::v-deep .topSelType .el-input__inner {
  height: 30px;
  width: 123px;
  margin: 10px 10px 10px 10px;
}
::v-deep .topSelType .el-input__suffix {
    right: 16px;
    transition: all .3s;
}
// ===================================================================================================================== input框样式
.topInp{
  margin-left: 10px;
}
::v-deep .topInp .el-input__inner{
  height: 30px;
  width: 146px;
}


</style>