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
                <el-form-item label="所属房屋">
                    <roomId
                        :elementId="selectForm.elementId"
                        v-model="selectForm.roomId"
                    />
                </el-form-item>
                <el-form-item label="身份类型">
                    <Dictionary
                        :typeCode="1007"
                        v-model="selectForm.identityType"
                    />
                </el-form-item>
                <el-form-item label="关键词">
                    <el-input
                        v-model="selectForm.search"
                        placeholder="关键词"
                    ></el-input>
                </el-form-item>
                <el-form-item label="入住时间">
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
                <el-form-item label="特殊人群">
                    <Dictionary
                        :typeCode="1011"
                        v-model="selectForm.spcialCrowd"
                    />
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
                        >新增</el-button>
                        <el-button
                            type="danger"
                            plain
                            size="mini"
                        >批量删除</el-button>
                    </template>
                </div>
                <span class="com-page-header-title">特殊人群管理列表
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
                        label="姓名"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        label="特殊人群"
                        align="center"
                    >
                        <template slot-scope="scope">
                            <DictionaryText
                                :typeCode="1011"
                                :dicCode="scope.row.spcialCrowd"
                            />
                        </template>
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
                        prop="name"
                        label="年龄"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="phone"
                        label="手机号"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        label="身份类型"
                        align="center"
                    >
                        <template slot-scope="scope">
                            <DictionaryText
                                :typeCode="1007"
                                :dicCode="scope.row.identityType"
                            />
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="areaName"
                        label="所属片区"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="buildingName"
                        label="所属楼栋"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="roomName"
                        label="所属房屋"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="checkIn"
                        label="入住时间"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="accessoryIcon"
                        label="图标"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        label="探望/监督"
                        align="center"
                    >
                        <template slot-scope="scope">
                            <span
                                style="cursor: pointer;"
                                @click="openCountDialog(scope.row)"
                            >{{scope.row.count}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        width="200"
                        align="center"
                    >
                        <template slot-scope="scope">
                            <el-button
                                type="primary"
                                @click="openDetailDialog(scope.row)"
                            >查看</el-button>
                            <span class="com-page-header-title line"></span>
                            <el-button
                                type="primary"
                                @click="openJiluDialog(scope.row)"
                            >记录</el-button>
                            <span class="com-page-header-title line"></span>
                            <el-button
                                type="danger"
                                @click="del(scope.row.id)"
                            >删除</el-button>
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
        <detailDialog ref="detailDialog" />
        <addDialog ref="addDialog" />
        <jiluDialog ref="jiluDialog" />
        <countDialog ref="countDialog" />

    </div>
</template>

<script>
import ctrlPage from "@/components/common/other/CtrlPage";
import Dictionary from "@/components/common/select/Dictionary";
import DictionaryText from "@/components/common/select/DictionaryText";
import areaId from "@/components/property/selectForm/areaId";
import buildingId from "@/components/property/selectForm/buildingId";
import elementId from "@/components/property/selectForm/elementId";
import roomId from "@/components/property/selectForm/roomId";

import detailDialog from "@/components/property/personManagement/household/detailDialog";
import addDialog from "@/components/property/personManagement/special/addDialog";
import jiluDialog from "@/components/property/personManagement/special/jiluDialog";
import countDialog from "@/components/property/personManagement/special/countDialog";

export default {
    name: "property-personManagement-special",
    data() {
        return {
            selectForm: {
                type: "3",
                areaId: null,
                buildingId: null,
                elementId: null,
                roomId: null,
                identityType: null,
                search: null,
                startTime: null,
                endTime: null,
                timeValue: null,
                spcialCrowd: null
            },
            list: [],
            deleteList: []
        };
    },
    mounted() {
        this.$refs.page.getList(1);
    },
    watch: {
        "selectForm.timeValue"() {
            if (!this.selectForm.timeValue) {
                this.selectForm.startTime = null;
                this.selectForm.endTime = null;
            } else {
                this.selectForm.startTime = this.selectForm.timeValue[0];
                this.selectForm.endTime = this.selectForm.timeValue[1];
            }
        }
    },
    methods: {
        //多选框
        handleSelectionChange(val) {
            this.deleteList = [];
            for (let i in val) {
                this.deleteList.push(val[i].id);
            }
        },
        //打开查看窗口
        openDetailDialog(row) {
            this.$refs.detailDialog.showDialog(row);
            this.$refs.detailDialog.closeEditDialog();
        },
        //打开新增窗口
        openAddDialog() {
            this.$refs.addDialog.showDialog();
        },
        //打开记录窗口
        openJiluDialog(row) {
            this.$refs.jiluDialog.showDialog(row);
        },
        openCountDialog(row) {
            this.$refs.countDialog.showDialog(row);
        },
        //查询/获取List
        getList(pageIndex, rows, callback) {
            this.$propertyApi.personManagement.household
                .list({
                    pageNum: pageIndex,
                    pageSize: rows,
                    areaId: this.selectForm.areaId,
                    buildingId: this.selectForm.buildingId,
                    elementId: this.selectForm.elementId,
                    roomId: this.selectForm.roomId,
                    identityType: this.selectForm.identityType,
                    search: this.selectForm.search,
                    startTime: this.selectForm.startTime,
                    endTime: this.selectForm.endTime,
                    spcialCrowd: this.selectForm.spcialCrowd,
                    type: this.selectForm.type
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
        //删除操作
        del(id) {
            if (id.length == 0) {
                this.$$message({
                    message: "请选择批量删除对象",
                    type: "warning"
                });
                return;
            }
            this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    if (Array.isArray(id)) {
                        this.$propertyApi.personManagement.household
                            .deleteList({
                                ids: id
                            })
                            .then(res => {
                                if (res.code == 1000) {
                                    this.$$message({
                                        message: res.message,
                                        type: "success"
                                    });
                                    this.$refs.page.getList(1);
                                } else {
                                    this.$$message({
                                        message: res.message,
                                        type: "error"
                                    });
                                }
                            });
                    } else {
                        this.$propertyApi.personManagement.household
                            .delete({
                                id: id
                            })
                            .then(res => {
                                if (res.code == 1000) {
                                    this.$$message({
                                        message: res.message,
                                        type: "success"
                                    });
                                    this.$refs.page.getList(1);
                                } else {
                                    this.$$message({
                                        message: res.message,
                                        type: "error"
                                    });
                                }
                            });
                    }
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
        DictionaryText,
        areaId,
        buildingId,
        elementId,
        roomId,
        detailDialog,
        addDialog,
        jiluDialog,
        countDialog
    }
};
</script>

<style>
</style>
