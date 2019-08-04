<template>
    <div class="property">
        <div class="com-main-inner selectBox">
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
                <el-form-item label="产权性质">
                    <Dictionary
                        :typeCode="1004"
                        v-model="selectForm.nature"
                        ref="natureList"
                    />
                </el-form-item>
                <el-form-item label="有无电梯">
                    <el-select
                        clearable
                        v-model="selectForm.elevator"
                        placeholder="请选择片区"
                    >
                        <el-option
                            v-for="item in elevatorList"
                            :key="item.value"
                            :label="item.dicName"
                            :value="item.dicCode"
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
                <span class="com-page-header-title">楼栋管理列表</span>
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
                        label="楼栋编号"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="楼栋名称"
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
                        label="有无电梯"
                        align="center"
                    >
                        <template slot-scope="scope">
                            <span v-if="scope.row.elevator==1">有</span>
                            <span v-if="scope.row.elevator==2">无</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="buildingAge"
                        label="建筑年代"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        label="产权性质"
                        align="center"
                    >
                        <template slot-scope="scope">
                            <span>{{getItemName(scope.row.nature, $refs.natureList.list, 'dicCode', 'dicName')}}</span>
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
import { getItemName } from "@/filters/index.js";
import Dictionary from '@/components/common/select/Dictionary'
import addDialog from "@/components/property/houseProperty/building/addDialog";
import updateDialog from "@/components/property/houseProperty/building/updateDialog";
import detailDialog from "@/components/property/houseProperty/building/detailDialog";


export default {
    name: "property-houseProperty-building",
    data() {
        return {
            selectForm: {
                areaId: "",
                nature: "",
                elevator: "",
                search: "",
            },
            list: [],
            areaList: [],
            natureList: [],
            elevatorList: [
                {
                    dicCode: 1,
                    dicName: '有'
                }, {
                    dicCode: 2,
                    dicName: '无'
                }
            ],
            deleteList: []
        };
    },
    mounted() {
        this.getSearchList()
        this.$refs.page.getList(1);
        this.natureList = this.$refs.natureList.list
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
            this.$refs.addDialog.showDialog(this.$refs.natureList.list);
        },
        //打开编辑窗口
        openUpdateDialog(row) {
            this.$refs.updateDialog.showDialog(row, this.$refs.natureList.list);
        },
        //打开查看窗口
        openDetailDialog(row) {
            this.$refs.detailDialog.showDialog(row, this.$refs.natureList.list);
        },
        //获取片区列表
        getSearchList() {
            this.$propertyApi.personManagement.household.cascade().then((res) => {
                if (res.code == 1000) {
                    this.areaList = res.data
                }
            })
        },
        //查询/获取List
        getList(pageIndex, rows, callback) {
            this.$propertyApi.houseProperty.building.list({
                pageNum: pageIndex,
                pageSize: rows,
                areaId: this.selectForm.areaId,
                nature: this.selectForm.nature,
                elevator: this.selectForm.elevator,
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
                        this.$propertyApi.houseProperty.building.deleteList({
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
                        this.$propertyApi.houseProperty.building.delete({
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
        detailDialog,
        Dictionary
    }
};
</script>

<style>
</style>
