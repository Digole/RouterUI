<template>
  <div>
    <shell :code="code" :type="type"></shell>
  </div>
</template>

<script>
import shell from '@/utils/newshell.vue'
export default {
  name: 'ospf',
  data() {
    return {
      type: 'ospf',
      code: 2604
    }
  },
  components: {
    shell
  }
}
</script>

