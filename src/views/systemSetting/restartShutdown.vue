<template>
	<section>
		<div class="line_02"><span>{{$t('systemSetting.restartShutdown')}}</span></div>
		<el-col :span="24">
			<el-form :inline="true">
				<el-form-item>
					<el-button type="danger" @click="restartNow" >{{$t('systemSetting.restartNow')}}</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="danger" @click="powerOffNow" right>{{$t('systemSetting.powerOffNow')}}</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="danger" @click="addTrigger" right>{{$t('systemSetting.addTrigger')}}</el-button>
				</el-form-item>
				<!-- <el-form-item>
					<el-button type="danger" right>删除事件</el-button>
				</el-form-item> -->
			</el-form>
		</el-col>
		<el-table :data="form" style="width: 100%" :header-cell-style="headerStyle">
			<el-table-column prop="event" :label="$t('systemSetting.event')">
			</el-table-column>
			<el-table-column prop="date"  :label="$t('systemSetting.date')">
			</el-table-column>
			<el-table-column prop="oper_type" :label="$t('systemSetting.oper_type')">
				<template slot-scope="scope">
						<el-button v-if="scope.row.status" size="small" @click="handleStart(scope.$index, scope.row)">{{$t('systemSetting.handleStart')}}</el-button>
						<el-button v-else size="small" @click="handleStop(scope.$index, scope.row)">{{$t('systemSetting.handleStop')}}</el-button>
						<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">{{$t('systemSetting.handleDel')}}</el-button>
				</template>
			</el-table-column>
		</el-table>

    <el-pagination 
      layout="prev, pager, next" 
      :total="total" 
      :page-size="10" 
      @current-change="handleChange"
      style="float: right">
    </el-pagination>

    <el-dialog :title="$t('systemSetting.addTrigger')" :visible.sync="isAdd">
      <el-form ref="form" :model="powerEvent" label-width="3rem">
        <el-form-item prop="event" :label="$t('systemSetting.event')">
          <el-radio v-model="powerEvent.oper_type" :label="$t('systemSetting.shutdown')"></el-radio>
          <el-radio v-model="powerEvent.oper_type" :label="$t('systemSetting.restart')"></el-radio>
        </el-form-item>
        <el-form-item prop="date" :label="$t('systemSetting.date')">
          <el-input v-model="powerEvent.date" placeholder="示例: 20180808"></el-input>
        </el-form-item>
        <el-form-item prop="time" :label="$t('systemSetting.event')">
          <el-input v-model="powerEvent.time" placeholder="示例: 02:30"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="cancelAdd" >{{$t('operation.cancel')}}</el-button>
        <el-button size="small" @click="submitAdd" >{{$t('operation.submit')}}</el-button>
      </div>
    </el-dialog>
	</section>
</template>

<script>
  import { powerOff, restart, getEvent, setEvent } from '../../api/api'

  export default {
    name: 'restartShutdown',

    data() {
      return {
        eventList: {
          event: '',
          time: '',
          handle: ''
        },
        powerEvent: {
          event_id: Number,
          event: '',
          date: '',
          time: '',
          status: Number,
          oper_type: '',
          desc: ''
        },
        /*
        @number int 时间编号
        @event  int 事件: shutdowm/restart
        @date   string
        @time   string
        @status int
        @oper_type string
        @desc   string
        */
        form: [],
  
        isAdd: false,

        currentPage: 1,
        total: 0
  
      }
    },

    methods: {
      headerStyle() {
        return this.header()
      },

      addTrigger() {
        this.isAdd = true
      },

      cancelAdd() {
        this.isAdd = !this.isAdd
      },

      submitAdd() {
        let para = Object.assign({}, this.powerEvent)
        para.oper_type = 'add'
        this.setInfo(para)
      },

      handleDel(index, val) {
        let para = Object.assign(val)
        para.oper_type = 'delete'
        this.setInfo(para)
      },

      handStart(index, val) {
        let para = Object.assign(val)
        para.oper_type = 'update'
        this.setInfo(para)
      },

      handleStop(index, val) {
        let para = Object.assign(val)
        para.oper_type = 'stop'
        this.setInfo(para)
      },

      restartNow: function () {
        this.$confirm('确认立即重启吗？', '提示', {
          type: 'warning'
        })
          .then(() => {
            restart()
              .then(() => {
                this.$message({
                  message: '发送成功',
                  type: 'success'
                })
              })
          })
          .catch((error) => {
            console.log(error)
          })
      },

      powerOffNow() {
        this.$confirm('确认立即关机吗？', '提示', {
          type: 'warning'
        })
          .then(() => {
            powerOff()
              .then(() => {
                this.$message({
                  message: '发送成功',
                  type: 'success'
                })
              })
          })
          .catch((error) => {
            console.log(error)
          })
      },
  
      getInfo() {
        let para = {}
        para.page = this.currentPage

        getEvent(para)
          .then(res => {
            if (res.data.code === 200) {
              this.form = res.data.data
            }
          })
          .catch(error => {
            console.log(error)
          })
      },

      setInfo(para) {
        if (para === '' || para === null) {
          para = Object.assign({}, this.powerEvent)
        }
        setEvent(para)
          .then(res => {
            if (res.data.code === 200) {
              this.getInfo()
            }
          })
      },

      handleChange(val) {
        this.currentPage = val
        this.getInfo()
      }
    },
    mounted() {
      this.getInfo()
    }
  }
</script>

<style scoped>

</style>
