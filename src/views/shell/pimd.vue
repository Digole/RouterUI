
<template>
  <div>
    <shell :code="code" :type="type"></shell>
  </div>
</template>

<script>
import shell from '@/utils/newshell.vue'
export default {
  name: 'pim',
  data() {
    return {
      type: 'pim',
      code: 2611
    }
  },
  components: {
    shell
  }
}
</script>

