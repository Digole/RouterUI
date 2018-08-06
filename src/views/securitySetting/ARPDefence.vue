<template>
  <div>
    <div class="line_02">
      <span>ARP防御</span>
    </div>

    <div class="status-line">
      <span>状态:</span>

      <span v-if="this.isInuse">使用中</span>
      <span v-else>已停用</span>

      <el-button v-if="this.isInuse" @click="disable" type="danger" class="button">停用</el-button>
      <el-button v-else @click="enable" type="primary" class="button">启用</el-button>
    </div>

    <el-radio v-model="infoType" label='0'>显示全部信息</el-radio>
    <el-radio v-model="infoType" label='1'>显示冲突信息</el-radio>

    <el-table :data="list" :header-cell-style="headerStyle">
      <el-table-column prop="ip" label="IP地址"></el-table-column>
      <el-table-column prop="oldmac" label="MAC信息"></el-table-column>
      <el-table-column prop="newmac" label="冲突MAC地址"></el-table-column>
      <el-table-column prop="flag" label="当前状态"></el-table-column>
    </el-table>

    <el-pagination 
      layout="prev, pager, next" 
      @current-change="handleCurrentChange" 
      :page-size="5" 
      :total="total"
      style="float:right;">
    </el-pagination>

  </div>
</template>

<script>
  import { setARP, getARPInfo } from '../../api/api.js'
  export default {
    name: 'ARPDefence',
    data() {
      return {
        isInuse: false,
        infoType: '0',
        list: [],
        currentPage: 1,
        pagecount: 5,
        total: 0
      }
    },
    watch: {
      infoType: function() {
        this.getARPInfomation()
      }
    },
    methods: {
      headerStyle() {
        return this.header()
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.getARPInfomation()
      },
      enable() {
        let para = {}
        para.en = 1
        setARP(para)
          .then(res => {
            if (res.data.code === 200) {
              this.isInuse = true
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      disable() {
        let para = {}
        para.en = 0
        setARP(para)
          .then(res => {
            if (res.data.code === 200) {
              this.isInuse = false
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      getARPInfomation() {
        let para = {}
        para.page = this.currentPage
        para.pagecount = this.pagecount
        para.type = Number(this.infoType)
        getARPInfo(para)
          .then(res => {
            if (res.data.code === 200) {
              if (res.data.status === 'open') {
                this.isInuse = true
              } else {
                this.isInuse = false
              }
              this.list = res.data.data
              this.total = res.data.total
            }
          })
          .catch(err => {
            console.log(err)
          })
        console.log(this.isInuse)
      }
    },
    mounted() {
      this.getARPInfomation()
      setInterval(this.getARPInfomation, 2000)
    }
  }
</script>

<style lang="scss" scoped>
  .status-line {
    height: 5rem;
    line-height: 5rem;
    .button {
      margin-left: 5rem;
    }
  }
  .el-radio {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
</style>