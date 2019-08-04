<template>
    <div>
        <el-dialog
            title="新增特殊人群"
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
                    label-width="110px"
                    class="demo-ruleForm dialog-form"
                    label-position="left"
                >
                    <el-row>
                        <el-col :span="24">
                            <el-form-item
                                label="探望监督"
                                prop="type"
                            >
                                <Dictionary
                                    :typeCode="1016"
                                    v-model="form.type"
                                />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item
                                label="上门人员"
                                prop="workerId"
                            >
                                <el-tag
                                    :key="user.id"
                                    v-for="(user,index) in form.users"
                                    class="green"
                                    closable
                                    @close="closeUsers(index)"
                                >{{ user.userName }}</el-tag>
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
                            <el-form-item label="上门时间">
                                <el-date-picker
                                    v-model="form.visittime"
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
                            <el-form-item label="状态">
                                <el-radio-group v-model="form.status">
                                    <el-radio :label="1">非常好</el-radio>
                                    <el-radio :label="2">好</el-radio>
                                    <el-radio :label="3">差</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="20">
                            <el-form-item label="记录内容">
                                <el-input
                                    type="textarea"
                                    v-model="form.content"
                                ></el-input>
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
        <DeptTree
            title="选择人员"
            maxLength="1"
            dateType="1"
            ref="DeptTree"
        />
    </div>
</template>

<script>
import Dictionary from "@/components/common/select/Dictionary";
import areaId from "@/components/property/selectForm/areaId";
import buildingId from "@/components/property/selectForm/buildingId";
import elementId from "@/components/property/selectForm/elementId";
import roomId from "@/components/property/selectForm/roomId";

import DeptTree from '@/components/common/tree/personManagement/DeptTree'
import { nextTick } from 'q';

export default {
    data() {
        const _this = this
        return {
            dialogVisible: false,
            form: {
                userId: null,
                workerId: null,
                type: null,
                visittime: null,
                status: null,
                content: null,
                users: [],
            },
            rules: {},
        };
    },
    methods: {
        //打开dialog
        showDialog(row) {
            this.dialogVisible = true;
            this.$nextTick(() => {
                console.log(row)
                this.form.userId = row.id
            })
        },
        //关闭dialog
        closeDialog() {
            this.dialogVisible = false;
        },
        //新增操作
        add() {
            console.log(this.form)
            this.$refs.form.validate(valid => {
                if (valid) {
                    this.$propertyApi.personManagement.special.add(this.form)
                        .then(res => {
                            if (res.code == 1000) {
                                this.dialogVisible = false;
                                this.$$message({
                                    message: res.message,
                                    type: "success"
                                });
                                this.$parent.$refs.page.getList(1);
                                this.$refs.form.resetFields();
                            } else {
                                this.$$message({
                                    message: res.message,
                                    type: "error"
                                });
                            }
                        });
                }
            });
        },
        // 选择指派人
        selectAssignUser() {
            this.$refs.DeptTree.open(users => {
                this.form.users = users
                this.form.workerId = users[0].id
                if (users.length) {
                    this.$refs.form.validateField('user')
                }
            })
        },
        //删除已选人员
        closeUsers(index) {
            this.form.users.splice(index, 1)
        }
    },
    components: {
        Dictionary,
        areaId,
        buildingId,
        elementId,
        roomId,
        DeptTree
    }
};
</script>

<style>
</style>
