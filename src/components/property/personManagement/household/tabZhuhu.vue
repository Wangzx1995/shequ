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
                        label="姓名"
                        prop="name"
                    >
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col
                    :span="11"
                    :offset="1"
                >
                    <el-form-item
                        label="证件类型"
                        prop="documentType"
                    >
                        <Dictionary
                            :typeCode="1003"
                            v-model="form.documentType"
                        />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="11">
                    <el-form-item
                        label="性别"
                        prop="sex"
                    >
                        <el-radio-group v-model="form.sex">
                            <el-radio :label="1">男</el-radio>
                            <el-radio :label="2">女</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
                <el-col
                    :span="11"
                    :offset="1"
                >
                    <el-form-item
                        label="证件号码"
                        prop="documentNumber"
                    >
                        <el-input v-model="form.documentNumber"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="11">
                    <el-form-item
                        label="民族"
                        prop="nation"
                    >
                        <Dictionary
                            :typeCode="1010"
                            v-model="form.nation"
                        />
                    </el-form-item>
                </el-col>
                <el-col
                    :span="11"
                    :offset="1"
                >
                    <el-form-item
                        label="入住时间"
                        prop="checkIn"
                    >
                        <el-date-picker
                            v-model="form.checkIn"
                            type="date"
                            value-format="yyyy/MM/dd"
                            placeholder="选择日期"
                        >
                        </el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="11">
                    <el-form-item
                        label="手机号"
                        prop="phone"
                    >
                        <el-input v-model="form.phone"></el-input>
                    </el-form-item>
                </el-col>
                <el-col
                    :span="11"
                    :offset="1"
                >
                    <el-form-item
                        label="特殊人群"
                        prop="spcialCrowd"
                    >
                        <Dictionary
                            :typeCode="1011"
                            v-model="form.spcialCrowd"
                        />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="11">
                    <el-form-item
                        label="婚姻状况"
                        prop="marriage"
                    >
                        <Dictionary
                            :typeCode="1015"
                            v-model="form.marriage"
                        />
                    </el-form-item>
                </el-col>
                <el-col
                    :span="11"
                    :offset="1"
                >
                    <el-form-item
                        label="学历"
                        prop="education"
                    >
                        <Dictionary
                            :typeCode="1012"
                            v-model="form.education"
                        />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="11">
                    <el-form-item
                        label="国籍"
                        prop="nationality"
                    >
                        <Dictionary
                            :typeCode="1013"
                            v-model="form.nationality"
                        />
                    </el-form-item>
                </el-col>
                <el-col
                    :span="11"
                    :offset="1"
                >
                    <el-form-item
                        label="政治面貌"
                        prop="politicsStatus"
                    >
                        <Dictionary
                            :typeCode="1014"
                            v-model="form.politicsStatus"
                        />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="11">
                    <el-form-item
                        label="籍贯"
                        prop="nativePlace"
                    >
                        <el-input v-model="form.nativePlace"></el-input>
                    </el-form-item>
                </el-col>
                <el-col
                    :span="11"
                    :offset="1"
                >
                    <el-form-item
                        label="户籍地址"
                        prop="domicileAddress"
                    >
                        <el-input v-model="form.domicileAddress"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="11">
                    <el-form-item
                        label="从事职业"
                        prop="profession"
                    >
                        <el-input v-model="form.profession"></el-input>
                    </el-form-item>
                </el-col>
                <el-col
                    :span="11"
                    :offset="1"
                >
                    <el-form-item
                        label="工作单位"
                        prop="workUnit"
                    >
                        <el-input v-model="form.workUnit"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="11">
                    <el-form-item
                        label="身份类型"
                        prop="identityType"
                    >
                        <Dictionary
                            :typeCode="1007"
                            v-model="form.identityType"
                        />
                    </el-form-item>
                </el-col>
                <el-col
                    :span="11"
                    :offset="1"
                >
                    <el-form-item
                        label="是否业主入住"
                        prop="ifOwner"
                    >
                        <el-radio-group v-model="form.ifOwner">
                            <el-radio :label="1">是</el-radio>
                            <el-radio :label="2">否</el-radio>
                        </el-radio-group>
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
                            :getImgUrl="getImgUrl4"
                            ref="imgUpload4"
                            :imgUrls="form.accessoryContract"
                        />
                    </el-form-item>
                </el-col>
                <el-col
                    :span="11"
                    :offset="1"
                    v-if="identityTypeShow"
                >
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="合同开始日">
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
                        <el-col :span="24">
                            <el-form-item label="合同结束日">
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
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="11">
                    <el-form-item
                        label="证件照片"
                        prop="accessoryCard"
                    >
                        <imgUpload
                            :imgSetting="upload"
                            :getImgUrl="getImgUrl1"
                            ref="imgUpload1"
                            :imgUrls="(form.accessoryCard&&form.accessoryCard[0]) ? [form.accessoryCard[0]] : []"
                        />
                        <imgUpload
                            :imgSetting="upload"
                            :getImgUrl="getImgUrl2"
                            ref="imgUpload2"
                            :imgUrls="(form.accessoryCard&&form.accessoryCard[1]) ? [form.accessoryCard[1]] : []"
                        />
                    </el-form-item>
                </el-col>
                <el-col
                    :span="11"
                    :offset="1"
                >
                    <el-form-item
                        label="采集照片"
                        prop="accessoryPicture"
                    >
                        <imgUpload
                            :imgSetting="upload"
                            :getImgUrl="getImgUrl3"
                            ref="imgUpload3"
                            :imgUrls="form.accessoryPicture"
                        />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="11">
                    <el-form-item
                        label="业主姓名"
                        prop="userName"
                    >
                        <el-input v-model="form.userName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col
                    :span="11"
                    :offset="1"
                >
                    <el-form-item
                        label="所属单元"
                        prop="elementId"
                    >
                        <elementId
                            :buildingId="form.buildingId"
                            v-model="form.elementId"
                        />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="11">
                    <el-form-item
                        label="所属片区"
                        prop="areaId"
                    >
                        <areaId v-model="form.areaId" />
                    </el-form-item>
                </el-col>
                <el-col
                    :span="11"
                    :offset="1"
                >
                    <el-form-item
                        label="所属房屋"
                        prop="roomId"
                    >
                        <roomId
                            :elementId="form.elementId"
                            v-model="form.roomId"
                        />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="11">
                    <el-form-item
                        label="所属楼栋"
                        prop="buildingId"
                    >
                        <buildingId
                            :areaId="form.areaId"
                            v-model="form.buildingId"
                        />
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>

