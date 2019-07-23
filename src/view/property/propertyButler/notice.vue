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
                <el-form-item label="发布时间">
                    <el-date-picker
                        v-model="selectForm.user"
                        type="date"
                        placeholder="选择日期"
                    >
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="通知类型">
                    <el-select
                        clearable
                        v-model="selectForm.user"
                        placeholder="请选择通知类型"
                    >
                        <el-option
                            label="通知类型一"
                            value="shanghai"
                        ></el-option>
                        <el-option
                            label="通知类型二"
                            value="beijing"
                        ></el-option>
                    </el-select>
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
                        >发布</el-button>
                        <el-button
                            type="danger"
                            plain
                            size="mini"
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
                        prop="num"
                        label="二级分类"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="一级分类"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="创建时间"
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
                                @click="dialogVisible2=true"
                            >查看</el-button>
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

        <!-- 发布 -->
        <el-dialog
            title="发布通知"
            :visible.sync="dialogVisible"
            width="800px"
            :modal-append-to-body='false'
            center
        >
            <el-form
                :model="form"
                :rules="rules"
                ref="ruleForm"
                label-width="100px"
                class="demo-ruleForm dialog-form"
                label-position="left"
            >
                <el-row>
                    <el-col :span="24">
                        <el-form-item
                            label="标题"
                            prop="num"
                        >
                            <el-input
                                v-model="form.name"
                                class="longInput"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item
                            label="通知类型"
                            prop="region"
                        >
                            <el-select
                                clearable
                                v-model="form.name"
                                placeholder="请选择通知类型"
                            >
                                <el-option
                                    label="区域一"
                                    value="shanghai"
                                ></el-option>
                                <el-option
                                    label="区域二"
                                    value="beijing"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item
                            label="通知内容"
                            prop="num"
                        >
                            <UeEditor />
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
                    @click="dialogVisible = false"
                >保 存</el-button>
                <el-button @click="dialogVisible = false">取 消</el-button>
            </div>
        </el-dialog>

        <!-- 查看 -->
        <el-dialog
            title="查看"
            :visible.sync="dialogVisible2"
            width="800px"
            :modal-append-to-body='false'
            center
        >
            <div class="notice">
                <h2>停电通告</h2>
                <div style="border: 1px solid #e7eaec;padding:20px 50px">
                    各位业主！
                    收到街道通知，本小区将于2019年2月5号中午12点到18点停电，望大家相互传达，给您带来不便请见谅。
                    <br />
                    <br />
                    <br />
                    <p>绿城物业公司</p>
                    <p>2019-01-01</p>
                </div>
            </div>
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
    </div>
</template>

<script>
import ctrlPage from "@/components/common/other/CtrlPage";
import UeEditor from "@/components/common/other/UeEditor";

export default {
    name: "property-propertyButler-notice",
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
            dialogVisible2: false,
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
                        name: "行政部"
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
        ctrlPage, UeEditor
    }
};
</script>

<style>
</style>
