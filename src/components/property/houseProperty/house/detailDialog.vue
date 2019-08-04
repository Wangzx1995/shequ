<template>
    <div>
        <el-dialog
            title="查看详情"
            :visible.sync="dialogVisible.detail"
            width="800px"
            :modal-append-to-body='false'
            center
            class="updateDialog"
            @close="closeDialog()"
        >

            <el-row>
                <el-col :span="3">
                    <span>房屋编号</span>
                </el-col>
                <el-col :span="8">
                    <span>{{form.code}}</span>
                </el-col>
                <el-col
                    :span="3"
                    :offset="1"
                >
                    <span>所属片区</span>
                </el-col>
                <el-col :span="8">
                    <span>{{form.areaName}}</span>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="3">
                    <span>业主</span>
                </el-col>
                <el-col :span="8">
                    <span>{{form.name}}</span>
                </el-col>
                <el-col
                    :span="3"
                    :offset="1"
                >
                    <span>所属楼栋</span>
                </el-col>
                <el-col :span="8">
                    <span>{{form.buildingName}}</span>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="3">
                    <span>建筑面积</span>
                </el-col>
                <el-col :span="8">
                    <span>{{form.acreage}}</span>
                </el-col>
                <el-col
                    :span="3"
                    :offset="1"
                >
                    <span>所属单元</span>
                </el-col>
                <el-col :span="8">
                    <span>{{form.elementName}}</span>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="3">
                    <span>户型</span>
                </el-col>
                <el-col :span="8">
                    <span>
                        {{form.houseType &&form.houseType.split(',')[0]}}房
                        {{form.houseType &&form.houseType.split(',')[1]}}厅
                        {{form.houseType &&form.houseType.split(',')[2]}}卫
                    </span>
                </el-col>
                <el-col
                    :span="3"
                    :offset="1"
                >
                    <span>房屋用途</span>
                </el-col>
                <el-col :span="8">
                    <DictionaryText
                        :typeCode="1005"
                        :dicCode="form.purpose"
                    />
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="3">
                    <span>朝向</span>
                </el-col>
                <el-col :span="8">
                    <DictionaryText
                        :typeCode="1006"
                        :dicCode="form.orientation"
                    />
                </el-col>
                <el-col
                    :span="3"
                    :offset="1"
                >
                    <span>产权性质</span>
                </el-col>
                <el-col :span="8">
                    <DictionaryText
                        :typeCode="1004"
                        :dicCode="form.nature"
                    />
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="3">
                    <span>住户可见</span>
                </el-col>
                <el-col :span="8">
                    <DictionaryText
                        :typeCode="1009"
                        :dicCode="form.residentVisible"
                    />
                </el-col>
                <el-col
                    :span="3"
                    :offset="1"
                >
                    <span>交付时间</span>
                </el-col>
                <el-col :span="8">
                    <span>{{form.delivery}}</span>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="3">
                    <span>房屋证件</span>
                </el-col>
                <el-col
                    :span="4"
                    v-for="img in (form.accessoryDocument && form.accessoryDocument.split(',')) || []"
                    :key="img.value"
                >
                    <img
                        v-imgPreview
                        style="width:90%;marginBottom:20px;marginRight:10px;"
                        :src="$joinImgPrefix(img)"
                    >
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="3">
                    <span>户型图</span>
                </el-col>
                <el-col
                    :span="4"
                    v-for="img in (form.floorPlan && form.floorPlan.split(',')) || []"
                    :key="img.value"
                >
                    <img
                        v-imgPreview
                        style="width:90%;marginBottom:20px;marginRight:10px;"
                        :src="$joinImgPrefix(img)"
                    >
                </el-col>
            </el-row>
            <el-row v-if="form.status==2">
                <el-col :span="3">
                    <span>未通过原因</span>
                </el-col>
                <el-col :span="21">
                    <span>{{form.reason}}</span>
                </el-col>
            </el-row>
            <div
                slot="footer"
                class="dialog-footer"
                style="text-align:center"
                v-if="dialogVisible.idEdit"
            >
                <el-divider></el-divider>
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
import DictionaryText from '@/components/common/select/DictionaryText'
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
                reason: [
                    { required: true, message: '请填写活动形式', trigger: 'blur' }
                ]
            },
        }
    },
    methods: {
        getItemName,
        //打开dialog
        showDialog(row) {
            this.dialogVisible.detail = true;
            this.$nextTick(() => {
                this.form = row
            })
        },
        //关闭dialog
        closeDialog() {
            this.form = {}
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
            form.status = status
            this.$propertyApi.houseProperty.house.update(form)
                .then(res => {
                    if (res.code == 1000) {
                        this.dialogVisible.detail = false
                        this.dialogVisible.innerVisible = false
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
        },
    },
    components: {
        DictionaryText
    }
}
</script>

<style>
</style>
