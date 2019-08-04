<template>
    <div>
        <el-dialog
            title="编辑员工"
            :visible.sync="dialogVisible"
            width="800px"
            :modal-append-to-body='false'
            center
        >
            <el-form
                :model="form"
                :rules="rules"
                ref="form"
                label-width="100px"
                class="demo-ruleForm dialog-form"
                label-position="left"
            >
                <el-row>
                    <el-col :span="11">
                        <el-form-item
                            label="员工姓名"
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
                            label="所属部门"
                            prop="deptCode"
                        >
                            <el-select
                                clearable
                                v-model="form.deptCode"
                                placeholder="请选择所属部门"
                            >
                                <el-option
                                    v-for="item in deptList"
                                    :key="item.value"
                                    :label="item.deptName"
                                    :value="item.deptCode"
                                ></el-option>
                            </el-select>
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
                            label="职务"
                            prop="dutyCode"
                        >
                            <el-select
                                clearable
                                v-model="form.dutyCode"
                                placeholder="请选择职务"
                            >
                                <el-option
                                    v-for="item in dutyList"
                                    :key="item.value"
                                    :label="item.dutyName"
                                    :value="item.dutyCode"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item
                            label="入职时间"
                            prop="entryTime"
                        >
                            <el-date-picker
                                v-model="form.entryTime"
                                type="date"
                                placeholder="选择日期"
                                value-format="yyyy/MM/dd"
                            >
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col
                        :span="11"
                        :offset="1"
                    >
                        <el-form-item
                            label="证件类型"
                            prop="certificateType"
                        >
                            <el-select
                                clearable
                                v-model="form.certificateType"
                                placeholder="请选择证件类型"
                            >
                                <el-option
                                    v-for="item in certificateList"
                                    :key="item.value"
                                    :label="item.dicName"
                                    :value="item.dicCode"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item
                            label="离职时间"
                            prop="resignationTime"
                        >
                            <el-date-picker
                                v-model="form.resignationTime"
                                type="date"
                                placeholder="选择日期"
                                value-format="yyyy/MM/dd"
                            >
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col
                        :span="11"
                        :offset="1"
                    >
                        <el-form-item
                            label="证件号码"
                            prop="certificateNum"
                        >
                            <el-input v-model="form.certificateNum"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item
                            label="联系方式"
                            prop="contactInfo"
                        >
                            <el-input v-model="form.contactInfo"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col
                        :span="11"
                        :offset="1"
                    >
                        <el-form-item
                            label="证件有效期"
                            prop="certificateTime"
                        >
                            <el-date-picker
                                v-model="form.certificateTime"
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
                            label="证件照片"
                            prop="certificateImg"
                        >
                            <imgUpload
                                :imgSetting="upload"
                                :getImgUrl="getImgUrl1"
                                ref="imgUpload1"
                                :imgUrls="(form.certificateImg&&[form.certificateImg.split(',')[0]])||[]"
                            />
                            <imgUpload
                                :imgSetting="upload"
                                :getImgUrl="getImgUrl2"
                                ref="imgUpload2"
                                :imgUrls="(form.certificateImg&&[form.certificateImg.split(',')[1]])||[]"
                            />
                        </el-form-item>
                    </el-col>
                    <el-col
                        :span="11"
                        :offset="1"
                    >
                        <el-form-item
                            label="采集照片"
                            prop="gatherImg"
                        >
                            <imgUpload
                                :imgSetting="upload"
                                :getImgUrl="getImgUrl3"
                                ref="imgUpload3"
                            />

                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div
                slot="footer"
                class="dialog-footer"
                style="text-align:center"
            >
                <el-button
                    type="primary"
                    @click="update()"
                >保 存</el-button>
                <el-button @click="dialogVisible = false">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import imgUpload from "@/components/common/upload/imgUpload.vue";
import { getItemName } from "@/filters/index.js";
export default {
    props: {
        updateForm: Object,
        deptList: Array,
        dutyList: Array,
        certificateList: Array,
    },
    data() {
        return {
            dialogVisible: false,
            form: {},
            rules: {
                userName: [
                    {
                        required: true,
                        message: "请输入员工姓名",
                        trigger: "blur"
                    }
                ],
                deptCode: [
                    {
                        required: true,
                        message: "请选择所属部门",
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
                dutyCode: [
                    {
                        required: true,
                        message: "请选择职务",
                        trigger: "change"
                    }
                ],
                entryTime: [
                    {
                        required: true,
                        message: "请选择入职时间",
                        trigger: "change"
                    }
                ],
                certificateType: [
                    {
                        required: true,
                        message: "请选择证件类型",
                        trigger: "change"
                    }
                ],
                certificateNum: [
                    {
                        required: true,
                        message: "请输入证件号码",
                        trigger: "blur"
                    }
                ],
                contactInfo: [
                    {
                        required: true,
                        message: "请输入联系方式",
                        trigger: "blur"
                    }
                ],
                certificateImg: [
                    {
                        required: true,
                        message: '请上传图片',
                        trigger: "change"
                    }
                ]
            },
            upload: {
                limit: 1,
                isShow: true
            },
        };
    },
    watch: {
        updateForm() {
            this.form = this.updateForm;
        },
        dialogVisible() {
            if (this.dialogVisible == false) {
                this.$parent.$refs.page.getList(this.$parent.$refs.page.pageIndex);
            }
        }
    },
    methods: {
        getItemName,
        //打开dialog
        showDialog() {
            this.dialogVisible = true;
        },
        //关闭dialog
        closeDialog() {
            this.dialogVisible = false;
        },
        //修改职务
        update() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    this.form.deptName = this.getItemName(this.form.deptCode, this.deptList, 'deptCode', 'deptName')
                    this.form.dutyName = this.getItemName(this.form.dutyCode, this.dutyList, 'dutyCode', 'dutyName')
                    this.$systemApi.estateManage.staffUpdate(this.form)
                        .then(res => {
                            if (res.code == 1000) {
                                this.dialogVisible = false
                                this.$$message({
                                    message: res.message,
                                    type: 'success'
                                })
                                this.$parent.$refs.page.getList(1);
                            } else {
                                this.$$message({
                                    message: res.message,
                                    type: 'error'
                                })
                            }
                        })
                }
            });
        },
        //获取图片
        getImgUrl1(data) {
            let arr = this.form.certificateImg.split(',')
            arr[0] = data
            this.form.certificateImg = arr.join(',')
            // console.log(this.form.certificateImg)
        },
        getImgUrl2(data) {
            let arr = this.form.certificateImg.split(',')
            arr[1] = data
            this.form.certificateImg = arr.join(',')
            // console.log(this.form.certificateImg)
        },
        getImgUrl3(data) {
            this.form.gatherImg[0] = data
        },
    },
    components: {
        imgUpload
    }
};
</script>

<style>
</style>
