<template>
  <section>

    <div class="line_02">
      <span>{{$t('powerSetting.powerSetting')}}</span>
    </div>

    <!-- 提交按钮-->
    <el-col :span="24">
      <el-form :inline="true">
        <el-form-item>
          <el-button type="danger" @click="addChange">{{$t('powerSetting.addChange')}}</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!-- 表格-->
    <el-table :data="powerShow" :span-method="objectSpanMethod" border style="width: 100%; margin-top: 20px" :header-cell-style="headerStyle">
      <el-table-column prop="all" :label="$t('powerSetting.all')" width="180">
      </el-table-column>
      <el-table-column prop="detail" :label="$t('powerSetting.detail')">
      </el-table-column>

      <el-table-column property="operator" :label="$t('powerSetting.operator')" width="200">
        <template slot-scope="scope1">
          <el-switch on-text="是" off-text="否" on-color="#5B7BFA" off-color="#dadde5" v-model="scope1.row.operator" @change=change(scope1.$index,scope1.row)>
          </el-switch>
        </template>
      </el-table-column>

      <el-table-column property="visitor" :label="$t('powerSetting.visitor')" width="200">
        <template slot-scope="scope2">
          <el-switch on-text="启用" off-text="禁用" on-color="#5B7BFA" off-color="#dadde5" v-model="scope2.row.visitor" @change=change(scope2.$index,scope2.row)>
          </el-switch>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="$t('powerSetting.submitChange')" :visible.sync="isAdd">
      <el-form ref="form" :model="powerShow" label-width="16rem">
        <el-form-item prop="submit" :label="$t('powerSetting.ifsubmit')"></el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="danger" @click="changeCancel">{{$t('operation.cancel')}}</el-button>
        <el-button type="primary" @click="changeSubmit">{{$t('operation.submit')}}</el-button>
      </div>
    </el-dialog>

  </section>
</template>


<script>
// import md5 from 'js-md5'
export default {
  name: 'powerSetting',
  data() {
    return {
      rowspan1: 1,
      spanArr: [],
      sels: [],
      checkForm: {},
      list: [{ status: '' }],
      form: [],
      isAdd: false,
      powerNow: [],
      powerShow: [
        {
          all: '状态监控',
          detail: '线路监控',
          operator: true,
          visitor: false
        },
        {
          all: '状态监控',
          detail: '终端监控',
          operator: false,
          visitor: false
        },
        {
          all: '状态监控',
          detail: '流量监控',
          operator: false,
          visitor: false
        },
        {
          all: '状态监控',
          detail: '速率监控',
          operator: false,
          visitor: false
        },
        {
          all: '状态监控',
          detail: '性能监控',
          operator: false,
          visitor: false
        },
        {
          all: '网络设置',
          detail: '内外网设置',
          operator: false,
          visitor: false
        },
        {
          all: '网络设置',
          detail: 'DHCP服务器设置',
          operator: false,
          visitor: false
        },
        {
          all: '网络设置',
          detail: 'DNS设置',
          operator: false,
          visitor: false
        },
        {
          all: '网络设置',
          detail: '静态路由',
          operator: false,
          visitor: false
        },
        {
          all: '网络设置',
          detail: 'VLAN设置',
          operator: false,
          visitor: false
        },
        {
          all: '网络设置',
          detail: 'KidVPN设置',
          operator: false,
          visitor: false
        },
        {
          all: '网络设置',
          detail: 'NAT转发和端口映射',
          operator: false,
          visitor: false
        },
        {
          all: '网络设置',
          detail: 'Qos',
          operator: false,
          visitor: false
        },
        {
          all: '系统设置',
          detail: '基础设置',
          operator: false,
          visitor: false
        },
        {
          all: '系统设置',
          detail: '账号设置',
          operator: false,
          visitor: false
        },
        {
          all: '系统设置',
          detail: '版本升级',
          operator: false,
          visitor: false
        },
        {
          all: '系统设置',
          detail: '硬件信息',
          operator: false,
          visitor: false
        },
        {
          all: '系统设置',
          detail: '重启关机',
          operator: false,
          visitor: false
        },
        {
          all: '系统设置',
          detail: '权限管理',
          operator: false,
          visitor: false
        },
        {
          all: '流控分流',
          detail: '流控策略管理',
          operator: false,
          visitor: false
        },
        {
          all: '行为管理',
          detail: '行为记录管理',
          operator: false,
          visitor: false
        },
        {
          all: '行为管理',
          detail: '行为记录显示',
          operator: false,
          visitor: false
        },
        {
          all: '安全设置',
          detail: 'ARP绑定',
          operator: false,
          visitor: false
        },
        {
          all: '安全设置',
          detail: 'ARP防御',
          operator: false,
          visitor: false
        },
        {
          all: '安全设置',
          detail: '远程登录管理',
          operator: false,
          visitor: false
        },
        {
          all: '安全设置',
          detail: '规则防火墙',
          operator: false,
          visitor: false
        },
        {
          all: '系统工具',
          detail: 'Ping测试',
          operator: false,
          visitor: false
        },
        {
          all: '日志系统',
          detail: '拨号日志',
          operator: false,
          visitor: false
        },
        {
          all: '日志系统',
          detail: '操作日志',
          operator: false,
          visitor: false
        },
        {
          all: 'shell',
          detail: 'shell',
          operator: false,
          visitor: false
        }
      ]
    }
  },

  methods: {
    headerStyle() {
      return this.header()
    },
    changeO() {},
    changeV() {},
    changeSubmit() {},
    changeCancel() {},

    addChange() {
      this.isAdd = true
    },
    selsChange: function(sels) {
      this.sels = sels
    },

    change: function(index, row) {
      console.log(index, row)
    },

    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex === 0) {
          return {
            rowspan: 5,
            colspan: 1
          }
        } else if (rowIndex === 5) {
          return {
            rowspan: 8,
            colspan: 1
          }
        } else if (rowIndex === 13) {
          return {
            rowspan: 6,
            colspan: 1
          }
        } else if (rowIndex === 19) {
          return {
            rowspan: 1,
            colspan: 1
          }
        } else if (rowIndex === 20) {
          return {
            rowspan: 2,
            colspan: 1
          }
        } else if (rowIndex === 22) {
          return {
            rowspan: 4,
            colspan: 1
          }
        } else if (rowIndex === 26) {
          return {
            rowspan: 1,
            colspan: 1
          }
        } else if (rowIndex === 27) {
          return {
            rowspan: 2,
            colspan: 1
          }
        } else if (rowIndex === 29) {
          return {
            rowspan: 1,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 1
          }
        }
      }
    },

    addNewAccountCancel() {},
    addNewAccount() {},

    getPowerInfo() {}
  },
  mounted() {
    // this.getInfo()
    this.getPowerInfo()
  }
}
</script>

<style scoped>
.menusStateTrue {
  background: #5b7bfa;
  color: white;
}
.menusStateTrue:hover {
  background: #5b7bfa;
  color: white;
}
</style>


