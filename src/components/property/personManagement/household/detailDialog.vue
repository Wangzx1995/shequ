<template>
    <div>
        <el-dialog
            title="查看详情"
            :visible.sync="dialogVisible.detail"
            width="800px"
            :modal-append-to-body='false'
            center
            class="detailDialog"
            @close="closeDialog()"
        >
            <div class="dialogBody">
                <el-row>
                    <el-col :span="3">
                        <span>姓名</span>
                    </el-col>
                    <el-col :span="8">
                        <span>{{form.name}}</span>
                    </el-col>
                    <el-col
                        :span="3"
                        :offset="1"
                    >
                        <span>证件类型</span>
                    </el-col>
                    <el-col :span="8">
                        <DictionaryText
                            :typeCode="1003"
                            :dicCode="form.documentType"
                        />
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="3">
                        <span>性别</span>
                    </el-col>
                    <el-col :span="8">
                        <span v-if="form.sex==1">男</span>
                        <span v-if="form.sex==2">女</span>
                    </el-col>
                    <el-col
                        :span="3"
                        :offset="1"
                    >
                        <span>证件号码</span>
                    </el-col>
                    <el-col :span="8">
                        <span>{{form.documentNumber}}</span>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="3">
                        <span>年龄</span>
                    </el-col>
                    <el-col :span="8">
                        <span>{{form.age}}</span>
                    </el-col>
                    <el-col
                        :span="3"
                        :offset="1"
                    >
                        <span>入住时间</span>
                    </el-col>
                    <el-col :span="8">
                        <span>{{form.checkIn}}</span>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="3">
                        <span>民族</span>
                    </el-col>
                    <el-col :span="8">
                        <DictionaryText
                            :typeCode="1010"
                            :dicCode="form.nation"
                        />
                    </el-col>
                    <el-col
                        :span="3"
                        :offset="1"
                    >
                        <span>特殊人群</span>
                    </el-col>
                    <el-col :span="8">
                        <DictionaryText
                            :typeCode="1011"
                            :dicCode="form.spcialCrowd"
                        />
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="3">
                        <span>手机号码</span>
                    </el-col>
                    <el-col :span="8">
                        <span>{{form.phone}}</span>
                    </el-col>
                    <el-col
                        :span="3"
                        :offset="1"
                    >
                        <span>学历</span>
                    </el-col>
                    <el-col :span="8">
                        <DictionaryText
                            :typeCode="1012"
                            :dicCode="form.education"
                        />
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="3">
                        <span>婚姻状况</span>
                    </el-col>
                    <el-col :span="8">
                        <DictionaryText
                            :typeCode="1015"
                            :dicCode="form.marriage"
                        />
                    </el-col>
                    <el-col
                        :span="3"
                        :offset="1"
                    >
                        <span>政治面貌</span>
                    </el-col>
                    <el-col :span="8">
                        <DictionaryText
                            :typeCode="1014"
                            :dicCode="form.politicsStatus"
                        />
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="3">
                        <span>国籍</span>
                    </el-col>
                    <el-col :span="8">
                        <DictionaryText
                            :typeCode="1013"
                            :dicCode="form.nationality"
                        />
                    </el-col>
                    <el-col
                        :span="3"
                        :offset="1"
                    >
                        <span>户籍地址</span>
                    </el-col>
                    <el-col :span="8">
                        <span>{{form.domicileAddress}}</span>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="3">
                        <span>籍贯</span>
                    </el-col>
                    <el-col :span="8">
                        <span>{{form.nativePlace}}</span>
                    </el-col>
                    <el-col
                        :span="3"
                        :offset="1"
                    >
                        <span>工作单位</span>
                    </el-col>
                    <el-col :span="8">
                        <span>{{form.workUnit}}</span>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="3">
                        <span>从事职业</span>
                    </el-col>
                    <el-col :span="8">
                        <span>{{form.profession}}</span>
                    </el-col>
                    <el-col
                        :span="3"
                        :offset="1"
                        v-if="form.identityType == '1007-2'"
                    >
                        <span>合同开始日</span>
                    </el-col>
                    <el-col
                        :span="8"
                        v-if="form.identityType == '1007-2'"
                    >
                        <span>{{form.starttime}}</span>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="3">
                        <span>身份类型</span>
                    </el-col>
                    <el-col :span="8">
                        <DictionaryText
                            :typeCode="1007"
                            :dicCode="form.identityType"
                        />
                    </el-col>
                    <el-col
                        :span="3"
                        :offset="1"
                        v-if="form.identityType == '1007-2'"
                    >
                        <span>合同结束日</span>
                    </el-col>
                    <el-col
                        :span="8"
                        v-if="form.identityType == '1007-2'"
                    >
                        <span>{{form.endtime}}</span>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="3">
                        <span>租房合同</span>
                    </el-col>
                    <el-col :span="8">
                        <img
                            v-imgPreview
                            :src="$joinImgPrefix(form.accessoryContract)"
                        >
                    </el-col>
                    <el-col
                        :span="3"
                        :offset="1"
                    >
                        <span>采集照片</span>
                    </el-col>
                    <el-col :span="8">
                        <img
                            v-imgPreview
                            :src="$joinImgPrefix(form.accessoryPicture)"
                        >
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="3">
                        <span>证件照片</span>
                    </el-col>
                    <el-col :span="8">
                        <img
                            v-imgPreview
                            :src="$joinImgPrefix(form.accessoryCard&&form.accessoryCard.split(',')[0])"
                        >
                        <img
                            v-imgPreview
                            :src="$joinImgPrefix(form.accessoryCard&&form.accessoryCard.split(',')[1])"
                        >
                    </el-col>
                </el-row>
                <el-divider content-position="left">关联房屋信息</el-divider>
                <el-row>
                    <el-col :span="3">
                        <span>所属片区</span>
                    </el-col>
                    <el-col :span="8">
                        <span>{{form.areaName}}</span>
                    </el-col>
                    <el-col
                        :span="3"
                        :offset="1"
                    >
                        <span>单元名称</span>
                    </el-col>
                    <el-col :span="8">
                        <span>{{form.elementName}}</span>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="3">
                        <span>楼栋名称</span>
                    </el-col>
                    <el-col :span="8">
                        <span>{{form.buildingName}}</span>
                    </el-col>
                    <el-col
                        :span="3"
                        :offset="1"
                    >
                        <span>房屋名称</span>
                    </el-col>
                    <el-col :span="8">
                        <span>{{form.roomName}}</span>
                    </el-col>
                </el-row>
                <el-divider content-position="left">续租信息</el-divider>
                <el-row>
                    <el-col
                        :span="11"
                        v-for="(item,index) in list"
                        :key="index"
                        :offset="index%2==0?0:1"
                        class="zufangxinxi"
                    >
                        <el-row>
                            <el-col :span="6">
                                <span>合同开始日</span>
                            </el-col>
                            <el-col :span="16">
                                <span>{{item.starttime}}</span>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="6">
                                <span>合同结束日</span>
                            </el-col>
                            <el-col :span="16">
                                <span>{{item.endtime}}</span>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="6">
                                <span>租房合同</span>
                            </el-col>
                            <el-col :span="16">
                                <img
                                    v-imgPreview
                                    :src="$joinImgPrefix(item.accessoryContract)"
                                >
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
            </div>
            <div
                slot="footer"
                class="dialog-footer"
                style="text-align:center"
                v-if="dialogVisible.idEdit"
            >
                <el-button
                    type="primary"
                    @click="auditing(form,1)"
                >审批通过</el-button>
                <el-button @click="dialogVisible.innerVisible = true">审批未通过</el-button>
            </div>
        </el-dialog>
        <el-dialog
            width="30%"
            title="原因"
            :visible.sync="dialogVisible.innerVisible"
            :modal-append-to-body='false'
            center
        >
            <el-form
                :model="form"
                :rules="rules"
                ref="ruleForm"
                label-width="0px"
                class="demo-ruleForm"
            >
                <el-form-item prop="reason">
                    <el-input
                        type="textarea"
                        :rows="5"
                        placeholder="请输入内容"
                        v-model="form.reason"
                    >
                    </el-input>
                </el-form-item>
            </el-form>
            <div
                slot="footer"
                class="dialog-footer"
                style="text-align:center"
            >
                <el-button
                    type="primary"
                    @click="auditing(form,2)"
                >提交</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { getItemName } from "@/filters/index.js";
