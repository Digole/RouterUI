<template>
  <div>

    <div class="line_02">
      <span>{{$t('securitySetting.firewall')}}</span>
    </div>

    <el-col :span="24">
      <el-form :inline="true">
        <el-form-item>
          <el-button type="primary" @click="handleAdd">{{$t('securitySetting.add')}}</el-button>
        </el-form-item>
        <el-form-item>
         <!-- wyk1011删除启用停用按钮-->
          <!--el-button type="primary" @click="handleEnable">{{$t('securitySetting.start')}}</el-button>                 
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="handleDisable">{{$t('securitySetting.stop')}}</el-button>
        </el-form-item-->
        <!--el-form-item>
          <el-input v-model="portChoosen" placeholder="根据网口搜索" style="width: 100%;"></el-input>
        </el-form-item-->
        <el-select v-model="portChoosen" placeholder="根据网口搜索">
        <el-option v-for="item in selectList" :key="item.name" :label="item.name" :value="item.name"></el-option>
      </el-select>
        <el-form-item>
          <el-button @click.native="search" type="primary">{{$t('operation.search')}}</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!-- <el-table :data="rulesList" :header-cell-style="headerStyle">
      <el-table-column prop="port" label="网口" align="center"></el-table-column>
      <el-table-column label="IP策略" align="center">
        <el-table-column prop="ips" label="开始地址" align="center"></el-table-column>
        <el-table-column prop="ipe" label="结束地址" align="center"></el-table-column>
      </el-table-column>
      <el-table-column label="MAC策略" align="center">
        <el-table-column prop="mac" label="MAC地址" align="center"></el-table-column>
      </el-table-column>
      <el-table-column label="TCP策略" align="center">
        <el-table-column prop="tcps" label="开始端口" align="center"></el-table-column>
        <el-table-column prop="tcpe" label="结束端口" align="center"></el-table-column>
      </el-table-column>
      <el-table-column label="UDP策略" align="center">
        <el-table-column prop="udps" label="开始端口" align="center"></el-table-column>
        <el-table-column prop="udpe" label="结束端口" align="center"></el-table-column>
      </el-table-column>
      <el-table-column prop="enable" align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="deleteRule(scope.$index, scope.row)">{{$t('operation.delete')}}</el-button>
        </template>
      </el-table-column>
    </el-table> -->

    <el-table :data="rulesList" :header-cell-style="headerStyle">
      <el-table-column prop="port" :label="$t('securitySetting.port')" align="center"></el-table-column>
      <el-table-column prop="type" :label="$t('securitySetting.type')" align="center"></el-table-column>
      <el-table-column prop="ipSE" :label="$t('securitySetting.ipSE')" align="center"></el-table-column>
      <el-table-column prop="mac" :label="$t('securitySetting.mac')" align="center"></el-table-column>
      <el-table-column prop="portSE" :label="$t('securitySetting.portSE')" align="center"></el-table-column>
      <el-table-column prop="status" :label="$t('securitySetting.status')" align="center"></el-table-column>
      <el-table-column prop="enable" align="center" :label="$t('securitySetting.enable')"></el-table-column>
      <el-table-column prop="direct" align="center" :label="$t('securitySetting.direct')"></el-table-column>
      <el-table-column prop="mangle" align="center" :label="$t('securitySetting.mangle')">   </el-table-column>
      <el-table-column prop="mangle" align="center" :label="$t('securitySetting.role')"> 
        <template slot-scope="scope">
          <el-button type="text" @click="deleteRule(scope.$index, scope.row)">{{$t('operation.delete')}}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination 
      layout="prev, pager, next" 
      @current-change="handleCurrentChange" 
      :page-size="10" 
      :total="total" 
      style="float:right;">
    </el-pagination>
 <!-- wyk1011删除启用停用按钮-->
    <!-- 禁用网卡页面 
    <el-dialog :title="$t('securitySetting.disablePort')" :visible.sync="isInDisabling">
      <el-select v-model="disablePort" placeholder="请选择禁用网卡">
        <el-option v-for="item in disablePortList" :label="item" :value="item" :key="item"></el-option>
      </el-select>
      <el-button @click="disableSubmit" type="danger">{{$t('securitySetting.disableSubmit')}}</el-button>
      <el-button @click="enableCancle">{{$t('securitySetting.Cancle')}}</el-button>
    </el-dialog>-->

    <!-- 启用网卡页面 
    <el-dialog :title="$t('securitySetting.isInEnabling')" :visible.sync="isInEnabling">
      <el-select v-model="enablePort" placeholder="请选择启用网卡">
        <el-option v-for="item in enablePortList" :label="item" :value="item" :key="item"></el-option>
      </el-select>
      <el-button @click="enableSubmit" type="primary">{{$t('securitySetting.enableSubmit')}}</el-button>
      <el-button @click="enableCancle">{{$t('securitySetting.Cancle')}}</el-button>
    </el-dialog>-->

    <!-- 添加页面 策略/端口选择 -->
    <el-dialog :title="$t('securitySetting.selectStrategy')" :visible.sync="isAdding">
      <el-select v-model="ifaceChoosen" placeholder="请选择端口">
        <el-option v-for="item in nameList" :key="item.name" :label="item.name" :value="item.name"></el-option>
      </el-select>
      <el-select v-model="rulesChoosen" placeholder="请选择策略">
        <el-option v-for="item in list" :key="item.value" :label="item.name" :value="item.value"></el-option>
      </el-select>
      <div slot="footer">
        <el-button @click="addPortCancel">{{$t('operation.cancel')}}</el-button>
        <el-button @click="addNext">{{$t('operation.next')}}</el-button>
      </div>
    </el-dialog>

    <!-- TCP的策略页面 -->
    <el-dialog :title="$t('securitySetting.isTcpRule')" :visible.sync="isTcpRule">
      <el-form :model="addForm" ref="addForm" :rules="validateRules">
        <el-form-item prop="ips" :label="$t('securitySetting.ips')">
          <el-input v-model="addForm.ips" class="tcp1"></el-input>
        </el-form-item>
        <el-form-item prop="ipe" :label="$t('securitySetting.ipe')">
          <el-input v-model="addForm.ipe" class="tcp1"></el-input>
        </el-form-item>
        <el-form-item prop="tcps" :label="$t('securitySetting.tcps')">
          <el-input v-model="addForm.ports"></el-input>
        </el-form-item>
        <el-form-item prop="tcpe" :label="$t('securitySetting.tcpe')">
          <el-input v-model="addForm.porte"></el-input>
        </el-form-item>
        <el-form-item  :label="$t('securitySetting.direct')">               
        <el-select v-model="directChoosen" placeholder="请选择报文方向" class="tcp2">             <!-- wyk添加报文方向以及策略类型，后面每个新增都添加了 -->
        <el-option v-for="item in directList" :key="item.value" :label="item.name" :value="item.value"></el-option>
      </el-select>
      </el-form-item>
       <el-form-item  :label="$t('securitySetting.mangle')">
      <el-select v-model="mangleChoosen" placeholder="请选择策略类型" class="tcp2">                <!-- wyk修改格式使输入框对齐，后面都是这个-->
        <el-option v-for="item in mangleList" :key="item.value" :label="item.name" :value="item.value"></el-option>
      </el-select>
      </el-form-item>
      </el-form>
     
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addCancel">{{$t('operation.cancel')}}</el-button>
        <el-button @click.native="addSubmit" type="primary">{{$t('operation.submit')}}</el-button>
      </div>
    </el-dialog>

    <!-- UDP策略 -->
    <el-dialog :title="$t('securitySetting.isUdpRule')" :visible.sync="isUdpRule">
      <el-form :model="addForm" ref="addForm" :rules="validateRules">
        <el-form-item prop="ips" :label="$t('securitySetting.ips')">
          <el-input class="udp1" v-model="addForm.ips"></el-input>
        </el-form-item>
        <el-form-item prop="ipe" :label="$t('securitySetting.ipe')">
          <el-input class="udp1" v-model="addForm.ipe"></el-input>
        </el-form-item>
        <el-form-item prop="udps" :label="$t('securitySetting.udps')">
          <el-input v-model="addForm.ports"></el-input>
        </el-form-item>
        <el-form-item prop="udpe" :label="$t('securitySetting.udpe')">
          <el-input v-model="addForm.porte"></el-input>
        </el-form-item>
        <el-form-item  :label="$t('securitySetting.direct')">
        <el-select class="udp2" v-model="directChoosen" placeholder="请选择报文方向">
        <el-option v-for="item in directList" :key="item.value" :label="item.name" :value="item.value"></el-option>
      </el-select>
      </el-form-item>
       <el-form-item  :label="$t('securitySetting.mangle')">
      <el-select class="udp2" v-model="mangleChoosen" placeholder="请选择策略类型">
        <el-option v-for="item in mangleList" :key="item.value" :label="item.name" :value="item.value"></el-option>
      </el-select>
      </el-form-item>
      </el-form>
      
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addCancel">{{$t('operation.cancel')}}</el-button>
        <el-button @click.native="addSubmit" type="primary">{{$t('operation.submit')}}</el-button>
      </div>
    </el-dialog>

    <!-- IP策略 -->
    <el-dialog :title="$t('securitySetting.isIpRule')" :visible.sync="isIpRule">
      <el-form :model="addForm" ref="addForm" :rules="validateRules">
        <el-form-item prop="ips" :label="$t('securitySetting.ips')">
          <el-input v-model="addForm.ips"></el-input>
        </el-form-item>
        <el-form-item prop="ipe" :label="$t('securitySetting.ipe')">
          <el-input v-model="addForm.ipe"></el-input>
        </el-form-item>
        <el-form-item  :label="$t('securitySetting.direct')">
        <el-select class="ip1" v-model="directChoosen" placeholder="请选择报文方向">
        <el-option v-for="item in directList" :key="item.value" :label="item.name" :value="item.value"></el-option>
      </el-select>
      </el-form-item>
       <el-form-item  :label="$t('securitySetting.mangle')">
      <el-select class="ip1" v-model="mangleChoosen" placeholder="请选择策略类型">
        <el-option v-for="item in mangleList" :key="item.value" :label="item.name" :value="item.value"></el-option>
      </el-select>
      </el-form-item>
      </el-form>
      
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addCancel">{{$t('operation.cancel')}}</el-button>
        <el-button @click.native="addSubmit" type="primary">{{$t('operation.submit')}}</el-button>
      </div>
    </el-dialog>

    <!-- mac策略 -->
    <el-dialog :title="$t('securitySetting.isMacRule')" :visible.sync="isMacRule">
      <el-form :model="addForm" ref="addForm" :rules="validateRules">
        <el-form-item  prop="mac" :label="$t('securitySetting.mac')">
          <el-input  v-model="addForm.mac"></el-input>
        </el-form-item>
        <el-form-item  :label="$t('securitySetting.direct')">
        <el-select  class="mac1" v-model="directChoosen" placeholder="请选择报文方向">
        <el-option v-for="item in directList" :key="item.value" :label="item.name" :value="item.value"></el-option>
      </el-select>
      </el-form-item>
       <el-form-item  :label="$t('securitySetting.mangle')">
      <el-select  class="mac1" v-model="mangleChoosen" placeholder="请选择策略类型">
        <el-option v-for="item in mangleList" :key="item.value" :label="item.name" :value="item.value"></el-option>
      </el-select>
      </el-form-item>
      </el-form>
      
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addCancel">{{$t('operation.cancel')}}</el-button>
        <el-button @click.native="addSubmit" type="primary">{{$t('operation.submit')}}</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { handle, showInfo, getPorts } from '@/api/api.js'
