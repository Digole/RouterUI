<template>
  <section>
    <div class="line_02"><span>终端监控</span></div>

    <el-row :gutter="0" class="setting">
      <el-col :md="9" :lg="9" :xl="9">
        <div class="left">
          <div class="icon-div">
            <svg class="icon-big"><use xlink:href="#icon-wan"></use></svg>
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
          <div class="icon-div">
            <svg class="icon-big"><use xlink:href="#icon-pc"></use></svg>
          </div>
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
          <div v-for="(item, index) in ports" class="port" @click="dialog(index)" :key="index">
            <div>
              <el-tooltip class="item" effect="light">
                <img style="width: 60px; height: 50px; border-radius: 5px;" :src=selectUrl(item.linkstatus) />
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
          <el-button type="danger" @click="formCancel">退  出</el-button>
          <el-button type="danger" @click="formPrevious">上一步</el-button>
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
        <el-form :model="form" label-position="left" size="small" ref="form">
          <el-form-item label="接入方式" :label-width="formLabelWidth" prop="accessMethod">
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
            <el-form-item label="账号" :label-width="formLabelWidth" prop="account">
              <el-input  v-model="formDialUp.account" auto-complete="off" :disabled="!isGottonStatus"></el-input>
            </el-form-item>
            <el-form-item label="密码" :label-width="formLabelWidth" prop="pass">
              <el-input v-model="formDialUp.passwd" auto-complete="off" :disabled="!isGottonStatus"></el-input>
            </el-form-item>
            <el-form-item label="状态" v-model="formDialUp.status" :label-width="formLabelWidth" prop="status" v-loading="!isGottonStatus">
              {{formDialUp.status}}
              <el-button type="primary" @click="dialLink" style="margin-left: 20px" v-loading="loading" :disabled="isInCancel">连接</el-button>
              <el-button type="danger" @click="dialCancel" style="margin-left: 20px" v-loading="isInCancel" v-if="loading">取消</el-button>
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
            <el-input v-model="form.primaryDNS" :disabled="ifASDLVisible" auto-complete="off" style="width: 70%;"></el-input>
            <el-button type="primary" :disabled="ifASDLVisible" @click="pushDNS">设置</el-button>
          </el-form-item>
          <el-form-item label="备选DNS" :label-width="formLabelWidth">
            <el-input v-model="form.secondaryDNS" :disabled="ifASDLVisible" auto-complete="off" style="width: 70%;"></el-input>
            <el-button type="primary" :disabled="ifASDLVisible" @click="$router.push({ path: '../DNS' })">设置</el-button>
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
        <el-button type="danger" @click="unbind">解 绑</el-button>
        <el-button type="primary" @click="NextStep">下一步</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import { getPorts, dialUp } from '../../api/api'

