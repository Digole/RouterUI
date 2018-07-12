<template>
  <section>

    <div class="line_02"><span>线路监控</span></div>


    <el-table style="width: 100%;" background="#f4f4f4" :header-cell-style="headerStyle">
      <el-table-column prop="portName" :label="$t('lineMonitor.portName')" width="180">
      </el-table-column>
      <el-table-column prop="IPAddress" label="IP地址" width="240">
      </el-table-column>
      <el-table-column prop="linkNumber" label="连接数" width="180">
      </el-table-column>
      <el-table-column prop="uplinkRate" label="上行速率" width="180">
      </el-table-column>
      <el-table-column prop="downlinkRate" label="下行速率" width="180">
      </el-table-column>
      <el-table-column prop="uplinkFlow" label="上行流量" width="180">
      </el-table-column>
      <el-table-column prop="downlinkFlow" label="下行流量" width="180">
      </el-table-column>
      <el-table-column prop="uplinkPacketLossRate" label="上行丢包率" min-width="120">
      </el-table-column>
      <el-table-column prop="downlinkPacketLossRate" label="下行丢包率" min-width="120">
      </el-table-column>
    </el-table>
  </section>
</template>

<script>
    export default {
      name: 'line_monitor',

      methods:{
        headerStyle() {
          return this.header()
        },
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
