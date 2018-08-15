<template>
  <section>
    <div class="line_02">
      <span>账号设置</span>
    </div>
    <!-- <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true">
				<el-form-item>
					<el-button type="primary">添加</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary">启用</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary">停用</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary">删除</el-button>
				</el-form-item>
			</el-form>
		</el-col> -->

    <el-table :data="list" @selection-change="selsChange" style="width: 100%;" :header-cell-style="headerStyle">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column prop="username" label="用户名" min-width="120">
      </el-table-column>
      <el-table-column prop="passwd" label="密码" min-width="180">
      </el-table-column>
      <el-table-column prop="status" label="状态" min-width="180">
      </el-table-column>
      <el-table-column prop="behaviour" label="操作" min-width="180">
        <template slot-scope="scope">
          <el-button size="small" @click="changePasswd">修改密码</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="修改密码" :visible.sync="isInChanging">
      <el-form :model="checkForm" ref="addForm">
        <el-form-item prop="old" label="请输入原密码">
          <el-input type="password" v-model="checkForm.old"></el-input>
        </el-form-item>
        <el-form-item prop="one" label="请输入新密码">
          <el-input type="password" v-model="checkForm.one"></el-input>
        </el-form-item>
        <el-form-item prop="two" label="请再次输入新密码">
          <el-input type="password" v-model="checkForm.two"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="danger" @click="addCancel">{{$t('operation.cancel')}}</el-button>
        <el-button type="primary" @click="addSubmit">{{$t('operation.submit')}}</el-button>
      </div>
    </el-dialog>

  </section>
</template>

<script>
import { changePasswd } from '@/api/api.js'
import md5 from 'js-md5'
export default {
  name: 'accountSetting',
  data() {
    return {
      isInChanging: false,
      sels: [],
      checkForm: {},
      list: []
    }
  },
  methods: {
    headerStyle() {
      return this.header()
    },
    selsChange: function(sels) {
      this.sels = sels
    },
    changePasswd() {
      this.isInChanging = true
    },
    addCancel() {
      this.isInChanging = false
      this.$refs.checkForm.resetFields()
    },
    addSubmit() {
      if (this.checkForm.one === this.checkForm.two) {
        let para = {}
        para.username = this.list[0].username
        para.passwd = md5(this.checkForm.old)
        para.new_passwd = md5(this.checkForm.one)
        changePasswd(para).then(res => {
          if (res.data.code === 200) {
            this.list[0].status = '修改成功'
          } else {
            this.list[0].status = '修改失败'
          }
          this.isInChanging = false
        })
      } else {
        this.$message({
          type: 'error',
          message: '两次输入密码不一致！'
        })
        this.$refs.checkForm.resetFields()
      }
    },
    getInfo() {
      let data = JSON.parse(sessionStorage.getItem('user'))
      console.log('user is ' + sessionStorage.getItem('user'))

      let para = {}
      para.username = data.userName
      para.passwd = '******'
      para.status = '使用中'
      this.list.push(para)
    }
  },
  mounted() {
    this.getInfo()
  }
}
</script>

<style scoped>
</style>