export default {
  name: 'IN-EX_network',
  data() {
    return {
      dialogFormVisible: false, //控制点击port之后的父级dialog
      LANInnerVisible: false, //LAN的子级dialog
      WANInnerVisible: false, //WAN的子级dialog
      ifASDLVisible: false, //控制ASDL选项是否显示
      ifButtonVisible: true, //控制上一步按钮是否显示
      loading: false, //控制ASDL连接时的加载动画
      stopSignal: Number,
      stopSignal2: Number,
      form: {
        number: '', //端口编号，唯一，通过index确认端口
        use: '', //选择功能LAN/WAN
        IP: '',
        mask: '', //子网掩码
        gateway: '', //网关
        mode: '1', //工作模式
        rate: '1', //网卡速率 lan
        control: '', //lan互访控制
        accessMethod: '1', //接入方式
        primaryDNS: '', //首选DNS
        secondaryDNS: '', //备选DNS
        status: '未连接' //连接状态，ASDL使用该属性
      },
      formDialUp: {
        webindex: '',
        account: '',
        passwd: '',
        status: '未连接',
        handle: 0 //后台用,勿删
      },
      tooltip: {
        number: ''
      },
      options: [
        {
          value: '1',
          label: '静态IP(固定IP)'
        },
        {
          value: '2',
          label: 'DHCP(动态获取)'
        },
        {
          value: '3',
          label: 'ASDL/PPPoE拨号'
        }
      ],
      modeOptions: [
        {
          value: '1',
          label: '自动协商(默认)'
        },
        {
          value: '2',
          label: '全双工'
        },
        {
          value: '3',
          label: '半双工'
        }
      ],
      rateOptions: [
        {
          value: '1',
          label: '自动协商(默认)'
        },
        {
          value: '2',
          label: '10M'
        },
        {
          value: '3',
          label: '100M'
        },
        {
          value: '4',
          label: '1000M'
        }
      ],
      ports: [
        {
          ename: '',
          devname: '',
          linkstatus: '',
          function: '',
          ip: '',
          netmask: '',
          mac: '',
          speed: ''
        }
      ],

      formLabelWidth: '100px',
      tooltipLabelWidth: '80px',
      powerButton: 'static/port3.png',
      type: 0,
      // 是否取消dial请求中
      isInCancel: false,
      isGottonStatus: false
    }
  },
  watch: {
    dialogFormVisible: {
      handler: function() {
        if (this.dialogFormVisible === false) {
          clearInterval(this.stopSignal)
          clearInterval(this.stopSignal2)
          this.$refs['formDialUp'].resetFields()
          this.$refs['form'].resetFields()
          this.ifASDLVisible = false
          this.loading = false
          this.ifButtonVisible = true
          console.log('hello')
        }
      }
    }
  },
  methods: {
    //选择LAN,WAN口对应图标
    selectUrl(para) {
      // if(para === "空闲")
      if (para === 'off') {
        return 'static/port2.png'
      } else {
        return 'static/port3.png'
      }
    },
    //选择router页面里的图标
    selectIcon(para) {
      if (para === 'WAN') {
        return '#icon-wan'
      } else if (para === 'LAN') {
        return '#icon-pc'
      } else {
        return false
      }
    },

    dialog: function(para) {
      console.log(para)
      // 获得需要处理的端口的编号
      this.formDialUp.webindex = para
      this.dialogFormVisible = true
    },

    NextStep: function() {
      if (this.form.id === 'LAN') {
        this.LANInnerVisible = true
      } else if (this.form.id === 'WAN') {
        this.WANInnerVisible = true
      }
    },

    formPrevious: function() {
      //dialogChange();
      this.WANInnerVisible = false
      this.LANInnerVisible = false
    },

    onSelect: function() {
      if (this.form.accessMethod === '3') {
        this.ifASDLVisible = true

        let para = Object.assign({}, this.formDialUp)
        para.handle = 2
        this.isGottonStatus = false

        dialUp(para).then((res) => {
          if (res.data.code === 200) {
            this.isGottonStatus = true
            // this.formDialUp.status = res.data.status;
            this.translate(res.data.status)
            this.$refs['formDialUp'].resetFields()
          } else {
            this.isGottonStatus = true
            this.formDialUp.status = '获取失败！'
            this.$refs['formDialUp'].resetFields()
          }
        })
      } else {
        this.ifASDLVisible = false
      }
    },

    translate: function(val) {
      if (val === 'run') {
        this.formDialUp.status = '拨号成功'
        // buttonChange
        this.loading = false
      }
      if (val === 'init') {
        this.formDialUp.status = '拨号初始化'
      }
      if (val === 'auth') {
        this.formDialUp.status = '拨号验证'
      }

      if (val === 'disconnect') {
        this.formDialUp.status = '用户验证'
      }
      if (val === 'dead') {
        this.formDialUp.status = '验证失败'
      }
      if (val === '300') {
        this.formDialUp.status = '拨号次数已达上限'
      }
    },

    dialLink: function() {
      //buttonChange
      this.ifButtonVisible = false
      this.loading = true
      //formModified
      // handle = 1的意义是拨号连接
      this.formDialUp.handle = 1

      let para = Object.assign({}, this.formDialUp)

      dialUp(para).then(res => {
        if (res.data.code === 200) {
          this.translate(res.data.status)
        }
      })
      // .then(() => {
      //    this.$message({
      //     message: '提交成功',
      //     type: 'success'
      //   });
      // })

      this.stopSignal = setInterval(() => {
        // handle = 2的意义是获取状态
        para.handle = 2
        dialUp(para).then(res => {
          if (res.data.code === 200) {
            this.translate(res.data.status)
          }
          if (res.data.code === '300') {
            clearInterval(this.stopSignal)
          }
        })
      }, 1000)
      // keep dialog alive
      this.WANInnerVisible = true
      this.dialogFormVisible = true
      this.$refs['form'].resetFields()
      this.$refs['formDialUp'].resetFields()
    },

    dialCancel() {
      this.loading = false
      clearInterval(this.stopSignal)
      let para = Object.assign({}, this.formDialUp)
      para.handle = 0
      this.stopSignal2 = setInterval(() => {
        this.isInCancel = true
        dialUp(para).then(res => {
          if (res.data.code === 200) {
            clearInterval(this.stopSignal2)
            this.isInCancel = false
            // this.$refs['formDialUp'].resetFields();
          }
        })
      }, 1000)
      // this.$refs['form'].resetFields()
    },

    formSubmit: function() {
      //dialogDisappear();
      this.dialogFormVisible = false
      this.LANInnerVisible = false
      this.WANInnerVisible = false
      //dataBind();
      this.formDialUp.handle = 1
      // let index = this.form.number
      //change icon status, need to finish
      this.getPortsInfo()
      clearInterval(this.stopSignal)
      //buttonChange();
      this.loading = false
      this.$refs['form'].resetFields()
    },

    formCancel: function() {
      this.ifASDLVisible = false
      clearInterval(this.stopSignal)
      //dialogDisappear
      this.dialogFormVisible = false
      this.LANInnerVisible = false
      this.WANInnerVisible = false
      //buttonChange
      this.ifButtonVisible = true
      this.loading = false
      this.$refs['formDialUp'].resetFields()
      this.isGottonStatus = true
      this.$refs['form'].resetFields()
    },

    unbind: function() {
      clearInterval(this.stopSignal)
      //dialogDisappear
      this.dialogFormVisible = false
      this.LANInnerVisible = false
      this.WANInnerVisible = false
      //buttonChange
      this.ifButtonVisible = true
      this.loading = false
      //dataBind
      let index = this.formDialUp.webindex
      this.ports[index].function = 'NORMAL' //change icon status

      let para = Object.assign({}, this.formDialUp)
      para.handle = 0
      // console.log("in form unbind "+this.formDialUp.handle);
      dialUp(para).then(() => {
        this.$message({
          message: '解绑成功',
          type: 'success'
        })
        this.$refs['formDialUp'].resetFields()
      })
      this.$refs['form'].resetFields()
    },

    getPortsInfo: function() {
      getPorts().then(res => {
        this.wanLimit = res.data.wancount
        this.lanLimit = res.data.lancount
        let lanCount = 0
        let wanCount = 0
        for (let i = 0; i < res.data.interfaces.length; i++) {
          if (res.data.interfaces[i].function.toLowerCase() === 'wan') {
            wanCount++
            console.log('wanCount is ' + wanCount)
          }
          if (res.data.interfaces[i].function.toLowerCase() === 'lan') {
            lanCount++
            console.log('lanCount is ' + lanCount)
          }
        }
        this.lanCount = lanCount
        this.wanCount = wanCount

        // 根据webindex排序，确保端口顺序正确
        function sortNumber(a, b) {
          return a.webindex - b.webindex
        }
        res.data.interfaces.sort(sortNumber)

        // console.log("get feedback, res.data.interfaces is: "+res.data.interfaces);
        this.checked = JSON.parse(JSON.stringify(res.data.code))
        // console.log("code is "+JSON.stringify(res.data.code));
        this.ports = JSON.parse(JSON.stringify(res.data.interfaces))
        console.log(
          'after parse, the port[] is: ' + JSON.stringify(res.data.interfaces)
        )
      })
    },

    pushDNS: function() {
      this.$store.commit('changeRoutePush', true)
      this.$router.push({ path: '../DNS' })
    }
  },

  mounted() {
    this.getPortsInfo()
  }
}
</script>

