// 时间类型
export function formatTime (timestamp = 0) {
  if (timestamp === 0 || !timestamp) {
    return '--:--'
  }
  const datetime = new Date()
  datetime.setTime(timestamp)
  let hours = datetime.getHours()
  hours = hours < 10 ? `0${hours}` : `${hours}`
  let minutes = datetime.getMinutes()
  minutes = minutes < 10 ? `0${minutes}` : `${minutes}`
  return `${hours}:${minutes}`
}

// 时间类型 hours:minutes:seconds
export function formatTime2 (timestamp = 0) {
  if (timestamp === 0 || !timestamp) {
    return '--:--'
  }
  const datetime = new Date()
  datetime.setTime(timestamp)
  let hours = datetime.getHours()
  hours = hours < 10 ? `0${hours}` : `${hours}`
  let minutes = datetime.getMinutes()
  minutes = minutes < 10 ? `0${minutes}` : `${minutes}`
  let seconds = datetime.getSeconds()
  seconds = seconds < 10 ? `0${seconds}` : `${seconds}`
  return `${hours}:${minutes}:${seconds}`
}

export function formatDateTime (timestamp = 0) {
  if (timestamp === 0 || !timestamp) {
    return '--:--'
  }
  const datetime = new Date()
  datetime.setTime(timestamp)
  let month = datetime.getMonth() + 1
  month = month < 10 ? `0${month}` : `${month}`
  let day = datetime.getDate()
  day = day < 10 ? `0${day}` : `${day}`
  let hours = datetime.getHours()
  hours = hours < 10 ? `0${hours}` : `${hours}`
  let minutes = datetime.getMinutes()
  minutes = minutes < 10 ? `0${minutes}` : `${minutes}`
  return `${month}-${day} ${hours}:${minutes}`
}

// 获取今日的日期(默认: YYYY-MM-DD)
// separator: 自定义分隔符
export function formatTodayDate (separator = '-') {
  const now = new Date()
  const year = now.getFullYear()
  let month = now.getMonth() + 1
  month = month < 10 ? `0${month}` : `${month}`
  let day = now.getDate()
  day = day < 10 ? `0${day}` : `${day}`
  return `${year}${separator}${month}${separator}${day}`
}

// 字符串格式
export function trim (str) {
  return str.replace(/(^\s*)|(\s*$)/g, '')
}

// 时间戳转换成年-月-日
export function timestampToTime (timestamp) {
  const date = new Date(timestamp)
  const Y = date.getFullYear() + '-'
  const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  const D = date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()
  return Y + M + D
}

// 00:00 转换成s
export function time_to_sec (time) {
  var s = ''

  var hour = time.split(':')[0]
  var min = time.split(':')[1]
  // var sec = time.split(':')[2];
  // s = Number(hour*3600) + Number(min*60) + Number(sec);
  s = Number(hour * 3600) + Number(min * 60)
  return s
};

// s 转换成 00:00
export function sec_to_time (s) {
  var t
  if (s > -1) {
    var hour = Math.floor(s / 3600)
    var min = Math.floor(s / 60) % 60
    // var sec = s % 60;
    if (hour < 10) {
      t = '0' + hour + ':'
    } else {
      t = hour + ':'
    }

    if (min < 10) {
      t += '0'
    }
    t += min
    // t += min + ":";
    // if(sec < 10){t += "0";}
    // t += sec.toFixed(2);
  }
  return t
}

// ms 转 00:00:00
export function MillisecondToDate (msd) {
  const s = parseInt(msd) / 1000
  let t
  if (s > -1) {
    const hour = Math.floor(s / 3600)
    const min = Math.floor(s / 60) % 60
    const sec = s % 60
    if (hour < 10) {
      t = '0' + hour + ':'
    } else {
      t = hour + ':'
    }

    if (min < 10) {
      t += '0'
    }
    t += min + ':'
    if (sec < 10) {
      t += '0'
    }
    t += sec
  }
  return t
}

// YYYY-MM-dd 00:00:00

export function msToDate (msec) {
  const datetime = new Date(msec)
  const year = datetime.getFullYear()
  const month = datetime.getMonth() + 1
  const date = datetime.getDate()
  const hour = datetime.getHours()
  const minute = datetime.getMinutes()
  const second = datetime.getSeconds()

  const result1 = year +
		'-' +
		(month < 10 ? '0' + month : month) +
		'-' +
		(date < 10 ? '0' + date : date) +
		' ' +
		(hour < 10 ? '0' + hour : hour) +
		':' +
		(minute < 10 ? '0' + minute : minute) +
		':' +
		(second < 10 ? '0' + second : second)

  const result2 = year +
		'-' +
		(month < 10 ? '0' + month : month) +
		'-' +
		(date < 10 ? '0' + date : date)

  const result = {
    hasTime: result1,
    withoutTime: result2
  }

  return result
};

export function setObj (list, values) {
  var result = {}
  for (var i = 0; i < list.length; i++) {
    if (values) {
      result[list[i]] = values[i]
    } else {
      result[list[i][0]] = list[i][1]
    }
  }
  return result
}

// 去抖
export function debounce (fn, wait = 1000, immediate) {
  let timeout, result

  return function () {
    const context = this
    const args = arguments

    if (timeout) clearTimeout(timeout)
    if (immediate) {
      const callNow = !timeout
      timeout = setTimeout(function () {
        timeout = null
      }, wait)
      if (callNow) result = fn.apply(context, args)
    } else {
      timeout = setTimeout(function () {
        result = fn.apply(context, args)
      }, wait)
    }
    return result
  }
}

// 节流
export function throttle (fn, wait = 3000, options) {
  let timeout, context, args
  let previous = 0
  if (!options) options = {}

  const later = function () {
    previous = options.leading === false ? 0 : new Date().getTime()
    timeout = null
    fn.apply(context, args)
    if (!timeout) {
      context = args = null
    }
  }

  const throttled = function () {
    const now = new Date().getTime()
    if (!previous && options.leading === false) {
      previous = now
    }
    const remaining = wait - (now - previous)
    context = this
    args = arguments
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      previous = now
      fn.apply(context, args)
      if (!timeout) {
        context = args = null
      }
    } else if (!timeout && options.trailing === true) {
      timeout = setTimeout(later, remaining)
    }
  }

  return throttled
}

// 取location query
export function parseQueryString (str) {
  str = str || window.location.search
  const objURL = {}

  str.replace(
    new RegExp('([^?=&]+)(=([^&]*))?', 'g'),
    function ($0, $1, $2, $3) {
      objURL[$1] = $3
    }
  )
  return objURL
};
