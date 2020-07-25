module.exports = {
  root: true,
  env: {
    // 添加browser和es6的环境
    browser: true,
    es6: true,
    node: true,
  },
  // 关键：启用 airbnb 规则
  extends: ['plugin:vue/essential', 'airbnb-base'],
  // 使用语言及版本
  parserOptions: {
    "ecmaVersion": 7,
    "sourceType": "module",
    "parser": "babel-eslint"
  },
  parser: "vue-eslint-parser",
  // 个人自定义规则
  rules: {
    "global-require": 0,
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'max-len' : ["error", {code : 300}],
    "import/no-unresolved": [
      2,
      {
        "ignore": ["^@/"] // @ 是设置的路径别名
      },
    ],
  },
}
