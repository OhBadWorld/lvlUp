module.exports = {
  // =================================================================================================================== 打包
  // publicPath: './', // 打包部署时的设置，让打包之后的文件都再同一个目录下，相对位置查找文件

  // =================================================================================================================== 开发
  publicPath: '/', // 开发时
  outputDir: 'dist', // 打包后输出的文件夹
  devServer: {
    open: true, // 自动打开浏览器
    host: 'localhost', // 默认的地址，0.0.0.0 在真机测试时使用
    port: 8080, // 可以修改端口号
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changOrogin: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
  transpileDependencies: [
    'vue-echarts',
    'resize-detector',
  ],
};
