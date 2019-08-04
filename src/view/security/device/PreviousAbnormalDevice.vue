<template>
    <div>
        <div class="com-main-inner clear">
            <!-- form -->
            <el-form inline label-width="85px">
                <el-form-item label="设备类型">
				    <Dictionary :typeCode="2006" v-model="form.equipType"/>
                </el-form-item>
                <el-form-item label="设备状态">
				    <DeviceStatusSelect v-model="form.equipStatus"/>
                </el-form-item>
                <el-form-item label="处理状态">
				    <DeviceTaskStatusSelect valid="2" v-model="form.taskStatus"/>
                </el-form-item>
                <el-form-item label="关键词">
                    <el-input v-model="form.search"></el-input>
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
                <span class="com-page-header-title">历史异常设备</span>
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
                    prop="equipYcCode"
                    label="异常编号"
                />
                <el-table-column
                    prop="equipName"
                    label="设备名称"
                />
                <el-table-column
                    prop="createTime"
                    label="发生时间"
                />
                <el-table-column
                    prop="equipSite"
                    label="发生地点"
                />
                <el-table-column
                    label="设备类型"
                >
                    <template slot-scope="scope">
                        <DictionaryText :typeCode="2006" :dicCode="scope.row.equipType"/>
                    </template>
                </el-table-column>
                <el-table-column
                    label="设备状态"
                >
                    <template slot-scope="scope">
                        <DeviceStatusText :id="scope.row.equipStatus"/>
                    </template>
                </el-table-column>
                <el-table-column
                    label="处理状态"
                >
                    <template slot-scope="scope">
                        <DeviceTaskStatusText :id="scope.row.taskStatus"/>
                    </template>
                </el-table-column>
                <el-table-column
                    label="操作"
                    width="180"
                >
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="openDetail(scope.row)">详情</el-button>
                        <template v-if="scope.row.taskStatus == 1">
                            <span class="com-page-header-title"></span>
                            <el-button type="text" size="small" @click="openAssign(scope.row)">指派</el-button>
                        </template>
                        <template v-if="scope.row.taskStatus == 1 || scope.row.taskStatus == 2 || scope.row.taskStatus == 3">
                            <span class="com-page-header-title"></span>
                            <el-button type="text" size="small" @click="openClose(scope.row)">结束</el-button>
                        </template>
                    </template>
                </el-table-column>
            </el-table>
            <div class="com-space"/>
            <!-- 分页 -->
            <CtrlPage :setPage="getList" align="center" ref="page" v-show="total > list.length"/>
        </div>

        <!-- 指派 -->
        <Assign ref="dlgAssign"/>
        
        <DeviceClose ref="dlgDeviceClose"/>
        <DeviceDetail ref="dlgDeviceDetail"/>
    </div>
</template>

<script>
    import DeviceTaskStatusSelect from '@/components/security/device/DeviceTaskStatusSelect'
    import DeviceTaskStatusText from '@/components/security/device/DeviceTaskStatusText'
    import DeviceStatusSelect from '@/components/security/device/DeviceStatusSelect'
    import DeviceStatusText from '@/components/security/device/DeviceStatusText'
    import Dictionary from '@/components/common/select/Dictionary'
    import DictionaryText from '@/components/common/select/DictionaryText'
    import Assign from '@/components/security/device/DlgAssign'
    import DeviceClose from '@/components/security/device/DlgDeviceClose'
    import DeviceDetail from '@/components/security/device/DlgDeviceDetail'
    import CtrlPage from '@/components/common/other/CtrlPage'
    export default {
        name: 'previous-abnormal-device',
        data () {
            const _this = this
            return {
                form: {
                    equipType: null,
                    equipStatus: null,
                    taskStatus: null,
                    search: null,
                    dateTime: null,
                    startTime: null,
                    endTime: null,
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
            // 指派
            openAssign (row) {
                this.$refs.dlgAssign.open(row, () => {
                    this.$refs.page.getList(1)
                })
            },
            openDetail (row) {
                this.$refs.dlgDeviceDetail.open(row)
            },
            // 填写结束原因
            openClose (row) {
                this.$refs.dlgDeviceClose.open(row, () => {
                    this.$refs.page.getList(1)
                })
            },
            // 查询事件列表
            getList (pageIndex, rows, callback) {
                this.$securityApi.device.list({
                    pageNum: pageIndex,
                    pageSize: rows,
                    equipType: this.form.equipType,
                    equipStatus: this.form.equipStatus,
                    taskStatus: this.form.taskStatus,
                    search: this.form.search,
                    startTime: this.form.startTime,
                    endTime: this.form.endTime,
                    valid: 2
                }).then(res => {
                    this.list = res.data.list
                    this.total = res.data.total
                    callback(this.list, this.total)
                })
            }
            
        },
        components: {
            CtrlPage,
            Dictionary,
            DictionaryText,
            DeviceStatusSelect,
            DeviceStatusText,
            DeviceTaskStatusSelect,
            DeviceTaskStatusText,
            Assign,
            DeviceClose,
            DeviceDetail
        }
    }
</script>