import validate from '@/utils/rules.js'
export default {
  name: 'firewall',
  data() {
    return {
      rulesList: [],
      rulesTable: {},
      directList: [
        {
          value: 'input',
          name: '报文输入'
        },
        {
          value: 'output',
          name: '报文输出'
        }
      ],
      mangleList: [
        {
          value: 'allow',
          name: '允许通过'
        },
        {
          value: 'deny',
          name: '禁止通过'
        }
      ],
      list: [
        {
          value: 'ip',
          name: 'IP策略'
        },
        {
          value: 'mac',
          name: 'MAC策略'
        },
        {
          value: 'tcp',
          name: 'TCP策略'
        },
        {
          value: 'udp',
          name: 'UDP策略'
        }
      ],
      isAdding: false,
      isInDisabling: false,
      isInEnabling: false,
      isTcpRule: false,
      isUdpRule: false,
      isIpRule: false,
      isMacRule: false,
      currentFunction: '',
      nameList: [], // 当前ports的名称
      selectList: [], // 搜索用的port
      disablePort: '',
      enablePort: '',
      disablePortList: '',
      enablePortList: '',

      directChoosen: '',
      mangleChoosen: '',
      rulesChoosen: '',
      ifaceChoosen: '',

      portChoosen: '',
      addForm: {},
      enlist: [],

      portStorage: '',
      typeStorage: '',
      enableStorage: '',

      total: 0,
      currentPage: 1,
      pagesize: 10,

      ports: [],
      rules: [],

      validateRules: {
        ips: [
          {
            validator: validate('ip', '请输入正确IP', 'IP不能为空！'),
            trigger: 'blur'
          }
        ],
        ipe: [
          {
            validator: validate('ip', '请输入正确IP', 'IP不能为空！'),
            trigger: 'blur'
          }
        ],

        mac: [
          {
            validator: validate('mac', '请输入正确MAC', 'MAC不能为空！'),
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    headerStyle() {
      return this.header()
    },
    handleCurrentChange() {},
    /* handleDisable() {                       //wyk1011删除启用停用按钮
      this.isInDisabling = true
    },

    handleEnable() {
      this.isInEnabling = true
    }, */
    handleAdd() {
      this.isAdding = true
    },
    addPortCancel() {
      this.isAdding = false
      this.$refs['addForm'].resetFields()
      this.rulesChoosen = ''
      this.ifaceChoosen = ''
    },
    addNext() {
      this.isAdding = false

      switch (this.rulesChoosen) {
        case 'tcp':
          this.isTcpRule = true
          break
        case 'udp':
          this.isUdpRule = true
          break
        case 'ip':
          this.isIpRule = true
          break
        case 'mac':
          this.isMacRule = true
          break
      }
    },
    addCancel() {
      this.isTcpRule = false
      this.isUdpRule = false
      this.isIpRule = false
      this.isMacRule = false
      this.$refs['addForm'].resetFields()
    },
    addSubmit() {
      this.$refs['addForm'].validate((valid) => {
        console.log('val is ' + valid)

        if (valid) {
          let para = {
            data: []
          }
          let object = {}
          object = Object.assign({}, this.addForm)
          // 端口地址要求是int类型
          for (let i in object) {
            if (i === 'ports' || i === 'porte') {
              object[i] = Number(object[i])
            }
          }
          object.optype = 'add'
          object.rules = setRules(this.rulesChoosen)
          object.iface = this.ifaceChoosen
          object.direct = this.directChoosen
          object.mangle = this.mangleChoosen
          // console.log('submit rules is ' + object.rules)
          para.data.push(object)
          // console.log('编号是 ' + this.rulesChoosen)
          handle(para)
            .then(res => {
              if (res.data.code === 200) {
                this.getInfo()
                this.addCancel()
              } else {
              }
            })
            .catch(error => {
              console.log(error)
            })

          this.rulesChoosen = ''
          this.ifaceChoosen = ''
        }
      })

      function setRules(val) {
        let i
        if (val === 'mac') {
          i = 0
        } else if (val === 'ip') {
          i = 1
        } else if (val === 'udp') {
          i = 2
        } else if (val === 'tcp') {
          i = 3
        }
        return i
      }
    },
    /*
    disableSubmit() {                            //wyk1011删除启用停用按钮
      let para = {
        data: []
      }
      let object = {}
      object.iface = this.disablePort
      object.enable = 0
      para.data.push(object)
      enable(para)
        .then(res => {
          if (res.data.code === 200) {
            this.getInfo()
            this.isInDisabling = false
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    enableSubmit() {
      let para = {}
      para.iface = this.enablePort
      para.enable = 1
      let val = {
        data: []
      }
      val.data.push(para)
      enable(val)
        .then(res => {
          if (res.data.code === 200) {
            this.getInfo()
            this.isInEnabling = false
          }
        })
        .catch(error => {
          console.log(error)
        })
    }, */
    deleteRule(index, val) {
      console.log(val)
      let para = {
        data: []
      }
      let object = {}
      object.optype = 'del'
      object.id = val.id
      para.data.push(object)
      handle(para)
        .then(res => {
          if (res.data.code === 200) {
            this.getInfo()
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    /*                                      //wyk1011删除启用停用按钮
    enableCancle() {
      this.isInEnabling = false
      this.isInDisabling = false
    }, */

    // 开始处理拿到的数组
    // getRules() {
    //   this.rules.forEach(this.getPortRules)
    // },
    // getPortRules(element, index, array) {
    //   this.portStorage = element.iface
    //   this.enableStorage = element.enable
    //   if (element.enable === 1) {
    //     this.disablePortList.push(element.iface)
    //   } else if (element.enable === 0) {
    //     this.enablePortList.push(element.iface)
    //   }
    //   element.rules.forEach(this.getTypeRules)
    // },
    // getTypeRules(item, index, array) {
    //   for (let i in item) {
    //     console.log('i ' + i)
    //     if (item[i].length !== 0) {
    //       if (i === 'macs') {
    //         this.typeStorage = 'MAC'
    //       } else if (i === 'ip') {
    //         this.typeStorage = 'IP'
    //       } else if (i === 'udp') {
    //         this.typeStorage = 'UDP'
    //       } else if (i === 'tcp') {
    //         this.typeStorage = 'TCP'
    //       }
    //     }
    //     // console.log('item[Object.keys(item)] ' + item[Object.keys(item)])
    //     // console.log('Object.keys(item) ' + Object.keys(item))
    //   }
    //   // console.log('in 3rd step ' + item)
    //   // 获取策略类型
    //   item[Object.keys(item)].forEach(this.getValue)
    // },
    // getValue(val, index, array) {
    //   let table = {}
    //   // console.log('last step ' + JSON.stringify(val))
    //   table.id = val.id
    //   table.port = this.portStorage
    //   table.type = this.typeStorage
    //   table.status = result(table.status, this.enableStorage)

    //   function result(status, val) {
    //     if (val === 0) {
    //       status = '未启用'
    //     } else if (val === 1) {
    //       status = '启用中'
    //     }
    //     return status
    //   }
    //   console.log('aaaaaaaaaaaaaaaaa' + table.status)
    //   for (let i in val) {
    //     if (i === 'ips') {
    //       table.ipSE = val.ips + '-' + val.ipe
    //     }
    //     if (i === 'ports') {
    //       table.portSE = val.ports + '-' + val.porte
    //     }
    //     if (i === 'mac') {
    //       table[i] = val[i]
    //     }
    //   }
    //   this.rulesList.push(table)
    //   // console.log('last step ruleList ' + JSON.stringify(this.rulesList))
    // },

    getRules() {
      this.rules.forEach(this.getValues)
    },
    getValues(item, index, array) {
      console.log('item : ' + item)
      let para = {}
      para.id = item.id
      para.port = item.iface
      para.type = getType()
      para.status = getStatus(item.enable)
      para.direct = item.direct
      para.mangle = item.mangle
      for (let i in item) {
        if (i === 'ips') {
          para.ipSE = item.ips + '-' + item.ipe
        }
        if (i === 'ports') {
          para.portSE = item.ports + '-' + item.porte
        }
        if (i === 'mac') {
          para[i] = item[i]
        }

        // 生成已启用/未启用端口的列表
        if (i === 'enable') {
          if (item[i] === 0) {
            this.enablePortList.push(item.iface)
          } else {
            this.disablePortList.push(item.iface)
          }
        }
      }

      this.rulesList.push(para)

      function getType() {
        let para = ''
        if (item.ruletype === 0) {
          para = 'MAC'
        }
        if (item.ruletype === 1) {
          para = 'IP'
        }
        if (item.ruletype === 2) {
          para = 'UDP'
        }
        if (item.ruletype === 3) {
          para = 'TCP'
        }
        return para
      }

      function getStatus(val) {
        let status = ''
        if (val === 0) {
          status = '未启用'
        } else if (val === 1) {
          status = '启用中'
        }
        return status
      }
    },

    search() {
      let para = {}
      para.iface = []
      console.log(this.portChoosen)
      if (this.portChoosen !== '' && this.portChoosen !== 'All') {
        para.iface.push(this.portChoosen)
        para.ifacestr = '(' + "'" + this.portChoosen + "'" + ')'
      }  else {
        this.getInfo()
      }
      // para.page = this.currentPage
      para.page = 1
      para.pagesize = this.pageSize

      this.currentPage = 1

      showInfo(para)
        .then(res => {
          if (res.data.code === 200) {
            if (res.data.total !== 0) {
              if (res.data.data.rules.length > 0) {
                this.rules = res.data.data.rules
              } else {
                this.currentPage -= 1
                this.getInfo()
                return
              }
            } else {
              this.rules = []
            }
            this.total = res.data.total
            this.rulesList = []
            this.enablePortList = []
            this.disablePortList = []
            this.getRules()
          }
        })
        .catch(error => {
          console.log(error)
        })
    },

    async getInfo() {
      let val = ''
      let para = {}
      para.iface = this.enlist
      this.enlist.forEach(spliceArray)
      para.ifacestr = val
      para.pagesize = this.pagesize
      para.page = this.currentPage
      // console.log('ifacestr is ' + para.ifacestr)

      this.enablePortList = []
      this.disablePortList = []

      showInfo(para)
        .then(res => {
          if (res.data.code === 200) {
            if (res.data.total !== 0) {
              if (res.data.data.rules.length > 0) {
                this.rules = res.data.data.rules
              } else {
                this.currentPage -= 1
                this.getInfo()
                return
              }
            } else if (res.data.total === 0) {
              this.rules = []
            }
            this.total = res.data.total
            this.rulesList = []
            this.enablePortList = []
            this.disablePortList = []
            this.getRules()
          }
        })
        .catch(error => {
          console.log(error)
        })

      function spliceArray(item, index, array) {
        // console.log('in foreach ' + item + '   ' + index)
        if (index === 0) {
          val = '(' + "'" + item + "'" + ', '
        } else if (index === array.length - 1) {
          val = val + "'" + item + "'" + ')'
        } else {
          val = val + "'" + item + "'" + ', '
        }
      }
    },

    async getPorts() {
      await getPorts()
        .then(res => {
          if (res.data.code === 200) {
            this.ports = res.data.interfaces
            this.ports.forEach(this.getPortsName)
            let all = {
              name: 'All',
              enable: 0
            }
            this.selectList.push(all)
            console.log(this.selectList)
          }
        })
        .catch(err => {
          console.log(err)
        })

      await this.getInfo()
    },
    // wyk翻译报文方向策略类型
    translate1() {
      /* if (this.$store.state.app.language === 'en') {
        console.log('123')
        for (let i = 0; i < this.rulesList.length; i++) {
          console.log('456')
          if (this.rulesList[i].direct === 'input') {
            console.log('789')
            this.rulesList[i].direct = 'Input'
          } else {
            this.rulesList[i].direct = 'Output'
          }
          if (this.rulesList[i].mangle === 'allow') {
            this.rulesList[i].mangle = 'Allow'
          } else {
            this.rulesList[i].mangle = 'Deny'
          }
        }
      } */
      console.log(this.rulesList.length)
      for (let i = 0; i < this.rulesList.length; i++) {
        console.log('123')
        if (this.rulesList[i].direct === 'input') {
          console.log('456')
          this.rulesList[i].direct = '报文输入'
        } else {
          this.rulesList[i].direct = '报文输出'
        }
        if (this.rulesList[i].mangle === 'allow') {
          console.log('789')
          this.rulesList[i].mangle = '允许通过'
        } else {
          this.rulesList[i].mangle = '禁止通过'
        }
      }
      console.log('rulelist')
      console.log(this.rulesList)
    },
    getPortsName(item) {
      // console.log('item ' + item)
      let para = {}
      para.name = item.webname
      this.enlist.push(item.webname)
      para.enable = getEnable(item)

      this.selectList.push(para)
      this.nameList.push(para)

      // console.log('yyy')
      // console.log(this.nameList)

      function getEnable(val) {
        if (val.function !== 'normal') {
          return 1
        } else {
          return 0
        }
      }
    }
  },
  mounted() {
    this.getPorts()
    this.getInfo()
  }
}
</script>

<style lang="scss" scoped>
.el-input {
  display: inline-block;
  width: 40%;
}
.tcp1{
margin-left: 15px;
}
.tcp2{
margin-left: 27px;
}
.udp1{
margin-left: 17px;
}
.udp2{
margin-left: 30px;
}
.mac1{
margin-left: 4px;
}
.ip1{
margin-left: 13px;
}
</style>