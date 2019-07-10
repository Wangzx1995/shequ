<template>
    <div>
        <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-exceed="handleExceed"
            :file-list="imgSetting.fileList"
            :limit="imgSetting.limit"
        >
            <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
            <img
                width="100%"
                :src="dialogImageUrl"
                alt=""
            >
        </el-dialog>
    </div>
</template>

<script>
export default {
    props: {
        imgSetting: Object,
    },
    data() {
        return {
            dialogImageUrl: '',
            dialogVisible: false
        }
    },
    mounted() {
        console.log(this.imgSetting)
    },
    methods: {
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        handleExceed(files, fileList) {
            this.$$message({
                message: "最多可上传" + this.imgSetting.limit + "张！",
                type: "warning"
            });
        }
    }
}
</script>

<style>
</style>
