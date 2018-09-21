<template>
  <section>
    <div class="line_02">
      <span></span>
    </div>
    <div id="top">
      <el-row :gutter="10">
        <!--第一行左边-->
        <el-col :md="10" :lg="10" :xl="10">
          <div class="topLeft">
            <div id = "statusColor" class="topLeftLeft2">
              <p style="padding-top: 20px;">OpenRT</p><br/>
              <p><span style="font-size: 30px; margin: 10px 20px 10px 0px;">{{this.title}}</span>{{$t('systemStatus.top.subtitle')}}</p><br/>
             <p>{{$t('systemStatus.top.subtitle2')}}{{this.MonitorInfo.time[0]}}{{$t('systemStatus.top.day')}}{{this.MonitorInfo.time[1]}}{{$t('systemStatus.top.hour')}}{{this.MonitorInfo.time[2]}}{{$t('systemStatus.top.min')}}{{this.MonitorInfo.time[3]}}{{$t('systemStatus.top.sec')}}</p>
              
            </div>
            <div class="topLeftText">
              <p>{{$t('systemStatus.top.rate')}}</p>
              <div class="rate">
                <p>{{$t('systemStatus.top.upstream')}}:{{this.data.up}}</p>
                <p style="font-size: 18px;"></p>
                <p>B/s</p>
              </div>
              <div class="rate">
                <p>{{$t('systemStatus.top.downstream')}}:{{this.data.down}}</p>
                <p style="font-size: 18px;"></p>
                <p>B/s</p>
              </div>
            </div>
          </div>
        </el-col>
        <!--第一行右边-->
        <el-col :md="14" :lg="14" :xl="14">
          <div class="topRight">
            <p>{{$t('systemStatus.top.status')}}</p>
            <div class="topRightBottom">
              <div class="topRightBottomText">
                <p style="font-size: 36px;">{{this.terminalNum}}</p>
                <p>{{$t('systemStatus.top.terminal')}}</p>
              </div>
            

            </div>
          </div>
        </el-col>
      </el-row>
    </div>
<!--第二行左边上面-->
    <div id="middle">
      <el-row :gutter="10">
        <el-col :md="14" :lg="14" :xl="14">
          <div class="middleLeft">
            <div class="middleLeftTop">
              <div>
                <p>{{$t('systemStatus.middle.status')}}</p>
              </div>
              <div class="middleLeftTopText">
                <div class="middleLeftTopTextChild">
                  <p style="font-size: 36px">1</p>
                  <p>Kbps{{$t('systemStatus.middle.bandWidth')}}</p>
                </div>
                <div class="middleLeftTopTextChild">
                  <p style="font-size: 36px">{{wanNumber}}</p>
                  <p>{{$t('systemStatus.middle.WAN')}}</p>
                </div>
                <div class="middleLeftTopTextChild">
                  <p style="font-size: 36px">{{lanNumber}}</p>
                  <p>{{$t('systemStatus.middle.LAN')}}</p>
                </div>
                <div class="middleLeftTopTextChild">
                  <p style="font-size: 36px">0</p>
                  <p>{{$t('systemStatus.middle.DHCP')}}</p>
                </div>
              </div>
            </div>
            <!--第二行左边下面-->
            <div class="middleBottom">
              <div class="router">
                <div v-for="(item, index) in ports" class="port" @click="pushToINEX" :key="index">
                  <div>
                    <el-tooltip class="item" effect="light">
                      <img style="width: 50px; height: 50px; border-radius: 5px;" :src=selectUrl(item.linkstatus) />
                      <div slot="content" class="tooltip-content">
                        <p>{{item.webname}}</p>
                        <el-form label-position="left" size="mini">
                          <el-form-item label="连接状态:" :label-width="tooltipLabelWidth" style="margin: 0;">
                            {{ports[index].linkstatus}}
                          </el-form-item>
                          <el-form-item label="LAN IP:" :label-width="tooltipLabelWidth" style="margin: 0;">
                            {{ports[index].ip}}
                          </el-form-item>
                          <el-form-item label="子网掩码:" :label-width="tooltipLabelWidth">
                            {{ports[index].netmask}}
                          </el-form-item>
                        </el-form>
                        <el-form label-position="left" size="small">
                          <el-form-item label="设备名称:" :label-width="tooltipLabelWidth" style="margin: 0;">
                            {{ports[index].devname}}
                          </el-form-item>
                          <el-form-item label="MAC地址:" :label-width="tooltipLabelWidth" style="margin: 0;">
                            {{ports[index].mac}}
                          </el-form-item>
                          <el-form-item label="网卡速率:" :label-width="tooltipLabelWidth" style="margin: 0;">
                            {{ports[index].speed}}
                          </el-form-item>
                        </el-form>
                      </div>
                    </el-tooltip>
                    <div class="textArea">
                      <p class="text">
                        <span v-show="item.category !== '空闲'">
                          <svg class="icon">
                            <use :xlink:href=selectIcon(item.category)></use>
                          </svg>
                        </span>
                        en{{index}}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-col>
