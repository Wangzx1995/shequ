<template>
    <div>

        <el-dialog
            title="事件详情"
            center
            :visible.sync="dialogVisible"
            width="700px"
            :modal-append-to-body='false'
            @close="closeDialog()"
        >

            <el-row
                class="detail"
                v-if="form"
            >
                <el-col
                    :span="12"
                    class="info"
                >
                    <div class="header">
                        <h3>报修信息</h3>
                    </div>
                    <dl>
                        <dd>
                            <label>上报时间</label>
                            <div class="content">{{form.reportTime}}</div>
                        </dd>
                        <dd>
                            <label>上报人</label>
                            <div class="content">{{form.reportName}}</div>
                        </dd>
                        <dd>
                            <label>手机号码</label>
                            <div class="content">{{form.phone}}</div>
                        </dd>
                        <dd>
                            <label>详细地址</label>
                            <div class="content">{{form.address}}</div>
                        </dd>
                        <dd>
                            <label>报修类型</label>
                            <div class="content">
                                <DictionaryText
                                    :typeCode="1019"
                                    :dicCode="form.type"
                                />
                            </div>
                        </dd>
                        <dd>
                            <label>处理内容</label>
                            <div class="content">
                                <p>{{form.content}}</p>
                                <div
                                    class="img-list"
                                    v-if="imgList1.length"
                                >
                                    <img
                                        v-imgPreview
                                        :src="$joinImgPrefix(lst)"
                                        alt=""
                                        v-for="(lst, index) in imgList1"
                                        :key="index"
                                    >
                                </div>
                            </div>
                        </dd>
                        <dd>
                            <label>维修人员</label>
                            <div class="content">{{form.workerName}}</div>
                        </dd>
                        <dd>
                            <label>维修金额</label>
                            <div class="content">
                                <div class="content">{{form.money}}</div>
                            </div>
                        </dd>
                        <dd>
                            <label>结束时间</label>
                            <div class="content">{{form.endtime}}</div>
                        </dd>
                        <dd>
                            <label>处理结果</label>
                            <div class="content">{{status[form.status]}}</div>
                        </dd>
                    </dl>
                </el-col>
                <el-col
                    :span="12"
                    class="process"
                >
                    <div class="header">
                        <h3>处理流程</h3>
                        <!-- <el-link
                            type="danger"
                            :underline="false"
                            @click="openClose"
                        >结束</el-link> -->
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
                                <p class="name">张三<font>（13幢1单元2101室）</font>
                                </p>
                                <p class="des">我家突然停电了，请尽快处理~</p>
                                <div class="pic clear">
                                    <img
                                        src=""
                                        alt=""
                                    >
                                    <img
                                        src=""
                                        alt=""
                                    >
                                    <img
                                        src=""
                                        alt=""
                                    >
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
                                <p class="name">张三<font>（13幢1单元2101室）</font>
                                </p>
                                <p class="des">我家突然停电了，请尽快处理~</p>
                                <div class="pic clear">
                                    <img
                                        src=""
                                        alt=""
                                    >
                                    <img
                                        src=""
                                        alt=""
                                    >
                                    <img
                                        src=""
                                        alt=""
                                    >
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
                                <p class="name">张三<font>（13幢1单元2101室）</font>
                                </p>
                                <p class="des">我家突然停电了，请尽快处理~</p>
                                <div class="pic clear">
                                    <img
                                        src=""
                                        alt=""
                                    >
                                    <img
                                        src=""
                                        alt=""
                                    >
                                    <img
                                        src=""
                                        alt=""
                                    >
                                </div>
                                <div class="time">
                                    <i class="icon-x-shijian"></i>2019-03-05 12:14:56
                                </div>
                            </dd>
                        </dl>
                    </div>
                </el-col>
            </el-row>
            <div
                v-else
                class="com-loading-text"
            >数据加载中...</div>
            <div
                slot="footer"
                class="dialog-footer"
                style="text-align:center"
            >
                <el-button
                    type="primary"
                    plain
                    @click="openDispatchWork()"
                >派 工</el-button>
                <el-button
                    type="danger"
                    plain
                    @click="openClose()"
                >拒 绝</el-button>
            </div>
        </el-dialog>
        <eventCloseDialog ref="eventCloseDialog" />
        <dispatchWorkDialog ref="dispatchWorkDialog" />
    </div>
</template>

<script>
import DictionaryText from '@/components/common/select/DictionaryText'
import eventCloseDialog from "@/components/property/propertyWarranty/acceptAssignment/eventCloseDialog";
import dispatchWorkDialog from "@/components/property/propertyWarranty/acceptAssignment/dispatchWorkDialog";
export default {
    data() {
        return {
            dialogVisible: false,
            form: null,
            status: ['', '待受理', '已派工', '处理中', '待评价', '已结束', '已撤销', '已拒绝',]
        }
    },
    methods: {
        showDialog(id) {
            this.form = null
            this.getData(id)
            this.dialogVisible = true
        },
        closeDialog() {
            this.dialogVisible = false
        },
        // 查询详情
        getData(id) {
            this.$propertyApi.propertyWarranty.acceptAssignment
                .detail({
                    id: id
                }).then(res => {
                    if (res.code == 1000) {
                        this.form = res.data
                    } else {
                        this.$$message({
                            message: res.message
                        })
                    }
                })
        },
        // 拒绝
        openClose() {
            this.$refs.eventCloseDialog.showDialog()
        },
        //派工
        openDispatchWork() {
            this.$refs.dispatchWorkDialog.open()
        }
    },
    computed: {
        imgList1() {
            return (this.form.accessory && this.form.accessory.split(',')) || []
        }
    },
    components: {
        DictionaryText,
        eventCloseDialog,
        dispatchWorkDialog
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
    border-right: 1px solid #f0efee;
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
    min-height: 19px;
    color: #333;
}
.detail .info dd .content .img-list {
    margin-top: 10px;
}
.detail .info dd .content .img-list img {
    width: 60px;
    height: 60px;
    margin-right: 8px;
    background: #eee;
    border-radius: 4px;
}
.detail .process {
    /* padding: 0 18px; */
}
.detail .process .header {
    margin: 0 18px;
    padding-bottom: 15px;
    margin-bottom: 15px;
    border-bottom: 1px solid #f0efee;
}
.process-list {
    padding: 0 18px 0 38px;
    height: 458px;
    overflow: auto;
}
.process-list dl {
    margin-bottom: 30px;
    border: 1px solid #f7f6f5;
    color: #333;
    position: relative;
}
.process-list dt:before,
.process-list dl:before {
    content: "";
    display: block;
    position: absolute;
}
.process-list dl:before {
    width: 2px;
    top: 19px;
    left: -17px;
    background: #21b2c6;
    bottom: -45px;
}
.process-list dl:last-of-type::before {
    display: none;
}
.process-list dt:before {
    width: 8px;
    height: 8px;
    background: #21b2c6;
    box-shadow: 0 0 3px #21b2c6;
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
    background: #f7f6f5;
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
    background: #eee;
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
