<template>
  <div>
    <div class="line_02"><span>白名单</span></div>
    <!--
      <div style="background-color: #EEF6F6">
          <p style="padding: 5px 10px; font-weight: bold">白名单</p>
      </div>
      -->
    <div>
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px; background-color: #EEF6F6">
        <el-form :inline="true" :model="filters">
          <el-form-item>
            <el-button type="danger" >添加</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="danger" right>删除</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-table :data="hardwareInfo" style="width: 100%">
        <el-table-column prop="IP"  label="IP" min-width="180">
        </el-table-column>
        <el-table-column prop="time"  label="时间" min-width="180">
        </el-table-column>
        <el-table-column label="操作" min-width="150">
          <template slot-scope="scope">
            <el-button size="small">编辑</el-button>
            <el-button type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="line_02"><span>黑名单</span></div>
    <!--
      <div style="background-color: #EEF6F6">
          <p style="padding: 5px 10px; font-weight: bold">黑名单</p>
      </div>
      -->
    <div>
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px; background-color: #EEF6F6">
        <el-form :inline="true" :model="filters">
          <el-form-item>
            <el-button type="danger" >添加</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="danger" right>删除</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-table :data="hardwareInfo" style="width: 100%">
        <el-table-column prop="IP"  label="IP" min-width="180">
        </el-table-column>
        <el-table-column prop="time"  label="时间" min-width="180">
        </el-table-column>
        <el-table-column label="操作" min-width="150">
          <template slot-scope="scope">
            <el-button size="small">编辑</el-button>
            <el-button type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  export default {
    name: "remoteManage"
  }
</script>

<style scoped>

</style>
