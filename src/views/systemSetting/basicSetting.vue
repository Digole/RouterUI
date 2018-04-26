<template>
  <section>
    <div class="line_02"><span>基础设置</span></div>
    <el-form ref="form" :model="form" label-width="80px" @submit.prevent="onSubmit" style="margin-top: 20px; width:60%;min-width:600px;">
        <el-form-item label="设备名" label-position="left">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="时间设置">
            <el-col :span="11">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
                <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
            </el-col>
        </el-form-item>
    </el-form>
  </section>
</template>

<script>
    export default {
        name: "basicSetting",

        data() {
            return {
                form: {
                    name: '',
                    date1: '',
                    date2: '',
                }
            }
        },
        methods: {
            onSubmit() {
                console.log('submit!');
            }
        }
    }
</script>

<style scoped>
.line {
  text-align: center;
}
</style>
