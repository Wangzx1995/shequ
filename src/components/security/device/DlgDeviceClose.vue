<template>
	<el-dialog
        class="full-footer"
        title="结束"
        center
        :visible.sync="visible"
        width="530px"
        append-to-body
    >
        <el-form :model="form" :rules="rules" ref="form" label-width="90px">
            <el-form-item label="结束原因" prop="remark">
                <el-input v-model="form.remark" type="textarea" style="width:100%"></el-input>
            </el-form-item>
            <el-form-item>
                <ImgUpload
                    :imgSetting="{
                        limit: 3
                    }"
                    :imgUrls="(form.fileUrl && form.fileUrl.split(',')) || []"
                    :getImgUrl="getImgUrl"
                />
            </el-form-item>
        </el-form>
        <div slot="footer">
            <el-link class="off" :underline="false" @click="close">取 消</el-link>
            <el-link type="primary" :underline="false" @click="commit">确 定</el-link>
        </div>
    </el-dialog>
</template>

<script>
    import ImgUpload from '@/components/common/upload/imgUpload'
    export default {
        data () {
            return {
                visible: false,
                callback: null,
                form: {
                    id: null,
                    selType: 2,
                    remark: null,
                    fileUrl: null
                },
                rules: {
                    remark: [
                        {
                            required: true,
                            trigger: 'blur',
                            message: '请填写原因'
                        }
                    ]
                }
            }
        },
        methods: {
            commit () {
                this.$refs.form.validate(valid => {
                    if (valid) {

                        this.$securityApi.device.update(this.form).then(res => {
                            if (res.code == 1000) {
                                this.$$notify({
                                    message: '结束成功'
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
            open (data, callback) {
                this.visible = true
                this.callback = callback
                this.form.id = data.id
            },
            close () {
                this.visible = false
            },
            getImgUrl (data) {
                this.form.fileUrl = data
            }
        },
        components: {
            ImgUpload
        }
    }
</script>