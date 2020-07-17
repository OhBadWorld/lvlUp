import requests from './http';
// 接口文件呢，post请求参数名为data，get请求参数名为params

const apiMethods = {
  getTestData() {
    return requests({
      url: '/mock/treeData.json',
      method: 'get',
    });
  },
  getGasPointsData() {
    return requests({
      url: '/mock/gasPointsData.json',
      method: 'get',
    });
  },
  getLately48HoursData(portId, factorCode) {
    return requests({
      url: '/mock/lately48HoursData.json',
      method: 'get',
      params: { // 如果是post请求的话，这里传参的字段就要改成data
        portId,
        factorCode,
      },
    });
  },
};

export function getTestData() {
  return requests({
    url: '/mock/treeData.json',
    method: 'get',
  });
}

export default apiMethods;
