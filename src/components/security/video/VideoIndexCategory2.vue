<template>
    <div class="left-bar">
        <!-- search -->
        <div class="search-container">
            <el-input class="custom-mini">
                <i slot="suffix" class="el-input__icon icon-x-sousuo"></i>
            </el-input>
            <el-button size="mini" plain class="custom-mini">轮巡</el-button>
            <el-button size="mini" plain class="custom-mini">添加组</el-button>
        </div>
        <!---->
        <el-tabs class="video-index-tabs" :value="tabIndex" tab-position="left" @tab-click="handleTab">
            <el-tab-pane label="监控目录"></el-tab-pane>
            <el-tab-pane label="收藏夹">
                <el-tree
                    class="count"
                    :data="data1"
                    node-key="id"
                    :props="defaultProps"
                >
                    <span class="custom-between-node" slot-scope="{ node, data }">
                        <template v-if="data.label.indexOf('一级') != -1">
                            <span :class="(node.checked && node.isLeaf) ? 'color' : ''">{{ node.label }}</span>
                            <span>
                                <el-link type="primary" :underline="false">编辑</el-link>&nbsp;&nbsp;
                                <el-link type="danger" :underline="false">删除</el-link>
                            </span>
                        </template>
                        <template v-else>
                            <span :class="(node.checked && node.isLeaf) ? 'color' : ''">{{ node.label }}</span>
                            <span>
                                <i class="icon-x-shoucang off"></i>
                                <!-- <i class="icon-x-shoucang1 on"></i> -->
                            </span>
                        </template>
                    </span>
                </el-tree>
            </el-tab-pane>
            <el-tab-pane label="播放列表"></el-tab-pane>
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