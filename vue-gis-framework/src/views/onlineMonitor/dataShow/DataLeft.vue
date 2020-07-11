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

    }
  },
  methods: {
    loadTreeData() {
      this.treeList = [];
      this.checkedKeys = [];
      this.allPoints = [];
      this.$apiMethods.getTestData().then((res) => {
        if (res.code === 200) {
          this.treeList = res.data;
          // 设置全选
          this.checkedKeys.push(this.treeList[0].id);
          // 加载出所有点位信息
          this.allPoints = this.getAllPoints(res.data);
          // console.log(this.allPoints);
          this.$emit('loadAllPoints', this.allPoints)
        }
      });

      this.$apiMethods.getGasPointsData().then((res) => {
        if (res.code === 200) {
          console.log(res);
        }
      });
    },
    // 递归循环出树节点
    getAllPoints(data) {
      // debugger
      // 1.递归截止条件
      if (data.length == 0) return this.allPoints;
      // 2.递归方法
      if (data.length > 0) {
      data.forEach(element => {
        if (element.children && element.children.length >= 0) {
          this.getAllPoints(element.children);
        } else {
          this.allPoints.push(element);
        } 
      });
      }
      // 3.返回结果
      return this.allPoints
    },
    // ================================================================================================================= 也可以把递归写在方法里面 start
    // getAllPoints(data) {
    //   // debugger
    //   let allPoints = [];
    //   // 1.前期跳出条件
    //   if (data.length == 0) return allPoints;
    //   // 1.递归方法
    //   function querypoints(data) {
    //     if (data.length > 0) {
    //     data.forEach(element => {
    //       if (element.children && element.children.length >= 0) {
    //         querypoints(element.children);
    //       } else {
    //         allPoints.push(element);
    //       } 
    //     });
    //     }
    //   }
    //   // 2.调用递归方法，满足条件继续调用递归，不满足就接着往下走
    //   querypoints(data);
    //   return allPoints;
    // },
    // ================================================================================================================= 也可以把递归写在方法里面 end
    handleToQuery() {},
    // 树过滤方法
    filterNode(value, data) {},
    // 树 多选框点击事件
    handleCheckChange(curObj, treeCheckedObj) {
      console.log(curObj,treeCheckedObj);
      if (curObj.children && curObj.children.length === 0) {
        this.$Message({
          showClose: true,
          duration: 1000,
          message: '当前节点下暂无点位'
        });
        return;
      }
      console.log(this.$refs.onlineTree.getCheckedKeys());
    },
    // 树点击定位事件
    Location() {
      alert(666)
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
/* ******滚动条样式******************* */
::-webkit-scrollbar {
  width: 7px;
  height: 7px;
}


::-webkit-scrollbar-track {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 8px rgba(0,0,0,.3);
  background-color: #FFFFFF;
}


::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 8px rgba(0,0,0,.3);
  background-color: #CCCCCC;
}

</style>