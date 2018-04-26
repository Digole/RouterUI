import Mock from 'mockjs';

const ports = [];

let portsNumber = parseInt(Math.random()*3+4, 10);

for (let i = 0; i < portsNumber; i++) {
  ports.push(Mock.mock({
    id: i,
    category: Mock.Random.pick(['WAN','LAN','空闲']),
    imgUrl: 'static/port3.png',
  }));
}

const dialUp = {
  index: '',
  account: '',
  passwd:'',
  status:''
}

export { dialUp, ports };
