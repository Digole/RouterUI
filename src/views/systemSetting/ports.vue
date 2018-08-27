<template>
  <div>

    <div class="line_02">
      <span>网口定位</span>
    </div>

    <div class="top">
      <p>当前网口状态: {{status}}</p>

      <adaptive class="whole-router"></adaptive>
    </div>

  </div>
</template>

<script>
import adaptive from '@/utils/adaptive.vue'
export default {
  name: 'ports',
  data() {
    return {
      status: '',
      code: this.$store.status.app.adaptiveCode
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
