<template>
    <section>

      <div class="line_02"><span>终端监控</span></div>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" >
                <el-form-item>
                    <el-input placeholder="搜索IP/MAC"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" >查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary"  @click="handleAdd">新增</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <el-table :data="users"  highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;" :header-cell-style="headerStyle">
            <el-table-column prop="name" label="名称" width="180" >
            </el-table-column>
            <el-table-column prop="IP" label="IP" min-width="180">
            </el-table-column>
            <el-table-column prop="MAC" label="MAC" min-width="300">
            </el-table-column>
            <el-table-column prop="linkNumber" label="连接数" width="180">
            </el-table-column>
            <el-table-column prop="uplinkRate" label="上行速率" min-width="120">
            </el-table-column>
            <el-table-column prop="downlinkRate" label="下行速率"  min-width="120">
            </el-table-column>
            <el-table-column prop="onlineTime" label="在线时长"  min-width="120">
            </el-table-column>
            <el-table-column label="操作" width="240">
                <template slot-scope="scope">
                    <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">剔除</el-button>
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">限速</el-button>
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">修改名称</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--新增界面-->
        <el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
            <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
                <el-form-item label="名称" prop="name">
                    <el-input v-model="addForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="IP" prop="IP">
                    <el-input v-model="addForm.IP" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="MAC">
                    <el-input v-model="addForm.MAC" auto-complete="off"></el-input>
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
    export default{
        data(){
            return {
                addFormVisible: false,

                addForm: {
                    name: '',
                    IP: '',
                    MAC: ''
                }
            }
        },
        methods: {
          headerStyle() {
            return {
              "background-color": "#626c91",
              "color": "white",
              "font-weight": "normal",
            };
          },
            //显示新增界面
            handleAdd: function () {
                this.addFormVisible = true;
                this.addForm = {
                    name: '',
                    sex: -1,
                    age: 0,
                    birth: '',
                    addr: ''
                };
            },
        }
    }
</script>

<style scoped>
  .line_02{
    margin-bottom: 20px;
    margin-top: 30px;
    height: 1px;
    border-top: 1px solid #ddd;
    text-align: left;
    color: #909399
  }
  .line_02 span{
    position: relative;
    top: -10px;
    background: #fff;
    padding: 0 30px 0 0;
    font-weight: bold
  }
</style>
