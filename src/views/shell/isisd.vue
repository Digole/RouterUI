<template>
  <div>
    <shell :code="code" :type="type"></shell>
  </div>
</template>

<script>
import shell from '@/utils/newshell.vue'
export default {
  name: 'isis',
  data() {
    return {
      type: 'isis',
      code: 2608
    }
  },
  components: {
    shell
  }
}
</script>

