<template>
  <div>
    <div class="line_02">
      <span>日志中心</span>
    </div>

    <!--工具条-->
    <el-col :span="24">
      <el-form :model="request" :inline="true" ref="request">
        <el-form-item prop="time">
          <el-date-picker v-model="request.time" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="getTime">
          </el-date-picker>
        </el-form-item>
        <el-form-item prop="keyword">
          <el-input placeholder="搜索" v-model="request.keyword">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>>
          </el-input>
        </el-form-item>
        <el-form-item class="clear">
          <el-button @click="empty">全部清空</el-button>
        </el-form-item>
        <el-form-item>
          <span class="tip" v-if="request.time === ''">默认提供最近24小时数据</span>
        </el-form-item>
      </el-form>
    </el-col>

    <el-table :data="form" :header-cell-style="headerStyle">
      <el-table-column type="index" width="60">
      </el-table-column>
      <el-table-column prop="time" :label="$t('log.time')">
      </el-table-column>
      <el-table-column prop="enname" :label="$t('log.line')">
      </el-table-column>
      <el-table-column prop="event" :label="$t('log.detail')">
      </el-table-column>
    </el-table>

    <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="10" layout="total, prev, pager, next, jumper" :total="this.total">
    </el-pagination>

  </div>
</template>

<script>
import { getLog } from '../../api/api.js'
export default {
  name: 'log',
  data() {
    return {
      currentPage: 1,
      total: 0,
      request: {
        time: '',
        keyword: ''
      },
      form: [],
      example: {
        time: '',
        enname: '',
        event: ''
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
    getTime() {
      this.dialForm.starttime = this.transform(this.request.time[0])
      this.dialForm.endtime = this.transform(this.request.time[1])
      this.currentPage = 1
      this.getLogInfo()
    },
    empty() {
      this.$refs['request'].resetFields()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      let para = Object.assign({}, this.dialForm)
      para.page = this.currentPage
      para.pagecount = 10
      getLog(para).then(res => {
        if (res.data.code === 200) {
          this.form = res.data.data
          this.total = res.data.total
        }
      })
    },

    getLogInfo() {
      let para = Object.assign({}, this.dialForm)
      if (this.request.time === '') {
        let now = new Date()
        this.dialForm.starttime = this.transform(
          new Date(now - 24 * 60 * 60 * 1000)
        )
        para.starttime = this.dialForm.starttime
        this.dialForm.endtime = this.transform(now)
        para.endtime = this.dialForm.endtime
      }
      para.page = this.currentPage
      para.pagecount = 10
      console.log(para)
      getLog(para).then(res => {
        if (res.data.code === 200) {
          if (res.data.data.length !== 0) {
            this.form = res.data.data
            this.total = res.data.total
          } else {
            if (res.data.total === 0) {
              this.form = []
              this.total = res.data.total
            } else {
              this.currentPage -= 1
              this.getLogInfo()
            }
          }
        } else {
          this.form = []
          this.total = 0
        }
      })
      // this.$refs['request'].resetFields()
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
    }
  },
  mounted() {
    this.getLogInfo()
  }
}
</script>

<style lang="scss" scoped>
.clear {
  float: right;
}
.tip {
  color: #909399;
}
</style>