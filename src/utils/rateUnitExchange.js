const rate = 1024
const limit = 1000
const conversion = (val) => {
  let unit = ''
  if(val > (rate*limit)) {
    unit = 'GB/s'
    val = val/(rate*rate)
    val = val.toFixed(2)
  } else if (val > limit) {
    unit = 'MB/s'
    val = val/rate
    val = val.toFixed(2)
  } else if (val <= rate) {
    unit = 'KB/s'
  }
  return val + unit
}

export { conversion }

const conversionUnit = (val) => {
  let unit = ''
  if(val > (rate*limit)) {
    unit = 'GB/s'
    val = val/(rate*rate)
    val = val.toFixed(2)
  } else if (val > rate) {
    unit = 'MB/s'
    val = val/rate
    val = val.toFixed(2)
  } else if (val <= rate) {
    unit = 'KB/s'
  }
  return val + unit
}

export { conversionUnit }