<template>
    <div class="property">
        <div class="com-main-inner selectBox">
            <el-form
                :inline="true"
                :model="selectForm"
                class="demo-form-inline"
                label-position="left"
            >
                <el-form-item label="所属仓库">
                    <el-select
                        clearable
                        v-model="selectForm.user"
                        placeholder="请选择所属仓库"
                    >
                        <el-option
                            label="所属仓库一"
                            value="shanghai"
                        ></el-option>
                        <el-option
                            label="所属仓库二"
                            value="beijing"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="一级分类">
                    <el-select
                        clearable
                        v-model="selectForm.user"
                        placeholder="请选择一级分类"
                    >
                        <el-option
                            label="一级分类一"
                            value="shanghai"
                        ></el-option>
                        <el-option
                            label="一级分类二"
                            value="beijing"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="二级分类">
                    <el-select
                        clearable
                        v-model="selectForm.user"
                        placeholder="请选择二级分类"
                    >
                        <el-option
                            label="二级分类一"
                            value="shanghai"
                        ></el-option>
                        <el-option
                            label="二级分类二"
                            value="beijing"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="采购日期">
                    <el-date-picker
                        v-model="selectForm.user"
                        type="date"
                        placeholder="选择日期"
                    >
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="采购日期">
                    <el-date-picker
                        v-model="selectForm.user"
                        type="date"
                        placeholder="选择日期"
                    >
                    </el-date-picker>
                </el-form-item>

                <el-form-item label="关键词">
                    <el-input
                        v-model="selectForm.user"
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
                            @click="openAddDialog()"
                        >新增</el-button>
                        <el-button
                            type="warning"
                            size="mini"
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
                <span class="com-page-header-title">物资管理列表</span>
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
                        fixed
                    >
                    </el-table-column>
                    <el-table-column
                        type="index"
                        label="序号"
                        width="80"
                        align="center"
                        fixed
                    >
                    </el-table-column>
                    <el-table-column
                        prop="num"
                        label="物资编号"
                        align="center"
                        min-width="100"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="num"
                        label="物资名称"
                        align="center"
                        min-width="100"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="num"
                        label="物资品牌"
                        align="center"
                        min-width="100"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="num"
                        label="物资型号"
                        align="center"
                        min-width="100"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="num"
                        label="二级分类"
                        align="center"
                        min-width="100"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="num"
                        label="一级分类"
                        align="center"
                        min-width="100"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="num"
                        label="数量"
                        align="center"
                        min-width="100"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="num"
                        label="计量单位"
                        align="center"
                        min-width="100"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="所属仓库"
                        align="center"
                        min-width="300"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="采购日期"
                        align="center"
                        min-width="100"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="保费日期"
                        align="center"
                        min-width="100"
                    >
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        width="250"
                        align="center"
                        fixed="right"
                    >
                        <template slot-scope="scope">
                            <el-button
                                type="primary"
                                @click="dialogVisible2=true"
                            >出库</el-button>
                            <span class="com-page-header-title line"></span>
                            <el-button
                                type="primary"
                                @click="dialogVisible2=true"
                            >入库</el-button>
                            <span class="com-page-header-title line"></span>
                            <el-button
                                type="primary"
                                @click="openDetailDialog(scope.row.id)"
                            >查看</el-button>
                            <span class="com-page-header-title line"></span>
                            <el-button
                                type="primary"
                                @click="openUpdateDialog(scope.row.id)"
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
        <el-dialog
            title="出库"
            :visible.sync="dialogVisible"
            width="400px"
            :modal-append-to-body='false'
            center
        >
            <el-form
                :model="form"
                ref="ruleForm"
                label-width="100px"
                class="demo-ruleForm dialog-form"
                label-position="left"
            >
                <el-row>
                    <el-col :span="24">
                        <el-form-item
                            label="数量"
                            prop="num"
                        >
                            <el-input-number v-model="form.num"></el-input-number>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div
                slot="footer"
                class="dialog-footer"
                style="text-align:center"
            >
                <el-button
                    type="primary"
                    @click="dialogVisible2 = false"
                >保 存</el-button>
                <el-button @click="dialogVisible2 = false">取 消</el-button>
            </div>
        </el-dialog>
        <addDialog ref="addDialog" />
        <detailDialog ref="detailDialog" />
        <updateDialog ref="updateDialog" />
    </div>
</template>

<script>
import ctrlPage from "@/components/common/other/CtrlPage";

import addDialog from "@/components/property/resourceManagement/material/addDialog";
import detailDialog from "@/components/property/resourceManagement/material/detailDialog";
import updateDialog from "@/components/property/resourceManagement/material/updateDialog";

export default {
    name: "property-resourceManagement-material",
    data() {
        return {
            selectForm: {
                user: ""
            },
            list: [],
            form: {
                num: null
            },
            dialogVisible: false,
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
        //打开编辑窗口
        openUpdateDialog(id) {
            this.$refs.updateDialog.showDialog(id);
        },
        //打开查看窗口
        openDetailDialog(id) {
            this.$refs.detailDialog.showDialog(id);
        },
        getList(pageIndex, rows, callback) {
            if (!this.list.length) {
                for (let i = 1; i <= 11; i++) {
                    this.list.push({
                        num: "c" + i,
                        name: "c" + i
                    });
                }
            }
            callback(this.list, 12);
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
        addDialog,
        detailDialog,
        updateDialog
    }
};
</script>

<style>
</style>
