<template>
    <div class="video-index" :class="collapse ? 'collapse' : ''">
        <!-- left-bar -->
        <img class="video-index-collapse-btn" src="/static/images/security-video-index2.png" v-if="collapse" style="left: 0" @click="collapse = !collapse"/>
        <img class="video-index-collapse-btn" src="/static/images/security-video-index.png" v-if="!collapse" @click="collapse = !collapse"/>
        <LeftBar1 v-show="tabIndex == 0" :tabIndex="tabIndex" @handleTab="(index)=>{ tabIndex = index}"/>
        <LeftBar2 v-show="tabIndex == 1" :tabIndex="tabIndex" @handleTab="(index)=>{ tabIndex = index}"/>
        <LeftBar3 v-show="tabIndex == 2" :tabIndex="tabIndex" @handleTab="(index)=>{ tabIndex = index}"/>
        <LeftBar4 v-show="tabIndex == 3" :tabIndex="tabIndex" @handleTab="(index)=>{ tabIndex = index}"/>
        <LeftBar5 v-show="tabIndex == 4" :tabIndex="tabIndex" @handleTab="(index)=>{ tabIndex = index}"/>
        <!-- right bar -->
        <div class="right-bar">
            <div :class="`video-list row${row}`">
                <ul class="clear">
                    <li class="video-item" v-for="(lst, index) in count" :key="index">
                        <video src="http://www.w3school.com.cn/i/movie.ogg" :ref="`videoItem${index}`"></video>
                        <div class="layer">
                            <i class="icon-x-bofang video-btn" v-if="playedList.indexOf(index) == -1" @click="playVideo(index)"></i>
                            <i class="icon-x-zanting video-btn" v-if="playedList.indexOf(index) != -1" @click="pauseVideo(index)"></i>
                            <el-button class="close-main" type="info" icon="icon-x-yyguanbi2" circle></el-button>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="styles">
                <span>视图模式</span>
                <span class="grid">
                    <i class="icon-x-shixinzhengfangxing" :class="row == 1 ? 'active' : ''" @click="selectRow(1)"></i>
                    <i class="icon-x-ic_mode_block" :class="row == 2 ? 'active' : ''" @click="selectRow(2)"></i>
                    <i class="icon-x-iconfontzhizuobiaozhun0247" :class="row == 3 ? 'active' : ''" @click="selectRow(3)"></i>
                </span>
                <el-button type="primary" class="custom-mini">保存当前状态</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import '@/style/security/video.less'
    import LeftBar1 from '@/components/security/video/VideoIndexCategory1'
    import LeftBar2 from '@/components/security/video/VideoIndexCategory2'
    import LeftBar3 from '@/components/security/video/VideoIndexCategory3'
    import LeftBar4 from '@/components/security/video/VideoIndexCategory4'
    import LeftBar5 from '@/components/security/video/VideoIndexCategory5'
    export default {
        data () {
            return {
                collapse: false,
                tabIndex: '0',
                row: 3,
                playedList: [],
                count: new Array(10),
            }
        },
        created () {
            
        },
        methods: {
            selectRow (row) {
                this.row = row
            },
            playVideo (index) {
                this.$refs[`videoItem${index}`][0].play()
                this.playedList.push(index)
            },
            pauseVideo (index) {
                this.$refs[`videoItem${index}`][0].pause()
                this.playedList.splice(this.playedList.findIndex(v => {
                    return v == index
                }), 1)
            }
        },
        components: {
            LeftBar1,
            LeftBar2,
            LeftBar3,
            LeftBar4,
            LeftBar5
        }
    }
</script>