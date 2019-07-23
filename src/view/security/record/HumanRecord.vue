<template>
    <div>
        <div class="com-main-inner clear">
            <!-- form -->
            <el-form inline label-width="85px">
                <el-form-item label="出入位置">
                    <el-select v-model="value" placeholder="请选择">
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
                <el-form-item label="进出方向">
                    <el-select v-model="value" placeholder="请选择">
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
                <el-form-item label="特殊人群">
                    <el-select v-model="value" placeholder="请选择">
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
                <el-form-item label="身份类型">
                    <el-select v-model="value" placeholder="请选择">
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
                <el-form-item label="开门方式">
                    <el-select v-model="value" placeholder="请选择">
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
                        v-model="value1"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                    />
                </el-form-item>
                <el-form-item label="关键词">
                    <el-input></el-input>
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
                    <el-button type="primary" size="mini" plain>导出</el-button>
                </div>
                <span class="com-page-header-title">人员出入记录</span>
            </div>
            <!-- table -->
            <el-table
                :data="list"
                border
                :row-class-name="({row, rowIndex}) => {return rowIndex%2 == 1 ? 'bg' : ''}"
            >
                <el-table-column
                    align="center"
                    prop="date"
                    label="序号"
                    width="80"
                    type="index"
                />
                <el-table-column
                    align="center"
                    prop="carNum"
                    label="人员名称"
                    width="180"
                />
                <el-table-column
                    align="center"
                    prop="address"
                    label="身份类型"
                />
                <el-table-column
                    align="center"
                    prop="address"
                    label="标签"
                />
                <el-table-column
                    align="center"
                    prop="address"
                    label="出入时间"
                />
                <el-table-column
                    align="center"
                    prop="address"
                    label="滞留时长"
                />
                <el-table-column
                    align="center"
                    prop="address"
                    label="进出方向"
                />
                <el-table-column
                    align="center"
                    prop="address"
                    label="是否异常"
                />
                <el-table-column
                    align="center"
                    prop="address"
                    label="开门方式"
                />
                <el-table-column
                    align="center"
                    prop="address"
                    label="出入位置"
                />
                <el-table-column
                    align="center"
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
            <CtrlPage align="center"/>
        </div>
    </div>
</template>

<script>
    import CtrlPage from '@/components/common/other/CtrlPage'
    export default {
        name: 'security-human-record',
        data () {
            return {
                value: null,
                value1: null,
                list: [{
                    carNum: '张爱国'
                },{
                    carNum: '吴峰'
                }]
            }
        },
        created () {
        },
        methods: {
            
        },
        components: {
            CtrlPage
        }
    }
</script>