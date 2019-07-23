<template>
	<el-dialog title="事件详情" center :visible.sync="visible" width="700px" append-to-body>
        <el-row class="detail">
            <el-col :span="12" class="info">
                <div class="header">
                    <h3>报修信息</h3>
                </div>
                <dl>
                    <dd>
                        <label>事件名</label>
                        <div class="content">广元公寓1幢1单元停电</div>
                    </dd>
                    <dd>
                        <label>发生时间</label>
                        <div class="content">2019-03-05 12:14:56 </div>
                    </dd>
                    <dd>
                        <label>上报人</label>
                        <div class="content">章程(0301业主)</div>
                    </dd>
                    <dd>
                        <label>手机号码</label>
                        <div class="content">1306666666</div>
                    </dd>
                    <dd>
                        <label>发生地点</label>
                        <div class="content">1幢1单元</div>
                    </dd>
                    <dd>
                        <label>事件类型</label>
                        <div class="content">消防</div>
                    </dd>
                    <dd>
                        <label>紧急程度</label>
                        <div class="content">一般</div>
                    </dd>
                    <dd>
                        <label>事件内容</label>
                        <div class="content">
                            <p>1幢1单元停电</p>
                            <div>
                                <img src="" alt="">
                            </div>
                        </div>
                    </dd>
                    <dd>
                        <label>事件状态</label>
                        <div class="content">预案处理</div>
                    </dd>
                    <dd>
                        <label>指派人员</label>
                        <div class="content">周王（1301568788）</div>
                    </dd>
                    <dd>
                        <label>处理时间</label>
                        <div class="content">2019-03-05 12：14：54</div>
                    </dd>
                    <dd>
                        <label>结束时间</label>
                        <div class="content">2019-03-05 12：14：54</div>
                    </dd>
                </dl>
            </el-col>
            <el-col :span="12" class="process">
                <div class="header">
                    <h3>事件动态</h3>
                    <el-link type="danger" :underline="false">结束</el-link>
                </div>
                <div class="process-list">
                    <dl>
                        <dt>
                            <span>已处理</span>
                            <!-- <el-link type="primary" :underline="false" style="float:right;">
                                <i class="el-icon-caret-bottom"></i>
                            </el-link> -->
                        </dt>
                        <dd>
                            <p class="name">张三<font>（13幢1单元2101室）</font></p>
                            <p class="des">我家突然停电了，请尽快处理~</p>
                            <div class="pic clear">
                                <img src="" alt="">
                                <img src="" alt="">
                                <img src="" alt="">
                            </div>
                            <div class="time">
                                <i class="icon-x-shijian"></i>2019-03-05 12:14:56
                            </div>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            <span>处理中</span>
                        </dt>
                        <dd>
                            <p class="name">张三<font>（13幢1单元2101室）</font></p>
                            <p class="des">我家突然停电了，请尽快处理~</p>
                            <div class="pic clear">
                                <img src="" alt="">
                                <img src="" alt="">
                                <img src="" alt="">
                            </div>
                            <div class="time">
                                <i class="icon-x-shijian"></i>2019-03-05 12:14:56
                            </div>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            <span>处理中</span>
                        </dt>
                        <dd>
                            <p class="name">张三<font>（13幢1单元2101室）</font></p>
                            <p class="des">我家突然停电了，请尽快处理~</p>
                            <div class="pic clear">
                                <img src="" alt="">
                                <img src="" alt="">
                                <img src="" alt="">
                            </div>
                            <div class="time">
                                <i class="icon-x-shijian"></i>2019-03-05 12:14:56
                            </div>
                        </dd>
                    </dl>
                </div>
            </el-col>
        </el-row>
    </el-dialog>
</template>

<script>
    export default {
        data () {
            return {
                visible: false
            }
        },
        methods: {
            open () {
                this.visible = true
            },
            close () {
                this.visible = false
            }
        },
        components: {
            
        }
    }
</script>

<style scoped>
    .detail {

    }
    .detail .header {
        display: flex;
        justify-content: space-between;
    }
    .detail .header h3 {
        font-size: 16px;
        color: #333;
    }
    .detail .info {
        border-right: 1px solid #F0EFEE;
    }
    .detail .info dl {
        padding-top: 25px;
    }
    .detail .info dd {
        margin-bottom: 20px;
        font-size: 14px;
        position: relative;
        padding-left: 75px;
    }
    .detail .info dd label {
        color: #909090;
        position: absolute;
        left: 0;
    }
    .detail .info dd .content {
        color: #333;
    }
    .detail .process {
        /* padding: 0 18px; */
    }
    .detail .process .header {
        margin: 0 18px;
        padding-bottom: 15px;
        margin-bottom: 15px;
        border-bottom: 1px solid #F0EFEE;
    }
    .process-list {
        padding: 0 18px 0 38px;
        height: 483px;
        overflow: auto;
    }
    .process-list dl {
        margin-bottom: 30px;
        border: 1px solid #F7F6F5;
        color: #333;
        position: relative;
    }
    .process-list dt:before,.process-list dl:before {
        content: "";
        display: block;
        position: absolute;
    }
    .process-list dl:before {
        width: 2px;
        top: 19px;
        left: -17px;
        background: #F79623;
        bottom: -45px;
    }
    .process-list dl:last-of-type::before {
        display: none;
    }
    .process-list dt:before {
        width: 8px;
        height: 8px;
        background: #F79623;
        box-shadow: 0 0 3px #F79623;
        border-radius: 50%;
        top: 50%;
        margin-top: -4px;
        left: -20px;
    }
    .process-list dt {
        height: 30px;
        line-height: 30px;
        padding: 0 13px;
        display: flex;
        justify-content: space-between;
        background: #F7F6F5;
        position: relative;
    }
    .process-list dt span {
        font-size: 14px;
    }
    .process-list dd {
        padding: 15px;
        font-size: 12px;
    }
    .process-list dd .name font {
        color: #aaa;
    }
    .process-list dd .des {
        margin: 10px 0;
    }
    .process-list dd .pic {
        margin-bottom: 10px;
    }
    .process-list dd .pic img {
        width: 60px;
        height: 60px;
        display: block;
        background: #EEE;
        border-radius: 4px;
        float: left;
        margin-right: 8px;
    }
    .process-list dd .time {
        color: #aaa;
        font-size: 12px;
    }
    .process-list dd .time i {
        margin-right: 7px;
        font-size: 12px;
    }
</style>
