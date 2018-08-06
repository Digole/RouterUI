<template>
  <section>
    <div class="line_02">
      <span>硬件信息</span>
    </div>
    <el-table :data="hardwareInfo" style="width: 100%">
      <el-table-column prop="name" width="180">
      </el-table-column>
      <el-table-column prop="hardware" min-width="360">
      </el-table-column>
    </el-table>
  </section>
</template>

<script>
export default {
  name: 'hardwareInfo',

  data() {
    return {
      hardwareInfo: [
        {
          name: 'CPU',
          hardware:
            'Intel(R) Atom(TM) CPU D525   @ 1.80GHz'
        },
        {
          name: '存储',
          hardware: 'SSD 8GB'
        },
        {
          name: '内存',
          hardware: '1011 MBytes'
        },
        {
          name: '网卡：',
          hardware:
            'e1000e * 6'
        }
      ]
    }
  }
}
</script>

<style scoped>
</style>
