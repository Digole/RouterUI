<template>
  <section>
    <p>{{$t('kidVPN.status.title')}}:</p>
    <el-table :data="VPNList" :header-cell-style="headerStyle" style="width: 100%">
      <el-table-column type="selection" min-width="30"></el-table-column>
      <el-table-column prop="ip" :label="$t('kidVPN.status.ip')" min-width="120"></el-table-column>
      <el-table-column prop="mac" :label="$t('kidVPN.status.mac')" min-width="120"></el-table-column>
      <el-table-column :label="$t('operation.operation')" min-width="60">
        <template slot-scope="scope">
          <el-button size="small" @click="deleteClient(scope.$index, scope.row)">{{$t('operation.delete')}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="5" layout="total, prev, pager, next, jumper" :total="total">
    </el-pagination>
  </section>
</template>

<script>
export default {
  name: 'status',
  data() {
    return {
      currentPage: 1,
      total: 0,
      VPNList: []
    }
  },
  methods: {
    headerStyle() {
      return this.header()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      // this.getInfo()
    }
  }
}
</script>

<style scoped>
p {
  height: 28px;
  margin: 1rem 0 0 0;
}

.el-table {
  margin: 15px 0 0 0;
}
</style>