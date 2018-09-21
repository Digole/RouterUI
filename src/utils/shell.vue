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
          <el-button 
          type="primary" 
          v-if="proStatus && status !== '启用中'"
          :disabled="btnStatus" 
          @click="link">{{$t('operation.connect')}}</el-button>
          <el-button 
          v-else
          :disabled="!(status === '启用中')"
          type="primary"
          @click="unlink">{{$t('operation.disconnect')}}</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" :disabled="btnStatus" @click="stopWebSocketAll">关闭全部连接</el-button>
        </el-form-item>
        <el-form-item>
          <el-button v-if="shellStatus" type="primary" 
          :disabled="btnStatus || status === '停止运行'" @click="startWebSocket">启动动态路由配置</el-button>
          <el-button v-else type="danger" @click="stopWebSocket">关闭配置</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <div v-if="!shellStatus" class="container">
      <div class="shell_container" id="content-container">

        <div v-for="(item, index) in interactList" :key='index' class="line">
          <vue-typer v-if="index !== (interactList.length - 1)" :text="item" :repeat="0" :typeDelay="0">
          </vue-typer>
        </div>
        <div class="line">
          <!-- <input v-model="interactList[interactList.length - 1]"> -->
          <vue-typer :text="interactList[interactList.length -1]" :repeat="0" :typeDelay="0"></vue-typer>
          <vue-typer
          v-for="(item, index) in lastLine" :key="index"
          :text="item" :repeat="0" :typeDelay="0">
          </vue-typer>
        </div>

        <!-- <div class="shell_container" id="content-container">
        <div class="line" v-for="(item,index) in interactList" :key="index" :class="{lastp: (index === (interactList.length - 1))}">
          {{ item }}
        </div>
        <div class="line">{{ interactList }}</div>
        <div class="send-line">
          <input v-model="content" v-focus="focusStatus">
        </div>
      </div> -->

      </div>
    </div>
  </div>

</template>

