<template>
  <div>

    <div class="line_02">
      <span>网口定位</span>
    </div>

    <div class="top">
      <span>当前网口状态: {{ status }}</span>
      <el-button type="primary" @click.native="readapt">重新定位</el-button>
    </div>

      <adaptive ref="router" class="whole-router"></adaptive>

  </div>
</template>

<script>
import adaptive from '@/utils/adaptive.vue'
export default {
  name: 'ports',
  data() {
    return {
      status: '已完成定位',
      code: 0
    }
  },
  components: {
    adaptive
  },
  watch: {
    code: function(code) {
      this.code = this.$refs.router.checked
      console.log('7771' + this.code)
      if (code === 200) {
        console.log('7771')
        this.status = '已完成定位'
      } else {
        this.status = '请完成网口定位'
        console.log('7772')
      }
    }
  },
  methods: {
    readapt() {
      this.$refs.router.modifyChecked()
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
  margin: 2rem auto;
}
</style>
