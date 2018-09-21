<template>
  <div>

    <div class="line_02">
      <span>网口定位</span>
    </div>

    <div class="top">
      <span>当前网口状态: {{ status }}</span>
      <el-button type="primary" @click="readapt">重新定位</el-button>
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
      code: this.$store.state.app.adaptiveCode,
      adaStatus: 1  // 1: 需要重新定位   0: 不需要
    }
  },
  components: {
    adaptive
  },
  watch: {
    code: function(code) {
      if (code === 200) {
        this.status = '已完成定位'
      } else if (code === 0) {
        this.status = '请完成网口定位'
      }
    }
  },
  methods: {
    readapt() {
      this.adaStatus = 1
      this.$store.dispatch('setAdaptive', 0)
    },
    finishSorting(val) {
      console.log(val)
      if (val === 'finish') {
        this.adaStatus = 1
      } else if (val === 'cancel') {
        this.adaStatus = 0
      }
    }
  }
}
</script>

<style scoped>
.top {
  width: 100%;
}
.top > span {
    width: 10rem;
  }
p {
  margin: 3rem auto 1rem auto;
}
.whole-router {
  width: 80%;
  margin: auto;
}
</style>
