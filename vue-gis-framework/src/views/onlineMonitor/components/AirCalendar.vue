<template>
  <div class="right-content">
    <div style="height: 326px;">
      <div class="" style="padding: 10px 15px;">
        <el-select v-model="year" style="width: 100px;">
          <el-option v-for="item in years" :value="item" :label="item" :key="item"></el-option>
        </el-select>
        <el-select v-model="month" style="width: 100px; margin-left: 10px;">
          <el-option v-for="item in mons" :value="item" :label="item" :key="item"></el-option>
        </el-select>
        <div class="r-inline">
          <el-button type="primary" size="mini" @click="qEQCalendar" style="padding: 10px 20px;margin-left: 7px;">查询</el-button>
        </div>
      </div>
      <div class="lvls clearfix">
        <div class="lvl-t-item" v-for="(lvl, index) in lvls" :key="index">
          <div class="lvl-t-ico" :style="{background: lvl.color}"></div>
          <span class="lvl-tt">{{lvl.title}}</span>
        </div>
      </div>
      <div class="calendar" element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.6)">
        <div class="day-title clearfix">
          <div class="day-tt" v-for="day in days" :key="day">{{day}}</div>
        </div>
        <div class="clearfix" style="padding-top: 10px;">
          <div :class="{'date-item': true, 'is-last-month': true,}" v-for="(item, index) in nunDays" :key="index + 'num'">
            <div class="day">{{item}}</div>
          </div>
          <div :class="{'date-item': true, 'is-last-month': false,}" v-for="(item, index) in list" :key="index">
            <div class="day" :style="{background: item.color}">{{item.date}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const today = new Date();
const years = [];
const year = today.getFullYear();
for (let i = 2018; i <= year; i += 1) {
  years.push(`${i}年`);
}
export default {
  props: {
    rightData2: {
      type: Object,
      defaul() {
        return undefined;
      },
    },
  },
  watch: {
    rightData2(val) {
      this.dealData(val);
    },
    calendarData(val) {
      this.dealData(val);
    },
  },
  data() {
    return {
      pointInfo: {
        title: '环境质量日历图',
      },
      days: ['日', '一', '二', '三', '四', '五', '六'],
      year: `${year}年`,
      years,
      month: `${today.getMonth() + 1}月`,
      mons: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      lvls: [
        { title: '优', color: '#55bd54' },
        { title: '良', color: '#f6e154' },
        { title: '轻', color: '#f69434' },
        { title: '中', color: '#f6355e' },
        { title: '重', color: '#8e033e' },
        { title: '严重', color: '#5a0a0a' },
        { title: '未知', color: '#BBBBBB' },
      ],
      list: [],
      dealDataFinal: [], // 处理接口数据之后获得的最终的数组
      nunDays: [],
      testDays: ['日', '一', '二', '三', '四', '五', '六'],
      calendarData: null,
    };
  },
  computed: {
    // 获取 select框中展示的具体月份应对应的月数
    monthDays() {
      const lastyear = (this.year).replace('年', '') * 1;
      const lastMon = (this.month).replace('月', '') * 1;
      const monNum = new Date(lastyear, lastMon, 0).getDate();
      // return this.$mp.dateFun.GetMonthDays(this.year.substr(0, 4), lastMon);
      return monNum;
    },
  },
  methods: {
    monthFisrtDay() {
      // 所指的星期中的某一天，使用本地时间。返回值是 0（周日） 到 6（周六） 之间的一个整数
      // eslint-disable-next-line radix
      const currDT = (`${parseInt(this.year.substr(0, 4))}/${parseInt((this.month).replace('月', ''))}/1`);
      let currWeek = new Date(currDT).getDay();
      // eslint-disable-next-line no-plusplus
      return ++currWeek || 7;
    },
    // 刷新日历 获得上个月的结尾天数 <=7
    refreshCalendar() {
      this.nunDays = [];
      const lastDays = [];
      const lastMon = (this.month).replace('月', '') * 1 - 1;
      let lastDay = new Date(new Date(this.year.substr(0, 4), lastMon).getTime() - 8.64e7).getDate();
      for (let i = 1; i < this.monthFisrtDay(); i += 1) {
        lastDays.unshift(lastDay);
        lastDay -= 1;
      }
      this.nunDays = lastDays;
    },
    // 展示 日历数据
    getDatas() {
      if (this.dealDataFinal && this.dealDataFinal.length > 0) {
        this.list = [];
        const datas = this.dealDataFinal;
        const dataMap = {};
        if (datas.length > 0) {
          datas.forEach((item) => {
            // eslint-disable-next-line no-param-reassign
            item.level -= 1;
            // eslint-disable-next-line no-param-reassign
            item.dateStr = item.tstamp.substr(0, 10);
            // eslint-disable-next-line no-param-reassign
            item.date = item.tstamp.substr(8, 2);
            dataMap[item.date] = item;
          });
        }
        for (let i = 1; i <= this.monthDays; i += 1) {
          let currColor = this.lvls[6];
          let dateStr = String(i);
          dateStr = `0${dateStr}`;
          dateStr = dateStr.substr(dateStr.length - 2);
          const dataObj = dataMap[dateStr];
          if (dataObj) {
            if (dataObj.level >= 0 && dataObj.level <= 5) {
              currColor = this.lvls[dataObj.level].color;
            } else {
              currColor = this.lvls[6].color;
            }

            this.list.push({
              date: i,
              color: currColor,
              datas: dataObj,
            });
          } else {
            this.list.push({
              date: i,
              color: this.lvls[6].color,
              datas: {},
            });
          }
        }
      } else {
        this.clearCalendar();
      }
    },
    clearCalendar() {
      this.list = [];
      for (let i = 1; i <= this.monthDays; i += 1) {
        this.list.push({
          date: i,
          color: this.lvls[6].color,
          datas: {},
        });
      }
    },

    // 处理接口返回的日历数据
    dealData(currDS) {
      const tempData = [];
      if (('dates' in currDS) && ('level' in currDS) && ('levelName' in currDS) && ('values' in currDS)) {
        if (currDS.dates.length > 0 && currDS.level.length > 0 && currDS.levelName.length > 0 && currDS.values.length > 0) {
          // eslint-disable-next-line no-plusplus
          for (let i = 0; i < currDS.dates.length; i++) {
            const temp = {
              tstamp: currDS.dates[i],
              level: currDS.level[i],
              levelName: currDS.levelName[i],
              value: currDS.values[i],
              grade: this.loadImgType(currDS.levelName[i]),
              week: this.testDays[new Date(currDS.dates[i]).getDay()], // currDS.dates[i]: '2020-03-31'
            };
            tempData.push(temp);
          }
          // this.dealDataFinal = tempData.filter(item => item.grade>0);
          this.dealDataFinal = tempData;
          this.refreshCalendar();
          this.getDatas();
        } else {
          this.dealDataFinal = null;
          this.getDatas();
        }
      } else {
        this.dealDataFinal = null;
        this.getDatas();
      }
    },
    // 加载等级
    loadImgType(value) {
      let imgUrl = 0;
      switch (value) {
        case '优':
          imgUrl = 1;
          break;
        case '良':
          imgUrl = 2;
          break;
        case '轻':
          imgUrl = 3;
          break;
        case '中':
          imgUrl = 4;
          break;
        case '重':
          imgUrl = 5;
          break;
        case '严':
          imgUrl = 6;
          break;
        default:
          imgUrl = 0;
          break;
      }
      return imgUrl;
    },
    // （右边）区域环境质量日历
    qEQCalendar() {
      this.calendarData = {
        dates: [
          '2020-07-01',
          '2020-07-02',
          '2020-07-03',
          '2020-07-04',
          '2020-07-05',
          '2020-07-06',
          '2020-07-07',
          '2020-07-08',
          '2020-07-09',
          '2020-07-10',
          '2020-07-11',
          '2020-07-12',
          '2020-07-13',
          '2020-07-14',
          '2020-07-15',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
        ],
        level: [
          1,
          4,
          2,
          3,
          1,
          4,
          4,
          3,
          1,
          4,
          2,
          2,
          4,
          1,
          3,
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
        ],
        levelName: [
          '优',
          '中度污染',
          '良',
          '轻度污染',
          '优',
          '中度污染',
          '中度污染',
          '轻度污染',
          '优',
          '中度污染',
          '良',
          '良',
          '中度污染',
          '优',
          '轻度污染',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
        ],
        values: [
          '65',
          '65',
          '65',
          '65',
          '65',
          '65',
          '65',
          '65',
          '65',
          '65',
          '65',
          '65',
          '65',
          '65',
          '65',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
        ],
      };
      // this.$axios.get('api/sinoyd-airquality/airquality/gis/calendar?year=' + parseInt(this.year.substr(0, 4)) + '&month=' + parseInt((this.month).replace('月', '')))
      //   .then((res) => {
      //     if (res.status == 200) {
      //       this.calendarData = res.data.data;
      //     } else {
      //       this.calendarData = null;
      //     }
      //   }, () => {
      //     this.calendarData = null;
      //   });
    },
  },
  mounted() {
    this.qEQCalendar();
  },
};
</script>

<style lang="scss" scoped>
.r-inline{
    display: inline-block;
}
.right-content{
    width: 96%;
    margin: 7px;
    border-radius: 9px;
    background-color: white;
}
.day-title {
  border-bottom: 1px solid #2f7777;
  padding: 1px 0 30px;
  .day-tt {
    float: left;
    text-align: center;
    color: #000000;
    width: 38px;
    padding: 4px 4px;
  }
}
.clearfix{
  clear: both;
}
.date-item {
  float: left;
  text-align: center;
  color: #cac3c3;
  width: 38px;
  padding: 4px 4px;
  &.is-last-month {
    color: #fff;
  }
  .day {
    border-radius: 5px;
    padding: 3px;
    text-shadow: #000 0.5px 0.5px 0.5px, #000 0 0.5px 0, #000 -0.5px 0 0, #000 0 -0.5px 0;
  }
}
.calendar{
  padding: 0px 6px;
}
.lvls {
  padding: 0px 6px 6px 13px;
}
.lvl-t-item {
  float: left;
  font-size:10px;
  padding-right: 3px;
  .lvl-t-ico {
    height: 12px;
    width: 12px;
    display: inline-block;
    margin-right: 5px;
  }
  .lvl-tt {
    color: #5b5e5f;
  }
}

::v-deep .el-input__inner{
  height: 32px;
}
::v-deep .el-input__icon{
  line-height: 32px;
}
</style>
