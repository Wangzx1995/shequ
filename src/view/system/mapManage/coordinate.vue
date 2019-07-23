<template>
    <div class="system">

        <div class="com-main-inner">
            <div class="com-page-header-wrap clear">
                <span class="com-page-header-title">地图选择</span>
            </div>
            <el-row>
                <el-col :span="4">
                    <div>
                        <el-image src="url"></el-image>
                        <el-radio
                            v-model="radio"
                            label="1"
                        >百度地图<span class="tip">（默认）</span></el-radio>
                    </div>
                </el-col>
                <el-col :span="4">
                    <div>
                        <el-image src="url"></el-image>
                        <el-radio
                            v-model="radio"
                            label="2"
                            disabled
                        >高德地图<span class="tip">（未开通）</span></el-radio>
                    </div>
                </el-col>
                <el-col :span="4">
                    <div class="clear">
                        <div
                            class="addimg"
                            @click="imgClick()"
                        >
                            <!-- v-if="this.files.length<3 && isImg" -->
                            <i class="el-icon-plus"></i>
                            <span class="zidingyi">自定义</span>

                        </div>
                    </div>
                </el-col>
            </el-row>
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

export default {
    name: "system-coordinate",
    data() {
        return {
            radio: '1'
        };
    },
    methods: {
        imgClick() {

        }
    }
};
</script>

<style lang="less" scoped>
.el-image {
    width: 160px;
    height: 120px;
    display: block;
}
.tip {
    font-size: 10px;
    line-height: 19px;
    height: 19px;
    display: inline-block;
    color: #c0c4cc;
}
.addimg {
    width: 160px;
    height: 120px;
    border: 1px dashed #cccccc;
    border-radius: 6px;
    float: left;
    padding: 0;
    background: #fbfdff;
    i {
        display: inline-block;
        width: 160px;
        height: 120px;
        line-height: 120px;
        text-align: center;
        font-size: 25px;
        cursor: pointer;
        color: #cccccc;
    }
}
.zidingyi {
    font-size: 14px;
    width: 160px;
    text-align: center;
    display: inline-block;
}
</style>

