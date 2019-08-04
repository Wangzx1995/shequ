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
                            v-if="selectForm.type=='1'"
                            @click="openAddDialog()"
                        >新增</el-button>
                        <el-button
                            size="mini"
                            type="warning"
                            plain
                        >导入</el-button>
                        <el-button
                            type="danger"
                            plain
                            size="mini"
                            v-if="selectForm.type=='2'"
                            @click="del(deleteList)"
                        >批量删除</el-button>
                    </template>
                </div>
                <span class="com-page-header-title">住户管理列表
                    <el-radio-group v-model="selectForm.type">
                        <el-radio-button label="1">待审批</el-radio-button>
                        <el-radio-button label="2">已审批</el-radio-button>
                    </el-radio-group>
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
                        prop="sex"
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
                        prop="elementName"
                        label="所属单元"
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
                        prop="starttime"
                        label="合同开始日"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="endtime"
                        label="合同结束日"
                        align="center"
                    >
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
                        prop="status"
                        label="APP"
                        align="center"
                        v-if="selectForm.type!='1'"
                    >
                        <template
                            slot-scope="scope"
                            v-if="selectForm.type!='1'"
                        >
                            <span>启用</span>
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
                            >审批</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        width="250"
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
                            <span class="com-page-header-title line"></span>
                            <el-button type="danger">重置</el-button>
                            <span class="com-page-header-title line"></span>
                            <el-button
                                type="primary"
                                @click="openXuzuDialog(scope.row)"
                            >续租</el-button>
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
        <updateDialog ref="updateDialog" />
        <xuzuDialog ref="xuzuDialog" />
    </div>
</template>

<script>
import { getItemName } from "@/filters/index.js";
import ctrlPage from "@/components/common/other/CtrlPage";
import imgUpload from "@/components/common/upload/imgUpload.vue";
import Dictionary from "@/components/common/select/Dictionary";
import DictionaryText from "@/components/common/select/DictionaryText";
import areaId from "@/components/property/selectForm/areaId";
import buildingId from "@/components/property/selectForm/buildingId";
import elementId from "@/components/property/selectForm/elementId";
import roomId from "@/components/property/selectForm/roomId";
import addDialog from "@/components/property/personManagement/household/addDialog";
import detailDialog from "@/components/property/personManagement/household/detailDialog";
import updateDialog from "@/components/property/personManagement/household/updateDialog";
import xuzuDialog from "@/components/property/personManagement/household/xuzuDialog";

export default {
    name: "property-personManagement-household",
    data() {
        return {
            selectForm: {
                type: "1",
                areaId: null,
                buildingId: null,
                elementId: null,
                roomId: null,
                identityType: null,
                search: null,
                startTime: null,
                endTime: null,
                status: null,
                timeValue: null
            },
            list: [],
            statusList: [
                {
                    statusId: 1,
                    statusValue: "通过"
                },
                {
                    statusId: 2,
                    statusValue: "未通过"
                }
            ],
            activeName: "first",
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
        },
        "selectForm.type"() {
            this.$refs.page.getList(1);
            this.$nextTick(() => {
                this.$refs.selectForm.resetFields();
            });
        }
    },
    methods: {
        getItemName,
        handleClick(tab, event) {
            console.log(tab, event);
        },
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
        //打开续租窗口
        openXuzuDialog(row) {
            this.$refs.xuzuDialog.showDialog(row);
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
                    type: this.selectForm.type,
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
        imgUpload,
        areaId,
        buildingId,
        elementId,
        roomId,
        addDialog,
        detailDialog,
        updateDialog,
        xuzuDialog
    }
};
</script>

<style>
</style>
