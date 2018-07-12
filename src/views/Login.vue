<template>
  <div class="backgroundDiv">
    <div class="pic">
      <img src="../../static/logo.png" />
    </div>
    <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0" class="demo-ruleForm login-container">
      <p class="title">OpenRT</p>
      <el-form-item prop="account">
        <el-input style="color: #ffffff" type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="checkPass">
        <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>
      <div style="display: inline;">
        <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
        <!--<router-link to="/CreatePasswd">忘记密码</router-link>-->
        <el-tooltip placement="bottom" effect="light">
          <div slot="content" style="text-align: right;">请在控制台<br/>更改密码</div>
          <el-button type="text" style="text-align: right;">忘记密码？</el-button>
        </el-tooltip>
      </div>
      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining">登录</el-button>
        <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  // import { requestLogin } from '../api/api'
//import NProgress from 'nprogress'
export default {
    data() {
      return {
        logining: false,
        ruleForm2: {
          account: 'admin',
          checkPass: '123456'
        },
        rules2: {
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            //{ validator: validaePass }
          ],
          checkPass: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            //{ validator: validaePass2 }
          ]
        },
        checked: true

      }
    },
    methods: {
      handleReset2() {
        this.$refs.ruleForm2.resetFields()
      },
      // handleSubmit2() {
      //   const user = [
      //     {
      //       id: 1,
      //       username: 'admin',
      //       password: '123456',
      //       // avatar: 'https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/user.png',
      //       name: 'OpenRT'
      //     }
      //   ];
      //   sessionStorage.setItem('user', JSON.stringify(user));
      //   //let _this = this;
      //   this.$refs.ruleForm2.validate((valid) => {
      //     if (valid) {
      //       //_this.$router.replace('/table');
      //       this.logining = true;
      //       //NProgress.start();
      //       let loginParams = {username: this.ruleForm2.account, password: this.ruleForm2.checkPass};
      //       requestLogin(loginParams).then(data => {
      //         console.log("login response:"+data);
      //         this.logining = false;
      //         //NProgress.done();
      //         //let { msg, code, user } = data;
      //         let { msg, code } = data;
      //         if (code !== 200) {
      //           this.$message({
      //             message: msg,
      //             type: 'error'
      //           });
      //         }
      //         else {
      //           sessionStorage.setItem('user', JSON.stringify(user));
      //           //this.$router.push({ path: '/table' });
      //           this.$router.push({ path: '/modeChoose' });
      //         }

      //       });
      //     } else {
      //       console.log('error submit!!');
      //       return false;
      //     }
      //   });
      // },
      handleSubmit2 () {
        const user = [
          {
            id: 1,
            username: 'admin',
            password: '123456',
            // avatar: 'https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/user.png',
            name: 'OpenRT'
          }
        ]
        sessionStorage.setItem('user', JSON.stringify(user))
        this.$router.push('/ModeChoose')
      }
    }
  }

</script>

<style lang="scss" scoped>
  .backgroundDiv {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    background: url(../../static/bg.jpg);
    background-size: 100% 100%;
  }

  .pic{
    opacity:0.7;
    text-align: center;
    margin-top: 180px;
  }

  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 20px auto;
    width: 320px;
    padding: 35px 35px 15px 35px;
    //background: #fff;
    background: grey;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    opacity:0.7;
    color: white;
    .title {
      margin: 20px auto;
      text-align: center;
      //color: #505458;
      color: white;
      font-size: 20px;
      font-weight: bold;
    }
    .remember {
      margin: 0 0 35px 0;
      width: 75%;
      color: white;
    }
    input:-ms-input-placeholder{
      color: white;
    }
    input::-webkit-input-placeholder{
      color: white;
    }

  }
</style>
