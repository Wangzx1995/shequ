<template>
    <div>
        <el-dialog
            title="新增报修"
            :visible.sync="dialogVisible"
            width="800px"
            :modal-append-to-body='false'
            center
            @close="closeDialog()"
        >
            <div class="dialogBody specialPeople">

                <el-form
                    :model="form"
                    :rules="rules"
                    ref="form"
                    label-width="100px"
                    class="demo-ruleForm dialog-form"
                    label-position="left"
                >
                    <el-row>
                        <el-col :span="24">
                            <el-form-item
                                label="报修人员"
                                prop="reportId"
                            >
                                <el-tag
                                    :key="user.id"
                                    v-for="(user,index) in form.users"
                                    class="green"
                                    closable
                                    @close="closeUsers(index)"
                                >{{ user.name }}</el-tag>
                                <el-button
                                    v-if="!form.users.length"
                                    class="custom-mini green"
                                    icon="icon-x-renyuan"
                                    size="mini"
                                    style="padding:0 10px"
                                    @click="selectAssignUser"
                                    type="primary"
                                    plain
                                >选择人员</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item
                                label="报修类型"
                                prop="type"
                            >
                                <Dictionary
                                    :typeCode="1019"
                                    v-model="form.type"
                                />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item
                                label="报修地址"
                                prop="address"
                            >
                                <el-input
                                    v-model="form.address"
                                    placeholder="报修地址"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="20">
                            <el-form-item
                                label="报修内容"
                                prop="content"
                            >
                                <el-input
                                    type="textarea"
                                    v-model="form.content"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item
                                label="图片"
                                prop="accessory"
                            >
                                <imgUpload
                                    :imgSetting="{
                                    limit: 3,
                                }"
                                    :getImgUrl="getImgUrl1"
                                    ref="imgUpload1"
                                />
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <div
                slot="footer"
                class="dialog-footer"
                style="text-align:center"
            >
                <el-button
                    type="primary"
                    @click="add()"
                >保 存</el-button>
                <el-button @click="closeDialog()">取 消</el-button>
            </div>
        </el-dialog>
        <peopleTree
            title="选择人员"
            dateType="1"
            ref="peopleTree"
        />
    </div>
</template>

<script>
import imgUpload from "@/components/common/upload/imgUpload.vue";
import Dictionary from "@/components/common/select/Dictionary";

import peopleTree from '@/components/common/tree/personManagement/peopleTree'

export default {
    props: {},
    data() {
        const _this = this
        return {
            dialogVisible: false,
            form: {
                accessory: [],
                address: null,
                content: null,
                reportId: null,
                type: null,
                users: [],
                status: 1
            },
            rules: {
                type: [
                    {
                        required: true,
                        message: "请选择报修类型",
                        trigger: "change"
                    }
                ],
                address: [
                    {
                        required: true,
                        message: "请输入报修地址",
                        trigger: "blur"
                    }
                ],
                content: [
                    {
                        required: true,
                        message: "请输入报修内容",
                        trigger: "blur"
                    }
                ],
                reportId: [
                    {
                        required: true,
                        validator(rule, value, callback) {
                            if (_this.form.users.length) {
                                callback()
                            } else {
                                callback(new Error('请选择报修人员'))
                            }
                        }
                    }
                ]
            },
        };
    },
    methods: {
        //打开dialog
        showDialog() {
            this.dialogVisible = true;
        },
        //关闭dialog
        closeDialog() {
            this.dialogVisible = false;
        },
        //新增操作
        add() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    let addForm = {
                        ...this.form,
                        accessory: this.form.accessory.join(','),
                    }
                    this.$propertyApi.propertyWarranty.acceptAssignment.add(addForm)
                        .then(res => {
                            if (res.code == 1000) {
                                this.dialogVisible = false
                                this.$$message({
                                    message: res.message,
                                    type: 'success'
                                })
                                this.$parent.$refs.page.getList(1);
                                this.$refs.form.resetFields();
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
        // 选择指派人
        selectAssignUser() {
            this.$refs.peopleTree.open(users => {
                this.form.users = users
                this.form.reportId = users[0].id
                if (users.length) {
                    this.$refs.form.validateField('user')
                }
            })
        },
        //删除已选人员
        closeUsers(index) {
            this.form.users.splice(index, 1)
        },
        //获取图片
        getImgUrl1(data) {
            this.form.accessory = data.split(',');
        },
    },
    components: {
        imgUpload,
        Dictionary,
        peopleTree
    }
};
</script>

<style>
</style>
