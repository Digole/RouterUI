<template>
  <div>
    <div class="line_02"><span>ARP绑定</span></div>

    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true">
        <el-form-item>
          <el-button type="primary" @click="addHandle">添加</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="danger">删除</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <el-table style="width: 100%;" :header-cell-style="headerStyle">
      <el-table-column prop="IP" label="IP" min-width="120" >
      </el-table-column>
      <el-table-column prop="MAC" label="MAC" min-width="180">
      </el-table-column>
      <el-table-column prop="name" label="名称" min-width="120">
      </el-table-column>
      <el-table-column label="操作" min-width="150">
        <template slot-scope="scope">
          <el-button size="small">编辑</el-button>
          <el-button type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="新增端口映射" :visible.sync="formVisible" width="30%">
      <el-form :model="ARPForm" label-position="left" ref="ARPForm" size="mini">
        <el-form-item :label="$t('ARP.IP')" :label-width="labelWidth">
          <el-input :model="ARPForm.IP"></el-input>
        </el-form-item>
        <el-form-item :label="$t('ARP.MAC')" :label-width="labelWidth">
          <el-input :model="ARPForm.MAC"></el-input>
        </el-form-item>
        <el-form-item :label="$t('ARP.name')" :label-width="labelWidth">
          <el-input :model="ARPForm.name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="danger" @click="formCancel">{{$t('operation.cancel')}}</el-button>
        <el-button type="primary" @click="formSubmit">{{$t('operation.submit')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'ARP',
    data() {
      return{
        formVisible: false,

        ARPForm: {
          IP: '',
          MAC: '',
          name: '',
        },

        labelWidth: '80px'
      }
    },
    methods:{
      headerStyle() {
        return this.header()
      },

      addHandle: function(){
        this.formVisible = true
      },

      formCancel: function(){
        this.formVisible = false
      },
      formSubmit: function(){
        this.formVisible = false
      }
    },

  }
</script>

<style scoped>

</style>
