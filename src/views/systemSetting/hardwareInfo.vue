<template>
  <section>
    <div class="line_02">
      <span>{{$t('systemSetting.hardwareInfo')}}</span>
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
import { getHardware } from '../../api/api'
export default {
  name: 'hardwareInfo',

  data() {
    return {
      hardwareInfo: [
        {
          name: 'CPU',
          hardware: ''
        },
        {
          name: '存储',
          hardware: ''
        },
        {
          name: '内存',
          hardware: ''
        }
      ]
    }
  },
  methods: {
    getInfo() {
      getHardware()
        .then(res => {
          if (res.data.code === 200) {
            this.hardwareInfo[0].hardware = res.data.cpu
            this.hardwareInfo[1].hardware = res.data.sto
            this.hardwareInfo[2].hardware = res.data.mem
          }
        })
    }
  },
  mounted() {
    this.getInfo()
  }
}
</script>

<style scoped>
</style>
