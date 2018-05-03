<template>
  <section>

    <div class="line_02"><span>终端监控</span></div>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" >
        <el-form-item>
          <el-input placeholder="搜索IP/MAC"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" >查询</el-button>
        </el-form-item>
        <!--
          <el-form-item>
              <el-button type="primary"  @click="handleAdd">新增</el-button>
          </el-form-item>
          -->
      </el-form>
    </el-col>

    <el-table :data="terminal" style="width: 100%;" :header-cell-style="headerStyle">
      <el-table-column prop="name" label="名称" width="120" >
      </el-table-column>
      <el-table-column prop="IP" label="IP" min-width="120">
      </el-table-column>
      <el-table-column prop="MAC" label="MAC" min-width="180">
      </el-table-column>
      <el-table-column prop="linkNumber" label="连接数" width="120">
      </el-table-column>
      <el-table-column prop="uplinkRate" label="上行速率" min-width="120">
      </el-table-column>
      <el-table-column prop="downlinkRate" label="下行速率"  min-width="120">
      </el-table-column>
      <el-table-column prop="onlineTime" label="在线时长"  min-width="120">
      </el-table-column>
      <el-table-column label="操作" min-width="180">
        <template slot-scope="scope">
          <el-button @click="speedLimit(scope.row)" type="text" size="small">限速</el-button>
          <el-button @click="ChangeName(scope.row)" type="text" size="small">修改名称</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--新增界面-->
    <el-dialog title="修改名称"
               :visible.sync="addFormVisible">
      <el-form label-width="80px">
        <el-form-item label="名称" prop="name">
          <el-input auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button>取消</el-button>
        <el-button type="primary">提交</el-button>
      </div>
    </el-dialog>

  </section>
</template>

<script>
  export default{
    data(){
      return {
        addFormVisible: false,

        terminal:[
          {
            name: '1',
            IP: "0.0.0.0",
            MAC: "00-00-00-00-00-00-00-00",
            linkNumber: 0,
            uplinkRate: 0,
            downlinkRate: 0,
            onlineTime: 0
          },
          {
            name:'2',
            IP: "0.0.0.0",
            MAC: "00-00-00-00-00-00-00-00",
            linkNumber: 0,
            uplinkRate: 0,
            downlinkRate: 0,
            onlineTime: 0
          }
        ],
      }
    },
    methods: {
      headerStyle() {
        return this.header();
      },
      speedLimit(row) {
        console.log(row);
      },
      ChangeName(row){
        this.addFormVisible = true;
      },
    }
  }
</script>

<style scoped>
  .line_02{
    margin-bottom: 20px;
    margin-top: 30px;
    height: 1px;
    border-top: 1px solid #ddd;
    text-align: left;
    color: #909399
  }
  .line_02 span{
    position: relative;
    top: -10px;
    background: #fff;
    padding: 0 30px 0 0;
    font-weight: bold
  }
</style>
