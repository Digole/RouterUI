<template>
  <section>
    <el-row :gutter="0" class="setting">

      <el-col :md="9" :lg="9" :xl="9">
        <div class="container">
          <div class="icon-div">
            <svg class="icon-big"><use xlink:href="#icon-wan"></use></svg>
          </div>
          <div class="tip1">
            <h2>{{wanNumber}}</h2>
            <p class="bottomLine">{{$t('INEXNetwork.terminal.WANLinked')}}</p>
          </div>
          <div class="tip1">
            <h2>0</h2>
            <p class="bottomLine">{{$t('INEXNetwork.terminal.bandWidth')}}</p>
          </div>
        </div>
      </el-col>

      <el-col :md="15" :lg="15" :xl="15">
        <div class="container">
          <div class="icon-div">
            <svg class="icon-big"><use xlink:href="#icon-pc"></use></svg>
          </div>
          <div class="tip">
            <h2>1</h2>
            <p class="bottomLine">{{$t('INEXNetwork.terminal.LANLinked')}}</p>
          </div>
          <div class="tip">
            <h2>1</h2>
            <p class="bottomLine">{{$t('INEXNetwork.terminal.terminalLinked')}}</p>
          </div>
          <div class="tip">
            <h2>0</h2>
            <p class="bottomLine">{{$t('INEXNetwork.terminal. DHCP')}}</p>
          </div>
        </div>
      </el-col>

    </el-row>
  </section>
</template>

<script>
  export default {
    name: 'dataDisplayer',
    data () {
      return {}
    }
  }
</script>

<style scoped>
  .container {
    display: flex; 
    margin: 10px;
    height: 100px;
    padding: 0 20px;
    border: 1px solid lightgrey;
    align-items: center;

  }
  .icon-div {
      height: 20px;
      width: 20px;
      margin-right: 5px;
    }
  .icon-big {
        height: 100%;
        width: 100%;
      }
.tip1 {
      display: flex;
      width: 45%;
    }
.bottomLine {
        line-height: 50px;
      }
.tip {
      display: flex;
      width: 30%; 
    }
      .bottomLine {
        line-height: 50px;
      }
</style>