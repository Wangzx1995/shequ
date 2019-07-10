
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
// 公用
import baseRoutes from './base'
// 指挥调度中心
import consoleRoutes from './console'
// 智慧安防管理
import securityRoutes from './security'
// 智慧物业服务
import propertyRoutes from './property'
// 平台配置系统
import systemRoutes from './system'

import testRoutes from './test'

let routes = baseRoutes.concat(consoleRoutes, securityRoutes, propertyRoutes, systemRoutes, testRoutes)
/*let routes = baseRoutes.concat(testRoutes)

const hash = location.hash.replace('#', '')
if (hash.indexOf('/console') == 0) {
  routes = baseRoutes.concat(consoleRoutes)
} else if (hash.indexOf('/security') == 0) {
  routes = baseRoutes.concat(securityRoutes)
} else if (hash.indexOf('/property') == 0) {
  routes = baseRoutes.concat(propertyRoutes)
} else if (hash.indexOf('/system') == 0) {
  routes = baseRoutes.concat(systemRoutes)
}*/

export default new Router({ routes })