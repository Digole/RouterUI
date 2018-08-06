<template>
  <section>

    <div class="line_02">
      <span>操作日志</span>
    </div>

    <el-table :data="form" style="width: 100%" :header-cell-style="headerStyle">
      <el-table-column prop="oper_time" label="操作时间" min-width="180">
      </el-table-column>
      <el-table-column prop="clientIp" label="客户端IP" min-width="180">
      </el-table-column>
      <el-table-column prop="operator" label="操作者" min-width="180">
      </el-table-column>
      <el-table-column prop="module_name" label="模块名" min-width="180">
      </el-table-column>
      <el-table-column prop="reuslt" label="操作结果" min-width="240">
      </el-table-column>
      <el-table-column prop="oper_log" label="操作日志内容" min-width="120">
      </el-table-column>
    </el-table>

    <el-pagination layout="prev, pager, next" :total="total" :page-size="10" @current-change="handleChange">

  </section>
</template>

<script>
import getOperaLog from '@/api/api.js'
export default {
  name: 'BMDisplay',
  data() {
    return {
      currentPage: 1,
      total: 0,
      form: [],
      hardwareInfo: []
    }
  },
  methods: {
    headerStyle() {
      return this.header()
    },
    handleChange() {
      let para = {}
      para.page = this.currentPage
      getOperaLog(para).then(res => {
        if (res.data.code === 200) {
          if (res.data.total !== 0) {
            if (res.data.data.length !== 0) {
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
    }
  },
  mounted() {
    this.handleChange()
  }
}
</script>

<style scoped>
</style>
