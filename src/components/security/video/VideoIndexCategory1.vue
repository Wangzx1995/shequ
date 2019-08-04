<template>
    <div class="left-bar">
        <!-- search -->
        <div class="search-container">
            <el-input class="custom-mini">
                <i slot="suffix" class="el-input__icon icon-x-sousuo"></i>
            </el-input>
            <el-button size="mini" plain class="custom-mini" v-if="!showCheckBox" @click="selectPatrol">轮巡</el-button>
            <el-button size="mini" plain class="custom-mini" v-if="showCheckBox" @click="saveSelect">完成</el-button>
        </div>
        <!---->
        <el-tabs class="video-index-tabs" :value="tabIndex" tab-position="left" @tab-click="handleTab">
            <el-tab-pane label="监控目录" >
                <el-tree
                    ref="selectTree"
                    class="count"
                    :data="treeData"
                    :load="loadNode"
                    node-key="key"
                    lazy
                    :show-checkbox="showCheckBox"
                    :props="treeProps"
                >
                    <span class="custom-between-node" slot-scope="{ node, data }">
                        <span class="label" :class="(node.checked && node.isLeaf) ? 'color' : ''" @click="addPlay(data)">{{ node.label }}</span>
                        <span class="ic">
                            <i class="icon-x-shoucang1 on" v-if="$parent.getCollectStatus(node, true)" @click="toggleCollect(node, $event)"></i>
                            <i class="icon-x-shoucang off" v-else @click="toggleCollect(node, $event, 1)"></i>
                        </span>
                    </span>
                </el-tree>
            </el-tab-pane>
            <el-tab-pane label="收藏夹"></el-tab-pane>
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
                showCheckBox: false,
                treeData: [],
                treeProps: {
                    children: 'children',
                    label: 'label',
                    isLeaf: 'leaf'
                }
            }
        },
        mounted () {
            this.getRegionList()
        },
        methods: {
            // 加入播放
            addPlay (data) {
                if (data.leaf) {
                    // 选择轮巡
                    if (this.$parent.isPatrol == 1) {
                        let selectedIds = this.$refs.selectTree.getCheckedKeys()
                        let index = selectedIds.indexOf(data.key)
                        if (index == -1) {
                            selectedIds.push(data.key)
                        } else {
                            selectedIds.splice(index, 1)
                        }
                        this.$refs.selectTree.setCheckedKeys(selectedIds)
                    } else {
                        this.$parent.addPlay(data.__data)
                    }

                }
            },
            // 添加/取消收藏
            toggleCollect (node, $event, type) {
                $event.stopPropagation()
                let ids = []
                // 按片区收藏
                if (node.level == 1) {
                    node.data.__data.buildingList.forEach(v => {
                        v.elementList.forEach(v2 => {
                            v2.equipMonitorList.forEach(v3 => {
                                ids.push(v3.id)
                            })
                        })
                    })
                }
                // 按楼幢
                else if (node.level == 2) {
                    node.data.__data.elementList.forEach(v2 => {
                        v2.equipMonitorList.forEach(v3 => {
                            ids.push(v3.id)
                        })
                    })
                }
                // 按单元
                else if (node.level == 3) {
                    node.data.__data.equipMonitorList.forEach(v3 => {
                        ids.push(v3.id)
                    })
                }
                // 单个监控
                else if (node.level == 4) {
                    ids.push(node.data.id)
                }
                // 添加收藏
                if (type == 1) {
                    this.$parent.addCollect(ids)
                } else {
                    // 取消收藏
                    this.$parent.cancelCollect(ids)
                }
            },
            // 选择轮巡模式
            selectPatrol () {
                this.showCheckBox = true
                this.$parent.isPatrol = 1
            },
            // 保存已选择的数据
            saveSelect () {
                // this.showCheckBox = false
                let selectNodes = this.$refs.selectTree.getCheckedNodes()
                let videoList = []
                selectNodes.forEach(v => {
                    if (v.leaf) {
                        videoList.push(v.__data)
                    }
                })
                if (videoList.length) {
                    this.$parent.addPatrolList(videoList)
                }

                this.showCheckBox = false

            },
            // 查询片区列表
            getRegionList (callback) {
                this.$propertyApi.cascadeList.cascadeList().then(res => {
                    if (res.code == 1000) {
                        res.data.forEach(v => {
                            this.treeData.push({
                                key: `areaId-${v.areaId}`,
                                id: v.areaId,
                                label: v.areaName,
                                __data: v
                            })
                        })
                    } else {
                        this.$$message({
                            message: res.message
                        })
                    }
                })
            },
            // 加载tree子节点
            loadNode (node, resolve) {
                // 通过片区查询楼幢
                if (node.level == 1) {
                    let list = []
                    node.data.__data.buildingList.forEach(v => {
                        list.push({
                            key: `buildingId-${v.buildingId}`,
                            id: v.buildingId,
                            label: v.buildingName,
                            __data: v
                        })
                    })
                    resolve(list)
                } else if (node.level == 2) {
                    let list = []
                    node.data.__data.elementList.forEach(v => {
                        list.push({
                            key: `elementId-${v.elementId}`,
                            id: v.elementId,
                            label: v.elementName,
                            __data: v
                        })
                    })
                    resolve(list)
                } else if (node.level == 3) {
                    let list = []
                    node.data.__data.equipMonitorList.forEach(v => {
                        list.push({
                            key: `videoId-${v.id}`,
                            id: v.id,
                            label: v.name,
                            leaf: true,
                            __data: v
                        })
                    })
                    resolve(list)
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