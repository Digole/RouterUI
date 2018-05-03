<template>
  <section>
    <div>
      <div class="line_02"><span>NAT转发</span></div>

      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true">
          <el-form-item>
            <el-button type="primary" @click="handleNatAdd">添加</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="danger">删除</el-button>
          </el-form-item>
        </el-form>
      </el-col>

      <el-table style="width: 100%" :header-cell-style="headerStyle">
        <el-table-column type="selection" min-width="30">
        </el-table-column>
        <el-table-column prop="currentLAN"  label="当前LAN口" min-width="180">
        </el-table-column>
        <el-table-column prop="currentWAN"  label="当前WAN口" min-width="180">
        </el-table-column>
        <el-table-column prop="currentRandomPort"  label="当前随机端口使用情况" min-width="120">
        </el-table-column>
        <el-table-column prop="networkAlias"  label="网络别名" min-width="120">
        </el-table-column>
        <el-table-column label="操作" min-width="150">
          <template slot-scope="scope">
            <el-button size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div>

      <div class="line_02"><span>端口映射</span></div>

      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true">
          <el-form-item>
            <el-button type="primary" @click="handlePortAdd">添加</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="danger">删除</el-button>
          </el-form-item>
        </el-form>
      </el-col>

      <el-table style="width: 100%" :header-cell-style="headerStyle">
        <el-table-column type="selection" min-width="30">
        </el-table-column>
        <el-table-column prop="outsidePort"  label="外网端口" min-width="120">
        </el-table-column>
        <el-table-column prop="innerPort"  label="内网端口" min-width="120">
        </el-table-column>
        <el-table-column prop="innerIPBeginning"  label="内网起始IP" min-width="120">
        </el-table-column>
        <el-table-column prop="numOfInner"  label="内网个数" min-width="120">
        </el-table-column>
        <el-table-column prop="protocol"  label="协议" min-width="120">
        </el-table-column>
        <el-table-column label="操作" min-width="150">
          <template slot-scope="scope">
            <el-button size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!--新增界面-->
    <el-dialog title="新增" :visible.sync="natFormVisible">
      <el-form label-width="160px" ref="addForm">
        <el-form-item label="当前LAN口" prop="LAN">
          <el-input v-model="addForm.lan" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="当前WAN口" prop="WAN">
          <el-input v-model="addForm.wan" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="当前随机端口使用情况" prop="currentRandomPort">
          <el-input v-model="addForm.currentRandomPort" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="网络别名" prop="networkAlias">
          <el-input v-model="addForm.networkAlias" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addFormVisible = false">取消</el-button>
        <el-button type="primary">提交</el-button>
      </div>
    </el-dialog>

    <!--新增界面-->
    <el-dialog title="新增" :visible.sync="portFormVisible">
      <el-form label-width="80px" ref="addFort">
        <el-form-item label="外网端口" prop="outPort">
          <el-input v-model="addFormPort.outPort" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="内网端口" prop="innerPort">
          <el-input v-model="addFormPort.innerPort" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="内网起始IP" prop="innerIPBeginning">
          <el-input v-model="addFormPort.innerIPBeginning" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="内网个数" prop="NumOfInner">
          <el-input v-model="addFormPort.umOfInner" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="协议" prop="protocol">
          <el-input v-model="addFormPort.protocol" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addFormVisible = false">取消</el-button>
        <el-button type="primary">提交</el-button>
      </div>
    </el-dialog>

  </section>
</template>

<script>
  export default {
    name: "NAT",

    data(){
      return{
        natFormVisible: false,
        portFormVisible: false,
        addForm:{
          lan:'',
          wan:'',
          currentRandomPort:'',
          networkAlias:''
        },
        addFormPort:{
          outPort:'',
          innerPort:'',
          innerIPBeginning:'',
          numOfInner:'',
          protocol:''
        }
      }
    },

    methods:{
      headerStyle() {
        return this.header();
      },
      handleNatAdd() {
        this.natFormVisible = true;
      },
      handlePortAdd() {
        this.portFormVisible = true;
      },
    }
  }
</script>

<style scoped>

</style>
