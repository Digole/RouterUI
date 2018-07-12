//微信聊天可视化组件
//依赖scrollLoader组件, 依赖指令v-emotion（实现请查看main.js）

//参数：
// width               组件宽度，默认450
// wrapBg              外层父元素背景颜色，默认#efefef
// maxHeight           展示窗口最高高度, 默认900
// contactAvatarUrl    好友头像url
// ownerAvatarUrl      微信主人头像url
// ownerNickname       微信主人昵称
// getUpperData        （必需）当滚动到上方时加载数据的方法，返回值要为Promise对象，resolve的结构同data
// getUnderData        （必需）当滚动到下方时加载数据的方法，返回值同上
// data                （必需）传入初始化数据， 结构如下：
[{
direction: 2, //为2表示微信主人发出的消息，1表示联系人
id: 1, //根据这个来排序消息
type: 1, //1为文本，2为图片
content: '你好!![呲牙]', //当type为1时这里是文本消息，当type2为2时这里要存放图片地址；后续会支持语音的显示
ctime: new Date().toLocaleString() //显示当前消息的发送时间
},
{
direction: 1,
id: 2,
type: 1,
content: '你也好。[害羞]',
ctime: new Date().toLocaleString()
}]

<template>
  <div class="wxchat-container" :style="{backgroundColor: wrapBg}">
    <div class="window" id="window-view-container">
      <!-- data is empty -->
      <div class="loading" v-if="dataArray && dataArray.length==0">
        <div style="margin-top: 300px;text-align:center; font-size: 16px;">
          <span>未查找到聊天记录</span>
        </div>
      </div>

      <!-- loading -->
      <div class="loading" v-if="dataArray.length==0">
        <div style="margin-top: 300px;">
          <div>加载中...</div>
        </div>
      </div>

      <!-- main -->
      <ScrollLoader :minHeight="minHeight" @scroll-to-top="refresh" @scroll-to-botton="infinite" class="container-main" v-if="dataArray && dataArray.length>0" :style="{maxHeight: maxHeight-50 + 'px'}">
        <div class="message">
          <ul>
            <li v-for="(message) in dataArray" :key="message.id" :class="message.direction==2?'an-move-right':'an-move-left'">
              <p class="time system" v-if="message.type==1"> <span v-html="message.content"></span> </p>
            </li>
          </ul>
        </div>

      </ScrollLoader>

    </div>

  </div>
</template>

<script>
  import ScrollLoader from './scrollLoader.vue'
export default {
    name: 'wxChat',
    components: {
      ScrollLoader
    },
    props: {
      contactNickname: {
        type: String,
        default: 'Mystic Faces'
      },
      data: {
        type: Array,
        required: true
      },
      width: {
        type: Number,
        default: 450,
      },
      wrapBg: {
        type: String,
        default: '#'
      },
      maxHeight: {
        type: Number,
        default: 700
      },
      // contactAvatarUrl: {
      //   type: String,
      // },
      // ownerAvatarUrl: {
      //   type: String,
      // },
      getUpperData: {
        type: Function,
        required: true
      },
      getUnderData: {
        type: Function,
        required: true
      }
    },
    data() {
      return {
        isUpperLaoding: false,
        isUnderLaoding: false,
        isRefreshedAll: false,
        isLoadedAll: false,

        minHeight: 700,
        dataArray: []
      }
    },
    created() {

      this.initData()
    },
    mounted(){
      //document.getElementsByTagName('body')[0].scrollTop=0;
      this.minHeight = document.getElementById('window-view-container').offsetHeight
      this.maxHeight = document.getElementById('window-view-container').offsetHeight
    },
    methods: {
      initData(){
        this.dataArray = this.dataArray.concat(this.data)
      },
      //向上拉刷新
      refresh(done) {
        var me = this
        if(me.isUpperLaoding){
          return
        }
        if(me.isRefreshedAll){
          done(true)
          me.isUpperLaoding = false
          return
        }

        try {
          this.getUpperData().then(function(data){
            if(data.length==0){
              me.isRefreshedAll = true
              done(true)
            }else{
              me.dataArray = data.reverse().concat(me.dataArray) //倒序合并
              done()
            }
          })
        } catch (error) {
          console.error('wxChat: props "getUpperData" must return a promise object!')
        }
        me.isUpperLaoding = false
      },
      //向下拉加载
      infinite(done) {
        var me = this
        if(me.isUnderLaoding){
          return
        }
        if(me.isLoadedAll){
          done(true)
          me.isUnderLaoding = false
          return
        }

        try {
          this.getUnderData().then(function(data){
            if(data == 0){
              me.isLoadedAll = true
              done(true)
            }else{
              done()
              me.dataArray = me.dataArray.concat(data) //直接合并
            }
          })
        } catch (error) {
          console.error('wxChat: props "getUnderData" must return a promise object!')
        }
        me.isUnderLaoding = false
      }
    }
  }
</script>

<style scoped>
  .wxchat-container{ width: 100%; height: 100%;z-index: 100; position: fixed; left:0; top: 0; overflow: hidden;}
  .shadow{ position: absolute; top:0; left: 0; z-index: 100; width: 100%; height: 100%; background: #000; opacity: .2; }
  .window {box-shadow: 1px 1px 20px -5px #000; width: 100%; /*max-width: 450px;*/ min-width: 400px; background: yellow; margin: 0 auto; overflow: hidden; padding: 0; height: 100%;position: relative;z-index: 101;}
  button{border:0; background:none; border-radius: 0;text-align: center;}
  button{outline:none;}

  .message{
    height: 100%;
    padding: 10px 15px;
    /*overflow-y: scroll;*/
    background-color: #F5F5F5;
  }
  .message li {
    margin-bottom: 15px;
    left:0;
    position: relative;
    display: block;
  }
  .message .time {
    margin: 10px 0;
    text-align: left;
  }
  .message .time>span {
    display: inline-block;
    padding: 0 5px;
    font-size: 12px;
    color: #000000;
  }
  .message .system>span{
    padding: 4px 9px;
    text-align: left;
  }

  @keyframes moveRight{
    0%{left:-20px; opacity: 0}
    100%{left:0; opacity: 1}
  }
  @-webkit-keyframes moveRight
  {
    0%{left:-20px; opacity: 0}
    100%{left:0px; opacity: 1}
  }
  @keyframes moveLeft{
    0%{left:20px; opacity: 0}
    100%{left:0px; opacity: 1}
  }
  @-webkit-keyframes moveLeft
  {
    0%{left:20px; opacity: 0}
    100%{left:0px; opacity: 1}
  }

</style>
