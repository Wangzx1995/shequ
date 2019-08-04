<template>
    <div>
        <div class="com-main-inner clear">
            <!-- form -->
            <el-form inline label-width="85px">
                <el-form-item label="审核状态">
				    <PlanCheckSelect v-model="form.auditState"/>
                </el-form-item>
                <el-form-item label="是否启动">
				    <PlanWorkingSelect v-model="form.ifOpen"/>
                </el-form-item>
                <el-form-item label="预案类型">
				    <Dictionary :typeCode="2005" v-model="form.preType"/>
                </el-form-item>
                <el-form-item label="关键字">
                    <el-input v-model="form.search" placeholder="请输关键字"/>
                </el-form-item>
                <el-form-item label="创建时间">
                    <el-date-picker
                        v-model="form.dateTime"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        value-format="yyyy/MM/dd HH:mm:ss"
                    />
                </el-form-item>
                <el-form-item class="fr">
                    <el-button type="primary" size="small" @click="$refs.page.getList(1)">
                        查询&nbsp;<i class="icon-x-sousuo"/>
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="com-space20"></div>
        <!-- content -->
        <div class="com-main-inner">
            <!-- page header -->
            <div class="com-page-header-wrap clear">
                <div class="fr">
                    <el-button type="primary" size="mini" plain @click="openAdd">新增</el-button>
                    <el-button type="danger" size="mini" plain @click="batchDel">批量删除</el-button>
                </div>
                <span class="com-page-header-title">我的预案</span>
            </div>
            <!-- table -->
            <el-table
                ref="listTable"
                class="center"
                :data="list"
                border
                check
                :row-class-name="({row, rowIndex}) => {return rowIndex%2 == 1 ? 'bg' : ''}"
                @selection-change="(v) => {selectedIds = v}"
            >
                <el-table-column
                    type="selection"
                    width="55"
                />
                <el-table-column
                    prop="date"
                    label="序号"
                    width="80"
                    type="index"
                />
                <el-table-column
                    label="预案类型"
                >
                    <template slot-scope="scope">
                        <DictionaryText :typeCode="2005" :dicCode="scope.row.preType"/>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="preName"
                    label="预案名称"
                />
                <el-table-column
                    prop="createPeopleName"
                    label="创建人"
                />
                <el-table-column
                    prop="createTime"
                    label="创建时间"
                />
                <el-table-column
                    label="审核状态"
                >
                    <template slot-scope="scope">
				        <PlanCheckText :id="scope.row.auditState"/>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="auditPeopleName"
                    label="审核人"
                />
                <el-table-column
                    prop="auditTime"
                    label="审核时间"
                />
                <el-table-column
                    label="是否启动"
                >
                    <template slot-scope="scope">
				        <PlanWorkingText :id="scope.row.ifOpen"/>
                    </template>
                </el-table-column>
                <el-table-column
                    label="操作"
                    width="180"
                >
                    <template slot-scope="scope">
                        <!-- 待审核 -->
                        <template v-if="scope.row.auditState == 3">
                            <el-button type="text" size="small" @click="openDetail(scope.row)">查看</el-button>
                        </template>
                        <!-- 审核未通过 -->
                        <template v-if="scope.row.auditState == 2">
                            <el-button type="text" size="small" @click="openDetail(scope.row)">查看</el-button>
                            <span class="com-page-header-title"></span>
                            <el-button type="text" size="small" @click="openEdit(scope.row)">编辑</el-button>
                            <span class="com-page-header-title"></span>
                            <el-button type="text" size="small" @click="del(scope.row, scope.$index)">删除</el-button>
                        </template>
                        <!-- 审核通过 -->
                        <template v-if="scope.row.auditState == 1">
                            <!-- 开启 -->
                            <template v-if="scope.row.ifOpen == 1">
                                <el-button type="text" size="small" @click="openDetail(scope.row)">查看</el-button>
                                <span class="com-page-header-title"></span>
                                <el-button type="text" size="small" @click="del(scope.row, scope.$index)">删除</el-button>
                            </template>
                            <!-- 未开启 -->
                            <template v-if="scope.row.ifOpen == 2">
                                <el-button type="text" size="small" @click="openDetail(scope.row)">查看</el-button>
                            </template>
                        </template>
                    </template>
                </el-table-column>
            </el-table>
            <div class="com-space"/>
            <!-- 分页 -->
            <CtrlPage :setPage="getList" align="center" ref="page" v-show="total > list.length"/>
        </div>
        <!-- 新增 -->
        <MyPlanAdd ref="dlgMyPlanAdd"/>
        <!-- 查看 -->
        <MyPlanDetail ref="dlgMyPlanDetail"/>
    </div>
