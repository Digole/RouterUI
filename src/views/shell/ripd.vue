
<template>
  <div>
    <shell :code="code" :type="type"></shell>
  </div>
</template>

<script>
import shell from '@/utils/shell.1.vue'
export default {
  name: 'rip',
  data() {
    return {
      type: 'rip',
      code: 2602
    }
  },
  components: {
    shell
  }
}
</script>

