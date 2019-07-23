<template>
    <div class="left-bar">
        <!-- search -->
        <div class="search-container">
            <h4>播放列表</h4>
            <span>
                <el-button size="mini" plain class="custom-mini">收藏全部</el-button>
                <el-button size="mini" plain class="custom-mini">关闭全部</el-button>
            </span>
        </div>
        <!---->
        <el-tabs class="video-index-tabs" :value="tabIndex" tab-position="left" @tab-click="handleTab">
            <el-tab-pane label="监控目录"></el-tab-pane>
            <el-tab-pane label="收藏夹"></el-tab-pane>
            <el-tab-pane label="播放列表">
                <el-tree
                    class="count"
                    :data="data1"
                    show-checkbox
                    node-key="id"
                    :props="defaultProps"
                >
                    <span class="custom-between-node" slot-scope="{ node }">
                        <span :class="(node.checked && node.isLeaf) ? 'color' : ''">{{ node.label }}</span>
                        <span>
                            <i class="icon-x-shoucang off"></i>
                            <!-- <i class="icon-x-shoucang1 on"></i> -->
                        </span>
                    </span>
                </el-tree>
            </el-tab-pane>
            <el-tab-pane label="视频轮巡"></el-tab-pane>
            <el-tab-pane label="快捷播放"></el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    export default {
        props: {
            tabIndex: String
        },
        data () {
            return {
                
                data1: [{
                    id: 1,
                    label: '一级 1',
                    children: [{
                        id: 4,
                        label: '二级 1-1',
                        children: [{
                        id: 9,
                        label: '三级 1-1-1'
                        }, {
                        id: 10,
                        label: '三级 1-1-2'
                        }]
                    }]
                    }, {
                    id: 2,
                    label: '一级 2',
                    children: [{
                        id: 5,
                        label: '二级 2-1'
                    }, {
                        id: 6,
                        label: '二级 2-2'
                    }]
                    }, {
                    id: 3,
                    label: '一级 3',
                    children: [{
                        id: 7,
                        label: '二级 3-1'
                    }, {
                        id: 8,
                        label: '二级 3-2'
                    }]
                }],
                    defaultProps: {
                    children: 'children',
                    label: 'label'
                }
            }
        },
        methods: {
            handleTab (tab) {
                (this.tabIndex != tab.index) && this.$emit('handleTab', tab.index)
            }
        },
        components: {
            
        }
    }
</script>