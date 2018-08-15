<template>
  <div>
    <div class="line_02">
      <span>{{$t('ARP.title')}}</span>
    </div>

    <el-col :span="24">
      <el-form :inline="true">
        <el-form-item>
          <el-button type="primary" @click="addHandle()">{{$t('operation.add')}}</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="batchDelete()" type="danger">{{$t('operation.delete')}}</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <el-table :data="form" :header-cell-style="headerStyle">
      <el-table-column type="selection" min-width="60">
      </el-table-column>
      <el-table-column prop="ipaddr" :label="$t('ARP.IP')" min-width="120">
      </el-table-column>
      <el-table-column prop="hwaddr" :label="$t('ARP.MAC')" min-width="120">
      </el-table-column>
      <el-table-column prop="status" :label="$t('ARP.status')" min-width="120">
        <template slot-scope="scope">
          <span :class="{ warning: scope.row.status === 'invalid' }">{{ scope.row.status }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('operation.operation')" min-width="60">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status==='configured'" type="text" @click="edit(scope.row)" size="small">
            {{$t('operation.edit')}}
          </el-button>
          <el-button type="text" @click="deleteForm(scope.row)" size="small">
            {{$t('operation.delete')}}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="5" layout="total, prev, pager, next, jumper" :total="this.total">
    </el-pagination>

    <el-dialog :title="$t('ARP.title2')" :visible.sync="isFormVisible" @selection-change="change()">
      <el-form :model="ARPForm" label-position="left" ref="ARPForm" size="mini">
        <el-form-item prop="ipaddr" :label="$t('ARP.IP')" :label-width="labelWidth">
          <el-input v-model="ARPForm.ipaddr"></el-input>
        </el-form-item>
        <el-form-item prop="hwaddr" :label="$t('ARP.MAC')" :label-width="labelWidth">
          <el-input v-model="ARPForm.hwaddr"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="danger" @click="formCancel()">{{$t('operation.cancel')}}</el-button>
        <el-button type="primary" @click="formSubmit('set')">{{$t('operation.submit')}}</el-button>
      </div>
    </el-dialog>

    <el-dialog :title="$t('ARP.title3')" :visible.sync="isEditFormVisible">
      <el-form :model="editForm" label-position="left" ref="editForm" size="mini">
        <el-form-item prop="ipaddr" :label="$t('ARP.IP')" :label-width="labelWidth">
          <el-input v-model="editForm.ipaddr" disabled="true"></el-input>
        </el-form-item>
        <el-form-item prop="hwaddr" :label="$t('ARP.MAC')" :label-width="labelWidth">
          <el-input v-model="editForm.hwaddr"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="danger" @click="editCancel()">{{$t('operation.cancel')}}</el-button>
        <el-button type="primary" @click="formSubmit('update')">{{$t('operation.submit')}}</el-button>
      </div>
    </el-dialog>

    <!-- 动态ARP表 -->

    <el-collapse>
      <el-collapse-item :title="$t('ARP.dynamicARP')" name="1">
        <div>
          <el-table :data="formDynamic" :header-cell-style="headerStyle">
            <el-table-column prop="ipaddr" :label="$t('ARP.IP')" min-width="120">
            </el-table-column>
            <el-table-column prop="hwaddr" :label="$t('ARP.MAC')" min-width="120">
            </el-table-column>
          </el-table>
        </div>
        <el-pagination @current-change="handleCurrentChangeDynamic" :current-page="currentPageDynamic" :page-size="5" layout="total, prev, pager, next, jumper" :total="this.totalDynamic">
        </el-pagination>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import { getARP, getDynamicARP, handleARP } from '../../api/api.js'
export default {
  name: 'ARP',
  data() {
    return {
      isFormVisible: false,
      isEditFormVisible: false,

      total: 0,
      totalDynamic: 0,
      currentPage: 1,
      currentPageDynamic: 1,

      form: [],
      formDynamic: [],

      ARPForm: {
        ipaddr: '',
        hwaddr: '',
        status: '',
        oper_type: ''
      },
      editForm: {
        ipaddr: '',
        hwaddr: '',
        oper_type: ''
      },
      sels: [],

      labelWidth: '80px'
    }
  },
  methods: {
    headerStyle() {
      return this.header()
    },
    change(sels) {
      this.sels = sels
    },
    handleCurrentChange(val) {
      let para = {}
      para.ipaddr = ''
      para.hwaddr = ''
      para.oper_type = 'arp'
      para.page = val
      getARP(para)
        .then(res => {
          if (res.data.code === 200) {
            this.form = res.data.data
          }
          this.currentPage = val
        })
        .catch(error => {
          console.log(error)
        })
    },
    handleCurrentChangeDynamic(val) {
      let para = {}
      para.ipaddr = ''
      para.hwaddr = ''
      para.oper_type = 'arp'
      para.page = val
      getDynamicARP(para)
        .then(res => {
          if (res.data.code === 200) {
            this.formDynamic = res.data.data
          }
          this.currentPageDynamic = val
        })
        .catch(error => {
          console.log(error)
        })
    },

    addHandle: function() {
      this.isFormVisible = true
    },
    // 编辑
    edit(row) {
      this.editForm = row
      this.isEditFormVisible = true
    },
    editCancel() {
      this.isEditFormVisible = false
      this.$refs['editForm'].resetFields()
    },
    // 添加
    formCancel: function() {
      this.formVisible = false
      this.$refs['ARPForm'].resetFields()
    },
    formSubmit: function(type) {
      this.isFormVisible = false
      this.isEditFormVisible = false

      let para
      if (type === 'set') {
        para = Object.assign({}, this.ARPForm)
      } else if (type === 'update') {
        para = Object.assign({}, this.editForm)
      }
      para.oper_type = type
      handleARP(para)
        .then(res => {
          if (res.data.code === 200) {
            this.getARPInfo()
            this.getDynamicARPInfo()
          }
        })
        .catch(error => {
          console.log(error)
        })
      this.$refs['ARPForm'].resetFields()
    },
    // 删除
    deleteForm(row) {
      let para = Object.assign({}, row)
      para.oper_type = 'clear'

      handleARP(para)
        .then(res => {
          if (res.data.code === 200) {
            this.getARPInfo()
            this.getDynamicARPInfo()
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    batchDelete() {
      for (let i = 0; i < this.sels.length; i++) {
        del(this.sels[i])
      }
      this.getARPInfo()
      this.getDynamicARP()

      function del(row) {
        let para = Object.assign({}, row)
        para.oper_type = 'clear'

        this.handleARP(para)
          .then(res => {
            if (res.data.code === 200) {
              return true
            } else if (res.data.code === 500) {
              return false
            }
          })
          .catch(error => {
            console.log(error)
          })
      }
    },

    getARPInfo() {
      let para = {}
      para.ipaddr = ''
      para.hwaddr = ''
      para.oper_type = 'arp'
      para.page = this.currentPage
      getARP(para)
        .then(res => {
          if (res.data.code === 200) {
            if (res.data.length !== 0) {
              this.form = res.data.data
            } else {
              if (this.total === 0) {
                this.total = res.data.total
                this.form = res.data.data
              } else {
                this.currentPage -= 1
                this.getARPInfo()
              }
            }
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    getDynamicARPInfo() {
      let para = {}
      para.ipaddr = ''
      para.hwaddr = ''
      para.page = this.currentPageDynamic
      getDynamicARP(para)
        .then(res => {
          if (res.data.code === 200) {
            if (res.data.length !== 0) {
              this.formDynamic = res.data.data
            } else {
              if (this.totalDynamic === 0) {
                this.totalDynamic = res.data.total
                this.formDynamic = res.data.data
              } else {
                this.currentPageDynamic -= 1
                this.getDynamicARPInfo()
              }
            }
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  mounted() {
    this.getARPInfo()
    this.getDynamicARPInfo()
  }
}
</script>

<style lang="scss" scoped>
.warning {
  color: red;
}
</style>
