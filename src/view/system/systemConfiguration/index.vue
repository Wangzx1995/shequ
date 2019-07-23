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
                <span class="com-page-header-title">系统配置列表</span>
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
                        prop="cfgItem"
                        label="配置项"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="cfgItemName"
                        label="配置项名"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="cfgType"
                        label="配置类型"
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
            title="新增系统配置"
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
                            label="配置项"
                            prop="cfgItem"
                        >
                            <el-input v-model="addForm.cfgItem"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col
                        :span="11"
                        :offset="1"
                    >
                        <el-form-item
                            label="配置类型"
                            prop="cfgType"
                        >
                            <el-input v-model="addForm.cfgType"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item
                            label="配置项名"
                            prop="cfgItemName"
                        >
                            <el-input v-model="addForm.cfgItemName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col
                        :span="11"
                        :offset="1"
                    >
                        <el-form-item
                            label="配置选项"
                            prop="cfgOption"
                        >
                            <el-input v-model="addForm.cfgOption"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item
                            label="配置值"
                            prop="cfgValues"
                        >
                            <el-input v-model="addForm.cfgValues"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col
                        :span="11"
                        :offset="1"
                    >
                        <el-form-item
                            label="默认值"
                            prop="cfgDefault"
                        >
                            <el-input v-model="addForm.cfgDefault"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="22">
                        <el-form-item label="备注">
                            <el-input
                                type="textarea"
                                v-model="addForm.cfgRemark"
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
                    @click="add()"
                >保 存</el-button>
                <el-button @click="dialogVisible.add = false">取 消</el-button>
            </div>
        </el-dialog>
        <el-dialog
            title="编辑职务"
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
                            label="配置项"
                            prop="cfgItem"
                        >
                            <el-input v-model="updateForm.cfgItem"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col
                        :span="11"
                        :offset="1"
                    >
                        <el-form-item
                            label="配置类型"
                            prop="cfgType"
                        >
                            <el-input v-model="updateForm.cfgType"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item
                            label="配置项名"
                            prop="cfgItemName"
                        >
                            <el-input v-model="updateForm.cfgItemName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col
                        :span="11"
                        :offset="1"
                    >
                        <el-form-item
                            label="配置选项"
                            prop="cfgOption"
                        >
                            <el-input v-model="updateForm.cfgOption"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item
                            label="配置值"
                            prop="cfgValues"
                        >
                            <el-input v-model="updateForm.cfgValues"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col
                        :span="11"
                        :offset="1"
                    >
                        <el-form-item
                            label="默认值"
                            prop="cfgDefault"
                        >
                            <el-input v-model="updateForm.cfgDefault"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="22">
                        <el-form-item label="备注">
                            <el-input
                                type="textarea"
                                v-model="updateForm.cfgRemark"
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
    name: "system-configure",
    data() {
        return {
            selectForm: {
                user: ""
            },
            list: [],
            addForm: {
                cfgDefault: '',
                cfgItem: '',
                cfgItemName: '',
                cfgOption: '',
                cfgRemark: '',
                cfgType: '',
                cfgValues: '',
            },
            updateForm: {},
            rules: {
                cfgItem: [
                    {
                        required: true,
                        message: "请输入配置项",
                        trigger: "blur"
                    }
                ],
                cfgType: [
                    {
                        required: true,
                        message: "请输入配置类型",
                        trigger: "blur"
                    }
                ],
                cfgItemName: [
                    {
                        required: true,
                        message: "请输入配置项名",
                        trigger: "blur"
                    }
                ],
                cfgValues: [
                    {
                        required: true,
                        message: "请输入配置值",
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
            this.deleteList = []
            for (let i in val) {
                this.deleteList.push(val[i].id)
            }
        },
        //打开编辑窗口
        openUpdateDialog(form) {
            this.updateForm = form;
            this.dialogVisible.update = true
        },
        //打开新增窗口
        openAddDialog() {
            this.dialogVisible.add = true
            // this.$nextTick(() => {
            //     this.$refs['addForm'].resetFields();
            // })
        },
        //查询/获取List
        getList(pageIndex, rows, callback) {
            this.$systemApi.systemConfiguration.cfgList({
                pageNum: pageIndex,
                pageSize: rows,
                search: this.selectForm.search
            }).then((res) => {
                if (res.code == 1000) {
                    this.list = res.data.list
                    callback(this.list, res.data.total)
                } else {
                    this.$$alert({
                        message: res.msg,
                        type: 'error'
                    })
                }
            })
        },
        //删除操作
        del(id) {
            if (id.length == 0) {
                this.$$message({
                    message: '请选择批量删除对象',
                    type: 'warning'
                })
                return
            }
            this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    this.$systemApi.systemConfiguration.cfgDelete({
                        ids: id
                    })
                        .then(res => {
                            if (res.code == 1000) {
                                this.$$message({
                                    message: res.message,
                                    type: 'success'
                                })
                                this.$refs.page.getList(1);
                            } else {
                                this.$$message({
                                    message: res.message,
                                    type: 'error'
                                })
                            }
                        })
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
        },
        //新增操作
        add() {
            this.$refs.addForm.validate(valid => {
                if (valid) {
                    this.$systemApi.systemConfiguration.cfgCreate(this.addForm)
                        .then(res => {
                            if (res.code == 1000) {
                                this.dialogVisible.add = false
                                this.$$message({
                                    message: res.message,
                                    type: 'success'
                                })
                                this.$refs.page.getList(1);
                            } else {
                                this.$$message({
                                    message: res.message,
                                    type: 'error'
                                })
                            }
                        })
                }
            });
        },
        //修改操作
        update() {
            this.$refs.updateForm.validate(valid => {
                if (valid) {
                    this.$systemApi.systemConfiguration.cfgUpdate(this.updateForm)
                        .then(res => {
                            if (res.code == 1000) {
                                this.dialogVisible.update = false
                                this.$$message({
                                    message: res.message,
                                    type: 'success'
                                })
                                this.$refs.page.getList(1);
                            } else {
                                this.$$message({
                                    message: res.message,
                                    type: 'error'
                                })
                            }
                        })
                }
            });
        },
    },
    components: {
        ctrlPage
    }
};
</script>

<style>
</style>
