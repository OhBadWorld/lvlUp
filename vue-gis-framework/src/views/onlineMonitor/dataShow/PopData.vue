<template>
  <div>
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
            <div v-for="item in dealPortList" :key="item.id" style="margin: 2px;">
              <el-radio :label="item.id" :disabled="!item.isOnline">{{item.portName}}</el-radio>
            </div>
          </el-radio-group>
        </div>
      </el-col>
      <el-col :span="14"><div class="grid-content bg-purple"></div></el-col>
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
      radio: 3,
      dealPortList: [],
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {
      // 这里是用来调接口的
      this.dealPortList = this.portList;
    },
    queryData(){
      if (this.queryName === '') {
        this.dealPortList = this.portList;
      } else {
        this.dealPortList = this.portList.filter(x => x.portName.indexOf(this.queryName) !== -1);
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
</style>