<template>
    <div>
        <div class="com-main-inner clear">
            <!-- form -->
            <el-form inline label-width="85px">
                <el-form-item label="进出方向">
                    <el-select v-model="form.carDirect" placeholder="请选择">
                        <el-option
                            label="全部"
                            value="全部"
                        />
                        <el-option
                            label="选项一"
                            value="选项一"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="车辆类别">
                    <el-select v-model="form.carType" placeholder="请选择">
                        <el-option
                            label="全部"
                            value="全部"
                        />
                        <el-option
                            label="选项一"
                            value="选项一"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="出入时间">
                    <el-date-picker
                        v-model="form.dateTime"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                    />
                </el-form-item>
                <el-form-item label="关键词">
                    <el-input v-model="form.search"></el-input>
                </el-form-item>
                <el-form-item class="fr">
                    <el-button type="primary" size="small">
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
                    <el-button size="mini" plain class="custom-mini">配置</el-button>
                    <el-button size="mini" plain class="custom-mini">导出</el-button>
                </div>
                <span class="com-page-header-title">车辆出入记录</span>
            </div>
            <!-- table -->
            <el-table
                class="center"
                :data="list"
                border
                :row-class-name="({row, rowIndex}) => {return rowIndex%2 == 1 ? 'bg' : ''}"
            >
                <el-table-column
                    label="序号"
                    width="80"
                    type="index"
                />
                <el-table-column
                    prop="carNum"
                    label="车牌号码"
                    width="180"
                />
                <el-table-column
                    prop="carType"
                    label="车辆类别"
                />
                <el-table-column
                    prop="capTime"
                    label="出入时间"
                />
                <el-table-column
                    prop="capTimeStamp"
                    label="滞留时长"
                />
                <el-table-column
                    prop="carDirectStr"
                    label="进出方向"
                />
                <el-table-column
                    prop="address"
                    label="是否异常"
                />
                <el-table-column
                    prop="address"
                    label="出入位置"
                />
                <el-table-column
                    prop="address"
                    label="车辆类型"
                />
                <el-table-column
                    prop="address"
                    label="停车场"
                />
                <el-table-column
                    label="操作"
                    width="100"
                >
                    <template slot-scope="scope">
                        <el-button type="text" size="small">详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="com-space"/>
            <!-- 分页 -->
            <CtrlPage :setPage="getList" align="center" ref="page" v-show="total > list.length"/>
        </div>
    </div>
</template>

<script>
    import CtrlPage from '@/components/common/other/CtrlPage'
    export default {
        name: 'security-car-record',
        data () {
            return {
                form: {
                    // 停车场编码
                    // parkingLot: null,
                    // 进出方向 8 进场 9 出场
                    carDirect: null,
                    // 车辆类型 字典表
                    carType: null,
                    // 车牌号
                    carNum: null,
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
            
            // 查询列表
            getList (pageIndex, rows, callback) {
                this.$securityApi.record.carList({
                    pageNum: pageIndex,
                    pageSize: rows,
                    carDirect: this.form.carDirect,
                    carType: this.form.carType,
                    carNum: this.form.carNum,
                    search: this.form.search,
                    startTime: this.form.startTime,
                    endTime: this.form.endTime
                }).then(res => {
                    this.list = res.data.list
                    this.total = res.data.total
                    callback(this.list, this.total)
                })
            }
        },
        components: {
            CtrlPage
        }
    }
</script>