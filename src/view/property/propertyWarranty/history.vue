<template>
    <div class="property">
        <div class="com-main-inner selectBox">
            <el-form
                :inline="true"
                :model="selectForm"
                class="demo-form-inline"
                label-position="left"
                ref="selectForm"
            >
                <el-form-item label="报修类型">
                    <Dictionary
                        :typeCode="1019"
                        v-model="selectForm.repairsType"
                    />
                </el-form-item>
                <el-form-item label="报修状态">
                    <el-select
                        clearable
                        v-model="selectForm.status"
                        placeholder="请选择报修状态"
                    >
                        <el-option
                            v-for="item in statusList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>

                    </el-select>
                </el-form-item>
                <el-form-item label="上报时间">
                    <el-date-picker
                        v-model="selectForm.reportTime"
                        type="date"
                        placeholder="选择日期"
                        value-format="yyyy/MM/dd"
                    >
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="关键词">
                    <el-input
                        v-model="selectForm.search"
                        placeholder="关键词"
                    ></el-input>
                </el-form-item>
                <el-form-item style="float:right">
                    <el-button
                        type="primary"
                        @click="$refs.page.getList(1)"
                    >查询<i class="icon-x-sousuo el-icon--right"></i></el-button>
                </el-form-item>
            </el-form>
        </div>
        <br>
        <div class="com-page-header-wrap clear com-main-inner">
            <div class="com-main-inner-title">
                <span class="com-page-header-title">历史报修列表</span>
            </div>
            <div class="com-main-inner-table">
                <el-table
                    :data="list"
                    stripe
                    border
                    style="width: 100%"
                    :header-cell-style="{background:'#effbfb',color:'#1e1e1e',padding:'0'}"
                    :cell-style="{padding:'0',color:'#999999'}"
                >
                    <el-table-column
                        type="index"
                        label="序号"
                        width="80"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="code"
                        label="报修编号"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="reportName"
                        label="上报人"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="content"
                        label="报修内容"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="reportTime"
                        label="上报时间"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="结束时间"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="维修人员"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="报修类型"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="报修状态"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        width="100"
                        align="center"
                    >
                        <template slot-scope="scope">
                            <el-button
                                type="primary"
                                @click="openDetailDialog(scope.row.id)"
                            >详情</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <ctrlPage
                    :setPage="getList"
                    ref="page"
                    style="float:right;margin-top:20px;"
                />
            </div>
        </div>
        <addDialog ref="addDialog" />
    </div>
</template>

<script>
import ctrlPage from "@/components/common/other/CtrlPage";
import Dictionary from "@/components/common/select/Dictionary";

import addDialog from "@/components/property/propertyWarranty/acceptAssignment/addDialog";
export default {
    name: "property-propertyWarranty-history",
    data() {
        return {
            selectForm: {
                type: 3,
                repairsType: null,
                reportTime: null,
                status: null,
                search: null
            },
            statusList: [
                {
                    label: "已结束",
                    value: 5
                },
                {
                    label: "已撤销",
                    value: 6
                },
                {
                    label: "已拒绝",
                    value: 7
                }
            ],
            list: []
        };
    },
    mounted() {
        this.$refs.page.getList(1);
    },
    methods: {
        //打开新增窗口
        openAddDialog() {
            this.$refs.addDialog.showDialog();
        },
        //查询/获取List
        getList(pageIndex, rows, callback) {
            this.$propertyApi.propertyWarranty.acceptAssignment
                .list({
                    pageNum: pageIndex,
                    pageSize: rows,
                    type: this.selectForm.type,
                    repairsType: this.selectForm.repairsType,
                    reportTime: this.selectForm.reportTime,
                    status: this.selectForm.status,
                    search: this.selectForm.search
                })
                .then(res => {
                    if (res.code == 1000) {
                        this.list = res.data.list;
                        callback(this.list, res.data.total);
                    } else {
                        this.$$alert({
                            message: res.msg,
                            type: "error"
                        });
                    }
                });
        }
    },
    components: {
        ctrlPage,
        Dictionary,
        addDialog
    }
};
</script>

<style>
</style>
