<template>
	<section>
		<div class="line_02">
			<span>账号设置</span>
		</div>
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
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
		</el-col>

		<el-table @selection-change="selsChange" style="width: 100%;" :header-cell-style="headerStyle">
			<el-table-column prop="username" label="用户名" min-width="120">
			</el-table-column>
			<el-table-column prop="passwd" label="密码" min-width="180">
			</el-table-column>
			<el-table-column prop="status" label="状态" min-width="180">
			</el-table-column>
			<el-table-column prop="behaviour" label="操作" min-width="180">
			</el-table-column>
			<el-table-column type="selection" width="55">
			</el-table-column>
		</el-table>
	</section>
</template>

<script>
export default {
  ame: 'accountSetting',
  data() {
    return {
      sels: []
    }
  },
  methods: {
    headerStyle() {
      return this.header()
    },
    selsChange: function(sels) {
      this.sels = sels
    }
  }
}
</script>

<style scoped>
</style>
