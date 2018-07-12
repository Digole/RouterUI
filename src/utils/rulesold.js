let ip = (rule, value, callback) => {
  let reg = /((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))/
  if(value === '') {
    callback(new error('IP地址不能为空'))
  } else if (reg.test(value)) {
    callback()
  } else {
    callback(new error('请输入正确IP'))
  }
}
let ipCanBeNull = (rule, value, callback) => {
  return
  let reg = /((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))/
  if (reg.test(value)) {
    callback()
  } else {
    callback(new error('请输入正确IP'))
  }
}

let mac = (rule, value, callback) => {
  let reg = /([A-Fa-f0-9]{2}(-|:)){5}[A-Fa-f0-9]{2}/
  if(value === '') {
    callback(new error('MAC地址不能为空'))
  } else if (reg.test(value)) {
    callback()
  } else {
    callback(new error('请输入正确MAC'))
  }
}
let macCanBeNull = (rule, value, callback) => {
  let reg = /([A-Fa-f0-9]{2}(-|:)){5}[A-Fa-f0-9]{2}/
  if (reg.test(value)) {
    callback()
  } else {
    callback(new error('请输入正确MAC'))
  }
}

let number = (rule, value, callback) => {
  if(value === '') {
    callback(new error('输入不能为空'))
  } else if (Number.isInteger(value)) {
    callback()
  } else {
    callback(new error('请输入正确数字'))
  }
}
let numberCanBeNull = (rule, value, callback) => {
  if (Number.isInteger(value)) {
    callback()
  } else {
    callback(new error('请输入正确数字'))
  }
}

export default {
  ip: [{ required: true, validator: ip, trigger: 'blur' }],
  ipCanBeNull: [{ required: false, validator: ipCanBeNull, trigger: 'blur' }],
  mac: [{ required: true, validator: mac, trigger: 'blur' }],
  macCanBeNull: [{ required: false, validator: macCanBeNull, trigger: 'blur' }],
  number: [{ required: true, validator: number, trigger: 'blur' }],
  numberCanBeNull: [{ required: false, validator: numberCanBeNull, trigger: 'blur' }],
}