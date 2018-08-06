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
          <el-button type="primary" size="small" style="margin-left: 100px; margin-top:10px;" @click="checkVersion">检测新版本</el-button>
        </el-form>
      </div>
      <div style="display: flex">
        <p style="margin-left: 50px; width:180px;">路由系统版本：</p>
        <p style="margin-left: 100px;">3.0.6</p>
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
      <el-upload action="">
        <el-button slot="trigger" size="small" type="primary" style=" margin-top:10px;">选取文件</el-button>
        <el-button style="margin-left: 10px; margin-top:10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
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
      <p>需要重启来完成更新,是否立即更新</p>
      <div slot="footer" class="dialog-footer">
        <el-button>取消更新</el-button>
        <el-button type="primary">立即更新</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    name: 'update',
    data() {
      return {
        versionVisual: false,
        uploadVisual: false
      }
    },

    methods: {
      submitUpload() {
        this.$refs.upload.submit()
      },
      checkVersion() {
        this.versionVisual = true
      }
    }
  }
</script>

<style scoped>

</style>
