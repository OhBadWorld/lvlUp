<template>
  <div>
    数据展示-弹框内容
    {{pointInfo.name}}
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
};
</script>