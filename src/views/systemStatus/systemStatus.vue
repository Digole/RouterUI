<template>
  <section>
    <div class="line_02"><span></span></div>
    <div id="top">
      <el-row :gutter="10">
        <el-col :md="10" :lg="10" :xl="10">
          <div class="topLeft">
            <div class="topLeftLeft">
              <p style="padding-top: 20px;">OpenRT</p>
              <p style="font-size: 30px; margin: 10px 20px;">未配置</p>
              <p>外网</p>
              <p>已运行:</p>
            </div>
            <div class="topLeftText">
              <p>速率状态</p>
              <div class="rate">
                <p>上行:</p><p style="font-size: 18px;">{{this.$store.state.systemInfo[0].CPURate}}</p><p>B/s</p>
              </div>
              <div class="rate">
                <p>上行:</p><p style="font-size: 18px;">{{this.$store.state.systemInfo[0].CPURate}}</p><p>B/s</p>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :md="14" :lg="14" :xl="14">
          <div class="topRight">
            <p>连接状态</p>
            <div class="topRightBottom">
              <div class="topRightBottomText">
                <p style="font-size: 30px;">1</p>
                <p>终端在线</p>
              </div>
              <div class="topRightBottomText">
                <p style="font-size: 30px">0</p>
                <p>终端在线</p>
              </div>
              <div class="topRightBottomText">
                <p style="font-size: 30px">0</p>
                <p>终端在线</p>
              </div>
              <div class="topRightBottomText">
                <p style="font-size: 30px">0</p>
                <p>终端在线</p>
              </div>

            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <div id="middle">
      <el-row :gutter="10">
        <el-col :md="14" :lg="14" :xl="14">
          <div class="middleLeft">
            <div class="middleLeftTop">
              <div>
                <p>接口状态</p>
              </div>
              <div class="middleLeftTopText">
                <div class="middleLeftTopTextChild">
                  <p style="font-size: 30px">1</p>
                  <p>Kbps接入带宽</p>
                </div>
                <div class="middleLeftTopTextChild">
                  <p style="font-size: 30px">0</p>
                  <p>WAN已启用</p>
                </div>
                <div class="middleLeftTopTextChild">
                  <p style="font-size: 30px">0</p>
                  <p>LAN已启用</p>
                </div>
                <div class="middleLeftTopTextChild">
                  <p style="font-size: 30px">0</p>
                  <p>DHCP池剩余</p>
                </div>
              </div>
            </div>
            <div class="middleBottom">
              <div class="router">
                <div v-for="(item, index) in ports" class="port">
                  <div>
                    <el-tooltip class="item" effect="light">
                      <img style="width: 50px; height: 50px; border-radius: 5px;" :src=selectUrl(item.category) />
                      <div slot="content" class="tooltip-content">
                        <p>en{{index}}</p>
                        <el-form label-position="left" size="mini">
                          <el-form-item label="连接状态:" :label-width="tooltipLabelWidth" style="margin: 0;">
                            {{ports[index].category}}
                          </el-form-item>
                          <el-form-item label="LAN IP:" :label-width="tooltipLabelWidth" style="margin: 0;">

                          </el-form-item>
                          <el-form-item label="子网掩码:" :label-width="tooltipLabelWidth">

                          </el-form-item>
                        </el-form>
                        <el-form label-position="left" size="small">
                          <el-form-item label="绑定设备:" :label-width="tooltipLabelWidth" style="margin: 0;">

                          </el-form-item>
                          <el-form-item label="MAC地址:" :label-width="tooltipLabelWidth" style="margin: 0;">

                          </el-form-item>
                          <el-form-item label="网卡速率:" :label-width="tooltipLabelWidth" style="margin: 0;">

                          </el-form-item>
                        </el-form>
                      </div>
                    </el-tooltip>
                    <div class="textArea">
                      <p class="text">en{{index}}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-col>

        <el-col :md="10" :lg="10" :xl="10">
          <div class="middleRight">
            <div style="height: 20%;">
              <p style="float: left;">带宽平均使用率</p>
              <el-select v-model="value" placeholder="请选择" size="mini" style="width: 100px; float: right; margin: 10px;">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <el-select v-model="value" placeholder="请选择" size="mini" style="width: 100px; float: right; margin: 10px;">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div>
              <span style="font-size: 30px; margin-left: 20px;">0</span><span>%</span>
            </div>

          </div>
        </el-col>

      </el-row>
    </div>

    <div id="bottom">
      <el-row :gutter="10">
        <el-col :md="8" :lg="8" :xl="8">
          <div class="bottomLeft">
            <div style="width:100%; margin: 0; display: inline-block;">
              <div style="float:left;">
                <p>协议流量分布</p>
              </div>
              <div style="float: right; margin: 10px 10px; width: 100px;">
                <el-select v-model="value" placeholder="请选择" size="mini">
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
          </div>
        </el-col>
        <el-col :md="16" :lg="16" :xl="16">
          <div class="bottomRight">
            <div id="chartLine1" style="width:100%; height:160px; margin-top: 10px"></div>
            <div id="chartLine2" style="width:100%; height:160px; margin-top: 10px"></div>
          </div>
        </el-col>
      </el-row>
    </div>
  </section>
