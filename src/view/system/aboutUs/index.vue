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
                <span class="com-page-header-title">关于我们</span>
            </div>
            <!-- 未编辑 -->
            <div
                v-if="!isEdit"
                class="com-info-container block"
            >
                <el-row class="com-info-group">
                    <el-col :span="7">
                        <p class="com-info-label">公司名称</p>
                        <span class="com-info-value">{{form.name}}</span>
                    </el-col>
                    <el-col
                        :span="7"
                        :offset="1"
                    >
                        <p class="com-info-label">法人代表</p>
                        <span class="com-info-value">{{form.people}}</span>
                    </el-col>
                    <el-col
                        :span="7"
                        :offset="1"
                    >
                        <p class="com-info-label">公司电话</p>
                        <span class="com-info-value">{{form.tel}}</span>
                    </el-col>
                </el-row>
                <el-row class="com-info-group">
                    <el-col :span="7">
                        <p class="com-info-label">公司地址</p>
                        <span class="com-info-value">{{form.address}}</span>
                    </el-col>
                </el-row>
                <el-row class="com-info-group">
                    <el-col :span="10">
                        <p class="com-info-label">公司简介</p>
                        <span class="com-info-value">{{form.text}}</span>
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
                            prop="name"
                            label="公司名称"
                        >
                            <el-input
                                v-model="form.name"
                                placeholder="请输入公司名称"
                            />
                        </el-form-item>
                    </el-col>
                    <el-col
                        :span="7"
                        :offset="1"
                    >
                        <el-form-item
                            prop="people"
                            label="法人代表"
                        >
                            <el-input
                                v-model="form.people"
                                placeholder="请输入法人代表"
                            />
                        </el-form-item>
                    </el-col>
                    <el-col
                        :span="7"
                        :offset="1"
                    >
                        <el-form-item
                            prop="tel"
                            label="公司电话"
                        >
                            <el-input
                                v-model="form.tel"
                                placeholder="请输入公司电话"
                            />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="7">
                        <el-form-item
                            prop="address"
                            label="公司地址"
                        >
                            <el-input
                                v-model="form.address"
                                placeholder="请输入公司地址"
                            />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="7">
                        <el-form-item
                            prop="text"
                            label="公司简介"
                        >
                            <el-input
                                type="textarea"
                                :rows="8"
                                placeholder="请输入公司简介"
                                v-model="form.text"
                                maxlength="200"
                                show-word-limit
                            >
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    name: "aboutUs",
    data() {
        return {
            isEdit: false,
            infoData: {
                name: "xx"
            },
            form: {
                name: "微风智能网络科技有限公司",
                people: "马化腾",
                tel: "0571-8888888",
                address: "浙江省杭州市滨江区西兴街道",
                text:
                    "微风智能网络科技有限公司微风智能网络科技有限公司微风智能网络科技有限公司微风智能网络科技有限公司微风智能网络科技有限公司微风智能网络科技有限公司微风智能网络科技有限公司微风智能网络科技有限公司微风智能网络科技有限公司微风智能网络科技有限公司微风智能网络科技有限公司微风智能网络科技有限公司微风智能网络科技有限公司微风智能网络科技有限公司"
            },
            rules: {
                name: [
                    {
                        required: true,
                        trigger: "blur",
                        message: "请输入公司名称"
                    }
                ],
                people: [
                    {
                        required: true,
                        trigger: "blur",
                        message: "请输入法人代表"
                    }
                ],
                tel: [
                    {
                        required: true,
                        trigger: "blur",
                        message: "请输入公司电话"
                    }
                ],
                address: [
                    {
                        required: true,
                        trigger: "blur",
                        message: "请输入公司地址"
                    }
                ],
                text: [
                    {
                        required: true,
                        trigger: "blur",
                        message: "请输入公司简介"
                    }
                ]
            }
        };
    },
    created() {},
    methods: {
        // 提交保存
        commit() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    this.isEdit = !this.isEdit;
                    // this.$systemApi.demo.add({

                    // }).then(res => {
                    //     console.log(res)
                    // }).catch(e => {
                    //     console.log(e)
                    // })
                }
            });
        },
        // 取消
        cancle() {
            this.isEdit = false;
        }
    },
    components: {}
};
</script>