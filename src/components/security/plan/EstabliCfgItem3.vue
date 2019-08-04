<template>
    <div>
        <div class="clear">
            <el-button type="primary" plain size="mini" icon="icon-x-bianji1" class="fr custom-mini" @click="isEdit = true" v-if="!isEdit">&nbsp;&nbsp;编辑</el-button>
            <el-button type="primary" plain size="mini" icon="icon-x-baocun" class="fr custom-mini" @click="commit" v-if="isEdit">&nbsp;&nbsp;保存</el-button>
            <span class="com-page-header-title tag" style="padding-left: 20px;">
                <el-link type="primary" :underline="false"><i class="icon-x-byingjiyuan line-tag" style="font-size: 19px;top: 2px;"></i></el-link>
                <strong>{{ toChinesNum(level) }}级响应预案</strong>
            </span>
        </div>
        <!-- 预览 -->
        <div v-if="!isEdit">
            <div class="intro">
                <span>启动通知<font>{{ form.preLevel.notifierNames.join('、') }}</font></span>
                <span>适用范围<font>{{ form.preLevel.levelScope }}</font></span>
            </div>
            <div class="section">
                <template v-if="form.preLevelSteps.length">
                    <dl v-for="(lst, index) in form.preLevelSteps" :key="index">
                        <dt>
                            <span>第{{ toChinesNum(index + 1) }}步</span>
                            <p>{{ lst.stepName }}</p>
                        </dt>
                        <dd>
                            <ul>
                                <li v-for="group in lst.preGroups" :key="group.id">
                                    <font>{{ group.groupName }}</font>{{ group.responsibility }}
                                </li>
                            </ul>
                            <p class="notice">注意事项：{{ lst.stepAttention }}</p>
                        </dd>
                    </dl>
                </template>
                <div class="com-space20"></div>
                <div class="com-loading-text" v-if="!form.preLevelSteps.length">暂无数据</div>
            </div>
        </div>
        <!-- 编辑 -->
        <div class="edit" v-if="isEdit">
            <el-form :model="form" ref="form" :rules="rules" class="label-align-left" label-width="95px">
                <div class="info">
                    <el-form-item label="启动通知" prop="preLevel.startNotifier">
                        <div class="_el-tag-group">
                            <el-tag
                                :key="notifier.id"
                                v-for="(notifier, index) in notifierList"
                                class="blue"
                                closable
                                :disable-transitions="false"
                                @close="notifierDel(index)"
                            >{{ notifier.userName }}</el-tag>
                            <el-button class="custom-mini blue" icon="icon-x-renyuan" size="small" style="margin-left: 10px;" @click="selectNotifier">&nbsp;选择人员</el-button>
                        </div>
                    </el-form-item>
                    <el-form-item label="适用范围" prop="preLevel.levelScope">
                        <el-row>
                            <el-col :span="10">
                                <el-input v-model="form.preLevel.levelScope"></el-input>
                            </el-col>
                        </el-row>
                        
                    </el-form-item>
                </div>
                 <el-link type="primary" :underline="false" @click="addStep">添加步骤</el-link>
                 <div class="step-list">
                     <dl v-for="(lst, index) in form.preLevelSteps" :key="index">
                         <dt>
                             <span>第{{ toChinesNum(index + 1) }}步</span>
                             <el-link @click="delStep(index)">删除</el-link>
                         </dt>
                         <dd>
                             <el-form-item label="步骤名称">
                                 <el-input v-model="lst.stepName" placeholder="请填写步骤名称" style="width: 200px;"></el-input>
                             </el-form-item>
                             <el-form-item label="注意事项">
                                <el-row>
                                    <el-col :span="10">
                                        <el-input v-model="lst.stepAttention" placeholder="请填写注意事项"></el-input>
                                    </el-col>
                                </el-row>
                             </el-form-item>
                             <el-form-item label="预案组">
                                 <div class="_el-tag-group">
                                    <el-tag
                                        :key="group.id"
                                        v-for="(group, gIndex) in lst.groupList"
                                        class="blue"
                                        closable
                                        :disable-transitions="false"
                                        @close="stepDelPlanGroup(lst, gIndex)"
                                    >{{ group.groupName }}</el-tag>
                                    <el-popover
                                        placement="top"
                                        width="250"
                                        v-model="lst.popoverVisible"
                                    >
                                        <div class="flex">
                                            <el-select v-model="lst.selectedId" style="margin-right: 15px;">
                                                <el-option v-for="item in filterGroupList(lst)" :key="item.id" :value="item.id" :label="item.groupName"></el-option>
                                            </el-select>
                                            <el-button type="primary" size="mini" @click="stepAddPlanGroup(lst)">确定</el-button>
                                        </div>
                                        <el-button size="mini" class="blue" slot="reference" icon="el-icon-plus" circle=""></el-button>
                                    </el-popover>
                                </div>
                             </el-form-item>
                             <el-form-item label="预案组职责">
                                <el-row>
                                    <el-col :span="10">
                                        <el-input v-model="lst.dutyDesc" placeholder="请填写预案组职责"></el-input>
                                    </el-col>
                                </el-row>
                             </el-form-item>
                         </dd>
                     </dl>
                 </div>
            </el-form>
        </div>
        <UserTree dateType="1" ref="dlgUserTree"/>
    </div>