</template>

<script>
    import Dictionary from '@/components/common/select/Dictionary'
    import DictionaryText from '@/components/common/select/DictionaryText'
    import PlanCheckSelect from '@/components/security/plan/PlanCheckSelect'
    import PlanCheckText from '@/components/security/plan/PlanCheckText'
    import PlanWorkingSelect from '@/components/security/plan/PlanWorkingSelect'
    import PlanWorkingText from '@/components/security/plan/PlanWorkingText'
    import MyPlanAdd from '@/components/security/plan/DlgMyPlanAdd'
    import MyPlanDetail from '@/components/security/plan/DlgMyPlanDetail'

    import CtrlPage from '@/components/common/other/CtrlPage'
    export default {
        name: 'security-my-plans',
        data () {
            return {
                form: {
                    // 审核状态
                    auditState: null,
                    // 是否启动
                    ifOpen: null,
                    // 预案类型
                    preType: null,
                    // 事件状态
                    eventState: null,
                    // 关键词
                    search: null,
                    // 时间选择(不参与业务)
                    dateTime: null,
                    // 开始时间
                    startTime: null,
                    // 结束时间
                    endTime: null
                },
                list: [],
                total: 0,
                // 表格选中的数据
                selectedIds: []
            }
        },
        mounted () {
            this.$refs.page.getList(1)
        },
        watch: {
            'form.dateTime' (v) {
                this.form.startTime = v[0]
                this.form.endTime = v[1]
            }
        },
        methods: {
            // 查询事件列表
            getList (pageIndex, rows, callback) {
                this.$securityApi.plan.myPlanList({
                    pageNum: pageIndex,
                    pageSize: rows,
                    auditState: this.form.auditState,
                    ifOpen: this.form.ifOpen,
                    eventState: this.form.eventState,
                    search: this.form.search,
                    startTime: this.form.startTime,
                    endTime: this.form.endTime,
                    valid: 1
                }).then(res => {
                    this.list = res.data.list
                    this.total = res.data.total
                    callback(this.list, this.total)
                })
            },
            // 新增弹窗
            openAdd () {
                this.$refs.dlgMyPlanAdd.open(() => {
                    this.$refs.page.getList(1)
                })
            },
            // 修改弹窗
            openEdit (row) {
                this.$refs.dlgMyPlanAdd.open(() => {
                    this.$refs.page.getList(1)
                }, row)
            },
            // 查询详情
            openDetail (row) {
                this.$refs.dlgMyPlanDetail.open(row.id)
            },
            // 单个删除
            del (row, index) {
                this.$$confirm({
                    message: '确认删除该预案?'
                }).then(() => {
                    this.$securityApi.plan.myPlanDel({
                        ids: [row.id]
                    }).then(res => {
                        if (res.code == 1000) {
                            this.$$notify({
                                message: '预案删除成功'
                            })
                            this.list.splice(index, 1)
                            this.total--
                        } else {
                            this.$$message({
                                message: res.message
                            })
                        }
                    })
                }).catch(() => {})
            },
            // 批量删除
            batchDel () {
                this.$$confirm({
                    message: '确认删除这些数据?'
                }).then(() => {
                    if (!this.selectedIds.length) {
                        this.$$message({
                            message: '请选择要删除的数据'
                        })
                    }
                    let ids = []
                    this.selectedIds.forEach(item => {
                        ids.push(item.id)
                    })
                    this.$securityApi.plan.myPlanDel({
                        ids
                    }).then(res => {
                        if (res.code == 1000) {
                            this.$$notify({
                                message: '预案删除成功'
                            })
                            ids.forEach(id => {
                                const index = this.list.findIndex(v => {
                                    return v.id == id
                                })
                                this.list.splice(index, 1)
                                this.total--
                            })
                        } else {
                            this.$$message({
                                message: res.message
                            })
                        }
                    })
                }).catch(() => {})
            }
        },
        components: {
            PlanWorkingSelect,
            PlanWorkingText,
            PlanCheckSelect,
            PlanCheckText,
            Dictionary,
            DictionaryText,
            MyPlanAdd,
            MyPlanDetail,
            CtrlPage
        }
    }
</script>