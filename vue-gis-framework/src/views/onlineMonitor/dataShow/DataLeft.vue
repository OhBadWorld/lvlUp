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
        :props="treeProps"
        :data="treeList"
        show-checkbox
        default-expand-all
        ref="onlineTree"
        node-key="id"
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
      treeProps: {
        label: 'name',
        children: 'children',
      },
      treeList: [
        {
          portId: 1,
          name: '标准空气站',
          children: [
            {
              id: 11,
              name: '标准空气站A',
            },
          ],
        },
        {
          portId: 2,
          name: 'VOC空气站',
          children: [
            {
              id: 21,
              name: 'VOC空气站A',
            },
          ],
        },
        {
          portId: 3,
          name: '网格化',
          children: [
            {
              id: 31,
              name: '泵站名称2',
            },
          ],
        },
        {
          id: 4,
          name: '敏感点',
          children: [
            {
              id: 41,
              name: '敏感点A',
            },
          ],
        },
        {
          id: 5,
          name: '厂界站',
          children: [
            {
              id: 51,
              name: '厂界站A',
            },
          ],
        },
        {
          id: 6,
          name: '废气站点',
          children: [
            {
              id: 61,
              name: '废气排口1',
            },
          ],
        },
      ],
      checkedKeys: [], // 默认选中的节点
      allPoints: [], // 获取所有点位集合
      poinstList: [], // 点位信息集合
    }
  },
  methods: {
    loadTreeData() {
      this.treeList = [];
      this.checkedKeys = [];
      this.allPoints = [];

      this.$apiMethods.getGasPointsData().then((res) => {
        if (res.code === 200) {
          // console.log(res);
          // 将当前返回的数据 处理成 树能识别的结构
          this.poinstList = res.data;
          this.poinstList.forEach((item) => {
            item.portType = 'onlineData'; // 设置点位类型，打开点位弹框的时候用
          });
          this.treeList = this.dealResData(res.data);
          // 设置全选
          this.checkedKeys.push(this.treeList[0].id);
          // 点位分布加载
          this.$emit('loadAllPoints', res.data)
        }
      });
    },
    // 将数据处理成树节点
    dealResData(resData) {
      let tempTreeData = [];
      function aa(data, parent , n) {
        if (data.length > 0) {
          if (n === 1) {
            data.forEach((ele) => {
              if (ele.pId === '0') {
                ele.children = [];
                parent.push(ele);
              }
            });
          }
          if (n === 2) {
            data = data.filter(x => x.pId !== '0');
            data.forEach((ele) => {
            if (ele.pId === parent[0].id) {
                ele.children = [];
                parent[0].children.push(ele);
              }
            });
          }
          if (n === 3){
            data.forEach((ele) => {
            if (ele.pId === parent.id) {
                ele.children = [];
                parent.children.push(ele);
              }
            });
          }
        }
        return parent;
      }

      tempTreeData = aa(resData, tempTreeData, 1);
      if (tempTreeData.length > 0) {
        tempTreeData = aa(resData, tempTreeData, 2);
        if (tempTreeData[0].children.length > 0) {
          tempTreeData[0].children.forEach((item) => {
            aa(resData, item, 3);
          });
        }
      }
      return tempTreeData;
    },
    handleToQuery() {},
    // 树过滤方法
    filterNode(value, data) {},
    // 树 多选框点击事件
    handleCheckChange() {
      // 当前所有选中的树节点id集合
      let pointIdsArray = this.$refs.onlineTree.getCheckedKeys();
      // 根据当前选中的树节点id集合，展示相应的点位分布
      let checkedMarkerList = [];
      pointIdsArray.forEach((id) => {
        this.poinstList.forEach((point) => {
          if(point.id == id){
            checkedMarkerList.push(point);
          }
        })
      });
      this.$emit('loadAllPoints', checkedMarkerList);
    },
    // 树点击定位事件, 并打开弹框
    Location(curObj, curNode) {
      if (curNode.checked && curObj.IsPoint === '1') {
        this.$emit('location', 'popDataShow', curObj);
      }
    },
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