<template>
    <div>
      <div class="line_02"><span>行为记录管理</span></div>
        <div>
            <div style="display: flex;">
                <p style="margin-left: 50px; width:150px;">终端上下线记录：</p>
                <el-checkbox v-model="checked" style="margin-top: 14px; margin-left: 100px;">开启</el-checkbox>
            </div>
            <div style="display: flex">
                <p style="margin-left: 50px; width:150px;">WEB上下线记录：</p>
                <el-checkbox v-model="checked" style="margin-top: 14px; margin-left: 100px;">开启</el-checkbox>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "BMControl"
    }
</script>

<style scoped>

</style>
