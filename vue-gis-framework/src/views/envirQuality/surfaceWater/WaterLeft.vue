<template>
  <div style="width:310px;height:442px;">
    <!-- 环境空气-地表示 -->
    <div class="topTitle">{{siteName}}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      siteName: '站点选择',
    };
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
</style>
