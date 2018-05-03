<template>
  <section>
    <div class="line_02"><span>终端监控</span></div>

    <el-row :gutter="0" class="setting">
      <el-col :md="9" :lg="9" :xl="9">
        <div class="left">
          <div class="icon">
          </div>
          <div class="tip1">
            <h2>0</h2>
            <p class="bottomLine">WAN已连接</p>
          </div>
          <div class="tip1">
            <h2>0</h2>
            <p class="bottomLine">Kbps总宽带</p>
          </div>
        </div>
      </el-col>

      <el-col :md="15" :lg="15" :xl="15">
        <div class="right">
          <div class="icon"></div>
          <div class="tip">
            <h2>1</h2>
            <p class="bottomLine">LAN已连接</p>
          </div>
          <div class="tip">
            <h2>1</h2>
            <p class="bottomLine">终端连接</p>
          </div>
          <div class="tip">
            <h2>0</h2>
            <p class="bottomLine">DHCP服务已启用</p>
          </div>
        </div>
      </el-col>

    </el-row>

    <div class="接口状态">
      <div class="line_02"><span>状态接口</span></div>

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
                <img style="width: 60px; height: 50px; border-radius: 5px;" :src=selectUrl(item.category) />
                <div slot="content" class="tooltip-content">
                  <h3>en{{index}}</h3>
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
              <div class="textArea" :class="{textColor: type === 1 || type === 2 || type === 3}">
                <p class="text">en{{index}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <el-dialog title="配置网卡" :visible.sync="dialogFormVisible" width="30%">
      <!--inner dialog LAN-->
      <el-dialog
        width="30%"
        height="100%"
        title="LAN配置"
        :visible.sync="LANInnerVisible"
        append-to-body>
        <el-form :model="form" label-position="left" size="small">
          <el-form-item label="IP地址" :label-width="formLabelWidth">
            <el-input v-model="form.IP" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="子网掩码" :label-width="formLabelWidth">
            <el-input v-model="form.mask" auto-complete="off" placeholder="255.255.255.0"></el-input>
          </el-form-item>
          <el-form-item label="网关" :label-width="formLabelWidth">
            <el-input v-model="form.gateway" auto-complete="off" placeholder=""></el-input>
          </el-form-item>


          <!--router pic in LAN setting-->
          <!--
          <div class="routerInDialog">
            <div v-for="(item, index) in ports" class="portInDialog">
              <div>
                <img style="width: 60px; height: 50px; border-radius: 5px;" :src="item.imgUrl" />
              </div>
            </div>
          </div>
          -->

          <!--components of collapse-->
          <el-collapse class="advancedSetting">
            <el-collapse-item title="高级设置" name="1">
              <el-form :model="form" label-position="left" size="small">

                <el-form-item label="工作模式" :label-width="formLabelWidth">
                  <el-select v-model="form.mode" placeholder="请选择" value="" style="width: 100%;">
                    <el-option
                      v-for="item in modeOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="网卡速率" :label-width="formLabelWidth">
                  <el-select v-model="form.rate" placeholder="请选择" value="" style="width: 100%;">
                    <el-option
                      v-for="item in rateOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="LAN互访控制" :label-width="formLabelWidth">
                  <el-checkbox v-model="form.control">允许其他LAN访问此LAN</el-checkbox>
                </el-form-item>
              </el-form>
            </el-collapse-item>
          </el-collapse>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="danger" @click="formPrevious">上一步</el-button>
          <el-button type="danger" @click="formCancel">退  出</el-button>
          <el-button type="primary" @click="formSubmit">确  定</el-button>
        </div>
      </el-dialog>

      <!--inner dialog WAN-->
      <el-dialog
        width="30%"
        height="100%"
        title="WAN配置"
        :visible.sync="WANInnerVisible"
        append-to-body>
        <el-form :model="form" label-position="left" size="small">
          <el-form-item label="接入方式" :label-width="formLabelWidth">
            <el-select v-model="form.accessMethod" placeholder="请选择" value="" style="width: 100%;" @change="onSelect">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form  :model="formDialUp" ref="formDialUp" v-show="ifASDLVisible">
            <el-form-item label="账号" :label-width="formLabelWidth">
              <el-input  v-model="formDialUp.account" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass" :label-width="formLabelWidth">
              <el-input v-model="formDialUp.passwd" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="状态" v-model="formDialUp.status" :label-width="formLabelWidth"  v-loading="loading">
              {{form.status}}
              <el-button type="primary" @click="dialUp" style="margin-left: 20px">连接</el-button>
            </el-form-item>
          </el-form>
          <el-form-item label="IP地址" :label-width="formLabelWidth" value="">
            <el-input v-model="form.IP" :disabled="ifASDLVisible" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="子网掩码" :label-width="formLabelWidth">
            <el-input v-model="form.mask" :disabled="ifASDLVisible" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="网关" :label-width="formLabelWidth">
            <el-input v-model="form.gateway" :disabled="ifASDLVisible" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="首选DNS" :label-width="formLabelWidth">
            <el-input v-model="form.primaryDNS" :disabled="ifASDLVisible" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="备选DNS" :label-width="formLabelWidth">
            <el-input v-model="form.secondaryDNS" :disabled="ifASDLVisible" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>

        <!--components of collapse-->
        <el-collapse class="advancedSetting">
          <el-collapse-item title="高级设置" name="1">
            <el-form :model="form" label-position="left" size="small">
              <el-form-item label="工作模式" :label-width="formLabelWidth">
                <el-select v-model="form.mode" placeholder="请选择" style="width: 100%;" value="">
                  <el-option
                    v-for="item in modeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="网卡速率" :label-width="formLabelWidth">
                <el-select v-model="form.rate" placeholder="请选择" style="width: 100%;" value="">
                  <el-option
                    v-for="item in rateOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </el-collapse-item>
        </el-collapse>
        <div slot="footer" class="dialog-footer">
          <el-button type="danger" @click="formCancel">退 出</el-button>
          <el-button type="danger" @click="formPrevious" v-show="ifButtonVisible">上一步</el-button>
          <el-button type="primary" @click="formSubmit">确 定</el-button>
        </div>
      </el-dialog>

      <!--outer dialog-->
      <el-form :model="form" label-position="left" size="small">
        <el-form-item label="选择功能" :label-width="formLabelWidth">
          <el-select v-model="form.id" placeholder="请选择内外网" value="">
            <el-option label="LAN（内网）" value="LAN"></el-option>
            <el-option label="WAN（外网）" value="WAN"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="danger" @click="formCancel">解 绑</el-button>
        <el-button type="primary" @click="NextStep">下一步</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
  import { getPorts, dialUp } from '../../api/api';

  export default {
    name: "IN-EX_network",
    data() {
      return {
        dialogFormVisible: false,         //控制点击port之后的父级dialog
        LANInnerVisible: false,           //LAN的子级dialog
        WANInnerVisible: false,           //WAN的子级dialog
        ifASDLVisible: false,             //控制ASDL选项是否显示
        ifButtonVisible: true,            //控制上一步按钮是否显示
        loading: false,                   //控制ASDL连接时的加载动画
        stopSignal: 0,
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
        formDialUp: {
          index: '',
          account: '',
          passwd: '',
          status: '未连接',
          handle: 0,            //后台用,勿删
        },
        tooltip: {
          number: ''
        },
        options:[
          {
            value:'1',
            label:'静态IP(固定IP)'
          },
          {
            value:'2',
            label:'DHCP(动态获取)'
          },
          {
            value:'3',
            label:'ASDL/PPPoE拨号'
          }
        ],
        modeOptions:[
          {
            value:'1',
            label:'自动协商(默认)'
          },
          {
            value:'2',
            label:'全双工'
          },
          {
            value:'3',
            label:'半双工'
          },
        ],
        rateOptions:[
          {
            value:'1',
            label:'自动协商(默认)'
          },
          {
            value:'2',
            label:'10M'
          },
          {
            value:'3',
            label:'100M'
          },
          {
            value:'4',
            label:'1000M'
          },
        ],
        ports: [{
          "index":"0", "category":"", imgUrl:"static/port3.png"
        }],

        formLabelWidth: '100px',
        tooltipLabelWidth: '80px',
        powerButton: 'static/port3.png',
        type: 0,
      }
    },
    methods: {
      selectUrl(para) {
        if(para === "空闲")
        {
          return "static/port2.png"
        }
        else{
          return "static/port3.png"
        }
      },

      dialUp: function() {
        //buttonChange
        this.ifButtonVisible = false;
        this.loading = true;
        //formModified
        this.formDialUp.handle = 1;

        let para = Object.assign({}, this.formDialUp);
        console.log("in process of dialUp submit");
        console.log(para);
        console.log(typeof(para));

        dialUp(para).then(res);

        function res() {
          this.$message({
            message: '提交成功',
            type: 'success'
          });
        }

        this.stopSignal = setInterval( () =>{
          dialUp().then((res) => {
            console.log("response res:"+res);
            console.log("response res.data:"+res.data);
            console.log("response res.data.status:"+res.data.status);
            if(res.data.status === 200) {
              this.$refs['formDialUp'].resetFields();
              clearInterval( this.stopSignal );

              // buttonChange
              this.loading = false;
            }
            else{
              return true;
            }
          })
        }, 1000);
        // keep dialog alive
        this.WANInnerVisible = true;
        this.dialogFormVisible = true;

        /*
        dialUp(para).then((res) => {
          console.log(res.data);
          console.log(res.data.form);
          this.$message({
            message: '提交成功',
            type: 'success'
          });
          this.$refs['formDialUp'].resetFields();
          this.WANInnerVisible = true;
          this.dialogFormVisible = true;
          this.ifButtonVisible = false;
          this.loading = false;
        });*/
        //getPorts();
      },

      dialog: function(para){
        console.log(para);
        this.form.number = para;
        this.dialogFormVisible = true;
      },

      NextStep: function() {
        if(this.form.id === "LAN"){
          this.LANInnerVisible = true;
        }
        else if(this.form.id === "WAN"){
          this.WANInnerVisible = true;
        }
      },

      formPrevious: function() {
        //dialogChange();
        this.WANInnerVisible = false;
        this.LANInnerVisible = false;
      },

      formSubmit: function() {
        //dialogDisappear();
        this.dialogFormVisible = false;
        this.LANInnerVisible = false;
        this.WANInnerVisible = false;
        //dataBind();
        this.formDialUp.handle = 1;
        let index = this.form.number;
        //change icon status, need to finish
        this.ports[index].category = "1";
        clearInterval( this.stopSignal );
        //buttonChange();
        this.loading = false;
      },

      formCancel: function() {
        clearInterval( this.stopSignal );
        //dialogDisappear
        this.dialogFormVisible = false;
        this.LANInnerVisible = false;
        this.WANInnerVisible = false;
        //buttonChange
        this.ifButtonVisible = true;
        this.loading = false;
        //dataBind
        let index = this.form.number;
        this.ports[index].category = "空闲";    //change icon status
        this.formDialUp.handle = 0;

        let para = Object.assign({}, this.formDialUp);
        console.log("in form unbind "+this.formDialUp.handle);
        dialUp(para).then(() => {
          this.$message({
            message: '解绑成功',
            type: 'success'
          });
          //this.$refs['formDialUp'].resetFields();
        });
      },

      onSelect: function() {
        if(this.form.accessMethod === "3")
        {
          console.log("select ASDL");
          this.ifASDLVisible = true;
          this.formDialUp.index = this.form.number;
        }
        else{
          this.ifASDLVisible = false;
        }
      },

      getPortsInfo: function() {
        getPorts().then((res) => {
          this.ports = res.data.ports;
          console.log("ports response "+res);
          console.log("ports response data"+res.interfaces);
          console.log(this.ports);
        });
      },

    },

    mounted() {
      this.getPortsInfo();
    },
  }

</script>

<style scoped>
  .setting {
    margin: 10px;
    color: #909399;
  }

  .left, .right{
    border: 1px solid lightgrey;
    display: flex;
    padding: 0 20px;
    margin: 10px;
    height: 100px;
    align-items: center;
  }

  .icon{
    width: 10%;
    background-color: green;
  }

  .tip{
    display: inline-flex;
    width: 30%;
  }
  .tip1{
    display: inline-flex;
    width: 45%;
  }

  .bottomLine{
    line-height: 50px;
  }

  .wholeRouter{
    width: 800px;
    border: 1px solid lightgrey;
    background-color: ghostwhite;
    color: #909399;
    display: flex;
  }
  .power{
    border: 1px solid lightgrey;
    border-radius: 10px;
    text-align: center;
    margin: auto 20px;
    background-color: dodgerblue;
  }
  .powerButton{
    width: 60px;
    height:50px;
    margin: 25px 20px;
  }
  .router{
    border: 1px solid lightgrey;
    border-radius: 10px;
    margin: 10px 20px;
    background-color: lightgoldenrodyellow;
  }

  .routerInDialog {
    border: 1px solid lightgrey;
    border-radius: 10px;
    margin: auto;
    background-color: lightgoldenrodyellow;
    text-align: center;
  }

  .port{
    width: 60px;
    height:50px;
    border-radius: 5px;
    background-color: grey;
    display: inline-flex;
    text-align: center;
    margin: 25px 20px;
  }

  .portInDialog{
    width: 60px;
    height:50px;
    border-radius: 5px;
    background-color: grey;
    display: inline-flex;
    margin: 25px 10px;
  }

  .textArea{
    margin-top: 0;
  }
  .text{
    font-weight: bold;
    margin: 0;
  }

  .advancedSetting{
    margin-bottom: 20px;
  }
  .tooltip-content{
    min-width: 150px;
    border: 0;
  }

  h2{
    font-family: Roboto-Thin,serif;
  }

  @font-face{
    font-family:Roboto-Thin;
    src: url("../../assets/font/Roboto-Thin.ttf");
  }


</style>
