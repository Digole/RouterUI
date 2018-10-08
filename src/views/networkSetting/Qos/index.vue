<template>
  <div>
    <div class="line_02">

      <span>Qos配置</span>

      <span>{{$t('Qos.QosSetting')}}</span>


      <span>{{$t('Qos.QosSetting')}}</span>

    </div>

    <el-col :span="24">
      <el-form :inline="true">
        <el-form-item>
          <el-button type="primary" @click="addHandle">{{$t('operation.add')}}</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <el-table :data="data" :header-cell-style="headerStyle">


      <el-table-column prop="netif" :label="$t('Qos.netif')">

      </el-table-column>
      <el-table-column prop="rule" :label="$t('Qos.rule')">
      </el-table-column>
      <el-table-column prop="ipStart" :label="$t('Qos.ipStart')">
      </el-table-column>
      <el-table-column prop="ipEnd" :label="$t('Qos.ipEnd')">
      </el-table-column>
      <el-table-column prop="cmpMethod" :label="$t('Qos.cmpMethod')">
      </el-table-column>
      <el-table-column prop="priority" :label="$t('Qos.priority')">
      </el-table-column>
      <el-table-column prop="netif" :label="$t('Qos.netif')">
      </el-table-column>
      <el-table-column prop="rule" :label="$t('Qos.rule')">
      </el-table-column>
      <el-table-column prop="ipStart" :label="$t('Qos.ipStart')">
      </el-table-column>
      <el-table-column prop="ipEnd" :label="$t('Qos.ipEnd')">
      </el-table-column>
      <el-table-column prop="cmpMethod" :label="$t('Qos.cmpMethod')">
      </el-table-column>
      <el-table-column prop="priority" :label="$t('Qos.priority')">
      </el-table-column>
      <el-table-column prop="dontDrop" :label="$t('Qos.dontDrop')">

      <el-table-column prop="dontDrop" :label="$t('Qos.dontDrop')">

      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-button size="small" @click="deleteItem(scope.index, scope.row)">{{ $t('operation.delete') }}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination 
      layout="total, prev, pager, next, jumper" 
      @current-change="handleChange" 
      :total="total" :current-page="currentPage" 
      :page-size="pageSize">
    </el-pagination>


    <el-dialog title="添加新Qos" :visible.sync="isShow">
      <el-form :model="addForm" ref="addForm" label-width="5rem">
        <el-form-item prop="netif" label="网卡接口">

    <el-dialog :title="$t('Qos.addNewQos')" :visible.sync="isShow">
      <el-form :model="addForm" ref="addForm" label-width="5rem">
        <el-form-item prop="netif" :label="$t('Qos.netif')">


    <el-dialog :title="$t('Qos.addNewQos')" :visible.sync="isShow">
      <el-form :model="addForm" ref="addForm" label-width="5rem">
        <el-form-item prop="netif" :label="$t('Qos.netif')">

          <el-select v-model="addForm.netif" placeholder="请选择网卡">
            <el-option 
              v-for="(item, index) in netList" 
              :key="index" 
              :label="item" 
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item prop="rule" label="规则">

        <el-form-item prop="rule" :label="$t('Qos.rule')">

        <el-form-item prop="rule" :label="$t('Qos.rule')">

          <el-select v-model="addForm.rule" placeholder="请选择规则" @change="changeHandle">
            <el-option 
              v-for="(item, index) in ruleList" 
              :key="index" 
              :label="item.label" 
              :value="item.label">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item prop="ipStart" label="起始IP地址">

        <el-form-item prop="ipStart" :label="$t('Qos.ipStart')">

          <el-input v-model="addForm.ipStart" placeholder="请填写起始IP"></el-input>
        </el-form-item>
        <el-form-item prop="ipEnd" :label="$t('Qos.ipEnd')">
          <el-input v-model="addForm.ipEnd" placeholder="请填写结束IP"></el-input>
        </el-form-item>
        <el-form-item prop="portStart" :label="$t('Qos.portStart')">
          <el-input v-model="addForm.portStart" :disabled="isIP" placeholder="请填写开始端口"></el-input>
        </el-form-item>
        <el-form-item prop="portEnd" :label="$t('Qos.portEnd')">
          <el-input v-model="addForm.portEnd" :disabled="isIP" placeholder="请填写结束端口"></el-input>
        </el-form-item>
        <el-form-item prop="ipStart" :label="$t('Qos.ipStart')">
          <el-input v-model="addForm.ipStart" placeholder="请填写起始IP"></el-input>
        </el-form-item>
        <el-form-item prop="ipEnd" :label="$t('Qos.ipEnd')">
          <el-input v-model="addForm.ipEnd" placeholder="请填写结束IP"></el-input>
        </el-form-item>
        <el-form-item prop="portStart" :label="$t('Qos.portStart')">
          <el-input v-model="addForm.portStart" :disabled="isIP" placeholder="请填写开始端口"></el-input>
        </el-form-item>
        <el-form-item prop="portEnd" :label="$t('Qos.portEnd')">
          <el-input v-model="addForm.portEnd" :disabled="isIP" placeholder="请填写结束端口"></el-input>
        </el-form-item>
        <el-form-item prop="cmpMethod" :label="$t('Qos.cmpMethod')">

        <el-form-item prop="cmpMethod" :label="$t('Qos.cmpMethod')">

          <el-select v-model="addForm.cmpMethod" placeholder="请选择比较方法">
            <el-option 
              v-for="(item, index) in methodList" 
              :key="index" 
              :label="item.label" 
              :value="item.label">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="priority" :label="$t('Qos.priority')">

        <el-form-item prop="priority" :label="$t('Qos.priority')">

          <el-select v-model="addForm.priority" placeholder="请选择优先级">
            <el-option 
              v-for="item in 7" 
              :key="item" 
              :label="item" 
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item prop="dontDrop" label="dontDrop">

        <el-form-item prop="dontDrop" :label="$t('Qos.dontDrop')">

        <el-form-item prop="dontDrop" :label="$t('Qos.dontDrop')">

          <el-radio v-model="addForm.dontDrop" label="0">No</el-radio>
          <el-radio v-model="addForm.dontDrop" label="1">Yes</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="addCancel">{{ $t('operation.cancel') }}</el-button>
        <el-button size="small" @click="addSubmit">{{ $t('operation.submit') }}</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { setQos, delQos, getQos, getPorts } from '@/api/api.js'
