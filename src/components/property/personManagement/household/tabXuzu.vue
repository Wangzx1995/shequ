<template>
    <div>
        <el-form
            :model="form"
            :rules="rules"
            ref="form"
            label-width="110px"
            class="demo-ruleForm dialog-form"
            label-position="left"
        >
            <el-row>
                <el-col :span="11">
                    <el-form-item
                        label="合同开始日"
                        prop="starttime"
                    >
                        <el-date-picker
                            v-model="form.starttime"
                            type="date"
                            placeholder="选择日期"
                            value-format="yyyy/MM/dd"
                        >
                        </el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="11">
                    <el-form-item
                        label="合同结束日"
                        prop="endtime"
                    >
                        <el-date-picker
                            v-model="form.endtime"
                            type="date"
                            placeholder="选择日期"
                            value-format="yyyy/MM/dd"
                        >
                        </el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="11">
                    <el-form-item
                        label="租房合同"
                        prop="accessoryContract"
                    >
                        <imgUpload
                            :imgSetting="upload"
                            :getImgUrl="getImgUrl1"
                            ref="imgUpload1"
                            :imgUrls="form.accessoryContract"
                        />
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>

<script>
import imgUpload from "@/components/common/upload/imgUpload.vue";
export default {
    data() {
        return {
            form: {
                accessoryContract: [],
                endtime: null,
                starttime: null,
                userId: 0
            },
            upload: {
                limit: 1,
                isShow: true
            },
            rules: {
                starttime: [
                    {
                        required: true,
                        message: "请选择开始日",
                        trigger: "change"
                    }
                ],
                endtime: [
                    {
                        required: true,
                        message: "请选择结束日",
                        trigger: "change"
                    }
                ],
                accessoryContract: [
                    {
                        required: true,
                        message: "请上传照片",
                        trigger: "blur"
                    }
                ],
            },
        }
    },
    methods: {
        // 获取图片
        getImgUrl1(data) {
            this.form.accessoryContract[0] = data
        },
    },
    components: {
        imgUpload
    }
}
</script>

<style>
</style>
