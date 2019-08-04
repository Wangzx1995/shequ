<template>
    <div>
        <div class="com-main-inner clear">
            <!-- form -->
            <el-form inline label-width="85px">
                <el-form-item label="事件来源">
				    <Dictionary :typeCode="2001" v-model="form.eventSource"/>
                </el-form-item>
                <el-form-item label="事件类型">
				    <Dictionary :typeCode="2002" v-model="form.eventType"/>
                </el-form-item>
                <el-form-item label="紧急程度">
				    <Dictionary :typeCode="2003" v-model="form.urgencyDegree"/>
                </el-form-item>
                <el-form-item label="事件状态">
				    <EventStatusSelect v-model="form.eventState"/>
                </el-form-item>
                <el-form-item label="关键字">
                    <el-input v-model="form.search" placeholder="请输关键字"/>
                </el-form-item>
                <el-form-item label="发生时间">
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
                </div>
                <span class="com-page-header-title">当前事件</span>
            </div>
            <!-- table -->
            <el-table
                class="center"
                :data="list"
                border
                :row-class-name="({row, rowIndex}) => {return rowIndex%2 == 1 ? 'bg' : ''}"
            >
                <el-table-column
                    prop="date"
                    label="序号"
                    width="80"
                    type="index"
                />
                <el-table-column
                    prop="eventNumber"
                    label="事件编号"
                    width="180"
                />
                <el-table-column
                    prop="occurrenceTime"
                    label="发生时间"
                />
                <el-table-column
                    prop="eventName"
                    label="事件名"
                />
                <el-table-column
                    label="事件来源"
                >
                    <template slot-scope="scope">
                        <DictionaryText :typeCode="2001" :dicCode="scope.row.eventSource"/>
                    </template>
                </el-table-column>
                <el-table-column
                    label="事件类型"
                >
                    <template slot-scope="scope">
                        <DictionaryText :typeCode="2002" :dicCode="scope.row.eventType"/>
                    </template>
                </el-table-column>
                <el-table-column
                    label="紧急程度"
                >
                    <template slot-scope="scope">
                        <DictionaryText :typeCode="2003" :dicCode="scope.row.urgencyDegree"/>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="eventAddress"
                    label="发生地点"
                />
                <el-table-column
                    label="事件状态"
                >
                    <template slot-scope="scope">
                        <EventStatusText :id="scope.row.eventState"/>
                    </template>
                </el-table-column>
                <el-table-column
                    label="操作"
                    width="180"
                >
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="openDetail(scope.row)">详情</el-button>
                        <span class="com-page-header-title"></span>
                        <el-button type="text" size="small">指派</el-button>
                        <span class="com-page-header-title"></span>
                        <el-button type="text" size="small" @click="openClose(scope.row)">结束</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="com-space"/>
            <!-- 分页 -->
            <CtrlPage :setPage="getList" align="center" ref="page" v-show="total > list.length"/>
        </div>
        <!-- 新增事件 -->
        <EventAdd ref="dlgEventAdd"/>
        <!-- 事件详情 -->
        <EventDetail ref="dlgEventDetail"/>
        <!-- 关闭事件 -->
        <EventClose ref="dlgEventClose"/>
    </div>
</template>

<script>
    import EventClose from '@/components/security/event/DlgEventClose'
    import EventDetail from '@/components/security/event/DlgEventDetail'
    import EventAdd from '@/components/security/event/DlgEventAdd'
    import Dictionary from '@/components/common/select/Dictionary'
    import DictionaryText from '@/components/common/select/DictionaryText'
    import EventStatusSelect from '@/components/security/event/EventStatusSelect'
    import EventStatusText from '@/components/security/event/EventStatusText'
    import CtrlPage from '@/components/common/other/CtrlPage'
    export default {
        name: 'security-current-events',
        data () {
            return {
                form: {
                    // 事件来源
                    eventSource: null,
                    // 事件类型
                    eventType: null,
                    // 紧急程度
                    urgencyDegree: null,
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
            }
        },
        methods: {
            // 查询事件列表
            getList (pageIndex, rows, callback) {
                this.$securityApi.event.list({
                    pageNum: pageIndex,
                    pageSize: rows,
                    eventSource: this.form.eventSource,
                    eventType: this.form.eventType,
                    urgencyDegree: this.form.urgencyDegree,
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
                this.$refs.dlgEventAdd.open(() => {
                    this.$$notify({
                        message: '操作成功'
                    })
                    this.$refs.page.getList(1)
                })
            },
            // 查询详情
            openDetail (row) {
                console.log(row)
                this.$refs.dlgEventDetail.open(row.id)
            },
            // 结束
            openClose (row) {
                console.log(row)
                this.$refs.dlgEventClose.open()
            }
        },
        components: {
            EventClose,
            EventAdd,
            EventDetail,
            EventStatusSelect,
            EventStatusText,
            Dictionary,
            DictionaryText,
            CtrlPage
        }
    }
</script>