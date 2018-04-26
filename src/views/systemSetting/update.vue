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
                <p style="margin-left: 50px; width:100px;">版本检测：</p>
                <el-form>
                    <el-button type="primary" size="small" style="margin-left: 100px; margin-top:10px;">检测新版本</el-button>
                </el-form>
            </div>
            <div style="display: flex">
                <p style="margin-left: 50px; width:100px;">路由系统版本：</p>
                <p style="margin-left: 100px;">3.0.6</p>
            </div>
            <div style="display: flex">
                <p style="margin-left: 50px; width:100px;">协议库版本：</p>
                <p style="margin-left: 100px;">2.0.23</p>
            </div>
        </div>
      <div class="line_02"><span>手动升级</span></div>
      <!--
        <div style="background-color: #EEF6F6">
            <p style="padding: 5px 10px; font-weight: bold">手动升级</p>
        </div>
        -->
        <div style="display: flex; vertical-align: middle">
            <p style="margin-left: 50px; width:100px;">本地升级：</p>
            <el-upload>
                <el-button slot="trigger" size="small" type="primary" style=" margin-top:10px;">选取文件</el-button>
                <el-button style="margin-left: 10px; margin-top:10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
            </el-upload>
        </div>
    </div>
</template>

<script>
    export default {
        name: "update",

        methods: {
            submitUpload() {
                this.$refs.upload.submit();
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            }
        }
    }
</script>

<style scoped>

</style>
