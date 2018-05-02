<template>
  <div>
    <div class="line_02"><span>ARP绑定</span></div>
    <el-table :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;" :header-cell-style="headerStyle">
      <el-table-column prop="IP" label="IP" min-width="120" >
      </el-table-column>
      <el-table-column prop="MAC" label="MAC" min-width="180">
      </el-table-column>
      <el-table-column prop="name" label="名称" min-width="120">
      </el-table-column>
      <el-table-column label="操作" min-width="150">
        <template slot-scope="scope">
          <el-button size="small">编辑</el-button>
          <el-button type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: "ARP",
    methods:{
      headerStyle() {
        return this.header();
      },
    }
  }
</script>

<style scoped>

</style>
