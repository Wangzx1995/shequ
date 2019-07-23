<template>
    <div>
        <div class="com-main-inner clear">
            <!-- form -->
            <el-form inline label-width="85px">
                <el-form-item label="事件来源">
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
                <el-form-item label="事件类型">
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
                <el-form-item label="紧急程度">
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
                <el-form-item label="事件状态">
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
                <el-form-item label="关键字">
                    <el-input></el-input>
                </el-form-item>
                <el-form-item label="发生时间">
                    <el-date-picker
                        v-model="value1"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                    />
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
                <span class="com-page-header-title">当前事件</span>
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
                    label="事件编号"
                    width="180"
                />
                <el-table-column
                    align="center"
                    prop="address"
                    label="发生时间"
                />
                <el-table-column
                    align="center"
                    prop="address"
                    label="事件名"
                />
                <el-table-column
                    align="center"
                    prop="address"
                    label="事件来源"
                />
                <el-table-column
                    align="center"
                    prop="address"
                    label="事件类型"
                />
                <el-table-column
                    align="center"
                    prop="address"
                    label="紧急程度"
                />
                <el-table-column
                    align="center"
                    prop="address"
                    label="发生地点"
                />
                <el-table-column
                    align="center"
                    prop="address"
                    label="事件状态"
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
        name: 'security-previous-events',
        data () {
            return {
                value: null,
                value1: null,
                list: [{
                    carNum: '2019042600001'
                },{
                    carNum: '2019042600001'
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