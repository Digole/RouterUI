<template>
  <section>

    <div class="line_02"><span>VLAN</span></div>

    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true">
        <el-form-item>
          <el-button type="primary" @click="handleAdd">添加</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="danger">删除</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <el-table @selection-change="selsChange" style="width: 100%;" :header-cell-style="headerStyle">
      <el-table-column type="selection" min-width="30">
      </el-table-column>
      <el-table-column prop="vlanID" label="vlanID" width="120" >
      </el-table-column>
      <el-table-column prop="vlanName" label="vlan名称" min-width="120">
      </el-table-column>
      <el-table-column prop="MAC" label="MAC" min-width="180">
      </el-table-column>
      <el-table-column prop="IP" label="IP" min-width="120">
      </el-table-column>
      <el-table-column prop="SubnetMask" label="子网掩码" min-width="120">
      </el-table-column>
      <el-table-column prop="line" label="线路" min-width="120" >
      </el-table-column>
      <el-table-column prop="tip" label="备注" min-width="120">
      </el-table-column>
    </el-table>

    <!--新增界面-->
    <el-dialog title="新增" :visible.sync="addFormVisible">
      <el-form label-width="80px" ref="addForm">
        <el-form-item label="vlanID" prop="vlanID">
          <el-input v-model="addForm.vlanID"></el-input>
        </el-form-item>
        <el-form-item label="vlan名称" prop="vlanName">
          <el-input v-model="addForm.vlanName"></el-input>
        </el-form-item>
        <el-form-item label="MAC" prop="MAC">
          <el-input v-model="addForm.MAC"></el-input>
        </el-form-item>
        <el-form-item label="IP" prop="IP">
          <el-input v-model="addForm.IP"></el-input>
        </el-form-item>
        <el-form-item label="子网掩码" prop="SubnetMask">
          <el-input v-model="addForm.subnetMask"></el-input>
        </el-form-item>
        <el-form-item label="线路" prop="line">
          <el-input v-model="addForm.line"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="tip">
          <el-input v-model="addForm.line"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addFormVisible = false">取消</el-button>
        <el-button type="primary">提交</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
  export default {
    name: "VLAN",
    data() {
      return {
        addFormVisible: false,

        addForm: {
          vlanID:'',
          vlanName:'',
          line: '',
          address: '',
          subnetMask: '',
          gateway: '',
          note: ''
        },

        sels: [],
      }
    },
    methods:{
      headerStyle() {
        return this.header();
      },
      handleAdd: function () {
        this.addFormVisible = true;
      },
      selsChange: function (sels) {
        this.sels = sels;
      },
    }
  }
</script>

<style scoped>

</style>
