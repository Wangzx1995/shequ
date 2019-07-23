<template>
    <div class="property">
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
                <el-form-item>
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
                            type="primary"
                            plain
                            size="mini"
                            @click="dialogVisible=true"
                        >新增</el-button>
                        <el-button
                            type="danger"
                            plain
                            size="mini"
                        >批量删除</el-button>
                    </template>
                </div>
                <span class="com-page-header-title">停车场管理列表</span>
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
                        label="停车场编号"
                        align="center"
                        min-width="100"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="num"
                        label="停车场名称"
                        align="center"
                        min-width="100"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="num"
                        label="总车位数（个）"
                        align="center"
                        min-width="100"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="num"
                        label="固定车位数（个）"
                        align="center"
                        min-width="100"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="num"
                        label="备注"
                        align="center"
                        min-width="100"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="num"
                        label="创建时间"
                        align="center"
                        min-width="100"
                    >
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        width="200"
                        align="center"
                        fixed="right"
                    >
                        <template slot-scope="scope">
                            <el-button
                                type="primary"
                                @click="dialogVisible=true"
                            >查看</el-button>
                            <span class="com-page-header-title line"></span>
                            <el-button
                                type="primary"
                                @click="dialogVisible=true"
                            >编辑</el-button>
                            <span class="com-page-header-title line"></span>
                            <el-button
                                type="danger"
                                @click="del(scope.row)"
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
            title="新增"
            :visible.sync="dialogVisible"
            width="800px"
            :modal-append-to-body='false'
            center
        >
            <div>
                没图
            </div>
            <div
                slot="footer"
                class="dialog-footer"
                style="text-align:center"
            >
                <el-button
                    type="primary"
                    @click="dialogVisible = false"
                >保 存</el-button>
                <el-button @click="dialogVisible = false">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import ctrlPage from "@/components/common/other/CtrlPage";

export default {
    name: "property-parkingManagement-parking",
    data() {
        return {
            selectForm: {
                user: ""
            },
            list: [],
            form: {
                num: "",
                name: ""
            },
            rules: {
                num: [
                    {
                        type: "date",
                        required: true,
                        message: "请输入部门编码",
                        trigger: "blur"
                    }
                ],
                name: [
                    {
                        type: "date",
                        required: true,
                        message: "请输入部门简称",
                        trigger: "blur"
                    }
                ]
            },
            dialogVisible: false,
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
