<template>
  <div>
    <div class="line_02">
      <span>动态路由</span>
    </div>

    <el-col :span="24" class="col">
      <el-form :inline="true">
        <el-form-item>
          <span>{{ type }}协议状态: {{ status }}</span>
        </el-form-item>
        <el-form-item>
          <el-button v-if="proStatus && status !== '启用中'" type="primary" :disabled="btnStatus" @click="link">{{$t('operation.connect')}}</el-button>
          <el-button v-else type="primary" @click="unlink">{{$t('operation.disconnect')}}</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" :disabled="btnStatus" @click="stopWebSocketAll">关闭全部连接</el-button>
        </el-form-item>
        <el-form-item>
          <el-button v-if="shellStatus" type="primary" :disabled="btnStatus" @click="startWebSocket">启动动态路由配置</el-button>
          <el-button v-else type="danger" @click="stopWebSocket">关闭配置</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <div v-if="!shellStatus" class="container">

      <div class="shell_container" id="content-container">
        <div class="line" v-for="(item,index) in interactList" :key="index" :class="{lastP: (index === (interactList.length - 1))}">
          {{ item }}
        </div>
        <div class="send-line">
          <input v-model="content" v-focus="focusStatus">
        </div>
      </div>

      <!-- <div class="send-line">
        <el-input v-model="content"></el-input>
        <el-button @click="send">发送</el-button>
      </div> -->

    </div>
  </div>

</template>

