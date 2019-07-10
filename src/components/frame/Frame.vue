<template>
    <div>
        <Sidebar />
        <div
            class="com-right-container"
            :class="{'collapse': collapse}"
        >
            <Header />
            <div class="com-header-avatar"></div>

            <!-- <Main/> -->
            <div class="com-main">
                <transition
                    name="move"
                    mode="out-in"
                >
                    <keep-alive :include="tagsList">
                        <router-view></router-view>
                    </keep-alive>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
import Sidebar from './Sidebar'
import Header from './Header'
// import Main from './Main'
import bus from '@/components/bus'
export default {
    data() {
        return {
            collapse: false,
            tagsList: []
        }
    },
    created() {

        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        bus.$on('collapse', data => {
            this.collapse = data
        })
        // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
        bus.$on('tags', data => {
            let arr = []
            for (let i = 0, len = data.length; i < len; i++) {
                data[i].name && arr.push(data[i].name)
            }
            this.tagsList = arr
        })
    },
    methods: {

    },
    components: {
        Sidebar,
        Header/*,
      Main*/
    }
}
</script>