
import Login from './views/Login.vue'
import ModeChoose from './views/ModeChoose'
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
import lineMonitor from './views/statusMonitor/lineMonitor.vue'
import flowMonitor from './views/statusMonitor/flowMonitor.vue'
import terminalMonitor from './views/statusMonitor/terminalMonitor.vue'
import performanceMonitor from './views/statusMonitor/performanceMonitor.vue'
/*
*networkSetting
 */
import currentRouter from './views/networkSetting/currentRouter.vue'
import DHCP from './views/networkSetting/DHCP.vue'
import DNS from './views/networkSetting/DNS.vue'
import INEX_network from './views/networkSetting/INEX_network.vue'
import kidVPN from './views/networkSetting/kidVPN.vue'
import NAT from './views/networkSetting/NAT.vue'
import VLAN from './views/networkSetting/VLAN.vue'
import staticRouter from './views/networkSetting/staticRouter.vue'
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
        iconCls: 'fa fa-television',
        children: [
            { path: '/lineMonitor', component: lineMonitor, name: '线路监控' },
            { path: '/terminalMonitor', component: terminalMonitor, name: '终端监控' },
            { path: '/flowMonitor', component: flowMonitor, name: '流量监控' },
            { path: '/performanceMonitor', component: performanceMonitor, name: '性能监控' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '网络设置',
        iconCls: 'fa fa-sliders',
        children: [
            { path: '/INEX_network', component: INEX_network, name: '内外网设置' },
            { path: '/DHCP', component: DHCP, name: 'DHCP服务器设置' },
            { path: '/DNS', component: DNS, name: 'DNS设置'},
            { path: '/staticRouter', component: staticRouter, name: '静态路由' },
            //{ path: '/currentRouter', component: currentRouter, name: '当前路由表' },
            { path: '/VLAN', component: VLAN, name: 'VLAN设置'},
            { path: '/kidVPN', component: kidVPN, name: 'KidVPN设置'},
            { path: '/NAT', component: NAT, name: 'NAT转发与端口映射'}
        ]
    },
    {
        path: '/',
        component: Home,
        name: '系统设置',
        iconCls: 'fa fa-cog',
        children: [
            { path: '/basicSetting', component: basicSetting, name: '基础设置' },
            { path: '/accountSetting', component: accountSetting, name: '账号设置' },
            { path: '/update', component: update, name: '版本升级'},
            { path: '/hardwareInfo', component: hardwareInfo, name: '硬件信息' },
            { path: '/restartShutdown', component: restartShutdown, name: '重启关机' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '流控分流按钮',
        iconCls: 'fa fa-list',
        leaf: true,//只有一个节点
        children: [
            { path: '/flowContorl', component: flowControl, name: '流控分流' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '行为管理',
        iconCls: 'fa fa-exchange',
        children: [
            { path: '/BMControl', component: BMControl, name: '行为记录管理' },
            { path: '/BMDisplay', component: BMDisplay, name: '行为记录显示' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '安全设置',
        iconCls: 'fa fa-arrows-alt',
        children: [
            { path: '/ARP', component: ARP, name: 'ARP绑定' },
            { path: '/remoteManagement', component: remoteManagement, name: '远程登陆管理' },
            { path: '/firewall', component: firewall, name: '规则防火墙' }
        ]
    },
    {
        path:'/',
        component: Home,
        name: '系统概况按钮',
        iconCls: 'fa fa-bar-chart',
        leaf: true,//只有一个节点
        children: [
            { path: '/systemStatus', component: systemStatus, name: '系统概况' },

        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;
