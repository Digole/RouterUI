<template>
  <section>
    <div class="line_02">
      <span>DNS</span>
    </div>

    <el-form ref="form" :model="form" label-width="80px" @submit.prevent="onSubmit" style="margin:20px;width:60%;min-width:600px;">
      <el-form-item label="首选DNS">
        <el-input v-model="form.primary"></el-input>
      </el-form-item>
      <el-form-item label="备选DNS">
        <el-input v-model="form.second"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handle">{{buttonValue}}</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
import { getDNS, setDNS } from '@/api/api.js'
export default {
  name: 'DNS',
  data() {
    return {
      buttonValue: '',
      form: {
        primary: '',
        second: ''
      }
    }
  },
  methods: {
    changeValue: function() {
      let value = ''
      console.log(this.$store.state.routePush)
      if (this.$store.state.routePush) {
        value = '保存并返回'
      } else {
        value = '保存'
      }
      console.log('value is: ' + value)
      return value
    },

    handle: function() {
      let para = Object.assign({}, this.form)
      if (this.buttonValue === '保存') {
        console.log(this.buttonValue)
        // 待添加dns请求
        setDNS(para)
          .then(res => {
            if (res.data.code === 200) {
              this.getDNSInfo()
            }
          })
      } else {
        // 待添加dns请求
        console.log(this.buttonValue)
        this.$router.push({ path: '../INEX_network' })
      }
    },
    getDNSInfo() {
      getDNS()
        .then(res => {
          if (res.data.code === 200) {
            this.form.primary = res.data.primary
            this.form.second = res.data.second
          }
        })
    }
  },

  mounted() {
    this.buttonValue = this.changeValue()
    this.getDNSInfo()
  }
}
</script>

<style scoped>
.line_02 {
  margin-bottom: 20px;
  margin-top: 30px;
  height: 1px;
  border-top: 1px solid #ddd;
  text-align: left;
  color: #909399;
}
.line_02 span {
  position: relative;
  top: -10px;
  background: #fff;
  padding: 0 30px 0 0;
  font-weight: bold;
}
</style>
