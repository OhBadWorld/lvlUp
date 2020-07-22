import Echart from 'vue-echarts';
// 饼状图
import 'echarts/lib/chart/pie';
// 折线
import 'echarts/lib/chart/line';
// 柱状图
import 'echarts/lib/chart/bar';

// 提示
import 'echarts/lib/component/tooltip';
// 图例
import 'echarts/lib/component/legend';
// 标题
import 'echarts/lib/component/title';
// 标线
import 'echarts/lib/component/markLine';

export default (Vue) => { Vue.component('Echart', Echart); };
