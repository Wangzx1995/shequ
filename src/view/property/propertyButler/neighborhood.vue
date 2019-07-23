<template>
    <div class="property">
        <div class="com-main-inner selectBox">
            <el-form
                :inline="true"
                :model="selectForm"
                class="demo-form-inline"
                label-position="left"
            >
                <el-form-item label="发布时间">
                    <el-date-picker
                        v-model="selectForm.user"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
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
                <span class="com-page-header-title">邻里管理列表
                    <el-radio-group v-model="tabPosition">
                        <el-radio-button label="1">待审核</el-radio-button>
                        <el-radio-button label="2">已审批</el-radio-button>
                    </el-radio-group></span>
            </div>
            <div
                class="com-main-inner-table"
                v-if="tabPosition=='1'"
            >
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
                        label="标题"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="发布人"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="所属楼栋"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="所属单元"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="所属房屋"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="发布时间"
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
                            >审核</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <ctrlPage
                    :setPage="getList"
                    ref="page"
                    style="float:right;margin-top:20px;"
                />
            </div>
            <div
                class="com-main-inner-table"
                v-else
            >
                12312312
            </div>
        </div>
        <el-dialog
            title="审核"
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
    name: "property-propertyButler-neighborhood",
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
            tabPosition: '1',
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
    },
    components: {
        ctrlPage
    }
};
</script>

<style>
</style>
