<template>
  <section>

    <div class="line_02">
      <span>性能监控</span>
    </div>

    <el-table :data='form' :header-cell-style="headerStyle">
      <el-table-column prop="cpu" label="实时CPU" min-width="120">
      </el-table-column>
      <el-table-column prop="memory" label="内存" min-width="120">
      </el-table-column>
      <!-- <el-table-column prop="rate" label="存储使用率" min-width="120">
      </el-table-column> -->
    </el-table>
    <el-col>
      <div class="line_02">
        <span>终端在线人数</span>
      </div>
      <el-row :span="24">
        <div id="chartLine1" style="width:100%; height:250px; margin-top: 20px"></div>
      </el-row>

    </el-col>

  </section>
</template>

<script>
// import { getMonitorInfo } from '../../api/api.js'
import performanceMonitor from 'echarts'
// import store from '../../store'
require('echarts/theme/walden')

let option = {}
let myChart

export default {
  name: 'performanceMonitor',
  data() {
    return {
      form: [{
        cpu: Number,
        memory: Number
      }]
    }
  },
  methods: {
    headerStyle() {
      return this.header()
    },
    drawLineChart1: function() {
      myChart = performanceMonitor.init(
        document.getElementById('chartLine1'),
        'walden'
      )
      option = {
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
          data: ['在线终端数']
        },
        grid: {
          left: '5%',
          right: '5%',
          bottom: '10%',
          containLabel: false
        },
        toolbox: {
          show: true
          // feature: {
          // dataView: {readOnly: false},
          // restore: {},
          // saveAsImage: {}
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
            data: (function() {
              let now = new Date()
              let res = []
              let len = 12
              while (len--) {
                res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''))
                // console.log('res')
                // console.log(res)
                now = new Date(now - 2000)
              }
              console.log('res1')
              console.log(res)
              return res
            })()
          }
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
            minInterval: 1,
            name: '数量',
            boundaryGap: [0.2, 0.2]
          }
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
            name: '终端在线数',
            type: 'line',
            smooth: true,
            data: []
          }
        ]
      }
      myChart.setOption(option)

      window.addEventListener('resize', function() {
        myChart.resize()
      })
    },

    drawCharts() {
      this.drawLineChart1()
    },

    async update() {
      let axisData = new Date().toLocaleTimeString().replace(/^\D*/, '')
      // let userNum = Number
      // let para = {}
      // para.type = 6
      // await getMonitorInfo(para).then(res => {
      //   if (res.data.code === 200) {
      //     userNum = res.data.online_users
      //     console.log(userNum)
      //   }
      // })
      console.log('axisData')
      console.log(axisData)
      let data1 = option.series[0].data
      if (data1.length > 11) {
        data1.shift()
      }
      data1.push(this.$store.state.app.systemData.userNum)
      console.log(data1)

      option.xAxis[0].data.shift()
      console.log('option.xAxis[0].data1')
      console.log(option.xAxis[0].data)
      option.xAxis[0].data.push(axisData)
      console.log('option.xAxis[0].data2')
      console.log(option.xAxis[0].data)
      // option.xAxis[0].data = this.res
      // console.log('option.xAxis[0].data3')
      // console.log(option.xAxis[0].data)
      myChart.setOption(option)

      this.form[0].cpu = (this.$store.state.app.systemData.cpu) + '%'
      this.form[0].memory = (this.$store.state.app.systemData.memory) + '%'
    },

    getInfo() {
      this.update()
      setInterval(this.update, 2000)
    }

    // getSystemInfo() {
    //   let para = {}
    //   para.type = 6
    //   getMonitorInfo(para).then((res) => {
    //     if (res.data.code === 200) {
    //       this.form[0].cpu = (res.data.cpu_usage).toFixed(2) + '%'
    //       this.form[0].memory = (res.data.memory_usage).toFixed(2) + '%'
    //     }
    //   })
    // }

  },

  mounted: function() {
    this.getInfo()                             // wyk换了下顺序，解决后两个时间相同的bug
    this.drawCharts()
    // 18.09.17 pky 太烦，生成环境恢复
    // setInterval(console.log('kaishi'), 2000)

    // this.getSystemInfo()
  }
}
</script>

<style scoped>
</style>
