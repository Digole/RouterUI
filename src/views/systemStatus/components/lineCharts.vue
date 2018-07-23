<template>
  
</template>

<script>
import lineCharts from 'echarts'
let myChart1, option1 = {}
let myChart2, option2 = {}
export default {
  name: 'lineCharts',
  data() {
    return {
      option: {
        title: {
          text: '近5分钟上下行速率',
          subtext: '上行速率',
          textStyle: {
            fontWeight: 'normal',
            fontSize: 14,
          },
        },
        tooltip: {
          trigger: 'axis',
          formatter: function (params) {
            params = params[0]
            let date = new Date(params.name)
            return date.getHours() + ':' + date.getMinutes() + ' : ' + params.value[1]
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
              color: '#CD0000',
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
          lineStyle: {
            width: 0.5,
            type: 'dotted',
          },
          showSymbol: false,
          hoverAnimation: false,
          data: []
        }],
      }

    }
  },
  methods: {
    drawLineChart1: function(){
      myChart1 = lineCharts.init(document.getElementById('chartLine1'),'walden')

      function randomData() {
        now = new Date(+now + 1000)
        // console.log("now "+now+"and "+now.toTimeString());
        value = Math.random()*100/10+50
        return {
          name: now.toString(),
          value: [
            //[now.getHours(), now.getMinutes(), now.getSeconds()].join(':'),
            now,
            Math.round(value)
          ]
        }
      }

      let data = []
      let now = new Date()
      let value = 0
      for (let i = 0; i < 300; i++) {
        data.push(randomData())
      }

      option1 = {
        title: this.option.title,
        tooltip: this.option.tooltip,
        grid: this.option.grid,
        xAxis: this.option.xAxis,
        yAxis: this.option.yAxis,
        series: [{
          name: '模拟数据',
          type: 'line',
          lineStyle: {
            width: 0.5,
            type: 'dotted',
          },
          showSymbol: false,
          hoverAnimation: false,
          data: data
        }],
      }

      data.shift()
      data.push(randomData())
      myChart1.setOption(option1)

      setInterval(function () {
        data.shift()
        data.push(randomData())
        myChart1.setOption(option1)
      }, 2000)
      window.addEventListener('resize',function() {
        myChart1.resize()
      })
    },

    drawLineChart2: function(){
      myChart2 = lineCharts.init(document.getElementById('chartLine2'),'walden')

      function randomData() {
        now = new Date(+now + 1000)
        value = Math.random()*100/10+50
        return {
          name: now.toString(),
          value: [
            now,
            Math.round(value)
          ]
        }
      }
      let data = []
      let now = new Date()
      let value = 0
      for (let i = 0; i < 300; i++) {
        data.push(randomData())
      }

      option2 = {
        title: this.option.title,
        tooltip: this.option.tooltip,
        grid: this.option.grid,
        xAxis: this.option.xAxis,
        yAxis: this.option.yAxis,
        series: [{
          name: '模拟数据',
          type: 'line',
          showSymbol: false,
          hoverAnimation: false,
          data: data
        }]
      }

      data.shift()
      data.push(randomData())
      myChart2.setOption(option2)

      setInterval(function () {
        data.shift()
        data.push(randomData())
        myChart2.setOption(option2)
      }, 2000)
      window.addEventListener('resize',function() {
        myChart2.resize()
      })
    },

  }
}
</script>
