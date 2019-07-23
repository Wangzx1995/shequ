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
                        v-model="selectForm.user"
                        placeholder="请选择片区"
                    >
                        <el-option
                            label="片区一"
                            value="shanghai"
                        ></el-option>
                        <el-option
                            label="片区二"
                            value="beijing"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="所属楼栋">
                    <el-select
                        clearable
                        v-model="selectForm.user"
                        placeholder="请选择楼栋"
                    >
                        <el-option
                            label="楼栋一"
                            value="shanghai"
                        ></el-option>
                        <el-option
                            label="楼栋二"
                            value="beijing"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="所属单元">
                    <el-select
                        clearable
                        v-model="selectForm.user"
                        placeholder="请选择单元"
                    >
                        <el-option
                            label="单元一"
                            value="shanghai"
                        ></el-option>
                        <el-option
                            label="单元二"
                            value="beijing"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="所属房屋">
                    <el-select
                        clearable
                        v-model="selectForm.user"
                        placeholder="请选择房屋"
                    >
                        <el-option
                            label="房屋一"
                            value="shanghai"
                        ></el-option>
                        <el-option
                            label="房屋二"
                            value="beijing"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="到访状态">
                    <el-select
                        clearable
                        v-model="selectForm.user"
                        placeholder="请选择到访状态"
                    >
                        <el-option
                            label="到访状态一"
                            value="shanghai"
                        ></el-option>
                        <el-option
                            label="到访状态二"
                            value="beijing"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="关键词">
                    <el-input
                        v-model="selectForm.user"
                        placeholder="关键词"
                    ></el-input>
                </el-form-item>
                <el-form-item label="来访时间">
                    <el-date-picker
                        v-model="selectForm.user"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                    >
                    </el-date-picker>
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
                            type="primary"
                            plain
                            size="mini"
                            @click="dialogVisible=true"
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
                        prop="num"
                        label="访客姓名"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="num"
                        label="被访人"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="性别"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="手机号"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="证件类型"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="证件号"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="数据来源"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="预约时间"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="来访时间"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="到访状态"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        width="100"
                        align="center"
                    >
                        <template slot-scope="scope">
                            <el-button
                                type="primary"
                                @click="dialogVisible=true"
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
        <el-dialog
            title="新增访客"
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
    name: "property-personManagement-visitor",
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
