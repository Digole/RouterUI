export default {
  route: {
    statusMonitor: 'StatusMonitor',
    lineMonitor: 'Line',
    terminalMonitor: 'Terminal',
    flowMonitor: 'Data',
    performanceMonitor: 'Performance',
    netSetting: 'NetSetting',
    INEXNetworkSetting: 'Intranet&Extranet',
    DHCPSetting: 'DHCP',
    DNSSetting: 'DNS',
    staticRouter: 'StaticRouter',
    VLANSetting: 'VLAN',
    KidVPNSetting: 'KidVPN',
    NAT: 'NAT&PortMapping',
    systemSetting: 'SystemSetting',
    basicSetting: 'Basic',
    accountSetting: 'Account',
    versionUpdate: 'Update',
    hardwareInfo: 'HardwareInfo',
    shutdownRestart: 'Shutdown&Restart',
    flowControl: 'FlowControl',
    behaviourManagement: 'BehaviourManage',
    recordManagement: 'RecordManagement',
    recordDisplay: 'RecordDisplay',
    securitySetting: 'SecuritySetting',
    ARPBinding: 'ARPBinding',
    remoteLoginManagement: 'RemoteLogin',
    firewall: 'Firewall',
    systemStatus: 'SystemStatus',
    dynamicRoutingConfiguration: 'DynamicRouteConfig',
    log: 'Log'
  },

  operation: {
    operation: 'Operation',
    unbind: 'Unbind',
    submit: 'Submit',
    cancel: 'Cancel',
    next: 'Next',
    previous: 'Return',
    complete: 'Complete',
    add: 'Add',
    delete: 'Delete',
    batchdelete: 'Batch Delete',
    connect: 'Connect',
    disconnect: 'Disconnect',
    edit: 'Edit',
    setting: 'Setting',
    determine: 'Apply'
  },

  home: {
    ram: 'RAM',
    up: 'Uplink Rate',
    down: 'Downlink Rate',
    logout: 'Log Out'
  },

  lineMonitor: {
    portName: 'Port Name',
  },

  NAT: {
    dividingLine:{
      title1: 'WAN&LAN Setting',
      title2: 'Random port status',
      title3: 'Alias',
      title4: 'Mapping'
    },
    router: {
      linkStatus: 'Link Status',
      IP: 'LAN IP',
    },
    mapping: {
      assPort: 'Extranet port',
      localPort: 'Intranet port',
      IP: 'Intranet starting IP',
      IPCnt: 'Intranet Count',
      proto: 'Protocol',
      placeholder: 'Please choose function',
    },
    alias: {
      aliasAddress: 'Alias Address',
      initialAddress: 'Local Address',
      endAddress: 'End Address'
    },
    WANLANSetting: {
      title: 'LAN&WAN Setting',
      chooseFunc: 'Choose function',
      placeholder: 'Please choose function',
      LAN: 'LAN(Intranet)',
      WAN: 'WAN(Extranet)',
    },
    adaptive: {
      title: 'Adapt port',
      text: 'debugging',
      portsNameTip: 'Enter name',
      tipText: '(example: eth0)',
      maskTip: 'Please sort the ports',
    },
    selectFunction: {
      TCP: 'TCP fragment packet reception enable',
      UDP: 'UDP fragment packet reception enable',
      ICMP: 'ICMP fragment packet reception enable'
    },
  },
  INEXNetwork: {
    dividingLine: {
      title1: 'Terminal Monitor',
      title2: 'Status Interface'
    },
    terminal: {
      WANLinked: 'WAN Connected',
      bandWidth: 'Total BandWidth',
      LANLinked: 'LAN Connected',
      terminalLinked: 'Terminal Connected',
      DHCP: 'DHCP is enabled'
    },
    tooltip: {
      linkStatus: 'Connection Status',
      LNAIP: 'LAN IP',
      mask: 'Subnet Mask',
      binding: 'Device Binding',
      MAC: 'MAC Address',
      rate: 'Network Card Rate'
    },
    cardConfig: {
      innerLANTitle: 'LAN Setting',
      innerWANTitle: 'WAN Setting',
      IPAddress: 'IP',
      mask: 'Subnet Mask',
      gateway: 'Gateway',
      collapseTitle: 'Advanced Setting',
      workingMode: 'Working Mode',
      rate: 'Rate',
      LANControl: 'LAN exchange control',
      LANOptions: 'Allow other LANs to access this LAN',
      linkType: 'Access',
      account: 'Account',
      passwd: 'Password',
      status: 'Status',
      primaryDNS: 'Primary DNS',
      optionalDNS: 'Optional DNS',
      placeholder: 'Please choose',
      chooseFunc: 'Choose function',
      placeholder2: 'Please select the network',
      LAN: 'LAN（Intranet）',
      WAN: 'WAN（Extranet）',
    },
    dialUpStatus: {
      success: 'success',
      init: 'Dial initialization',
      auth: 'User Authentication',
      disconnect: 'Disconnected',
      connectFail: 'Connection failed',
      dialFail: 'Dial failed'
    }
  },
  kidVPN: {
    index: {
      title: 'KidVPN Server',
    },
    client: {
      title: 'KidVPN Clinet',
      button1: 'Connect VPN Server',
      button2: 'Batch Deletion',
      serip: 'Server IP',
      locip: 'Local IP',
      netmask: 'Netmask',
      gateway: 'Gateway',
      mtu: 'MTU',
      vndid: 'Virtual Network Card ID',
      status: 'Status',
      title1: 'Create KidVPN Client Network',
      ipaddr: 'Local IP',
      mac: 'mac',
      button3: 'Create Virtual Network',
      title2: 'Connect KidVPN Server',
      ipaddr1: 'Server IP',
      aeskey: 'AES Key',
    },
    server: {
      title: 'VPN Server Information',
      button1: 'Delete VPN Server',
      serip: 'Server IP',
      locip: 'Local IP',
      netmask: 'Netmask',
      gateway: 'Gateway',
      mac: 'MAC',
      mtu: 'MTU',
      aeskey: 'AES Key',
      vndid: 'Card ID',
      ipaddr: 'Local IP',
      button3: 'Create Virtual Network',
      title2: 'Create KidVPN Server Network',
      ipaddr1: 'Server IP',
      bit: 'AES Key Width',
      button4: 'Init AESKey',
      button5: 'Create Server',
      title3: 'KidVPN Server Information',
      button6: 'close'
    },
    status: {
      title: 'VPN status',
      ip: 'Client IP',
      mac: 'Client MAC'
    }
  },
  staticRouter: {
    title: 'Static Route',
    button: 'Add',
    destination: 'Destination',
    genmask: 'Subnet Mask',
    gateway: 'Gateway',
    flags: 'Type',
    metric: 'metric',
    iface: 'Interface',
    button3: 'Edit',
    title2: 'Add Static Route',
    subtitle: 'Type of Route',
    title3: 'Add Hosting Route',
    title4: 'System Routing Table',
    subtitle4: 'System Routing Table(IPV4)',
    subtitle5: 'System Routing Table(IPV6)',
    prefix: 'Prefix'
  },
  systemStatus: {
    top: {
      title1: 'Not Configured',
      title2: 'Configured',
      subtitle: 'Extranet',
      subtitle1: 'Intranet',
      subtitle2: 'In running',
      rate: 'Rate',
      upstream: 'Upstream',
      downstream: 'Downstream',
      status: 'Link status',
      terminal: 'Terminal online',
    },
    middle: {
      status: 'Interface State',
      bandWidth: 'Bandwidth',
      WAN: 'WAN enable',
      LAN: 'LAN enable',
      DHCP: 'The DHCP pool',
      average: 'Bandwidth average usage',
    },
    bottom: {
      chartsTitle: 'Flow distribution',
      placeholder: 'Please select',
      title: 'Rate',
      subtitle: 'Upstream rate',
      subtitle1: 'Downstream rate',
    }
  },
  ARP: {
    IP: 'IP',
    MAC: 'MAC',
    status: 'status',
    title: 'ARP Binding',
    title2: 'Add ARP Binding',
    title3: 'Edit ARP Binding',
    dynamicARP: 'Dynamic ARP'
  },
  log: {
    index: 'Index',
    time: 'Time',
    line: 'Line',
    detail: 'Log Details'
  }
}
