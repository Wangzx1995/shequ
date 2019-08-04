<template>
    <div class="left-bar">
        <!-- search -->
        <div class="search-container">
            <h4>快捷播放</h4>
        </div>
        <!---->
        <el-tabs class="video-index-tabs" :value="tabIndex" tab-position="left" @tab-click="handleTab">
            <el-tab-pane label="监控目录"></el-tab-pane>
            <el-tab-pane label="收藏夹"></el-tab-pane>
            <el-tab-pane label="播放列表"></el-tab-pane>
            <el-tab-pane label="视频轮巡"></el-tab-pane>
            <el-tab-pane label="快捷播放">
                <el-tree
                    class="count"
                    :data="treeList"
                    :props="treeProps"
                >
                    <span class="custom-between-node" slot-scope="{ node, data }">
                        <template v-if="!data.leaf">
                            <span class="label" :class="(node.checked && node.isLeaf) ? 'color' : ''">{{ node.label }}</span>
                            <span class="ic">
                                <el-link type="primary" style="color:#1779ec" :underline="false" v-if="data.children.length" @click="addAllPlay(data, $event)">播放</el-link>&nbsp;&nbsp;
                                <el-link type="primary" :underline="false" @click="openAddDlg(data, $event)">编辑</el-link>&nbsp;&nbsp;
                                <el-link type="danger" :underline="false" @click="del(data, $event)">删除</el-link>
                            </span>
                        </template>
                        <template v-else>
                            <span class="label" :class="(node.checked && node.isLeaf) ? 'color' : ''" @click="addPlay(data)">{{ node.label }}</span>
                            <span class="ic">
                                <i class="icon-x-shoucang1 on" v-if="$parent.getCollectStatus(node)" @click="toggleCollect(data, $event)"></i>
                                <i class="icon-x-shoucang off" v-else @click="toggleCollect(data, $event, 1)"></i>
                            </span>
                        </template>
                    </span>
                </el-tree>
            </el-tab-pane>
        </el-tabs>
        <AddQuick ref="dlgAddQuick"/>
    </div>
</template>

<script>
    import AddQuick from '@/components/security/video/DlgAddQuick'
    import bus from '@/components/bus'
    export default {
        props: {
            tabIndex: String
        },
        data () {
            return {
                treeList: [],
                treeProps: {
                    children: 'children',
                    label: 'label',
                    isLeaf: 'leaf'
                }
            }
        },
        mounted () {
            this.findQuickList()

            bus.$on('updateVideoQuickList', this.findQuickList)
        },
        methods: {
            // 播放全部
            addAllPlay (data, $event) {
                $event.stopPropagation()
                console.log(data)
                data.children.forEach(v => {
                    this.$parent.addPlay(v.__data)
                })
            },
            // 加入播放
            addPlay (data) {
                this.$parent.addPlay(data.__data)
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
            // 删除快捷播放
            del (data, e) {
                e.stopPropagation()
                this.$$confirm({
                    message: '确认删除？'
                }).then(() => {
                    this.$securityApi.video.delQuick({
                        ids: [data.id]
                    }).then(res => {
                        if (res.code == 1000) {
                            this.$$notify({
                                message: '删除成功'
                            })
                            this.findQuickList()
                        } else {
                            this.$$message({
                                message: res.message
                            })
                        }
                    })
                }).catch(() => {})
            },
            // 添加添加窗口
            openAddDlg (data, e) {
                e.stopPropagation()
                this.$refs.dlgAddQuick.open(() => {
                    this.findQuickList()
                }, data)
            },
            // 查询快捷播放列表
            findQuickList () {
                
                this.$securityApi.video.findQuickList().then(res => {
                    if (res.code == 1000) {
                        this.treeList = []
                        res.data.forEach(v => {
                            
                            let children = []
                            v.favoriteQuicks.forEach(c => {
                                children.push({
                                    id: c.equipMonitorVo.id,
                                    label: c.equipMonitorVo.name,
                                    leaf: true,
                                    __data: c.equipMonitorVo
                                })
                            })

                            this.treeList.push({
                                id: v.id,
                                label: v.playTitle,
                                children
                            })
                        })
                    } else {
                        this.$$message({
                            message: res.message
                        })
                    }
                })
            },
            handleTab (tab) {
                (this.tabIndex != tab.index) && this.$emit('handleTab', tab.index)
            }
        },
        components: {
            AddQuick
        }
    }
</script>