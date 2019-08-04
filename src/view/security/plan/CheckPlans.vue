<template>
    <div>
        <div class="com-main-inner clear">
            <el-radio-group v-model="form.approve">
                <el-radio-button label="2">待审批</el-radio-button>
                <el-radio-button label="1">已审批</el-radio-button>
            </el-radio-group>
            <el-form style="margin-top: 10px;" inline label-width="85px">
                <el-form-item label="预案类型">
                    <Dictionary :typeCode="2005" v-model="form.preType"/>
                </el-form-item>
                <el-form-item label="审核状态" v-if="form.approve == 1">
                    <PlanCheckSelect v-model="form.auditState" disabled="1"/>
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
                <span class="com-page-header-title">预案审核</span>
            </div>
            <!-- table -->
            <el-table
                ref="listTable"
                class="center"
                :data="list"
                border
                check
                :row-class-name="({row, rowIndex}) => {return rowIndex%2 == 1 ? 'bg' : ''}"
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
                    label="操作"
                    width="180"
                >
                    <template slot-scope="scope">
                        <!-- 待审批 -->
                        <template v-if="scope.row.auditState == 3">
                            <el-button type="text" size="small" @click="openDetail(scope.row, true)">审核</el-button>
                        </template>
                        <!-- 未审批 -->
                        <template v-else>
                            <el-button type="text" size="small" @click="openDetail(scope.row)">查看</el-button>
                            <span class="com-page-header-title"></span>
                            <el-button type="text" size="small" @click="del(scope.row, scope.$index)">删除</el-button>
                        </template>
                    </template>
                </el-table-column>
            </el-table>
            <div class="com-space"/>
            <!-- 分页 -->
            <CtrlPage :setPage="getList" align="center" ref="page" v-show="total > list.length"/>
        </div>
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
    import MyPlanDetail from '@/components/security/plan/DlgMyPlanDetail'

    import CtrlPage from '@/components/common/other/CtrlPage'
    export default {
        name: 'security-check-plans',
        data () {
            return {
                form: {
                    // 审核状态
                    auditState: null,
                    // 审批状态
                    approve: 2,
                    // 预案类型
                    preType: null,
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
                total: 0
            }
        },
        mounted () {
            this.$refs.page.getList(1)
        },
        watch: {
            'form.dateTime' (v) {
                this.form.startTime = v[0]
                this.form.endTime = v[1]
            },
            'form.approve' () {
                this.$refs.page.getList(1)
            }
        },
        methods: {
            // 查询事件列表
            getList (pageIndex, rows, callback) {
                this.$securityApi.plan.myPlanList({
                    pageNum: pageIndex,
                    pageSize: rows,
                    auditState: this.form.approve == 1 ? this.form.auditState : null,
                    approve: this.form.approve,
                    preType: this.form.preType,
                    search: this.form.search,
                    startTime: this.form.startTime,
                    endTime: this.form.endTime
                }).then(res => {
                    this.list = res.data.list
                    this.total = res.data.total
                    callback(this.list, this.total)
                })
            },
            // 查询详情
            openDetail (row, checking) {
                this.$refs.dlgMyPlanDetail.open(row.id, checking, () => {
                    const index = this.list.findIndex(v => {
                        return v.id == row.id
                    })
                    this.list.splice(index, 1)
                    this.total--
                })
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
            }
        },
        components: {
            PlanWorkingSelect,
            PlanWorkingText,
            PlanCheckSelect,
            PlanCheckText,
            Dictionary,
            DictionaryText,
            MyPlanDetail,
            CtrlPage
        }
    }
</script>