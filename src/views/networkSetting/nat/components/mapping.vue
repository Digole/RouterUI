<template>
  <section>
    <!--端口映射工具栏和表格-->
    <div class="table">
      <el-col :span="24" class="toolbar" style="padding-bottom: 0;">
        <el-form :inline="true">
          <el-form-item>
            <el-button type="primary" @click="addMappingHandle">{{$t('operation.add')}}</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="danger" @click="delMappingHandle" :disabled="this.mappingSelections.length===0">{{$t('operation.delete')}}</el-button>
          </el-form-item>
          <el-pagination layout="prev, pager, next" @current-change="mappingHandleCurrentChange" :page-size="5" :total=mappingTotal style="float:right;">
          </el-pagination>
        </el-form>
      </el-col>

      <!--端口映射表格-->
      <el-table :data="mapping" v-focus @selection-change="mappingSelChange" style="width: 100%" :header-cell-style="headerStyle">
        <el-table-column type="selection" min-width="30">
        </el-table-column>
        <el-table-column type="index" width="60">
        </el-table-column>
        <el-table-column prop="assport" :label="$t('NAT.mapping.assPort')" min-width="120">
        </el-table-column>
        <el-table-column prop="localport" :label="$t('NAT.mapping.localPort')" min-width="120">
        </el-table-column>
        <el-table-column prop="ip" :label="$t('NAT.mapping.IP')" min-width="120">
        </el-table-column>
        <el-table-column prop="ipcnt" :label="$t('NAT.mapping.IPCnt')" min-width="120">
        </el-table-column>
        <el-table-column prop="proto" :label="$t('NAT.mapping.proto')" min-width="120">
        </el-table-column>
        <el-table-column :label="$t('operation.operation')" min-width="120">
          <template slot-scope="scope">
            <!--<el-button  size="small" @click="handleMappingEdit(scope.$index, scope.row)">编辑</el-button>-->
            <el-button size="small" @click="signalDelMappingHandle(scope.$index, scope.row)">{{$t('operation.delete')}}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!--新增端口映射-->
    <el-dialog :title="$t('NAT.mapping.add')" :visible.sync="mappingFormVisible" width="50%">
      <el-form :model="mappingForm" :rules="rules" label-position="left" ref="mappingForm" size="small">
        <el-form-item :label="$t('NAT.mapping.assPort')" :label-width="tooltipLabelWidth" prop="assport">
          <el-input v-model="mappingForm.assport"></el-input>
        </el-form-item>
        <el-form-item :label="$t('NAT.mapping.localPort')" :label-width="tooltipLabelWidth" prop="localport">
          <el-input v-model="mappingForm.localport"></el-input>
        </el-form-item>
        <el-form-item :label="$t('NAT.mapping.IP')" :label-width="tooltipLabelWidth" prop="ip">
          <el-input v-model="mappingForm.ip"></el-input>
        </el-form-item>
        <el-form-item :label="$t('NAT.mapping.IPCnt')" :label-width="tooltipLabelWidth" prop="ipcnt">
          <el-input v-model="mappingForm.ipcnt"></el-input>
        </el-form-item>
        <el-form-item :label="$t('NAT.mapping.proto')" :label-width="tooltipLabelWidth" prop="proto">
          <el-select v-model="mappingForm.proto" :placeholder="$t('NAT.mapping.placeholder')" value="" style="width: 100%;">
            <el-option v-for="item in protoOption" :key="item.label" :label="item.label" :value="item.label">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="danger" @click="mappingCancel">{{$t('operation.cancel')}}</el-button>
        <el-button type="primary" @click="addMappingSubmit">{{$t('operation.submit')}}</el-button>
      </div>
    </el-dialog>

    <!--编辑端口映射-->
    <!-- <el-dialog title="编辑端口映射" :visible.sync="mappingEditFormVisible" width="50%">
    <el-form :model="mappingForm" status-icon :rules="mappingRule" label-position="left" ref="mappingForm" size="small">
      <el-form-item :label="$t('NAT.mapping.assPort')" prop="assport" :label-width="tooltipLabelWidth">
        <el-input v-model="mappingForm.assport"></el-input>
      </el-form-item>
      <el-form-item :label="$t('NAT.mapping.localPort')" prop="localport" :label-width="tooltipLabelWidth">
        <el-input v-model="mappingForm.localport"></el-input>
      </el-form-item>
      <el-form-item :label="$t('NAT.mapping.IP')" prop="ip" :label-width="tooltipLabelWidth">
        <el-input v-model="mappingForm.ip"></el-input>
      </el-form-item>
      <el-form-item :label="$t('NAT.mapping.IPCnt')" prop="ipcnt" :label-width="tooltipLabelWidth">
        <el-input v-model="mappingForm.ipcnt"></el-input>
      </el-form-item>
      <el-form-item :label="$t('NAT.mapping.proto')" prop="proto" :label-width="tooltipLabelWidth">
        <el-select v-model="mappingForm.proto" placeholder="请选择" value="" style="width: 100%;">
          <el-option
            v-for="item in protoOption"
            :key="item.label"
            :label="item.label"
            :value="item.label">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="danger" @click="mappingCancel">取 消</el-button>
      <el-button type="primary" @click="editMappingSubmit">确 定</el-button>
    </div>
  </el-dialog> -->
  </section>
