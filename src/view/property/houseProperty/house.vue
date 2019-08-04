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
                    <el-select
                        clearable
                        v-model="selectForm.areaId"
                        placeholder="请选择片区"
                    >
                        <el-option
                            v-for="item in areaList"
                            :key="item.value"
                            :label="item.areaName"
                            :value="item.areaId"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="所属楼栋">
                    <el-select
                        clearable
                        v-model="selectForm.buildingId"
                        placeholder="请选择楼栋"
                    >
                        <el-option
                            v-for="item in buildingList"
                            :key="item.value"
                            :label="item.buildingName"
                            :value="item.buildingId"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="所属单元">
                    <el-select
                        clearable
                        v-model="selectForm.elementId"
                        placeholder="请选择单元"
                    >
                        <el-option
                            v-for="item in elementList"
                            :key="item.value"
                            :label="item.elementName"
                            :value="item.elementId"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="房屋用途">
                    <Dictionary
                        :typeCode="1005"
                        v-model="selectForm.purpose"
                    />
                </el-form-item>
                <el-form-item label="交付时间">
                    <el-date-picker
                        v-model="selectForm.delivery"
                        type="date"
                        value-format="yyyy/MM/dd"
                        placeholder="选择日期"
                    >
                    </el-date-picker>
                </el-form-item>
                <el-form-item
                    label="审批状态"
                    v-if="selectForm.type!='1'"
                >
                    <el-select
                        clearable
                        v-model="selectForm.status"
                        placeholder="请选择审批状态"
                    >
                        <el-option
                            v-for="item in statusList"
                            :key="item.value"
                            :label="item.statusValue"
                            :value="item.statusId"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="关键词">
                    <el-input
                        v-model="selectForm.search"
                        placeholder="关键词"
                    ></el-input>
                </el-form-item>
                <el-form-item>
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
                            v-if="selectForm.type=='1'"
                            @click="openAddDialog()"
                        >新增</el-button>
                        <el-button
                            size="mini"
                            type="warning"
                            plain
                        >导入</el-button>
                        <el-button
                            size="mini"
                            type="warning"
                            plain
                        >导出</el-button>
                        <el-button
                            type="danger"
                            plain
                            size="mini"
                            @click="del(deleteList)"
                        >批量删除</el-button>
                    </template>
                </div>
                <span class="com-page-header-title">住房管理列表
                    <el-radio-group v-model="selectForm.type">
                        <el-radio-button label="1">待审核</el-radio-button>
                        <el-radio-button label="2">已审批</el-radio-button>
                    </el-radio-group></span>
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
                        prop="code"
                        label="房屋编号"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="房屋名称"
                        align="center"
                    >
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
                        prop="elementName"
                        label="所属单元"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="userName"
                        label="业主姓名"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="userPhone"
                        label="联系电话"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="acreage"
                        label="建筑面积㎡"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="delivery"
                        label="交付时间"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        label="房屋用途"
                        align="center"
                    >
                        <template slot-scope="scope">
                            <span>{{getItemName(scope.row.purpose,purposeList, 'dicCode', 'dicName')}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="status"
                        label="审批状态"
                        align="center"
                        v-if="selectForm.type!='1'"
                    >
                        <template
                            slot-scope="scope"
                            v-if="selectForm.type!='1'"
                        >
                            <span>{{getItemName(scope.row.status,statusList, 'statusId', 'statusValue')}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        width="100"
                        align="center"
                        v-if="selectForm.type=='1'"
                    >
                        <template slot-scope="scope">
                            <el-button
                                type="primary"
                                @click="openAuditingDialog(scope.row)"
                            >审核</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        width="150"
                        align="center"
                        v-if="selectForm.type=='2'"
                    >
                        <template slot-scope="scope">
                            <el-button
                                type="primary"
                                @click="openDetailDialog(scope.row)"
                            >查看</el-button>
                            <span class="com-page-header-title line"></span>
                            <el-button
                                type="primary"
                                @click="openUpdateDialog(scope.row)"
                            >编辑</el-button>
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
        <addDialog
            ref="addDialog"
            :areaList="areaList"
        />
        <updateDialog
            ref="updateDialog"
            :areaList="areaList"
        />
        <detailDialog ref="detailDialog" />
    </div>
</template>

<script>
import ctrlPage from "@/components/common/other/CtrlPage";
import imgUpload from "@/components/common/upload/imgUpload.vue";
import { getItemName } from "@/filters/index.js";
import Dictionary from '@/components/common/select/Dictionary'

import addDialog from "@/components/property/houseProperty/house/addDialog";
import updateDialog from "@/components/property/houseProperty/house/updateDialog";
import detailDialog from "@/components/property/houseProperty/house/detailDialog";

export default {
    name: "property-propertyButler-house",
    data() {
        return {
            selectForm: {
                areaId: null,
                buildingId: null,
                elementId: null,
                purpose: null,
                search: null,
                delivery: null,
                type: '1',
                status: null,
            },
            list: [],
            areaList: [],
            buildingList: [],
            elementList: [],
            purposeList: [],
            statusList: [
                {
                    statusId: 1,
                    statusValue: '通过'
                }, {
                    statusId: 2,
                    statusValue: '未通过'
                }
            ],
            deleteList: [],
        };
    },
    mounted() {
        this.getAreaList()
        this.getPurposeList()
        this.$refs.page.getList(1);
    },
    watch: {
        'selectForm.areaId'() {
            this.getBuildingList(this.selectForm.areaId)
        },
        'selectForm.buildingId'() {
            this.getElementIdList(this.selectForm.buildingId)
        },
        'selectForm.type'() {
            this.$refs.page.getList(1);
            this.$nextTick(() => {
                this.$refs.selectForm.resetFields();
            })
        }
    },
    methods: {
        getItemName,
        //多选框
        handleSelectionChange(val) {
            this.deleteList = []
            for (let i in val) {
                this.deleteList.push(val[i].id)
            }
        },
        //打开新增窗口
        openAddDialog() {
            this.$refs.addDialog.showDialog();
        },
        //打开编辑窗口
        openUpdateDialog(row) {
            this.$refs.updateDialog.showDialog(row);
        },
        //打开审核窗口
        openAuditingDialog(row) {
            this.$refs.detailDialog.showDialog(row);
            this.$refs.detailDialog.openEditDialog();
        },
        //打开查看窗口
        openDetailDialog(row) {
            this.$refs.detailDialog.showDialog(row);
            this.$refs.detailDialog.closeEditDialog();
        },
        //获取片区
        getAreaList() {
            this.$propertyApi.personManagement.household.cascade({
                areaId: this.selectForm.areaId,
                buildingId: this.selectForm.buildingId,
                elementId: this.selectForm.elementId,
            }).then((res) => {
                if (res.code == 1000) {
                    this.areaList = res.data
                }
            })
        },
        //获取楼栋
        getBuildingList(areaId) {
            this.$propertyApi.personManagement.household.cascade({
                areaId: areaId,
            }).then((res) => {
                if (res.code == 1000) {
                    this.buildingList = res.data
                }
            })
        },
        //获取单元
        getElementIdList(buildingId) {
            this.$propertyApi.personManagement.household.cascade({
                buildingId: buildingId,
            }).then((res) => {
                if (res.code == 1000) {
                    this.elementList = res.data
                }
            })
        },
        //获取房屋用途
        getPurposeList() {
            this.$systemApi.dataDictionary.typeToDic({
                typeCode: 1005
            }).then((res) => {
                if (res.code == 1000) {
                    this.purposeList = res.data
                }
            })
        },
        //查询/获取List
        getList(pageIndex, rows, callback) {
            this.$propertyApi.houseProperty.house.list({
                pageNum: pageIndex,
                pageSize: rows,
                areaId: this.selectForm.areaId,
                buildingId: this.selectForm.buildingId,
                elementId: this.selectForm.elementId,
                purpose: this.selectForm.purpose,
                search: this.selectForm.search,
                delivery: this.selectForm.delivery,
                status: this.selectForm.status,
                type: this.selectForm.type,
            }).then((res) => {
                if (res.code == 1000) {
                    this.list = res.data.list
                    callback(this.list, res.data.total)
                } else {
                    this.$$alert({
                        message: res.msg,
                        type: 'error'
                    })
                }
            })
        },
        //删除操作
        del(id) {
            if (id.length == 0) {
                this.$$message({
                    message: '请选择批量删除对象',
                    type: 'warning'
                })
                return
            }
            this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    if (Array.isArray(id)) {
                        this.$propertyApi.houseProperty.house.deleteList({
                            ids: id
                        })
                            .then(res => {
                                if (res.code == 1000) {
                                    this.$$message({
                                        message: res.message,
                                        type: 'success'
                                    })
                                    this.$refs.page.getList(1);
                                } else {
                                    this.$$message({
                                        message: res.message,
                                        type: 'error'
                                    })
                                }
                            })
                    } else {
                        this.$propertyApi.houseProperty.house.delete({
                            id: id
                        })
                            .then(res => {
                                if (res.code == 1000) {
                                    this.$$message({
                                        message: res.message,
                                        type: 'success'
                                    })
                                    this.$refs.page.getList(1);
                                } else {
                                    this.$$message({
                                        message: res.message,
                                        type: 'error'
                                    })
                                }
                            })
                    }
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
        },
    },
    components: {
        ctrlPage,
        imgUpload,
        Dictionary,
        addDialog,
        detailDialog,
        updateDialog
    }
};
</script>

<style>
</style>
