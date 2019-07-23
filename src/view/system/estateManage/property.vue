<template>
    <div class="system">
        <div class="com-main-inner">
            <!-- page header -->
            <div class="com-page-header-wrap clear">
                <div class="fr">
                    <template v-if="!isEdit">
                        <el-button
                            type="text"
                            size="mini"
                            @click="isEdit = true"
                        >
                            <i class="icon-x-edit"></i>&nbsp;编辑
                        </el-button>
                    </template>
                    <template v-else>
                        <el-button
                            type="primary"
                            size="mini"
                            @click="commit"
                        >保存</el-button>
                        <el-button
                            type="info"
                            size="mini"
                            @click="cancle"
                        >取消</el-button>
                    </template>
                </div>
                <span class="com-page-header-title">物业信息</span>
            </div>
            <!-- 未编辑 -->
            <div
                v-if="!isEdit"
                class="com-info-container block"
            >
                <el-row class="com-info-group">
                    <el-col :span="7">
                        <p class="com-info-label">物业名称</p>
                        <span class="com-info-value">{{form.proName}}</span>
                    </el-col>
                    <el-col
                        :span="7"
                        :offset="1"
                    >
                        <p class="com-info-label">入驻时间</p>
                        <span class="com-info-value">{{form.enterTime}}</span>
                    </el-col>
                    <el-col
                        :span="7"
                        :offset="1"
                    >
                        <p class="com-info-label">物业电话</p>
                        <span class="com-info-value">{{form.proTel}}</span>
                    </el-col>
                </el-row>
                <el-row class="com-info-group">
                    <el-col :span="7">
                        <p class="com-info-label">公司法人</p>
                        <span class="com-info-value">{{form.legalPerson}}</span>
                    </el-col>
                    <el-col
                        :span="7"
                        :offset="1"
                    >
                        <p class="com-info-label">公司电话</p>
                        <span class="com-info-value">{{form.companyTel}}</span>
                    </el-col>
                    <el-col
                        :span="7"
                        :offset="1"
                    >
                        <p class="com-info-label">公司地址</p>
                        <span class="com-info-value">{{form.companyAddress}}</span>
                    </el-col>
                </el-row>
                <el-row class="com-info-group">
                    <el-col :span="10">
                        <p class="com-info-label">物业介绍</p>
                        <span class="com-info-value">{{form.proIntroduce}}</span>
                    </el-col>
                </el-row>
                <br />
                <br />
                <br />
                <el-divider />
                <el-row class="com-info-group">
                    <p class="com-info-label">荣誉展示</p>
                    <el-col :span="24">
                        <span class="com-info-value">
                            <img
                                v-imgPreview
                                style="height: 120px;margin-right:30px;"
                                v-for="img in (form.imgUrl && form.imgUrl.split(',')) || []"
                                :key="img.value"
                                :src="$joinImgPrefix(img)"
                            />
                        </span>
                    </el-col>
                </el-row>
            </div>
            <!-- 表单 -->
            <el-form
                ref="form"
                :model="form"
                :rules="rules"
                v-else
            >
                <el-row>
                    <el-col :span="7">
                        <el-form-item
                            prop="proName"
                            label="物业名称"
                        >
                            <el-input
                                v-model="form.proName"
                                placeholder="请输入物业名称"
                            />
                        </el-form-item>
                    </el-col>
                    <el-col
                        :span="7"
                        :offset="1"
                    >
                        <el-form-item
                            prop="enterTime"
                            label="入驻时间"
                        >
                            <el-date-picker
                                v-model="form.enterTime"
                                type="date"
                                placeholder="选择日期"
                                style="width:100%"
                            >
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col
                        :span="7"
                        :offset="1"
                    >
                        <el-form-item
                            prop="proTel"
                            label="物业电话"
                        >
                            <el-input
                                v-model="form.proTel"
                                placeholder="请输入物业电话"
                            />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="7">
                        <el-form-item
                            prop="legalPerson"
                            label="公司法人"
                        >
                            <el-input
                                v-model="form.legalPerson"
                                placeholder="请输入公司法人"
                            />
                        </el-form-item>
                    </el-col>
                    <el-col
                        :span="7"
                        :offset="1"
                    >
                        <el-form-item
                            prop="companyTel"
                            label="公司电话"
                        >
                            <el-input
                                v-model="form.companyTel"
                                placeholder="请输入公司电话"
                            />
                        </el-form-item>
                    </el-col>
                    <el-col
                        :span="7"
                        :offset="1"
                    >
                        <el-form-item
                            prop="companyAddress"
                            label="公司地址"
                        >
                            <el-input
                                v-model="form.companyAddress"
                                placeholder="请输入公司地址"
                            />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="7">
                        <el-form-item
                            prop="proIntroduce"
                            label="物业介绍"
                        >
                            <el-input
                                type="textarea"
                                :rows="8"
                                placeholder="请输入物业介绍"
                                v-model="form.proIntroduce"
                                maxlength="200"
                                show-word-limit
                            >
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-divider />
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="荣誉展示">
                        </el-form-item>
                        <imgUpload
                            :imgSetting="upload"
                            :imgUrls="(form.imgUrl && form.imgUrl.split(',')) || []"
                            :getImgUrl="getImgUrl"
                        />
                    </el-col>
                </el-row>

            </el-form>
        </div>
    </div>
</template>

<script>
import imgUpload from "@/components/common/upload/imgUpload.vue";

export default {
    name: "system-property",
    data() {
        return {
            isEdit: false,
            form: {},
            rules: {
                name: [
                    {
                        required: true,
                        trigger: "blur",
                        message: "请输入物业名称"
                    }
                ],
                time: [
                    {
                        required: true,
                        trigger: "blur",
                        message: "请选择入驻时间"
                    }
                ],
                tel1: [
                    {
                        required: true,
                        trigger: "blur",
                        message: "请输入物业电话"
                    }
                ],
                people: [
                    {
                        required: true,
                        trigger: "blur",
                        message: "请输入公司法人"
                    }
                ],
                text: [
                    {
                        required: true,
                        trigger: "blur",
                        message: "请输入物业介绍"
                    }
                ]
            },
            dialogVisible: false,
            upload: {
                limit: 3,
            }
        };
    },
    mounted() {
        this.getForm()
    },
    methods: {
        // 提交保存
        commit() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    this.$systemApi.estateManage.proUpdate(this.form)
                        .then(res => {
                            if (res.code == 1000) {
                                this.$$message({
                                    message: res.message,
                                    type: 'success'
                                })
                                this.isEdit = !this.isEdit;
                                this.getForm()
                            } else {
                                this.$$alert({
                                    message: res.msg,
                                    type: 'error'
                                })
                            }
                        })
                }
            });
        },
        // 取消
        cancle() {
            this.isEdit = false;
        },
        getForm() {
            this.$systemApi.estateManage.proSelect()
                .then(res => {
                    if (res.code == 1000) {
                        this.form = res.data
                        // console.log(res.data.imgUrl.length)
                        // if (res.data.imgUrl.length = 0) {
                        // this.form.imgUrl = null
                        // }
                    } else {
                        this.$$alert({
                            message: res.msg,
                            type: 'error'
                        })
                    }
                })
        },
        getImgUrl(data) {
            this.form.imgUrl = data
        }
    },
    components: {
        imgUpload
    }
};
</script>