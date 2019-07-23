<template>
    <div class="system">
        <div class="com-main-inner selectBox">
            <el-form
                :inline="true"
                :model="selectForm"
                class="demo-form-inline"
                label-position="left"
            >
                <el-form-item label="关键词">
                    <el-input
                        v-model="selectForm.user"
                        placeholder="关键词"
                    ></el-input>
                </el-form-item>
                <el-form-item label="子系统">
                    <el-select
                        clearable
                        v-model="selectForm.user"
                        placeholder="请选择子系统"
                    >
                        <el-option
                            label="子系统一"
                            value="shanghai"
                        ></el-option>
                        <el-option
                            label="子系统二"
                            value="beijing"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="操作类型">
                    <el-select
                        clearable
                        v-model="selectForm.user"
                        placeholder="请选择操作类型"
                    >
                        <el-option
                            label="操作类型一"
                            value="shanghai"
                        ></el-option>
                        <el-option
                            label="操作类型二"
                            value="beijing"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item style="float:right">
                    <el-button type="primary">查询<i class="icon-x-sousuo el-icon--right"></i></el-button>
                </el-form-item>
            </el-form>
        </div>
        <br>
        <div class="com-page-header-wrap clear com-main-inner">
            <div class="com-main-inner-title">
                <div class="clear fr">
                    <template>
                        <el-button
                            type="danger"
                            plain
                            size="mini"
                        >批量删除</el-button>
                    </template>
                </div>
                <span class="com-page-header-title">日志列表</span>
            </div>
            <div class="com-main-inner-table">
                <el-table
                    :data="list"
                    stripe
                    border
                    style="width: 100%"
                    @selection-change="handleSelectionChange"
                    :header-cell-style="{background:'#edf3f9',color:'#333333',padding:'0'}"
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
                        prop="num"
                        label="操作类型"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="num"
                        label="子系统"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="num"
                        label="操作账号"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="num"
                        label="操作人"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="num"
                        label="ip"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="num"
                        label="操作时间"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="num"
                        label="操作内容"
                        align="center"
                    >
                    </el-table-column>
                </el-table>
                <ctrlPage
                    :setPage="getList"
                    ref="page"
                    style="float:right;margin-top:20px;"
                />
            </div>
        </div>
    </div>
</template>

<script>
import ctrlPage from "@/components/common/other/CtrlPage";

export default {
    name: "system-journal",
    data() {
        return {
            selectForm: {
                user: ""
            },
            list: []
        };
    },
    mounted() {
        this.$refs.page.getList(1);
    },
    methods: {
        handleSelectionChange(val) {
            this.multipleSelection = val;
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
        ctrlPage
    }
};
</script>

<style>
</style>
