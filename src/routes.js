
import Login from './views/Login.vue'
import ModeChoose from './views/ModeChoose.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
//import Main from './views/Main.vue'
/*
import Table from './views/nav1/Table.vue'
import Form from './views/nav1/Form.vue'
import user from './views/nav1/user.vue'
import Page4 from './views/nav2/Page4.vue'
import Page5 from './views/nav2/Page5.vue'
import Page6 from './views/nav3/Page6.vue'
import echarts from './views/charts/echarts.vue'
*/
/*
*status_monitor
 */
import lineMonitor from './views/statusMonitor/lineMonitor/lineMonitor.vue'
import flowMonitor from './views/statusMonitor/flowMonitor.vue'
import terminalMonitor from './views/statusMonitor/terminalMonitor.vue'
import performanceMonitor from './views/statusMonitor/performanceMonitor.vue'
/*
*networkSetting
 */
// import currentRouter from './views/networkSetting/currentRouter.vue'
import DHCP from './views/networkSetting/DHCP.vue'
import DNS from './views/networkSetting/DNS.vue'
import INEX_network from './views/networkSetting/INEX_network/index.vue'
import kidVPN from './views/networkSetting/kidVPN'
import NAT from './views/networkSetting/nat/'
import VLAN from './views/networkSetting/VLAN.vue'
import staticRouter from './views/networkSetting/staticRouter/staticRouter.vue'
/*
*systemSetting
 */
import accountSetting from './views/systemSetting/accountSetting.vue'
import basicSetting from './views/systemSetting/basicSetting.vue'
import hardwareInfo from './views/systemSetting/hardwareInfo.vue'
import restartShutdown from './views/systemSetting/restartShutdown.vue'
import update from './views/systemSetting/update.vue'
/*
*flowControl
*/
import flowControl from './views/flowControl/flowControl.vue'
/*
*behaviourManagement
 */
import BMControl from './views/behaviourManagement/BMControl.vue'
import BMDisplay from './views/behaviourManagement/BMDisplay.vue'
/*
*securitySetting
 */
import ARP from './views/securitySetting/ARP.vue'
import firewall from './views/securitySetting/firewall.vue'
import remoteManagement from './views/securitySetting/remoteManagement.vue'
/*
*systemStatus
 */
import systemStatus from './views/systemStatus/systemStatus.vue'

// import routerSetting from './views/routerSetting/routerSetting.vue'

import log from './views/log/log.vue'