<style scoped>
.setting {
  margin: 10px;
  color: #909399;
}

.left,
.right {
  border: 1px solid lightgrey;
  display: flex;
  padding: 0 20px;
  margin: 10px;
  height: 100px;
  align-items: center;
}

.icon-div {
  height: 20px;
  width: 20px;
  margin-right: 5px;
}
.icon-big {
  height: 100%;
  width: 100%;
}

.tip {
  display: flex;
  width: 30%;
}
.tip1 {
  display: flex;
  width: 45%;
}
.bottomLine {
  line-height: 50px;
}

.wholeRouter {
  width: 65%;
  border: 1px solid lightgrey;
  background-color: ghostwhite;
  color: #909399;
  display: flex;
}

.power {
  border: 1px solid lightgrey;
  border-radius: 10px;
  text-align: center;
  margin: auto;
  background-color: dodgerblue;
}
.powerButton {
  width: 60px;
  height: 50px;
  margin: 25px 20px;
}
.router {
  width: 75%;
  border: 1px solid lightgrey;
  border-radius: 10px;
  margin: 10px 20px;
  background-color: lightgoldenrodyellow;
  display: flex;
  flex-wrap: wrap;
}

.routerInDialog {
  border: 1px solid lightgrey;
  border-radius: 10px;
  margin: auto;
  background-color: lightgoldenrodyellow;
  text-align: center;
}

.port {
  width: 60px;
  height: 50px;
  text-align: center;
  margin: 25px auto;
  flex-grow: 1;
  border-radius: 5px;
}

.port img:hover {
  cursor: pointer;
}

.portInDialog {
  width: 60px;
  height: 50px;
  border-radius: 5px;
  background-color: grey;
  display: inline-flex;
  margin: 25px 10px;
}

.text {
  font-weight: bold;
}
.textArea p {
  margin: 0;
}

.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.advancedSetting {
  margin-bottom: 20px;
}
.tooltip-content {
  min-width: 150px;
  border: 0;
}

h2 {
  font-family: Roboto-Thin, serif;
}

@font-face {
  font-family: Roboto-Thin;
  src: url("../../assets/font/Roboto-Thin.ttf");
}
</style>
