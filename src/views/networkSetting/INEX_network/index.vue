<template>
  <section>
    <!-- 终端设置部分 -->
    <div class="line_02"><span>{{$t('INEXNetwork.dividingLine.title1')}}</span></div>

    <dataDisplayer class="setting"></dataDisplayer>

    <!-- 状态接口部分 -->
    <div class="line_02"><span>{{$t('INEXNetwork.dividingLine.title1')}}</span></div>

    <router class="wholeRouter-out"></router>

  </section>
</template>

<script >
  import { dataDisplayer, router } from './components'
  export default {
    name: 'index',
    components: {
      dataDisplayer,
      router
    }
  }
</script>

<style scoped>
  .setting {
    margin: 10px;
    color: #909399;
  }

 .wholeRouter-out {
    width: 65%;
    border: 1px solid lightgrey;
    background-color: ghostwhite;
    color: #909399;
  }
</style>