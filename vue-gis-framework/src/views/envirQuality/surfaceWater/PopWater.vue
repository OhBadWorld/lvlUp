<template>
  <div>
    <div class="leftHeader">
      <div class="titleIcon"></div>
      <div class="titleName">{{pointInfo.name}}</div>
    </div>
    地表水-弹框内容
  </div>
</template>

<script>
export default {
  props: {
    pointInfo: {
      type: Object,
      default() {
        return {
          name: '123',
        };
      },
    },
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
  font-size: 16px;
}
</style>