<script>
import { VueTyper } from 'vue-typer'
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
  components: {
    VueTyper
  },
  data() {
    return {
      content: '',
      interactList: [],
      lastLine: [],
      height: 0,
      clearScreen: 0, // 清空屏幕
      keyInUse: '', // 用来监听组合键
      focusStatus: true,

      status: '', // 协议状态
      btnStatus: false,

      proStatus: true, // 用来判断协议按钮显示连接还是断开
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
    startWithoutSocket() {

    },

    startTelnet() {
      this.$store.state.app.webSocket.socket = new WebSocket(
        'ws://10.9.0.13:8000'
      )
      // this.initListener()
    },

    // socket监听信息
    initListener() {
      socket = this.$store.state.app.webSocket.socket

      // Connection opened
      socket.addEventListener('open', function(event) {
        console.log('opened!!!!!!!!!!!!!!!')
      })

      socket.addEventListener('message', onmessage)

      onmessage = evt => {
        console.log('get response')
        // console.log(evt)

        let result = evt.data.split('\r\n')
        result.forEach(item => {
          console.log(item)
        })
        if (result.length === 1) {
        // 处理键盘输入回显
          if (result[0].length === 5 && result[0].charAt(4).charCodeAt() !== 8) {
            let letter = result[0].charAt(4)

            // this.interactList[this.interactList.length - 1] += letter
            this.lastLine.push(letter)
          } else if (result[0].length === 7 && result[0].charAt(4).charCodeAt() === 8) {
          // 处理backspace,后端返回的值为code + '08 20 08' （ascii码）

            this.lastLine = this.lastLine.slice(0, this.lastLine.length - 1)
          } else if (result[0].length > 5 && result[0].charAt(4).charCodeAt() !== 8) {
            // 处理上键的返回值
            this.lastLine = result[0].slice(4, result[0].length)
          }  else if (result[0].length > 7 && result[0].charAt(4).charCodeAt() === 8) {
            // 处理两次及以上上键的返回值
            for (let i = 4; i < result[0].length; i++) {
              if (result[0].charAt(i).charCodeAt() !== 8) {
                // 因为后端传回的有 /b * n + 空格 * n + /b * n，所以需要去掉3*(i-4)的内容
                this.lastLine = result[0].slice(4 + (i - 4) * 3, result[0].length)
                return true
              }
            }
          }
        } else {
          // 处理非键盘回显
          result.forEach((element, index) => {
            if (index !== 0) {
              this.interactList.push(element)
              this.$store.state.app.webSocket.contentList.push(
                this.code + element
              )
              console.log('have pushed! ')
            }
            this.lastLine = []
            // 让屏幕保持在底部
            setTimeout(() => {
              this.height++
            }, 100)
          })
        }
      }
    },

    // 获取历史信息
    getHistory() {
      socket = this.$store.state.app.webSocket.socket
      // 获得之前的交互记录
      if (socket) {
        // this.initListener()
        // console.log('in mounted, initListener created ')
        if (this.$store.state.app.webSocket.contetnList) {
          this.$store.state.app.webSocket.contetnList.forEach(item => {
            console.log('get history ' + item)
            if (item.slice(0, 3) === this.code) {
              this.interactList.push(item.slice(3))
            }
          })
          console.log(typeof (this.$store.state.app.webSocket.contetnList) + '  ' +
          this.$store.state.app.webSocket.contetnList)
        }
      }
    },

    send(val) {
      // if (val === 'Enter') {
      //   socket.send('Enter')
      // } else {
      //   console.log('this is conetent ' + this.content)

      //   socket.send(this.code + this.content)

      //   let lastContent = this.interactList[this.interactList.length - 1]
      //   lastContent = lastContent + this.content
      //   this.interactList[this.interactList.length - 1] = lastContent
      //   this.$store.state.app.webSocket.contetnList[this.$store.state.app.webSocket.contetnList.length - 1] = lastContent
      // }
      // this.content = ''
      // this.focusStatus = true
      socket.send(this.code + val.key)
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
        .then(this.getHistory)
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

      this.interactList = []
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
      // if (this.keyInUse === 'c' || this.keyInUse === 'Control') {
      //   if (this.keyInUse !== val.key) {
      //     if (val.key === 'c' || val.key === 'Control') {
      //       console.log('control + c')
      //     }
      //   }
      // } else {
      //   if (val.key === 'ArrowUp' || val.key === 'ArrowDown' || val.key === 'Enter') {
      //     this.send(val.key)
      //   }
      // }
      if (val.key === 'ArrowUp' || val.key === 'ArrowDown') {
        this.send(val)
        return false
      } else {
        this.send(val)
      }
    },
    // 监听组合键的方法: 监听到keydown事件记录下当前按键，再通过keyup监听第二个按键，使用setTimeOut清空keydown事件
    outClick(val) {
      this.keyInUse = val.key
    },

    socketListener(val) {
      if (val) {
        this.$store.state.app.webSocket.count++
        // console.log('count++ ' + this.$store.state.app.webSocket.count)
        if (this.$store.state.app.webSocket.count === 1) {
          this.startTelnet()
        }
      } else {
        this.$store.state.app.webSocket.count--
        // console.log('count-- ' + this.$store.state.app.webSocket.count)
        if (this.$store.state.app.webSocket.count === 0) {
          this.$store.state.app.webSocket.socket.close()
          // console.log(
          //   'close socket! ' + this.$store.state.app.webSocket.socket
          // )
        }
      }
      socket = this.$store.state.app.webSocket.socket
    }
  },
  mounted() {
    let name = sessionStorage.getItem('user')
    name = JSON.parse(name)
    username = name.userName

    socket = this.$store.state.app.webSocket.socket
    // 获得之前的交互记录
    if (socket) {
      this.initListener()
    }

    this.getQuagga()

    window.addEventListener('keyup', this.onClick)
    window.addEventListener('keydown', this.outClick)
  },
  destroyed () {
    window.removeEventListener('keyup', this.onClick)
    window.removeEventListener('keydown', this.outClick)
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
    height: 72vh;
    padding: 1rem 0.5rem;
    // background-color: RGB(1, 36, 86);
    overflow: hidden;
    .line {
      height: 1rem;
      input {
        outline: none;
        border: none;
      }
      .vue-typer {
        span {
          color: ghostwhite;
        }
      }
      .lastp {
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
          // background-color: RGB(1, 36, 86);
          border: none;
          color: white;
          outline: none;
        }
      }
    }
  }
}
</style>

