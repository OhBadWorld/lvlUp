<template>
  <div style="width:310px;height:442px;">
    <!-- 标题 -->
    <div class="topTitle">{{siteName}}</div>

    <!-- 站点选择 -->
    <div style="margin: 10px;">
      <span>站点类型</span>
      <el-select v-model="typeVal" placeholder="请选择" style="margin-left: 10px;">
        <el-option
          v-for="item in typeList"
          :key="item.type"
          :label="item.label"
          :value="item.type">
        </el-option>
      </el-select>
    </div>

    <!-- 树结构 -->
    <div class="treeStyle">
      <el-tree
        :data="treeData"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-checked-keys="[1]"
        :props="defaultProps">
      </el-tree>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      siteName: '站点选择',
      typeList: [
        {
          type: 'guo',
          label: '国控',
        }, {
          type: 'shi',
          label: '市控',
        }, {
          type: 'qu',
          label: '区控',
        },
      ],
      typeVal: 'shi',
      treeData: [
        {
          id: '1',
          label: '张家港市',
          children: [
            { id: '1-1', label: '杨舍' },
            { id: '1-2', label: '金港' },
            { id: '1-3', label: '农场' },
            { id: '1-4', label: '乐余' },
            { id: '1-5', label: '大新' },
            { id: '1-6', label: '南丰' },
            { id: '1-7', label: '塘桥' },
            { id: '1-8', label: '凤凰' },
            { id: '1-9', label: '锦丰' },
            { id: '1-10', label: '保税区' },
          ],
        },
      ],
      defaultProps: {
        children: 'children',
        label: 'label',
      },
      allPoints: [], // 获取所有点位集合
    };
  },
  mounted() {
    this.loadTreeData();
  },
  methods: {
    loadTreeData() {
      this.allPoints = [
        {
          id: '31',
          pId: 'AC5E532C-B666-4B98-A4C1-BF70E8BBDCEF',
          name: '监测站',
          IsPoint: '1',
          X: '120.53118860',
          Y: '31.86526444',
          waterQuality: 'I',
        },
        {
          id: '34',
          pId: 'AC5E532C-B666-4B98-A4C1-BF70E8BBDCEF',
          name: '沙洲湖',
          IsPoint: '1',
          X: '120.56709498',
          Y: '31.90134260',
          waterQuality: 'II',
        },
        {
          id: '29',
          pId: 'AC5E532C-B666-4B98-A4C1-BF70E8BBDCEF',
          name: '凤凰',
          IsPoint: '1',
          X: '120.594177',
          Y: '31.767289',
          waterQuality: 'Deaflet',
        },
        {
          id: '38',
          pId: 'AC5E532C-B666-4B98-A4C1-BF70E8BBDCEF',
          name: '大新',
          IsPoint: '1',
          X: '120.54830896',
          Y: '31.97094306',
          waterQuality: 'I',
        },
        {
          id: '26',
          pId: 'AC5E532C-B666-4B98-A4C1-BF70E8BBDCEF',
          name: '双山岛',
          IsPoint: '1',
          X: '120.40354772',
          Y: '31.97611551',
          waterQuality: 'I',
        },
        {
          id: '36',
          pId: 'AC5E532C-B666-4B98-A4C1-BF70E8BBDCEF',
          name: '康宁化学',
          IsPoint: '1',
          X: '120.47244152',
          Y: '32.00095381',
          waterQuality: 'III',
        },
        {
          id: '41',
          pId: 'AC5E532C-B666-4B98-A4C1-BF70E8BBDCEF',
          name: '乐余',
          IsPoint: '1',
          X: '120.70108086',
          Y: '31.92602437',
          waterQuality: 'I',
        },
        {
          id: '42',
          pId: 'AC5E532C-B666-4B98-A4C1-BF70E8BBDCEF',
          name: '东沙',
          IsPoint: '1',
          X: '120.78479800',
          Y: '31.83174122',
          waterQuality: 'II',
        },
        {
          id: '32',
          pId: 'AC5E532C-B666-4B98-A4C1-BF70E8BBDCEF',
          name: '现代农业示范园',
          IsPoint: '1',
          X: '120.77730400',
          Y: '31.87554486',
          waterQuality: 'I',
        },
        {
          id: '33',
          pId: 'AC5E532C-B666-4B98-A4C1-BF70E8BBDCEF',
          name: '塘桥',
          IsPoint: '1',
          X: '120.64110339',
          Y: '31.82378114',
          waterQuality: 'I',
        },
      ];
      this.allPoints.forEach((item) => {
        // eslint-disable-next-line no-param-reassign
        item.portType = 'waterPoints'; // 设置点位类型，打开点位弹框的时候用
      });
      this.$emit('loadAllPoints', this.allPoints);
    },
  },
};
</script>

<style scoped>
.topTitle{
  height: 45px;
  width: 100%;
  background-color: #2D8CF0;
  text-align: center;
  line-height: 45px;
  color: white;
  font-size: 16px;
}

::v-deep .el-input__inner{
  height: 32px;
}

.treeStyle{
  overflow-x: hidden;
  overflow-y: auto;
  height: 344px;
  padding-right: 6px;
}
</style>
