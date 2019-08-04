<template>
    <div class="left-bar">
        <!-- search -->
        <div class="search-container">
            <h4>轮巡列表</h4>
            <el-button size="mini" plain class="custom-mini" @click="$parent.endPatrol">结束轮巡</el-button>
        </div>
        <!---->
        <el-tabs class="video-index-tabs" :value="tabIndex" tab-position="left" @tab-click="handleTab">
            <el-tab-pane label="监控目录"></el-tab-pane>
            <el-tab-pane label="收藏夹"></el-tab-pane>
            <el-tab-pane label="播放列表"></el-tab-pane>
            <el-tab-pane label="视频轮巡">
                <template v-if="list.length">
                    <span class="custom-between-node" v-for="lst in list" :key="lst.id">
                        <span class="label">{{ lst.name }}</span>
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