</template>

<script>
    import utils from '@/utils/'
    import UserTree from '@/components/common/tree/DlgUserTree'
    export default {
        props: {
            level: [String, Number],
            planId: [Number, String, Object]
        },
        data () {
            const _this = this
            return {
                isEdit: false,
                form: {
                    preLevel: {
                        notifierNames: [],
                        startNotifier: ''
                    },
                    preLevelSteps: []
                },
                rules: {
                    'preLevel.startNotifier': [
                        {
                            required: true,
                            trigger: 'blur',
                            validator (rule, value, callback) {
                                if (_this.notifierList.length) {
                                    callback()
                                } else {
                                    callback(new Error('请选择通知人员'))
                                }
                            }
                        }
                    ],
                    'preLevel.levelScope': [
                        {
                            required: true,
                            trigger: 'blur',
                            message: '请填写适用范围'
                        }
                    ]
                },
                // 通知人群
                notifierList: [],
                // 预案组下拉列表
                planUserGroupList: []
            }
        },
        created () {
            this.establiPlanUserGroupAllList()
        },
        watch: {
            'planId' () {
                this.getDetail()
            }
        },
        methods: {
            // 保存
            commit () {
                this.$refs.form.validate(valid => {
                    if (valid) {
                        // 步骤
                        let preLevelSteps = []
                        this.form.preLevelSteps.forEach(step => {
                            let ids = []
                            step.groupList.forEach(v => {
                                ids.push(v.id)
                            })
                            preLevelSteps.push({
                                id: step.id,
                                dutyDesc: step.dutyDesc,
                                groupIds: ids.join(','),
                                stepAttention: step.stepAttention,
                                stepName: step.stepName,
                            })
                        })
                        // 提取通知人id
                        let startNotifier = []
                        this.notifierList.forEach(v => {
                            startNotifier.push(v.id)
                        })
                        // 组装表单
                        let form = {
                            preLevel: {
                                id: this.form.preLevel.id,
                                levelScope: this.form.preLevel.levelScope,
                                levelType: this.level,
                                preId: this.planId,
                                startNotifier: startNotifier.join(',')
                            },
                            preLevelSteps
                        }
                        this.$securityApi.plan.establiPlanLevelEdit(form).then(res => {
                            if (res.code == 1000) {
                                this.$$notify({
                                    message: '修改成功'
                                })
                                this.getDetail()
                                this.isEdit = false
                            } else {
                                this.$$message({
                                    message: res.message
                                })
                            }
                        })
                    }
                })
            },
            // 单个删除通知人群
            notifierDel (index) {
                this.notifierList.splice(index, 1)
            },
            // 选择通知人群
            selectNotifier () {
                this.$refs.dlgUserTree.open(users => {
                    this.notifierList = users
                    if (users.length) {
                        this.$refs.form.validateField('preLevel.startNotifier')
                    }
                }, this.notifierList)
            },
            // 步骤中预案组添加
            stepAddPlanGroup (item) {
                if (item.selectedId) {
                    const group = this.planUserGroupList.find(v => {
                        return v.id == item.selectedId
                    })
                    item.groupList.push(group)

                    item.popoverVisible = false
                    item.selectedId = null
                }
            },
            // 步骤中预案组删除
            stepDelPlanGroup (item, index) {
                item.groupList.splice(index, 1)
            },
            // 过滤步骤中已选择的预案组
            filterGroupList (item) {
                console.log(item)
                return this.planUserGroupList.filter(v => {
                    return item.groupList.findIndex(g => {
                        return g.id == v.id
                    }) == -1
                })
            },
            // 查询详情
            getDetail () {
                if (this.planId) {
                    this.$securityApi.plan.establiPlanLevelGet({
                        preId: this.planId,
                        levelType: this.level
                    }).then(res => {
                        if (res.code == 1000) {
                            let preLevel = res.data.preLevel || {
                                notifierNames: [],
                                startNotifier: ''
                            }
                            preLevel.notifierNames.forEach((u, index) => {
                                const ids = preLevel.startNotifier.split(',')
                                this.notifierList.push({
                                    id: ids[index],
                                    userName: u
                                })
                            })
                            // 步骤列表
                            let preLevelSteps = []
                            let resSteps = res.data.preLevelSteps || []
                            resSteps.forEach(step => {

                                preLevelSteps.push({
                                    id: step.id,
                                    stepName: step.stepName,
                                    stepAttention: step.stepAttention,
                                    dutyDesc: step.dutyDesc,
                                    groupIds: step.groupIds,
                                    selectedId: null,
                                    groupList: step.preGroups,
                                    preGroups: step.preGroups,
                                    popoverVisible: false
                                })
                            })
                            this.form = {...res.data, preLevel, preLevelSteps}
                            
                        } else {
                            this.$$message({
                                message: res.message
                            })
                        }
                    })
                }
            },
            // 预案组下拉 列表
            establiPlanUserGroupAllList () {
                this.$securityApi.plan.establiPlanUserGroupAllList().then(res => {
                    if (res.code == 1000) {
                        this.planUserGroupList = res.data
                    } else {
                        this.$$message({
                            message: res.message
                        })
                    }
                })
            },
            // 删除
            delStep (index) {
                this.form.preLevelSteps.splice(index, 1)
            },
            // 添加步骤
            addStep () {
                this.form.preLevelSteps.push({
                    stepName: null,
                    stepAttention: null,
                    dutyDesc: null,
                    groupIds: null,
                    selectedId: null,
                    groupList: [],
                    popoverVisible: false
                })
            },
            // 数字转中文
            toChinesNum: utils.toChinesNum
        },
        components: {
            UserTree
        }
    }
