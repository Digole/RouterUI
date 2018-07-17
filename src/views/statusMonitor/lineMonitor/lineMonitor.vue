<template>
  <section>

    <div class="line_02"><span>监控</span></div>

    <el-table :data="lineForm" title="线路监控" :header-cell-style="headerStyle">
      <el-table-column prop="ip" label="IP" min-width="120">
      </el-table-column>
      <el-table-column prop="mac" label="Mac" min-width="120">
      </el-table-column>
      <el-table-column prop="recv_rate" label="上行速率" min-width="120">
      </el-table-column>
      <el-table-column prop="send_rate" label="下行速率" min-width="120">
      </el-table-column>
      <el-table-column prop="recv_total_length" label="上行总流量" min-width="120">
      </el-table-column>
      <el-table-column prop="send_total_length" label="下行总流量" min-width="120">
      </el-table-column>
      <el-table-column prop="recv_total_packets" label="上行丢包数/天" min-width="120">
      </el-table-column>
      <el-table-column prop="send_total_packets" label="下行丢包数/天" min-width="120">
      </el-table-column>
    </el-table>

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
        <template slot-scope="scope" :label="$t('operation.operation')" min-width="120">
          <el-button @click="forbidLink(scope.row)" type="text" size="small">禁止联网</el-button>
          <el-button @click="limitLink(scope.row)" type="text" size="small">限速</el-button>
        </template>
      </el-table-column>
    </el-table>

    <charts class="echarts"></charts>
  </section>
</template>

<script>
import { getMonitorInfo } from '../../../api/api.js'
import { charts } from './components'
export default {
  name: 'line_monitor',
  components: {
    charts
  },
  data() {
    return{
      form: {
        type: '',
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
      terminalForm: [],
      lineForm: [],
    }
  },
  methods:{
    headerStyle() {
      return this.header()
    },
    forbidLInk() {
    },
    limitLink() {
    },
    getLineInfo() {
      let para = Object.assign( {}, this.form)
      para.type = '3'
      getMonitorInfo(para).then( (res) => {
        if(res.data.code === 200) {
          this.terminalForm = res.data.data
        }
      })
    },
    getTerminalInfo() {
      let para = Object.assign( {}, this.form)
      para.type = '1'
      getMonitorInfo(para).then( (res) => {
        if(res.data.code === 200) {
          this.lineForm = res.data.data
        }
      })
    }
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
  .echarts {
    margin: 20px auto auto 0;
    height: 200px;
    width: 50%;
  }

</style>
