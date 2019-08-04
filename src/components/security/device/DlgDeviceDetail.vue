<template>
    <div>
        
        <el-dialog title="详情" center :visible.sync="visible" width="700px" append-to-body>
            <el-row class="detail" v-if="data">
                <el-col :span="12" class="info">
                    <div class="header">
                        <h3>异常信息</h3>
                    </div>
                    <dl>
                        <dd>
                            <label>报警设备</label>
                            <div class="content">{{ data.equipName }}</div>
                        </dd>
                        <dd>
                            <label>发生时间</label>
                            <div class="content">{{ data.createTime }}</div>
                        </dd>
                        <dd>
                            <label>发生地点</label>
                            <div class="content">{{ data.equipSite }}</div>
                        </dd>
                        <dd>
                            <label>设备类型</label>
                            <div class="content">
                                <DictionaryText :typeCode="2006" :dicCode="data.equipType"/>
                            </div>
                        </dd>
                        <dd>
                            <label>设备状态</label>
                            <div class="content">
                                <DeviceStatusText :id="data.equipStatus"/>
                            </div>
                        </dd>
                        <dd>
                            <label>处理状态</label>
                            <div class="content">
                                <DeviceTaskStatusText :id="data.taskStatus"/>
                            </div>
                        </dd>
                        <dd>
                            <label>异常内容</label>
                            <div class="content">
                                <p>{{ data.ycContent }}</p>
                            </div>
                        </dd>
                        <dd v-if="data.handlePersonId">
                            <label>指派人员</label>
                            <div class="content">{{ data.handlePersonName }}</div>
                        </dd>
                        <dd v-if="data.startTime">
                            <label>处理时间</label>
                            <div class="content">{{ data.startTime }}</div>
                        </dd>
                        <dd v-if="data.endTime">
                            <label>结束时间</label>
                            <div class="content">{{ data.endTime }}</div>
                        </dd>
                        <dd v-if="data.handleResult">
                            <label>处理结果</label>
                            <div class="content">{{ data.handleResult }}</div>
                        </dd>
                    </dl>
                </el-col>
                <el-col :span="12" class="process">
                    <div class="header">
                        <h3>处理流程</h3>
                        <div>
                            <template v-if="data.taskStatus == 1">
                                <el-link type="primary" :underline="false" @click="openAssign">指派</el-link>&nbsp;&nbsp;
                            </template>
                            <template v-else-if="data.taskStatus != 5 && data.taskStatus != 6">
                                <el-link :underline="false" @click="off">撤消</el-link>&nbsp;&nbsp;
                                <el-link type="danger" :underline="false" @click="openClose">结束</el-link>
                            </template>
                        </div>
                    </div>
                    <div class="process-list">
                        <dl v-for="lst in data.equipHandleFlows" :key="lst.id">
                            <dt>
                                <DeviceTaskStatusText :id="lst.operationStatus"/>
                                <!-- <el-link type="primary" :underline="false" style="float:right;">
                                    <i class="el-icon-caret-bottom"></i>
                                </el-link> -->
                            </dt>
                            <dd>
                                <p class="name">{{ lst.operationPersonName }}<!-- <font>（13幢1单元2101室）</font> --></p>
                                <p class="des">{{ lst.operationContent }}</p>
                                <div class="pic clear" v-if="!!lst.filePath">
                                    <img :src="$joinImgPrefix(img)" alt="" v-for="(img, index) in ((lst.filePath && lst.filePath.split(',')) || [])" :key="index">
                                </div>
                                <div class="time">
                                    <i class="icon-x-shijian"></i>{{ lst.operationTime }}
                                </div>
                            </dd>
                        </dl>
                    </div>
                </el-col>
            </el-row>
            <div v-else class="com-loading-text">数据加载中...</div>
        </el-dialog>
        <!-- 关闭 -->
        <DeviceClose ref="dlgDeviceClose"/>
        <Assign ref="dlgAssign"/>
    </div>
</template>

<script>
    import DeviceTaskStatusSelect from '@/components/security/device/DeviceTaskStatusSelect'
    import DeviceTaskStatusText from '@/components/security/device/DeviceTaskStatusText'
    import DeviceStatusSelect from '@/components/security/device/DeviceStatusSelect'
    import DeviceStatusText from '@/components/security/device/DeviceStatusText'
    import Dictionary from '@/components/common/select/Dictionary'
    import DictionaryText from '@/components/common/select/DictionaryText'
    import DeviceClose from '@/components/security/device/DlgDeviceClose'
    import Assign from '@/components/security/device/DlgAssign'
    export default {
        data () {
            return {
                visible: false,
                data: null
            }
        },
        methods: {
            open (data) {
                this.getData(data.id)
                this.visible = true
            },
            close () {
                this.visible = false
            },
            // 指派
            openAssign () {
                this.$refs.dlgAssign.open(this.data, () => {
                    this.getData(this.data.id)
                })
            },
            // 撤销
            off () {
                this.$$confirm({
                    message: '是否确认撤销'
                }).then(() => {
                    
                    this.$securityApi.device.update({
                        id: this.data.id,
                        selType: 3
                    }).then(res => {
                        if (res.code == 1000) {
                            this.$$notify({
                                message: '撤销成功'
                            })
                            this.getData(this.data.id)
                        } else {
                            this.$$message({
                                message: res.message
                            })
                        }
                    })
                }).catch(() => {})
            },
            // 查询详情
            getData (id) {
                this.$securityApi.device.get({
                    id
                }).then(res => {
                    if (res.code == 1000) {
                        this.data = res.data
                    } else {
                        this.$$message({
                            message: res.message
                        })
                    }
                })
            },
            // 结束
            openClose (row) {
                this.$refs.dlgDeviceClose.open()
            }
        },
        computed: {
            imgList1 () {
                return (this.data.securityIncident.imgNameUrl && this.data.securityIncident.imgNameUrl.split(',')) || []
            }
        },
        components: {
            DeviceTaskStatusSelect,
            DeviceTaskStatusText,
            DeviceStatusSelect,
            DeviceStatusText,
            Dictionary,
            DictionaryText,
            DeviceClose,
            Assign
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
