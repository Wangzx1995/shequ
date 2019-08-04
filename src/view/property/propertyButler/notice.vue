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
                <el-form-item label="关键词">
                    <el-input
                        v-model="selectForm.search"
                        placeholder="关键词"
                    ></el-input>
                </el-form-item>
                <el-form-item label="发布时间">
                    <el-date-picker
                        v-model="selectForm.issuetime"
                        type="date"
                        placeholder="选择日期"
                        value-format="yyyy/MM/dd"
                    >
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="通知类型">
                    <Dictionary
                        :typeCode="1020"
                        v-model="selectForm.informType"
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
                        >发布</el-button>
                        <el-button
                            type="danger"
                            plain
                            size="mini"
                            @click="del(deleteList)"
                        >批量删除</el-button>
                    </template>
                </div>
                <span class="com-page-header-title">通知公告列表（弹窗没出图。没做）</span>
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
                        prop="type"
                        label="通知类型"
                        align="center"
                    >
                        <template slot-scope="scope">
                            <DictionaryText
                                :typeCode="1020"
                                :dicCode="scope.row.type"
                            />
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="title"
                        label="标题"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="content"
                        label="通知内容"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="issuer"
                        label="发布人"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="issuetime"
                        label="发布时间"
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
                                @click="openDetailDialog(scope.row.id)"
                            >查看</el-button>
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
        <addDialog ref="addDialog" />
        <detailDialog ref="detailDialog" />
    </div>
</template>

<script>
import ctrlPage from "@/components/common/other/CtrlPage";
import UeEditor from "@/components/common/other/UeEditor";
import Dictionary from "@/components/common/select/Dictionary";
import DictionaryText from "@/components/common/select/DictionaryText";

import addDialog from "@/components/property/propertyButler/notice/addDialog";
import detailDialog from "@/components/property/propertyButler/notice/detailDialog";
export default {
    name: "property-propertyButler-notice",
    data() {
        return {
            selectForm: {
                search: null,
                issuetime: null,
                informType: null
            },
            list: [],
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
            this.$propertyApi.propertyButler.notice
                .list({
                    pageNum: pageIndex,
                    pageSize: rows,
                    informType: this.selectForm.informType,
                    issuetime: this.selectForm.issuetime,
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
                        this.$propertyApi.propertyButler.notice
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
                        this.$propertyApi.propertyButler.notice
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
        UeEditor,
        Dictionary,
        DictionaryText,
        addDialog,
        detailDialog
    }
};
</script>

<style>
</style>
