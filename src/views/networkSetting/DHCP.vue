<template>
  <section>
    <div class="line_02">
      <span>DHCP</span>
    </div>

    <!--工具条-->

      <el-form :inline="true">
        <el-form-item>
          <el-button type="primary" @click="handleAdd">修改</el-button>
        </el-form-item>
        <el-form-item v-if="!isInuse">
          <el-button type="primary" @click.native="start" :disabled="isEditing">启用</el-button>
        </el-form-item>
        <el-form-item v-else>
          <el-button type="danger" @click="stop" :disabled="isEditing">停止</el-button>
        </el-form-item>
      </el-form>


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
      <el-form :model="form" label-width="100px" ref="form" :rules="rules">
        <el-form-item prop="start" label="起始地址">
          <el-input v-model="form.start" :disabled="!isEditing" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item prop="end" label="结束地址">
          <el-input v-model="form.end" :disabled="!isEditing" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item prop="mask" label="子网掩码">
          <el-input v-model="form.mask" :disabled="!isEditing" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item prop="interface" label="网卡接口">
          <!-- <el-input v-model="form.interface" :disabled="!isEditing" auto-complete="off"></el-input> -->
          <el-select v-model="form.interface" placeholder="请选择" :disabled="!isEditing" style="width: 100%;">
            <el-option v-for="item in portsList" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="gateway" label="网关">
          <el-input v-model="form.gateway" :disabled="!isEditing" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item prop="dns1" label="首选DNS">
          <el-input v-model="form.dns1" :disabled="!isEditing" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item prop="dns2" label="备选DNS">
          <el-input v-model="form.dns2" :disabled="!isEditing" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item prop="lease" label="租期">
          <el-input type="number" v-model="form.lease" :disabled="!isEditing" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item prop="status" label="状态">
          <el-input v-model="form.status" disabled auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button v-if="isEditing" @click.native="addCancel">取消</el-button>
        <el-button v-if="isEditing" type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
      </div>
      


    <!-- </el-dialog> -->

  </section>
</template>

<script>
import { dhcpServerConfigAction, dhcpServerShowAction, getPorts } from '../../api/api.js'
import validate from '../../utils/rules.js'
export default {
  name: 'DHCP',
  data() {
    return {
      isEditing: false,
      addLoading: false,
      isInuse: false,

      addForm: {
        start: '', // 开始地址
        end: '', // 结束地址
        interface: '', // 网卡接口
        dns1: '',
        dns2: '',
        mask: '', // 掩码
        gateway: '', // 网关
        lease: '' // 租约时间
      },
      form: {
        enable: 0,
        start: '192.168.1.100',
        end: '192.168.1.200',
        interface: 'en1',
        dns1: '8.8.8.8',
        dns2: '8.8.8.8',
        mask: '255.255.255.0',
        gateway: '192.168.1.1',
        lease: 86400,
        code: 200
      },
      portsList: [],

      rules: {
        gateway: [
          {
            validator: validate('ip', '请输入正确网关地址', '网关地址不能为空')
          }
        ],
        start: [
          {
            validator: validate('ip', '请输入正确IP地址', 'IP地址不能为空')
          }
        ],
        end: [
          {
            validator: validate('ip', '请输入正确IP地址', 'IP地址不能为空')
          }
        ],
        mask: [
          {
            validator: validate('ip', '请输入正确掩码地址', '掩码地址不能为空')
          }
        ],
        dns1: [
          {
            validator: validate('ip', '请输入正确DNS地址')
          }
        ],
        dns2: [
          {
            validator: validate('ip', '请输入正确DNS地址')
          }
        ]
      }
    }
  },
  methods: {
    headerStyle() {
      return this.header()
    },
    // 显示新增界面
    handleAdd: function() {
      this.isEditing = true
    },
    addSubmit() {
      let para = Object.assign({}, this.form)
      para.lease = Number(para.lease)
      para.enable = 0
      this.$refs['form'].validate((valid) => {
        if (valid) {
          dhcpServerConfigAction(para)
            .then(res => {
              if (res.data.code === 200) {
                this.getInfo()
                this.isEditing = false
              }
            })
            .catch(error => {
              console.log(error)
            })
        }
      })
    },
    addCancel() {
      this.isEditing = false
      // this.refs['addForm'].resetFields()
    },
    start() {
      let para = Object.assign({}, this.form)
      para.lease = Number(para.lease)
      para.enable = 1
      dhcpServerConfigAction(para)
        .then(res => {
          if (res.data.code === 200) {
            this.getInfo()
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    stop() {
      let para = Object.assign({}, this.form)
      para.lease = Number(para.lease)
      para.enable = 0
      dhcpServerConfigAction(para)
        .then(res => {
          if (res.data.code === 200) {
            this.getInfo()
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    getInfo() {
      dhcpServerShowAction()
        .then((res) => {
          if (res.data.code === 200) {
            this.form = res.data
            if (this.form.enable === 1) {
              this.form.status = '使用中'
              this.isInuse = true
            } else {
              this.isInuse = false
              this.form.status = '未使用'
            }
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    getPortsInfo() {
      getPorts()
        .then(res => {
          if (res.data.code === 200) {
            res.data.interfaces.forEach(element => {
              this.portsList.push(element.enname)
            })
          }
        })
    },
    async getReady() {
      await this.getPortsInfo()
      await this.getInfo()
    }
  },
  mounted() {
    this.getReady()
  }
}
</script>

<style scoped>

</style>
