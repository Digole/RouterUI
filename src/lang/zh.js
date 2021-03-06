
export default {
  route: {
    statusMonitor: '状态监控',
    lineMonitor: '线路监控',
    terminalMonitor: '终端监控',
    flowMonitor: '流量监控',
    rateMonitor: '速率监控',
    performanceMonitor: '性能监控',
    netSetting: '网络设置',
    INEXNetworkSetting: '内外网设置',
    DHCPSetting: 'DHCP服务器设置',
    DNSSetting: 'DNS设置',
    staticRouter: '静态路由',
    VLANSetting: 'VLAN设置',
    KidVPNSetting: 'KidVPN设置',
    NAT: 'NAT转发和端口映射',
    systemSetting: '系统设置',
    basicSetting: '基础设置',
    accountSetting: '账号设置',
    powerSetting: '权限管理',
    versionUpdate: '版本升级',
    hardwareInfo: '硬件信息',
    shutdownRestart: '重启关机',
    flowControl: '流控分流',
    behaviourManagement: '行为管理',
    recordManagement: '行为记录管理',
    recordDisplay: '行为记录显示',
    securitySetting: '安全设置',
    ARPBinding: 'ARP绑定',
    remoteLoginManagement: '远程登陆管理',
    firewall: '规则防火墙',
    ARPDefence: 'ARP防御',
    systemStatus: '系统概况',
    dynamicRoutingConfiguration: '动态路由配置',
    log: '日志系统',
    dialLog: '拨号日志',
    tools: '系统工具',
    ping: 'Ping测试',
    speed: '网速测试',
    operaLog: '操作日志',
    VPNLog: 'VPN日志',
    Qos: 'QoS',
    ports: '网口定位',
    shell: '动态路由',
    ARPLog: 'ARP日志',
    DHCPLog: 'DHCP日志'
  },

  operation: {
    operation: '操作',
    unbind: '解绑',
    submit: '提交',
    cancel: '取消',
    next: '下一步',
    previous: '上一步',
    complete: '完成',
    add: '添加',
    delete: '删除',
    batchdelete: '批量删除',
    connect: '连接',
    disconnect: '断开',
    edit: '修改',
    setting: '设置',
    determine: '确定',
    search: '搜索'
  },
  situationMode: {
    situation: '情景模式',
    change: '切换模式'
  },
  home: {
    professional: '专家模式',
    change: '切换模式',
    ram: '内存',
    up: '上行速率',
    down: '下行速率',
    logout: '退出登录'
  },

  lineMonitor: {
    portName: '网口名'
  },

  NAT: {
    dividingLine: {
      title1: 'WAN,LAN口设置',
      title2: '随机端口使用',
      title3: '网络别名',
      title4: '端口映射'
    },
    router: {
      linkStatus: '连接状态',
      IP: 'LAN IP'
    },
    mapping: {
      add: '新增端口映射',
      assPort: '外网端口',
      localPort: '内网端口',
      IP: '内网起始IP',
      IPCnt: '内网个数',
      proto: '协议',
      placeholder: '请选择功能'
    },
    alias: {
      add: '新增网络别名',
      aliasAddress: '别名地址',
      initialAddress: 'LAN起始地址',
      endAddress: 'LAN结束地址'
    },
    WANLANSetting: {
      title: 'LAN,WAN口设置',
      chooseFunc: '选择功能',
      placeholder: '请选择内外网',
      LAN: 'LAN（内网）',
      WAN: 'WAN（外网）'
    },
    adaptive: {
      title: '端口自适应',
      text: '调试',
      portsNameTip: '请输入名称',
      tipText: '(名称示例: eth0)',
      maskTip: '请先进行网口定位操作'
    },
    selectFunction: {
      TCP: 'TCP分片包接收使能',
      UDP: 'UDP分片包接收使能',
      ICMP: 'ICMP分片包接收使能'
    }
  },

  INEXNetwork: {
    dividingLine: {
      title1: '终端监控',
      title2: '状态接口'
    },
    terminal: {
      WANLinked: 'WAN已连接',
      bandWidth: '总带宽',
      LANLinked: 'LAN已连接',
      terminalLinked: '终端连接',
      DHCP: 'DHCP服务已启用'
    },
    tooltip: {
      linkStatus: '连接状态',
      LNAIP: 'LAN IP',
      mask: '子网掩码',
      binding: '绑定设备',
      MAC: 'MAC地址',
      rate: '网卡速率'
    },
    cardConfig: {
      innerLANTitle: 'LAN配置',
      innerWANTitle: 'WAN配置',
      IPAddress: 'IP地址',
      mask: '子网掩码',
      gateway: '网关',
      collapseTitle: '高级设置',
      workingMode: '工作模式',
      rate: '网卡速率',
      LANControl: 'LAN互访控制',
      LANOptions: '允许其他LAN访问此LAN',
      linkType: '接入方式',
      account: '账号',
      passwd: '密码',
      status: '状态',
      primaryDNS: '首选DNS',
      optionalDNS: '备选DNS',
      placeholder: '请选择',
      chooseFunc: '选择功能',
      placeholder2: '请选择内外网',
      LAN: 'LAN（内网）',
      WAN: 'WAN（外网）'
    },
    dialUpStatus: {
      success: '拨号成功',
      init: '拨号初始化',
      auth: '用户验证',
      disconnect: '断开连接',
      connectFail: '连接失败',
      dialFail: '拨号失败'
    }
  },
  DHCP: {
    addNew: '新增',
    add: '添加',
    interface: '网卡接口',
    start: '起始地址',
    end: '结束地址',
    mask: '子关掩码',
    gateway: '网关',
    dns1: '首选DNS',
    dns2: '备选DNS',
    lease: '租期',
    status: '状态',
    behaviour: '操作',
    deleteDHCP: '删除',
    editDHCP: '修改',
    edit: '修改',
    ifDelete: '是否要删除该接口'

  },
  kidVPN: {
    index: {
      title: 'KidVPN服务器'
    },
    client: {
      title: 'KidVPN客户端',
      button1: '连接VPN服务器',
      button2: '批量删除',
      serip: '服务器地址',
      locip: '本地地址',
      netmask: '子网掩码',
      gateway: '网关地址',
      mtu: 'MTU',
      vndid: 'VPN编号',
      serverLoc: '客户端地理位置',
      status: '连接状态',
      title1: '创建KidVPN客户端网络',
      ipaddr: 'KidVPN IP 地址',
      mac: 'mac',
      button3: '创建虚拟网络',
      title2: '连接KidVPN服务器',
      ipaddr1: '服务器地址',
      aeskey: 'AES Key'
    },
    server: {
      title: 'VPN服务器信息',
      title1: 'KidVPN服务器',
      button1: '删除VPN服务器',
      serip: '服务器网络地址',
      locip: '本地地址',
      netmask: '子网掩码',
      gateway: '网关地址',
      mac: 'MAC',
      mtu: 'MTU',
      vndid: 'VPN编号',
      aeskey: 'AES Key',
      ipaddr: 'KidVPN IP 地址',
      button3: '创建虚拟网络',
      title2: '创建KidVPN服务器网络',
      ipaddr1: '服务器地址',
      bit: 'AES Key bit位数',
      button4: '生成AESKey',
      button5: '创建VPN服务器',
      title3: 'KidVPN服务器信息',
      button6: '关闭'
    },
    status: {
      title: 'VPN连接状态',
      ip: '客户端IP地址',
      mac: '客户端MAC地址',
      clientLoc: '服务端地理位置',
      vndid: '虚拟网卡ID'
    }
  },
  staticRouter: {
    title: '静态路由',
    button: '添加',
    destination: '目的地址',
    genmask: '子网掩码',
    gateway: '网关地址',
    flags: '类型',
    metric: 'metric',
    iface: '网卡出口',
    button3: '修改',
    title2: '添加静态路由',
    subtitle: '路由类型',
    title3: '添加主机路由',
    title4: '系统路由表',
    subtitle4: '系统路由表显示(IPV4)',
    prefix: 'Prefix',
    subtitle5: '系统路由表显示(IPV6)'
  },
  systemStatus: {
    top: {
      title1: '未连接',
      title2: '已连接',
      subtitle: '外网',
      subtitle1: '内网',
      subtitle2: '已运行',
      rate: '速率状态',
      upstream: '上行',
      downstream: '下行',
      status: '连接状态',
      terminal: '终端在线',
      day: '天',
      hour: '小时',
      min: '分钟',
      sec: '秒'
    },
    middle: {
      status: '接口状态',
      bandWidth: '接入带宽',
      WAN: 'WAN已启用',
      LAN: 'LAN已启用',
      DHCP: 'DHCP池剩余',
      average: '带宽'
    },
    bottom: {
      chartsTitle: '协议分布流量',
      placeholder: '请选择',
      title: '上下行速率',
      subtitle: '上行速率',
      subtitle1: '下行速率',
      http: 'HTTP协议',
      vedio: '网络视频',
      game: '网络游戏',
      download: '网络下载',
      transmission: '网络传输'
    }
  },
  ARP: {
    IP: 'IP',
    MAC: 'MAC',
    status: '状态',
    title: 'ARP绑定',
    title2: '新增ARP绑定',
    title3: '编辑ARP绑定',
    dynamicARP: 'ARP表'
  },
  log: {
    note: '默认提供最近24小时数据',
    log: '日志中心',
    clear: '全部清空',
    index: '编号',
    time: '时间',
    line: '线路',
    detail: '日志详情'

  },
  operaLog: {
    log: '操作日志',
    search: '搜索',
    clear: '全部清空',
    time: '操作时间',
    ip: '客户端IP',
    operator: '操作者',
    module: '模块名',
    result: '操作结果',
    content: '操作日志内容'
  },
  Qos: {
    QosSetting: 'QoS配置',
    netif: '网卡接口',
    rule: '规则',
    ipStart: 'ip起始',
    ipEnd: 'ip结束',
    cmpMethod: '比较方法',
    priority: '优先级',
    dontDrop: '丢包选项',
    addNewQos: '添加新QoS',
    portStart: '开始端口',
    portEnd: '结束端口'
  },
  systemSetting: {
    ifDelete: '是否要删除该账户',
    On: '启用',
    Off: '禁用',
    selectStatus: '选择状态',
    changeStatus: '修改状态',
    deleteUser: '删除',
    role: '角色',
    selectPower: '权限',
    admin: '主管',
    operator: '管理员',
    visitor: '游客',
    addAccount: '添加用户（暂未支持）',
    AccountSetting: '用户管理',
    username: '用户名',
    passwd: '密码',
    passwd1: '请输入密码',
    passwd2: '请再次输入密码',
    status: '状态',
    behaviour: '操作',
    changePasswd: '修改密码',
    old: '请输入原密码',
    one: '请输入新密码',
    two: '请再次输入新密码',
    hardwareInfo: '硬件信息',
    restartShutdown: '重启关机',
    restartNow: '立即重启',
    powerOffNow: '立即关机',
    addTrigger: '添加事件',
    event: '事件',
    shutdown: '关机',
    restart: '重启',
    date: '预设日期',
    time: '预设时间',
    oper_type: '操作',
    handleStart: '停用',
    handleStop: '启用',
    handleDel: '删除',
    update: '版本升级',
    VersionDetection: '版本检测：',
    DetectNewVersion: '检测新版本',
    RoutingSystemVersion: '路由系统版本：',
    versionStatus: '版本状态',
    localUpdate: '本地升级：',
    fileSelection: '选取文件',
    submitUpload: '上传到服务器',
    check: '检测',
    latestVersion: '最新版本为:',
    updateNow: '立即升级',
    updateFinished: '上传完成',
    refreshAfter: '预计',
    sDoNotTurnOff: '秒后刷新页面，请勿关闭电源'
  },
  securitySetting: {
    ARPDefence: 'ARP防御',
    status: '状态',
    inUse: '使用中',
    stopped: '已停用',
    stop: '停用',
    start: '启用',
    showInfo: '显示全部信息',
    showConflict: '显示冲突信息',
    IP: 'IP地址',
    MACInfo: 'MAC信息',
    conflictMACAddr: '攻击MAC',
    firewall: '规则防火墙',
    add: '添加',
    port: '网口',
    type: '策略类型',
    ipSE: 'IP开始地址-结束地址',
    mac: 'MAC地址',
    portSE: '端口开始地址-结束地址',
    enable: '操作',
    disablePort: '禁用网卡',
    disableSubmit: '禁用',
    Cancle: '取消',
    isInEnabling: '启用网卡',
    enableSubmit: '启用',
    selectStrategy: '请选择策略',
    isTcpRule: '添加TCP策略',
    ips: 'IP开始地址',
    ipe: 'IP结束地址',
    tcps: 'TCP开始端口',
    tcpe: 'TCP结束端口',
    isUdpRule: '添加UDP策略',
    udps: 'UDP开始端口',
    udpe: 'UDP结束端口',
    isIpRule: '添加IP策略',
    isMacRule: '添加MAC策略',
    whitelist: '白名单',
    delete: '删除',
    edit: '编辑',
    blacklist: '黑名单',
    time: '时间',
    role: '权限',
    direct: '报文方向',
    mangle: '策略类型'
  },
  powerSetting: {
    submitChange: '提交更改',
    ifsubmit: '是否提交更改？',
    powerSetting: '权限管理',
    addChange: '提交更改',
    all: '总类',
    detail: '具体权限',
    operator: '操作员权限',
    visitor: '观察者权限'
  },
  ARPLog: {
    ARPLog: 'ARP防御日志'
  },
  DHCPLog: {
    DHCPLog: 'DHCP日志'
  },
  vpnLog: {
    log: 'VPN日志',
    confirm: '确认',
    clear: '全部清空',
    provide: '默认提供最近24小时数据'
  },
  BMDisplay: {
    web: 'WEB上下线',
    search: '搜索',
    clear: '全部清空',
    provide: '默认提供最近24小时数据',
    time: '时间',
    name: '名称',
    ip: '客户端IP',
    result: '操作结果',
    type: '操作类型'
  },
  BMControl: {
    record: '行为记录管理',
    DeviceRecord: '终端上下线记录：',
    WebRecord: 'WEB上下线记录：',
    on: '开启'
  },
  basicSetting: {
    basicSetting: '基础设置',
    device: '设备名称：',
    SetName: '修改设备名称',
    SetTime: '修改设备时间',
    time: '设备时间：',
    cancel: '取消',
    submit: '确认',
    timeSetting: '时间设置'
  },
  flowControl: {
    flowControl: '流控策略管理',
    addStrategy: '添加策略',
    delete: '批量删除',
    start: '起始IP地址',
    end: '结束IP地址',
    protocol: '协议',
    interface: '网口',
    upRate: '上行网速',
    downRate: '下行网速',
    bufferSize: '缓冲区大小'
  },
  ping: {
    ping: 'IP地址或域名',
    addr: '目的地址',
    result: '检测结果',
    start: '开始测试',
    stop: '停止测试'
  },
  DNS: {
    dns1: '首选DNS',
    dns2: '备选DNS'
  },
  VLAN: {
    add: '添加VLAN',
    delete: '批量删除',
    interface: '网口',
    id: 'VLAN标识',
    tag: 'TAG',
    priority: '优先级',
    cancel: '取消',
    submit: '确认'
  },
  newshell: {
    connect: '启用协议',
    disconnect: '停用协议'
  }
}
