<template>
    <div>
        <div class="clear">
            <el-button type="primary" plain size="mini" icon="icon-x-xinzengcopy" class="fr" @click="addVisible = true">&nbsp;&nbsp;新增</el-button>
            <span class="com-page-header-title tag" style="padding-left: 20px;">
                <el-link type="primary" :underline="false"><i class="icon-x-jiegou line-tag" style="font-size: 16px;top: 4px;"></i></el-link>
                <strong>人员组</strong>
            </span>
        </div>
        <div class="user-group clear">
            <template v-if="list.length > 0">
                <dl v-for="(lst, index) in list" :key="lst.id">
                    <dt>
                        <span class="title">{{ lst.groupName }}<font>（组长：{{ lst.leaderName }}）</font></span>
                        <div class="btns">
                            <el-link type="primary" icon="el-icon-edit" @click="edit(lst)"/>
                            <el-link type="danger" icon="el-icon-delete" @click="del(lst, index)"/>
                        </div>
                    </dt>
                    <dd>
                        <div class="user-list">
                            <span v-for="user in lst.preGroupMembers" :key="user.userId">{{ user.userName }}</span>
                        </div>
                        <p class="duty">职责：{{ lst.responsibility }}</p>
                    </dd>
                </dl>
            </template>
            <div v-else class="com-loading-text">暂无数据</div>
        </div>
        <!-- 分页 -->
        <CtrlPage :setPage="getList" align="center" ref="page" v-show="total > list.length"/>

        <el-dialog class="select-user-dlg full-footer" :title="`${!addForm.id ? '新增' : '修改'}人员组`" :visible.sync="addVisible" append-to-body center :close-on-click-modal="false" width="520px">
            <el-form :model="addForm" ref="addForm" :rules="rules" label-width="90px">
                <el-form-item label="组名称" prop="groupName">
                    <el-input v-model="addForm.groupName"></el-input>
                </el-form-item>
                <el-form-item label="人员选择" prop="preGroupMembers">
                    <el-tag
                        class="blue"
                        :key="lst.id"
                        v-for="lst in addForm.preGroupMembers"
                        closable
                        @close="delSelectedUser(lst)"
                    >{{ lst.userName }}</el-tag>
                    <el-button class="blue" size="mini" icon="el-icon-plus" circle @click="selectUser"></el-button>
                </el-form-item>
                <el-form-item label="组长" prop="leaderId">
                    <el-select v-model="addForm.leaderId">
                        <el-option v-for="lst in addForm.preGroupMembers" :value="lst.id" :label="lst.userName" :key="lst.id"/>
                    </el-select>
                </el-form-item>
                <el-form-item label="职责" prop="responsibility">
                    <el-input type="textarea" v-model="addForm.responsibility"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-link class="off" :underline="false" @click="addVisible = false">取 消</el-link>
                <el-button type="text" @click="commit" :loading="addLoading">提 交</el-button>
                <!-- <el-link type="primary" :underline="false"></el-link> -->
            </div>
        </el-dialog>
        <UserTree dateType="1" ref="dlgUserTree"/>
    </div>
</template>

