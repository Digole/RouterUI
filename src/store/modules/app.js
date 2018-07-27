import Cookies from 'js-cookie'

const app = {
  state: {
    sidebar: {
      opened: !+Cookies.get('sideabrStatus'),
      withoutAnimation: false
    },
    device: 'desktop',
    language: Cookies.get('language') || 'zh',
    systemData: {
      up: '',
      down: '',
      cpu: '',
      memory: '',
      userNum: ''
    }
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
      state.sidebar.opened = !state.sidebar.opened
      state.sidebar.withoutAnimation = false
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
      Cookies.set('sidebarStatus', 1)
      state.sidebar.opened = false
      state.sidebar.withoutAnimation = withoutAnimation
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device
    },
    SET_LANGUAGE: (state, language) => {
      state.language = language
      Cookies.set('language', language)
    },
    SET_SYSDATA: (state, systemData) => {
      state.systemData.up = systemData.up
      state.systemData.down = systemData.down
      state.systemData.cpu = systemData.cpu
      state.systemData.memory = systemData.memory
      state.systemData.userNum = systemData.userNum
      console.log(state.systemData)
    }
  },
  actions: {
    setLanguage({ commit }, language) {
      commit('SET_LANGUAGE', language)
    },
    pushSystemData({ commit }, systemData) {
      commit('SET_SYSDATA', systemData)
    }
  }
}

export default app
