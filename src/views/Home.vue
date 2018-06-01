<template>
  <el-row class="container">

    <el-col :span="24" class="header">
      <el-col :span="5" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">
        {{collapsed?'':sysName}}
      </el-col>
      <el-col :span="11">
        <div class="tools" @click.prevent="collapse" v-model="isCollapse">
          <i class="fa fa-align-justify"></i>
        </div>
      </el-col>


      <el-col :span="4">
      <div>
        <el-radio-group v-model="lang" size="small">
          <el-radio label="zh" border>简体中文</el-radio>
          <el-radio label="en" border>English</el-radio>
        </el-radio-group>
      </div>
      </el-col>


      <el-col :span="4" class="userinfo">
        <el-dropdown trigger="hover">
          <span class="el-dropdown-link userinfo-inner"><img :src="this.sysUserAvatar" /> {{sysUserName}}</span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-col>


    <el-col :span="24" class="main">
      <aside :class="collapsed?'menu-collapsed':'menu-expanded'">
        <el-menu :default-active="$route.path" class="el-menu-vertical-demo" :collapse="isCollapse" :collapse-transition="false" background-color="#222d32" text-color="#aabba1">
          <template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
            <el-submenu :index="index+''" v-if="!item.leaf">
              <template slot="title">
                <i :class="item.iconCls"></i>
                <span style="color:#aabba1;">{{generateTitle(item.meta.title)}}</span>
              </template>
              <el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden" @click="$router.push(child.path)">
                {{generateTitle(child.meta.title)}}
              </el-menu-item>
            </el-submenu>
            <el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path" @click="$router.push(item.children[0].path)">
              <i :class="item.iconCls"></i>
              <span style="color:#aabba1;">{{generateTitle(item.children[0].meta.title)}}</span>
            </el-menu-item>
          </template>
        </el-menu>
      </aside>


      <section class="content-container">
        <div class="grid-content bg-purple-light">
          <el-col :span="24" class="breadcrumb-container">
            <el-breadcrumb separator="/" class="breadcrumb-inner">
              <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
                {{ item.name }}
              </el-breadcrumb-item>
            </el-breadcrumb >

            <el-breadcrumb class="breadcrumb-inner-right" v-model="system">
              <svg class="icon"><use xlink:href="#icon-xiazai1"></use></svg>下行速率:{{system[0].CPURate}}
            </el-breadcrumb>

            <el-breadcrumb class="breadcrumb-inner-right" v-model="system">
              <svg class="icon"><use xlink:href="#icon-shangchuan1"></use></svg>上行速率:{{system[0].RAMRate}}
            </el-breadcrumb>

            <el-breadcrumb class="breadcrumb-inner-right" v-model="system">
              <svg class="icon"><use xlink:href="#icon-CPU"></use></svg>CPU:{{system[0].CPURate}}%
            </el-breadcrumb>

            <el-breadcrumb class="breadcrumb-inner-right" v-model="system">
              <svg class="icon"><use xlink:href="#icon-shuju"></use></svg>内存:{{system[0].RAMRate}}%
            </el-breadcrumb>
          </el-col>
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
  import { getSystem } from '../api/api';
  import { generateTitle } from '@/utils/i18n';

  export default {
    name: 'home',
    data() {
      return {
        sysName:'OpenRT v0.1',
        collapsed:false,
        isCollapse: false,
        sysUserName: '',
        sysUserAvatar: '',
        system:[{"CPURate":"0","RAMRate":"0"}],
      }
    },

    methods: {
      onSubmit() {
        console.log('submit!');
      },

      //退出登录
      logout: function () {
        let _this = this;
        this.$confirm('确认退出吗?', '提示', {
          //type: 'warning'
        }).then(() => {
          sessionStorage.removeItem('user');
          _this.$router.push('/login');
        }).catch(() => {
        });
      },
      //折叠导航栏
      collapse:function(){
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
        this.collapsed = !this.collapsed;
        this.isCollapse = !this.isCollapse;
      },

      showMenu(i,status){
        this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-'+i)[0].style.display=status?'block':'none';
      },

      startSystem: function(){

        setInterval(() => {
          getSystem().then((res) => {
            this.system = res.data.system;
            //console.log("in home");
            //console.log(this.system);
            //this.$store.commit('newRAMRate', this.system[0].RAMRate);
            //this.$store.commit('newCPURate', this.system[0].CPURate);
            //console.log(this.$store.state.RAMRate);
          })
        },1000);
      },

      generateTitle
    },

    created() {
    },
    mounted() {
      let user = sessionStorage.getItem('user');
      if (user) {
        user = JSON.parse(user);
        this.sysUserName = user.name || '';
        this.sysUserAvatar = user.avatar || '';
      }
      this.sysUserName = "翼辉";
      this.sysUserAvatar = "static/logo.png";
      // this.startSystem();
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
    }
  }
</script>

<style scoped lang="scss">

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .icon {
    width: 1em; height: 1em;
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
      color:#fff;
      .userinfo {
        text-align: right;
        padding-right: 35px;
        float: right;
        .userinfo-inner {
          cursor: pointer;
          color:#fff;
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
        height:60px;
        font-size: 22px;
        padding-left:20px;
        padding-right:20px;
        border-color: rgba(238,241,146,0.3);
        border-right-width: 1px;
        border-right-style: solid;
        img {
          width: 40px;
          float: left;
          margin: 10px 10px 10px 18px;
        }
        .txt {
          color:#fff;
        }
      }
      .logo-width{
        width:200px;
      }
      .logo-collapse-width{
        width:65px
      }
      .tools{
        padding: 0 23px;
        width:14px;
        height: 60px;
        line-height: 60px;
        cursor: pointer;
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
        flex:0 0 200px;
        width: 200px;
        // position: absolute;
        // top: 0px;
        // bottom: 0px;
        .el-menu{
          height: 100%;
        }
        .collapsed{
          width:65px;
          .item{
            position: relative;
          }
          .submenu{
            position:absolute;
            top:0;
            left:65px;
            z-index:99999;
            height:auto;
            display:none;
          }

        }
      }
      .menu-collapsed{
        flex:0 0 60px;
        width: 60px;
      }
      .menu-expanded{
        flex:0 0 200px;
        width: 200px;
      }
      .content-container {
        // background: #f1f2f7;
        flex:1;
        // position: absolute;
        // right: 0px;
        // top: 0px;
        // bottom: 0px;
        // left: 230px;
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
            float: right;  margin-right: 30px;
          }
        }
        .content-wrapper {
          background-color: #fff;
          box-sizing: border-box;
        }
      }
    }
  }
</style>