<script>
    import UserTree from '@/components/common/tree/DlgUserTree'
    import CtrlPage from '@/components/common/other/CtrlPage'
    export default {
        data () {
            return {
                addVisible: false,
                addLoading: false,
                showTree: false,
                addForm: {
                    // 编辑时的id
                    id: null,
                    groupName: null,
                    leaderId: null,
                    leaderName: null,
                    responsibility: null,
                    preGroupMembers: [],
                },
                rules: {
                    'groupName': [
                        {
                            required: true,
                            trigger: 'blur',
                            message: '请输入组名称'
                        }
                    ],
                    'leaderId': [
                        {
                            required: true,
                            trigger: 'blur',
                            message: '请选择组长'
                        }
                    ],
                    'responsibility': [
                        {
                            required: true,
                            trigger: 'blur',
                            message: '请填写职责'
                        }
                    ],
                    'preGroupMembers': [
                        {
                            required: true,
                            trigger: 'blur',
                            validator (rule, value, callback) {
                                if (value.length) {
                                    callback()
                                } else {
                                    callback(new Error('请选择人员'))
                                }
                            }
                        }
                    ]
                },
                list: [],
                total: 0
            }
        },
        mounted () {
            this.$refs.page.getList(1)
        },
        watch: {
            'addForm.preGroupMembers' () {
                // 更新组员列表时判断已选择的组长是否在内，否时即清空
                const index = this.addForm.preGroupMembers.findIndex(u => {
                    return u.id == this.addForm.leaderId
                })
                if (index == -1) {
                    this.addForm.leaderId = null
                    this.addForm.leaderName = null
                }
            },
            'addForm.leaderId' () {
                this.$refs.addForm && this.$refs.addForm.validateField('leaderId')
            }
        },
        methods: {
            // 修改人员组
            edit (item) {
                this.addVisible = true
                let preGroupMembers = []
                item.preGroupMembers.forEach(u => {
                    preGroupMembers.push({
                        id: u.userId,
                        userName: u.userName
                    })
                })
                this.addForm = {
                    id: item.id,
                    groupName: item.groupName,
                    leaderId: item.leaderId,
                    leaderName: item.leaderName,
                    responsibility: item.responsibility,
                    preGroupMembers: preGroupMembers,
                }
            },
            // 删除人员组
            del (item, index) {
                this.$$confirm({
                    message: '确认删除该数据'
                }).then(() => {

                    this.$securityApi.plan.delEstabliPlanUserGroup({
                        id: item.id
                    }).then(res => {
                        if (res.code == 1000) {
                            this.$$notify({
                                message: '删除成功'
                            })
                            this.list.splice(index, 1)
                            this.total --
                        } else {
                            this.$$message({
                                message: res.message
                            })
                        }
                    })
                }).catch(() => {})
            },
            // 新增/修改人员组
            commit () {
                this.$refs.addForm.validate(valid => {
                    if (valid) {
                        this.addLoading = true

                        const leader = this.addForm.preGroupMembers.find(u => {
                            return u.id == this.addForm.leaderId
                        })
                        let form = {
                            id: this.addForm.id,
                            groupName: this.addForm.groupName,
                            leaderId: this.addForm.leaderId,
                            leaderName: leader.userName,
                            responsibility: this.addForm.responsibility,
                            preGroupMembers: []
                        }
                        this.addForm.preGroupMembers.forEach(u => {
                            form.preGroupMembers.push({
                                userId: u.id,
                                userName: u.userName
                            })
                        })

                        new Promise(resolve => {
                            // 没有id时为新增,否则为修改
                            if (!form.id) {
                                this.$securityApi.plan.addEstabliPlanUserGroup(form).then(res => {
                                    resolve(res)
                                })
                            } else {
                                this.$securityApi.plan.editEstabliPlanUserGroup(form).then(res => {
                                    resolve(res)
                                })
                            }
                        }).then(res => {
                            if (res.code == 1000) {
                                this.$$notify({
                                    message: '保存成功'
                                })
                                this.$refs.addForm.resetFields()
                                this.addVisible = false
                                
                                this.$refs.page.getList(1)
                            } else {
                                this.$$message({
                                    message: res.message
                                })
                            }
                            
                            this.addLoading = false
                        }).catch(() => {})

                    }
                })
            },
            // 查询人员配置
            getList (pageIndex, rows, callback) {
                this.$securityApi.plan.establiPlanUserGroup({
                    pageNum: pageIndex,
                    pageSize: rows
                }).then(res => {
                    this.list = res.data.list
                    this.total = res.data.total
                    callback(this.list, this.total)
                })
            },
            // 人员选择
            selectUser () {
                this.$refs.dlgUserTree.open(users => {
                    this.addForm.preGroupMembers = users
                    if (users.length) {
                        this.$refs.addForm.validateField('preGroupMembers')
                    }
                }, this.addForm.preGroupMembers)
            },
            // 删除已选择人员
            delSelectedUser (lst) {
                const index = this.addForm.preGroupMembers.findIndex(u => {
                    return u.id == lst.id
                })
                this.addForm.preGroupMembers.splice(index, 1)
            }
        },
        components: {
            CtrlPage,
            UserTree
        }
    }
</script>

<style lang="less" scoped>
    .user-group {
        margin-top: 15px;
    }
    .user-group dl {
        width: calc(50% - 12px);
        float: left;
        margin: 0 20px 20px 0;
        border:1px solid rgba(232,232,232,1);
        border-radius:4px;
    }
    .user-group dl:nth-of-type(2n) {
        margin-right: 0;
    }
    .user-group dt {
        display: flex;
        justify-content: space-between;
        height: 40px;
        background: #FAF5EF;
        padding: 0 20px;
        align-items: center;
    }
    .user-group .btns {
        font-size: 18px;
    }
    .user-group .btns .el-link {
        margin-left: 20px;
        font-size: 18px;
    }
    .user-group .title {
    }
    .user-group dd {
        padding: 15px 18px;
    }
    .user-group .user-list {
        margin-bottom: 5px;
    }
    .user-group .user-list span {
        display: inline-block;
        margin: 0 10px 10px 0;
        white-space: nowrap;
        padding: 3px 5px;
        font-size: 14px;
        color: #333;
        background:rgba(255,255,255,1);
        border:1px solid rgba(232,232,232,1);
        border-radius:2px;
    }
    .user-group .duty {
        padding-top: 10px;
        font-size: 16px;
        color: #999;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        border-top: 1px dashed rgba(232,232,232,1);
    }
    .select-user-dlg .el-tag {
        margin-right: 15px;
    }
</style>
