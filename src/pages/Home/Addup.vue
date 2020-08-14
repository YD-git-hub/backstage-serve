<template>
  <div>
    <el-date-picker
      v-model="time"
      type="datetimerange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      align="right"
    ></el-date-picker>
    <el-button type="primary" icon="el-icon-search" @click="clickInquire">查询</el-button>

    <div class="Addup">
      <div id="myChart" :style="{ height: '600px',background:'#fff',padding:'20px',width:'100%'}"></div>
    </div>
  </div>
</template>

<script>
import { getCtime } from "@/utils/utils";
import { Ordtotal } from "@/Api/apis";
export default {
  data() {
    return {
      time: [new Date(), new Date()],
      date: "[]",
    };
  },
  created() {
    this.echasts(this.date);
  },
  methods: {
    clickInquire() {
      let obj = {};
      if (this.time) {
        obj.date = JSON.stringify([
          getCtime(this.time[0]),
          getCtime(this.time[1]),
        ]);
      }
      this.echasts(obj.date);
    },
    echasts(ipmes) {
      Ordtotal({ date: ipmes }).then((res) => {
        let arr = res.data.data;
        for (const iter of arr) {
          iter.orderTime = getCtime(iter.orderTime);
        }
        let option = {
          xAxis: {
            type: "category",
            data: arr.map((itme) => itme.orderTime),
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              data: arr.map((itme) => itme.orderAmount),
              type: "bar",
              showBackground: true,
              backgroundStyle: {
                color: "rgba(220, 220, 220, 0.8)",
              },
            },
          ],
        };
        this.myChart.setOption(option);
      });
    },
  },
  components: {},
  mounted() {
    this.myChart = this.$echarts.init(document.getElementById("myChart"));
    // 绘制图表
  },
};
</script>

<style lang="less" scoped>
.Addup {
  background: #fff;
  height: 100%;
  padding: 20px;
  margin-top: 70px;
}
</style>