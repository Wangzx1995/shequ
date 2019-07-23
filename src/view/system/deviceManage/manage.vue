<template>
    <div class="system">
        <div class="com-main-inner selectBox">
            <el-form
                :inline="true"
                :model="selectForm"
                class="demo-form-inline"
                label-position="left"
            >
                <el-form-item label="设备标签">
                    <el-select
                        clearable
                        v-model="selectForm.user"
                        placeholder="请选择设备标签"
                    >
                        <el-option
                            label="设备标签一"
                            value="shanghai"
                        ></el-option>
                        <el-option
                            label="设备标签二"
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
                            type="primary"
                            plain
                            size="mini"
                        >同步平台</el-button>
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
                        >批量删除</el-button>
                    </template>
                </div>
                <span class="com-page-header-title">设备列表</span>
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
                        label="设备编码"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="num"
                        label="设备名称"
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
                        label="设备厂商"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="num"
                        label="设备标签"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        width="260"
                        align="center"
                    >
                        <template slot-scope="scope">
                            <el-button
                                type="primary"
                                icon="icon-x-bianji"
                            ></el-button>
                            <span class="com-page-header-title line"></span>
                            <el-button
                                type="danger"
                                icon="icon-x-shanchu"
                                @click="del(scope.row)"
                            ></el-button>
                            <span class="com-page-header-title line"></span>
                            <el-button
                                type="primary"
                                icon="icon-x-refresh"
                                @click="del(scope.row)"
                            ></el-button>
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
            title="新增设备"
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
                            label="设备编码"
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
                            label="IP"
                            prop="num"
                        >
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item
                            label="设备名称"
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
                            label="设备厂商"
                            prop="region"
                        >
                            <el-select
                                clearable
                                v-model="form.name"
                                placeholder="请选择设备厂商"
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
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item
                            label="入职时间"
                            prop="num"
                        >
                            <el-checkbox-group
                                v-model="checkboxGroup"
                                size="medium"
                            >
                                <el-checkbox-button
                                    v-for="city in cities"
                                    :label="city"
                                    :key="city"
                                >{{city}}</el-checkbox-button>
                            </el-checkbox-group>
                        </el-form-item>
                    </el-col>
                    <el-col
                        :span="11"
                        :offset="1"
                    >
                        <el-form-item
                            label="排序"
                            prop="num"
                        >
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="22">
                        <el-form-item
                            label="设备地址"
                            prop="num"
                        >
                            <el-input
                                v-model="form.name"
                                class="longInput"
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
    </div>
</template>

<script>
import ctrlPage from "@/components/common/other/CtrlPage";
import imgUpload from "@/components/common/upload/imgUpload.vue";

export default {
    name: "system-manage",
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
            upload: {
                limit: 1,
                fileList: []
            },
            cities: ["监控", "烟感", "门禁", "水位", "液压", "电表"],
            checkboxGroup: []
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
                        name: i
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
        imgUpload
    }
};
</script>

<style>
</style>
