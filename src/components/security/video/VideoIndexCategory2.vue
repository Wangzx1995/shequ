<template>
    <div class="left-bar">
        <!-- search -->
        <div class="search-container">
            <el-input class="custom-mini" v-model="search">
                <i slot="suffix" class="el-input__icon icon-x-sousuo" @click="findBookmark"></i>
            </el-input>
            <el-button size="mini" plain class="custom-mini">轮巡</el-button>
            <el-button size="mini" plain class="custom-mini" @click="openAddDlg">添加组</el-button>
        </div>
        <!---->
        <el-tabs class="video-index-tabs" :value="tabIndex" tab-position="left" @tab-click="handleTab">
            <el-tab-pane label="监控目录"></el-tab-pane>
            <el-tab-pane label="收藏夹">
                <el-tree
                    class="count"
                    :data="treeList"
                    node-key="key"
                    :props="treeProps"
                >
                    <span class="custom-between-node" slot-scope="{ node, data }">
                        <template v-if="!data.leaf">
                            <span class="label" :class="(node.checked && node.isLeaf) ? 'color' : ''">{{ node.label }}</span>
                            <span class="ic">
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
            <el-tab-pane label="播放列表"></el-tab-pane>
            <el-tab-pane label="视频轮巡"></el-tab-pane>
            <el-tab-pane label="快捷播放"></el-tab-pane>
        </el-tabs>
        <AddBookmark ref="dlgAddBookmark"/>
    </div>
</template>

<script>
    import AddBookmark from '@/components/security/video/DlgAddBookmark'
    export default {
        props: {
            tabIndex: String
        },
        data () {
            return {
                search: null,
                treeList: [],
                treeProps: {
                    children: 'children',
                    label: 'label',
                    isLeaf: 'leaf'
                }
                
            }
        },
        mounted () {
            this.findBookmark()
        },
        methods: {
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
            // 删除收藏夹
            del (data, e) {
                e.stopPropagation()
                this.$$confirm({
                    message: '确认删除？'
                }).then(() => {
                    this.$securityApi.video.delBookmark({
                        ids: [data.id]
                    }).then(res => {
                        if (res.code == 1000) {
                            this.$$notify({
                                message: '删除成功'
                            })
                            this.findBookmark()
                        } else {
                            this.$$message({
                                message: res.message
                            })
                        }
                    })
                }).catch(() => {})
            },
            // 查询收藏夹
            findBookmark () {
                this.$securityApi.video.findBookmark({
                    search: this.search
                }).then(res => {
                    if (res.code == 1000) {
                        this.treeList = []
                        res.data.forEach(v => {
                            
                            let children = []
                            v.videoFavoriteQuicks.forEach(c => {
                                children.push({
                                    key: `videoId-${v.id}-${c.equipMonitorVo.id}`,
                                    id: c.equipMonitorVo.id,
                                    label: c.equipMonitorVo.name,
                                    leaf: true,
                                    __data: c.equipMonitorVo
                                })
                            })

                            this.treeList.push({
                                key: `bookmarkId-${v.id}`,
                                id: v.id,
                                label: v.favoriteName,
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
            // 添加添加窗口
            openAddDlg (data, e) {
                e && e.stopPropagation()
                this.$refs.dlgAddBookmark.open(() => {
                    this.findBookmark()
                }, data)
            },
            handleTab (tab) {
                (this.tabIndex != tab.index) && this.$emit('handleTab', tab.index)
            }
        },
        components: {
            AddBookmark
        }
    }
</script>