<template>
    <section>

      <div class="line_02"><span>VLAN</span></div>
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true">
                <el-form-item>
                    <el-button type="primary">添加</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary">启用</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary">停止</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary">删除</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <el-table :data="users" @selection-change="selsChange" style="width: 100%;" :header-cell-style="headerStyle">
            <el-table-column prop="vlanID" label="vlanID" width="120" >
            </el-table-column>
            <el-table-column prop="vlanName" label="vlan名称" min-width="180">
            </el-table-column>
            <el-table-column prop="MAC" label="MAC" min-width="180">
            </el-table-column>
            <el-table-column prop="IP" label="IP" min-width="180">
            </el-table-column>
            <el-table-column prop="SubnetMask" label="子网掩码" min-width="180">
            </el-table-column>
            <el-table-column prop="line" label="线路" min-width="120" >
            </el-table-column>
            <el-table-column prop="tip" label="备注" min-width="120">
            </el-table-column>
        </el-table>
    </section>
</template>

<script>
    export default {
        name: "VLAN",
      methods:{
        headerStyle() {
          return {
            "background-color": "#626c91",
            "color": "white",
            "font-weight": "normal",
          };
        },
      }
    }
</script>

<style scoped>

</style>
