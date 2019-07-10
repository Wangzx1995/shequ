<template>
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
                    >保存</el-button>
                    <el-button
                        type="info"
                        size="mini"
                        @click="cancle"
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
                    <span class="com-info-value">{{form.name}}</span>
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
                    <span class="com-info-value">{{form.year}}</span>
                </el-col>
            </el-row>
            <el-row class="com-info-group">
                <el-col :span="7">
                    <p class="com-info-label">建筑面积</p>
                    <span class="com-info-value">{{form.jzArea}}</span>
                </el-col>
                <el-col
                    :span="7"
                    :offset="1"
                >
                    <p class="com-info-label">占地面积</p>
                    <span class="com-info-value">{{form.zdArea}}</span>
                </el-col>
                <el-col
                    :span="7"
                    :offset="1"
                >
                    <p class="com-info-label">绿化率</p>
                    <span class="com-info-value">{{form.greenRate}}</span>
                </el-col>
            </el-row>
            <el-row class="com-info-group">
                <el-col :span="7">
                    <p class="com-info-label">容积率</p>
                    <span class="com-info-value">{{form.rjRate}}</span>
                </el-col>
                <el-col
                    :span="7"
                    :offset="1"
                >
                    <p class="com-info-label">负责人</p>
                    <span class="com-info-value">{{form.people}}</span>
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
                        label="小区名称"
                    >
                        <el-input
                            v-model="form.name"
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
                        prop="year"
                        label="建筑年代"
                    >
                        <el-input
                            v-model="form.year"
                            placeholder="请输入建筑年代"
                        />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="7">
                    <el-form-item
                        prop="jzArea"
                        label="建筑面积"
                    >
                        <el-input
                            v-model="form.jzArea"
                            placeholder="请输入建筑面积"
                        />
                    </el-form-item>
                </el-col>
                <el-col
                    :span="7"
                    :offset="1"
                >
                    <el-form-item
                        prop="zdArea"
                        label="占地面积"
                    >
                        <el-input
                            v-model="form.zdArea"
                            placeholder="请输入占地面积"
                        />
                    </el-form-item>
                </el-col>
                <el-col
                    :span="7"
                    :offset="1"
                >
                    <el-form-item
                        prop="greenRate"
                        label="绿化率"
                    >
                        <el-input
                            v-model="form.greenRate"
                            placeholder="请输入绿化率"
                        />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="7">
                    <el-form-item
                        prop="rjRate"
                        label="容积率"
                    >
                        <el-input
                            v-model="form.rjRate"
                            placeholder="请输入容积率"
                        />
                    </el-form-item>
                </el-col>
                <el-col
                    :span="7"
                    :offset="1"
                >
                    <el-form-item
                        prop="people"
                        label="负责人"
                    >
                        <el-input
                            v-model="form.people"
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
                        prop="text"
                        label="小区介绍"
                    >
                        <el-input
                            type="textarea"
                            :rows="8"
                            placeholder="请输入小区介绍"
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
                    <el-form-item label="小区图片">
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
    name: 'system-CommunityInfo',
    data() {
        return {
            isEdit: false,
            infoData: {
                name: 'xx'
            },
            form: {
                name: '中栋国际1期',
                address: '浙江省杭州市滨江区西兴街道201号',
                year: '2016',
                jzArea: '23600平米',
                zdArea: '36000平米',
                greenRate: '30%',
                rjRate: '89%',
                people: '陈山',
                tel: '0551-6217788',
                text: '小区户型本小区80多栋楼，多为四层，五层，六层，极少七层，主要面积有49平58平73平，楼间距大，采光好生活配套小区北邻500米就是东湖公园东湖银座，小区西北方向1000米就是第 一人民医院教育情况本小区内有迎春中学迎春小学及迎春幼儿园，迎春中学师资力量雄厚，凭房产证可入学，迎春中学新建教学楼。小区不足小区房龄较长，绿化较少'
            },
            rules: {
                name: [
                    {
                        required: true,
                        trigger: 'blur',
                        message: '请输入小区名称'
                    }
                ],
                year: [
                    {
                        required: true,
                        trigger: 'blur',
                        message: '请输入建筑年代'
                    }
                ],
                jzArea: [
                    {
                        required: true,
                        trigger: 'blur',
                        message: '请输入建筑面积'
                    }
                ],
                rjRate: [
                    {
                        required: true,
                        trigger: 'blur',
                        message: '请输入容积率'
                    }
                ],
                people: [
                    {
                        required: true,
                        trigger: 'blur',
                        message: '请输入负责人'
                    }
                ],
                tel: [
                    {
                        required: true,
                        trigger: 'blur',
                        message: '请输入联系电话'
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