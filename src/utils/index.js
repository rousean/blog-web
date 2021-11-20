/**
 * Util工具函数
 */
/**节流函数 */
export function throttle(fn, delay) {
  var previous = 0
  return function () {
    var _this = this
    var args = arguments
    var now = new Date()
    if (now - previous > delay) {
      fn.apply(_this, args)
      previous = now
    }
  }
}

/**
 * 格式化音乐播放时间
 * @export
 * @param {*} time(秒)
 * @return {*} 00:00
 */
export function timeHandle(time) {
  let newFormat = (time / 60).toFixed(2) + ''
  if (newFormat.split('.')[0].length <= 1) {
    newFormat = '0' + newFormat
  }
  newFormat = newFormat.replace('.', ':')
  return newFormat
}

/**
 * 判断当前运行环境
 */
export function isChrome() {
  if (navigator.userAgentData) {
    let brands = navigator.userAgentData.brands.reduce(
      (acc, cur, idx, list) => {
        acc.push(cur.brand)
        return acc
      },
      []
    )
    if (brands.includes('Google Chrome')) {
      return true
    } else {
      return false
    }
  } else {
    return false
  }
}

export function dayDif(startTime, endTime) {
  return Math.ceil(Math.abs(startTime.getTime() - endTime.getTime()) / 86400000)
}
