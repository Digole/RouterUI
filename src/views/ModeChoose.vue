<template>
  <div class="backgroundDiv">
    <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container">
      <h3 class="title">模式选择</h3>
      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;" @click.native.prevent="modeSubmit1" :loading="logining">情景模式</el-button>
        <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
      </el-form-item>
      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;" @click.native.prevent="modeSubmit2" :loading="logining">专家模式</el-button>
        <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "ModeChoose",
    methods: {
      modeSubmit1(ev) {
        console.log("modeSubmit1");
      },
      modeSubmit2(ev) {
        this.$router.push({ path: '/lineMonitor' });
      }
    }
  }
</script>

<style lang="scss" scoped>
  .backgroundDiv {
    position: absolute;
    top: 0px;
    bottom: 0px;
    height: 100%;
    width: 100%;
    background: url(../../static/bg+logo.jpg);
  }
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 280px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: grey;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    color: white;
    opacity:0.7;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
  }
</style>
