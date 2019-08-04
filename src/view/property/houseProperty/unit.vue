<template>
    <div class="property">
        <div class="com-main-inner selectBox">
            <!-- 查询框 -->
            <el-form
                :inline="true"
                :model="selectForm"
                class="demo-form-inline"
                label-position="left"
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
        <!-- 表名，操作按钮 -->
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
                <span class="com-page-header-title">单元管理列表</span>
            </div>
            <!-- 数据表 -->
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
                        label="单元编号"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="单元名称"
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
                        prop="floorNumber"
                        label="楼层"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        width="150"
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
        <!-- 新增 -->
        <addDialog
            ref="addDialog"
            :areaList="areaList"
        />
        <!-- 编辑 -->
        <updateDialog
            ref="updateDialog"
            :areaList="areaList"
        />
        <!-- 详情 -->
        <detailDialog ref="detailDialog" />
    </div>
</template>

<script>
import ctrlPage from "@/components/common/other/CtrlPage";
import addDialog from "@/components/property/houseProperty/unit/addDialog";
import updateDialog from "@/components/property/houseProperty/unit/updateDialog";
import detailDialog from "@/components/property/houseProperty/unit/detailDialog";

export default {
    name: "property-houseProperty-unit",
    data() {
        return {
            selectForm: {
                areaId: null,
                buildingId: null,
                search: null,
            },
            list: [],
            areaList: [],
            buildingList: [],

            deleteList: []
        };
    },
    mounted() {
        this.getAreaList()
        this.getBuildingList(0)
        this.$refs.page.getList(1);
    },
    watch: {
        'selectForm.areaId'() {
            this.selectForm.buildingId = ''
            if (this.selectForm.areaId == '') {
                this.getBuildingList(0)
            } else {
                this.getBuildingList(this.selectForm.areaId)
            }
        }
    },
    methods: {
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
        //打开查看窗口
        openDetailDialog(row) {
            this.$refs.detailDialog.showDialog(row);
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
        //查询/获取List
        getList(pageIndex, rows, callback) {
            this.$propertyApi.houseProperty.unit.list({
                pageNum: pageIndex,
                pageSize: rows,
                areaId: this.selectForm.areaId,
                buildingId: this.selectForm.buildingId,
                search: this.selectForm.search,
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
                        this.$propertyApi.houseProperty.unit.deleteList({
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
                        this.$propertyApi.houseProperty.unit.delete({
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
        addDialog,
        updateDialog,
        detailDialog
    }
};
</script>

<style>
</style>
