<template>
  <section>

    <div class="line_02"><span>WEB上下线</span></div>

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
        <el-form-item prop="keyword">
          <el-input placeholder="客户端IP过滤" v-model="request.keyword">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="search">搜索</el-button>
        </el-form-item>
        <el-form-item class="clear">
          <el-button @click="empty">全部清空</el-button>
        </el-form-item>
        <el-form-item>
          <span class="tip" v-if="request.time === ''">默认提供最近24小时数据</span>
        </el-form-item>
      </el-form>
    </el-col>

    <el-table :data="form" style="width: 100%" :header-cell-style="headerStyle">
      <el-table-column prop="time"  label="时间">
      </el-table-column>
      <el-table-column prop="username"  label="名称">
      </el-table-column>
      <el-table-column prop="clientIp"  label="客户端IP">
      </el-table-column>
      <el-table-column prop="result"  label="操作结果">
      </el-table-column>
      <el-table-column prop="type"  label="操作类型">
      </el-table-column>
    </el-table>

    <el-pagination 
      layout="prev, pager, next"
      :total="total"
      :page-size="10"
      @current-change="handleChange">
    </el-pagination>
    

  </section>
</template>

<script>
import { getWebInfo } from '@/api/api.js'
export default {
  name: 'BMDisplay',
  data () {
    return {
      currentPage: 1,
      pagecount: 10,
      total: 0,
      form: [],
      hardwareInfo: [],
      request: {
        time: '',
        clientIp: ''
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
    empty() {
      this.$refs['request'].resetFields()
    },
    getTime() {
      this.dialForm.starttime = this.transform(this.request.time[0])
      this.dialForm.endtime = this.transform(this.request.time[1])
      this.currentPage = 1
      this.getLogInfo()
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
    search() {
      let para = Object.assign({}, this.dialForm, this.request)
      para.page = this.currentPage
      para.pagecount = this.currentPage
      getWebInfo(para)
        .then(res => {
          if (res.data.code === 200) {
            if (res.data.total !== 0) {
              if (res.data.data.length !== 0) {
                res.data.data.forEach((item) => {
                  if (item.result === 0) {
                    item.result = '成功'
                  } else {
                    item.result = '失败'
                  }
                  if (item.type === 1) {
                    item.type = '登陆'
                  } else {
                    item.type = '登出'
                  }
                })
                this.form = res.data.data
                this.total = res.data.total
              } else {
                this.currentPage -= 1
                this.handleChange()
              }
            } else if (res.data.tatal === 0) {
              this.form = res.data.data
            }
          }
        })
    },
    handleChange(val) {
      this.currentPage = val
      let para = Object.assign({}, this.dialForm, this.request)
      para.page = this.currentPage
      para.pagecount = this.pagecount
      this.getInfo(para)
    },
    getFirstInfo() {
      let para = Object.assign({}, this.dialForm, this.request)
      para.page = this.currentPage
      para.pagecount = this.pagecount
      this.getInfo(para)
    },
    getInfo(para) {
      getWebInfo(para)
        .then(res => {
          if (res.data.code === 200) {
            if (res.data.total !== 0) {
              if (res.data.data.length !== 0) {
                res.data.data.forEach((item) => {
                  if (item.result === 0) {
                    item.result = '成功'
                  } else {
                    item.result = '失败'
                  }
                  if (item.type === 1) {
                    item.type = '登陆'
                  } else {
                    item.type = '登出'
                  }
                })
                this.form = res.data.data
                this.total = res.data.total
              } else {
                // this.currentPage -= 1
                this.handleChange()
              }
            } else if (res.data.tatal === 0) {
              this.form = res.data.data
            }
          }
        })
    }
  },
  mounted() {
    this.getFirstInfo()
  }
}
</script>

<style scoped>

</style>
