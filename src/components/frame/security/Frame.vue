<template>
    <div>
        <Header />
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
</template>

<script>
import Header from './Header'
import bus from '@/components/bus'
export default {
    data() {
        return {
            tagsList: []
        }
    },
    created() {
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
        Header
    }
}
</script>