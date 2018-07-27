<template>
  <el-row class="container">

    <el-col :span="24" class="header">
      <el-col :span="5" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">
        {{ collapsed?'':sysName }}
      </el-col>
      <el-col :span="1">
        <!-- <div class="tools" @click.prevent="collapse" v-model="isCollapse"> -->
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
          <span class="el-dropdown-link userinfo-inner"><img :src="this.sysUserAvatar" /> {{sysUserName}}</span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="logout">{{$t('home.logout')}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-col>

    <el-col :span="24" class="main">
      <aside :class="collapsed?'menu-collapsed':'menu-expanded'">
        <el-menu :default-active="$route.path" class="el-menu-vertical-demo" :collapse="isCollapse" :collapse-transition="false" background-color="#222d32" text-color="#aabba1">
          <template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
            <el-submenu :index="index+''" v-if="!item.leaf" :key="index">
              <template slot="title">
                <i :class="item.iconCls"></i>
                <span style="color:#aabba1;">{{generateTitle(item.meta.title)}}</span>
              </template>
              <el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden" @click="$router.push(child.path)">
                {{generateTitle(child.meta.title)}}
              </el-menu-item>
            </el-submenu>
            <el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path" @click="$router.push(item.children[0].path)" :key="index">
              <i :class="item.iconCls"></i>
              <span style="color:#aabba1;">{{generateTitle(item.children[0].meta.title)}}</span>
            </el-menu-item>
          </template>
        </el-menu>
      </aside>

      <section class="content-container">
        <div class="grid-content bg-purple-light">
          <el-col :span="6" class="breadcrumb-container">
            <el-breadcrumb separator="/" class="breadcrumb-inner">
              <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
                {{ item.name }}
              </el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>

          <div class="monitor">
            <div class="inner-right">
              <svg class="icon">
                <use xlink:href="#icon-CPU"></use>
              </svg>CPU:{{this.data.cpu}}%
            </div>

            <div class="inner-right">
              <svg class="icon">
                <use xlink:href="#icon-shuju"></use>
              </svg>{{$t('home.ram')}}:{{this.data.memory}}%
            </div>
            <div class="inner-right long">
              <svg class="icon">
                <use xlink:href="#icon-shangchuan1"></use>
              </svg>{{$t('home.up')}}:{{this.data.up}}
            </div>
            <div class="inner-right long">
              <svg class="icon">
                <use xlink:href="#icon-xiazai1"></use>
              </svg>{{$t('home.down')}}:{{this.data.down}}
            </div>
          </div>

          <el-col :span="24" class="content-wrapper">
            <transition name="fade" mode="out-in">
              <router-view></router-view>
            </transition>
          </el-col>
        </div>
      </section>

    </el-col>
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
      sysName: 'OpenRT v0.1',
      collapsed: false,
      isCollapse: false,
      sysUserName: '',
      sysUserAvatar: '',
      system: [{ CPURate: '0', RAMRate: '0' }],
      data: {
        up: '',
        down: '',
        cpu: '',
        memory: ''
      }
    }
  },
  computed: {
    lang: {
      get() {
        console.log('get')
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
        .catch(() => {})
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

    showMenu(i, status) {
      this.$refs.menuCollapsed.getElementsByClassName(
        'submenu-hook-' + i
      )[0].style.display = status ? 'block' : 'none'
    },

    chooseLang(val) {
      this.lang = val
    },

    generateTitle,

    getInfo() {
      this.update()
      setInterval(this.update, 2000)
    },

    async update() {
      let para = {}
      para.page = 1
      para.type = 5
      await getMonitorInfo(para).then(res => {
        if (res.data.code === 200) {
          this.data.up = conversion(res.data.data[0].recv_rate)
          this.data.down = conversion(res.data.data[0].send_rate)
          console.log(this.data.up)
          // this.$store.dispatch('pushSystemData', data)
        }
      })
      let para1 = {}
      para1.type = 6
      await getMonitorInfo(para1).then(res => {
        if (res.data.code === 200) {
          this.data.cpu = (res.data.cpu_usage).toFixed(2)
          this.data.memory = (res.data.memory_usage).toFixed(2)
          this.data.userNum = res.data.online_users
        }
      })
      this.$store.dispatch('pushSystemData', this.data)
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
