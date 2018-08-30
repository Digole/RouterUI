<template>
  <div class="shell_container">
    <el-input type="textarea" rows="36" v-model="content"></el-input>
    <el-input v-model="content"></el-input>
    <el-button @click="send">发送</el-button>
  </div>
</template>

<script>
// Create WebSocket connection.
const socket = new WebSocket('ws://10.9.0.13:8000')

export default {
  name: 'shell',
  data() {
    return {
      content: ''
    }
  },
  methods: {
    startTelnet() {
      // Connection opened
      socket.addEventListener('open', function (event) {
        console.log('opened!!!!!!!!!!!!!!!')
      })

      // Listen for messages
      socket.addEventListener('message', function (event) {
        console.log('Message from server ', event.data)
      })

      socket.onopen = function(evt) {
        console.log('in sending')
      }
    },
    send() {
      socket.send(this.content)

      // Listen for messages
      socket.addEventListener('message', function (event) {
        console.log('Message from server ', event.data)
        this.content = event.data
      })
    }
  },
  mounted() {
    this.startTelnet()
  }
}
</script>


<style lang="scss" scoped>
.shell_container {
  margin-top: 1rem;
  overflow: hidden;
  height: 88vh;
  background-color: black;
  pre {
    line-height: 2rem;
    font-size: 18px;
    color: #fff;
  }
}
</style>

