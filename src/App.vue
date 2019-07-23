<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
import { link } from 'fs';
    export default {
        watch: {
            $route() {
            // this.setTheme()
            }
        },
        watch: {
            '$route' () {
                this.setTheme()
            }
        },
        created () {
            this.setTheme()
        },
        methods: {
            setTheme() {
                const path = location.hash.replace('#', '')
                const consoleStyleUrl = '/static/theme/default/index.css'
                const propertyStyleUrl = '/static/theme/21B2C6/index.css'
                const securityStyleUrl = '/static/theme/f79623/index.css'
                const defaultStyleUrl = '/static/theme/default/index.css'
                
                const colorClassList = ['console', 'security', 'property', 'system']

                const classList = document.body.classList

                if (path.indexOf('/console/') == 0) {
                    // console.log(1)
                    this.removeClass(colorClassList.filter(clz => {
                        return clz == 'console'
                    }))
                    if (!classList.contains('console')) {
                        classList.add('console')
                        document.head.querySelector('.theme-index').setAttribute('href', consoleStyleUrl)
                    }
                } else if (path.indexOf('/property/') == 0) {

                    // console.log(2)
                    this.removeClass(colorClassList.filter(clz => {
                        return clz == 'property'
                    }))
                    if (!classList.contains('property')) {
                        classList.add('property')
                        document.head.querySelector('.theme-index').setAttribute('href', propertyStyleUrl)
                    }

                } else if (path.indexOf('/security/') == 0) {

                    // console.log(3)
                    this.removeClass(colorClassList.filter(clz => {
                        return clz == 'security'
                    }))
                    if (!classList.contains('security')) {
                        classList.add('security')
                        document.head.querySelector('.theme-index').setAttribute('href', securityStyleUrl)
                    }

                } else if (path.indexOf('/system/') == 0) {

                    // console.log(3)
                    this.removeClass(colorClassList.filter(clz => {
                        return clz == 'system'
                    }))
                    if (!classList.contains('system')) {
                        classList.add('system')
                        document.head.querySelector('.theme-index').setAttribute('href', defaultStyleUrl)
                    }

                } else {
                    // console.log(4)
                    this.removeClass(colorClassList)
                    document.head.querySelector('.theme-index').setAttribute('href', defaultStyleUrl)
                }
            },
            // 删除多个class
            removeClass (classList) {
                for (let i = 0; i < classList.length; i ++) {
                    document.body.classList.remove(classList[i])
                }
            }
        }
    }
</script>
