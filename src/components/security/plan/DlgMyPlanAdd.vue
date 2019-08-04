<template>
    <el-dialog
        class="full-footer"
        :title="!form.id ? '新增' : '修改'"
        center
        :visible.sync="visible"
        width="760px"
        append-to-body
    >
        <el-form class="full-input" ref="form" :model="form" :rules="rules" label-width="90px">
            <el-form-item prop="preType" label="预案类型">
                <Dictionary :typeCode="2005" v-model="form.preType"/>
            </el-form-item>
            <el-form-item prop="preName" label="预案名称">
                <el-input placeholder="请填写事件名" v-model="form.preName"></el-input>
            </el-form-item>
            <el-form-item prop="preContent" label="预案内容">
                <el-input type="textarea" v-model="form.preContent"></el-input>
            </el-form-item>
            <el-form-item prop="fileNameUrl" label="预案附件">
                <el-upload
                    action=""
                    :limit="1"
                    :before-upload="handleUpload"
                    :on-remove="handleRemove"
                >
                    <template v-if="!form.fileNameUrl">
                        <el-button size="mini" plain>点击上传</el-button>
                        <div slot="tip">注：支持docx、jpg、png格式，文件大小不超过500M</div>
                    </template>
                    <el-link v-else>{{ form.fileNameUrl.fileName }}</el-link>
                </el-upload>
            </el-form-item>
        </el-form>
        <div slot="footer">
            <el-link class="off" :underline="false" @click="close">取 消</el-link>
            <el-link type="primary" :underline="false" @click="commit">提 交</el-link>
        </div>
    </el-dialog>
</template>

<script>
    import Dictionary from '@/components/common/select/Dictionary'
    export default {
        data () {
            return {
                visible: false,
                callback: null,
                fileList: [],
                form: {
                    id: null,
                    preName: null,
                    preType: null,
                    preContent: null,
                    fileNameUrl: null
                },
                rules: {
                    preName: [
                        {
                            required: true,
                            trigger: 'blur',
                            message: '请输入预案名称'
                        }
                    ],
                    preType: [
                        {
                            required: true,
                            trigger: 'blur',
                            message: '请选择预案类型'
                        }
                    ],
                    preContent: [
                        {
                            required: true,
                            trigger: 'blur',
                            message: '请填写预案内容'
                        }
                    ],
                    fileNameUrl: [
                        {
                            required: true,
                            trigger: 'blur',
                            message: '请上传预案附件'
                        }
                    ]
                }
            }
        },
        methods: {
            commit () {
                this.$refs.form.validate(valid => {
                    if (valid) {
                        let form = {...this.form, fileNameUrl: JSON.stringify(this.form.fileNameUrl)}
                        new Promise(resolve => {
                            // 有id为新增，否则为修改
                            if (!form.id) {
                                this.$securityApi.plan.myPlanAdd(form).then(resolve)
                            } else {
                                // 状态重置为待审核
                                form.auditState = 3
                                this.$securityApi.plan.myPlanUpdate(form).then(resolve)
                            }
                        }).then(res => {
                            if (res.code == 1000) {
                                this.$$notify({
                                    message: '修改成功'
                                })
                                this.callback()
                                this.close()
                            } else {
                                this.$$message({
                                    message: res.message
                                })
                            }
                        }).catch(() => {})
                    }
                })
            },
            open (callback, data) {
                this.visible = true
                this.callback = callback
                
                if (data) {

                    this.form.id = data.id
                    this.form.preName = data.preName
                    this.form.preType = data.preType
                    this.form.preContent = data.preContent
                    this.form.fileNameUrl = JSON.parse(data.fileNameUrl)
                }
            },
            close () {
                this.visible = false
                this.$refs.form.resetFields()
            },
            handleUpload (file) {
                console.log(file)
                const formData = new FormData()
                formData.append('file', file)

                this.$baseApi.upload(formData).then(res => {
                    if (res.code == 1000) {
                        this.form.fileNameUrl = res.data[0]
                        this.fileList = [{
                            name: this.form.fileNameUrl.fileName,
                            url: this.form.fileNameUrl.fileUrl
                        }]
                    } else {
                        this.$$message({
                            message: res.message
                        })
                    }
                })
                return false
            },
            handleRemove (e) {
                console.log(e)
            }

        },
        components: {
            Dictionary
        }
    }
</script>