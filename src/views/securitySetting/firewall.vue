<template>
  <div>
    <el-form :inline=true>
      <el-form-item>
        <p>选择网口</p>
        <el-dropdown>
          <span class="el-dropdown-link">

          </span>
          <el-dropdown-menu slot="dropdown">
            <!-- <el-dropdown-item v-for="(item, index) in portList" :key="index">
						</el-dropdown-item> -->
          </el-dropdown-menu>
        </el-dropdown>
      </el-form-item>
      <el-form-item>
        <p>IP策略</p>
        <el-input class="input" prop="ips" title="开始IP"></el-input>
        <el-input prop="ipe" title="结束IP"></el-input>
      </el-form-item>
      <el-form-item>
        <p>MAC策略</p>
        <el-input prop="macs" title="开始MAC"></el-input>
        <el-input prop="mace" title="结束MAC"></el-input>
      </el-form-item>
      <el-form-item>
        <p>TCP策略</p>
        <el-input prop="tcps" title="开始端口"></el-input>
        <el-input prop="tcpe" title="结束端口"></el-input>
      </el-form-item>
      <el-form-item>
        <p>UDP策略</p>
        <el-input prop="udps" title="开始端口"></el-input>
        <el-input prop="udpe" title="结束端口"></el-input>
      </el-form-item>
    </el-form>

    <el-table :data="rulesList">
      <el-table-column prop="port" label="端口"></el-table-column>
      <el-table-column label="IP策略">
        <el-table-column prop="ips" label="开始地址"></el-table-column>
        <el-table-column prop="ipe" label="结束地址"></el-table-column>
      </el-table-column>
      <el-table-column label="MAC策略">
      </el-table-column>
      <el-table-column label="TCP策略">
        <el-table-column prop="tcps" label="开始端口"></el-table-column>
        <el-table-column prop="tcpe" label="结束端口"></el-table-column>
      </el-table-column>
      <el-table-column label="UDP策略">
        <el-table-column prop="udps" label="开始端口"></el-table-column>
        <el-table-column prop="udpe" label="结束端口"></el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'firewall',
  data() {
    return {
      rulesList: [],
      rulesTable: {},
      ports: [
        {
          enname: 'en6',
          webname: 'eth0',
          devname: '',
          linkstatus: 'on',
          function: 'wan',
          type: 'static',
          ip: '10.9.0.92',
          netmask: '255.255.0.0',
          gateway: '0.0.0.0',
          mac: '00:90:28:01:16:3d',
          speed: 0,
          webindex: 1
        },
        {
          enname: 'en5',
          webname: 'eth1',
          devname: '',
          linkstatus: 'on',
          function: 'lan',
          type: 'normal',
          ip: '192.168.1.95',
          netmask: '255.255.255.0',
          gateway: '0.0.0.0',
          mac: '00:90:28:01:16:3e',
          speed: 0,
          webindex: 2
        },
        {
          enname: 'en4',
          webname: 'eth2',
          devname: '',
          linkstatus: 'off',
          function: 'lan',
          type: 'dhcp',
          ip: '0.0.0.0',
          netmask: '0.0.0.0',
          gateway: '0.0.0.0',
          mac: '00:90:28:01:16:3f',
          speed: 0,
          webindex: 3
        },
        {
          enname: 'en3',
          webname: 'eth3',
          devname: '',
          linkstatus: 'off',
          function: 'normal',
          type: 'normal',
          ip: '10.9.0.92',
          netmask: '255.255.0.0',
          gateway: '0.0.0.0',
          mac: '00:90:28:01:16:40',
          speed: 0,
          webindex: 4
        },
        {
          enname: 'en2',
          webname: 'eth4',
          devname: '',
          linkstatus: 'off',
          function: 'wan',
          type: 'dhcp',
          ip: '0.0.0.0',
          netmask: '0.0.0.0',
          gateway: '0.0.0.0',
          mac: '00:90:28:01:16:41',
          speed: 0,
          webindex: 5
        },
        {
          enname: 'en1',
          webname: 'eth5',
          devname: '',
          linkstatus: 'off',
          function: 'normal',
          type: 'dhcp',
          ip: '0.0.0.0',
          netmask: '0.0.0.0',
          gateway: '0.0.0.0',
          mac: '00:90:28:01:16:42',
          speed: 0,
          webindex: 6
        }
      ],
      rules: [
        {
          iface: 'en1',
          rules: [
            {
              mac: [{ macs: '00:60:b3:12:34:56', mace: '00:60:b3:12:34:57' }]
            },
            {
              ip: [
                { ips: '192.168.1.20', ipe: '192.168.1.30' },
                { ips: '192.168.1.50', ipe: '192.168.1.70' }
              ]
            },
            { tcp: [{ tcps: 80, tcpe: 90 }, { tcps: 180, tcpe: 190 }] },
            { udp: [{ udps: 80, udpe: 90 }, { udps: 80, udpe: 90 }] }
          ]
        },
        {
          iface: 'en2',
          rules: [
            {
              mac: [{ macs: '00:60:b3:12:34:56', mace: '00:60:b3:12:34:57' }]
            },
            {
              ip: [
                { ips: '192.168.1.20', ipe: '192.168.1.30' },
                { ips: '192.168.1.50', ipe: '192.168.1.70' }
              ]
            },
            { tcp: [{ tcps: 80, tcpe: 90 }, { tcps: 180, tcpe: 190 }] },
            { udp: [{ udps: 80, udpe: 90 }, { udps: 80, udpe: 90 }] }
          ]
        },
        {
          iface: 'en3',
          rules: [
            {
              mac: [{ macs: '00:60:b3:12:34:56', mace: '00:60:b3:12:34:57' }]
            },
            {
              ip: [
                { ips: '192.168.1.20', ipe: '192.168.1.30' },
                { ips: '192.168.1.50', ipe: '192.168.1.70' }
              ]
            },
            { tcp: [{ tcps: 80, tcpe: 90 }, { tcps: 180, tcpe: 190 }] },
            { udp: [{ udps: 80, udpe: 90 }, { udps: 80, udpe: 90 }] }
          ]
        },
        {
          iface: 'en4',
          rules: [
            {
              mac: [{ macs: '00:60:b3:12:34:56', mace: '00:60:b3:12:34:57' }]
            },
            {
              ip: [
                { ips: '192.168.1.20', ipe: '192.168.1.30' },
                { ips: '192.168.1.50', ipe: '192.168.1.70' }
              ]
            },
            { tcp: [{ tcps: 80, tcpe: 90 }, { tcps: 180, tcpe: 190 }] },
            { udp: [{ udps: 80, udpe: 90 }, { udps: 80, udpe: 90 }] }
          ]
        },
        {
          iface: 'en5',
          rules: [
            {
              mac: [{ macs: '00:60:b3:12:34:56', mace: '00:60:b3:12:34:57' }]
            },
            {
              ip: [
                { ips: '192.168.1.20', ipe: '192.168.1.30' },
                { ips: '192.168.1.50', ipe: '192.168.1.70' }
              ]
            },
            { tcp: [{ tcps: 80, tcpe: 90 }, { tcps: 180, tcpe: 190 }] },
            { udp: [{ udps: 80, udpe: 90 }, { udps: 80, udpe: 90 }] }
          ]
        },
        {
          iface: 'en6',
          rules: [
            {
              mac: [{ macs: '00:60:b3:12:34:56', mace: '00:60:b3:12:34:57' }]
            },
            {
              ip: [
                { ips: '192.168.1.20', ipe: '192.168.1.30' },
                { ips: '192.168.1.50', ipe: '192.168.1.70' }
              ]
            },
            { tcp: [{ index: 1, ips: '192.168.1.20', ipe: '192.168.1.30', tcps: 80, tcpe: 90 }, { ips: '192.168.1.20', ipe: '192.168.1.30', tcps: 180, tcpe: 190 }] },
            { udp: [{ udps: 80, udpe: 90 }, { udps: 80, udpe: 90 }] }
          ]
        }
      ]
    }
  },
  methods: {
    getRules() {
      this.rules.forEach(this.getPortRules)
    },
    getPortRules(element, index, array) {
      this.rulesTable.port = element.iface
      element.rules.forEach(this.getTypeRules)
    },
    getTypeRules(item, index, array) {
      item[Object.keys(item)].forEach(this.getValue)
    },
    getValue(val, index, array) {
      console.log(val)
      let table = {}
      for (let i in val) {
        table[i] = val[i]
      }
      table.port = this.rulesTable.port
      this.rulesList.push(table)
    },
    getInfo() {
      console.log(this.rulesList)
    }
  },
  mounted() {
    this.getRules()
    this.getInfo()
  }
}
</script>

<style lang="scss" scoped>
.el-input {
  display: inline-block;
  width: 40%;
}
</style>