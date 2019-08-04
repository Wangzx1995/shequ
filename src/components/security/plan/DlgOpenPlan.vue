<template>
    <el-dialog
        class="full-footer"
        title="预案启动"
        center
        :visible.sync="visible"
        width="600px"
        append-to-body
    >
        <el-form class="full-input" ref="form" :model="form" :rules="rules" label-width="90px">
            <el-form-item prop="preTitle" label="预案标题">
                <el-input placeholder="请填写预案标题" v-model="form.preTitle"></el-input>
            </el-form-item>
            <el-form-item prop="eventDesc" label="事件描述">
                <el-input type="textarea" v-model="form.eventDesc" placeholder="请填写事件描述"></el-input>
            </el-form-item>
            <el-form-item label="事件关联">
                <el-select v-model="form.eventId" placeholder="请选择">
                    <el-option
                        :key="lst.id"
                        v-for="lst in eventList"
                        :value="lst.id"
                        :label="lst.eventName"
                    />
                </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer">
            <el-link class="off" :underline="false" @click="close">取 消</el-link>
            <el-link type="primary" :underline="false" @click="commit">启 动</el-link>
        </div>
    </el-dialog>
</template>

<script>
    export default {
        data () {
            return {
                visible: false,
                callback: null,
                eventList: [],
                form: {
                    preId: null,
                    levelId: null,
                    preTitle: null,
                    eventDesc: null,
                    eventId: null,
                },
                rules: {
                    preTitle: [
                        {
                            required: true,
                            trigger: 'blur',
                            message: '请输入预案标题'
                        }
                    ]
                }
            }
        },
        methods: {
            // 启动
            commit () {
                this.$refs.form.validate(valid => {
                    if (valid) {
                        this.$securityApi.plan.startPre({
                            preId: this.form.preId,
                            levelId: this.form.levelId,
                            preTitle: this.form.preTitle,
                            eventDesc: this.form.eventDesc,
                            eventId: this.form.eventId
                        }).then(res => {
                            if (res.code == 1000) {
                                this.$$notify({
                                    message: '启动成功'
                                })
                                this.close()
                                this.callback()
                            } else {
                                this.$$message({
                                    message: res.message
                                })
                            }
                        })
                    }
                })
            },
            // 可选择事件列表
            getEventList () {
                this.$securityApi.event.list({
                    pageNum: 1,
                    pageSize: 9999,
                    eventSource: '2001-02',
                    eventState: 1,
                    valid: 1
                }).then(res => {
                    if (res.code == 1000) {
                        this.eventList = res.data.list
                    } else {
                        this.$$message({
                            message: res.message
                        })
                    }
                })
            },
            open (preId, levelId, callback) {
                this.getEventList()
                this.form.preId = preId
                this.form.levelId = levelId
                this.visible = true
                this.callback = callback
            },
            close () {
                this.visible = false
                this.form = {
                    preId: null,
                    levelId: null,
                    preTitle: null,
                    eventDesc: null,
                    eventId: null,
                }
            }
        },
        components: {
            
        }
    }
</script>

<style scoped>
    
</style>
