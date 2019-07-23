<template>
    <div class="property">
        <div class="com-main-inner selectBox">
            <el-form
                :inline="true"
                :model="selectForm"
                class="demo-form-inline"
                label-position="left"
            >
                <el-form-item label="投诉建议">
                    <el-select
                        clearable
                        v-model="selectForm.user"
                        placeholder="请选择投诉建议"
                    >
                        <el-option
                            label="投诉建议一"
                            value="shanghai"
                        ></el-option>
                        <el-option
                            label="投诉建议二"
                            value="beijing"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="处理状态">
                    <el-select
                        clearable
                        v-model="selectForm.user"
                        placeholder="请选择处理状态"
                    >
                        <el-option
                            label="处理状态一"
                            value="shanghai"
                        ></el-option>
                        <el-option
                            label="处理状态二"
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
                <el-form-item label="反映时间">
                    <el-date-picker
                        v-model="selectForm.user"
                        type="date"
                        placeholder="选择日期"
                    >
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary">查询<i class="icon-x-sousuo el-icon--right"></i></el-button>
                </el-form-item>
            </el-form>
        </div>
        <br>
        <div class="com-page-header-wrap clear com-main-inner">
            <div class="com-main-inner-title">
                <span class="com-page-header-title">投诉建议列表（弹窗没出图。没做）</span>
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
                        label="投诉建议"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="反映内容"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="反映人"
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
                        prop="name"
                        label="反映时间"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="处理状态"
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

        <!-- 发布 -->
        <el-dialog
            title="查看"
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
    </div>
</template>

<script>
import ctrlPage from "@/components/common/other/CtrlPage";

export default {
    name: "property-propertyButler-suggestions",
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
        }
    },
    components: {
        ctrlPage
    }
};
</script>

<style>
</style>