</script>

<style lang="less" scoped>
    .intro {
        margin-top: 10px;
        padding-bottom: 23px;
        font-size: 16px;
        color: #999;
        border-bottom: 1px solid #E8E8E8;
    }
    .intro span {
        margin-right: 120px;
    }
    .intro font {
        margin-left: 20px;
        color: #333;
    }
    .section dl {
        position: relative;
        padding: 30px 0 10px 90px;
        font-size: 16px;
    }
    .section dt {
        line-height: 1.6;
        position: absolute;
        left: 0;
        color: #999;
    }
    .section dt p {
        position: absolute;
        left: 0;
        color: #333;
    }
    .section dd {
        
    }
    .section ul {
        margin-bottom: 10px;
        padding: 0 14px;
        background: #F8F8F8;
    }
    .section ul li {
        padding: 14px 0;
        border-bottom: 1px solid #E8E8E8;
        color: #999;
    }
    .section ul li font {
        margin-right: 25px;
        color: #1779EC;
    }
    .section ul li:last-of-type {
        border: none;
    }
    .section dd .notice {
        color: #999;
    }

    .edit {
        
    }
    .edit .info {
        margin: 20px 0 10px;
        padding-bottom: 5px;
        border-bottom: 1px solid #E8E8E8;
    }
    .step-list {
        margin-top: 12px;
    }
    .step-list dl {
        margin-bottom: 15px;
        border:1px solid rgba(232,232,232,1);
    }
    .step-list dt {
        display: flex;
        justify-content: space-between;
        padding: 0 15px;
        align-items: center;
        height:46px;
        background:rgba(248,248,248,1);
        margin-bottom: 22px;
    }
    .step-list dt i {
        color: #aaa;
        cursor: pointer;
    }
    .step-list dd {
        padding: 0 25px;
    }
    .step-list dd label {
        color: #999;
    }
</style>
