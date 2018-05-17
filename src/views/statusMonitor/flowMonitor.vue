<template>
  <section class="chart-container">

    <div class="line_02"><span>流量监控</span></div>

    <div>
      <div id="chartLine1" style="width:100%; height:300px;"></div>
    </div>

    <div class="line_02"><span>协议流量</span></div>

    <div>
      <div style="text-align: right;">
        <el-select v-model="value" placeholder="请选择" size="mini" style="width: 120px;" @change="onSelect">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div id="chartLine2" style="width:100%; height:300px;"></div>
    </div>

  </section>
</template>

<script>
  import flowMonitor from 'echarts';
  require('echarts/theme/walden');


  let stopSignal = 0;
  let timeInterval = 1000;

  export default {
    data() {
      return {
        timeInterval: 1000,
        duration: 300*60,
        options: [{
          value:'3600',
          label:'最近一小时'
        },{
          value:'24*3600',
          label:'最近一天'
        },{
          value:'7*24*3600',
          label:'最近一周'
        },{
          value:'30*24*3600',
          label:'最近一月'
        }
        ],
        value: ''
      }
    },

    methods: {

      drawLineChart1: function () {
        let myChart = flowMonitor.init(document.getElementById('chartLine1'),"light");

        let option = {
          title: {
            text: '上/下行流量'
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
            data:['上行流量', '下行流量']
          },
          grid: {
            left: '3%',
            right: '3%',
            bottom: '3%',
            containLabel: true
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
          xAxis:
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
          yAxis: [
            {
              type: 'value',
              scale: true,
              name: '上行流量',
              max: 1000,
              min: 0,
              boundaryGap: [0.2, 0.2]
            },
            {
              type: 'value',
              scale: true,
              name: '下行流量',
              max: 1000,
              min: 0,
              boundaryGap: [0.2, 0.2]
            }
          ],
          series: [
            {
              name:'上行流量',
              type:'line',
              smooth: true ,
              //xAxisIndex: 1,
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
            {
              name:'下行流量',
              type:'line',
              smooth: true ,
              data:(function (){
                let res = [];
                let len = 0;
                while (len < 12) {
                  res.push(Math.round(Math.random() * 1000));
                  len++;
                }
                return res;
              })()
            }
          ]
        };

        app.count = 11;

        myChart.setOption(option);

        setInterval(function (){
          let axisData = (new Date()).toLocaleTimeString().replace(/^\D*/,'');

          let data0 = option.series[0].data;
          let data1 = option.series[1].data;
          data0.shift();
          data0.push(Math.round(Math.random() * 1000));
          data1.shift();
          data1.push(Math.round(Math.random() * 1000));

          option.xAxis.data.shift();
          option.xAxis.data.push(axisData);
          //option.xAxis[1].data.shift();
          //option.xAxis[1].data.push(app.count++);
          //option.xAxis[1].data.push(axisData);

          myChart.setOption(option);
        }, 2100);

        window.onresize = function() {
          myChart.resize();
        }
      },

      drawLineChart2: function(){
        let myChart = flowMonitor.init(document.getElementById('chartLine2'),"walden");
        //console.log("timeInterval123： "+timeInterval);

        function randomData() {
          now = new Date(+now + timeInterval);
          //console.log("timeInterval： "+timeInterval);
          value = Math.random()*100;
          return {
            name: now.toString(),
            value: [
              now,
              Math.round(value)
            ]
          }
        }
        let data = [];
        let now = new Date();
        let value = 0;
        for (let i = 0; i < this.duration/60; i++) {
          console.log("duration:"+this.duration);
          data.push(randomData());
        }

        let option = {
          title: {
            subtext: '上行速率',
          },
          tooltip: {
            trigger: 'axis',
            formatter: function (params) {
              params = params[0];
              let date = new Date(params.name);
              return date.getHours() + ':' + date.getMinutes() + ' : ' + params.value[1];
            },
            axisPointer: {
              animation: false
            }
          },
          grid: {
            left: '5%',
            right: '2%',
            bottom: '12%',
            containLabel: false
          },
          xAxis: {
            type: 'time',
            splitLine: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: '#7CCD7C',
              }
            },
          },
          yAxis: {
            type: 'value',
            boundaryGap: [0, '0%'],
            splitLine: {
              show: false
            }
          },
          series: [{
            name: '模拟数据',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            data: data
          }]
        };
        /*
                data.shift();
                data.push(randomData());
                myChart.setOption(option);
        */
        stopSignal = setInterval(function () {
          console.log("in interval "+stopSignal);
          data.shift();
          data.push(randomData());
          myChart.setOption(option);
        }, 2000);
        window.addEventListener("resize",function() {
          myChart.resize();
        });
      },

      onSelect: function(){
        this.duration = this.value;
        timeInterval = this.value
        console.log("in clear "+stopSignal);
        clearInterval(stopSignal);
        this.drawLineChart2();
        console.log("in select");
        console.log("in select"+ timeInterval);
      },

      drawCharts() {
        this.drawLineChart1();
        this.drawLineChart2();
      },
    },

    mounted: function () {
      this.drawCharts()
    },
    updated: function () {
      //this.drawCharts()
    }
  }
</script>

<style scoped>
  .line_02{
    margin-bottom: 20px;
    margin-top: 30px;
    height: 1px;
    border-top: 1px solid #ddd;
    text-align: left;
    color: #909399
  }
  .line_02 span{
    position: relative;
    top: -10px;
    background: #fff;
    padding: 0 30px 0 0;
    font-weight: bold
  }
</style>
