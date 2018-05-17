<template>
  <section>
    <div>
      <div class="line_02"><span>WAN口,LAN口设置</span></div>
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
          <div v-for="(item, index) in ports" class="port" @click="dialog(index)">
            <div>
              <el-tooltip class="item" effect="light">
                <img style="width: 60px; height: 50px; border-radius: 5px;" :src=selectUrl(item.function) />
                <div slot="content" class="tooltip-content">
                  <h3>ports[index].enname</h3>
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
                    <el-form-item label="绑定设备:" :label-width="tooltipLabelWidth" style="margin: 0;">
                      {{}}
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
                  <span v-show="item.category !== '空闲'"><svg class="icon"><use :xlink:href=selectIcon(item.category)></use></svg></span>
                  en{{index}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="tips">
        <el-checkbox-group v-model="fragmentOption"  @change="handleFuncChange">
          <el-checkbox class="checkbox" label="TCP分片包接收使能" name="type"></el-checkbox><br>
          <el-checkbox class="checkbox" label="UDP分片包接收使能" name="type"></el-checkbox><br>
          <el-checkbox class="checkbox" label="ICMP分片包接收使能" name="type"></el-checkbox>
        </el-checkbox-group>
      </div>
    </div>

    <div>
      <div class="line_02"><span>随机端口使用</span></div>
    </div>
    <!--随机端口折线图-->
    <div class="echarts">
      <div id="chartLine1" style="width:100%; height:200px; margin-top: 10px"></div>
    </div>

    <div>
      <div class="line_02"><span>网络别名</span></div>
    </div>
    <!--网络别名工具栏-->
    <div class="table">
      <el-col :span="24" class="toolbar" style="padding-bottom: 0;">
        <el-form :inline="true">
          <el-form-item>
            <el-button type="primary" @click="addAliasHandle">添加</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="danger" @click="delAliasHandle()" :disabled="this.aliasSelections.length===0">删除</el-button>
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
        <el-table-column prop="aliasAddress"  label="别名地址" min-width="120">
        </el-table-column>
        <el-table-column prop="initialAddress"  label="LAN起始地址" min-width="120">
        </el-table-column>
        <el-table-column prop="endAddress"  label="LAN结束地址" min-width="120">
        </el-table-column>
        <el-table-column label="操作" min-width="120">
          <template slot-scope="scope">
            <el-button size="small" @click="handleAliasEdit(scope.$index, scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div>
      <div class="line_02"><span>端口映射</span></div>
    </div>

    <!--端口映射工具栏-->
    <div class="table">
      <el-col :span="24" class="toolbar" style="padding-bottom: 0;">
        <el-form :inline="true">
          <el-form-item>
            <el-button type="primary" @click="addMappingHandle">添加</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="danger" @click="delMappingHandle()" :disabled="this.mappingSelections.length===0">删除</el-button>
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
        <el-table-column prop="outerPort"  label="外网端口" min-width="120">
        </el-table-column>
        <el-table-column prop="innerPort"  label="内网端口" min-width="120">
        </el-table-column>
        <el-table-column prop="innerInitialIP"  label="内网起始IP" min-width="120">
        </el-table-column>
        <el-table-column prop="numOfInner"  label="内网个数" min-width="120">
        </el-table-column>
        <el-table-column prop="protocol"  label="协议" min-width="120">
        </el-table-column>
        <el-table-column label="操作" min-width="120">
          <template slot-scope="scope">
            <el-button  size="small" @click="handleMappingEdit(scope.$index, scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!--新增网络别名-->
    <el-dialog title="新增网络别名" :visible.sync="aliasFormVisible" width="50%">
      <el-form ref="aliasForm" :model="aliasForm" label-position="left" size="small">
        <el-form-item prop="aliasAddress" label="别名地址" :label-width="formLabelWidth">
          <el-input v-model="aliasForm.aliasAddress"></el-input>
        </el-form-item>
        <el-form-item prop="initialAddress" label="LAN起始地址" :label-width="formLabelWidth">
          <el-input v-model="aliasForm.initialAddress"></el-input>
        </el-form-item>
        <el-form-item prop="endAddress" label="LAN起始地址" :label-width="formLabelWidth">
          <el-input v-model="aliasForm.endAddress"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="danger" @click="aliasCancel">取 消</el-button>
        <el-button type="primary" @click="addAliasSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <!--编辑网络别名-->
    <el-dialog title="编辑网络别名" :visible.sync="aliasEditFormVisible" width="50%">
      <el-form :model="aliasForm" label-position="left" ref="aliasForm" size="small">
        <el-form-item prop="aliasAddress" label="别名地址" :label-width="formLabelWidth">
          <el-input v-model="aliasForm.aliasAddress"></el-input>
        </el-form-item>
        <el-form-item  prop="initialAddress" label="LAN起始地址" :label-width="formLabelWidth">
          <el-input v-model="aliasForm.initialAddress"></el-input>
        </el-form-item>
        <el-form-item prop="endAddress" label="LAN起始地址" :label-width="formLabelWidth">
          <el-input v-model="aliasForm.endAddress"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="danger" @click="aliasCancel">取 消</el-button>
        <el-button type="primary" @click.native="editAliasSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <!--新增端口映射-->
    <el-dialog title="新增端口映射" :visible.sync="mappingFormVisible" width="50%">
      <el-form :model="mappingForm" label-position="left" ref="mappingForm" size="small">
        <el-form-item label="外网端口" :label-width="tooltipLabelWidth">
          <el-input v-model="mappingForm.outerPort"></el-input>
        </el-form-item>
        <el-form-item label="内网端口" :label-width="tooltipLabelWidth">
          <el-input v-model="mappingForm.innerPort"></el-input>
        </el-form-item>
        <el-form-item label="内网起始IP" :label-width="tooltipLabelWidth">
          <el-input v-model="mappingForm.innerInitialIP"></el-input>
        </el-form-item>
        <el-form-item label="内网个数" :label-width="tooltipLabelWidth">
          <el-input v-model="mappingForm.numOfInner"></el-input>
        </el-form-item>
        <el-form-item label="协议" :label-width="tooltipLabelWidth">
          <el-input v-model="mappingForm.protocol"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="danger" @click="mappingCancel">取 消</el-button>
        <el-button type="primary" @click="addMappingSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <!--编辑端口映射-->
    <el-dialog title="编辑端口映射" :visible.sync="mappingEditFormVisible" width="50%">
      <el-form :model="mappingForm" label-position="left" ref="mappingForm" size="small">
        <el-form-item label="外网端口" :label-width="tooltipLabelWidth">
          <el-input v-model="mappingForm.outerPort"></el-input>
        </el-form-item>
        <el-form-item label="内网端口" :label-width="tooltipLabelWidth">
          <el-input v-model="mappingForm.innerPort"></el-input>
        </el-form-item>
        <el-form-item label="内网起始IP" :label-width="tooltipLabelWidth">
          <el-input v-model="mappingForm.innerInitialIP"></el-input>
        </el-form-item>
        <el-form-item label="内网个数" :label-width="tooltipLabelWidth">
          <el-input v-model="mappingForm.numOfInner"></el-input>
        </el-form-item>
        <el-form-item label="协议" :label-width="tooltipLabelWidth">
          <el-input v-model="mappingForm.protocol"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="danger" @click="mappingCancel">取 消</el-button>
        <el-button type="primary" @click="editMappingSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <!--WAN,LAN outer dialogue-->
    <el-dialog title="LAN,WAN口设置" :visible.sync="dialogFormVisible" width="30%">
      <el-form :model="WANForm" label-position="left" size="small">
        <el-form-item label="选择功能" :label-width="formLabelWidth">
          <el-select v-model="WANForm.use" placeholder="请选择内外网" value="">
            <el-option label="LAN（内网）" value="LAN"></el-option>
            <el-option label="WAN（外网）" value="WAN"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="danger" @click="unbind">解 绑</el-button>
        <el-button type="primary" @click="WANLANSubmit">提 交</el-button>
      </div>
    </el-dialog>

  </section>
</template>

<script>
  import { getPorts, getAlias, editAlias, addAlias, delAlias, getMapping, editMapping, addMapping, delMapping, getFragmentInfo, changeFragmentInfo, sendWANLAN } from '../../api/api';
  import NAT from 'echarts';
  require('echarts/theme/walden');

  export default {
    name: "NAT",

    data() {
      return{
        aliasFormVisible: false,              //网络别名添加表格显示控制
        aliasEditFormVisible: false,          //网络别名编辑表格显示控制
        mappingFormVisible: false,            //端口映射添加表格显示控制
        mappingEditFormVisible: false,        //端口映射编辑表格显示控制
        dialogFormVisible: false,             //LAN,WAN设置

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
          accessMethod: "1",              //接入方式
          primaryDNS:'',                  //首选DNS
          secondaryDNS:'',                //备选DNS
          status:'未连接'                 //连接状态，ASDL使用该属性
        },

        WANForm: {
          index: '',                     //端口编号，唯一，通过index确认端口
          use: '',                        //选择功能LAN/WAN
        },

        aliasForm:{
          id: '',                          //端口编号
          aliasAddress: '',                //别名地址
          initialAddress: '',              //起始地址
          endAddress: '',                  //结束地址
        },

        aliasFormOriginal:{
          id: '',                          //端口编号
          aliasAddress: '',                //别名地址
          initialAddress: '',              //起始地址
          endAddress: '',                  //结束地址
        },

        mappingForm: {
          id: '',                          //端口编号
          outerPort: '',                   //外网端口
          innerPort: '',                   //内网端口
          innerInitialIP: '',              //内网起始IP
          innerNum: '',                    //内网个数
          protocol: ''                     //协议
        },

        mappingFormOriginal: {
          id: '',                          //端口编号
          outerPort: '',                   //外网端口
          innerPort: '',                   //内网端口
          innerInitialIP: '',              //内网起始IP
          innerNum: '',                    //内网个数
          protocol: ''                     //协议
        },


        ports: [],
        alias: [],
        mapping: [],
        fragmentOption: [],                     //分片包功能复选框内容
        aliasSelections: [],                    //网络别名批量删除列表选中列
        mappingSelections: [],                  //端口映射批量删除列表选中列

        tooltipLabelWidth: '100px',
        formLabelWidth: '130px',
        powerButton: 'static/port3.png',
      }
    },

    methods: {
      headerStyle() {
        return this.header();
      },

      //选择LAN,WAN口对应图标
      selectUrl(para) {
        // if(para === "空闲")
        if(para === "NORMAL")
        {
          return "static/port2.png"
        }
        else{
          return "static/port3.png"
        }
      },

      //选择router页面里的图标
      selectIcon(para) {
        if (para === "WAN") {
          return "#icon-zaixian"
        }
        else if(para === "LAN") {
          return "#icon-pc"
        }
        else {
          return false;
        }
      },

      //分片包功能星系获取
      getFragmentPackageInfo: function() {
        /**
         * 该部分和后台连调后完成
         */
        // getFragmentInfo().then((res) => {
        //   this.fragmentOption = res.data.fragmentOption;
        // })
      },

      //处理分片包选择
      handleFuncChange: function(value) {
        this.fragmentOption = value;
        //console.log("change function: "+this.fragmentOption);
      },

      //显示选择功能的dialog
      dialog: function(para){
        console.log(para);
        this.WANForm.index = para;
        this.dialogFormVisible = true;
      },

      WANLANSubmit: function() {
        this.dialogFormVisible = false;
        let para = Object.assign({}, this.WANForm);
        console.log(para);
        console.log(typeof(para.index));
        sendWANLAN(para).then(() => {
          this.$message({
            message: '发送成功',
            type: 'success'
          });
        })
      },

      unbind: function()  {
        this.dialogFormVisible = false;
        /***
         * 联调时补充
         */
      },

      getPortsInfo: function() {
        //getPorts().then((res) => {
        //    this.ports = res.data.ports;
        //     console.log("ports response "+res);
        //     console.log("ports response data"+res.interfaces);
        //     console.log(this.ports);

        getPorts().then((res) => {
          console.log("get feedback, res.data.interfaces is: "+res.data.interfaces);
          this.ports = JSON.parse(JSON.stringify(res.data.interfaces));
          console.log("after parse, the port[] is: "+this.ports);
         });
      },

      getAliasInfo: function() {
        let para = {
          page: this.aliasPage,
        };
        getAlias(para).then((res) => {
          this.aliasTotal = res.data.total;
          this.alias = res.data.alias;
          let alias1 = JSON.stringify(res.data.alias);
          console.log("alias is "+alias1);
        });
      },

      getMappingInfo: function() {
        let para = {
          page: this.mappingPage,
        };
        getMapping(para).then((res) => {
          this.mappingTotal = res.data.total;
          this.mapping = res.data.mapping;
        });
      },

      aliasHandleCurrentChange(val) {
        this.aliasPage = val;
        this.getAliasInfo();
      },

      mappingHandleCurrentChange(val) {
        this.mappingPage = val;
        this.getMappingInfo();
      },

      //别名表编辑
      handleAliasEdit: function(index, row) {
        this.aliasEditFormVisible = true;
        this.aliasForm = Object.assign({}, row);
      },

      handleMappingEdit: function(index, row) {
        this.mappingEditFormVisible = true;
        this.mappingForm = Object.assign({}, row);
      },

      //别名表 编辑取消
      aliasCancel() {
        this.aliasFormVisible = false;
        this.aliasEditFormVisible = false;
        this.aliasForm = this.aliasFormOriginal;
      },

      mappingCancel() {
        this.mappingFormVisible = false;
        this.mappingEditFormVisible = false;
      },

      editAliasSubmit: function() {
        let para = Object.assign({}, this.aliasForm);
        console.log("alaisForm is"+this.aliasForm);
        editAlias(para).then(() => {
          this.$message({
            message: '提交成功',
            type: 'success'
          });
          this.$refs['aliasForm'].resetFields();
          this.aliasEditFormVisible = false;
          this.getAliasInfo();
        });
      },

      editMappingSubmit: function() {
        let para = Object.assign({}, this.mappingForm);
        console.log("mappingForm is"+this.mappingForm);
        editMapping(para).then(() => {
          this.$message({
            message: '提交成功',
            type: 'success'
          });
          this.$refs['mappingForm'].resetFields();
          this.mappingEditFormVisible = false;
          this.getMappingInfo();
        });
      },

      addAliasHandle: function() {
        this.aliasForm = this.aliasFormOriginal;
        this.aliasFormVisible = true;
      },

      //显示端口dialogue
      addMappingHandle: function() {
        this.mappingForm = this.mappingFormOriginal;
        this.mappingFormVisible = true;
      },

      addAliasSubmit: function() {
        let para = Object.assign({}, this.aliasForm);
        addAlias(para).then(() => {
          this.$message({
            message: '提交成功',
            type: 'success'
          });
          this.$refs['aliasForm'].resetFields();
          this.aliasFormVisible = false;
          this.getAliasInfo();
        });
      },

      addMappingSubmit: function() {
        let para = Object.assign({}, this.mappingForm);
        addMapping(para).then(() => {
          this.$message({
            message: '提交成功',
            type: 'success'
          });
          this.$refs['mappingForm'].resetFields();
          this.mappingFormVisible = false;
          this.getMappingInfo();
        });
      },

      aliasSelChange: function(sels) {
        this.aliasSelections = sels;
      },

      mappingSelChange: function(sels) {
        this.mappingSelections = sels;
      },

      delAliasHandle: function() {
        let ids = this.aliasSelections.map(item => item.id).toString();
        this.$confirm('确认删除选中记录吗？', '提示', {
          type: 'warning'
        }).then(() => {
          let para = { ids: ids };
          delAlias(para).then(() => {
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.getAliasInfo();
          });
        }).catch(() => {
        });
      },

      delMappingHandle: function() {
        let ids = this.mappingSelections.map(item => item.id).toString();
        this.$confirm('确认删除选中记录吗？', '提示', {
          type: 'warning'
        }).then(() => {
          let para = { ids: ids };
          delMapping(para).then(() => {
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.getMappingInfo();
          });
        }).catch(() => {
        });
      },

      drawLineChart1: function(){
        let myChart = NAT.init(document.getElementById('chartLine1'),"walden");

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
        for (let i = 0; i < 60; i++) {
          data.push(randomData());
        }

        let option = {
          title: {
            text: '随机端口使用情况',
            subtext: '使用数量',
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
            right: '5%',
            bottom: '10%',
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
        }, 5000);
        window.addEventListener("resize",function() {
          myChart.resize();
        });
      },
    },

    mounted() {
      this.getPortsInfo();
      this.getAliasInfo();
      this.getMappingInfo();
      this.drawLineChart1();
      this.getFragmentPackageInfo();
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
  }

  .powerButton {
    width: 60px;
    height:50px;
    margin: 25px 20px;
  }

  .power {
    border: 1px solid lightgrey;
    border-radius: 10px;
    text-align: center;
    margin: auto;
    background-color: dodgerblue;
  }

  .router {
    width: 75%;
    border: 1px solid lightgrey;
    border-radius: 10px;
    margin: 10px 20px;
    background-color: lightgoldenrodyellow;
    display: flex;
    flex-wrap: wrap;
    text-align: center;
  }

  .port {
    width: 60px;
    height:50px;
    margin: 25px auto;
    flex-grow: 1;
    border-radius: 5px;
  }

  .port img:hover {
    cursor: pointer;
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
</style>
