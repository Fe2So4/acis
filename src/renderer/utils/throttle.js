export function throttle (fn, threshholdTime) {
  console.log('开始')
  // debugger
  var timeout
  var start = new Date() - 0
  var threshhold = threshholdTime || 160
  // return function () {
  // var context = this
  // var args = arguments
  var curr = new Date() - 0
  clearTimeout(timeout)// 总是干掉事件回调
  console.log(start, curr, curr - start)
  if (curr - start >= threshhold) {
    console.log('now', curr, curr - start)// 注意这里相减的结果，都差不多是160左右
    // fn.apply(context, args) // 只执行一部分方法，这些方法是在某个时间段内执行一次
    start = curr
  } else {
    // 让方法在脱离事件后也能执行一次
    console.log(789665)
    timeout = setTimeout(function () {
      // fn.apply(context, args)
    }, threshhold)
  }
  // }
}
