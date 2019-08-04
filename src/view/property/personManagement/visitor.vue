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
                <el-form-item label="所属片区">
                    <areaId v-model="selectForm.areaId" />
                </el-form-item>
                <el-form-item label="所属楼栋">
                    <buildingId
                        :areaId="selectForm.areaId"
                        v-model="selectForm.buildingId"
                    />
                </el-form-item>
                <el-form-item label="所属单元">
                    <elementId
                        :buildingId="selectForm.buildingId"
                        v-model="selectForm.elementId"
                    />
                </el-form-item>
                <el-form-item label="到访状态">
                    <el-select
                        clearable
                        v-model="selectForm.status"
                        placeholder="请选择到访状态"
                    >
                        <el-option
                            v-for="item in statusList"
                            :key="item.value"
                            :label="item.value"
                            :value="item.id"
                        ></el-option>

                    </el-select>
                </el-form-item>
                <el-form-item label="关键词">
                    <el-input
                        v-model="selectForm.search"
                        placeholder="关键词"
                    ></el-input>
                </el-form-item>
                <el-form-item label="合同日期">
                    <el-date-picker
                        v-model="selectForm.timeValue"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="合同开始日"
                        end-placeholder="合同结束日"
                        value-format="yyyy/MM/dd"
                    >
                    </el-date-picker>
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
                <div class="clear fr">
                    <template>
                        <el-button
                            type="primary"
                            plain
                            size="mini"
                            @click="openAddDialog()"
                        >新增访客</el-button>
                    </template>
                </div>
                <span class="com-page-header-title">访客管理列表
                </span>
            </div>
            <div class="com-main-inner-table">
                <el-table
                    :data="list"
                    stripe
                    border
                    style="width: 100%"
                    @selection-change="handleSelectionChange"
                    :header-cell-style="{background:'#effbfb',color:'#1e1e1e',padding:'0'}"
                    :cell-style="{padding:'0',color:'#999999'}"
                >
                    <el-table-column
                        type="selection"
                        width="50"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        type="index"
                        label="序号"
                        width="80"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="访客姓名"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="userName"
                        label="被访人"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        label="性别"
                        align="center"
                    >
                        <template slot-scope="scope">
                            <span v-if="scope.row.sex==1">男</span>
                            <span v-if="scope.row.sex==2">女</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="phone"
                        label="手机号"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="documentType"
                        label="证件类型"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="documentNumber"
                        label="证件号"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="dataSources"
                        label="数据来源"
                        align="center"
                    >
                        <template slot-scope="scope">
                            <span v-if="scope.row.dataSources==1">系统录入</span>
                            <span v-if="scope.row.dataSources==2">APP</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="appointmentTime"
                        label="预约时间"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="visittime"
                        label="来访时间"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="status"
                        label="到访状态"
                        align="center"
                    >
                        <template slot-scope="scope">
                            <span v-if="scope.row.status==1">未到访</span>
                            <span v-if="scope.row.status==2">已到访</span>
                            <span v-if="scope.row.status==3">已结束</span>
                        </template>
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
                            >查看</el-button>
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
        <detailDialog ref="detailDialog" />
    </div>
</template>

<script>
import ctrlPage from "@/components/common/other/CtrlPage";
import Dictionary from "@/components/common/select/Dictionary";
import areaId from "@/components/property/selectForm/areaId";
import buildingId from "@/components/property/selectForm/buildingId";
import elementId from "@/components/property/selectForm/elementId";
import roomId from "@/components/property/selectForm/roomId";

import addDialog from "@/components/property/personManagement/visitor/addDialog";
import detailDialog from "@/components/property/personManagement/visitor/detailDialog";

export default {
    name: "property-personManagement-visitor",
    data() {
        return {
            selectForm: {
                areaId: null,
                buildingId: null,
                elementId: null,
                roomId: null,
                search: null,
                startTime: null,
                endTime: null,
                status: null,
                timeValue: null
            },
            list: [],
            form: {
                num: "",
                name: ""
            },
            statusList: [
                {
                    id: 1,
                    value: "未到访"
                },
                {
                    id: 2,
                    value: "已到访"
                },
                {
                    id: 3,
                    value: "已结束"
                }
            ],
            deleteList: []
        };
    },
    mounted() {
        this.$refs.page.getList(1);
    },
    methods: {
        //多选框
        handleSelectionChange(val) {
            this.deleteList = [];
            for (let i in val) {
                this.deleteList.push(val[i].id);
            }
        },
        //打开新增窗口
        openAddDialog() {
            this.$refs.addDialog.showDialog();
        },
        //打开查看窗口
        openDetailDialog(id) {
            this.$refs.detailDialog.showDialog(id);
        },
        //查询/获取List
        getList(pageIndex, rows, callback) {
            this.$propertyApi.personManagement.visitor
                .list({
                    pageNum: pageIndex,
                    pageSize: rows,
                    areaId: this.selectForm.areaId,
                    buildingId: this.selectForm.buildingId,
                    elementId: this.selectForm.elementId,
                    roomId: this.selectForm.roomId,
                    search: this.selectForm.search,
                    startTime: this.selectForm.startTime,
                    endTime: this.selectForm.endTime,
                    status: this.selectForm.status
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
        },
        del() {
            this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    this.$message({
                        type: "success",
                        message: "删除成功!"
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
        }
    },
    components: {
        ctrlPage,
        Dictionary,
        areaId,
        buildingId,
        elementId,
        roomId,
        addDialog,
        detailDialog
    }
};
</script>

<style>
</style>
