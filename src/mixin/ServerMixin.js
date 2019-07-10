import * as api from '@/api/'
import * as request from '@/api/request'
import Vue from 'vue'
import utils from '@/utils'
import {
  dateFormat,
  joinImgPrefix
} from './../filters'
const ServerMixin = {
  Event: new Vue()
}
// console.log(api)

ServerMixin.install = function (v, options) {
  // 接口请求
  v.prototype.$api = api.api
  v.prototype.$systemApi = api.api.system
  v.prototype.$consoleApi = api.api.console
  v.prototype.$propertyApi = api.api.property
  v.prototype.$securityApi = api.api.security
  // 异步封装
  v.prototype.$request = request
  // 日期格式化
  v.prototype.$dateFormat = dateFormat
  // 图片前缀
  v.prototype.$joinImgPrefix = joinImgPrefix

  v.prototype.$$message = (options) => {
    let opts = {
      showClass: true,
      type: 'warning'
    }
    for (let i in options) {
      if (!utils.isEmpty(options[i])) {
        opts[i] = options[i]
      }
    }
    return v.prototype.$message(opts)
  }

  v.prototype.$$notify = (options) => {
    let opts = {
      title: '提示',
      type: 'success'
    }
    for (let i in options) {
      if (!utils.isEmpty(options[i])) {
        opts[i] = options[i]
      }
    }
    return v.prototype.$notify(opts)
  }

  v.prototype.$$confirm = (options) => {
    let opts = {
      title: '提示',
      confirmButtonText: '确定',
      cancelButtonText: '取消'
    }
    for (let i in options) {
      if (!utils.isEmpty(options[i])) {
        opts[i] = options[i]
      }
    }
    return v.prototype.$confirm(opts.message, opts.title, opts)
  }

  v.prototype.$$alert = (options) => {
    let opts = {
      title: '提示',
      confirmButtonText: '确定'
    }
    for (let i in options) {
      if (!utils.isEmpty(options[i])) {
        opts[i] = options[i]
      }
    }
    return v.prototype.$alert(opts.message, opts.title, opts)
  }

  v.prototype.$updateArray = (arr, fieldName, fieldValue, newRow) => {
    // 先查找是否有同样的主键（key），如果有，说明是修改。这里主键暂时不支持复合主键
    for (let i in arr) {
      if (arr[i][fieldName] == fieldValue) {
        for (let j in arr[i]) {
          v.prototype.$set(arr[i], j, newRow[j])
        }
        break
      }
    }
  }

}
export default ServerMixin
