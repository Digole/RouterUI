<template>
  <section>
    <div class="line_02"><span>DNS</span></div>


    <el-form ref="form" :model="form" label-width="80px" @submit.prevent="onSubmit" style="margin:20px;width:60%;min-width:600px;">
      <el-form-item label="首选DNS">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="备选DNS">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handle">{{buttonValue}}</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
  export default {
    name: 'DNS',
    data() {
      return {
        buttonValue: '',
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
    methods: {
      changeValue: function() {
        let value = ''
        console.log(this.$store.state.routePush)
        if(this.$store.state.routePush) {
          value = '保存并返回'
        }
        else{
          value = '保存'
        }
        console.log('value is: '+value)
        return value
      },

      handle: function() {
        if(this.buttonValue === '保存'){
          console.log(this.buttonValue)
        //待添加dns请求
        }
        else{
          //待添加dns请求
          console.log(this.buttonValue)
          this.$router.push({ path: '../INEX_network' })
        }
      }
    },

    mounted() {
      this.buttonValue = this.changeValue()

    },
  }
</script>

<style scoped>
  .line_02{
    margin-bottom: 20px;
    margin-top: 30px;
    height: 1px;
    border-top: 1px solid #ddd;
    text-align: left;
    color: #909399
  }
  .line_02 span{
    position: relative;
    top: -10px;
    background: #fff;
    padding: 0 30px 0 0;
    font-weight: bold
  }
</style>
