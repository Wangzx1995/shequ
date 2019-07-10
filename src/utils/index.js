/**
 * 工具类
 */

export default {

  /**
   * 判断非空
   * @param val
   * @returns {Boolean}
   */
  isEmpty(val) {

    val = (val + '').replace(/\u200B/g, '') // \u200B为&#8203;无宽度空格
    if (val == null || val == 'null') {
      return true
    }
    if (val == undefined || val == 'undefined') {
      return true
    }
    if (val == '') {
      return true
    }
    if (val.length == 0) {
      return true
    }
    if (!/[^(^\s*)|(\s*$)]/.test(val)) {
      return true
    }
    return false
  },

  isNotEmpty(val) {

    return !this.isEmpty(val)
  },

  // 判断一个字符串是否为数字
  isNum(str) {
    return !isNaN(str)
  },
  // 判断是否为手机号格式
  isMobile(str) {
    return /^1[34578][0-9]{9}$/.test(str)
  },
  // 判断是否为邮箱格式
  isEmail(str) {
    //      return /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(str)
    return /^([a-zA-Z0-9])+@(([a-zA-Z0-9])+\.)+([a-zA-Z0-9]{2,4})+$/.test(str)
  },

  getQueryString(params, url) {
    url = url || location.href
    const search = url.split('?')[1]
    if (search) {
      const n = new RegExp(`(^|&)${params}=([^(&|#)]*)((&|#)|$)`, 'i')
      const r = search.match(n)
      return (r != null) ? r[2] : null
    }
    return null
  }
}
