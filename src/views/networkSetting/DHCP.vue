<template>
  <section>
    <div class="line_02">
      <span>DHCP</span>
    </div>

    <!--工具条-->
    <el-col :span="24" style="padding-bottom: 0px;">
      <el-form :inline="true">
        <el-form-item>
          <el-button type="primary" @click="handleAdd">修改</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="start">启用</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="stop">停止</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <!-- <el-table :data="form" :header-cell-style="headerStyle">
      <el-table-column prop="start" label="起始地址" width="120">
      </el-table-column>
      <el-table-column prop="end" label="结束地址" width="120">
      </el-table-column>
      <el-table-column prop="interface" label="网卡接口" min-width="180">
      </el-table-column>
      <el-table-column prop="mask" label="子网掩码" min-width="120">
      </el-table-column>
      <el-table-column prop="gateway" label="网关" min-width="120">
      </el-table-column>
      <el-table-column prop="dns1" label="首选DNS" width="120">
      </el-table-column>
      <el-table-column prop="dns2" label="备选DNS" min-width="120">
      </el-table-column>
      <el-table-column prop="lease" label="租期" width="120">
      </el-table-column>
      <el-table-column prop="status" label="状态" width="120">
      </el-table-column>
      <el-table-column label="操作" min-width="180">
                <template slot-scope="scope">
                    <el-button size="small">停止</el-button>
                    <el-button size="small" @click="rowDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
    </el-table> -->

    <!--新增界面-->
    <!-- <el-dialog title="新增" :visible.sync="isAddFormVisible"> -->
      <el-form :model="addForm" label-width="100px" ref="addForm">
        <el-form-item prop="start" label="起始地址">
          <el-input v-model="addForm.start" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item prop="end" label="结束地址">
          <el-input v-model="addForm.end" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item prop="mask" label="子网掩码">
          <el-input v-model="addForm.mask" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item prop="gateway" label="网关">
          <el-input v-model="addForm.gateway" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item prop="dns1" label="首选DNS">
          <el-input v-model="addForm.dns1" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item prop="dns2" label="备选DNS">
          <el-input v-model="addForm.dns2" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item prop="lease" label="租期">
          <el-input v-model="addForm.lease" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addCancel">取消</el-button>
        <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
      </div>
    <!-- </el-dialog> -->

  </section>
</template>

<script>
import { dhcpServerConfigAction, dhcpServerShowAction } from '../../api/api.js'
export default {
  name: 'DHCP',
  data() {
    return {
      isAddFormVisible: false, // 新增界面是否显示
      addLoading: false,

      addForm: {
        start: '', // 开始地址
        end: '', // 结束地址
        interface: '', // 网卡接口
        dns1: '',
        dns2: '',
        mask: '', // 掩码
        gateway: '', // 网关
        lease: '' // 祖约时间
      },
      form: []
    }
  },
  methods: {
    headerStyle() {
      return this.header()
    },
    // 显示新增界面
    handleAdd: function() {
      this.isAddFormVisible = true
    },
    addSubmit() {
      let para = Object.assign({}, this.addForm)
      para.enable = 1
      dhcpServerConfigAction(para).then(res => {
        if (res.data.code === 200) {
          this.getInfo()
          this.isAddFormVisible = false
          this.refs['addForm'].resetFields()
        }
      })
    },
    addCancel() {
      this.isAddFormVisible = false
      this.refs['addForm'].resetFields()
    },
    start() {
      let para = Object.assign({}, this.form)
      para.enable = 1
      dhcpServerConfigAction(para).then(res => {
        if (res.data.code === 200) {
          this.getInfo()
        }
      })
    },
    stop() {
      let para = {}
      para.enable = 0
      dhcpServerConfigAction(para).then(res => {
        if (res.data.code === 200) {
          this.getInfo()
        }
      })
    },
    getInfo() {
      dhcpServerShowAction().then(res => {
        if (res.data.code === 200) {
          this.form = res.data.data
          if (this.form.enable === 1) {
            this.form.status = '使用中'
          } else {
            this.form.status = '未启用'
          }
        }
      })
    }
  },
  mounted() {
    this.getInfo()
  }
}
</script>

<style scoped>
.line_02 {
  margin-bottom: 20px;
  margin-top: 30px;
  height: 1px;
  border-top: 1px solid #ddd;
  text-align: left;
  color: #909399;
}
.line_02 span {
  position: relative;
  top: -10px;
  background: #fff;
  padding: 0 30px 0 0;
  font-weight: bold;
}
</style>
