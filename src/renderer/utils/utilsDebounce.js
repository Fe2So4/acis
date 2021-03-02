let timeout = null

function utilsDebounce(fn, wait) {
    if (timeout != null) clearTimeout(timeout)
    timeout = setTimeout(fn, wait)
}
export default utilsDebounce
