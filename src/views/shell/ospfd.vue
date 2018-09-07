<template>
  <div>
    <div class="line_02">
      <span>动态路由</span>
    </div>

    <el-col :span="24">
      <el-form :inline="true">
        <el-form-item>
          <span v-if="status">{{ type }}协议已连接！</span>
          <span v-else>{{ type }}协议未连接！</span>
        </el-form-item>
        <el-form-item>
          <el-button v-if="!isLinked" type="primary" @click="link">{{$t('operation.connect')}}</el-button>
          <el-button v-else type="primary" @click="unlink">{{$t('operation.disconnect')}}</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <div v-if="isLinked" class="container">

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
import { startQuagga, stopQuagga, getQuaggaInfo } from '@/api/api.js'
// Create WebSocket connection.
let socket = ''
export default {
  name: 'ripd',
  data() {
    return {
      content: '',
      interactList: [],
      height: 0,
      clearScreen: 0, // 清空屏幕
      keyInUse: '', // 用来监听组合键
      focusStatus: true,

      type: 'ospf',
      code: 2604,

      isLinked: false,
      status: 0 // 协议状态
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
      socket = new WebSocket('ws://10.9.0.13:8000')

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
            if (element.indexOf(this.code)) {
              element = element.subString(4)
              this.interactList.push(element)
            }
          }
        })
        setTimeout(() => {
          this.height++
        }, 100)

        // console.log(this.interactList)
      }
    },

    send(val) {
      console.log(this.content)
      if (val !== '' && val === null) {
        socket.send(this.code + val)
        // this.interactList.push(val)
      } else {
        socket.send(this.code + this.content)
        let lastContent = this.interactList[this.interactList.length - 1]
        lastContent = lastContent + this.content
        this.interactList[this.interactList.length - 1] = lastContent
      }
      this.content = ''
      this.focusStatus = true
    },

    link() {
      let para = {
        name: this.type
      }
      startQuagga(para)
        .then(res => {
          if (res.data.code === 200) {
            this.startTelnet()
            this.isLinked = true
            this.getQuagga()
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    unlink() {
      let para = {
        name: this.type
      }
      stopQuagga(para)
        .then(res => {
          if (res.data.code === 200) {
            this.isLinked = false
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
            this.status = res.data.status
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
      } else {
        if (val.key === 'Enter' && this.content !== '') {
          this.send()
        } else {
          if (val.key === 'ArrowUp' || val.key === 'ArrowDown') {
            this.send(val.key)
          }
        }
      }
    },
    // 监听组合键的方法: 监听到keydown事件记录下当前按键，再通过keyup监听第二个按键，使用setTimeOut清空keydown事件
    outClick(val) {
      this.keyInUse = val.key
      console.log(val.key)
    }
  },
  mounted() {
    // this.startTelnet()
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
    socket.close()
  }
}
</script>


<style lang="scss" scoped>
.container {
  position: relative;
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

