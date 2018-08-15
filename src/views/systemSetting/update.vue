<template>
  <div>
    <div class="line_02"><span>版本升级</span></div>
    <!--
      <div style="background-color: #EEF6F6">
          <p style="padding: 5px 10px; font-weight: bold">自动升级</p>
      </div>
     -->
    <div>
      <div style="display: flex;">
        <p style="margin-left: 50px; width:180px;">版本检测：</p>
        <el-form>
          <el-button type="primary" size="small" @click="checkVersion">检测新版本</el-button>
        </el-form>
      </div>
      <div style="display: flex">
        <p style="margin-left: 50px; width:180px;">路由系统版本：</p>
        <p style="margin-left: 100px;">{{version}}</p>
      </div>
      <p style="display: flex">
        <span style="margin-left: 50px; width:180px;">SylixOS操作系统版本：</span>
        <span style="margin-left: 100px;">2.0.23</span>
      </p>
    </div>
    <div class="line_02"><span>手动升级</span></div>
    <!--
      <div style="background-color: #EEF6F6">
          <p style="padding: 5px 10px; font-weight: bold">手动升级</p>
      </div>
      -->
    <div style="display: flex; vertical-align: middle">
      <p style="margin-left: 50px; width:180px;">本地升级：</p>
      <el-upload 
        class="upload-demo"
        ref="upload"
        :on-preview="checkFileType"
        :file-list="fileList"
        action="action/updateFirmwareAction">
        <el-button slot="trigger" size="small">选取文件</el-button>
        <el-button style="margin-left: 10px; margin-top:10px;" size="small" @click="submitUpload">上传到服务器</el-button>
      </el-upload>
    </div>

    <!--检测页面-->
    <el-dialog title="检测" :visible.sync="versionVisual">
      <p>最新版本为:</p>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary">立即升级</el-button>
      </div>
    </el-dialog>

    <el-dialog title="上传完成" :visible.sync="uploadVisual">
      <p>预计{{ timeLeft }}秒后刷新页面，请勿关闭电源</p>
    </el-dialog>

  </div>
</template>

<script>
import { getVersion } from '@/api/api.js'
export default {
  name: 'update',
  data() {
    return {
      fileList: [],
      versionVisual: false,
      uploadVisual: false,
      timeLeft: '',                  // 倒计时
      version: ''
    }
  },

  methods: {
    cancel() {
      this.versionVisual = false
      this.$refs.upload.abort(this.fileList)
    },
    checkFileType(file) {
      console.log(file.type)
    },
    submitUpload() {
      this.$refs.upload.submit()
      this.uploadVisual = true

      setTimeout(() => {
      }, 500)

      let duration = 60
      let stopSingal = setInterval(() => {
        if (duration >= 0) {
          duration--
          this.timeLeft = duration
        } else {
          clearInterval(stopSingal)
        }
      }, 1000)
    },
    checkVersion() {
      this.versionVisual = true
    },
    getVersionInfo() {
      getVersion()
        .then(res => {
          if (res.data.code === 200) {
            this.version = res.data.version
          }
        })
    }
  },
  mounted() {
    this.getVersionInfo()
  }
}
</script>

<style scoped>
.el-button{
  margin-left: 100px; 
  margin-top:10px;
} 
</style>