export default {
  name: 'Qos',
  data() {
    return {
      isShow: false,
      isIP: false,

      ruleChosen: '',

      addForm: {
        netif: '',
        rule: '',
        ipStart: '',
        ipEnd: '',
        portStart: '',
        portEnd: '',
        cmpMethod: '',
        priority: '',
        dontDrop: ''
      },
      ruleList: [
        {
          label: 'ip'
        },
        {
          label: 'udp'
        },
        {
          label: 'tcp'
        }
      ],
      methodList: [
        {
          label: 'SRC'
        },
        {
          label: 'DEST'
        },
        {
          label: 'BOTH'
        }
      ],
      netList: [],
      data: [],

      total: 0,
      currentPage: 1,
      pageSize: 5
    }
  },
  watch: {
    ruleChosen: function() {
      if (this.ruleChosen === 'ip') {
        this.isIP = true
      } else {
        this.isIP = false
      }
    },
    isIP: function() {
      if (this.isIP) {
        this.addForm.portStart = 0
        this.addForm.portEnd = 0
      } else {
        this.addForm.portStart = ''
        this.addForm.portEnd = ''
      }
    }
  },
  methods: {
    headerStyle() {
      return this.header()
    },
    addHandle() {
      console.log('lafjoefj')
      this.isShow = true
    },
    changeHandle(val) {
      this.ruleChosen = val
    },
    handleChange(val) {
      this.currentPage = val
      this.getQosInfo()
    },
    deleteItem(index, val) {
      let para = Object.assign({}, val)
      para.page = this.currentPage
      delQos(para)
        .then(res => {
          if (res.data.code === 200) {
            this.getQosInfo()
          }
        })
    },
    addCancel() {
      this.isShow = false
      this.$refs.addForm.resetFields()
    },
    addSubmit() {
      let para = Object.assign({}, this.addForm)
      setQos(para)
        .then(res => {
          if (res.data.code === 200) {
            this.getQosInfo()
            this.isShow = false
            this.$refs.addForm.resetFields()
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    getQosInfo() {
      let para = {}
      para.page = this.currentPage
      getQos(para)
        .then(res => {
          if (res.data.code === 200) {
            if (res.data.total !== 0) {
              if (res.data.data.length > 0) {
                this.total = res.data.total
                this.data = res.data.data
              } else {
                this.currentPage -= 1
                this.getQosInfo()
              }
            } else {
              this.total = 0
              this.data = []
            }
          }
        })
    },
    getInfo() {
      getPorts()
        .then(res => {
          if (res.data.code === 200) {
            res.data.interfaces.forEach(element => {
              this.netList.push(element.webname)
            })
          }
          console.log(this.netList)
        })
        .then(this.getQosInfo)
        .catch(error => {
          console.log(error)
        })
    }
  },
  mounted() {
    this.getInfo()
  }
}
</script>
