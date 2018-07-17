export default {
  route: {
    statusMonitor: '状态监控',
    lineMonitor: '线路监控',
    terminalMonitor: '终端监控',
    flowMonitor: '流量监控',
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
    systemStatus: '系统概况',
    dynamicRoutingConfiguration: '动态路由配置',
    log: '系统日志'
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
    determine: '确定'
  },

  home: {
    ram: '内存',
    up: '上行速率',
    down: '下行速率',
    logout: '退出登录'
  },

  lineMonitor: {
    portName: '网口名',
  },

  NAT: {
    dividingLine:{
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
      assPort: '外网端口',
      localPort: '内网端口',
      IP: '内网起始IP',
      IPCnt: '内网个数',
      proto: '协议',
      placeholder: '请选择功能',
    },
    alias: {
      aliasAddress: '别名地址',
      initialAddress: 'LAN起始地址',
      endAddress: 'LAN结束地址'
    },
    WANLANSetting: {
      title: 'LAN,WAN口设置',
      chooseFunc: '选择功能',
      placeholder: '请选择内外网',
      LAN: 'LAN（内网）',
      WAN: 'WAN（外网）',
    },
    adaptive: {
      title: '端口自适应',
      text: '调试',
      portsNameTip: '请输入名称',
      tipText: '(名称示例: eth0)',
      maskTip: '请先进行网口定位操作',
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
      WAN: 'WAN（外网）',
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
  kidVPN: {
    index: {
      title: 'KidVPN服务器',
    },
    client: {
      title: 'KidVPN客户端',
      button1: '连接VPN服务器(创建客户端网络)',
      button2: '批量删除',
      serip: '服务器地址',
      locip: '本地地址',
      netmask: '子网掩码',
      gateway: '网关地址',
      mtu: 'MTU',
      vndid: '虚拟网卡ID',
      status: '连接状态',
      title1: '创建KidVPN客户端网络',
      ipaddr: '本地IP地址',
      mac: 'mac',
      button3: '创建虚拟网络',
      title2: '连接KidVPN服务器',
      ipaddr1: '服务器地址',
      aeskey: 'AES Key',
    },
    server: {
      title: 'VPN服务器信息',
      button1: '删除VPN服务器',
      serip: '服务器网络地址',
      locip: '本地地址',
      netmask: '子网掩码',
      gateway: '网关地址',
      mac: 'MAC',
      mtu: 'MTU',
      vndid: '虚拟网卡ID',
      aeskey: 'AES Key',
      ipaddr: '本地IP地址',
      button3: '创建虚拟网络',
      title2: '创建KidVPN服务器网络',
      ipaddr1: '服务器地址',
      bit: 'AES Key bit位数',
      button4: '生成AESKey',
      button5: '创建服务器',
      title3: 'KidVPN服务器信息',      
      button6: '关闭'
    },
    status: {
      title: 'VPN连接状态',
      ip: '客户端IP地址',
      mac: '客户端MAC地址'
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
    subtitle5: '系统路由表显示(IPV6)',
  },
  systemStatus: {
    top: {
      title1: '未配置',
      title2: '已配置',
      subtitle: '外网',
      subtitle1: '内网',
      subtitle2: '已运行',
      rate: '速率状态',
      upstream: '上行',
      downstream: '下行',
      status: '连接状态',
      terminal: '终端在线',
    },
    middle: {
      status: '接口状态',
      bandWidth: '接入带宽',
      WAN: 'WAN已启用',
      LAN: 'LAN已启用',
      DHCP: 'DHCP池剩余',
      average: '带宽平均使用率',
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
    dynamicARP: '动态ARP'
  },
  log: {
    index: '编号',
    time: '时间',
    line: '线路',
    detail: '日志详情'
  }
}
