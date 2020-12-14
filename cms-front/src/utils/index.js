/**
 * Created by jiachenpan on 16/11/18.
 */

export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  if (arguments[0] === null) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date 
  if (time === '0001-01-01T00:00:00'){
    return null
  }
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) { time = parseInt(time) * 1000 } else {
      if (typeof (time) !== 'number' && time !== '0001-01-01T00:00:00') {
        time = time.replace(/T/g, ' ');
      }
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

export function formatTime(time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

// 格式化时间
export function getQueryObject(url) {
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}

/**
 *get getByteLen
 * @param {Sting} val input value
 * @returns {number} output value
 */
export function getByteLen(val) {
  let len = 0
  for (let i = 0; i < val.length; i++) {
    if (val[i].match(/[^\x00-\xff]/gi) != null) {
      len += 1
    } else {
      len += 0.5
    }
  }
  return Math.floor(len)
}

export function cleanArray(actual) {
  const newArray = []
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i])
    }
  }
  return newArray
}

export function param(json) {
  if (!json) return ''
  return cleanArray(
    Object.keys(json).map(key => {
      if (json[key] === undefined) return ''
      return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
    })
  ).join('&')
}

export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
    decodeURIComponent(search)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"') +
    '"}'
  )
}

export function html2Text(val) {
  const div = document.createElement('div')
  div.innerHTML = val
  return div.textContent || div.innerText
}

export function objectMerge(target, source) {
  /* Merges two  objects,
     giving the last one precedence */

  if (typeof target !== 'object') {
    target = {}
  }
  if (Array.isArray(source)) {
    return source.slice()
  }
  Object.keys(source).forEach(property => {
    const sourceProperty = source[property]
    if (typeof sourceProperty === 'object') {
      target[property] = objectMerge(target[property], sourceProperty)
    } else {
      target[property] = sourceProperty
    }
  })
  return target
}

export function toggleClass(element, className) {
  if (!element || !className) {
    return
  }
  let classString = element.className
  const nameIndex = classString.indexOf(className)
  if (nameIndex === -1) {
    classString += '' + className
  } else {
    classString =
      classString.substr(0, nameIndex) +
      classString.substr(nameIndex + className.length)
  }
  element.className = classString
}

export const pickerOptions = [
  {
    text: '今天',
    onClick(picker) {
      const end = new Date()
      const start = new Date(new Date().toDateString())
      end.setTime(start.getTime())
      picker.$emit('pick', [start, end])
    }
  },
  {
    text: '最近一周',
    onClick(picker) {
      const end = new Date(new Date().toDateString())
      const start = new Date()
      start.setTime(end.getTime() - 3600 * 1000 * 24 * 7)
      picker.$emit('pick', [start, end])
    }
  },
  {
    text: '最近一个月',
    onClick(picker) {
      const end = new Date(new Date().toDateString())
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      picker.$emit('pick', [start, end])
    }
  },
  {
    text: '最近三个月',
    onClick(picker) {
      const end = new Date(new Date().toDateString())
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      picker.$emit('pick', [start, end])
    }
  }
]

export function getTime(type) {
  if (type === 'start') {
    return new Date().getTime() - 3600 * 1000 * 24 * 90
  } else {
    return new Date(new Date().toDateString())
  }
}

