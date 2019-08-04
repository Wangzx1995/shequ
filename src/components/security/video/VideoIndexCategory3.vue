<template>
    <div class="left-bar">
        <!-- search -->
        <div class="search-container">
            <h4>播放列表</h4>
            <span>
                <el-button size="mini" plain class="custom-mini" :disabled="list.length ? false : true" @click="addCollectAll">收藏全部</el-button>
                <el-button size="mini" plain class="custom-mini" :disabled="list.length ? false : true" @click="$parent.closeAll">关闭全部</el-button>
            </span>
        </div>
        <!---->
        <el-tabs class="video-index-tabs" :value="tabIndex" tab-position="left" @tab-click="handleTab">
            <el-tab-pane label="监控目录"></el-tab-pane>
            <el-tab-pane label="收藏夹"></el-tab-pane>
            <el-tab-pane label="播放列表">
                <template v-if="list.length">
                    <span class="custom-between-node" v-for="lst in list" :key="lst.id">
                        <span class="label" @click="addPlay(lst)">{{ lst.name }}</span>
                        <span class="ic">
                            <i class="icon-x-shoucang1 on" v-if="$parent.getCollectStatus({ data: lst })" @click="toggleCollect(lst, $event)"></i>
                            <i class="icon-x-shoucang off" v-else @click="toggleCollect(lst, $event, 1)"></i>
                        </span>
                    </span>
                </template>
                <div v-else class="com-loading-text">
                    <el-link type="info" :underline="false">暂无数据</el-link>
                </div>
            </el-tab-pane>
            <el-tab-pane label="视频轮巡"></el-tab-pane>
            <el-tab-pane label="快捷播放"></el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    export default {
        props: {
            tabIndex: String,
            list: Array
        },
        data () {
            return {
            }
        },
        methods: {
            // 收藏全部
            addCollectAll () {
                let ids = []
                this.list.forEach(v => {
                    ids.push(v.id)
                })
                this.$parent.addCollect(ids)
            },
            // 加入播放
            addPlay (data) {
                this.$parent.addPlay(data)
            },
            
            // 添加/取消收藏
            toggleCollect (data, $event, type) {
                $event.stopPropagation()
                // 添加收藏
                if (type == 1) {
                    this.$parent.addCollect([data.id])
                } else {
                    // 取消收藏
                    this.$parent.cancelCollect([data.id])
                }
            },
            handleTab (tab) {
                (this.tabIndex != tab.index) && this.$emit('handleTab', tab.index)
            }
        },
        components: {
            
        }
    }
</script>
<style scoped>
    .custom-between-node {
        height: 36px;
        line-height: 36px;
    }
</style>
