<template>

  <!--标题栏-->
  <el-row class="container">
    <el-col :span="24" class="header">
      <el-col :span="5" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">
        {{ collapsed?'':sysName }}
      </el-col>
      <el-col :span="1">
        <div class="tools" @click.prevent="collapse">
          <i class="fa fa-align-justify"></i>
        </div>
      </el-col>

      <el-col :span="14">
        <div>
          <span @click="chooseLang('zh')" class="lang" :class="{selected: this.lang === 'zh'}">中文</span>
          <span>/</span>
          <span @click="chooseLang('en')" class="lang" :class="{selected: this.lang === 'en'}">EN</span>
        </div>
      </el-col>

     

      <el-col :span="4" class="userinfo">

        <el-dropdown trigger="hover">
         <span class="situationMode el-dropdown-link "> {{$t('situationMode.situation')}}</span>
         <el-dropdown-menu slot="dropdown">
           <el-dropdown-item @click.native="back">{{$t('situationMode.change')}}</el-dropdown-item>
          </el-dropdown-menu>
         </el-dropdown>

        <el-dropdown trigger="hover">
          <span class="el-dropdown-link userinfo-inner"><img :src="this.sysUserAvatar" /> {{sysUserName}}</span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="logout">{{$t('home.logout')}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-col>

     

      
    <!--嵌入的html界面-->
    <!--<iframe id = "child" src="/static/situationMode.html#asd=2" width="1920" height="880" frameborder="0" scrolling="no" style="position:related;top: 2.8px;left: 0px;"></iframe>-->
    <iframe id = "child" :src="Url" width="1920" height="880" frameborder="0" scrolling="no" style="position:related;top: 2.8px;left: 0px;"></iframe>

  </el-row>

  
</template>


<script>
import { generateTitle } from '@/utils/i18n'
import { getMonitorInfo, logout } from '../api/api.js'
import { conversion } from '../utils/rateUnitExchange.js'

export default {
  name: 'home',
  data() {
    return {
      Url: "",
      sysName: 'OpenRT v0.1',
      collapsed: false,
      isCollapse: false,
      sysUserName: '',
      sysUserAvatar: '',
      system: [{ CPURate: '0', RAMRate: '0' }],
      data: {
        up: '',
        down: '',
        upStorage: '',
        downStorage: '',
        cpu: '',
        memory: '',
        userNum: ''
      }
    }
  },
  computed: {
    lang: {
      get() {
        console.log('get')
        console.log('in get ' + this.$store.state.app.language)
        if(this.$store.state.app.language === "en"){
          this.Url="/static/situationMode1.html"
            console.log('en'+this.Url)
       }else{
            this.Url="/static/situationMode2.html"
            console.log('zh'+this.Url)
       }
        return this.$store.state.app.language
      },
      set(lang) {
        console.log('set')
        this.$i18n.locale = lang
        this.$store.dispatch('setLanguage', lang)
      }
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    },

    // 退出登录
    logout: function() {
      let _this = this
      this.$confirm('确认退出吗?', '提示', {
        // type: 'warning'
      })
        .then(() => {
          let para = sessionStorage.getItem('user')
          logout(para).then((res) => {
            if (res.data.code === 200) {
              sessionStorage.removeItem('user')
              _this.$router.push('/login')
            }
          })
        })
        .catch(error => {
          console.log(error)
        })
    },
   back: function(){
this.$router.push('/ModeChoose')
    },
    // 折叠导航栏
    collapse: function() {
      /*
        if(this.collapsed === false) {
          setTimeout((() => {
            this.collapsed = !this.collapsed;
          }), 200);
          this.isCollapse = !this.isCollapse;
        }
        else{
          this.collapsed = !this.collapsed;
          setTimeout((() => {
            this.isCollapse = !this.isCollapse;
          }), 100);
        }
        */
      this.collapsed = !this.collapsed
      this.isCollapse = !this.isCollapse
    },

   

    chooseLang(val) {
      this.lang = val
    },

    generateTitle,

    getInfo() {
      this.update()
      setInterval(() => {
        this.update()
        this.$store.dispatch('pushSystemData', this.data)
      }, 5000)
    },

    async update() {
      let para = {}
      para.page = 1
      para.type = 5
      await getMonitorInfo(para)
        .then(res => {
          if (res.data.code === 200) {
            this.data.upStorage = res.data.data[0].recv_rate
            this.data.downStorage = res.data.data[0].send_rate
            this.data.up = conversion(res.data.data[0].recv_rate)
            this.data.down = conversion(res.data.data[0].send_rate)
            // console.log(this.data.up)
            // this.$store.dispatch('pushSystemData', this.data)
          }
        })
        .catch(error => {
          console.log(error)
        })
      let para1 = {}
      para1.type = 6
      await getMonitorInfo(para1)
        .then(res => {
          if (res.data.code === 200) {
            this.data.cpu = (res.data.cpu_usage).toFixed(0)
            this.data.memory = (res.data.memory_usage).toFixed(0)
            this.data.userNum = res.data.online_users
          }
        })
        .catch(error => {
          console.log(error)
        })
      // this.$store.dispatch('pushSystemData', this.data)
    }
  },

  created() {},
  mounted() {
    let user = sessionStorage.getItem('user')
    if (user) {
      user = JSON.parse(user)
      this.sysUserName = user.name || ''
      this.sysUserAvatar = user.avatar || ''
    }
    this.sysUserName = '翼辉Admin'
    // this.sysUserAvatar = 'static/avatar.jpg'
    this.sysUserAvatar = 'static/acoinfo.png'

    this.getInfo()
  }
}
</script>

<style scoped lang="scss">
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.container {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  .header {
    height: 60px;
    line-height: 60px;
    background: #3c8dbc;
    color: #fff;
    .userinfo {
      text-align: right;
      padding-right: 35px;
      float: right;
      .userinfo-inner {
        cursor: pointer;
        color: #fff;
        img {
          width: 40px;
          height: 40px;
          border-radius: 20px;
          margin: 10px 0 10px 10px;
          float: right;
        }
      }
    }
    .situationMode{
      right: 100px;
      padding-right: 35px;
       cursor: pointer;
        color: #fff;
     
    }
    .logo {
      //width:230px;
      height: 60px;
      font-size: 22px;
      padding-left: 20px;
      padding-right: 20px;
      border-color: rgba(238, 241, 146, 0.3);
      border-right-width: 1px;
      border-right-style: solid;
      img {
        width: 40px;
        float: left;
        margin: 10px 10px 10px 18px;
      }
      .txt {
        color: #fff;
      }
    }
    .logo-width {
      width: 200px;
    }
    .logo-collapse-width {
      width: 65px;
    }
    .tools {
      padding: 0 23px;
      width: 14px;
      height: 60px;
      line-height: 60px;
      cursor: pointer;
    }
    .lang {
      cursor: pointer;
      color: white;
    }
    .selected {
      color: goldenrod;
    }
  }
  .main {
    display: flex;
    // background: #324057;
    position: absolute;
    top: 60px;
    bottom: 0;
    overflow: hidden;
    aside {
      flex: 0 0 200px;
      width: 200px;
      // position: absolute;
      // top: 0px;
      // bottom: 0px;
      .el-menu {
        height: 100%;
      }
      .collapsed {
        width: 65px;
        .item {
          position: relative;
        }
        .submenu {
          position: absolute;
          top: 0;
          left: 65px;
          z-index: 99999;
          height: auto;
          display: none;
        }
      }
    }
    .menu-collapsed {
      flex: 0 0 60px;
      width: 60px;
    }
    .menu-expanded {
      flex: 0 0 200px;
      width: 200px;
    }
    .content-container {
      flex: 1;
      overflow-y: scroll;
      padding: 20px;
      .breadcrumb-container {
        //margin-bottom: 15px;
        .title {
          width: 200px;
          float: left;
          color: #475669;
        }
        .breadcrumb-inner {
          float: left;
        }
        .breadcrumb-inner-right {
          float: right;
          margin-right: 30px;
        }
      }
      .monitor {
        float: right;
        .inner-right {
          display: inline-block;
          width: 6rem;
        }
        .long {
          display: inline-block;
          width: 11rem;
        }
      }
      .content-wrapper {
        background-color: #fff;
        box-sizing: border-box;
      }
    }
  }
}
.el-radio-button__inner {
  background: blue;
}
</style>

