<template>
    <section>
      <div class="line_02"><span>重启关机</span></div>
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-button type="danger" >立即重启</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="danger" right>立即关机</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="danger" right>添加事件</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="danger" right>删除事件</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <el-table :data="hardwareInfo" style="width: 100%">
            <el-table-column prop="behaviour"  label="事件" min-width="180">
            </el-table-column>
            <el-table-column prop="time"  label="预设时间" min-width="360">
            </el-table-column>
            <el-table-column label="操作" width="150">
                <template slot-scope="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </section>
</template>

<script>
    export default {
        name: "restartShutdown"
    }
</script>

<style scoped>

</style>
