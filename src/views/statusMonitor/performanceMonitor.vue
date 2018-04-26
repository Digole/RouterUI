<template>
  <section>

    <div class="line_02"><span>性能监控</span></div>

    <el-table :data="$store.state.systemInfo" highlight-current-row style="width: 100%;" :header-cell-style=headerStyle>
      <el-table-column prop="CPURate" label="实时CPU" min-width="180">
      </el-table-column>
      <el-table-column prop="RAMRate" label="内存" min-width="180">
      </el-table-column>
      <el-table-column prop="rate" label="存储使用率" min-width="180">
      </el-table-column>
    </el-table>
    <el-col>
      <div class="line_02"><span>上下行速率</span></div>
      <el-row :span="24">
        <div id="chartLine1" style="width:100%; height:250px; margin-top: 20px"></div>
      </el-row>
      <div class="line_02"><span>终端在线人数</span></div>
      <el-row :span="24">
        <div id="chartLine2" style="width:100%; height:250px; margin-top: 20px"></div>
      </el-row>
    </el-col>

  </section>
</template>

<script>
  import performanceMonitor from 'echarts';
  import store from '../../vuex/store';
  require('echarts/theme/walden');

  export default {
    name: "performanceMonitor",
    data() {
      return {
        CPURate:'',
      }
    },

    watch:{
    },

    methods: {

      headerStyle() {
        return this.header();
      },

      drawLineChart1: function () {
        let myChart = performanceMonitor.init(document.getElementById('chartLine1'),"walden");

        let option = {
          title: {
            text: '',
            subtext: ''
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: 'blue'
              }
            }
          },
          legend: {
            data:['上行速率', '下行速率']
          },
          grid: {
            left: '5%',
            right: '5%',
            bottom: '10%',
            containLabel: false
          },
          toolbox: {
            show: true,
            // feature: {
            //dataView: {readOnly: false},
            // restore: {},
            //saveAsImage: {}
            // }
          },
          dataZoom: {
            show: false,
            start: 0,
            end: 100
          },
          xAxis: [
            {
              type: 'category',
              boundaryGap: true,
              data: (function (){
                let now = new Date();
                let res = [];
                let len = 12;
                while (len--) {
                  res.unshift(now.toLocaleTimeString().replace(/^\D*/,''));
                  now = new Date(now - 2000);
                }
                return res;
              })()
            },
            /*
            {
              type: 'category',
              boundaryGap: true,
              data: (function (){
                let res = [];
                let len = 0;
                while (len < 12) {
                  res.push(len + 1);
                  len++;
                }
                return res;
              })()
            }
            */
          ],
          yAxis: [
            {
              type: 'value',
              scale: true,
              name: '速率',
              max: 100,
              min: 0,
              boundaryGap: [0.2, 0.2]
            },
            /*
            {
              type: 'value',
              scale: true,
              name: '终端在线人数',
              max: 1200,
              min: 0,
              boundaryGap: [0.2, 0.2]
            }
            */
          ],
          series: [
            /*
            {
              name:'终端在线人数',
              type:'bar',
              xAxisIndex: 1,
              yAxisIndex: 1,
              data:(function (){
                let res = [];
                let len = 12;
                while (len--) {
                  res.push(Math.round(Math.random() * 1000));
                }
                return res;
              })()
            },
            */
            {
              name:'上行速率',
              type:'line',
              smooth: true,
              data:(function (){
                let res = [0];
                let len = 0;
                while (len < 12) {
                  res.push((Math.random()*10 + 5).toFixed(1) - 0);
                  len++;
                }
                return res;
              })()
            },
            {
              name:'下行速率',
              type:'line',
              smooth: true,
              data:(function (){
                let res = [];
                let len = 0;
                while (len < 12) {
                  res.push((Math.random()*10 + 5).toFixed(1) - 0);
                  len++;
                }
                return res;
              })()
            }
          ]
        };

        app.count = 13;

        myChart.setOption(option);

        setInterval(function (){
          let axisData = (new Date()).toLocaleTimeString().replace(/^\D*/,'');

          //let data0 = option.series[0].data;
          let data1 = option.series[0].data;
          let data2 = option.series[1].data;
          //data0.shift();
          //data0.push(Math.round(Math.random() * 1000));
          data1.shift();
          //data1.push((Math.random() * 10 + 5).toFixed(1) - 0);
          data1.push(store.state.systemInfo[0].CPURate);
          data2.shift();
          data2.push((Math.random() * 10 + 5).toFixed(1) - 0);

          option.xAxis[0].data.shift();
          option.xAxis[0].data.push(axisData);
          //option.xAxis[1].data.shift();
          //option.xAxis[1].data.push(app.count++);

          myChart.setOption(option);
        }, 2000);
        /*
                window.onresize = function() {
                  myChart.resize();
                }
        */
        window.addEventListener("resize",function() {
          myChart.resize();
        });
      },

      drawLineChart2: function() {
        let chartBar = performanceMonitor.init(document.getElementById('chartLine2'),"walden");
        let option = {
          title: {
            text: ''
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['终端在线人数']
          },
          grid: {
            left: '5%',
            right: '5%',
            bottom: '10%',
            containLabel: false
          },
          xAxis: {
            type: 'category',
            boundaryGap: true,
            data: (function () {
              let now = new Date();
              let res = [];
              let len = 12;
              while (len--) {
                res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''));
                now = new Date(now - 2000);
              }
              return res;
            })()
          },
          yAxis: {
            type: 'value',
            scale: true,
            name: '',
            max: 1000,
            min: 0,
            boundaryGap: [0.2, 0.2]
          },
          series: {
            name: '终端在线人数',
            type: 'bar',
            data: (function () {
              let res = [];
              let len = 12;
              while (len--) {
                res.push(Math.round(Math.random() * 1000));
              }
              return res;
            })()
          },
        };

        chartBar.setOption(option);

        setInterval(function (){
          let axisData = (new Date()).toLocaleTimeString().replace(/^\D*/,'');

          let data = option.series.data;

          data.shift();
          data.push(Math.round(Math.random() * 1000));

          option.xAxis.data.shift();
          option.xAxis.data.push(axisData);

          chartBar.setOption(option);
        }, 2000);
        /*
                window.onresize = function() {
                  chartBar.resize();
                }*/
        window.addEventListener("resize",function() {
          chartBar.resize();
        });
      },

      drawCharts() {
        this.drawLineChart1();
        this.drawLineChart2();
      },

      getSystemInfo: function(){
        /*
        setInterval(()=>{
          console.log(this.$store.state.systemInfo);
        },1000)
              */
      }
    },

    mounted: function () {
      this.drawCharts();
      this.getSystemInfo();
    },

    updated: function () {
      this.drawCharts()
    }
  }
</script>

<style scoped>

</style>
