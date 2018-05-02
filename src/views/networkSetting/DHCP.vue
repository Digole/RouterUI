<template>
    <section>
      <div class="line_02"><span>DHCP</span></div>


      <!--工具条-->
        <el-col :span="24" style="padding-bottom: 0px;">
            <el-form :inline="true">
                <el-form-item>
                    <el-button type="primary"  @click="handleAdd">添加</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary">启用</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary">停止</el-button>
                </el-form-item>
            </el-form>
        </el-col>

      <!--列表-->
        <el-table style="width: 100%;" :header-cell-style="headerStyle">
            <el-table-column prop="portInService" label="服务接口" width="120" >
            </el-table-column>
            <el-table-column prop="IPClient" label="客户端地址" min-width="180">
            </el-table-column>
            <el-table-column prop="SubnetMask" label="子网掩码" min-width="120">
            </el-table-column>
            <el-table-column prop="Gateway" label="网关" min-width="120">
            </el-table-column>
            <el-table-column prop="DNSPrimary" label="首选DNS" width="120">
            </el-table-column>
            <el-table-column prop="DNSOptional" label="备选DNS" min-width="120">
            </el-table-column>
            <el-table-column prop="leasePeriod" label="租期" width="120">
            </el-table-column>
            <el-table-column prop="status" label="状态" width="120">
            </el-table-column>
            <el-table-column label="操作" min-width="180">
                <template slot-scope="scope">
                    <el-button size="small">停止</el-button>
                    <el-button size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--新增界面-->
        <el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
            <el-form :model="addForm" label-width="100px" ref="addForm">
                <el-form-item label="服务接口" prop="port">
                    <el-input v-model="addForm.port" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="客户端地址" prop="address">
                    <el-input v-model="addForm.address" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="子网掩码" prop="subnetMask">
                    <el-input v-model="addForm.subnetMask" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="网关" prop="gateway">
                    <el-input v-model="addForm.geteway" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="首选DNS" prop="primaryDNS">
                    <el-input v-model="addForm.primaryDNS" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="备选DNS" prop="secondaryDNS">
                    <el-input v-model="addForm.secondaryDNS" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="租期" prop="rentTime">
                    <el-input v-model="addForm.rentTime" auto-complete="off"></el-input>
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
        name: "DHCP",
        data(){
            return {
                addFormVisible: false,//新增界面是否显示
                addLoading: false,

                addForm: {
                    port: '',
                    address: '',
                    subnetMask: '',
                    gateway: '',
                    primaryDNS: '',
                    secondaryDNS: '',
                    rentTime: ''
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
                    port: '',
                    address: '',
                    subnetMask: '',
                    gateway: '',
                    primaryDNS: '',
                    secondaryDNS: '',
                    rentTime: ''
                };
            },
        },

      //新增
      addSubmit: function () {
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.addLoading = true;
              //NProgress.start();
              let para = Object.assign({}, this.addForm);
              para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
              addUser(para).then((res) => {
                this.addLoading = false;
                //NProgress.done();
                this.$message({
                  message: '提交成功',
                  type: 'success'
                });
                this.$refs['addForm'].resetFields();
                this.addFormVisible = false;
                this.getUsers();
              });
            });
          }
        });
      },
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
