<template>
	<el-dialog
        class="full-footer"
        title="结束事件"
        center
        :visible.sync="visible"
        width="530px"
        append-to-body
    >
        <el-form label-width="80px">
            <el-form-item label="结束原因">
                <el-input type="textarea" style="width:100%"></el-input>
            </el-form-item>
            <el-form-item>
                <ImgUpload
                    :imgSetting="{
                        limit: 3
                    }"
                    :imgUrls="(imgUrl && imgUrl.split(',')) || []"
                    :getImgUrl="getImgUrl"
                />
            </el-form-item>
        </el-form>
        <div slot="footer">
            <el-link class="off" :underline="false" @click="dialogVisible = false">取 消</el-link>
            <el-link type="primary" :underline="false" @click="dialogVisible = false">确 定</el-link>
        </div>
    </el-dialog>
</template>

<script>
    import ImgUpload from '@/components/common/upload/imgUpload'
    export default {
        data () {
            return {
                visible: false,
                imgUrl: null
            }
        },
        methods: {
            open () {
                this.visible = true
            },
            close () {
                this.visible = false
            },
            getImgUrl (data) {
                this.imgUrl = data
            }
        },
        components: {
            ImgUpload
        }
    }
</script>

<style scoped>
    
</style>
