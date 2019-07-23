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
                        v-model="selectForm.search"
                        placeholder="关键词"
                    ></el-input>
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
                        >新增</el-button>
                        <el-button
                            type="danger"
                            plain
                            size="mini"
                            @click="del(deleteList)"
                        >批量删除</el-button>
                    </template>
                </div>
                <span class="com-page-header-title">组织架构列表</span>
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
                        prop="deptCode"
                        label="部门编码"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="deptIntro"
                        label="部门简称"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="deptName"
                        label="部门全称"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="parentId"
                        label="上级部门"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="tel"
                        label="联系方式"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        width="200"
                        align="center"
                    >
                        <template slot-scope="scope">
                            <el-button
                                type="primary"
                                icon="icon-x-bianji"
                                @click="openUpdateDialog(scope.row)"
                            ></el-button>
                            <span class="com-page-header-title line"></span>
                            <el-button
                                type="danger"
                                icon="icon-x-shanchu"
                                @click="del([scope.row.id])"
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
            title="新增组织架构"
            :visible.sync="dialogVisible.add"
            width="800px"
            :modal-append-to-body='false'
            center
        >
            <el-form
                :model="addForm"
                :rules="rules"
                ref="addForm"
                label-width="100px"
                class="demo-ruleForm dialog-form"
                label-position="left"
            >
                <el-row>
                    <el-col :span="11">
                        <el-form-item
                            label="部门编码"
                            prop="deptCode"
                        >
                            <el-input v-model="addForm.deptCode"></el-input>
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
                            <el-input v-model="addForm.tel"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item
                            label="部门简称"
                            prop="deptIntro"
                        >
                            <el-input v-model="addForm.deptIntro"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col
                        :span="11"
                        :offset="1"
                    >
                        <el-form-item
                            label="上级部门"
                            prop="parentId"
                        >
                            <el-select
                                clearable
                                v-model="addForm.parentId"
                                placeholder="请选择上级部门"
                            >
                                <el-option
                                    label="物业部门"
                                    value="01"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item
                            label="部门全称"
                            prop="deptName"
                        >
                            <el-input v-model="addForm.deptName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col
                        :span="11"
                        :offset="1"
                    >
                        <el-form-item
                            label="排序"
                            prop="sort"
                        >
                            <el-input v-model="addForm.sort"></el-input>
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
                    @click="add()"
                >保 存</el-button>
                <el-button @click="dialogVisible.add = false">取 消</el-button>
            </div>
        </el-dialog>
        <el-dialog
            title="编辑组织架构"
            :visible.sync="dialogVisible.update"
            width="800px"
            :modal-append-to-body='false'
            center
        >
            <el-form
                :model="updateForm"
                :rules="rules"
                ref="updateForm"
                label-width="100px"
                class="demo-ruleForm dialog-form"
                label-position="left"
            >
                <el-row>
                    <el-col :span="11">
                        <el-form-item
                            label="部门编码"
                            prop="deptCode"
                        >
                            <el-input v-model="updateForm.deptCode"></el-input>
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
                            <el-input v-model="updateForm.tel"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item
                            label="部门简称"
                            prop="deptIntro"
                        >
                            <el-input v-model="updateForm.deptIntro"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col
                        :span="11"
                        :offset="1"
                    >
                        <el-form-item
                            label="上级部门"
                            prop="parentId"
                        >
                            <el-select
                                clearable
                                v-model="updateForm.parentId"
                                placeholder="请选择上级部门"
                            >
                                <el-option
                                    label="物业部门"
                                    value="01"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item
                            label="部门全称"
                            prop="deptName"
                        >
                            <el-input v-model="updateForm.deptName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col
                        :span="11"
                        :offset="1"
                    >
                        <el-form-item
                            label="排序"
                            prop="sort"
                        >
                            <el-input v-model="updateForm.sort"></el-input>
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
                    @click="update()"
                >保 存</el-button>
                <el-button @click="dialogVisible.update = false">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import ctrlPage from "@/components/common/other/CtrlPage";

export default {
    name: "system-organization",
    data() {
        return {
            selectForm: {
                search: ""
            },
            list: [],
            addForm: {
                deptCode: "",
                deptIntro: "",
                deptName: "",
                parentId: null,
                sort: null,
                tel: ""
            },
            updateForm: {},
            rules: {
                deptCode: [
                    {
                        required: true,
                        message: "请输入部门编码",
                        trigger: "blur"
                    }
                ],
                deptIntro: [
                    {
                        required: true,
                        message: "请输入部门简称",
                        trigger: "blur"
                    }
                ],
                deptName: [
                    {
                        required: true,
                        message: "请输入部门全称",
                        trigger: "blur"
                    }
                ]
            },
            dialogVisible: {
                add: false,
                update: false
            },
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
        //查询/获取List
        getList(pageIndex, rows, callback) {
            this.$systemApi.estateManage
                .deptSelect({
                    pageNum: pageIndex,
                    pageSize: rows,
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
        //新增操作
        add() {
            this.$refs.addForm.validate(valid => {
                if (valid) {
                    this.$systemApi.estateManage
                        .deptCreate(this.addForm)
                        .then(res => {
                            if (res.code == 1000) {
                                this.dialogVisible.add = false;
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
                    this.$systemApi.estateManage
                        .deptDelete({
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
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
        },
        //打开新增窗口
        openAddDialog() {
            this.dialogVisible.add = true;
            this.$nextTick(() => {
                this.$refs["addForm"].resetFields();
            });
        },
        //打开编辑窗口
        openUpdateDialog(form) {
            this.updateForm = form;
            this.dialogVisible.update = true;
        },
        //修改
        update() {
            this.$refs.updateForm.validate(valid => {
                if (valid) {
                    this.$systemApi.estateManage
                        .deptUpdate(this.updateForm)
                        .then(res => {
                            if (res.code == 1000) {
                                this.dialogVisible.update = false;
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
