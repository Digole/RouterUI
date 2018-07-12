exports.install = function (Vue, options) {
  const ip = (rule, value, callback) => {
    let reg = /((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))/
    if(value === '') {
      callback(new error('IP地址不能为空'))
    } else if (reg.test(value)) {
      callback()
    } else {
      callback(new error('请输入正确IP'))
    }
  }
  const ipCanBeNull = (rule, value, callback) => {
    let reg = /((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))/
    if (reg.test(value)) {
      callback()
    } else {
      callback(new error('请输入正确IP'))
    }
  }

  const mac = (rule, value, callback) => {
    let reg = /([A-Fa-f0-9]{2}(-|:)){5}[A-Fa-f0-9]{2}/
    if(value === '') {
      callback(new error('MAC地址不能为空'))
    } else if (reg.test(value)) {
      callback()
    } else {
      callback(new error('请输入正确MAC'))
    }
  }
  const macCanBeNull = (rule, value, callback) => {
    let reg = /([A-Fa-f0-9]{2}(-|:)){5}[A-Fa-f0-9]{2}/
    if (reg.test(value)) {
      callback()
    } else {
      callback(new error('请输入正确MAC'))
    }
  }
  
  const number = (rule, value, callback) => {
    if(value === '') {
      callback(new error('输入不能为空'))
    } else if (Number.isInteger(value)) {
      callback()
    } else {
      callback(new error('请输入正确数字'))
    }
  }
  const numberCanBeNull = (rule, value, callback) => {
    if (Number.isInteger(value)) {
      callback()
    } else {
      callback(new error('请输入正确数字'))
    }
  }


  Vue.prototype.validate = function(item) {
    let rules = []
    if(item.required) {
      rules.push({ required: true, trigger: 'blur' })
    }
    if(item.maxLength) {
      rules.push({ min:1,max:item.maxLength, message: '最多输入'+item.maxLength+'个字符!', trigger: 'blur' })
    }  
    if(item.min&&item.max) {                
      rules.push({ min:item.min,max:item.max, message: '字符长度在'+item.min+'至'+item.max+'之间!', trigger: 'blur' })
    }

    if(item.type) {
      let type = item.type
      switch(type) {
      case 'ip':
        rules.push({ validator: ip, trigger: 'blur' })
        break
      case 'ipCanbeNull':
        rules.push({ validator: ipCanBeNull, trigger: 'blur' })
        break
      case 'mac':
        rules.push({ validator: mac, trigger: 'blur' })
        break
      case 'macCanbeNull':
        rules.push({ validator: macCanBeNull, trigger: 'blur' })
        break
      case 'number':
        rules.push({ validator: number, trigger: 'blur' })
        break
      case 'numberCanBeNull':
        rules.push({ validator: numberCanBeNull, trigger: 'blur' })
        break
      }
    }
    return rules
  }
}