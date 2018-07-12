<template>
  <section>
    <div class="line_02"><span>硬件信息</span></div>
    <el-table :data="hardwareInfo" style="width: 100%">
      <el-table-column prop="name"  width="180">
      </el-table-column>
      <el-table-column prop="hardware"  min-width="360">
      </el-table-column>
    </el-table>
  </section>
</template>

<script>
  export default {
    name: 'hardwareInfo',

    data() {
      return {
        hardwareInfo: [{
          name: 'CPU',
          hardware: 'Intel(R) Core(TM) i5-4590 CPU @ 3.30GHz | 6144 KB | 3292 MHz | ×1'
        },
        {
          name: '存储',
          hardware: 'VMware, VMware Virtual S 1.0 (10.00GB)'
        },
        {
          name: '内存',
          hardware: '1023MB'
        },
        {
          name: '网卡：',
          hardware: 'Advanced Micro Devices, Inc. [AMD] 79c970 [PCnet32 LANCE] (rev 10) (eth0 00:0c:29:32:53:92)'
        }
        ]
      }
    }
  }

</script>

<style scoped>

</style>
