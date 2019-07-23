<template>
    <div class="system">
        <div class="com-main-inner">
            <div class="com-page-header-wrap clear">
                <span class="com-page-header-title">轮播图</span>
            </div>
            <imgUpload :imgSetting="upload" />
            <el-divider />
            <div class="com-page-header-wrap clear">
                <span class="com-page-header-title">引导图</span>
            </div>
            <imgUpload :imgSetting="upload" />
            <el-divider />
            <div class="com-page-header-wrap clear">
                <span class="com-page-header-title">启动图</span>
            </div>
            <imgUpload :imgSetting="upload" />
            <div style="margin-top:20px">
                <el-button
                    type="info"
                    size="mini"
                >取 消</el-button>
                <el-button
                    type="primary"
                    size="mini"
                >保 存</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import imgUpload from "@/components/common/upload/imgUpload.vue";

export default {
    name: "system-ownerApp",
    data() {
        return {
            upload: {
                limit: 3,
                fileList: []
            }
        };
    },
    components: {
        imgUpload
    }
};
</script>

<style>
</style>
