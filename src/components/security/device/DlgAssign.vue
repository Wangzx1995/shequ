<template>
    <div>
        <el-dialog
            class="full-footer"
            title="选择派工"
            center
            :visible.sync="visible"
            width="530px"
            append-to-body
        >
            <el-form
                :model="form"
                :rules="rules"
                ref="form"
                label-width="80px"
            >
                <el-form-item
                    label="指派人"
                    prop="userId"
                >
                    <div class="_el-tag-group">
                        <el-tag
                            :key="user.id"
                            v-for="user in form.users"
                            class="blue"
                            closable
                            @close="form.users = []"
                        >{{ user.userName }}</el-tag>
                        <el-button
                            v-if="!form.users.length"
                            class="custom-mini blue"
                            icon="icon-x-renyuan"
                            size="small"
                            style="margin-left: 10px;"
                            @click="selectAssignUser"
                        >&nbsp;选择人员</el-button>
                    </div>
                </el-form-item>
                <el-form-item
                    label="备注"
                    prop="remark"
                >
                    <el-input
                        v-model="form.remark"
                        type="textarea"
                        style="width:100%"
                    ></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-link
                    class="off"
                    :underline="false"
                    @click="close"
                >取 消</el-link>
                <el-link
                    type="primary"
                    :underline="false"
                    @click="commit"
                >确 定</el-link>
            </div>
        </el-dialog>
        <UserTree
            maxLength="1"
            dateType="1"
            ref="dlgUserTree"
        />
    </div>
</template>

<script>
import UserTree from '@/components/common/tree/DlgUserTree'
export default {
    data() {
        const _this = this
        return {
            visible: false,
            callback: null,
            form: {
                id: null,
                userId: null,
                users: [],
                remark: null
            },
            rules: {
                userId: [
                    {
                        required: true,
                        validator(rule, value, callback) {
                            if (_this.form.users.length) {
                                callback()
                            } else {
                                callback(new Error('请选择指派人'))
                            }
                        }
                    }
                ]
            }
        }
    },
    methods: {
        commit() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    let form = {
                        id: this.form.id,
                        remark: this.form.remark,
                        handlePersonId: this.form.userId,
                        // 类型 1 派单 2 结束 3 撤销
                        selType: 1
                    }
                    this.$securityApi.device.update(form).then(res => {
                        if (res.code == 1000) {
                            this.$$notify({
                                message: '指派成功'
                            })
                            this.close()
                            this.callback()
                        } else {
                            this.$$message({
                                message: res.message
                            })
                        }
                    })
                }
            })
        },
        open(data, callback) {
            this.visible = true
            this.callback = callback
            this.form.id = data.id
        },
        close() {
            this.visible = false
            this.form = {
                id: null,
                userId: null,
                users: [],
                remark: null
            }
        },
        // 选择指派人
        selectAssignUser() {
            this.$refs.dlgUserTree.open(users => {
                this.form.users = users
                this.form.userId = users[0].id
                if (users.length) {
                    this.$refs.form.validateField('user')
                }
            })
        }
    },
    components: {
        UserTree
    }
}
</script>