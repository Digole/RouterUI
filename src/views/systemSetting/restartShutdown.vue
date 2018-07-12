<template>
	<section>
		<div class="line_02"><span>重启关机</span></div>
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true">
				<el-form-item>
					<el-button type="danger" @click="restartNow" >立即重启</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="danger" right>立即关机</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="danger" right>添加事件</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="danger" right>删除事件</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<el-table style="width: 100%" :header-cell-style="headerStyle">
			<el-table-column prop="behaviour"  label="事件" min-width="180">
			</el-table-column>
			<el-table-column prop="time"  label="预设时间" min-width="360">
			</el-table-column>
			<el-table-column label="操作" width="150">
				<template slot-scope="scope">
						<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
						<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
	</section>
</template>

<script>
  import { sendRestart } from '../../api/api'

  export default {
    name: 'restartShutdown',

    data() {
      return {
        eventList: {
          event: '',
          time: '',
          handle: ''
        }
      }
    },

    methods: {
      headerStyle() {
        return this.header()
      },

      restartNow: function () {
        this.eventList.event = 'string'
        this.eventList.time = 'now'
        this.eventList.handle = '1'

        let para = Object.assign({}, this.eventList)

        this.$confirm('确认立即重启吗吗？', '提示', {
          type: 'warning'
        }).then(() => {
          console.log(para)
          sendRestart(para).then(() => {
            this.$message({
              message: '发送成功',
              type: 'success'
            })
          })
        }).catch(() => {
        })
      },
    }
  }
</script>

<style scoped>

</style>