<!--第二行右边-->
        <el-col :md="10" :lg="10" :xl="10">
          <div class="middleRight">
            <div style="height: 20%;">
              <p style="float: left;">{{$t('systemStatus.middle.average')}}</p>
            </div>
            <div>
              <span style="font-size: 36px; margin-left: 20px;">0</span>
              <span>%</span>
            </div>

          </div>
        </el-col>

      </el-row>
    </div>
<!--第三行-->
    <div id="bottom">
      <el-row :gutter="10">
        <el-col :md="8" :lg="8" :xl="8">
          <!-- <div class="bottomLeft">
            <div style="width:100%; margin: 0; display: inline-block;">
              <div style="float:left;">
                <p style="margin-left: 20px;">{{$t('systemStatus.bottom.chartsTitle')}}</p>
              </div>
              <div style="float: right; margin: 10px 10px; width: 100px;">
                <el-select v-model="value" placeholder="请选择" size="mini" value="">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div id="chartPie" style="width:100%; height:300px; margin: 0"></div>
          </div> -->
          <pie-chart class="bottomLeft"></pie-chart>
        </el-col>
        <el-col :md="16" :lg="16" :xl="16">
          <div class="bottomRight">
            <div id="chartLine1" style="width:100%; height:160px; margin-top: 10px"></div> 
             <div id="chartLine2" style="width:100%; height:160px; margin-top: 10px"></div> 
            <line-chart></line-chart>
          </div>
        </el-col>
      </el-row>
    </div>
  </section>
</template>

<script>
import systemStatus from 'echarts'
import { getPorts, getMonitorInfo, getExtranetStatus } from '../../api/api'
import { pieChart, lineChart } from './components'
import { conversion } from '../../utils/rateUnitExchange.js'
// import { conversion } from '../../utils/rateUnitExchange.js'
require('echarts/theme/walden')

let option = {}
let myPieChart
let myChart1
let option1 = {}
let myChart2
let option2 = {}

