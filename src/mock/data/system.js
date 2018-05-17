import Mock from 'mockjs';

const system = [
  Mock.mock(
    {
      'CPURate|20-80.1':1,
      'RAMRate|20-80.1':1,
    }
  )
]
const alias = [];

for (let i = 0; i < 8; i++) {
  alias.push(Mock.mock({
    id: Mock.Random.guid(),
    aliasAddress: Mock.Random.ip(),
    initialAddress: Mock.Random.ip(),
    endAddress: Mock.Random.ip()
  }));
}

const mapping = [];

for (let i = 0; i < 12; i++) {
  mapping.push(Mock.mock({
    id: Mock.Random.guid(),
    'outerPort|0-25556':100,
    'innerPort|0-25556':100,
    innerInitialIP: Mock.Random.ip(),
    'numOfInner|5-30':100,
    protocol: Mock.Random.protocol(),
  }));
}

export { system, alias, mapping };

