import requests from './http';
// 接口文件呢，post请求参数名为data，get请求参数名为params

const apiMethods = {
  getTestData() {
    return requests({
      url: "/mock/treeData.json",
      method: "get"
    })
  },
  getGasPointsData() {
    return requests({
      url: "/mock/gasPointsData.json",
      method: "get"
    })
  },
};

export function getTestData() {
  return requests({
    url: "/mock/treeData.json",
    method: "get"
  })
}

export default apiMethods;