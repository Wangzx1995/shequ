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
                            @click="commit()"
                        >保存</el-button>
                        <el-button
                            type="info"
                            size="mini"
                            @click="cancle()"
                        >取消</el-button>
                    </template>
                </div>
                <span class="com-page-header-title">小区信息</span>
            </div>
            <!-- 未编辑 -->
            <div
                v-if="!isEdit"
                class="com-info-container block"
            >
                <el-row class="com-info-group">
                    <el-col :span="7">
                        <p class="com-info-label">小区名称</p>
                        <span class="com-info-value">{{form.commName}}</span>
                    </el-col>
                    <el-col
                        :span="7"
                        :offset="1"
                    >
                        <p class="com-info-label">详细地址</p>
                        <span class="com-info-value">{{form.address}}</span>
                    </el-col>
                    <el-col
                        :span="7"
                        :offset="1"
                    >
                        <p class="com-info-label">建筑年代</p>
                        <span class="com-info-value">{{form.buildingAge}}</span>
                    </el-col>
                </el-row>
                <el-row class="com-info-group">
                    <el-col :span="7">
                        <p class="com-info-label">建筑面积</p>
                        <span class="com-info-value">{{form.coveredArea}}</span>
                    </el-col>
                    <el-col
                        :span="7"
                        :offset="1"
                    >
                        <p class="com-info-label">占地面积</p>
                        <span class="com-info-value">{{form.floorSpace}}</span>
                    </el-col>
                    <el-col
                        :span="7"
                        :offset="1"
                    >
                        <p class="com-info-label">绿化率</p>
                        <span class="com-info-value">{{form.greeningRate}}</span>
                    </el-col>
                </el-row>
                <el-row class="com-info-group">
                    <el-col :span="7">
                        <p class="com-info-label">容积率</p>
                        <span class="com-info-value">{{form.plotRatio}}</span>
                    </el-col>
                    <el-col
                        :span="7"
                        :offset="1"
                    >
                        <p class="com-info-label">负责人</p>
                        <span class="com-info-value">{{form.principal}}</span>
                    </el-col>
                    <el-col
                        :span="7"
                        :offset="1"
                    >
                        <p class="com-info-label">联系电话</p>
                        <span class="com-info-value">{{form.tel}}</span>
                    </el-col>
                </el-row>
                <el-row class="com-info-group">
                    <el-col :span="10">
                        <p class="com-info-label">小区介绍</p>
                        <span class="com-info-value">{{form.commIntroduce}}</span>
                    </el-col>
                </el-row>
                <br />
                <br />
                <br />
                <el-divider />
                <el-row class="com-info-group">
                    <p class="com-info-label">小区图片</p>
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
                            prop="commName"
                            label="小区名称"
                        >
                            <el-input
                                v-model="form.commName"
                                placeholder="请输入小区名称"
                            />
                        </el-form-item>
                    </el-col>
                    <el-col
                        :span="7"
                        :offset="1"
                    >
                        <el-form-item
                            prop="address"
                            label="详细地址"
                        >
                            <el-input
                                v-model="form.address"
                                placeholder="请输入详细地址"
                            />
                        </el-form-item>
                    </el-col>
                    <el-col
                        :span="7"
                        :offset="1"
                    >
                        <el-form-item
                            prop="buildingAge"
                            label="建筑年代"
                        >
                            <el-input
                                v-model="form.buildingAge"
                                placeholder="请输入建筑年代"
                            />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="7">
                        <el-form-item
                            prop="coveredArea"
                            label="建筑面积"
                        >
                            <el-input
                                v-model="form.coveredArea"
                                placeholder="请输入建筑面积"
                            />
                        </el-form-item>
                    </el-col>
                    <el-col
                        :span="7"
                        :offset="1"
                    >
                        <el-form-item
                            prop="floorSpace"
                            label="占地面积"
                        >
                            <el-input
                                v-model="form.floorSpace"
                                placeholder="请输入占地面积"
                            />
                        </el-form-item>
                    </el-col>
                    <el-col
                        :span="7"
                        :offset="1"
                    >
                        <el-form-item
                            prop="greeningRate"
                            label="绿化率"
                        >
                            <el-input
                                v-model="form.greeningRate"
                                placeholder="请输入绿化率"
                            />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="7">
                        <el-form-item
                            prop="plotRatio"
                            label="容积率"
                        >
                            <el-input
                                v-model="form.plotRatio"
                                placeholder="请输入容积率"
                            />
                        </el-form-item>
                    </el-col>
                    <el-col
                        :span="7"
                        :offset="1"
                    >
                        <el-form-item
                            prop="principal"
                            label="负责人"
                        >
                            <el-input
                                v-model="form.principal"
                                placeholder="请输入负责人"
                            />
                        </el-form-item>
                    </el-col>
                    <el-col
                        :span="7"
                        :offset="1"
                    >
                        <el-form-item
                            prop="tel"
                            label="联系电话"
                        >
                            <el-input
                                v-model="form.tel"
                                placeholder="请输入联系电话"
                            />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="7">
                        <el-form-item
                            prop="commIntroduce"
                            label="小区介绍"
                        >
                            <el-input
                                type="textarea"
                                :rows="8"
                                placeholder="请输入小区介绍"
                                v-model="form.commIntroduce"
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
                        <el-form-item label="小区图片">
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
    name: "system-CommunityInfo",
    data() {
        return {
            isEdit: false,
            form: {
                imgUrl: ''
            },
            rules: {
                commName: [
                    {
                        required: true,
                        trigger: "blur",
                        message: "请输入小区名称"
                    }
                ],
                address: [
                    {
                        required: true,
                        trigger: "blur",
                        message: "请输入详细地址"
                    }
                ],
                buildingAge: [
                    {
                        required: true,
                        trigger: "blur",
                        message: "请输入建筑年代"
                    }
                ],
                coveredArea: [
                    {
                        required: true,
                        trigger: "blur",
                        message: "请输入建筑面积"
                    }
                ],
                principal: [
                    {
                        required: true,
                        trigger: "blur",
                        message: "请输入负责人"
                    }
                ],
                tel: [
                    {
                        required: true,
                        trigger: "blur",
                        message: "请输入联系电话"
                    }
                ],
                commIntroduce: [
                    {
                        required: true,
                        trigger: "blur",
                        message: "请输入小区介绍"
                    }
                ]
            },
            dialogVisible: false,
            upload: {
                limit: 3
            },
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
                    this.$systemApi.CommunityInfo.update(this.form)
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
            this.$systemApi.CommunityInfo.select()
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