export default {
  name: 'systemStatus',
  data() {
    return {
      // n: 0,
      title: '',
      MonitorInfo: {            // 外网连接状态
        status: '',
        time: ''
      },

      terminalNum: '',         // 连接终端数量
      data: {                  // 上下行速率以及相关信息
        up: '',
        down: '',
        upStorage: '',
        downStorage: '',
        cpu: '',
        memory: '',
        userNum: ''
      },
      ports: [
        {
          id: '0',
          category: '',
          imgUrl: 'static/port3.png'
        }
      ],
      options: [
        {
          value: '选项1',
          label: '近30分钟'
        },
        {
          value: '选项2',
          label: '近1小时'
        },
        {
          value: '选项3',
          label: '近1天'
        }
      ],
      value: '',
      tooltipLabelWidth: '80px'
    }
  },
  components: {
    pieChart,
    lineChart
  },
  computed: {
    lanNumber: function() {
      let i = 0
      let j = 0
      for (i; i < this.ports.length; i++) {
        if (this.ports[i].function === 'lan') {
          j++
        }
      }
      return j
      // return conversion(j)
    },
    wanNumber: function() {
      let i = 0
      let j = 0
      for (i; i < this.ports.length; i++) {
        if (this.ports[i].function === 'wan') {
          j++
        }
      }
      return j
      // return conversion(j)
    },
    'item.linkstatus': function(para) {
      if (para === 'off') {
        return 'static/port2.png'
      } else {
        return 'static/port3.png'
      }
    }
  },
  watch: {
    '$store.state.app.language': function() {
      console.log(this.$store.state.app.language)
      this.translate()
    }
  },

  methods: {
    getNetInfo () {                                   // 获取外网连接信息
      getExtranetStatus().then(res => {
        if (res.data.code === 200) {
          this.MonitorInfo.status = res.data.status
          this.MonitorInfo.time = res.data.time.split(':')

          let obj = document.getElementById('statusColor')
          if (this.MonitorInfo.status === 'failed') {
            obj.className = 'topLeftLeft2'
            if (this.$store.state.app.language === 'en') {
              this.title = 'Disconnected'
            } else { this.title = '未连接' }
            console.log('title:' + this.title)
          } else {
            obj.className = 'topLeftLeft1'
            if (this.$store.state.app.language === 'en') {
              this.title = 'Connected'
            } else { this.title = '已连接' }
          }

          // this.MonitorInfo.time[3] = parseInt(this.MonitorInfo.time[3]) + this.n
          // this.n++
          // console.log(this.MonitorInfo.time[3])
          setTimeout(() => {
            this.getNetInfo()
          }, 1000)
          // for (let i = 0; i < 60; i++) {
          // console.log(i)
          // this.MonitorInfo.time[3] = parseInt(this.MonitorInfo.time[3]) + 1
          // console.log(this.MonitorInfo.time[3])
          // }
        }
      })
    },

    getTerminalInfo() {                                     // 获取终端数量
      let para = Object.assign({}, this.form)
      para.type = 1
      para.page = this.currentPage
      getMonitorInfo(para)
        .then((res) => {
          if (res.data.code === 200) {
            if (res.data.data.length !== 0) {
              this.terminalNum = res.data.total
              console.log(this.terminalNum)
            }
          }
        })
        .catch(error => {
          console.log(error)
        },
        setTimeout(() => {
          this.getTerminalInfo()
        }, 3000)
        )
    },
    getInfo() {                                          // 获取上下行速率
      this.update()
      setInterval(() => {
        this.update()
        this.$store.dispatch('pushSystemData', this.data)
      }, 5000)
    },

    async update() {
      let para = {}
      para.page = 1
      para.type = 5
      await getMonitorInfo(para)
        .then(res => {
          if (res.data.code === 200) {
            this.data.upStorage = res.data.data[0].recv_rate
            this.data.downStorage = res.data.data[0].send_rate
            this.data.up = conversion(res.data.data[0].recv_rate)
            this.data.down = conversion(res.data.data[0].send_rate)
            // console.log(this.data.up)
            // this.$store.dispatch('pushSystemData', this.data)
          }
        })
        .catch(error => {
          console.log(error)
        })
      let para1 = {}
      para1.type = 6
      await getMonitorInfo(para1)
        .then(res => {
          if (res.data.code === 200) {
            this.data.cpu = (res.data.cpu_usage).toFixed(0)
            this.data.memory = (res.data.memory_usage).toFixed(0)
            this.data.userNum = res.data.online_users
          }
        })
        .catch(error => {
          console.log(error)
        })
      // this.$store.dispatch('pushSystemData', this.data)
    },
    // 选择LAN,WAN口对应图标
    selectUrl(para) {
      // if(para === "空闲")
      if (para === 'off') {
        return 'static/port2.png'
      } else {
        return 'static/port3.png'
      }
    },

    selectIcon(para) {
      if (para === 'WAN') {
        return '#icon-wan'
      } else if (para === 'LAN') {
        return '#icon-pc'
      } else {
        return '#'
      }
    },

    getPortsInfo: function() {
      // getPorts().then((res) => {
      //   this.ports = res.data.ports;
      //   console.log(res);
      //   console.log(this.ports);
      // });

      getPorts().then(res => {
        let checked = res.data.code
        if (checked !== 200) {
          this.$store.dispatch('setAdaptive', checked)
          this.$router.push('ports')
        }

        this.ports = res.data.interfaces
      })
      setTimeout(() => {
        this.getPortsInfo()
      }, 3000)
    },

    pushToINEX: function() {
      this.$router.push({ path: '../INEX_network' })
    },

    drawLineChart1: function() {
      myChart1 = systemStatus.init(
        document.getElementById('chartLine1'),
        'walden'
      )

      function randomData() {
        now = new Date(+now + 1000)
        // console.log("now "+now+"and "+now.toTimeString());
        value = Math.random() * 100 / 10 + 50
        return {
          name: now.toString(),
          value: [
            // [now.getHours(), now.getMinutes(), now.getSeconds()].join(':'),
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
        title: {
          text: '近5分钟上下行速率',
          subtext: '上行速率',
          textStyle: {
            fontWeight: 'normal',
            fontSize: 14
          }
        },
        tooltip: {
          trigger: 'axis',
          formatter: function(params) {
            params = params[0]
            let date = new Date(params.name)
            return (
              date.getHours() +
              ':' +
              date.getMinutes() +
              ' : ' +
              params.value[1]
            )
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
              color: '#CD0000'
            }
          }
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '0%'],
          splitLine: {
            show: false
          }
        },
        series: [
          {
            name: '模拟数据',
            type: 'line',
            lineStyle: {
              width: 0.5,
              type: 'dotted'
            },
            showSymbol: false,
            hoverAnimation: false,
            data: data
          }
        ]
      }

      data.shift()
      data.push(randomData())
      myChart1.setOption(option1)

      setInterval(function() {
        data.shift()
        data.push(randomData())
        myChart1.setOption(option1)
      }, 2000)
      window.addEventListener('resize', function() {
        myChart1.resize()
      })
    },

    drawLineChart2: function() {
      myChart2 = systemStatus.init(
        document.getElementById('chartLine2'),
        'walden'
      )

      function randomData() {
        now = new Date(+now + 1000)
        value = Math.random() * 100 / 10 + 50
        return {
          name: now.toString(),
          value: [now, Math.round(value)]
        }
      }
      let data = []
      let now = new Date()
      let value = 0
      for (let i = 0; i < 300; i++) {
        data.push(randomData())
      }

      option2 = {
        title: {
          subtext: '下行速率'
        },
        tooltip: {
          trigger: 'axis',
          formatter: function(params) {
            params = params[0]
            let date = new Date(params.name)
            return (
              date.getHours() +
              ':' +
              date.getMinutes() +
              ' : ' +
              params.value[1]
            )
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
              color: '#7CCD7C'
            }
          }
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '0%'],
          splitLine: {
            show: false
          }
        },
        series: [
          {
            name: '模拟数据',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            data: data
          }
        ]
      }

      data.shift()
      data.push(randomData())
      myChart2.setOption(option2)

      setInterval(function() {
        data.shift()
        data.push(randomData())
        myChart2.setOption(option2)
      }, 2000)
      window.addEventListener('resize', function() {
        myChart2.resize()
      })
    },

    drawPieChart: function() {
      myPieChart = systemStatus.init(
        document.getElementById('chartPie'),
        'walden'
      )

      option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          x: 'left',
          data: ['HTTP协议', '网络视频', '网络游戏', '网络下载', '文件传输']
        },
        series: [
          {
            name: '协议流量分布',
            type: 'pie',
            radius: ['70%', '80%'],
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
            data: [
              { value: 335, name: 'HTTP协议' },
              { value: 310, name: '网络视频' },
              { value: 234, name: '网络游戏' },
              { value: 135, name: '网络下载' },
              { value: 1548, name: '文件传输' }
            ]
          }
        ]
      }

      myPieChart.setOption(option)

      window.addEventListener('resize', function() {
        myPieChart.resize()
      })
    },

    drawCharts() {
      this.drawLineChart1()
      this.drawLineChart2()
      this.drawPieChart()
    },

    translate() {
      if (this.$store.state.app.language === 'en') {
        if (this.MonitorInfo.status === 'failed') {
          this.title = 'Disconnected'
        } else { this.title = 'Connected' }
        option.legend.data = [
          'HTTP',
          'Vedio',
          'Game',
          'Download',
          'Transmission'
        ]
        option.series[0].name = 'Protocol traffic distribution'
        option.series[0].data = [
          { value: 335, name: 'HTTP' },
          { value: 310, name: 'Vedio' },
          { value: 234, name: 'Game' },
          { value: 135, name: 'Download' },
          { value: 1548, name: 'Transmission' }
        ]

        option1.title.text = 'Up/Downlink Rate'
        option1.title.subtext = 'Uplink Rate'

        option2.title.subtext = 'Downlink Rate'
      }
      if (this.$store.state.app.language === 'zh') {
        if (this.MonitorInfo.status === 'failed') {
          this.title = '未连接'
        } else { this.title = '已连接' }
        option.legend.data = [
          'HTTP协议',
          '网络视频',
          '网络游戏',
          '网络下载',
          '文件传输'
        ]
        option.series[0].name = '流量协议分布'
        option.series[0].data = [
          { value: 335, name: 'HTTP协议' },
          { value: 310, name: '网络视频' },
          { value: 234, name: '网络游戏' },
          { value: 135, name: '网络下载' },
          { value: 1548, name: '文件传输' }
        ]

        option1.title.text = '上下行速率'
        option1.title.subtext = '上行速率'

        option2.title.subtext = '下行速率'
      }
      myPieChart.setOption(option)
      myChart1.setOption(option1)
      myChart2.setOption(option2)
    }
  },

  mounted: function() {
    // this.drawCharts()
    this.getPortsInfo()
    this.getInfo()
    this.getTerminalInfo()
    this.getNetInfo()
  }

}
</script>

