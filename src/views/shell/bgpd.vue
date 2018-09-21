<template>
  <div>
    <shell :code="code" :type="type"></shell>
  </div>
</template>

<script>
import shell from '@/utils/shell.vue'
export default {
  name: 'bgpd',
  data() {
    return {
      type: 'bgp',
      code: 2605
    }
  },
  components: {
    shell
  }
}
</script>

