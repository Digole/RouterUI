import axios from 'axios'

// let base = 'https://10.9.0.17:80/'
let base = ''

// export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data) }
// export const requestLogin = params => { return axios.post(`action/webLoginAction`, params).then(res => res.data); };
// 登陆
export const requestLogin = params => { return axios.post(`${base}action/loginAction`, params) }
export const logout = params => { return axios.post(base + 'action/logoutAction', params) }

export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }) }

export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, { params: params }) }

export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }) }

export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }) }

export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }) }

export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }) }

export const getSystem = params => { return axios.get(`${base}/system`, { params: params }) }

export const dialUp = params => { return axios.post('action/udialHandleAction', params) }
// export const dialUp = params => { return axios.post(`${base}/api/dialUp`, params); };
// export const dialUp = params  => {return axios.create({url:'${base}/api/dialUp', method:'post', headers:'Content-Type:text/javascript', params:params}).then(res => res.data)}

export const DHCP = params => { return axios.post('action/dhcpClientAction', params) }
export const staticIP = params => { return axios.post('action/interfaceInfoSetAction', params) }

/*******************************************************************/
// export const getPorts = data => { return axios.post(`${base}/api/ports`, { params: data }); };
export const getPorts = data => { return axios.post('action/interfaceMonitorAction', data) }

// export const getAlias = data => { return axios.post(`${base}/api/alias`, data);};
// export const editAlias = data => { return axios.post(`${base}/api/editAlias`, data);};
// export const addAlias = data => { return axios.post(`${base}/api/addAlias`, data);};
// export const delAlias = data => { return axios.post(`${base}/api/delAlias`, data);};
// export const getMapping = data => { return axios.post(`${base}/api/mapping`, data); };
// export const editMapping = data => { return axios.post(`${base}/api/editMapping`, data);};
// export const addMapping = data => { return axios.post(`${base}/api/addMapping`, data);};
// export const delMapping = data => { return axios.post(`${base}/api/delMapping`, data);};

export const getAlias = data => { return axios.post('action/natAliasGetAction', data) }
export const editAlias = data => { return axios.post('action/natAliasGetAction', data) }
export const addAlias = data => { return axios.post('action/natAliasHandleAction', data) }
export const delAlias = data => { return axios.post('action/natAliasHandleAction', data) }
export const getMapping = data => { return axios.post('action/natMapGetAction', data) }
export const editMapping = data => { return axios.post('action/natMapGetAction', data) }
export const addMapping = data => { return axios.post('action/natMapHandleAction', data) }
export const delMapping = data => { return axios.post('action/natMapHandleAction', data) }
export const sendFragment = data => { return axios.post('action/natIpFragHandleAction', data) }
export const getFragmentInfo = data => { return axios.post('action/natIpFragGetAction', data) }
export const getUsage = data => { return axios.post('action/natAssNodeUseAction', data) }
export const getDialStatus = data => { return axios.post('action/netIfInfoAction', data) }

// export const sendRestart = data => { return axios.post(`${base}/api/sendRestart`, data);};
export const sendRestart = data => { return axios.post('action/shutdownHandle', data) }

export const sendWANLAN = data => { return axios.post('action/natWanLanAction', data) }

/**********************************************************/
// export const sendSorting = data => { return axios.post(`${base}/api/intAdaHandleAction`, data);};
export const sendSorting = data => { return axios.post('action/intAdaHandleAction', data) }

/**********************************************************/
// export const sortingCancel = data => { return axios.post(`${base}/api/sortingCancel`, data);};
export const sortingCancel = data => { return axios.post('action/intAdaCancelAction', data) }

// 静态路由页面添加
export const handleRouter = data => { return axios.post('action/routeConfigAction', data) }
export const getRouterInfo = data => { return axios.post('action/routeInfoGetAction', data) }
export const addKidVpn = data => { return axios.post('action/kidvpnHandleAction', data) }

// VND页面的请求
export const addKidVPN = data => { return axios.post('action/kidvpnCreateAction', data) }
export const addVND = data => { return axios.post('action/vndHandleAction', data) }
export const generateAESKey = data => { return axios.post('action/kidvpnAesKeyGenAction', data) }
export const getAESKey = data => { return axios.post('action/kidvpnAesKeyGetAction', data) }
export const delKidVPN = data => { return axios.post('action/kidvpnDelAction', data) }
export const getKidVPNInfo = data => { return axios.post('action/kidvpnInfoGetAction', data) }
export const saveAESKey = data => { return axios.post('action/kidvpnAesKeySaveAction', data) }

// VLAN页面
export const getVLAN = data => { return axios.post('action/vlanShowAction', data) }
export const handleVLAN = data => { return axios.post('action/vlanConfigAction', data) }

// 流控页面
export const getFC = data => { return axios.post('action/flowctlShowAction', data) }
export const handleFC = data => { return axios.post('action/flowctlConfigAction', data) }

// ARP绑定
export const handleARP = data => { return axios.post('action/arpConfigAction', data) }
export const getARP = data => { return axios.post('action/arpShowAction', data) }
export const getDynamicARP = data => { return axios.post('action/arpDynamicShowAction', data) }

// 线路监控
export const getMonitorInfo = data => { return axios.post('action/monitorInfoGetAction', data) }
export const handleMonitorInfo = data => { return axios.post('action/monitorItemDisableAction', data) }

// 系统日志
export const getLog = data => { return axios.post(base + 'action/udialLogGetAction', data) }
// 操作日志
export const getOperaLog = data => { return axios.post(base + 'action/operLogGetAction', data) }

// DHCP
export const dhcpServerConfigAction = data => { return axios.post(base + 'action/dhcpServerConfigAction', data) }
export const dhcpServerShowAction = data => { return axios.post(base + 'action/dhcpServerShowAction', data) }

// 系统信息
export const setTime = data => { return axios.post(base + 'action/timeConfigAction', data) }
export const getTime = data => { return axios.post(base + 'action/timeConfigAction', data) }
export const setName = data => { return axios.post(base + 'action/devNameConfigAction', data) }
export const getName = data => { return axios.post(base + 'action/devNameGetAction', data) }
// 密码修改
export const changePasswd = data => { return axios.post(base + 'action/changepassedAction', data) }

// firewall
export const showInfo = data => { return axios.post(base + 'action/npfShowAction', data) }
export const handle = data => { return axios.post(base + 'action/npfConfigAction', data) }
export const enable = data => { return axios.post(base + 'action/npfEnableAction', data) }
export const addMac = data => { return axios.post(base + 'action/npfAddMacFilter', data) }
export const deleteMac = data => { return axios.post(base + 'action/npfDelMacFilter', data) }

// 开关机
export const powerOff = data => { return axios.post(base + 'action/powerOffAction', data) }
export const restart = data => { return axios.post(base + 'action/powerRestartAction', data) }

// ARP防御
export const setARP = data => { return axios.post(base + 'action/asdefenseEnAction', data) }
export const getARPInfo = data => { return axios.post(base + 'action/asdefenseInfoGetAction', data) }

// ping
export const ping = data => { return axios.post(base + 'action/pingTestAction', data) }

// DNS
export const getDNS = data => { return axios.post(base + 'action/dnsShowAction', data) }
export const setDNS = data => { return axios.post(base + 'action/dnsConfigAction', data) }

// web上下线
export const getWebInfo = data => { return axios.post(base + 'action/logoutRecoedQuery', data) }
