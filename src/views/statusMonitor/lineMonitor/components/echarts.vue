<template>
  <div id="echarts"></div>
</template>

<script>
import lineMonitor from 'echarts'
require('echarts/theme/walden')

export default {
  name: 'lineMonitor',
  methods: {
    drawCharts() {
      let myChart = lineMonitor.init(document.getElementById('echarts'),'walden')

      let option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          x: 'left',
          data:['HTTP协议','网络视频','网络游戏','网络下载','文件传输']
        },
        series: [
          {
            name:'协议流量分布',
            type:'pie',
            radius: ['60%', '80%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '20',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data:[
              {value:335, name:'HTTP协议'},
              {value:310, name:'网络视频'},
              {value:234, name:'网络游戏'},
              {value:135, name:'网络下载'},
              {value:1548, name:'文件传输'}
            ]
          }
        ]
      }

      myChart.setOption(option)

      window.addEventListener('resize',function() {
        myChart.resize()
      })
    }
  },
  mounted() {
    // this.getInfo().then( (res) => {
    //   this.drawCharts(res)
    // })
    this.drawCharts()
  }
}
</script>
