<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
*{
  margin: 0px;
  padding: 0px;
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
