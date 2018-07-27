<template>
  <section>

    <div class="line_02"><span>监控</span></div>

    <el-table :data="final" title="线路监控" :header-cell-style="headerStyle">
      <el-table-column prop="lineName" label="线路名称" min-width="120">
      </el-table-column>
      <el-table-column prop="function" label="功能" min-width="120">
      </el-table-column>
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
      <el-table-column prop="recv_total_packets" label="上行包总数" min-width="120">
      </el-table-column>
      <el-table-column prop="send_total_packets" label="下行包总数" min-width="120">
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
import { getMonitorInfo, getPorts } from '../../../api/api.js'
import { conversion, conversionUnit } from '../../../utils/rateUnitExchange.js'
export default {
  name: 'line_monitor',
  data() {
    return {
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
      final: [],
      ports: [],
      lineForm: [],
      currentPage: 1,
      total: 0
    }
  },
  methods: {
    headerStyle() {
      return this.header()
    },
    handleCurrentChange(val) {
      let para = Object.assign({}, this.form)
      para.type = 3
      para.page = this.currentPage
      getMonitorInfo(para).then((res) => {
        if (res.data.code === 200) {
          this.lineform = res.data.data
          this.total = res.data.total
        }
        this.currentPage = val
      })
    },
    async getLineInfo () {
      let para = Object.assign({}, this.form)
      para.type = 3
      para.page = this.currentPage
      await getMonitorInfo(para).then((res) => {
        if (res.data.code === 200) {
          if (res.data.data.length !== 0) {
            this.lineForm = res.data.data
            this.total = res.data.total
            for (let i = 0; i < res.data.data.length; i++) {
              this.lineForm[i].send_rate = conversion(this.lineForm[i].send_rate)
              this.lineForm[i].recv_rate = conversion(this.lineForm[i].recv_rate)
              this.lineForm[i].send_total_length = conversionUnit(this.lineForm[i].send_total_length)
              this.lineForm[i].recv_total_length = conversionUnit(this.lineForm[i].recv_total_length)
            }
          } else {
            if (res.data.total === 0) {
              this.lineForm = res.data.data
              this.total = res.data.total
            } else {
              this.currentPage -= 1
              this.getLineInfo()
            }
          }
        }
      })
    },
    async getPortsInfo () {
      await getPorts().then((res) => {
        if (res.data.code === 200) {
          this.ports = res.data.interfaces
          console.log(this.ports)
        }
      })
    },
    async generateData () {
      await this.getLineInfo()
      await this.getPortsInfo()
      this.final = getNameAndFunc(this.lineForm, this.ports)
      console.log('lineForm' + this.lineForm)
      console.log('final' + this.final)

      function getNameAndFunc (line, ports) {
        console.log('in nameandfunc' + line + ports)
        for (let i = 0; i < line.length; i++) {
          for (let j = 0; j < ports.length; j++) {
            if (line[i].ifname === ports[j].enname) {
              line[i].lineName = ports[j].webname
              line[i].function = ports[j].function
              // if (line[i].function.length === 3) {
              //   line[i].function + '   '
              // }
              if (ports[j].type !== '') {
                line[i].function += '/'
                line[i].function += ports[j].type
              }
            }
          }
        }
        return line
      }
    }
  },
  mounted() {
    this.generateData()
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
