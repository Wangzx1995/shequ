import Vue from 'vue'
import App from './App'
import router from '@/router'
import ElementUI from 'element-ui'
import store from './store'
import {
    getUserInfo
} from '@/utils/auth'

import * as filters from '@/filters/'

import ServerMixin from '@/mixin/ServerMixin'

import './assets/fonts/iconfont.css'
import './style/common.less'
import './style/animate.less'
import './style/element.less'

// 使用v-dialogDrag   可以拖动 vue-dialog
import '@/components/directives'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(ServerMixin)

Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

// 拦截白名单
const whiteList = ['/login']

router.beforeEach((to, from, next) => {

    const userInfo = getUserInfo()
    if (userInfo.token) {
        store.dispatch('setUserInfo')
        if (to.path === '/login') {
            next({
                path: '/'
            })
        } else {
            next()
        }
    } else {
        if (whiteList.indexOf(to.path) != -1) {

            next()
        } else {
            next({
                path: '/login'
            })
        }

    }
})

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
    mounted() {
        ServerMixin.Event.$on('login', () => {
            this.$store.dispatch('logout')
            /*
            .then(() => {
                this.$router.push({
                    path: '/login',
                    query: {
                        redirectUrl: location.href
                    }
                })
            })*/
        })
    }
})