<script>
import imgUpload from "@/components/common/upload/imgUpload.vue";
import Dictionary from "@/components/common/select/Dictionary";
import areaId from "@/components/property/selectForm/areaId";
import buildingId from "@/components/property/selectForm/buildingId";
import elementId from "@/components/property/selectForm/elementId";
import roomId from "@/components/property/selectForm/roomId";

export default {
    props: {
        form: {
            type: Object,
            default: () => ({
                accessoryCard: [],
                accessoryContract: [],
                accessoryPicture: [],
                areaId: null,
                buildingId: null,
                checkIn: null,
                documentNumber: null,
                documentType: null,
                domicileAddress: null,
                education: null,
                elementId: null,
                endtime: null,
                identityType: null,
                ifOwner: null,
                marriage: null,
                name: null,
                nation: null,
                nationality: null,
                nativePlace: null,
                phone: null,
                politicsStatus: null,
                profession: null,
                reason: null,
                roomId: null,
                sex: null,
                spcialCrowd: null,
                starttime: null,
                status: null,
                userName: null,
                workUnit: null
            })
        }
    },
    data() {
        return {
            rules: {
                name: [
                    {
                        required: true,
                        message: "请输入姓名",
                        trigger: "blur"
                    }
                ],
                documentType: [
                    {
                        required: true,
                        message: "请选择证件类型",
                        trigger: "change"
                    }
                ],
                sex: [
                    {
                        required: true,
                        message: "请选择性别",
                        trigger: "change"
                    }
                ],
                documentNumber: [
                    {
                        required: true,
                        message: "请输入证件号码",
                        trigger: "blur"
                    }
                ],
                nation: [
                    {
                        required: true,
                        message: "请选择民族",
                        trigger: "change"
                    }
                ],
                checkIn: [
                    {
                        required: true,
                        message: "请选择入住时间",
                        trigger: "change"
                    }
                ],
                phone: [
                    {
                        required: true,
                        message: "请输入手机号",
                        trigger: "blur"
                    }
                ],
                identityType: [
                    {
                        required: true,
                        message: "请选择身份类型",
                        trigger: "change"
                    }
                ],
                accessoryCard: [
                    {
                        required: true,
                        message: "请上传照片",
                        trigger: "blur"
                    }
                ],
                userName: [
                    {
                        required: true,
                        message: "请输入业主姓名",
                        trigger: "blur"
                    }
                ],
                buildingId: [
                    {
                        required: true,
                        message: "请选择所属楼栋",
                        trigger: "change"
                    }
                ],
                elementId: [
                    {
                        required: true,
                        message: "请选择所属单元",
                        trigger: "change"
                    }
                ],
                roomId: [
                    {
                        required: true,
                        message: "请选择所属房屋",
                        trigger: "change"
                    }
                ]
            },
            upload: {
                limit: 1,
                isShow: true
            },
            identityTypeShow: false
        };
    },
    watch: {
        "form.identityType"() {
            if (this.form.identityType == "1007-2") {
                this.identityTypeShow = true;
            } else {
                this.identityTypeShow = false;
                this.form.starttime = null;
                this.form.endtime = null;
            }
        }
    },
    mounted() {},
    methods: {
        //获取图片
        getImgUrl1(data) {
            this.form.accessoryCard[0] = data;
        },
        getImgUrl2(data) {
            this.form.accessoryCard[1] = data;
        },
        getImgUrl3(data) {
            this.form.accessoryPicture[0] = data;
        },
        getImgUrl4(data) {
            this.form.accessoryContract[0] = data;
        }
        // imgString() {
        //     this.form.accessoryCard = this.form.accessoryCard.join(',')
        // }
    },
    components: {
        imgUpload,
        Dictionary,
        areaId,
        buildingId,
        elementId,
        roomId
    }
};
</script>

<style>
</style>