<script>
import {
  setQuagga,
  getQuaggaInfo,
  setShell,
  getBtnInfo,
  stopAllQuagga
} from '@/api/api.js'
// Create WebSocket connection.
let socket
let username
export default {
  name: 'sehll',
  props: ['code', 'type'],
  data() {
    return {
      content: '',
      interactList: [],
      height: 0,
      clearScreen: 0, // 清空屏幕
      keyInUse: '', // 用来监听组合键
      focusStatus: true,

      status: '', // 协议状态
      btnStatus: false,

      proStatus: true,  // 用来判断协议按钮显示连接还是断开
      shellStatus: true // 用来判断动态路由按钮显示连接还是断开
    }
  },
  watch: {
    height: function() {
      let container = this.$el.querySelector('#content-container')
      container.scrollTop = container.scrollHeight
    }
  },
  directives: {
    focus: {
      inserted: function(el, { value }) {
        if (value) {
          el.focus()
        }
      }
    }
  },
  methods: {
    startTelnet() {
      this.$store.state.app.webSocket.socket = new WebSocket('ws://10.9.0.13:8000')

      socket = this.$store.state.app.webSocket.socket
      // Connection opened
      socket.addEventListener('open', function(event) {
        console.log('opened!!!!!!!!!!!!!!!')
      })

      socket.onopen = function(evt) {
        console.log('in sending')
      }

      socket.onmessage = evt => {
        console.log('get response')
        let result = evt.data.split('\r\n')
        // console.log(result)
        result.forEach((element, index) => {
          if (index !== 0) {
            // if (element.indexOf(this.code)) {
            // element = element.subString(4)
            this.interactList.push(element)
            // }
          }
        })
        setTimeout(() => {
          this.height++
        }, 100)

        // console.log(this.interactList)
      }
    },

    send(val) {
      if (val !== '' && val !== undefined) {
        console.log('this is val ' + val)
        // socket.send(val)
        socket.send(this.code + val)
        // this.interactList.push(val)
      } else {
        console.log('this is conetent ' + this.content)
        // socket.send(this.content)
        socket.send(this.code + this.content)
        let lastContent = this.interactList[this.interactList.length - 1]
        lastContent = lastContent + this.content
        this.interactList[this.interactList.length - 1] = lastContent
      }
      this.content = ''
      this.focusStatus = true
    },
    // 启动动态路由协议
    link() {
      let para = {
        name: this.type,
        handle: 'start'
      }
      setQuagga(para)
        .then(res => {
          if (res.data.code === 200) {
            this.proStatus = false
            this.getQuagga()
          }
          if (res.data.code === 100) {
            this.$message({
              message: '其他用户正在配置中，请稍后再试',
              type: 'warning'
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 开启动态路由配置
    startWebSocket() {
      let para = {
        name: this.type,
        usrname: username,
        handle: 'start'
      }
      setShell(para)
        .then(res => {
          if (res.data.code === 200) {
            // 启动按钮不显示
            this.socketListener(1)
            this.shellStatus = false
            this.getQuagga()
          }
          if (res.data.code === 100) {
            this.$message({
              message: '其他用户正在配置中，请稍后再试',
              type: 'warning'
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    unlink() {
      let para = {
        name: this.type,
        handle: 'stop'
      }
      setQuagga(para)
        .then(res => {
          if (res.data.code === 200) {
            this.proStatus = true
            this.getQuagga()
          }
          if (res.data.code === 100) {
            this.$message({
              message: '其他用户正在配置中，请稍后再试',
              type: 'warning'
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    stopWebSocket() {
      let para = {
        name: this.type,
        usrname: username,
        handle: 'stop'
      }
      setShell(para)
        .then(res => {
          if (res.data.code === 200) {
            this.shellStatus = true

            // 处理websocket是否需要被清空
            this.socketListener(0)

            // 启动按钮不显示
            this.getQuagga()
          }
          if (res.data.code === 100) {
            this.$message({
              message: '其他用户正在配置中，请稍后再试',
              type: 'warning'
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    stopWebSocketAll() {
      stopAllQuagga()
        .then(res => {
          if (res.data.code === 200) {
            this.$store.state.app.webSocket.count = 1
            this.socketListener(0)
            console.log('after closing all ' + socket)
            this.shellStatus = true
            this.proStatus = true
            this.getQuagga()
          }
        })
        .catch(err => {
          console.log(err)
        })
    },

    getQuagga() {
      let para = {
        name: this.type
      }
      getQuaggaInfo(para)
        .then(res => {
          if (res.data.code === 200) {
            if (res.data.status === 0) {
              this.status = '停止运行'
            }
            if (res.data.status === 1) {
              this.status = '启用中'
            }
            if (res.data.status === 2) {
              this.status = '配置中'
            }
          }
        })
        .catch(err => {
          console.log(err)
        })

      let para2 = {
        usrname: username
      }
      console.log('before get btn info ' + para2.usrname)
      getBtnInfo(para2)
        .then(res => {
          if (res.data.code === 200) {
            this.btnStatus = false
          } else if (res.data.code === 500) {
            this.btnStatus = true
          }
        })
        .catch(err => {
          console.log(err)
        })
    },

    onClick(val) {
      if (this.keyInUse === 'c' || this.keyInUse === 'Control') {
        if (this.keyInUse !== val.key) {
          if (val.key === 'c' || val.key === 'Control') {
            // this.clearScreen++
            console.log('control + c')
          }
        }
      } else if (val.key === 'Enter' && this.content !== '') {
        this.send()
      } else {
        if (val.key === 'ArrowUp' || val.key === 'ArrowDown') {
          this.send(val.key)
        }
      }
    },
    // 监听组合键的方法: 监听到keydown事件记录下当前按键，再通过keyup监听第二个按键，使用setTimeOut清空keydown事件
    outClick(val) {
      this.keyInUse = val.key
      console.log(val.key)
    },

    socketListener(val) {
      if (val) {
        this.$store.state.app.webSocket.count++
        console.log('count++ ' + this.$store.state.app.webSocket.count)
        if (this.$store.state.app.webSocket.count === 1) {
          this.startTelnet()
        }
      } else {
        this.$store.state.app.webSocket.count--
        console.log('count-- ' + this.$store.state.app.webSocket.count)
        if (this.$store.state.app.webSocket.count === 0) {
          this.$store.state.app.webSocket.socket.close()
          console.log('close socket! ' + this.$store.state.app.webSocket.socket)
        }
      }
      socket = this.$store.state.app.webSocket.socket
    }
  },
  mounted() {
    socket = this.$store.state.app.webSocket.socket
    if (socket) {
      // Connection opened
      socket.addEventListener('open', function(event) {
        console.log('opened!!!!!!!!!!!!!!!')
      })

      socket.onopen = function(evt) {
        console.log('in sending')
      }

      socket.onmessage = evt => {
        console.log('get response')
        let result = evt.data.split('\r\n')
        // console.log(result)
        result.forEach((element, index) => {
          if (index !== 0) {
            // if (element.indexOf(this.code)) {
            // element = element.subString(4)
            this.interactList.push(element)
            // }
          }
        })
        setTimeout(() => {
          this.height++
        }, 100)

        // console.log(this.interactList)
      }
    }

    let name = sessionStorage.getItem('user')
    name = JSON.parse(name)
    username = name.userName

    this.getQuagga()

    window.addEventListener('keyup', this.onClick)
    window.addEventListener('keydown', this.outClick)

    // // Listen for messages
    // socket.addEventListener('message', event => {
    //   console.log('Message from server ', event.data)
    //   this.interactList.push(event.data)
    // })
  },

  beforeDestroy() {
    // socket.close()
  }
}
</script>


<style lang="scss" scoped>
.col {
  height: 4rem;
}
.container {
  // position: relative;
  margin-top: 1rem;
  .shell_container {
    height: 75vh;
    padding: 1rem 0.5rem;
    background-color: RGB(1, 36, 86);
    overflow: auto;
    .line {
      height: 1rem;
      margin: 0.1rem 0;
      line-height: 1rem;
      color: ghostwhite;
    }
    .lastP {
      float: left;
      height: 1rem;
      margin: 0.1rem 0;
      line-height: 1rem;
      color: ghostwhite;
    }
    .send-line {
      display: flex;
      margin: 0.1rem 0;
      input {
        width: 100%;
        height: 1.1rem;
        line-height: 1rem;
        padding: 0;
        font-family: Helvetica Neue;
        font-size: 14px;
        background-color: RGB(1, 36, 86);
        border: none;
        color: white;
        outline: none;
      }
    }
  }
}
</style>

