<template>
	<el-dialog
        class="full-footer"
        :title="!form.id ? '添加组' : '编辑组'"
        center
        :visible.sync="visible"
        width="300px"
        append-to-body
        :close-on-click-modal="false"
    >
        <el-form :model="form" ref="form" :rules="rules">
            <el-form-item prop="name" style="margin: 0;">
                <el-input v-model="form.name" placeholder="组名称"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer">
            <el-link class="off" :underline="false" @click="close">取 消</el-link>
            <el-link type="primary" :underline="false" @click="commit">确 定</el-link>
        </div>
    </el-dialog>
</template>

<script>
    export default {
        data () {
            return {
                visible: false,
                callback: null,
                form: {
                    id: null,
                    name: null
                },
                rules: {
                    name: [
                        {
                            required: true,
                            trigger: 'blur',
                            message: '请填写名称'
                        }
                    ]
                }
            }
        },
        methods: {
            commit () {
                this.$refs.form.validate(valid => {
                    if (valid) {
                        new Promise(resolve => {
                            // 添加
                            if (!this.form.id) {
                                this.$securityApi.video.addBookmark({
                                    favoriteName: this.form.name
                                }).then(resolve)
                            } else {
                                // 修改
                                this.$securityApi.video.editBookmark({
                                    id: this.form.id,
                                    favoriteName: this.form.name
                                }).then(resolve)
                            }
                        }).then(res => {
                            if (res.code == 1000) {
                                this.$$notify({
                                    message: !this.form.id ? '添加成功' : '编辑成功'
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
            open (callback, data) {
                console.log(data)
                this.visible = true
                this.callback = callback
                if (data) {
                    this.form.id = data.id
                    this.form.name = data.label
                }
            },
            close () {
                this.visible = false
                this.form = {
                    id: null,
                    name: null
                }
            }
        },
        components: {
        }
    }
</script>