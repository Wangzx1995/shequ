<template>
    <div>
        <!-- 事件数量 -->
        <div class="flex section1">
            <!-- 待办事件 -->
            <div class="item item1">
                <h3>待办事件</h3>
                <div class="flex">
                    <div>
                        <el-link type="primary" :underline="false">
                            <strong>21</strong>
                        </el-link>
                        <p class="title">消防事件</p>
                    </div>
                    <div>
                        <el-link type="primary" :underline="false">
                            <strong>21</strong>
                        </el-link>
                        <p class="title">治安事件</p>
                    </div>
                    <div>
                        <el-link type="primary" :underline="false">
                            <strong>5</strong>
                        </el-link>
                        <p class="title">其他事件</p>
                    </div>
                </div>
            </div>
            <!-- 设备故障 -->
            <div class="item item2">
                <h3>设备故障</h3>
                <div class="flex">
                    <div>
                        <i class="icon-x-jiankong1" style="background:rgba(48,181,243,1);"></i>
                        <div class="info">
                            <div>
                                <span>离线监控</span>
                                <font color="#30b5f3">15</font>
                            </div>
                        </div>
                    </div>
                    <div>
                        <i class="icon-x-menjin" style="background:rgba(243,195,48,1);"></i>
                        <div class="info">
                            <div>
                                <span>离线门禁</span>
                                <font color="#f3c330">15</font>
                            </div>
                        </div>
                    </div>
                    <div>
                        <i class="icon-x-xiaofang" style="background:rgba(97,152,242,1);"></i>
                        <div class="info">
                            <div>
                                <span>离线消防</span>
                                <font color="#6198f2">15</font>
                            </div>
                            <div>
                                <span>故障消防</span>
                                <font color="#6198f2">15</font>
                            </div>
                        </div>
                    </div>
                    <div>
                        <i class="icon-x-chongdianzhuang" style="background:rgba(165,97,242,1);"></i>
                        <div class="info">
                            <div>
                                <span>离线充电桩</span>
                                <font color="#a561f2">15</font>
                            </div>
                            <div>
                                <span>故障充电桩</span>
                                <font color="#a561f2">15</font>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 应急预案 -->
            <div class="item item3">
                <h3>应急预案</h3>
                <div class="flex">
                    <div>
                        <el-link type="primary" :underline="false">
                            <strong>52</strong>
                        </el-link>
                        <p class="title">待审核</p>
                    </div>
                    <div>
                        <el-link type="primary" :underline="false">
                            <strong>5</strong>
                        </el-link>
                        <p class="title">未编制</p>
                    </div>
                    <div>
                        <el-link type="primary" :underline="false">
                            <strong>5</strong>
                        </el-link>
                        <p class="title">已启动</p>
                    </div>
                </div>
            </div>
        </div>
        <!-- 监控 -->
        <div class="flex section2">
            <!-- 公用监控 -->
            <div class="item item1">
                <el-tree
                    :data="data"
                    node-key="id"
                    :props="defaultProps"
                >
                    <span slot-scope="{ node, data }">
                        <template v-if="data.label.indexOf('二级') != -1">
                            <i class="icon-x-building" style="color: #1779ec"></i>&nbsp;{{ node.label }}
                        </template>
                        <template v-else>{{ node.label }}</template>
                    </span>
                </el-tree>
            </div>
            <!-- 预览区 -->
            <div class="item item2">
                <!-- 视频预览 -->
                <div class="video-list">
                    <ul class="clear">
                        <li class="video-item" v-for="(lst, index) in count" :key="index">
                            <video src="http://www.w3school.com.cn/i/movie.ogg" :ref="`videoItem${index}`"></video>
                            <div class="layer">
                                <i class="icon-x-bofang video-btn" v-if="playedList.indexOf(index) == -1" @click="playVideo(index)"></i>
                                <i class="icon-x-zanting video-btn" v-if="playedList.indexOf(index) != -1" @click="pauseVideo(index)"></i>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <!-- 预案 -->
            <div class="item item3">
                <div class="inner">
                    <dl>
                        <dt class="icon-x-jingbao c1"></dt>
                        <dd>
                            <div>
                                <span>火灾I级</span>
                                <font>2019-05-01 15:12:14</font>
                            </div>
                            <p>三单元11幢楼发生了火灾请尽快敢去救火三单元11幢楼发生了火灾请尽快敢去救火</p>
                        </dd>
                    </dl>
                    <dl>
                        <dt class="icon-x-jingbao c2"></dt>
                        <dd>
                            <div>
                                <span>火灾I级</span>
                                <font>2019-05-01 15:12:14</font>
                            </div>
                            <p>三单元11幢楼发生了火灾请尽快敢去救火...</p>
                        </dd>
                    </dl>
                    <dl>
                        <dt class="icon-x-jingbao c3"></dt>
                        <dd>
                            <div>
                                <span>火灾I级</span>
                                <font>2019-05-01 15:12:14</font>
                            </div>
                            <p>三单元11幢楼发生了火灾请尽快敢去救火...</p>
                        </dd>
                    </dl>
                    <dl>
                        <dt class="icon-x-jingbao c1"></dt>
                        <dd>
                            <div>
                                <span>火灾I级</span>
                                <font>2019-05-01 15:12:14</font>
                            </div>
                            <p>三单元11幢楼发生了火灾请尽快敢去救火...</p>
                        </dd>
                    </dl>
                    <dl>
                        <dt class="icon-x-jingbao c2"></dt>
                        <dd>
                            <div>
                                <span>火灾I级</span>
                                <font>2019-05-01 15:12:14</font>
                            </div>
                            <p>三单元11幢楼发生了火灾请尽快敢去救火...</p>
                        </dd>
                    </dl>
                    <dl>
                        <dt class="icon-x-jingbao c3"></dt>
                        <dd>
                            <div>
                                <span>火灾I级</span>
                                <font>2019-05-01 15:12:14</font>
                            </div>
                            <p>三单元11幢楼发生了火灾请尽快敢去救火...</p>
                        </dd>
                    </dl>
                    <dl>
                        <dt class="icon-x-jingbao c1"></dt>
                        <dd>
                            <div>
                                <span>火灾I级</span>
                                <font>2019-05-01 15:12:14</font>
                            </div>
                            <p>三单元11幢楼发生了火灾请尽快敢去救火三单元11幢楼发生了火灾请尽快敢去救火</p>
                        </dd>
                    </dl>
                </div>
            </div>
        </div>
        <!-- 进出记录 -->
        <div class="flex section3">
            <!-- 车辆进出 -->
            <div class="item item1">
                <div class="header">
                    <span>车辆进出<font>（车次）</font></span>
                    <el-link type="primary">更多</el-link>
                </div>
                <el-table
                    class="center"
                    :data="tableData"
                    border
                    :show-header="false"
                    stripe
                >
                    <el-table-column
                        prop="c1"
                    />
                    <el-table-column
                        prop="c2"
                    />
                    <el-table-column
                        prop="c3"
                    />
                    <el-table-column
                        prop="c4"
                    />
                    <el-table-column
                        prop="c5"
                    />
                </el-table>
            </div>
            <!-- 人员进出 -->
            <div class="item item2">
                <div class="header">
                    <span>人员进出<font>（人次）</font></span>
                    <el-link type="primary">更多</el-link>
                </div>
                <el-table
                    class="center"
                    :data="tableData"
                    border
                    :show-header="false"
                    stripe
                >
                    <el-table-column
                        prop="c1"
                    />
                    <el-table-column
                        prop="c2"
                    />
                    <el-table-column
                        prop="c3"
                    />
                    <el-table-column
                        prop="c4"
                    />
                    <el-table-column
                        prop="c5"
                    />
                </el-table>
            </div>
            <!-- 电动车进出 -->
            <div class="item item3">
                <div class="header">
                    <span>电动车进出<font>（车次）</font></span>
                    <el-link type="primary">更多</el-link>
                </div>
                <el-table
                    class="center"
                    :data="tableData"
                    border
                    :show-header="false"
                    stripe
                >
                    <el-table-column
                        prop="c1"
                    />
                    <el-table-column
                        prop="c2"
                    />
                    <el-table-column
                        prop="c3"
                    />
                    <el-table-column
                        prop="c4"
                    />
                    <el-table-column
                        prop="c5"
                    />
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tableData: [{
                c1: 1,
                c2: 2,
                c3: 3,
                c4: 4,
                c5: 5
            },{
                c1: 1,
                c2: 2,
                c3: 3,
                c4: 4,
                c5: 5
            },{
                c1: 1,
                c2: 2,
                c3: 3,
                c4: 4,
                c5: 5
            },{
                c1: 1,
                c2: 2,
                c3: 3,
                c4: 4,
                c5: 5
            }],
            playedList: [],
            count: new Array(10),
        data: [{
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
    created() {},
    methods: {
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

    }
}
</script>

<style lang="less" scoped>
    .item {
        border:1px solid rgba(236,234,231,1);
        border-radius:4px;
        background: #fff;
    }
    .section1 {
    }
    .section1 .item > div {
        padding: 27px 0;
    }
    .section1 h3 {
        font-size:18px;
        background:rgba(252,249,246,1);
        text-align: center;
        height:40px;
        line-height: 40px;
        font-weight:400;
    }
    .section1 strong {
        font-size:30px;
    }
    .section1 .item1,.section1 .item3,.section2 .item1,.section2 .item3 {
        width: 25%;
        max-width: 425px;
        text-align: center;
        flex: unset;
    }
    .section1 .item2,.section2 .item2 {
        flex: 1;
        margin: 0 16px;
        text-align: center;
    }
    .section1 .item2 > .flex > div {
        position: relative;
        padding: 0 5px;
        width: 25%;
        box-sizing: border-box;
        flex: unset;
    }
    .section1 .item2 > .flex > div:after {
        content: "";
        display: block;
        width: 1px;
        height: 100%;
        position: absolute;
        right: 0;
        top: 0;
        background: rgba(236,234,231,1);
    }
    .section1 .item2 > .flex > div:last-of-type:after {
        display: none;
    }
    .section1 .item2 [class*="icon-x-"] {
        display: inline-block;
        width: 56px;
        height: 56px;
        line-height: 56px;
        text-align: center;
        color: #fff;
        border-radius: 50%;
        font-size: 30px;
        vertical-align: middle;
    }
    .section1 .item2 .info {
        display: inline-block;
        vertical-align: middle;
        margin-left: 10px;
    }
    .section1 .item2 .info span {
        margin-right: 10px;
        font-size: 14px;
        vertical-align: middle;
    }
    .section1 .item2 .info font {
        font-size: 20px;
        font-weight: 500;
        vertical-align: middle;
    }
    .section1 .title {
        font-size: 14px;
    }
    .section2 {
        margin: 16px 0;
    }
    .section2 .item1,.section2 .item3 {
        height: 450px;
        padding: 30px;
        box-sizing: border-box;
        overflow: auto;
    }
    .section2 .item2 {
        // padding: 10px 0 10px 10px;
        box-sizing: border-box;
    }
    
    .video-list {
        height: 448px;
        overflow: hidden;
        overflow-y: auto;
    }
    .video-list ul {
        margin: 10px 0;
    }
    .video-list .video-item {
        width: calc(50% - 15px);
        float: left;
        position: relative;
        margin: 10px 0 0 10px;
        border-radius: 4px;
        overflow: hidden;
    }
    .video-list .video-item:nth-child(1),.video-list .video-item:nth-child(2) {
        margin-top: 0;
    }
    .video-list .video-item:before {
        content: '';
        padding-top: calc(100% / 4 * 3);
        display: block;
    }
    .video-list .video-item video {
        display: block;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
    }
    .video-list .video-item .layer {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, .3);
        z-index: 2;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: .2s;
        &:hover {
            opacity: 1;
        }
    }
    .video-list .video-item .video-btn {
        font-size: 36px;
        color: #fff;
        cursor: pointer;
    }
    .section2 .item3 {
        padding: 0;
    }
    .section2 .item3 .inner {
        padding: 0 23px;
    }
    .section2 .item3 dl {
        position: relative;
        padding: 20px 0 20px 30px;
        border-bottom: 1px solid rgba(232,232,232,1);
    }
    .section2 .item3 dl:last-of-type {
        border: none;
    }
    .section2 .item3 dt {
        position: absolute;
        font-size: 18px;
        left: 0;
        color: #f7db43;
    }
    .section2 .item3 dt.c2 {
        color: #f79623;
    }
    .section2 .item3 dt.c3 {
        color: #f72328;
    }
    .section2 .item3 dd > div {
        display: flex;
        justify-content: space-between;
    }
    .section2 .item3 dd span {
        font-size: 16px;
        color: #000;
    }
    .section2 .item3 dd font {
        font-size:14px;
        color:rgba(154,154,154,1);
    }
    .section2 .item3 dd p {
        margin-top: 11px;
        font-size:14px;
        color:rgba(131,131,131,1);
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .section3 {
        
    }
    .section3 .item {
        padding: 15px 24px;
        // width: calc(100% / 3 - 48px);
        width: 0;
        box-sizing: border-box;
    }
    .section3 .item .header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
    }
    .section3 .item .header span {
        font-size:18px;
    }
    .section3 .item .header font {
        font-size:14px;
    }
    .section3 .item .header a {
        font-size:16px;
    }
    .section3 .item2 {
        margin: 0 16px;
    }
</style>

