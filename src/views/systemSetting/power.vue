<template>
  <section>
    
    <div class="line_02">
      <span>{{$t('powerSetting.powerSetting')}}</span>
    </div>



 

    <el-table :data="powerShow" @selection-change="selsChange" style="width: 100%;" :header-cell-style="headerStyle">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column prop="roleName" :label="$t('powerSetting.roleName')" min-width="120">
      </el-table-column>
      <el-table-column prop="cmdID1S" :label="$t('powerSetting.cmdID1')" min-width="180">
      </el-table-column>
      <el-table-column prop="cmdID2S" :label="$t('powerSetting.cmdID2')" min-width="180">
      </el-table-column>
      <el-table-column prop="cmdID3S" :label="$t('powerSetting.cmdID3')" min-width="180">
      </el-table-column>
      <el-table-column prop="cmdID4S" :label="$t('powerSetting.cmdID4')" min-width="180">
      </el-table-column>
    </el-table>
    
    
    </section>
    </template>


<script>
import { changePasswordAction } from '@/api/api.js'
import { queryUsersAction } from '@/api/api.js'
import { addUserAction } from '@/api/api.js'
import { delUserAction } from '@/api/api.js'
import { disableUserAction } from '@/api/api.js'
import md5 from 'js-md5'
export default {
  name: 'powerSetting',
  data() {
    return {
      cmd: '',
      submit: 0,
      isSubmit: false,
      isM1: false,
      isM2: false,
      isM3: false,
      cmd1: '',
      cmd2: '',
      cmd3: '',
      cmd4: '',
      cmd5: '',
      cmd6: '',
      cmd7: '',
      cmd8: '',
      cmd9: '',
      cmd10: '',
      cmd11: '',
      cmd12: '',
      powerRec: [{}],
      powerShow: [{
        roleIDS: '',
        roleNameS: '',

        ModuleName1S: '',
        ModuleName2S: '',
        ModuleName3S: '',

        cmdID1S: '',
        cmdID2S: '',
        cmdID3S: '',
        cmdID4S: '',
        cmdID5S: '',
        cmdID6S: '',
        cmdID7S: '',
        cmdID8S: '',
        cmdID9S: '',
        cmdID10S: '',
        cmdID11S: '',
        cmdID12S: '',

        cmdNameS: ''
      }],
      powerPost: [{
        roleIDP: '',
        roleNameP: '',
        ModuleName1P: '',
        ModuleName2P: '',
        ModuleName3P: '',
        ModuleName4P: '',
        ModuleName5P: '',
        ModuleName6P: '',
        ModuleID1P: '',
        ModuleID2P: '',
        ModuleID3P: '',
        ModuleID4P: '',
        ModuleID5P: '',
        ModuleID6P: '',
        cmdIDP: '',
        cmdNameP: ''
      }],
      powerRec: [{
        roleIDR: '',
        roleNameR: '',
        ModuleName1R: '',
        ModuleName2R: '',
        ModuleName3R: '',
        ModuleName4R: '',
        ModuleName5R: '',
        ModuleName6R: '',
        ModuleID1R: '',
        ModuleID2R: '',
        ModuleID3R: '',
        ModuleID4R: '',
        ModuleID5R: '',
        ModuleID6R: '',
        cmdIDR: '',
        cmdNameR: ''
      }],
      sels: []
    }
  },

  methods: {
    Module1() {
      this.isM1 = true
    },
    Module2() {
      this.isM2 = true
    },
    Module3() {
      this.isM3 = true
    },
    submitCancel1() {
      this.isM1 = false
    },
    submitCancel2() {
      this.isM2 = false
    },
    submitCancel3() {
      this.isM3 = false
    },
    submitChange1() {
      this.isM1 = false
    },
    submitChange2() {
      this.isM2 = false
    },
    submitChange3() {
      this.isM3 = false
    },
    selsChange: function(sels) {
      this.sels = sels
    },
    getNowPower() {

    }
  },
  headerStyle() {
    return this.header()
  },
  mounted() {
    this.getNowPower()
  }
}
</script>

<style scoped>
</style>
