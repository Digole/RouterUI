<template>
  <section>

    <div class="line_02">
      <span>VLAN</span>
    </div>

    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true">
        <el-form-item>
          <el-button type="primary" @click="showAddForm">添加VLAN</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="batchDelete">批量删除</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <el-table :data="form" @selection-change="selsChange" class="table" :header-cell-style="headerStyle">
      <el-table-column type="selection" min-width="30">
      </el-table-column>
      <el-table-column prop="iface" label="网口" min-width="120">
      </el-table-column>
      <el-table-column prop="vlan_id" label="VLAN标识" min-width="120">
      </el-table-column>
      <el-table-column prop="tag" label="TAG" min-width="120">
      </el-table-column>
      <el-table-column prop="priority" label="优先级" min-width="120">
      </el-table-column>
      <el-table-column :label="$t('operation.operation')" min-width="60">
        <template slot-scope="scope">
          <el-button size="small" @click="deleteInfo(scope.$index, scope.row)">{{$t('operation.delete')}}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="5" layout="total, prev, pager, next, jumper" :total="this.total">
    </el-pagination>

    <!--新增界面-->
    <el-dialog title="新增" :visible.sync="addFormVisible" class="dialog">
      <el-form :model="addForm" :rules="rules" label-width="100px" ref="addForm">
        <el-form-item label="VLAN标识" prop="vlan_id" required>
          <el-input v-model="addForm.vlan_id"></el-input>
        </el-form-item>
        <el-form-item label="网口" prop="iface" required>
          <el-select v-model="addForm.iface" placeholder="请选择">
            <el-option v-for="(item, index) in ports" :key="index" :label="item.webname" :value="item.enname"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelForm">取消</el-button>
        <el-button type="primary" @click="addVLAN">确认</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import { getVLAN, handleVLAN, getPorts } from '../../api/api.js'
import validate from '../../utils/rules.js'

export default {
  name: 'VLAN',
  data() {
    return {
      addFormVisible: false,
      currentPage: 1,
      total: Number,

      form: [],
      addForm: {
        vlan_id: '', //
        iface: '', // 接口名称
        tag: '', // tag
        priority: '', // 优先级
        oper_type: ''
      },

      sels: [],
      ports: [],
      options: [],

      rules: {
        vlan_id: [
          {
            validator: validate('number', '请输入正确数字', 'VLAN标识不能为空')
          }
        ]
      }
    }
  },
  methods: {
    headerStyle() {
      return this.header()
    },
    triggerAdd() {
      this.addFormVisible = !this.addFormVisible
    },
    showAddForm: function() {
      this.triggerAdd()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getVLANInfo()
    },
    selsChange: function(sels) {
      this.sels = sels
    },
    addVLAN() {
      let para = Object.assign({}, this.addForm)
      para.oper_type = 'set'
      para.page = this.currentPage
      handleVLAN(para).then(res => {
        if (res.data.code === 200) {
          this.getVLANInfo()
          this.triggerAdd()
          this.$refs['addForm'].resetFields()
        }
      })
    },
    cancelForm() {
      this.triggerAdd()
      this.$refs['addForm'].resetFields()
    },
    deleteInfo(index, row) {
      let para = Object.assign({}, row)
      para.oper_type = 'clear'
      para.vlan_id += ''
      console.log(para.vlan_id)
      handleVLAN(para).then(res => {
        if (res.data.code === 200) {
          this.getVLANInfo()
        }
      })
    },
    async batchDelete() {
      for (let i = 0; i < this.sels.length; i++) {
        del(i, this.sels[i])
      }
      this.getVLANInfo()

      function del(index, row) {
        let para = Object.assign({}, row)
        para.oper_type = 'clear'
        handleVLAN(para).then(res => {
          if (res.sata.code !== 200) {
            handleVLAN(para)
          }
        })
      }
    },
    getVLANInfo() {
      let para = Object.assign({}, this.addForm)
      para.oper_type = 'vlan'
      para.page = this.currentPage
      getVLAN(para).then(res => {
        if (res.data.code === 200) {
          if (res.data.total !== 0) {
            if (res.data.data.length !== 0) {
              this.total = res.data.total
              this.form = res.data.data
            } else if (this.currentPage > 1) {
              this.currentPage -= 1
              this.getVLANInfo()
            }
          } else {
            this.form = []
          }
        }
      })
    },
    getPortsInfo: function() {
      getPorts().then(res => {
        if (res.data.code === 200) {
          this.ports = res.data.interfaces
          console.log(this.ports)
        }
      })
    }
  },
  mounted() {
    this.getPortsInfo()
    this.getVLANInfo()
  }
}
</script>

<style scoped>
.table {
  width: 100%;
}
.table .el-table-column {
  width: 80%;
}
.dialog .el-input {
  width: 80%;
}
.dialog .el-select {
  width: 80%;
}
.el-pagination {
  float: right;
}
</style>
