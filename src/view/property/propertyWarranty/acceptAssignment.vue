<template>
    <div class="property">
        <div class="com-main-inner selectBox">
            <el-form
                :inline="true"
                :model="selectForm"
                class="demo-form-inline"
                label-position="left"
            >

                <el-form-item label="报修类型">
                    <el-select
                        clearable
                        v-model="selectForm.user"
                        placeholder="请选择报修类型"
                    >
                        <el-option
                            label="报修类型一"
                            value="shanghai"
                        ></el-option>
                        <el-option
                            label="报修类型二"
                            value="beijing"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="上报时间">
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
                    </template>
                </div>
                <span class="com-page-header-title">受理派工列表</span>
            </div>
            <div class="com-main-inner-table">
                <el-table
                    :data="list"
                    stripe
                    border
                    style="width: 100%"
                    :header-cell-style="{background:'#effbfb',color:'#1e1e1e',padding:'0'}"
                    :cell-style="{padding:'0',color:'#999999'}"
                >
                    <el-table-column
                        type="index"
                        label="序号"
                        width="80"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="num"
                        label="报修编号"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="上报人"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="报修内容"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="上报时间"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="报修类型"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="报修状态"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        width="200"
                        align="center"
                    >
                        <template slot-scope="scope">
                            <el-button type="primary">详情</el-button>
                            <span class="com-page-header-title line"></span>
                            <el-button type="primary">派工</el-button>
                            <span class="com-page-header-title line"></span>
                            <el-button type="danger">拒绝</el-button>
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
    name: "property-propertyWarranty-acceptAssignment",
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
            dialogVisible: false
        };
    },
    mounted() {
        this.$refs.page.getList(1);
    },
    methods: {
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
    },
    components: {
        ctrlPage
    }
};
</script>

<style>
</style>
