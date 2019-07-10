<template>
    <div style="padding: 18px">
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
                    <span class="com-info-value">{{form.name}}</span>
                </el-col>
                <el-col
                    :span="7"
                    :offset="1"
                >
                    <p class="com-info-label">入驻时间</p>
                    <span class="com-info-value">{{form.time}}</span>
                </el-col>
                <el-col
                    :span="7"
                    :offset="1"
                >
                    <p class="com-info-label">物业电话</p>
                    <span class="com-info-value">{{form.tel1}}</span>
                </el-col>
            </el-row>
            <el-row class="com-info-group">
                <el-col :span="7">
                    <p class="com-info-label">公司法人</p>
                    <span class="com-info-value">{{form.people}}</span>
                </el-col>
                <el-col
                    :span="7"
                    :offset="1"
                >
                    <p class="com-info-label">公司电话</p>
                    <span class="com-info-value">{{form.tel2}}</span>
                </el-col>
                <el-col
                    :span="7"
                    :offset="1"
                >
                    <p class="com-info-label">公司地址</p>
                    <span class="com-info-value">{{form.address}}</span>
                </el-col>
            </el-row>
            <el-row class="com-info-group">
                <el-col :span="10">
                    <p class="com-info-label">物业介绍</p>
                    <span class="com-info-value">{{form.text}}</span>
                </el-col>
            </el-row>
            <br />
            <br />
            <br />
            <el-divider />
            <el-row class="com-info-group">
                <p class="com-info-label">小区图片</p>
                <el-col
                    :span="2"
                    v-for="img in upload.fileList"
                    :key="img.value"
                >
                    <span class="com-info-value">
                        <el-image
                            style="width: 100px; height: 100px"
                            :src="img.url"
                            fit="fill"
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
                        prop="name"
                        label="物业名称"
                    >
                        <el-input
                            v-model="form.name"
                            placeholder="请输入物业名称"
                        />
                    </el-form-item>
                </el-col>
                <el-col
                    :span="7"
                    :offset="1"
                >
                    <el-form-item
                        prop="time"
                        label="入驻时间"
                    >
                        <el-date-picker
                            v-model="form.time"
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
                        prop="tel1"
                        label="物业电话"
                    >
                        <el-input
                            v-model="form.tel1"
                            placeholder="请输入物业电话"
                        />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="7">
                    <el-form-item
                        prop="people"
                        label="公司法人"
                    >
                        <el-input
                            v-model="form.people"
                            placeholder="请输入公司法人"
                        />
                    </el-form-item>
                </el-col>
                <el-col
                    :span="7"
                    :offset="1"
                >
                    <el-form-item
                        prop="tel2"
                        label="公司电话"
                    >
                        <el-input
                            v-model="form.tel2"
                            placeholder="请输入公司电话"
                        />
                    </el-form-item>
                </el-col>
                <el-col
                    :span="7"
                    :offset="1"
                >
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
                        label="物业介绍"
                    >
                        <el-input
                            type="textarea"
                            :rows="8"
                            placeholder="请输入物业介绍"
                            v-model="form.text"
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
                    <imgUpload :imgSetting="upload" />
                </el-col>
            </el-row>

        </el-form>
    </div>
</template>

<script>
import imgUpload from "@/components/common/upload/imgUpload.vue";

export default {
    name: 'system-property',
    data() {
        return {
            isEdit: false,
            infoData: {
                name: 'xx'
            },
            form: {
                name: '绿城物业',
                time: '2019-07-10',
                tel1: '0571-888888',
                people: '马化腾',
                tel2: '0571-666666',
                address: '浙江',
                text: '绿城物业服务集团绿城物业服务集团绿城物业服务集团绿城物业服务集团绿城物业服务集团绿城物业服务集团'
            },
            rules: {
                name: [
                    {
                        required: true,
                        trigger: 'blur',
                        message: '请输入物业名称'
                    }
                ],
                time: [
                    {
                        required: true,
                        trigger: 'blur',
                        message: '请选择入驻时间'
                    }
                ],
                tel1: [
                    {
                        required: true,
                        trigger: 'blur',
                        message: '请输入物业电话'
                    }
                ],
                people: [
                    {
                        required: true,
                        trigger: 'blur',
                        message: '请输入公司法人'
                    }
                ],
                text: [
                    {
                        required: true,
                        trigger: 'blur',
                        message: '请输入物业介绍'
                    }
                ]
            },
            dialogImageUrl: '',
            dialogVisible: false,
            upload: {
                limit: 3,
                fileList: [{ name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }, { name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }],
            }
        }
    },
    created() {

    },
    methods: {
        // 提交保存
        commit() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    this.isEdit = !this.isEdit
                    // this.$systemApi.demo.add({
                    // }).then(res => {
                    //     console.log(res)
                    // }).catch(e => {
                    //     console.log(e)
                    // })
                }
            })
        },
        // 取消
        cancle() {
            this.isEdit = false
        },
    },
    components: {
        imgUpload
    }
}
</script>