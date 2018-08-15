<template>
  <section>

    <div class="line_02">
      <span>操作日志</span>
    </div>

    <!--工具条-->
    <el-col :span="24">
      <el-form :model="request" :inline="true" ref="request">
        <el-form-item prop="time">
          <el-date-picker 
            v-model="request.time" 
            type="datetimerange" 
            range-separator="至" 
            start-placeholder="开始日期" 
            end-placeholder="结束日期" 
            @change="getTime">
          </el-date-picker>
        </el-form-item>
        <el-form-item prop="module_name">
          <el-input placeholder="模块名过滤" v-model="request.module_name">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>>
          </el-input>
        </el-form-item>
        <el-form-item prop="oper_log">
          <el-input placeholder="操作日志过滤" v-model="request.oper_log">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>>
          </el-input>
        </el-form-item>
        <el-form-item class="clear">
          <el-button @click="search">搜索</el-button>
        </el-form-item>
        <el-form-item class="clear">
          <el-button @click="empty">全部清空</el-button>
        </el-form-item>
        <!-- <el-form-item>
          <span class="tip" v-if="request.time === ''">默认提供最近24小时数据</span>
        </el-form-item> -->
      </el-form>
    </el-col>

    <el-table :data="form" style="width: 100%" :header-cell-style="headerStyle">
      <el-table-column prop="oper_time" label="操作时间">
      </el-table-column>
      <el-table-column prop="client_ip" label="客户端IP">
      </el-table-column>
      <el-table-column prop="operator" label="操作者">
      </el-table-column>
      <el-table-column prop="module_name" label="模块名">
      </el-table-column>
      <el-table-column prop="result" label="操作结果">
      </el-table-column>
      <el-table-column prop="oper_log" label="操作日志内容">
      </el-table-column>
    </el-table>

    <el-pagination 
      layout="prev, pager, next" 
      :total="total" 
      :page-size="10" 
      @current-change="handleChange"
      style="float: right">
    </el-pagination>

  </section>
</template>

<script>
import { getOperaLog } from '@/api/api.js'
export default {
  name: 'BMDisplay',
  data() {
    return {
      currentPage: 1,
      total: 0,
      form: [],
      hardwareInfo: [],

      request: {
        time: '',
        module_name: '',
        oper_log: ''
      },
      dialForm: {
        starttime: '',
        endtime: '',
        page: '',
        pagecount: ''
      }
    }
  },
  methods: {
    headerStyle() {
      return this.header()
    },
    handleChange(val) {
      this.currentPage = val
      let para = Object.assign({}, this.dialForm, this.request)
      para.page = this.currentPage
      para.pagecount = 10
      para.page = this.currentPage
      getOperaLog(para)
        .then(res => {
          if (res.data.code === 200) {
            if (res.data.total !== 0) {
              if (res.data.data.length !== 0) {
                res.data.data.forEach((item) => {
                  if (item.reuslt === 1) {
                    item.result = '失败'
                  } else if (item.result === 0) {
                    item.result = '成功'
                  }
                })
                this.form = res.data.data
                this.total = res.code.total
              } else {
                this.currentPage -= 1
                this.handleChange()
              }
            } else if (res.data.tatal === 0) {
              this.form = res.data.data
            }
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    getTime() {
      this.dialForm.starttime = this.transform(this.request.time[0])
      this.dialForm.endtime = this.transform(this.request.time[1])
      this.currentPage = 1
      this.getInfo()
    },
    transform(val) {
      let time
      time =
        val.toDateString() +
        ' ' +
        val.getHours() +
        ':' +
        val.getMinutes() +
        ':' +
        val.getSeconds()
      return time
    },
    empty() {
      this.$refs['request'].resetFields()
    },
    search() {
      let para = Object.assign({}, this.dialForm, this.request)
      // if (this.request.time === '') {
      //   let now = new Date()
      //   this.dialForm.starttime = this.transform(
      //     new Date(now - 24 * 60 * 60 * 1000)
      //   )
      //   para.starttime = this.dialForm.starttime
      //   this.dialForm.endtime = this.transform(now)
      //   para.endtime = this.dialForm.endtime
      // }
      para.page = this.currentPage
      para.pagecount = 10
      getOperaLog(para).then(res => {
        if (res.data.code === 200) {
          if (res.data.total !== 0) {
            if (res.data.data.length !== 0) {
              res.data.data.forEach((item) => {
                if (item.reuslt === 1) {
                  item.result = '失败'
                } else if (item.result === 0) {
                  item.result = '成功'
                }
              })
              this.form = res.data.data
              this.total = res.data.total
            } else {
              this.currentPage -= 1
              this.getOperaLog()
            }
          } else if (res.data.total === 0) {
            this.form = []
            this.total = res.data.total
          }
        }
      })
    },
    getInfo() {
      let para = Object.assign({}, this.dialForm, this.request)
      // if (this.request.time === '') {
      //   let now = new Date()
      //   this.dialForm.starttime = this.transform(
      //     new Date(now - 24 * 60 * 60 * 1000)
      //   )
      //   para.starttime = this.dialForm.starttime
      //   this.dialForm.endtime = this.transform(now)
      //   para.endtime = this.dialForm.endtime
      // }
      para = Object.assign(para, this.request)
      para.page = this.currentPage
      para.pagecount = 10
      getOperaLog(para).then(res => {
        if (res.data.code === 200) {
          if (res.data.total !== 0) {
            if (res.data.data.length !== 0) {
              res.data.data.forEach((item) => {
                if (item.reuslt === 1) {
                  item.result = '失败'
                } else if (item.result === 0) {
                  item.result = '成功'
                }
              })
              this.form = res.data.data
              this.total = res.data.total
            } else {
              this.currentPage -= 1
              this.getOperaLog()
            }
          } else if (res.data.total === 0) {
            this.form = []
            this.total = res.data.total
          }
        }
      })
    }
  },
  mounted() {
    this.getInfo()
  }
}
</script>

<style scoped>
</style>
