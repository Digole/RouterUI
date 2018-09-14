<template>
  <div>

    <div class="line_02">
      <span>网口定位</span>
    </div>

    <div class="top">
      <span>当前网口状态: {{ status }}</span>
      <el-button type="primary">重新定位</el-button>
    </div>

      <adaptive :adaptiveStatus="adaStatus" @finishSorting="finishSorting" class="whole-router"></adaptive>

  </div>
</template>

<script>
import adaptive from '@/utils/adaptive.vue'
export default {
  name: 'ports',
  data() {
    return {
      status: '已完成定位',
      code: this.$store.status.app.adaptiveCode,
      adaStatus: 1
    }
  },
  components: {
    adaptive
  },
  watch: {
    code: function(code) {
      if (code === 200) {
        this.status = '已完成定位'
      } else {
        this.status = '请完成网口定位'
      }
    }
  },
  methods: {
    readapt() {
      this.adaStatus = 0
    },
    finishSorting(val) {
      console.log(val)
      this.adaStatus = 1
    }
  }
}
</script>

<style scoped>
.top {
  width: 100%;
}
p {
  margin: 3rem auto 1rem auto;
}
.whole-router {
  width: 80%;
  margin: auto;
}
</style>