import DictionaryText from "@/components/common/select/DictionaryText";
export default {
    data() {
        return {
            dialogVisible: {
                detail: false,
                innerVisible: false,
                idEdit: false
            },
            form: {},
            rules: {
                reason: [{ required: true, message: "请填写", trigger: "blur" }]
            },
            list: []
        };
    },
    methods: {
        getItemName,
        //打开dialog
        showDialog(row) {
            this.dialogVisible.detail = true;
            this.$nextTick(() => {
                this.form = row;
                this.getListContinue()
            })
        },
        //关闭dialog
        closeDialog() {
            this.form = {};
            this.dialogVisible.detail = false;
        },
        //审核操作
        openEditDialog() {
            this.dialogVisible.idEdit = true;
        },
        closeEditDialog() {
            this.dialogVisible.idEdit = false;
        },
        //审核
        auditing(form, status) {
            form.status = status;
            this.$propertyApi.personManagement.household
                .update(form)
                .then(res => {
                    if (res.code == 1000) {
                        this.dialogVisible.detail = false;
                        this.dialogVisible.innerVisible = false;
                        this.$$message({
                            message: res.message,
                            type: "success"
                        });
                        this.$parent.$refs.page.getList(1);
                    } else {
                        this.$$message({
                            message: res.message,
                            type: "error"
                        });
                    }
                });
        },
        //获取续租信息
        getListContinue() {
            this.$propertyApi.personManagement.household
                .listContinue({
                    id: this.form.id
                })
                .then(res => {
                    if (res.code == 1000) {
                        this.list = res.data
                    } else {
                        this.$$message({
                            message: res.message,
                            type: "error"
                        });
                    }
                });
        }
    },
    components: {
        DictionaryText
    }
};
</script>

<style lang="less" scoped>
img {
    height: 120px;
    max-width: 240px;
}
.zufangxinxi {
    border: 1px solid #ccc;
    margin-bottom: 20px;
}
</style>

