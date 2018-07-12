<template>
  <section>
    <div>
      <div class="line_02"><span>{{$t('NAT.dividingLine.title1')}}</span></div>
    </div>
    <!--router页面-->
    <div class="top">
      <div class="wholeRouter">

        <!--power button-->
        <div class="power">
          <div class="powerButton">
            <img style="width: 60px; height: 50px; border-radius: 5px;" :src="powerButton" />
            <div class="textArea">
              <p class="text">调试</p>
            </div>
          </div>
        </div>

        <div class="router">
          <div v-for="(item, index) in ports" class="port" :key="index" @click="dialog(index)">
            <div>
              <el-tooltip class="item" effect="light">
                <img style="width: 60px; height: 50px; border-radius: 5px;" :src=selectUrl(item.linkstatus) />
                <div slot="content" class="tooltip-content">
                  <h3></h3>
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
                  <el-form label-position="left" size="mini">
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
                  <span v-show="item.function !== 'NORMAL'"><svg class="icon"><use :xlink:href=selectIcon(item.function)></use></svg></span>
                  {{ports[index].enname}}</p>
              </div>
            </div>
          </div>
        </div>

        <div v-if="checked !== '200'" class="mask">
        <!--<div v-if="false" class="mask">-->
          <!--<div class="mask">-->
          <el-button class="button" type="primary" @click="sortingHandle">{{$t('NAT.adaptive.maskTip')}}</el-button>
        </div>
      </div>

      <div class="tips">
        <el-checkbox class="checkbox" :label="$t('NAT.selectFunction.TCP')" v-model="TCP" @change="handleTCPChange" name="type"></el-checkbox><br>
        <el-checkbox class="checkbox" :label="$t('NAT.selectFunction.UDP')" v-model="UDP" @change="handleUDPChange" name="type"></el-checkbox><br>
        <el-checkbox class="checkbox" :label="$t('NAT.selectFunction.ICMP')" v-model="ICMP" @change="handleICMPChange" name="type"></el-checkbox>
      </div>
    </div>

    <div>
      <div class="line_02"><span>{{$t('NAT.dividingLine.title2')}}</span></div>
    </div>

    <!--随机端口折线图-->
    <div class="echarts">
      <div id="chartLine1" style="width:100%; height:200px; margin-top: 10px"></div>
    </div>

    <div>
      <div class="line_02"><span>{{$t('NAT.dividingLine.title3')}}</span></div>
    </div>
    <!--网络别名工具栏和表格-->
    <div class="table">
      <el-col :span="24" class="toolbar" style="padding-bottom: 0;">
        <el-form :inline="true">
          <el-form-item>
            <el-button type="primary" @click="addAliasHandle">{{$t('operation.add')}}</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="danger" @click="delAliasHandle()" :disabled="this.aliasSelections.length===0">{{$t('operation.delete')}}</el-button>
          </el-form-item>
          <el-pagination layout="prev, pager, next" @current-change="aliasHandleCurrentChange" :page-size="5" :total=aliasTotal style="float:right;">
          </el-pagination>
        </el-form>
      </el-col>


      <!--网络别名表格-->
      <el-table :data="alias" @selection-change="aliasSelChange" style="width: 100%" :header-cell-style="headerStyle">
        <el-table-column type="selection" min-width="30">
        </el-table-column>
        <el-table-column type="index" width="60">
        </el-table-column>
        <el-table-column prop="aliasip"  :label="$t('NAT.alias.aliasAddress')" min-width="120">
        </el-table-column>
        <el-table-column prop="lanstart"  :label="$t('NAT.alias.initialAddress')" min-width="120">
        </el-table-column>
        <el-table-column prop="lanend"  :label="$t('NAT.alias.endAddress')" min-width="120">
        </el-table-column>
        <el-table-column :label="$t('operation.operation')" min-width="120">
          <template slot-scope="scope">
            <!--<el-button size="small" @click="handleAliasEdit(scope.$index, scope.row)">编辑</el-button>-->
            <el-button size="small" @click="signalDelAliasHandle(scope.$index, scope.row)">{{$t('operation.delete')}}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div>
      <div class="line_02"><span>{{$t('NAT.dividingLine.title4')}}</span></div>
    </div>
    <!--端口映射工具栏和表格-->
    <div class="table">
      <el-col :span="24" class="toolbar" style="padding-bottom: 0;">
        <el-form :inline="true">
          <el-form-item>
            <el-button type="primary" @click="addMappingHandle">{{$t('operation.add')}}</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="danger" @click="delMappingHandle()" :disabled="this.mappingSelections.length===0">{{$t('operation.delete')}}</el-button>
          </el-form-item>
          <el-pagination layout="prev, pager, next" @current-change="mappingHandleCurrentChange" :page-size="5" :total=mappingTotal style="float:right;">
          </el-pagination>
        </el-form>
      </el-col>


      <!--端口映射表格-->
      <el-table :data="mapping" @selection-change="mappingSelChange" style="width: 100%" :header-cell-style="headerStyle">
        <el-table-column type="selection" min-width="30">
        </el-table-column>
        <el-table-column type="index" width="60">
        </el-table-column>
        <el-table-column prop="assport"  :label="$t('NAT.mapping.assPort')" min-width="120">
        </el-table-column>
        <el-table-column prop="localport"  :label="$t('NAT.mapping.localPort')" min-width="120">
        </el-table-column>
        <el-table-column prop="ip"  :label="$t('NAT.mapping.IP')" min-width="120">
        </el-table-column>
        <el-table-column prop="ipcnt"  :label="$t('NAT.mapping.IPCnt')" min-width="120">
        </el-table-column>
        <el-table-column prop="proto"  :label="$t('NAT.mapping.proto')" min-width="120">
        </el-table-column>
        <el-table-column :label="$t('operation.operation')" min-width="120">
          <template slot-scope="scope">
            <!--<el-button  size="small" @click="handleMappingEdit(scope.$index, scope.row)">编辑</el-button>-->
            <el-button  size="small" @click="signalDelMappingHandle(scope.$index, scope.row)">{{$t('operation.delete')}}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!--新增网络别名-->
    <el-dialog title="新增网络别名" :visible.sync="aliasFormVisible" width="50%">
      <el-form ref="aliasForm" :model="aliasForm" label-position="left" size="small">
        <el-form-item prop="aliasip" :label="$t('NAT.alias.aliasAddress')" :label-width="formLabelWidth">
          <el-input v-model="aliasForm.aliasip"></el-input>
        </el-form-item>
        <el-form-item prop="lanstart" :label="$t('NAT.alias.initialAddress')" :label-width="formLabelWidth">
          <el-input v-model="aliasForm.lanstart"></el-input>
        </el-form-item>
        <el-form-item prop="lanend" :label="$t('NAT.alias.endAddress')" :label-width="formLabelWidth">
          <el-input v-model="aliasForm.lanend"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="danger" @click="aliasCancel">{{$t('operation.cancel')}}</el-button>
        <el-button type="primary" @click="addAliasSubmit">{{$t('operation.submit')}}</el-button>
      </div>
    </el-dialog>

    <!--编辑网络别名-->
    <el-dialog title="编辑网络别名" :visible.sync="aliasEditFormVisible" width="50%">
      <el-form :model="aliasForm" label-position="left" ref="aliasForm" size="small">
        <el-form-item prop="aliasip" :label="$t('NAT.alias.aliasAddress')" :label-width="formLabelWidth">
          <el-input v-model="aliasForm.aliasip"></el-input>
        </el-form-item>
        <el-form-item  prop="lanstart" :label="$t('NAT.alias.initialAddress')" :label-width="formLabelWidth">
          <el-input v-model="aliasForm.lanstart"></el-input>
        </el-form-item>
        <el-form-item prop="lanend" :label="$t('NAT.alias.endAddress')" :label-width="formLabelWidth">
          <el-input v-model="aliasForm.lanend"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="danger" @click="aliasCancel">{{$t('operation.cancel')}}</el-button>
        <el-button type="primary" @click.native="editAliasSubmit">{{$t('operation.submit')}}</el-button>
      </div>
    </el-dialog>

    <!--新增端口映射-->
    <el-dialog title="新增端口映射" :visible.sync="mappingFormVisible" width="50%">
      <el-form :model="mappingForm" label-position="left" ref="mappingForm" size="small">
        <el-form-item :label="$t('NAT.mapping.assPort')" :label-width="tooltipLabelWidth">
          <el-input v-model="mappingForm.assport"></el-input>
        </el-form-item>
        <el-form-item :label="$t('NAT.mapping.localPort')" :label-width="tooltipLabelWidth">
          <el-input v-model="mappingForm.localport"></el-input>
        </el-form-item>
        <el-form-item :label="$t('NAT.mapping.IP')" :label-width="tooltipLabelWidth">
          <el-input v-model="mappingForm.ip"></el-input>
        </el-form-item>
        <el-form-item :label="$t('NAT.mapping.IPCnt')" :label-width="tooltipLabelWidth">
          <el-input v-model="mappingForm.ipcnt"></el-input>
        </el-form-item>
        <el-form-item :label="$t('NAT.mapping.proto')" :label-width="tooltipLabelWidth">
          <el-select v-model="mappingForm.proto" :placeholder="$t('NAT.mapping.placeholder')" value="" style="width: 100%;">
            <el-option
              v-for="item in protoOption"
              :key="item.label"
              :label="item.label"
              :value="item.label">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="danger" @click="mappingCancel">{{$t('operation.cancel')}}</el-button>
        <el-button type="primary" @click="addMappingSubmit">{{$t('operation.submit')}}</el-button>
      </div>
    </el-dialog>

    <!--编辑端口映射-->
    <el-dialog title="编辑端口映射" :visible.sync="mappingEditFormVisible" width="50%">
      <el-form :model="mappingForm" label-position="left" ref="mappingForm" size="small">
        <el-form-item :label="$t('NAT.mapping.assPort')" :label-width="tooltipLabelWidth">
          <el-input v-model="mappingForm.assport"></el-input>
        </el-form-item>
        <el-form-item :label="$t('NAT.mapping.localPort')" :label-width="tooltipLabelWidth">
          <el-input v-model="mappingForm.localport"></el-input>
        </el-form-item>
        <el-form-item :label="$t('NAT.mapping.IP')" :label-width="tooltipLabelWidth">
          <el-input v-model="mappingForm.ip"></el-input>
        </el-form-item>
        <el-form-item :label="$t('NAT.mapping.IPCnt')" :label-width="tooltipLabelWidth">
          <el-input v-model="mappingForm.ipcnt"></el-input>
        </el-form-item>
        <el-form-item :label="$t('NAT.mapping.proto')" :label-width="tooltipLabelWidth">
          <el-select v-model="mappingForm.proto" placeholder="请选择" value="" style="width: 100%;">
            <el-option
              v-for="item in protoOption"
              :key="item.label"
              :label="item.label"
              :value="item.label">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="danger" @click="mappingCancel">取 消</el-button>
        <el-button type="primary" @click="editMappingSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <!--WAN,LAN outer dialogue-->
    <el-dialog title="LAN/WAN口设置" :visible.sync="dialogFormVisible" width="30%">
      <el-form :model="WANForm" label-position="left" size="small">
        <el-form-item label="选择功能" :label-width="formLabelWidth" v-loading="WANLANLoading">
          <el-select v-model="WANForm.use" placeholder="请选择内外网">
            <el-option :disabled="this.lanLimit <= this.lanCount" label="LAN（内网）" value="LAN"></el-option>
            <el-option :disabled="this.wanLimit <= this.wanCount" label="WAN（外网）" value="WAN"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <p v-if="this.lanLimit <= this.lanCount && !WANLANLoading" style="color: red;">LAN口数量到达上限</p>
      <p v-if="this.wanLimit <= this.wanCount && !WANLANLoading" style="color: red;">WAN口数量到达上限</p>
      <div slot="footer" class="dialog-footer">
        <el-button :disabled="unbindEnable" type="danger" @click="unbind">解 绑</el-button>
        <el-button :disabled="WANForm.use === ''" type="primary" @click="WANLANSubmit">提 交</el-button>
      </div>
    </el-dialog>

    <!--端口自适应-->
    <el-dialog title="网口定位" :visible.sync="sortingVisible" width="50%">

      <div>
        <div class="wholeRouterInDialog">
          <!--power button-->
          <div class="power">
            <div class="powerButton">
              <img style="width: 60px; height: 50px; border-radius: 5px;" :src="powerButton" />
              <div class="textArea">
                <p class="text">{{$t('NAT.adaptive.text')}}</p>
              </div>
            </div>
          </div>

          <div class="router">
            <div v-for="(item, index) in ports" :key="index" class="port">
              <img style="width: 60px; height: 50px; border-radius: 5px;" src="static/port2.png" />
              <div :class="{ 'triangular': index === portsName.index }"></div>
              <div class="textArea">
                <p class="text" v-if ="index < portsName.index" >
                  {{localName[index]}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!--outer dialog-->
      <div style="margin: 10px 0;">
        <span>{{tip1}}</span>
        <span style="font-size: 200%; color: red;">{{this.portsName.index+1}}</span>
        <span>{{tip2}}</span>
      </div>

      <div style="display: flex; align-items: center;" v-loading="sortLoading">
        <el-form :model="portsName" label-position="left" ref="portsName" size="small">
          <el-form-item :label="$t('NAT.adaptive.portsNameTip')" :label-width="tooltipLabelWidth" style="margin: 0 20px 0 0">
            <el-input v-model="portsName.name" :placeholder="name()"></el-input>
          </el-form-item>
        </el-form>
        <div>{{$t('NAT.adaptive.tipText')}}</div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="danger" @click="sortingCancel">{{$t('operation.cancel')}}</el-button>
        <el-button v-if="portsName.index < ports.length-1" type="primary" :disabled="sortLoading" @click="sortingNextStep">{{$t('operation.next')}}</el-button>
        <el-button v-else type="primary" :disabled="sortLoading" @click="sortingFinish">{{$t('operation.complete')}}</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
  import {
    addAlias,
    addMapping,
    sendFragment,
    getFragmentInfo,
    delAlias,
    delMapping,
    editAlias,
    editMapping,
    getAlias,
    getMapping,
    getPorts,
    sendSorting,
    sendWANLAN,
    sortingCancel,
    getUsage
  } from '../../api/api'
import NAT from 'echarts'

require('echarts/theme/walden')

let stopSignal1, stopSignal2, stopSignal3, stopSignal4


export default {
    name: 'NAT',

    data() {
      return{
        aliasFormVisible: false,              //网络别名添加表格显示控制
        aliasEditFormVisible: false,          //网络别名编辑表格显示控制
        mappingFormVisible: false,            //端口映射添加表格显示控制
        mappingEditFormVisible: false,        //端口映射编辑表格显示控制
        dialogFormVisible: false,             //LAN,WAN设置
        sortingVisible: false,                //端口自适应排序显示控制

        aliasPage: 1,
        aliasTotal: 0,
        mappingPage: 1,
        mappingTotal: 0,

        form: {
          number: '',                     //端口编号，唯一，通过index确认端口
          use: '',                        //选择功能LAN/WAN
          IP:'',
          mask:'',                        //子网掩码
          gateway:'',                     //网关
          mode:'1',                       //工作模式
          rate:'1',                       //网卡速率 lan
          control:'',                     //lan互访控制
          accessMethod: '1',              //接入方式
          primaryDNS:'',                  //首选DNS
          secondaryDNS:'',                //备选DNS
          status:'未连接'                 //连接状态，ASDL使用该属性
        },

        WANForm: {
          index: '',                     //端口编号，唯一，通过index确认端口
          use: '',                        //选择功能LAN/WAN
          handle: '',                      //添加为1，解绑为0
        },

        aliasForm:{
          aliasip: '',                //别名地址
          lanstart: '',              //起始地址
          lanend: '',                  //结束地址
        },

        aliasFormOriginal: {
          aliasip: '',                //别名地址
          lanstart: '',              //起始地址
          lanend: '',                  //结束地址
        },

        mappingForm: {
          assport: '',                     //外网端口
          localport: '',                   //内网端口
          ip: '',                          //内网起始IP
          ipcnt: '',                       //内网个数
          proto: '',                        //协议
          handle: ''
        },

        mappingFormOriginal: {
          assport: '',                     //外网端口
          localport: '',                   //内网端口
          ip: '',                          //内网起始IP
          ipcnt: '',                       //内网个数
          proto: '',                        //协议
          handle: ''
        },

        portsName: {
          index: '',
          name: '',
          flag: '',
        },

        protoOption: [
          {
            label:'TCP'
          },
          {
            label:'UDP'
          },
        ],

        localName: [],

        ports: [],
        alias: [],
        mapping: [],
        fragmentOption: [],                     //分片包功能复选框内容

        TCP: false,
        UDP: false,
        ICMP: false,

        aliasSelections: [],                    //网络别名批量删除列表选中列
        mappingSelections: [],                  //端口映射批量删除列表选中列
        checked: '',                            //检查是否已自适应端口排序

        sortLoading: false,                     //设立端口名称时的检查

        tooltipLabelWidth: '100px',
        formLabelWidth: '130px',
        powerButton: 'static/port3.png',
        tips: [
          '请只接通第',
          '个网口，并为其设置网口名',
          '请接通第' ,
          '个网口',
          '请插入网线，连通当前网口',
        ],
        tip1: '请接通第',
        tip2: '个网口，并为其设置网口名',

        fragmentForm: {
          fragtype: '',
          handle: '',
        },

        wanLimit: '',
        lanLimit: '',
        wanCount: 0,
        lanCount: 0,
        unbindEnable: false,

        WANLANLoading: false,
      }
    },

    watch: {
      //自适应排序dialog意外关闭后就停止请求循环
      sortingVisible:{
        handler: function () {
          if(this.sortingVisible === false) {
            if( stopSignal3 !== undefined){
              clearInterval(stopSignal3)
            }
            else {
              clearInterval(stopSignal4)
            }
            this.sortLoading = false
          }
        }
      }
    },

    methods: {
      interval() {
        stopSignal1 = setInterval(this.getPortsInfo, 3000)
      },

      /**
       *页面设置的一些函数
       */
      headerStyle() {
        return this.header()
      },

      drawLineChart1: function(){
        let myChart = NAT.init(document.getElementById('chartLine1'),'walden')

        // function getPercentData() {
        //   now = new Date(+now + 5000);
        //   let percent;
        //   async function assign()
        //   {
        //     let result = await getUsage();
        //     return {
        //       a: result,
        //     };
        //   }
        //   assign().then((res) => {
        //     res.a.data.percent
        //   });
        //   return {
        //     name: now.toString(),
        //     value: [
        //       now,
        //       percent
        //     ]
        //   }
        // }

        async function getPercentData() {
          now = new Date(+now + 5000)
          let percent
          await getUsage().then((res) => {
            return res.data.percent
          }).then((val) => {
            percent = val
          })
          // console.log("reponse percent! the value is "+ percent);
          return {
            name: now.toString(),
            value: [
              now,
              percent
            ]
          }
        }

        async function getUseNode() {
          let usage
          await getUsage().then((res) => {
            return res.data.usenode
          }).then((val) => {
            usage = val
          })
          // console.log("reponse usenode! the value is "+ usage);
          return usage
        }

        function randomData() {
          now = new Date(+now + 5000)
          //console.log("now "+now+"and "+now.toTimeString());
          // value = Math.random()*100;
          value = 0
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
        for (let i = 0; i <36; i++) {
          data.push(randomData())
        }

        let option = {
          title: {
            text: '随机端口使用情况',
            subtext: '百分比',
            textStyle: {
              fontWeight: 'normal',
              fontSize: 14,
            },
          },
          tooltip: {
            trigger: 'none',
            formatter: function (params) {
              params = params[0]
              let date = new Date(params.name)
              return date.getHours() + ':' + date.getMinutes() + ' : ' + params.value[1]
            },
            axisPointer: {
              animation: false
            }
          },
          legend: {
            data: ['占用百分比','使用数量']
          },
          grid: {
            left: '5%',
            right: '5%',
            bottom: '10%',
            containLabel: false
          },
          xAxis: [
            {
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
            {
              type: 'category',
              data: (function (){
                let res = []
                let len = 36
                while (len--) {
                  res.push(36 - len - 1)
                }
                return res
              })()
            }
          ],
          yAxis: [
            {
              type: 'value',
              boundaryGap: [0, '0%'],
              max: 100,
              min: 0,
              splitLine: {
                show: false
              },
            },
            {
              type: 'value',
              scale: true,
              name: '使用数量',
              min: 0,
              boundaryGap: [0.2, 0]
            }
          ],
          series: [
            {
              name: '模拟数据',
              type: 'line',
              lineStyle: {
                width: 0.5,
                type: 'dotted',
              },
              showSymbol: false,
              hoverAnimation: false,
              data: data
            },
            {
              name:'预购队列',
              type:'bar',
              xAxisIndex: 1,
              yAxisIndex: 1,
              data:(function (){
                let res = []
                let len = 36
                while (len--) {
                  // res.push(Math.round(Math.random() * 1000));
                  res.push(0)
                }
                return res
              })()
            }
          ],
        }

        // data.shift();
        // data.push(randomData());
        myChart.setOption(option)

        async function update(){
          let resultData = await getPercentData()
          let resultUsage = await getUseNode()
          data.shift()
          data.push(resultData)
          let usage = option.series[1].data
          usage.shift()
          usage.push(resultUsage)
          myChart.setOption(option)
        }
        stopSignal2 = setInterval(update, 5000)
        clearInterval(stopSignal2)

        // setInterval(function () {
        //   //插入时间和百分比数据
        //   data.shift();
        //   // data.push(randomData());
        //   data.push(
        //     getPercentData()
        //   );
        //
        //   //插入使用数量数据
        //   let usage = option.series[1].data;
        //   usage.shift();
        //   // usage.push(Math.round(Math.random() * 1000));
        //   usage.push(
        //     getUseNode()
        //   );
        //
        //   myChart.setOption(option);
        // }, 5000);


        window.addEventListener('resize',function() {
          myChart.resize()
        })
      },


      /**
       * 页面左上角port相关函数
       */
      //获取ports信息
      getPortsInfo: function() {
        // getPorts().then((res) => {
        //    this.ports = res.data.ports;
        //     console.log("ports response "+res);
        //     console.log("ports response data: "+res.interfaces);
        //     console.log(this.ports);

        getPorts().then((res) => {
          this.wanLimit = res.data.wancount
          this.lanLimit = res.data.lancount
          let lanCount = 0
          let wanCount = 0
          for(let i = 0; i<res.data.interfaces.length; i++){
            if(res.data.interfaces[i].function.toLowerCase() === 'wan'){
              wanCount++
              console.log('wanCount is '+wanCount)
            }
            if(res.data.interfaces[i].function.toLowerCase() === 'lan'){
              lanCount++
              console.log('lanCount is '+lanCount)
            }
          }
          this.lanCount = lanCount
          this.wanCount = wanCount

          //根据webindex排序，确保端口顺序正确
          function sortNumber(a, b){
            return a.webindex-b.webindex
          }
          res.data.interfaces.sort(sortNumber)

          // console.log("get feedback, res.data.interfaces is: "+res.data.interfaces);
          this.checked = JSON.parse(JSON.stringify(res.data.code))
          // console.log("code is "+JSON.stringify(res.data.code));
          this.ports = JSON.parse(JSON.stringify(res.data.interfaces))
          console.log('after parse, the port[] is: '+JSON.stringify(res.data.interfaces))
        })
      },
      //显示选择功能的dialog
      dialog: function(para){
        console.log(para)
        this.WANForm.index = para
        this.WANForm.use = ''
        this.dialogFormVisible = true
        this.unbindEnable = this.ports[para].function === 'NORMAL'
      },
      //选择LAN,WAN口对应图标
      selectUrl(para) {
        // if(para === "空闲")
        if(para === 'off')
        {
          return 'static/port2.png'
        }
        else{
          return 'static/port3.png'
        }
      },
      //选择router页面里的图标
      selectIcon(para) {
        if (para === 'WAN') {
          return '#icon-wan'
        }
        else if(para === 'LAN') {
          return '#icon-pc'
        }
        else {
          return false
        }
      },
      //选择端口对应名称
      name: function() {
        return ('eth'+this.portsName.index)
      },
      //WANLAN绑定
      WANLANSubmit: function() {
        this.WANForm.handle = 1
        let para = Object.assign({}, this.WANForm)
        console.log(para)
        this.WANLANLoading = true
        // console.log(typeof(para.index));
        sendWANLAN(para).then((res) => {
          if( res.data.code === 200 ) {
            this.$message({
              message: '发送成功',
              type: 'success'
            })
          }
          else{
            this.WANLANLoading = true
          }
        }).then(this.getPortsInfo()).then(() => {
          this.dialogFormVisible = false
          this.WANLANLoading = false
        })
      },
      //WAN,LAN口解绑功能
      unbind: function()  {
        let index = this.WANForm.index
        this.WANForm.use = this.ports[index].function
        this.WANForm.handle = 0
        this.WANLANLoading = true
        let para = Object.assign({}, this.WANForm)
        sendWANLAN(para).then(() => {
          this.$message({
            message: '发送成功',
            type: 'success'
          })
        }).then(this.getPortsInfo()).then(() => {
          this.dialogFormVisible = false
          this.WANLANLoading = false
        })
      },


      /**
       * 页面右上角分片功能
       */
      //分片包功能信息获取
      getFragmentPackageInfo: function() {
        getFragmentInfo().then((res) => {
          this.TCP = !!res.data.tcp
          this.UDP = !!res.data.udp
          this.ICMP = !!res.data.icmp
        // console.log("the value of fragment are "+this.TCP+" "+this.UDP+" "+this.ICMP);
        })
      },
      //处理分片包选择
      handleTCPChange: function(val) {
        let para = {}
        if(val){
          para.handle = 1
        }
        else{
          para.handle = 0
        }
        para.fragtype = 'tcp'
        sendFragment(para).then(() => {
          this.$message({
            message: '提交成功',
            type: 'success'
          })
        })
        this.getFragmentPackageInfo()

      },
      handleUDPChange: function(val) {
        let para = {}
        if(val){
          para.handle = 1
        }
        else{
          para.handle = 0
        }
        para.fragtype = 'udp'
        sendFragment(para).then(() => {
          this.$message({
            message: '提交成功',
            type: 'success'
          })
        })
        this.getFragmentPackageInfo()
      },
      handleICMPChange: function(val) {
        let para = {}
        if(val){
          para.handle = 1
        }
        else{
          para.handle = 0
        }
        para.fragtype = 'icmp'
        sendFragment(para).then(() => {
          this.$message({
            message: '提交成功',
            type: 'success'
          })
        })
        this.getFragmentPackageInfo()
      },

      /**
       * Alias全部相关函数
       */
      //获得alias信息
      getAliasInfo: function() {
        let para = {
          page: this.aliasPage,
        }
        getAlias(para).then((res) => {
          if(this.aliasPage === res.data.page) {
            this.aliasTotal = res.data.total
            this.alias = res.data.data
          }
          //let alias1 = JSON.stringify(res.data.alias);
          //console.log("alias is "+alias1);
        })
      },
      //别名表格编辑
      handleAliasEdit: function(index, row) {
        this.aliasEditFormVisible = true
        this.aliasForm = Object.assign({}, row)
      },
      //别名表格编辑提交
      editAliasSubmit: function() {
        let para = Object.assign({}, this.aliasForm)
        // console.log("aliasForm is"+this.aliasForm);
        editAlias(para).then(() => {
          this.$message({
            message: '提交成功',
            type: 'success'
          })
          this.$refs['aliasForm'].resetFields()
          this.aliasEditFormVisible = false
          this.getAliasInfo()
        })
      },
      //别名表 编辑取消
      aliasCancel() {
        this.aliasFormVisible = false
        this.aliasEditFormVisible = false
        this.aliasForm = this.aliasFormOriginal
      },
      //别名表格添加处理
      addAliasHandle: function() {
        this.aliasForm = this.aliasFormOriginal
        this.aliasFormVisible = true
      },
      //别名表格添加提交
      addAliasSubmit: function() {
        let para = Object.assign({}, this.aliasForm)
        para.handle = 0

        console.log(para)
        addAlias(para).then(() => {
          this.$message({
            message: '提交成功',
            type: 'success'
          })
          this.$refs['aliasForm'].resetFields()
          this.aliasFormVisible = false
          this.getAliasInfo()
        })
      },
      //别名表格批量删除
      delAliasHandle: function() {
        this.$confirm('确认删除选中记录吗？', '提示', {
          type: 'warning'
        }).then(() => {
          this.aliasSelections.map(item => del(item))
          function del(item) {
            item.handle = 1
            let para = Object.assign({}, item)
            delAlias(para)
          }
        })
        this.getAliasInfo()
      },
      //单独删除一个网络别名
      signalDelAliasHandle: function(index, row) {
        row.handle = 1
        let para = Object.assign({}, row)

        this.$confirm('确认删除选中记录吗？', '提示', {
          type: 'warning'
        }).then(() => {
          delAlias(para).then(() => {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.getAliasInfo()
          })
        }).catch(() => {
        })
      },
      //别名表格 分页选择 跳到选中页面
      aliasHandleCurrentChange(val) {
        this.aliasPage = val
        this.getAliasInfo()
      },
      //别名表格 多选 确定选中选项
      aliasSelChange: function(sels) {
        this.aliasSelections = sels
      },


      /**
       * mapping全部相关函数
       */
      //获得mapping信息
      getMappingInfo: function() {
        let para = {
          page: this.mappingPage,
        }
        getMapping(para).then((res) => {
          if(this.mappingPage === res.data.page ) {
            this.mappingTotal = res.data.total
            this.mapping = res.data.data
            return
          }
          else{
            this.getMappingInfo()
          }
        })
      },
      //映射表格编辑
      handleMappingEdit: function(index, row) {
        this.mappingEditFormVisible = true
        this.mappingForm = Object.assign({}, row)
      },
      //映射表格编辑提交
      editMappingSubmit: function() {
        this.mappingForm.handle = 0
        let para = Object.assign({}, this.mappingForm)
        console.log('mappingForm is'+this.mappingForm)
        editMapping(para).then(() => {
          this.$message({
            message: '提交成功',
            type: 'success'
          })
          this.$refs['mappingForm'].resetFields()
          this.mappingEditFormVisible = false
          this.getMappingInfo()
        })
      },
      //映射表格编辑取消
      mappingCancel() {
        this.mappingFormVisible = false
        this.mappingEditFormVisible = false
        this.mappingForm = this.mappingFormOriginal
      },
      //映射表格添加处理 显示端口dialogue
      addMappingHandle: function() {
        this.mappingForm = this.mappingFormOriginal
        this.mappingFormVisible = true
      },
      //映射表格添加提交
      addMappingSubmit: function() {
        let para = Object.assign({}, this.mappingForm)
        para.handle = 0
        addMapping(para).then(() => {
          this.$message({
            message: '提交成功',
            type: 'success'
          })
          this.$refs['mappingForm'].resetFields()
          this.mappingFormVisible = false
          this.getMappingInfo()
        })
      },
      //映射表格删除
      delMappingHandle: function() {
        this.$confirm('确认删除选中记录吗？', '提示', {
          type: 'warning'
        }).then(() => {
          this.mappingSelections.map(item => del(item))

          function del(item) {
            item.handle = 1
            let para = Object.assign({}, item)
            delMapping(para)
          }
        })
        this.getMappingInfo()
      },
      //单独删除一个映射表格
      signalDelMappingHandle: function(index, row) {
        row.handle = 1
        row.assport = String(row.assport)
        row.ipcnt = String(row.ipcnt)
        row.localport = String(row.localport)
        let para = Object.assign({}, row)
        console.log('the row is '+row)


        this.$confirm('确认删除选中记录吗？', '提示', {
          type: 'warning'
        }).then(() => {
          delMapping(para).then(() => {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.getMappingInfo()
          })
        })
      },
      //映射表格 分页选择 跳到选中页面
      mappingHandleCurrentChange(val) {
        this.mappingPage = val
        this.getMappingInfo()
      },
      //映射表格 多选 确定选中选项
      mappingSelChange: function(sels) {
        this.mappingSelections = sels
      },



      /**
       * 自使用排序相关函数
       */
      //显示端口自适应排序页面
      sortingHandle: function() {
        this.sortingVisible = true

        this.portsName.index = 0
        this.portsName.name = ''
        this.portsName.flag = ''
      },
      //网口自适应功能 “下一步”按钮调用函数
      sortingNextStep: function() {
        //form validate
        if(this.portsName.name.length > 10){
          this.$message({
            message: '名称长度请控制在10个字以内',
            type: 'error'
          })
          return
        }
        else if(this.portsName.name.length === 0){
          this.$message({
            message: '请输入名称',
            type: 'error'
          })
          return
        }

        this.sortLoading = true
        this.tip = this.tips[5]

        if(this.portsName.flag !== 'middle')
        {
          this.portsName.flag = 'first'
        }
        let para = Object.assign({}, this.portsName)
        console.log('name is: '+JSON.stringify(this.portsName))

        stopSignal3 = setInterval( () =>{
          sendSorting(para).then((res) => {
            if (this.portsName.index === res.data.index) {
              if (res.data.code === 200) {
                clearInterval(stopSignal3)
                console.log('interval stop: ' + stopSignal1)

                this.localName[res.data.index] = this.portsName.name

                this.sortLoading = false
                this.portsName.index = res.data.index + 1
                // this.portsName.index++;
                this.portsName.flag = 'middle'
                this.tip1 = this.tips[0]
                this.tip2 = this.tips[1]

                console.log('in sorting interval: http status is ' + res.status + ' and the index is ' + this.portsName.index)
                console.log(res)
              }
              else if (res.data.code === 500) {
                this.tip1 = this.tips[2]
                this.tip2 = this.tips[3]
                console.log('in sorting interval: http status is ' + res.status + ' and the index is ' + this.portsName.index)
                console.log(res)
              }
            }
          })
        }, 1000)

      },
      //网口自适应功能 “完成”按钮调用函数
      sortingFinish: function() {
        this.sortLoading = true
        this.portsName.flag = 'last'
        this.portsName.index += 1 
        let para = Object.assign({}, this.portsName)

        stopSignal4 = setInterval( () =>{
          sendSorting(para).then((res) => {
            if(res.data.index === this.portsName.index) {
              if (res.data.code === 200) {
                this.sortLoading = false
                this.portsName.name = ''
                this.portsName.flag = ''
                this.portsName.index = 0
                clearInterval(stopSignal4)
                console.log('in cancel interval: ' + res.status)
                console.log(res)
                this.sortingVisible = false

                this.tip1 = this.tips[0]
                this.tip2 = this.tips[1]

                this.getPortsInfo()

                setTimeout((() => {
                  this.getPortsInfo()
                }), 1000)
              }
              else if (res.data.code === 500) {
                this.tip1 = this.tips[2]
                this.tip2 = this.tips[3]
                console.log('in sorting interval: http status is ' + res.status + ' and the index is ' + this.portsName.index)
                console.log(res)
              }
            }
          })
        }, 1000)

      },
      //网口自适应功能 “取消”按钮调用函数
      sortingCancel: function() {
        if (stopSignal3 != null) {
          clearInterval(stopSignal3)
        }
        else {
          clearInterval(stopSignal4)
        }
        this.sortingVisible = false
        sortingCancel().then((res) => {
          if(res.status === 200) {
            return true
          }
        })
        this.sortLoading = false
        this.portsName.index = 0
        this.portsName.name = ''
        this.portsName.flag = ''

        this.tip1 = this.tips[0]
        this.tip2 = this.tips[1]
      },
    },

    mounted() {
      this.getPortsInfo()
      this.getAliasInfo()
      this.getMappingInfo()
      this.getFragmentPackageInfo()
      this.drawLineChart1()
      this.interval()
    }
  }
</script>

<style scoped>
  p {
    margin: 0;
  }

  .top {
    width: 100%;
    display: flex;
  }

  .wholeRouter {
    width: 65%;
    border: 1px solid lightgrey;
    background-color: ghostwhite;
    color: #909399;
    display: flex;
    position: relative;
  }

  .wholeRouter .power {
    border: 1px solid lightgrey;
    border-radius: 10px;
    text-align: center;
    margin: auto;
    background-color: dodgerblue;
  }

  .wholeRouter .router {
    width: 75%;
    border: 1px solid lightgrey;
    border-radius: 10px;
    margin: 10px 20px;
    background-color: lightgoldenrodyellow;
    display: flex;
    flex-wrap: wrap;
    text-align: center;
  }

  .wholeRouter .router .port {
    width: 60px;
    height:50px;
    margin: 25px auto;
    flex-grow: 1;
    border-radius: 5px;
  }

  .wholeRouter .router .port img:hover {
    cursor: pointer;
  }


  .wholeRouterInDialog {
    width: 100%;
    border: 1px solid lightgrey;
    background-color: ghostwhite;
    color: #909399;
    display: flex;
    margin-bottom: 30px;
    position: relative;
  }

  .wholeRouterInDialog .power {
    border: 1px solid lightgrey;
    border-radius: 10px;
    text-align: center;
    margin: 10px 0 10px 20px;
    background-color: dodgerblue;
  }

  .wholeRouterInDialog .power  .powerButton {
    width: 60px;
    height:50px;
    margin: 25px 20px;
  }

  .wholeRouterInDialog .router {
    width: 75%;
    border: 1px solid lightgrey;
    border-radius: 10px;
    margin: 10px 20px;
    background-color: lightgoldenrodyellow;
    display: flex;
    flex-wrap: wrap;
    text-align: center;
  }

  .wholeRouterInDialog .router .port {
    width: 60px;
    height:50px;
    margin: 25px auto;
    flex-grow: 1;
    border-radius: 5px;
  }

  .mask {
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(70, 70, 70, 0.5);
    width: 100%;
    height: 100%;
  }

  .mask .button {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .powerButton {
    width: 60px;
    height:50px;
    margin: 25px 20px;
  }

  .text{
    font-weight: bold;
  }

  .tips {
    flex-grow: 1;
    margin-left: 50px;
    border: 1px solid lightgrey;
  }

  .checkbox {
    margin: 10px;
  }

  .table {
    width: 100%;
  }

  .icon {
    width: 1em; height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }

  .triangular {
    border: 10px solid lightgoldenrodyellow;
    border-bottom-color: #f00;
    width: 0;
    height: 0;
    margin: auto;
  }
</style>
