<template>
    <section>
      <div class="line_02"><span>静态路由</span></div>

      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true">
                <el-form-item>
                    <el-button type="primary"  @click="handleAdd">添加</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary">启用</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary">停用</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary">删除</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <el-table style="width: 100%;" :header-cell-style="headerStyle">
            <el-table-column prop="line" label="线路" min-width="120" >
            </el-table-column>
            <el-table-column prop="targetAddress" label="目的地址" min-width="180">
            </el-table-column>
            <el-table-column prop="SubnetMask" label="子网掩码" min-width="120">
            </el-table-column>
            <el-table-column prop="Gateway" label="网关" min-width="120">
            </el-table-column>
            <el-table-column prop="metric" label="metric" min-width="120">
            </el-table-column>
            <el-table-column prop="tip" label="备注" min-width="180">
            </el-table-column>
        </el-table>

        <!--新增界面-->
        <el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
            <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
                <el-form-item label="线路" prop="port">
                    <el-input v-model="addForm.line" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="目的地址" prop="address">
                    <el-input v-model="addForm.address" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="子网掩码" prop="subnetMask">
                    <el-input v-model="addForm.subnetMask" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="网关" prop="gateway">
                    <el-input v-model="addForm.geteway" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="metric" prop="metric">
                    <el-input v-model="addForm.primaryDNS" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="note">
                    <el-input v-model="addForm.note" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="addFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
            </div>
        </el-dialog>

    </section>
</template>

<script>
    export default {
        name: "static_router",
        data() {
            return {
                addFormVisible: false,

                addForm: {
                    line: '',
                    address: '',
                    subnetMask: '',
                    gateway: '',
                    metric: '',
                    note: ''
                }
            }
        },
        methods: {
          headerStyle() {
            return this.header();
          },
            //显示新增界面
            handleAdd: function () {
                this.addFormVisible = true;
                this.addForm = {
                    line: '',
                    address: '',
                    subnetMask: '',
                    gateway: '',
                    metric: '',
                    note: ''
                };
            },
        }
    }
</script>

<style scoped>

</style>
