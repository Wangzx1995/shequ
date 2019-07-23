<template>
    <div class="system">

        <div class="com-main-inner">
            <div class="com-page-header-wrap clear">
                <span class="com-page-header-title">轮播图</span>
            </div>
            <imgUpload :imgSetting="upload" />
            <div style="margin-top:20px">
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
    name: "system-propertyApp",
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
