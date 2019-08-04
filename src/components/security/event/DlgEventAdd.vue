<template>
    <div>
        <el-dialog
            class="full-footer"
            title="新增"
            center
            :visible.sync="visible"
            width="760px"
            append-to-body
        >
            <el-form class="full-input" ref="form" :model="form" :rules="rules" label-width="90px">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item prop="eventName" label="事件名">
                            <el-input placeholder="请填写事件名" v-model="form.eventName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="eventType" label="事件类型">
                            <Dictionary :typeCode="2002" v-model="form.eventType"/>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item prop="reportPeople" label="上报人">
                            <el-input placeholder="请填写上报人" v-model="form.reportPeople"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="urgencyDegree" label="紧急程度">
                            <Dictionary :typeCode="2003" v-model="form.urgencyDegree"/>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="20">
                        <el-form-item prop="eventAddress" label="地点">
                            <el-input v-model="form.eventAddress"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" align="right">
                        <el-button plain @click="openMap">标注</el-button>
                    </el-col>
                </el-row>
                <el-form-item prop="eventContent" label="事件内容">
                    <el-input type="textarea" v-model="form.eventContent"></el-input>
                </el-form-item>
                <el-form-item>
                    <ImgUpload
                        :imgSetting="{
                            limit: 3
                        }"
                        :imgUrls="(form.imgUrl && form.imgUrl.split(',')) || []"
                        :getImgUrl="getImgUrl"
                    />
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-link class="off" :underline="false" @click="visible = false">取 消</el-link>
                <el-link type="primary" :underline="false" @click="commit">保 存</el-link>
            </div>
        </el-dialog>
        <EventMap ref="dlgEventMap"/>
    </div>
</template>

<script>
    import EventMap from '@/components/security/event/DlgEventMap'
    import Dictionary from '@/components/common/select/Dictionary'
    import ImgUpload from '@/components/common/upload/imgUpload'
    export default {
        data () {
            return {
                visible: false,
                callback: null,
                form: {
                    eventName: null,
                    eventType: null,
                    reportPeople: null,
                    urgencyDegree: null,
                    eventContent: null,
                    imgNameUrl: null,
                    addressX: null,
                    addressY: null,
                    eventAddress: null,
                    // 电脑端操作属于'录入',根据字典内容写死
                    eventSource: '2001-02'
                },
                rules: {
                    eventName: [
                        {
                            required: true,
                            trigger: 'blur',
                            message: '请填写事件名'
                        }
                    ],
                    eventType: [
                        {
                            required: true,
                            trigger: 'blur',
                            message: '请选择事件类型'
                        }
                    ],
                    reportPeople: [
                        {
                            required: true,
                            trigger: 'blur',
                            message: '请填写上报人'
                        }
                    ],
                    urgencyDegree: [
                        {
                            required: true,
                            trigger: 'blur',
                            message: '请选择紧急程度'
                        }
                    ],
                    eventAddress: [
                        {
                            required: true,
                            trigger: 'blur',
                            message: '请标注地点'
                        }
                    ],
                    eventContent: [
                        {
                            required: true,
                            trigger: 'blur',
                            message: '请填写事件内容'
                        }
                    ],
                }
            }
        },
        methods: {
            getImgUrl (data) {
                this.form.imgNameUrl = data
            },
            commit () {
                this.$refs.form.validate(valid => {
                    if (valid) {
                        console.log(this.form)
                        this.$securityApi.event.add(this.form)
                        .then(res => {
                            if (res.code == 1000) {
                                this.callback()
                                this.close()
                            } else {
                                this.$$message({
                                    message: res.message
                                })
                            }
                        })
                    }
                })
            },
            open (callback) {
                this.visible = true
                this.callback = callback
            },
            close () {
                this.visible = false
            },
            // 拾取坐标
            openMap () {
                this.$refs.dlgEventMap.open(position => {
                    this.form.eventAddress = position.eventAddress
                    this.form.addressX = position.addressX
                    this.form.addressY = position.addressY
                }, {
                    eventAddress: this.form.eventAddress,
                    addressX: this.form.addressX,
                    addressY: this.form.addressY
                })
            }
        },
        components: {
            Dictionary,
            ImgUpload,
            EventMap
        }
    }
</script>

<style scoped>
    
</style>
