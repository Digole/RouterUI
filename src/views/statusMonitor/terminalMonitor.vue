<template>
  <section>

    <div class="line_02"><span>终端监控</span></div>
    <!--工具条-->
    <el-col :span="24">
      <el-form :model="request" :rules="judge()" ref="form" :inline="true" >
        <el-form-item prop="data">
          <el-input v-model="request.data" placeholder="搜索IP/MAC"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="inquery">查询</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <el-table :data="terminalForm" title="终端监控" :header-cell-style="headerStyle">
      <el-table-column prop="ip" label="IP" min-width="120">
      </el-table-column>
      <el-table-column prop="mac" label="Mac" min-width="120">
      </el-table-column>
      <el-table-column prop="recv_rate" label="上行速率" min-width="120">
      </el-table-column>
      <el-table-column prop="send_rate" label="下行速率" min-width="120">
      </el-table-column>
      <el-table-column prop="recv_total_length" label="累计上行" min-width="120">
      </el-table-column>
      <el-table-column prop="send_total_length" label="累计下行" min-width="120">
      </el-table-column>
      <el-table-column prop="duration" label="在线时长" min-width="120">
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope" :label="$t('operation.operation')">
          <el-button @click="forbidLink(scope.row)" type="text" size="small">禁止联网</el-button>
          <el-button @click="limitLink(scope.row)" type="text" size="small">限速</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="10"
      layout="total, prev, pager, next, jumper"
      :total="this.total">
    </el-pagination>
  </section>
</template>

<script>
import { getMonitorInfo } from '../../api/api.js'
import validate from '../../utils/rules.js'
export default {
  name: 'terminalMonitor',
  data() {
    return {
      addFormVisible: false,

      request: {
        data: ''
      },               // 存储用户请求信息
      form: {
        type: Number,
        enable: '',
        protocol: '',
        port: '',
        ip: '',
        mac: '',
        alias: '',
        ifname: '',
        duration: Number,
        send_rate: Number,
        recv_rate: Number,
        send_total_length: Number,
        recv_total_length: Number,
        send_total_packets: Number,
        recv_total_packets: Number
      },

      terminalForm:[],
      currentPage: 1,
      total: 0,

      rules: {
        data: [
          { validator: validate( 'ip', '请输入正确IP或MAC' ), trigger: 'blur' }
        ]
      },
      rules2: {
        data: [
          { validator: validate( 'mac', '请输入正确IP或MAC' ), trigger: 'blur' }
        ]
      },
      rule: 'ip'
    }
  },
  methods: {
    headerStyle() {
      return this.header()
    },
    forbidLInk() {
    },
    limitLink() {
    },
    judge() {
      console.log(this.request.data)
      if(this.request.data.indexOf(':') > 0) {
        this.rule = 'mac'
        return this.rules2
      } else if(this.request.data.indexOf('.') > 0) {
        this.rule = 'ip'
        return this.rules
      } else {
        return this.rules
      }
    },
    inquery() {
      let para = Object.assign( {}, this.form )
      para.type = 1
      para.page = this.currentPage
      para[this.rule] = this.rule
      this.$refs['form'].validate( (valid) => {
        if(valid) {
          getMonitorInfo(para).then( (res) => {
            if(res.data.data.length !== 0) {
              this.terminalForm = res.data.data
              this.total = res.data.total
            } else {
              if(res.data.total === 0) {
                this.terminalForm = res.data.data
                this.total = res.data.total
              } else {
                this.currentPage -= 1
                this.getTerminalInfo()
              }
            }
          })
        }
      })
    },
    handleCurrentChange(val) {
      let para = Object.assign( {}, this.form)
      para.type = 1
      para.page = this.currentPage
      getMonitorInfo(para).then( (res) => {
        if(res.data.code === 200) {
          this.terminalForm = res.data.data
          this.total = res.data.total
        }
        this.currentPage = val
      })
    },
    getTerminalInfo() {
      let para = Object.assign( {}, this.form)
      para.type = 1
      para.page = this.currentPage
      getMonitorInfo(para).then( (res) => {
        if(res.data.code === 200) {
          if(res.data.data.length !== 0) {
            this.terminalForm = res.data.data
            this.total = res.data.total
          } else {
            if(res.data.total === 0) {
              this.terminalForm = res.data.data
              this.total = res.data.total
            } else {
              this.currentPage -= 1
              this.getTerminalInfo()
            }
          }
        }
      })
    }
  },
  mounted() {
    this.getTerminalInfo()
  }
}
</script>

<style scoped>
  .line_02{
    margin-bottom: 20px;
    margin-top: 30px;
    height: 1px;
    border-top: 1px solid #ddd;
    text-align: left;
    color: #909399
  }
  .line_02 span{
    position: relative;
    top: -10px;
    background: #fff;
    padding: 0 30px 0 0;
    font-weight: bold
  }
</style>