export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function (...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 */
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'shallowClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

export function uniqueArr(arr) {
  return Array.from(new Set(arr))
}

export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

export function amountFormat(s, type) {
  // if (/[^0-9\.]/.test(s))
  //   return "0";
  if (s >= 0) {
    if (s === null || s === "")
      return "0";
    s = s.toString().replace(/^(\d*)$/, "$1.");
    s = (s + "00").replace(/(\d*\.\d\d)\d*/, "$1");
    s = s.replace(".", ",");
    var re = /(\d)(\d{3},)/;
    while (re.test(s))
      s = s.replace(re, "$1,$2");
    s = s.replace(/,(\d\d)$/, ".$1");
    if (type === 0) {// 不带小数位(默认是有小数位)
      var a = s.split(".");
      if (a[1] === "00") {
        s = a[0];
      }
    }
    return s;
  } else {
    s = -s;
    if (s === null || s === "")
      return "0";
    s = s.toString().replace(/^(\d*)$/, "$1.");
    s = (s + "00").replace(/(\d*\.\d\d)\d*/, "$1");
    s = s.replace(".", ",");
    re = /(\d)(\d{3},)/;
    while (re.test(s))
      s = s.replace(re, "$1,$2");
    s = s.replace(/,(\d\d)$/, ".$1");
    if (type === 0) {// 不带小数位(默认是有小数位)
      a = s.split(".");
      if (a[1] === "00") {
        s = a[0];
      }
    }
    return "-" + s;
  }

}

export function number_format(number, decimals, dec_point, thousands_sep) {
  /*
   * 参数说明：
   * number：要格式化的数字
   * decimals：保留几位小数
   * dec_point：小数点符号
   * thousands_sep：千分位符号
   * */
  number = (number + '').replace(/[^0-9+-Ee.]/g, '');
  var n = !isFinite(+number) ? 0 : +number,

    prec = !isFinite(+decimals) ? 2 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function (n, prec) {
      var k = Math.pow(10, prec);
      return '' + Math.floor(n * k) / k;
    };
  s = (prec ? toFixedFix(n, prec) : '' + Math.floor(n)).split('.');
  var re = /(-?\d+)(\d{3})/;
  while (re.test(s[0])) {
    s[0] = s[0].replace(re, "$1" + sep + "$2");
  }

  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}
/**
 * Check if an element has a class
 * @param {HTMLElement} elm
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass(ele, cls) {
  return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}
/**
 * Add class to element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function addClass(ele, cls) {
  if (!hasClass(ele, cls)) ele.className += ' ' + cls
}
/**
 * Remove class from element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function removeClass(ele, cls) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
    ele.className = ele.className.replace(reg, ' ')
  }
}
/** 
  * 精度计算加法
  * @param {HTMLElement} val
  * 事例:addClac(0.1, 0.2, 0.3, 0.4) => 1。可以传多个参数进行相加。
*/
export function addClac(...val) {
  let max = 0
  let count = 0
  for (let i = 0; i < val.length; i++) {
    const strVal = val[i].toString()
    const index = strVal.indexOf('.')
    let num = 0
    if (index > -1) {
      num = strVal.length - 1 - index
      max = num > max ? num : max
    }
  }
  for (let i = 0; i < val.length; i++) {
    count += Math.round(val[i] * Math.pow(10, max))
  }
  return count / Math.pow(10, max)
}
/** 
  * 精度计算减法
  * @param {HTMLElement} val
  * 事例:subClac(1, 0.2, 0.3, 0.4) => 0.1。相当于1 - 0.2 -0.3 -0.4；可以传多个参数，使用首位减后面的所有参数。
*/
export function subClac(...val) {
  let max = 0
  let count = val[0] | 0
  for (let i = 0; i < val.length; i++) {
    const strVal = val[i].toString()
    const index = strVal.indexOf('.')
    let num = 0
    if (index > -1) {
      num = strVal.length - 1 - index
      max = num > max ? num : max
    }
  }
  for (let i = 0; i < val.length; i++) {
    count -= Math.round(val[i] * Math.pow(10, max))
  }
  return count / Math.pow(10, max)
}
/** 
  * 精度计算乘法
  * @param {HTMLElement} val
  * 事例:rideClac(0.5, 0.6) => 3, 只允许传入两个参数。%计算可以这样ride(0.5, 100) => 50。
*/
export function rideClac(...val) {
  const strVal = val[0].toString()
  const strValTwo = val[1].toString()
  const index = strVal.indexOf('.')
  const indexTwo = strValTwo.indexOf('.')
  const num = [0, 0]
  if (index > -1) {
    num[0] = strVal.length - 1 - index
  }
  if (indexTwo > -1) {
    num[1] = strValTwo.length - 1 - index
  }
  return Math.round((val[0] * Math.pow(10, num[0])) * (val[1] * Math.pow(10, num[1]))) / Math.pow(10, num[0] + num[1])
}
/** 
  * 精度计算除法
  * @param {HTMLElement} val
  * 事例:excClac(0.5, 0.2) => 2.5, 只允许传入两个参数。如果计算出现无穷数请后期根据需要修改最后代码进行取舍。
*/
export function excClac(val, valTwo = 100) {
  const strVal = val.toString()
  const strValTwo = valTwo.toString()
  const index = strVal.indexOf('.')
  const indexTwo = strValTwo.indexOf('.')
  const num = [0, 0]
  if (index > -1) {
    num[0] = strVal.length - 1 - index
  }
  if (indexTwo > -1) {
    num[1] = strValTwo.length - 1 - index
  }
  return Math.round(val * Math.pow(10, num[0])) / (Math.round((valTwo * Math.pow(10, num[1]))) * Math.pow(10, num[0] - num[1]))
}

/**
 * 验证对象 值 或者数组为空 
 * @param {*} obj 传入验证的数据 可递归
 */
export function validateIsEmpty(obj) {
  //检验null和undefined
  if (!obj && obj !== 0 && obj !== '') {
      return true;
  }
  //检验数组
  if (Array.prototype.isPrototypeOf(obj) && obj.length === 0) {
      return true;
  }
  //检验对象
  if (Object.prototype.isPrototypeOf(obj) && Object.keys(obj).length === 0) {
      return true;
  }
  return false;
}