let routes = [
  {
    path: '/login',
    component: Login,
    name: '',
    hidden: true
  },
  {
    path: '/modeChoose',
    component: ModeChoose,
    name: '',
    hidden: true
  },
  {
    path: '/404',
    component: NotFound,
    name: '',
    hidden: true
  },
  //{ path: '/main', component: Main },
  /*
  {
      path: '/',
      component: Home,
      name: '导航一',
      iconCls: 'el-icon-message',//图标样式class
      children: [
          { path: '/main', component: Main, name: '主页', hidden: true },
          { path: '/table', component: Table, name: 'Table' },
          { path: '/form', component: Form, name: 'Form' },
          { path: '/user', component: user, name: '列表' },
      ]
  },
  {
      path: '/',
      component: Home,
      name: '导航二',
      iconCls: 'fa fa-id-card-o',
      children: [
          { path: '/page4', component: Page4, name: '页面4' },
          { path: '/page5', component: Page5, name: '页面5' }
      ]
  },
  {
      path: '/',
      component: Home,
      name: '导航三  ',
      iconCls: 'fa fa-address-card',
      leaf: true,//只有一个节点
      children: [
          { path: '/page6', component: Page6, name: '导航三' }
      ]
  },
  {
      path: '/',
      component: Home,
      name: 'Charts',
      iconCls: 'fa fa-bar-chart',
      children: [
          { path: '/echarts', component: echarts, name: 'echarts' }
      ]
  },
  */
  {
    path: '/',
    component: Home,
    name: '状态监控',
    meta: {
      title: 'statusMonitor',
    },
    iconCls: 'fa fa-television',
    children: [
      { path: '/lineMonitor', component: lineMonitor, name: '线路监控', meta: { title: 'lineMonitor'} },
      { path: '/terminalMonitor', component: terminalMonitor, name: '终端监控', meta: { title: 'terminalMonitor'} },
      { path: '/flowMonitor', component: flowMonitor, name: '流量监控', meta: { title: 'flowMonitor'} },
      { path: '/performanceMonitor', component: performanceMonitor, name: '性能监控', meta: { title: 'performanceMonitor'} }
    ]
  },
  {
    path: '/',
    component: Home,
    name: '网络设置',
    iconCls: 'fa fa-sliders',
    meta: {
      title: 'netSetting',
    },
    children: [
      { path: '/INEX_network', component: INEX_network, name: '内外网设置', meta: { title: 'INEXNetworkSetting'} },
      { path: '/DHCP', component: DHCP, name: 'DHCP服务器设置', meta: { title: 'DHCPSetting'} },
      { path: '/DNS', component: DNS, name: 'DNS设置', meta: { title: 'DNSSetting'}},
      { path: '/staticRouter', component: staticRouter, name: '静态路由', meta: { title: 'staticRouter'} },
      //{ path: '/currentRouter', component: currentRouter, name: '当前路由表' },
      { path: '/VLAN', component: VLAN, name: 'VLAN设置', meta: { title: 'VLANSetting'}},
      { path: '/kidVPN', component: kidVPN, name: 'KidVPN设置', meta: { title: 'KidVPNSetting'}},
      { path: '/NAT', component: NAT, name: 'NAT转发与端口映射', meta: { title: 'NAT'}}
    ]
  },
  {
    path: '/',
    component: Home,
    name: '系统设置',
    iconCls: 'fa fa-cog',
    meta: {
      title: 'systemSetting',
    },
    children: [
      { path: '/basicSetting', component: basicSetting, name: '基础设置', meta: { title: 'basicSetting'} },
      { path: '/accountSetting', component: accountSetting, name: '账号设置', meta: { title: 'accountSetting'} },
      { path: '/update', component: update, name: '版本升级', meta: { title: 'versionUpdate'}},
      { path: '/hardwareInfo', component: hardwareInfo, name: '硬件信息', meta: { title: 'hardwareInfo'} },
      { path: '/restartShutdown', component: (restartShutdown), name: '重启关机', meta: { title: 'shutdownRestart'} }
    ]
  },
  {
    path: '/',
    component: Home,
    name: '流控分流按钮',
    iconCls: 'fa fa-list',
    leaf: true,//只有一个节点
    meta :{
      title: 'flowControl'
    },
    children: [
      { path: '/flowContorl', component: flowControl, name: '流控分流', meta: { title: 'flowControl'} }
    ]
  },
  {
    path: '/',
    component: Home,
    name: '行为管理',
    iconCls: 'fa fa-exchange',
    meta: {
      title: 'behaviourManagement',
    },
    children: [
      { path: '/BMControl', component: BMControl, name: '行为记录管理', meta: { title: 'recordManagement'} },
      { path: '/BMDisplay', component: BMDisplay, name: '行为记录显示', meta: { title: 'recordDisplay'} },
    ]
  },
  {
    path: '/',
    component: Home,
    name: '安全设置',
    iconCls: 'fa fa-arrows-alt',
    meta: {
      title: 'securitySetting',
    },
    children: [
      { path: '/ARP', component: ARP, name: 'ARP绑定', meta: { title: 'ARPBinding'} },
      { path: '/remoteManagement', component: remoteManagement, name: '远程登陆管理', meta: { title: 'remoteLoginManagement'}},
      { path: '/firewall', component: firewall, name: '规则防火墙', meta: { title: 'firewall'} }
    ]
  },
  {
    path:'/',
    component: Home,
    name: '系统概况简介',
    iconCls: 'fa fa-bar-chart',
    leaf: true,//只有一个节点
    meta: {
      title: 'systemSetting'
    },
    children: [
      { path: '/systemStatus', component: systemStatus, name: '系统概况', meta: { title: 'systemStatus'} },
    ]
  },
  {
    path:'/',
    component: Home,
    name: '系统日志',
    iconCls: 'fa fa-bar-chart',
    leaf: true,
    meta: {
      title: 'log',
    },
    children: [
      { path: '/log', component: log, name: '日志', meta: { title: 'log' }}
    ]
  },
  // {
  //   path:'/',
  //   component: Home,
  //   name: '动态路由配置简介',
  //   iconCls: 'fa fa-bar-chart',
  //   leaf: true,//只有一个节点
  //   meta: {
  //     title: 'dynamicRoutingConfiguration',
  //   },
  //   children: [
  //     { path: '/routerSetting', component: routerSetting, name: '动态路由配置', meta: { title: 'dynamicRoutingConfiguration'} },
  //
  //   ]
  // },
  {
    path: '*',
    hidden: true,
    redirect: { path: '/404' }
  }
]

export default routes