</template>

<script>
import {
  getMapping,
  addMapping,
  delMapping,
  editMapping
} from '../../../../api/api'
import validate from '@/utils/rules'

export default {
  name: 'mapping',
  directives: {
    focus: {
      inserted: function(el) {
        el.focus()
      }
    }
  },
  data() {
    return {
      mappingFormVisible: false, // 端口映射添加表格显示控制
      mappingEditFormVisible: false, // 端口映射编辑表格显示控制

      mappingPage: 1,
      mappingTotal: 0,

      mappingForm: {
        assport: '', // 外网端口
        localport: '', // 内网端口
        ip: '', // 内网起始IP
        ipcnt: '', // 内网个数
        proto: '', // 协议
        handle: ''
      },

      protoOption: [
        {
          label: 'TCP'
        },
        {
          label: 'UDP'
        }
      ],

      mapping: [],
      mappingSelections: [], // 端口映射批量删除列表选中列

      tooltipLabelWidth: '100px',
      formLabelWidth: '130px',

      rules: {
        assport: [
          {
            validator: validate('number', '请输入数字', '不能为空！'),
            trigger: 'blur'
          }
        ],
        localport: [
          {
            validator: validate('number', '请输入数字', '不能为空！'),
            trigger: 'blur'
          }
        ],
        ip: [
          {
            validator: validate('ip', '请输入正确IP', 'IP不能为空！'),
            trigger: 'blur'
          }
        ],
        ipcnt: [
          {
            validator: validate('number', '请输入正确数字', '不能为空！'),
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    headerStyle() {
      return this.header()
    },

    // 获得mapping信息
    getMappingInfo: function() {
      let para = {
        page: this.mappingPage,
        count: 5
      }
      getMapping(para)
        .then(res => {
          if (this.mappingPage === res.data.page) {
            if (res.data.total !== 0) {
              if (res.data.data.length !== 0) {
                this.mappingTotal = res.data.total
                this.mapping = res.data.data
              } else if (res.data.total > 5) {
                this.mappingPage -= 1
                this.getMappingInfo()
              }
            } else if (res.data.total === 0) {
              this.mapping = []
            }
          } else {
            this.getMappingInfo()
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 映射表格编辑
    handleMappingEdit: function(index, row) {
      this.mappingEditFormVisible = true
      this.mappingForm = Object.assign({}, row)
    },
    // 映射表格编辑提交
    editMappingSubmit: function() {
      this.mappingForm.handle = 0
      let para = Object.assign({}, this.mappingForm)
      // console.log("mappingForm is"+this.mappingForm);
      editMapping(para)
        .then(() => {
          this.$message({
            message: '提交成功',
            type: 'success'
          })
          this.$refs['mappingForm'].resetFields()
          this.mappingEditFormVisible = false
          this.getMappingInfo()
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 映射表格编辑取消
    mappingCancel() {
      this.mappingFormVisible = false
      this.mappingEditFormVisible = false
    },
    // 映射表格添加处理 显示端口dialogue
    addMappingHandle: function() {
      this.mappingFormVisible = true
    },
    // 映射表格添加提交
    addMappingSubmit: function() {
      this.$refs['mappingForm'].validate()
      let para = Object.assign({}, this.mappingForm)
      para.handle = 0
      addMapping(para)
        .then(() => {
          this.$message({
            message: '提交成功',
            type: 'success'
          })
          this.$refs['mappingForm'].resetFields()
          this.getMappingInfo()
        })
        .then(() => {
          this.mappingFormVisible = false
          this.mappingForm = {}
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 映射表格删除
    delMappingHandle: function() {
      for (let i = 0; i < this.mappingSelections.length; i++) {
        del(this.mappingSelections[i])
        // console.log(this.mappingSelections)
      }
      function del(item) {
        let para = Object.assign({}, item)
        para.handle = 1
        para.assport = para.assport + ''
        para.ipcnt = String(para.ipcnt)
        para.localport = String(para.localport)
        console.log(para.assport)
        delMapping(para)
          .then(() => {})
          .catch(error => {
            console.log(error)
          })
      }
      this.getMappingInfo()
    },
    // 单独删除一个映射表格
    signalDelMappingHandle: function(index, row) {
      row.handle = 1
      row.assport = String(row.assport)
      row.ipcnt = String(row.ipcnt)
      row.localport = String(row.localport)
      let para = Object.assign({}, row)
      // console.log("the row is "+row);

      this.$confirm('确认删除选中记录吗？', '提示', {
        type: 'warning'
      }).then(() => {
        delMapping(para).then(() => {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.getMappingInfo()
        })
      })
        .catch(error => {
          console.log(error)
        })
    },
    // 映射表格 分页选择 跳到选中页面
    mappingHandleCurrentChange(val) {
      this.mappingPage = val
      this.getMappingInfo()
    },
    // 映射表格 多选 确定选中选项
    mappingSelChange: function(sels) {
      this.mappingSelections = sels
    }
  },
  mounted() {
    this.getMappingInfo()
  }
}
</script>

<style scoped>
.table {
  width: 100%;
}
</style>
