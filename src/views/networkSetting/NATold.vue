<template>
  <section>
    <div>
      <div class="line_02"><span>NAT转发</span></div>

      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true">
          <el-form-item>
            <el-button type="primary" @click="handleNatAdd">添加</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="danger">删除</el-button>
          </el-form-item>
        </el-form>
      </el-col>

      <el-table style="width: 100%" :header-cell-style="headerStyle">
        <el-table-column type="selection" min-width="30">
        </el-table-column>
        <el-table-column prop="currentLAN"  label="LAN口" min-width="120">
        </el-table-column>
        <el-table-column prop="currentWAN"  label="WAN口" min-width="120">
        </el-table-column>
        <el-table-column prop="currentRandomPort"  label="随机端口使用情况" min-width="180">
        </el-table-column>
        <el-table-column prop="networkAlias"  label="网络别名" min-width="120">
        </el-table-column>
        <el-table-column label="操作" min-width="150">
          <template slot-scope="scope">
            <el-button size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div>

      <div class="line_02"><span>端口映射</span></div>

      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true">
          <el-form-item>
            <el-button type="primary" @click="handlePortAdd">添加</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="danger">删除</el-button>
          </el-form-item>
        </el-form>
      </el-col>

      <el-table style="width: 100%" :header-cell-style="headerStyle">
        <el-table-column type="selection" min-width="30">
        </el-table-column>
        <el-table-column prop="outsidePort"  label="外网端口" min-width="120">
        </el-table-column>
        <el-table-column prop="innerPort"  label="内网端口" min-width="120">
        </el-table-column>
        <el-table-column prop="innerIPBeginning"  label="内网起始IP" min-width="120">
        </el-table-column>
        <el-table-column prop="numOfInner"  label="内网个数" min-width="120">
        </el-table-column>
        <el-table-column prop="protocol"  label="协议" min-width="120">
        </el-table-column>
        <el-table-column label="操作" min-width="150">
          <template slot-scope="scope">
            <el-button size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!--NAT新增界面-->
    <el-dialog title="NAT转发" :visible.sync="natFormVisible" width="30%">

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

          <!--pic of ports-->
          <div class="router">
            <div class="routerInDialog">
              <div v-for="(item, index) in ports" :key="index" class="portInDialog" :class="{ cursor: cursorType }" 
              @click="dialog(index)" @mouseover="changeCursor(index)">
                <div>
                  <img style="width: 60px; height: 50px; border-radius: 5px;" :src=selectUrl(item.category) />
                  <div class="textArea">
                    <p class="text">en{{index}}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!--components of collapse-->
          <el-collapse class="advancedSetting">
            <el-collapse-item title="高级设置" name="1">
              <el-form :model="form" label-position="left" size="small">
                <el-form-item label="IP地址" :label-width="formLabelWidth">
                  <el-input v-model="form.IP"></el-input>
                </el-form-item>
                <el-form-item label="别名设置" :label-width="formLabelWidth">
                  <el-input v-model="form.IP"></el-input>
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
          <el-form  :model="formNATDialUp" ref="formNATDialUp" v-show="ifASDLVisible">
            <el-form-item label="账号" :label-width="formLabelWidth">
              <el-input  v-model="formNATDialUp.account" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass" :label-width="formLabelWidth">
              <el-input v-model="formNATDialUp.passwd" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="状态" v-model="formNATDialUp.status" :label-width="formLabelWidth"  v-loading="loading">
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
        </el-form>

        <!--components of collapse-->
        <el-collapse class="advancedSetting">
          <el-collapse-item title="选择网口" name="1">
            <el-form :model="form" label-position="left" size="small">
              <el-form-item label="IP地址" :label-width="formLabelWidth">
                <el-input v-model="form.IP"></el-input>
              </el-form-item>
              <el-form-item label="别名设置" :label-width="formLabelWidth">
                <el-input v-model="form.IP"></el-input>
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

    <!--端口映射新增界面-->
    <el-dialog title="新增" :visible.sync="portFormVisible">
      <el-form label-width="80px" ref="addFort">
        <el-form-item label="外网端口" prop="outPort">
          <el-input v-model="addFormPort.outPort" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="内网端口" prop="innerPort">
          <el-input v-model="addFormPort.innerPort" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="内网起始IP" prop="innerIPBeginning">
          <el-input v-model="addFormPort.innerIPBeginning" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="内网个数" prop="NumOfInner">
          <el-input v-model="addFormPort.numOfInner" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="协议" prop="protocol">
          <el-input v-model="addFormPort.protocol" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addFormVisible = false">取消</el-button>
        <el-button type="primary">提交</el-button>
      </div>
    </el-dialog>

  </section>
</template>

<script>
  import { getPorts, dialUp } from '../../api/api'

