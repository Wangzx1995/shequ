<template>
    <div class="video-index" :class="collapse ? 'collapse' : ''">
        <!-- left-bar -->
        <img class="video-index-collapse-btn" src="/static/images/security-video-index2.png" v-if="collapse" style="left: 0" @click="collapse = !collapse"/>
        <img class="video-index-collapse-btn" src="/static/images/security-video-index.png" v-if="!collapse" @click="collapse = !collapse"/>
        <LeftBar1 v-show="tabIndex == 0" :tabIndex="tabIndex" @handleTab="(index)=>{ tabIndex = index}"/>
        <LeftBar2 v-show="tabIndex == 1" :tabIndex="tabIndex" @handleTab="(index)=>{ tabIndex = index}"/>
        <LeftBar3 v-show="tabIndex == 2" :tabIndex="tabIndex" @handleTab="(index)=>{ tabIndex = index}" :list="rightVideoList"/>
        <LeftBar4 v-show="tabIndex == 3" :tabIndex="tabIndex" @handleTab="(index)=>{ tabIndex = index}" :list="patrolList"/>
        <LeftBar5 v-show="tabIndex == 4" :tabIndex="tabIndex" @handleTab="(index)=>{ tabIndex = index}"/>
        <!-- right bar -->
        <div class="right-bar">
            <div :class="`video-list row${row}`">
                <!-- 轮巡播放列表 -->
                <ul class="clear" v-if="isPatrol == 2">
                    <li class="video-item" v-for="(lst, index) in patrolTaskList" :key="index">
                        <video class="video" v-if="lst.m3u8url" :src="lst.m3u8url" :ref="`videoItem${lst.id}`" autoplay></video>
                        <div class="layer">
                            <i class="icon-x-bofang video-btn" v-if="rightPlayedIds.indexOf(lst.id) == -1" @click="playVideo(lst.id)"></i>
                            <i class="icon-x-zanting video-btn" v-if="rightPlayedIds.indexOf(lst.id) != -1" @click="pauseVideo(lst.id)"></i>
                            <el-button class="close-main" type="info" icon="icon-x-yyguanbi2" circle @click="delPlay(lst.id)"></el-button>
                        </div>
                    </li>
                </ul>
                <!-- 自由播放列表 -->
                <ul class="clear" v-else>
                    <li class="video-item" v-for="(lst, index) in (rightVideoList.length ? rightVideoList : 4)" :key="index">
                        <video class="video" v-if="lst.m3u8url" :src="lst.m3u8url" :ref="`videoItem${lst.id}`" autoplay></video>
                        <div class="video" v-else></div>
                        <div class="layer">
                            <i class="icon-x-bofang video-btn" v-if="rightPlayedIds.indexOf(lst.id) == -1" @click="playVideo(lst.id)"></i>
                            <i class="icon-x-zanting video-btn" v-if="rightPlayedIds.indexOf(lst.id) != -1" @click="pauseVideo(lst.id)"></i>
                            <el-button class="close-main" type="info" icon="icon-x-yyguanbi2" circle @click="delPlay(lst.id)"></el-button>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="styles">
                <span>视图模式</span>
                <span class="grid">
                    <i class="icon-x-shixinzhengfangxing" :class="row == 1 ? 'active' : ''" @click="setRow(1)"></i>
                    <i class="icon-x-ic_mode_block" :class="row == 2 ? 'active' : ''" @click="setRow(2)"></i>
                    <i class="icon-x-iconfontzhizuobiaozhun0247" :class="row == 3 ? 'active' : ''" @click="setRow(3)"></i>
                    <i class="icon-x-shitumoshi_x" :class="row == 4 ? 'active' : ''" @click="setRow(4)"></i>
                </span>
                <el-button type="primary" class="custom-mini" @click="saveCurrentPlayList">保存当前状态</el-button>
            </div>
        </div>
        <CollectionVideo ref="dlgCollectionVideo"/>
        <SaveCurrentPlayList ref="dlgSaveCurrentPlayList"/>
    </div>
</template>

<script>
    import '@/style/security/video.less'
    import LeftBar1 from '@/components/security/video/VideoIndexCategory1'
    import LeftBar2 from '@/components/security/video/VideoIndexCategory2'
    import LeftBar3 from '@/components/security/video/VideoIndexCategory3'
    import LeftBar4 from '@/components/security/video/VideoIndexCategory4'
    import LeftBar5 from '@/components/security/video/VideoIndexCategory5'

    import CollectionVideo from '@/components/security/video/DlgCollectionVideo'
    import SaveCurrentPlayList from '@/components/security/video/DlgSaveCurrentPlayList'
    
    import bus from '@/components/bus'
