<template>
  <section>

    <div class="line_02">
      <span>基础设置</span>
    </div>

    <div class="name">
      <div class="name-title">设备名称:</div>
      <div class="content">{{ deviceName }}</div>
      <el-button @click="changeSettingName" type="primary" size="small">修改设备名称</el-button>
    </div>

    <div class="name">
      <div class="name-title">设备时间:</div>
      <div class="content">{{ deviceTime }}</div>
      <el-button @click="changeSettingTime" type="primary" size="small">修改设备时间</el-button>
    </div>

    <el-dialog title="修改系统名称" :visible.sync="isSetTimeVisible">
      <el-form ref="form" :model="form" label-width="5rem" inline>
        <el-form-item prop="date" label="时间设置">
          <el-col :span="10">
            <el-date-picker 
              type="date" 
              format= "yyyy年MM月dd日"
              value-format="yyyyMMdd"
              placeholder="选择日期" 
              v-model="form.date" 
              style="width: 100%;">
            </el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-form-item prop="time"></el-form-item>
          <el-col :span="10">
            <el-time-picker 
              type="fixed-time" 
              placeholder="选择时间" 
              v-model="form.time" 
              value-format="HH:mm:ss"
              style="width: 100%;">
            </el-time-picker>
          </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="formCancel">取消</el-button>
        <el-button @click="submitTime" type="primary">确认</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改设备名称" :visible.sync="isSetNameVisible">
      <el-form ref="form" :model="form" label-width="5rem">
        <el-form-item prop="dev_name" label="设备名" label-position="left">
          <el-input v-model="form.dev_name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="formCancel">取消</el-button>
        <el-button @click="submitName" type="primary">确认</el-button>
      </div>
    </el-dialog>

  </section>
</template>

<script>
import { setTime, getTime, setName, getName } from '../../api/api.js'
export default {
  name: 'basicSetting',

  data() {
    return {
      isSetTimeVisible: false,
      isSetNameVisible: false,

      deviceName: '未获取名称',
      deviceTime: '未获取时间',
      form: {
        name: '',
        date: '',
        time: ''
      },
      timer: ''
    }
  },
  watch: {
    isSetTimeVisible: function() {
      if (this.isSetTimeVisible === false) {
        this.$refs['form'].resetFields()
      }
    },
    isSetNameVisible: function() {
      if (this.isSetNameVisible === false) {
        this.$refs['form'].resetFields()
      }
    }
  },
  methods: {
    changeSettingTime() {
      this.isSetTimeVisible = true
    },
    changeSettingName() {
      this.isSetNameVisible = true
    },
    submitTime() {
      let para = Object.assign({}, this.form)
      setTime(para)
        .then(res => {
          if (res.data.code === 200) {
            this.isSetTimeVisible = false
            this.$refs['form'].resetFields()
            this.getSystemInfo()
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    submitName() {
      let para = Object.assign({}, this.form)
      console.log(this.form.date)
      setName(para)
        .then(res => {
          if (res.data.code === 200) {
            this.isSetNameVisible = false
            this.$refs['form'].resetFields()
            this.getSystemInfo()
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    getSystemInfo() {
      getTime()
        .then(res => {
          if (res.data.code === 200) {
            this.deviceTime = res.data.date + ' ' + res.data.time
            this.deviceTime = () => {
              for (let i = 60; i > 0; i--) {
                setTimeout(function() {
                  this.deviceTime += 1
                }, 1000)
              }
            }
          }
        }).catch(error => {
          console.log(error)
        })
      getName()
        .then(res => {
          if (res.data.code === 200) {
            this.deviceName = res.data.dev_name
          }
        }).catch(error => {
          console.log(error)
        })
    },
    formCancel() {
      this.isSetTimeVisible = false
      this.isSetNameVisible = false
      this.$refs['form'].resetFields()
    }
  },
  mounted() {
    this.getSystemInfo()
  }
}
</script>

<style scoped lang="scss">
.line {
  text-align: center;
}
.name {
  height: 4rem;
  color: #606266;
  div {
    display: inline-block;
    vertical-align: baseline;
  }
  .content {
    height: 2rem;
    width: 20rem;
    line-height: 2rem;
    padding: 0 1rem;
    border: 1px solid #dcdfe6;
    border-radius: 0.2rem;
  }
  .name-title {
    height: 2rem;
    width: 5rem;
  }
}
</style>
