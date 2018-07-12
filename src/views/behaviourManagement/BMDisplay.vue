<template>
  <section>
    <div class="line_02"><span>行为记录显示</span></div>
    <!--
      <div style="background-color: #EEF6F6">
          <p style="padding: 5px 10px; font-weight: bold">终端上下线</p>
      </div>
     -->
    <el-table :data="hardwareInfo" style="width: 100%" :header-cell-style="headerStyle">
      <el-table-column prop="time"  label="时间" min-width="180">
      </el-table-column>
      <el-table-column prop="name"  label="名称" min-width="180">
      </el-table-column>
      <el-table-column prop="IP"  label="IP" min-width="180">
      </el-table-column>
      <el-table-column prop="MAC"  label="MAC" min-width="240">
      </el-table-column>
      <el-table-column prop="duration"  label="时长" min-width="120">
      </el-table-column>
    </el-table>


    <div class="line_02"><span>WEB上下线</span></div>
    <!--
    <div style="background-color: #EEF6F6">
        <p style="padding: 5px 10px; font-weight: bold">WEB上下线</p>
    </div>
    -->
    <el-table :data="hardwareInfo" style="width: 100%" :header-cell-style="headerStyle">
      <el-table-column prop="time"  label="时间" min-width="180">
      </el-table-column>
      <el-table-column prop="name"  label="名称" min-width="180">
      </el-table-column>
      <el-table-column prop="IP"  label="IP" min-width="180">
      </el-table-column>
      <el-table-column prop="MAC"  label="MAC" min-width="240">
      </el-table-column>
      <el-table-column prop="duration"  label="时长" min-width="120">
      </el-table-column>
    </el-table>

  </section>
</template>

<script>
  export default {
    name: 'BMDisplay',
    data (){
      return{
        hardwareInfo: [],
      }
    },
    methods:{
      headerStyle() {
        return this.header()
      },
    }
  }
</script>

<style scoped>

</style>
