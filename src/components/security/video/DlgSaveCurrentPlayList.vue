<template>
	<el-dialog
        class="full-footer"
        title="保存状态"
        center
        :visible.sync="visible"
        width="300px"
        append-to-body
        :close-on-click-modal="false"
    >
        <el-form :model="form" ref="form" :rules="rules">
            <el-form-item prop="name" style="margin: 0;">
                <el-input v-model="form.name" placeholder="状态名称"></el-input>
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
                videoList: [],
                form: {
                    name: null,
                    playType: 1
                },
                rules: {
                    name: [
                        {
                            required: true,
                            trigger: 'blur',
                            message: '请填写状态名称'
                        }
                    ]
                }
            }
        },
        methods: {
            commit () {
                this.$refs.form.validate(valid => {
                    if (valid) {
                        let videoFavoriteQuicks = []
                        this.videoList.forEach(v => {
                            videoFavoriteQuicks.push({
                                videoId: v.id
                            })
                        })

                        this.$securityApi.video.addPlayListToQuick({
                            videoQuickPlay: {
                                playTitle: this.form.name,
                                playType: this.form.playType,
                            },
                            videoFavoriteQuicks
                        }).then(res=> {

                            if (res.code == 1000) {
                                this.$$notify({
                                    message: '添加成功'
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
            open (videoList, callback) {
                this.visible = true
                this.callback = callback
                this.videoList = videoList
            },
            close () {
                this.$refs.form.resetFields()
                this.videoList = []
                this.visible = false
            }
        },
        components: {
        }
    }
</script>