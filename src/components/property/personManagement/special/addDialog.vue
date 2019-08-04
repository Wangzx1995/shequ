<template>
    <div>
        <el-dialog
            title="新增特殊人群"
            :visible.sync="dialogVisible"
            width="500px"
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
                                label="特殊人群"
                                prop="spcialCrowd"
                            >
                                <Dictionary
                                    :typeCode="1011"
                                    v-model="form.spcialCrowd"
                                />
                                <el-button
                                    type="primary"
                                    plain
                                    size="mini"
                                >图标</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item
                                label="关联人员"
                                prop="userId"
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
import Dictionary from "@/components/common/select/Dictionary";
import areaId from "@/components/property/selectForm/areaId";
import buildingId from "@/components/property/selectForm/buildingId";
import elementId from "@/components/property/selectForm/elementId";
import roomId from "@/components/property/selectForm/roomId";

import peopleTree from "@/components/common/tree/personManagement/peopleTree";

export default {
    data() {
        const _this = this;
        return {
            dialogVisible: false,
            form: {
                accessoryIcon: null,
                users: [],
                spcialCrowd: null,
                userId: null
            },
            rules: {
                spcialCrowd: [
                    {
                        required: true,
                        message: "请选择特殊人群",
                        trigger: "change"
                    }
                ],
                userId: [
                    {
                        required: true,
                        validator(rule, value, callback) {
                            if (_this.form.users.length) {
                                callback();
                            } else {
                                callback(new Error("请选择关联人员"));
                            }
                        }
                    }
                ]
            }
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
                    let ids = [];
                    for (let i in this.form.users) {
                        ids.push(this.form.users[i].id);
                    }
                    this.$propertyApi.personManagement.household
                        .updateList({
                            accessoryIcon: this.form.accessoryIcon,
                            ids: ids,
                            spcialCrowd: this.form.spcialCrowd
                        })
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
            this.$refs.peopleTree.open(users => {
                this.form.users = users;
                this.form.userId = users[0].id;
                if (users.length) {
                    this.$refs.form.validateField("user");
                }
            });
        },
        //删除已选人员
        closeUsers(index) {
            this.form.users.splice(index, 1);
        }
    },
    components: {
        Dictionary,
        areaId,
        buildingId,
        elementId,
        roomId,
        peopleTree
    }
};
</script>


