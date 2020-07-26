<template>
  <div>
    <div class="rightHead">
      <div class="titleIcon"></div>
      <div class="titleName">实时空气情况</div>
    </div>
    <div class="popContent">
      <div v-if="tabType == 'realGas'">
        <div>
          <span class="pointName">点位名称</span>
          <span style="float: right;" class="pointName">2018-05-02 16:00:23</span>
        </div>
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <div style="display: inline-block;height:134px;width:142px;">
                <span class="aqiTitle">AQI指数</span>
                <img :src="lvlImgI" alt="" class="aqiImg">
              </div>
              <div class="aqiVal">
                <span class="aqiValTxt">52</span>
                <div class="aqiValLvl">优</div>
              </div>
              <div style="width: 205px;margin-left: 22px;">
                <div>
                  <span class="poll">首要污染物</span>
                  <span class="poll">PM2.5</span>
                </div>
                <div>
                  <span class="poll">浓度值</span>
                  <span class="poll">36 μg/m³</span>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="healthEffect">对健康的影响</div>
            <div class="healthTxt">
              空气质量可接受，但是某些污染物可能对极少数异常敏感人群健康有较弱影响
            </div>
            <div class="healthEffect">建议采取的措施</div>
            <div class="healthTxt">
              极少数异常敏感人群应减少户外运动
            </div>
          </el-col>
        </el-row>
      </div>
      <div v-if="tabType == 'readFactor'"></div>
      <div v-if="tabType == 'last24Hours'"></div>
      <div v-if="tabType == 'last30Days'"></div>
    </div>
    <div>
      <div :class="{'tab':true, 'checked': item.checked}"
        v-for="(item) in choseList" :key="item.code"
        @click="choseType(item)">
        {{item.label}}
      </div>
    </div>
  </div>
</template>

<script>
import lvlImgI from '../../../assets/imgs/air/1.png';
import lvlImgII from '../../../assets/imgs/air/2.png';
import lvlImgIII from '../../../assets/imgs/air/3.png';
import lvlImgIV from '../../../assets/imgs/air/4.png';
import lvlImgV from '../../../assets/imgs/air/5.png';
import lvlImgVI from '../../../assets/imgs/air/6.png';
import lvlImgVII from '../../../assets/imgs/air/-1.png';

export default {
  data() {
    return {
      lvlImgI,
      lvlImgII,
      lvlImgIII,
      lvlImgIV,
      lvlImgV,
      lvlImgVI,
      lvlImgVII,
      tabType: 'realGas',
      choseList: [
        { code: 'realGas', label: '小时空气质量情况', checked: true },
        { code: 'readFactor', label: '实时因子浓度', checked: false },
        { code: 'last24Hours', label: '最近24小时浓度趋势', checked: false },
        { code: 'last30Days', label: '最近30天浓度趋势', checked: false },
      ],
    };
  },
  methods: {
    choseType(item) {
      this.choseList.forEach((element) => {
        // eslint-disable-next-line no-param-reassign
        element.checked = false;
      });
      // eslint-disable-next-line no-param-reassign
      item.checked = true;
      this.tabType = item.code;
    },
  },
};
</script>

<style scoped>
*{
  margin: 0px;
  padding: 0;
}
.rightHead{
  margin: 10px;
}
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
.tab{
  display: inline-block;
  width:152px;
  height:33px;
  background-color: transparent;
  /* border:1px solid red; */
  cursor: pointer;
  text-align: center;
  line-height: 33px;
}
.checked{
  background-color: #458bf3;
  border-radius: 4px;
  color: white;
}
.popContent{
  width: 600px;
  height: 210px;
  border: 1px solid;
  margin-bottom: 4px;
}
.pointName{
  display: inline-block;
  width: 172px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  font-size: 14px;
  font-weight: bold;
}
.aqiTitle{
  display: block;
  width: 172px;
  height: 20px;
  line-height: 20px;
  text-align: center;
}
.aqiImg{
  width: 100px;
  height: 100px;
  margin: 10px 0px 0px 20px;
}
.aqiVal{
  display: inline-block;
  width: 80px;
  position: relative;
  top: -27px;
}
.aqiValTxt{
  display: block;
  width: 100%;
  text-align: center;
  font-size: 28px;
  font-weight: bold;
  color: #00e400;
}
.aqiValLvl{
  text-align: center;
  height: 24px;
  background-color: #00e400;
  line-height: 24px;
  color: white;
}
.poll{
  display: inline-block;
  width: 50%;
}
.healthEffect{
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 5px;
}
.healthTxt{
  margin-bottom: 5px;
  height: 60px;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