<style scoped lang="scss">
p {
  color: grey;
}
.topLeft {
  height: 150px;
  display: flex;
  border: 1px solid lightgrey;
  .topLeftLeft2 {
    width: 60%;
    background-color: lightgrey;
    
    p {
      margin: auto 20px;
      color: white;
    }
  }
   .topLeftLeft1 {
    width: 60%;
    
    background-color: #98FB98  ;
    p {
      margin: auto 20px;
      color: white;
    }
  }
  .topLeftText {
    padding-left: 20px;
    width: 40%;
    .rate {
      p {
        margin: 10px auto;
        display: inline-block;
      }
    }
  }
}

.topRight {
  height: 150px;
  border: 1px solid lightgrey;
  padding-left: 20px;
  font-family: Roboto-Thin;
  .topRightBottom {
    display: flex;
    .topRightBottomText {
      width: 25%;
      p {
        margin: 10px auto;
      }
    }
  }
}

.middleLeft {
  margin-top: 20px;
  height: 240px;
  border: 1px solid lightgrey;
  font-family: Roboto-Thin;
  .middleLeftTop {
    height: 100px;
    padding-left: 20px;
    .middleLeftTopText {
      display: flex;
      .middleLeftTopTextChild {
        width: 25%;
        p {
          margin: 0 auto;
        }
      }
    }
  }
}
.middleRight {
  margin-top: 20px;
  height: 240px;
  border: 1px solid lightgrey;
  font-family: Roboto-Thin;
  p {
    margin-left: 20px;
  }
  span {
    margin-left: 0;
    color: grey;
  }
}

#bottom {
  margin-top: 20px;
  .bottomLeft {
    height: 350px;
    width: 100%;
    border: 1px solid lightgrey;
  }
  .bottomRight {
    border: 1px solid lightgrey;
    height: 350px;
  }
}

.router {
  border: 1px solid lightgrey;
  border-radius: 10px;
  margin: 10px 20px;
  background-color: lightgoldenrodyellow;
  text-align: center;
  .port {
    width: 50px;
    height: 50px;
    border-radius: 3px;
    background-color: grey;
    display: inline-flex;
    text-align: center;
    margin: 10px 10px;
    img:hover {
      cursor: pointer;
    }
  }
}

.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

@font-face {
  font-family: Roboto-Thin;
  src: url("../../assets/font/Roboto-Thin.ttf");
}
</style>

