<template>
  <div>
    <shell :code="code" :type="type"></shell>
  </div>
</template>

<script>
import shell from '@/utils/shell.vue'
export default {
  name: 'ripng',
  data() {
    return {
      code: 2603,
      type: 'ripng'
    }
  },
  components: {
    shell
  }
}
</script>

