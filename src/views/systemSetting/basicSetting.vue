<template>
  <section>

    <div class="line_02">
      <span>{{$t('basicSetting.basicSetting')}}</span>
    </div>

    <div class="name">
      <div class="name-title">{{$t('basicSetting.device')}}</div>
      <div class="content">{{ deviceName }}</div>
      <el-button @click="changeSettingName" type="primary" size="small">{{$t('basicSetting.SetName')}}</el-button>
    </div>

    <div class="name">
      <div class="name-title">{{$t('basicSetting.time')}}</div>
      <div class="content">{{ deviceTime }}</div>
      <el-button @click="changeSettingTime" type="primary" size="small">{{$t('basicSetting.SetTime')}}</el-button>
    </div>

    <el-dialog :title="$t('basicSetting.SetTime')" :visible.sync="isSetTimeVisible">
      <el-form ref="form" :model="form" label-width="5rem" inline>
        <el-form-item prop="date" :label="$t('basicSetting.timeSetting')">
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
        <el-button @click="formCancel">{{$t('basicSetting.cancel')}}</el-button>
        <el-button @click="submitTime" type="primary">{{$t('basicSetting.submit')}}</el-button>
      </div>
    </el-dialog>

    <el-dialog :title="$t('basicSetting.SetName')" :visible.sync="isSetNameVisible">
      <el-form ref="form" :model="form" label-width="5rem">
        <el-form-item prop="dev_name" :label="$t('basicSetting.device')" label-position="left">
          <el-input v-model="form.dev_name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="formCancel">{{$t('basicSetting.cancel')}}</el-button>
        <el-button @click="submitName" type="primary">{{$t('basicSetting.submit')}}</el-button>
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
      isUsingTimer: true,   // 时候使用计时器

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
            clearInterval(this.timer) // 关闭计时器，否则会发生时间显示跳动现象
            this.getSystemInfo('time')
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
            this.getSystemInfo('name')
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    getSystemInfo(val) {
      if (val === undefined || val === 'time') {
        getTime()
          .then(res => {
            if (res.data.code === 200) {
            // this.deviceTime = res.data.date + ' ' + res.data.time
              let date = res.data.date.split('/')
              date = date.map(value => {
                return parseInt(value, 10)
              })
              let date0 = date[0]
              let date1 = date[1]
              let date2 = date[2]
              console.log('date is ' + date)
              let time = res.data.time.split(':')
              time = time.map(value => {
                return parseInt(value, 10)
              })
              let val0 = time[0]
              let val1 = time[1]
              let val2 = time[2]
              console.log('time is ' + time)
              let para = date + ',' + time
              console.log('para is ' + para)
              let timeNumber = new Date(date0, date1 - 1, date2, val0, val1, val2)
              this.deviceTime = new Date(timeNumber).toLocaleString()
              console.log('timen' + timeNumber)
              console.log('deviceTime' + this.deviceTime)
              // for (let i = 0; i < 60; i++) {
              //   if (this.isUsingTimer) {
              //     setTimeout(() => {
              //       timeNumber = +timeNumber + 1000
              //       this.deviceTime = new Date(timeNumber).toLocaleString()
              //       console.log(timeNumber)
              //       if (i === 59) {
              //         this.getSystemInfo()
              //       }
              //     }, 1000)
              //   }
              // }
              let i = 0
              if (this.isUsingTimer) {
                this.timer = setInterval(() => {
                  if (i < 60) {
                    i++
                    console.log(i)
                    timeNumber = +timeNumber + 1000
                    this.deviceTime = new Date(timeNumber).toLocaleString()
                    console.log(timeNumber)
                  } else {
                    this.getSystemInfo('time')
                    clearInterval(this.timer)
                  }
                }, 1000)
              }
            }
          })
          .catch(error => {
            console.log(error)
          })
      }
      if (val === undefined || val === 'name') {
        getName()
          .then(res => {
            if (res.data.code === 200) {
              this.deviceName = res.data.dev_name
            }
          }).catch(error => {
            console.log(error)
          })
      }
    },
    formCancel() {
      this.isSetTimeVisible = false
      this.isSetNameVisible = false
      this.$refs['form'].resetFields()
    }
  },
  mounted() {
    this.getSystemInfo()
  },
  beforeDestroy () {
    this.isUsingTimer = false
    if (this.timer) {
      clearInterval(this.timer)
    }
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
