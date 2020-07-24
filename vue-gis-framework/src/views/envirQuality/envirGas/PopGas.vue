<template>
  <div>
    <div class="rightHead">
      <div class="titleIcon"></div>
      <div class="titleName">实时空气情况</div>
    </div>
    <div class="popContent">
      <div v-if="tabType == 'realGas'"></div>
      <div v-if="tabType == 'readFactor'"></div>
      <div v-if="tabType == 'last24Hours'"></div>
      <div v-if="tabType == 'last30Days'"></div>
    </div>
    <div>
      <div :class="{'tab':true, 'checked': item.checked}"
        v-for="(item) in choseList" :key="item.code"
        @click="choseType(item)">
        {{item.label}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabType: 'realGas',
      choseList: [
        { code: 'tab1', label: '小时空气质量情况', checked: true },
        { code: 'tab2', label: '实时因子浓度', checked: false },
        { code: 'tab3', label: '最近24小时浓度趋势', checked: false },
        { code: 'tab4', label: '最近30天浓度趋势', checked: false },
      ],
    };
  },
  methods: {
    choseType(item) {
      this.choseList.forEach((element) => {
        // eslint-disable-next-line no-param-reassign
        element.checked = false;
      });
      // eslint-disable-next-line no-param-reassign
      item.checked = true;
    },
  },
};
</script>

<style scoped>
*{
  margin: 0px;
  padding: 0;
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
  width:152px;
  height:33px;
  background-color: transparent;
  /* border:1px solid red; */
  cursor: pointer;
  text-align: center;
  line-height: 33px;
}
.checked{
  background-color: #458bf3;
  border-radius: 4px;
  color: white;
}
.popContent{
  width: 600px;
  height: 210px;
  border: 1px solid;
  margin-bottom: 4px;
}
</style>
