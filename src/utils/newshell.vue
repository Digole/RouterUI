<template>
  <div>
    <div class="line_02">
      <span>动态路由</span>
    </div>

    <el-col  >
      <el-form :inline="true">
        <el-form-item>
          <span style="width:200px;">协议状态: {{ status }} </span>
        </el-form-item>
        <el-form-item class="right1"> <!--加空格保证右边按钮位置不变-->
          <el-button 
          type="primary"                         
          v-if="proStatus && status !== '启用中'+' '"    
          :disabled = "btnStatus" 
          @click="link">{{$t('newshell.connect')}}</el-button>
          <el-button 
          v-else
          :disabled="status === '停止运行'"
          type="primary"
          @click = "unlink">{{$t('newshell.disconnect')}}</el-button>
        </el-form-item>
        
        <el-form-item class="right2"> <!--wyk1010修改按钮位置-->
          <el-button v-if="shellStatus"   type="primary" 
          :disabled="btnStatus || status === '停止运行'" @click="startWebSocket">启动动态路由配置</el-button>
          <el-button v-else type="danger" @click="stopWebSocket">关闭配置</el-button>
        </el-form-item>
        <el-form-item class="right3">
          <el-button type="danger" :disabled="btnStatus"   @click="stopAllWebSocket">关闭所有配置shell</el-button>
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
export default {
  name: 'sehll',
  props: ['code', 'type'],
  components: {
    VueTyper
  },
  data() {
    return {
      // content: '',
      interactList: [],
      lastLine: [],
      height: 0,

      focusStatus: true,

      status: '', // 协议状态
      btnStatus: false,

      username: '',

      proStatus: true, // 用来判断协议按钮显示连接还是断开
      shellStatus: true // 用来判断动态路由按钮显示连接还是断开
    }
  },
  watch: {
    // 'this.$store.state.app.webSocket.count': function() {
    //   if (this.$store.state.app.webSocket.count > 1) {
    //     this.initListener()
    //   } else if (this.$store.state.app.webSocket.count === 1) {
    //     console.log('in init socket')
    //     this.initWebSocket()
    //     this.initListener()
    //   } else if (this.$store.state.app.webSocket.count === 0) {
    //     this.closeWebSocket()
    //     this.removeListener()
    //   }
    // },
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
    initWebSocket() {
      this.$store.state.app.webSocket.socket = new WebSocket(
        'ws://10.9.0.13:8000'
      )
      console.log('in init websocket')
    },

    closeWebSocket() {
      this.$store.state.app.webSocket.socket.close()
      console.log('close websocket')
    },

    initListener() {
      this.$store.state.app.webSocket.socket.addEventListener('message', this.onMessage)
    },

    removeListener() {
      this.$store.state.app.webSocket.socket.removeEventListener('message', this.onMessage)
    },

    onMessage(evt) {
      console.log('get response')
      console.log('evt is ' + evt.data)
      console.log('type is ' + typeof evt.data)
      let result = []
      if (typeof evt.data === 'string') {
        result = evt.data.split('\r\n')

        if (result.length === 1) {
          // 处理键盘输入回显
          // if (result[0].length === 5 && result[0].charAt(4).charCodeAt() !== 8) {
          if (result[0].length === 5) {
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

    getHistory() {
      this.$store.state.app.webSocket.contentList.forEach(element => {
        console.log('history is ' + element)
        if (element.slice(0, 3) === this.code) {
          this.interactList.push(element.slice(3))
        }
      })
    },

    socketStatus(val) {
      if (val) {
        this.$store.state.app.webSocket.count++
        console.log('count++ ' + this.$store.state.app.webSocket.count)
        if (this.$store.state.app.webSocket.count === 1) {
          this.initWebSocket()
          this.initListener()
        }
        if (this.$store.state.app.webSocket.count > 1) {
          this.initListener()
          this.getHistory()
        }
      } else {
        this.$store.state.app.webSocket.count--
        this.$store.state.app.webSocket.socket.removeEventListener('message', this.onmessage)
        if (this.$store.state.app.webSocket.count === 0) {
          this.closeWebSocket()
        }
      }
    },

    onClick(val) {
      console.log(val.key)
      if (this.$store.state.app.webSocket.socket) {
        this.$store.state.app.webSocket.socket.send(this.code + val.key)
      }
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

    // 开启动态路由配置
    startWebSocket() {
      this.socketStatus(1)
      setTimeout(() => {
        this.setShellInfo()
      }, 1000)
    },

    setShellInfo() {
      let para = {
        name: this.type,
        usrname: this.username,
        handle: 'start'
      }

      setShell(para)
        .then(res => {
          if (res.data.code === 200) {
            // 启动按钮不显示
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

    stopWebSocket() {
      // 处理websocket是否需要被清空
      this.socketStatus(0)

      let para = {
        name: this.type,
        usrname: this.username,
        handle: 'stop'
      }
      setShell(para)
        .then(res => {
          if (res.data.code === 200) {
            this.shellStatus = true

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

    stopAllWebSocket() {
      stopAllQuagga()
        .then(res => {
          if (res.data.code === 200) {
            this.$store.state.app.webSocket.count = 0
            this.shellStatus = true
            this.proStatus = true
            this.getQuagga()
          }
        })
        .catch(err => {
          console.log(err)
        })
    },

    // 获取当前页面状态信息
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
              this.status = '启用中' + '  '   // 加空格保证右边按钮位置不变
            }
            if (res.data.status === 2) {
              this.status = '配置中 '
            }
          }
        })
        .catch(err => {
          console.log(err)
        })

      let para2 = {
        usrname: this.username
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
    }

  },
  mounted() {
    let name = sessionStorage.getItem('user')
    name = JSON.parse(name)
    this.username = name.userName

    this.getQuagga()

    window.addEventListener('keyup', this.onClick)
  },
  destroyed () {
    window.removeEventListener('keyup', this.onClick)
    // this.$store.state.app.webSocket.socket.removeEventListener('message', this.onmessage)
  }
}
</script>

<style>
.right1 {
    position: absolute;
    margin-right: 1700px;
    
  }
  .right2 {
    position: absolute;
    margin-left: 110px;
    margin-right: 1800px;
    
  }
  .right3 {
    position: absolute;
    margin-left: 1350px;
    margin-right: 10px;
    
  }
  
</style>