import { clearInterval } from 'timers';

    export default {
        name:'security-video-index',
        data () {
            return {
                collapse: false,
                tabIndex: '0',
                row: 4,
                // 播放模式 0 为否  1为正在选择轮巡  2为轮巡播放模式
                isPatrol: 0,
                // 轮巡任务
                patrolInterval: null,
                // 右侧播放列表(初始4个界面)
                rightVideoList: [],
                // 右侧播放中的视频id
                rightPlayedIds: [],
                // 用户已收藏的视频列表
                collectionList: [],
                // 轮巡队列
                patrolList: [],
                // 轮巡播放列表
                patrolTaskList: [],

                hlsMap: {}
            }
        },
        created () {
            this.findCollectionVideo()
        },
        beforeDestroy () {
            for (let k in this.hlsMap) {
                this.hlsMap[k].destroy()
                delete this.hlsMap[k]
            }
        },
        watch: {
            // 轮巡队列
            'patrolTaskList' () {
                this.rightPlayedIds = []
                for (let k in this.hlsMap) {
                    this.hlsMap[k].destroy()
                    delete this.hlsMap[k]
                }
                this.$nextTick(() => {
                    this.patrolTaskList.forEach(v => {
                        let hls = null
                        if (this.hlsMap[v.id]) {
                            hls = this.hlsMap[v.id]
                        } else {
                            hls = new Hls()
                            this.hlsMap[v.id] = hls
                        }
                        let videoEle = this.$refs[`videoItem${v.id}`][0]
                        hls.loadSource(v.m3u8url)
                        hls.attachMedia(videoEle)
                        hls.on(Hls.Events.MANIFEST_PARSED, () => {
                            // 默认是播放状态
                            this.rightPlayedIds.push(v.id)
                        })
                        
                    })
                })
            },
            // 播放队列
            'rightVideoList' () {
                this.rightPlayedIds = []
                for (let k in this.hlsMap) {
                    this.hlsMap[k].destroy()
                    delete this.hlsMap[k]
                }
                this.$nextTick(() => {
                    this.rightVideoList.forEach(v => {
                        let hls = null
                        if (this.hlsMap[v.id]) {
                            hls = this.hlsMap[v.id]
                        } else {
                            hls = new Hls()
                            this.hlsMap[v.id] = hls
                        }
                        let videoEle = this.$refs[`videoItem${v.id}`][0]
                        hls.loadSource(v.m3u8url)
                        hls.attachMedia(videoEle)
                        hls.on(Hls.Events.MANIFEST_PARSED, () => {
                            // videoEle.play()
                            // 默认是播放状态
                            this.rightPlayedIds.push(v.id)
                        })
                        
                    })
                })
            }
        },
        methods: {
            // 设置播放个数
            setRow (row) {
                this.row = row
                this.patrolTask()
            },
            // 轮巡任务
            patrolTask () {
                
                let pageTotal = Math.pow(this.row, 2)
                // 可分页数
                let page = Math.ceil(this.patrolList.length / pageTotal)
                let count = 0
                this.patrolTaskList = this.patrolList.slice(pageTotal * count, pageTotal * count + pageTotal)
                if (pageTotal < this.patrolList.length) {
                    count ++
                    if (this.patrolInterval) {
                        window.clearInterval(this.patrolInterval)
                    }
                    this.patrolInterval = setInterval(() => {
                        console.log(pageTotal * count, pageTotal * count + pageTotal)
                        // 截取页数
                        this.patrolTaskList = this.patrolList.slice(pageTotal * count, pageTotal * count + pageTotal)
                        if (count == page - 1) {
                            count = 0
                        } else {
                            count ++
                        }
                    }, 8000)
                }
            },
            // 停止轮巡
            endPatrol () {
                this.patrolList = []
                this.isPatrol = 0
            },
            // 添加轮巡队列
            addPatrolList (videoList) {
                videoList.forEach(v => {
                    const index = this.patrolList.findIndex(v2 => {
                        return v2.id == v.id
                    })
                    if (index == -1) {
                        this.patrolList.unshift(v)
                    } else {
                        
                        // 当前选择的视频置前
                        this.patrolList.splice(index, 1)
                        this.patrolList.unshift(v)
                    }
                })
                this.patrolTask()
                this.isPatrol = 2
            },
            // 保存当前状态
            saveCurrentPlayList () {
                if (this.rightVideoList.length) {
                    this.$refs.dlgSaveCurrentPlayList.open(this.rightVideoList, () => {
                        bus.$emit('updateVideoQuickList')
                    })
                } else {
                    this.$$message({
                        message: '没有可操作状态'
                    })
                }
            },
            // 播放视频
            playVideo (videoId) {
                // this.hlsMap[videoId].startLoad()
                this.$refs[`videoItem${videoId}`][0].play()
                this.rightPlayedIds.push(videoId)
            },
            // 暂停视频
            pauseVideo (videoId) {
                // this.hlsMap[videoId].stopLoad()
                this.$refs[`videoItem${videoId}`][0].pause()
                // this.$refs[`videoItem${videoId}`][0].currentTime = this.$refs[`videoItem${videoId}`][0].duration - 0.1
                this.rightPlayedIds.splice(this.rightPlayedIds.findIndex(v => {
                    return v == videoId
                }), 1)
            },
            // 删除视频队列
            delPlay (videoId) {
                // 删除播放队列
                const index = this.rightVideoList.findIndex(v => {
                    return v.id == videoId
                })
                this.rightVideoList.splice(index, 1)
                // 删除播放id列表
                const idIndex = this.rightPlayedIds.indexOf(videoId)
                idIndex != -1 && this.rightPlayedIds.splice(idIndex, 1)

                this.hlsMap[videoId].destroy()
                delete this.hlsMap[videoId]
            },
            // 清空播放队列
            closeAll () {
                this.rightVideoList = []
                this.rightPlayedIds = []
            },
            // 添加视频刚才右侧播放队列
            addPlay (video) {
                // 轮巡状态时不允许添加播放
                if (this.isPatrol == 0) {

                    const index = this.rightVideoList.findIndex(v => {
                        return v.id == video.id
                    })
                    // 添加播放
                    if (index == -1) {
                        /*// 最多不能超过row的平方
                        if (this.rightVideoList.length > Math.pow(this.row, 2)) {
                            this.rightVideoList.splice(this.rightVideoList.length, 1)
                        }*/
                        this.rightVideoList.unshift(video)
                    } else {
                        // 当前选择的视频置前
                        this.rightVideoList.splice(index, 1)
                        this.rightVideoList.unshift(video)
                    }
                } else if (this.isPatrol == 2) {
                    this.$$confirm({
                        message: '请先结束轮巡'
                    }).then(() => {
                        this.tabIndex = '3'
                    }).catch(() => {})
                }
            },
            // 查询用户收藏的监控
            findCollectionVideo () {
                this.$securityApi.video.findCollectionVideo().then(res => {
                    if (res.code == 1000) {
                        this.collectionList = res.data
                    }
                })
            },
            // 添加收藏
            addCollect (videoIds) {
                this.$refs.dlgCollectionVideo.open(videoIds, () => {
                    this.findCollectionVideo()
                })
            },
            // 取消收藏
            cancelCollect (videoIds) {
                let ids = []
                videoIds.forEach(videoId => {
                    const item = this.collectionList.find(v => {
                        return v.videoId == videoId
                    })
                    if (item) {
                        ids.push(item.id)
                    }
                })
                this.$securityApi.video.delVideoToBookmark({
                    ids
                }).then(res => {
                    if (res.code == 1000) {
                        this.$$notify({
                            message: '取消成功'
                        })
                        this.findCollectionVideo()
                    } else {
                        this.$$message({
                            message: res.message
                        })
                    }
                })
            },
            // 判断收藏状态
            getCollectStatus (node, isTree) {
                // 监控目录中的视频以及其他都是单个操作
                if (!isTree || (isTree && node.level == 4)) {
                    return this.collectionList.findIndex(v => {
                        return v.videoId == node.data.id
                    }) != -1
                } else {
                    let res = true
                    // 片区操作
                    if (node.level == 1) {
                        node.data.__data.buildingList.forEach(v => {
                            if (!res) return
                            v.elementList.forEach(v2 => {
                                if (!res) return
                                v2.equipMonitorList.forEach(v3 => {
                                    if (!res) return
                                    if (this.collectionList.findIndex(v4 => {
                                        return v4.videoId == v3.id
                                    }) == -1) {
                                        res = false
                                    }
                                })
                            })
                        })
                    }
                    // 楼幢
                    else if (node.level == 2) {
                        node.data.__data.elementList.forEach(v2 => {
                            if (!res) return
                            v2.equipMonitorList.forEach(v3 => {
                                if (!res) return
                                if (this.collectionList.findIndex(v4 => {
                                    return v4.videoId == v3.id
                                }) == -1) {
                                    res = false
                                }
                            })
                        })
                    }
                    // 单元
                    else if (node.level == 3) {
                        node.data.__data.equipMonitorList.forEach(v3 => {
                            if (!res) return
                            if (this.collectionList.findIndex(v4 => {
                                return v4.videoId == v3.id
                            }) == -1) {
                                res = false
                            }
                        })
                    }
                    return res
                }
            },
        },
        components: {
            LeftBar1,
            LeftBar2,
            LeftBar3,
            LeftBar4,
            LeftBar5,
            CollectionVideo,
            SaveCurrentPlayList
        }
    }
</script>