export default {
    name: 'NAT',

    data(){
      return{
        natFormVisible: false,
        portFormVisible: false,
        LANInnerVisible: false,           //LAN的子级dialog
        WANInnerVisible: false,           //WAN的子级dialog
        ifButtonVisible: true,            //控制上一步按钮是否显示
        ifASDLVisible: false,
        loading: false,
        cursorType: false,
        formLabelWidth: '100px',
        ports:[],
        addForm:{
          lan:'',
          wan:'',
          currentRandomPort:'',
          networkAlias:''
        },
        addFormPort:{
          outPort:'',
          innerPort:'',
          innerIPBeginning:'',
          numOfInner:'',
          protocol:''
        },
        form: {
          number: '',                     //端口编号，唯一，通过index确认端口
          id: '',
          IP:'',
          mask:'',                        //子网掩码
          gateway:'',                     //网关
          accessMethod:'',
          status:'未连接',
        },
        formNATDialUp: {
          index: '',
          account: '',
          passwd: '',
          status: '未连接',
          handle: 0,            //后台用,勿删
        },
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
      }
    },

    methods:{
      headerStyle() {
        return this.header()
      },

      selectUrl(para) {
        if(para === '空闲')
        {
          return 'static/port2.png'
        }
        else{
          return 'static/port3.png'
        }
      },

      handleNatAdd() {
        this.natFormVisible = true
      },

      handlePortAdd() {
        this.portFormVisible = true
      },

      dialog: function(para) {
        console.log(para)
      },

      changeCursor: function(para) {
        if(this.ports[para].category !== '空闲') {
          this.cursorType = true
        }
        else{
          this.cursorType = false
        }
      },

      NextStep: function() {
        if(this.form.id === 'LAN'){
          this.LANInnerVisible = true
        }
        else if(this.form.id === 'WAN'){
          this.WANInnerVisible = true
        }
      },

      formCancel: function() {
        clearInterval( this.stopSignal )
        this.natFormVisible = false
        this.LANInnerVisible = false           //LAN的子级dialog
        this.WANInnerVisible = false         //WAN的子级dialog
        this.loading = false
      },

      dialUp: function() {
        //buttonChange
        this.ifButtonVisible = false
        this.loading = true
        //formModified
        this.formNATDialUp.handle = 1

        let para = Object.assign({}, this.formNATDialUp)
        console.log('in process of dialUp submit')
        console.log(para)
        console.log(typeof(para))

        //dialUp(para).then(res);

        this.stopSignal = setInterval( () =>{
          dialUp().then((res) => {
            console.log('response res:'+res)
            console.log('response res.data:'+res.data)
            console.log('response res.data.status:'+res.data.status)
            if(res.data.status === 200) {
              this.$refs['formDialUp'].resetFields()
              clearInterval( this.stopSignal )

              // buttonChange
              this.loading = false
            }
            else{
              return true
            }
          })
        }, 1000)
        // keep dialog alive
        this.WANInnerVisible = true
        this.dialogFormVisible = true

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

      formPrevious: function() {
        //dialogChange();
        this.WANInnerVisible = false
        this.LANInnerVisible = false
      },

      formSubmit: function() {
        //dialogDisappear();
        this.natFormVisible = false
        this.LANInnerVisible = false
        this.WANInnerVisible = false
        //dataBind();
        this.formNATDialUp.handle = 1
        let index = this.form.number
        //change icon status, need to finish
        this.ports[index].category = '1'
        clearInterval( this.stopSignal )
        //buttonChange();
        this.loading = false
      },

      unbind: function() {
        clearInterval( this.stopSignal )
        //dialogDisappear
        this.LANInnerVisible = false
        this.WANInnerVisible = false
        //buttonChange
        this.ifButtonVisible = true
        this.loading = false
        //dataBind
        let index = this.form.number
        this.ports[index].category = '空闲'    //change icon status
        this.formDialUp.handle = 0

        let para = Object.assign({}, this.formDialUp)
        console.log('in form unbind '+this.formDialUp.handle)
        dialUp(para).then(() => {
          this.$message({
            message: '解绑成功',
            type: 'success'
          })
        //this.$refs['formDialUp'].resetFields();
        })
      },

      onSelect: function() {
        if(this.form.accessMethod === '3')
        {
          console.log('select ASDL')
          this.ifASDLVisible = true
        }
        else{
          this.ifASDLVisible = false
        }
      },

      getPortsInfo: function() {
        getPorts().then((res) => {
          this.ports = res.data.ports
          console.log('ports response '+res)
          console.log('ports response data'+res.interfaces)
          console.log(this.ports)
        })
      },
    },

    mounted() {
      this.getPortsInfo()
    }
  }
</script>

<style scoped>
  .router{
    border: 1px solid lightgrey;
    border-radius: 10px;
    margin: 10px 20px;
    background-color: lightgoldenrodyellow;
    padding: 0 10px 10px 10px;
    text-align: center;
  }

  .portInDialog{
    width: 60px;
    height: 50px;
    border-radius: 5px;
    background-color: grey;
    display: inline-flex;
    margin: 20px 10px;
  }

  .textArea{
    margin-top: 0;
    text-align: center;
  }

  .text{
    font-weight: bold;
    margin: 0;
  }

  .cursor {
    cursor: pointer;
  }
</style>
