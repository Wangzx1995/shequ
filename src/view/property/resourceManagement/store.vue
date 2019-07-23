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
                        >新增</el-button>
                        <el-button
                            type="danger"
                            plain
                            size="mini"
                        >批量删除</el-button>
                    </template>
                </div>
                <span class="com-page-header-title">仓库管理列表</span>
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
                        label="仓库编码"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="仓库名称"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="物资分类（种）"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="物资品牌（种）"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="物资数量（件）"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="已领取（件）"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="已报废（件）"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="负责人"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="联系方式"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        width="150"
                        align="center"
                    >
                        <template slot-scope="scope">
                            <el-button type="primary">编辑</el-button>
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
            title="新增仓库"
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
                    <el-col :span="11">
                        <el-form-item
                            label="仓库编号"
                            prop="num"
                        >
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col
                        :span="11"
                        :offset="1"
                    >
                        <el-form-item
                            label="联系方式"
                            prop="tel"
                        >
                            <el-button
                                type="primary"
                                size="mini"
                                @click="innerVisible = true"
                            >选择人员</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item
                            label="仓库名称"
                            prop="num"
                        >
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col
                        :span="11"
                        :offset="1"
                    >
                        <el-form-item
                            label="联系方式"
                            prop="tel"
                        >
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item label="仓库地址">
                            <el-input
                                type="textarea"
                                v-model="form.name"
                                style="width:200px;"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col
                        :span="11"
                        :offset="1"
                    >
                        <el-form-item label="备注">
                            <el-input
                                type="textarea"
                                v-model="form.name"
                                style="width:200px;"
                            ></el-input>
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
        <el-dialog
            width="30%"
            title="内层 Dialog"
            :visible.sync="innerVisible"
            :modal-append-to-body='false'
        >
            <el-transfer
                filterable
                :filter-method="filterMethod"
                filter-placeholder="请输入城市拼音"
                v-model="value"
                :data="transferData"
            >
            </el-transfer>
        </el-dialog>
    </div>
</template>

<script>
import ctrlPage from "@/components/common/other/CtrlPage";

export default {
    name: "property-resourceManagement-store",
    data() {
        const generateData = _ => {
            const data = [];
            const cities = [
                "上海",
                "北京",
                "广州",
                "深圳",
                "南京",
                "西安",
                "成都"
            ];
            const pinyin = [
                "shanghai",
                "beijing",
                "guangzhou",
                "shenzhen",
                "nanjing",
                "xian",
                "chengdu"
            ];
            cities.forEach((city, index) => {
                data.push({
                    label: city,
                    key: index,
                    pinyin: pinyin[index]
                });
            });
            return data;
        };
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
            innerVisible: false,
            transferData: generateData(),
            value: [],
            filterMethod(query, item) {
                return item.pinyin.indexOf(query) > -1;
            }
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
        ctrlPage
    }
};
</script>

<style>
</style>
