<template>
  <div>
    <div class="line_02"><span>日志中心</span></div>

    <!--工具条-->
    <el-col :span="24">
        <el-form :model="request" :inline="true">
            <el-form-item prop="time">
              <el-date-picker
                v-model="request.time"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                @change="type">
              </el-date-picker>
            </el-form-item>
            <el-form-item prop="keyword">
              <el-input 
                placeholder="搜索"
                v-model="request.keyword">
                <i slot="prefix" class="el-input__icon el-icon-search"></i>>
              </el-input>
            </el-form-item>
            <el-form-item class="clear">
                <el-button @click="empty">全部清空</el-button>
            </el-form-item>
        </el-form>
    </el-col>

    <el-table :data="form" :header-cell-style="headerStyle">
      <el-table-column prop="index" :label="$t('log.index')">
      </el-table-column>
      <el-table-column prop="time" :label="$t('log.time')">
      </el-table-column>
      <el-table-column prop="line" :label="$t('log.line')">
      </el-table-column>
      <el-table-column prop="index" :label="$t('log.detail')">
      </el-table-column>
    </el-table>

    <el-pagination
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="10"
      layout="total, prev, pager, next, jumper"
      :total="this.total">
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
    type() {
      console.log(this.request.time)
    },
    empty() {
      this.$refs['request'].resetFields()
    },
    handleCurrentChange (val) {
      let para = Object.assign( {}, this.dialForm )
      para.page = this.currentPage
      para.pagecount = 10
      getLog(para).then( (res) => {
        if(res.data.code === 200) {
          this.form = res.data.data
          this.total = res.data.total
        }
        this.currentPage = val
      })
    },

    getLogInfo() {
      let para = Object.assign( {}, this.dialForm )
      para.starttime = this.request.time[0]
      para.endtime = this.request.tiem[1]
      para.page = this.currentPage
      para.pagecount = 10
      getLog(para).then( (res) => {
        if(res.data.code === 200) {
          if(res.data.data.length !== 0) {
            this.form = res.data.data
            this.total = res.data.total
          } else {
            if(res.data.total === 0) {
              this.form = res.data.data
              this.total = res.data.total
            } else {
              this.currentPage -= 1
              this.getLogInfo()
            }
          }
        }
      })

      this.$refs['request'].resetFields()
      
    },
    mounted() {
      this.getLogInfo()
    }
  }
}
</script>

<style lang="scss" scoped>
  .clear {
    float: right;
  }
</style>