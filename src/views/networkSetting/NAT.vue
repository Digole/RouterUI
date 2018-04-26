<template>
    <div>
        <div>
          <div class="line_02"><span>NAT转发</span></div>
            <el-table :data="hardwareInfo" style="width: 100%" :header-cell-style="headerStyle">
                <el-table-column prop="currentLAN"  label="当前LAN口" min-width="180">
                </el-table-column>
                <el-table-column prop="currentWAN"  label="当前WAN口" min-width="180">
                </el-table-column>
                <el-table-column prop="currentRandomPort"  label="当前随机端口使用情况" min-width="180">
                </el-table-column>
                <el-table-column prop=""  label="当前随机端口使用情况" min-width="180">
                </el-table-column>
                <el-table-column label="操作" min-width="150">
                    <template slot-scope="scope">
                        <el-button size="small">编辑</el-button>
                        <el-button type="danger">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div>
          <!--
            <div style="background-color: #EEF6F6">
                <p style="padding: 5px 10px; font-weight: bold">NAT设置</p>
            </div>
            -->
          <div class="line_02"><span>NAT设置</span></div>
            <el-table :data="hardwareInfo" style="width: 100%" :header-cell-style="headerStyle">
                <el-table-column prop="currentLAN"  label="当前LAN口" min-width="180">
                </el-table-column>
                <el-table-column prop="currentWAN"  label="当前WAN口" min-width="180">
                </el-table-column>
                <el-table-column prop="currentRandomPort"  label="当前随机端口使用情况" min-width="180">
                </el-table-column>
                <el-table-column prop=""  label="当前随机端口使用情况" min-width="180">
                </el-table-column>
                <el-table-column label="操作" min-width="150">
                    <template slot-scope="scope">
                        <el-button size="small">编辑</el-button>
                        <el-button type="danger">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    export default {
        name: "NAT",
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
