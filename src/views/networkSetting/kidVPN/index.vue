<template>
  <section>
    <client class="client"></client>

    <div class="line_02">
      <span>{{$t('kidVPN.server.title1')}}</span>
    </div>

    <server class="server"></server>

    <connection class="connection"></connection>
    
    <visualization class="visualization"></visualization>

  </section>
</template>

<script>
import { client, server, connection, visualization } from './components'
export default {
  name: 'index',
  components: {
    client,
    server,
    connection,
    visualization
  },
  data() {
    return {}
  }
}
</script>

<style scoped>
.client {
  height: 40%;
  width: 100%;
}
.visualization {
  display: flex;
  height: 30%;
  width: 48%;
}
</style>