</template>

<script>
  import systemStatus from 'echarts';
  import { getPorts } from '../../api/api';
  require('echarts/theme/walden');

  export default {
    name: "systemStatus",
    data() {
      return {
        ports: [{
          "id":"0", "category":"", imgUrl:"static/port3.png"
        }],
        options: [{
          value:'选项1',
          label:'近30分钟'
        },{
          value:'选项2',
          label:'近1小时'
        },
          {
            value:'选项3',
            label:'近1天'
          }
        ],
        value: '',
        tooltipLabelWidth: '80px',
      }
    },

    methods: {
      selectUrl(para) {
        if(para == "空闲")
        {
          return "static/port2.png"
        }
        else{
          return "static/port3.png"
        }
      },

      getPortsInfo: function() {
        getPorts().then((res) => {
          this.ports = res.data.ports;
          console.log(res);
          console.log(this.ports);
        });
      },

      drawLineChart1: function(){
        let myChart = systemStatus.init(document.getElementById('chartLine1'),"walden");

        function randomData() {
          now = new Date(+now + 1000);
          //console.log("now "+now+"and "+now.toTimeString());
          value = Math.random()*100;
          return {
            name: now.toString(),
            value: [
              //[now.getHours(), now.getMinutes(), now.getSeconds()].join(':'),
              now,
              Math.round(value)
            ]
          }
        }

        let data = [];
        let now = new Date();
        let value = 0;
        for (let i = 0; i < 300; i++) {
          data.push(randomData());
        }

        let option = {
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
            data: data
          }],
        };

        data.shift();
        data.push(randomData());
        myChart.setOption(option);

        setInterval(function () {
          data.shift();
          data.push(randomData());
          myChart.setOption(option);
        }, 2000);
        window.addEventListener("resize",function() {
          myChart.resize();
        });
      },

      drawLineChart2: function(){
        let myChart = systemStatus.init(document.getElementById('chartLine2'),"walden");

        function randomData() {
          now = new Date(+now + 1000);
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
        for (let i = 0; i < 300; i++) {
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

        data.shift();
        data.push(randomData());
        myChart.setOption(option);

        setInterval(function () {
          data.shift();
          data.push(randomData());
          myChart.setOption(option);
        }, 2000);
        window.addEventListener("resize",function() {
          myChart.resize();
        });
      },

      drawPieChart: function(){
        let myChart = systemStatus.init(document.getElementById('chartPie'),"walden");

        let option = {
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
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
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '30',
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
        };
        myChart.setOption(option);

        window.addEventListener("resize",function() {
          myChart.resize();
        });
      },

      drawCharts() {
        this.drawLineChart1();
        this.drawLineChart2();
        this.drawPieChart();
      },
    },

    mounted: function () {
      this.drawCharts();
      this.getPortsInfo();
    },
  }
</script>

<style scoped lang="scss">
  p{
    color: grey;
  }
  .topLeft {
    height: 150px;
    display: flex;
    border: 1px solid lightgrey;
    .topLeftLeft {
      width: 60%;
      background-color: lightgrey;
      p {
        margin: auto 20px;
        color: white;
      }
    }
    .topLeftText{
      padding-left: 20px;
      width: 40%;
      .rate{
        p{
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
    font-family:Roboto-Thin;
    .topRightBottom {
      display: flex;
      .topRightBottomText {
        width: 25%;
        p{
          margin: 10px auto;
        }
      }
    }
  }

  .middleLeft {
    margin-top: 20px;
    height: 240px;
    border: 1px solid lightgrey;
    font-family:Roboto-Thin;
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
    font-family:Roboto-Thin;
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
    .bottomLeft{
      height: 330px;
      width: 100%;
    }
  }

  .router{
    border: 1px solid lightgrey;
    border-radius: 10px;
    margin: 10px 20px;
    background-color: lightgoldenrodyellow;
    text-align: center;
    .port{
      width: 50px;
      height:50px;
      border-radius: 3px;
      background-color: grey;
      display: inline-flex;
      text-align: center;
      margin: 10px 10px;
    }
    @font-face{
      font-family:Roboto-Thin;
      src: url("../../assets/font/Roboto-Thin.ttf");
    }
  }

</style>

