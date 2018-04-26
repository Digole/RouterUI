import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'

Vue.use(Vuex)

// 应用初始状态
const state = {
  count: 10,
  systemInfo:[{"CPURate":"", "RAMRate":""}]
}

// 定义所需的 mutations
const mutations = {
  INCREMENT(state) {
    state.count++
  },
  DECREMENT(state) {
    state.count--
  },
  newCPURate(state, msg){
    state.systemInfo[0].CPURate = msg;
  },
  newRAMRate(state, msg){
    state.systemInfo[0].RAMRate = msg;
  },
  getCPURate(state, msg){
    msg = state.systemInfo[0].CPURate;
  }
}

// 创建 store 实例
export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations
})
