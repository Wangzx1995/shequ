<template>
	<el-dialog
        class="full-footer"
        title="选择收藏夹"
        center
        :visible.sync="visible"
        width="300px"
        append-to-body
        :close-on-click-modal="false"
    >
        <el-form :model="form" ref="form" :rules="rules">
            <el-form-item class="full-input" prop="favoriteId" style="margin: 0;">
                <el-select v-model="form.favoriteId" placeholder="请选择">
                    <el-option
                        :key="lst.id"
                        v-for="lst in bookmarkList"
                        :label="lst.favoriteName"
                        :value="lst.id"
                    />
                </el-select>
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
                videoIds: [],
                form: {
                    favoriteId: null,
                    typeSel: 1
                },
                rules: {
                    favoriteId: [
                        {
                            required: true,
                            trigger: 'change',
                            message: '请选择收藏夹'
                        }
                    ]
                },
                bookmarkList: []
            }
        },
        methods: {
            commit () {
                this.$refs.form.validate(valid => {
                    if (valid) {
                        let videoFavoriteQuicks = []
                        this.videoIds.forEach(id => {
                            videoFavoriteQuicks.push({
                                favoriteId: this.form.favoriteId,
                                typeSel: this.form.typeSel,
                                videoId: id
                            })
                        })
                        this.$securityApi.video.addVideoToBookmark({
                            videoFavoriteQuicks
                        }).then(res => {
                            if (res.code == 1000) {
                                this.$$notify({
                                    message: '收藏成功'
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
            // 查询收藏夹
            findBookmarkList () {

                this.$securityApi.video.findBookmark().then(res => {
                    if (res.code == 1000) {
                        this.bookmarkList = res.data
                    } else {
                        this.$$message({
                            message: res.message
                        })
                    }
                })
            },
            open (videoIds, callback) {
                console.log(videoIds)
                this.findBookmarkList()
                this.visible = true
                this.callback = callback
                this.videoIds = videoIds
            },
            close () {
                this.$refs.form.resetFields()
                this.visible = false
            }
        }
    }
</script>