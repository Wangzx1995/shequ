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
                <span class="com-page-header-title">数据字典列表</span>
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
                        prop="typeCode"
                        label="类型编码"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="typeName"
                        label="类型名称"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        label="状态"
                        align="center"
                    >
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ dicValid[scope.row.valid-1] }}</span>
                        </template>
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
                                @click="del([scope.row.dataDictionary.id])"
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
            title="新增数据字典"
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
                            label="类型编码"
                            prop="dataDictionary.typeCode"
                        >
                            <el-input v-model="addForm.dataDictionary.typeCode"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col
                        :span="11"
                        :offset="1"
                    >
                        <el-form-item
                            label="类型名称"
                            prop="dataDictionary.typeName"
                        >
                            <el-input v-model="addForm.dataDictionary.typeName"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-table
                    :data="addForm.dicTypes"
                    border
                    style="margin-bottom:20px"
                >
                    <el-table-column
                        type="index"
                        label="序号"
                        width="80"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        property="dicName"
                        label="字典名称"
                        align="center"
                    >
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.dicName"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                        property="dicCode"
                        label="字典编码"
                        align="center"
                    >
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.dicCode"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="排序"
                        width="100"
                        align="center"
                    >
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.sort"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        width="100"
                        align="center"
                    >
                        <template slot-scope="scope">
                            <el-button
                                type="danger"
                                icon="icon-x-shanchu"
                                @click="delDicTypes(scope.$index)"
                            ></el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-row>
                    <el-col :span="5">
                        <el-input
                            v-model="newDicType.dicName"
                            placeholder="请输入字典名称"
                        ></el-input>
                    </el-col>
                    <el-col
                        :span="5"
                        :offset="1"
                    >
                        <el-input
                            v-model="newDicType.dicCode"
                            placeholder="请输入字典编码"
                        ></el-input>
                    </el-col>
                    <el-col
                        :span="5"
                        :offset="1"
                    >
                        <el-button
                            type="primary"
                            size="mini"
                            @click="addNewDic()"
                        >添加</el-button>
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
            title="编辑数据字典"
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
                            label="类型编码"
                            prop="dataDictionary.typeCode"
                        >
                            <el-input v-model="updateForm.dataDictionary.typeCode"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col
                        :span="11"
                        :offset="1"
                    >
                        <el-form-item
                            label="类型名称"
                            prop="dataDictionary.typeName"
                        >
                            <el-input v-model="updateForm.dataDictionary.typeName"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-table
                    :data="updateForm.dicTypes"
                    border
                    style="margin-bottom:20px"
                >
                    <el-table-column
                        type="index"
                        label="序号"
                        width="80"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        property="dicName"
                        label="字典名称"
                        align="center"
                    >
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.dicName"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                        property="dicCode"
                        label="字典编码"
                        align="center"
                    >
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.dicCode"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="排序"
                        width="100"
                        align="center"
                    >
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.sort"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        width="100"
                        align="center"
                    >
                        <template slot-scope="scope">
                            <el-button
                                type="danger"
                                icon="icon-x-shanchu"
                                @click="delDicTypes(scope.$index)"
                            ></el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-row>
                    <el-col :span="5">
                        <el-input
                            v-model="newDicType.dicName"
                            placeholder="请输入字典名称"
                        ></el-input>
                    </el-col>
                    <el-col
                        :span="5"
                        :offset="1"
                    >
                        <el-input
                            v-model="newDicType.dicCode"
                            placeholder="请输入字典编码"
                        ></el-input>
                    </el-col>
                    <el-col
                        :span="5"
                        :offset="1"
                    >
                        <el-button
                            type="primary"
                            size="mini"
                            @click="addNewDic()"
                        >添加</el-button>
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
                <el-button @click="cancel()">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import ctrlPage from "@/components/common/other/CtrlPage";

export default {
    name: "system-dataDictionary",
    data() {
        return {
            selectForm: {
                search: ""
            },
            list: [],
            addForm: {
                dataDictionary: {
                    typeCode: '',
                    typeName: '',
                },
                dicTypes: []
            },
            updateForm: {
                dataDictionary: {
                    typeCode: '',
                    typeName: '',
                },
                dicTypes: []
            },
            rules: {
                'dataDictionary.typeCode': [
                    {
                        required: true,
                        message: "请输入类型编码",
                        trigger: "blur"
                    }
                ],
                'dataDictionary.typeName': [
                    {
                        required: true,
                        message: "请输入类型名称",
                        trigger: "blur"
                    }
                ]
            },
            dialogVisible: {
                add: false,
                update: false
            },
            deleteList: [],
            newDicType: {
                dicCode: '',
                dicName: '',
                sort: '',
            },
            dicNum: 0,
            dicValid: ['有效', '无效']
        };
    },
    mounted() {
        this.$refs.page.getList(1);
    },
    methods: {
        //取消编辑
        cancel() {
            this.dialogVisible.update = false;
            this.$refs.page.getList(1);
        },
        //删除字典
        delDicTypes(index) {
            if (this.dialogVisible.add) {
                this.addForm.dicTypes.splice(index, 1)
            }
            else if (this.dialogVisible.update) {
                this.updateForm.dicTypes.splice(index, 1)
            }
        },
        //多选框
        handleSelectionChange(val) {
            this.deleteList = []
            for (let i in val) {
                this.deleteList.push(val[i].dataDictionary.id)
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
            this.$nextTick(() => {
                this.$refs['addForm'].resetFields();
                this.addForm.dicTypes = []
                this.newDicType = {}
            })
        },
        //查询/获取List
        getList(pageIndex, rows, callback) {
            this.$systemApi.dataDictionary.dicSearch({
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
                    this.$systemApi.dataDictionary.dicDelete({
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
                    for (let i in this.addForm.dicTypes) {
                        this.addForm.dicTypes[i].typeCode = this.addForm.dataDictionary.typeCode
                    }
                    this.$systemApi.dataDictionary.dicCreate(this.addForm)
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
        //添加字典
        addNewDic() {
            if (this.dialogVisible.add) {
                this.dicNum = this.addForm.dicTypes.length + 1;
                this.newDicType.sort = this.dicNum
                this.addForm.dicTypes.push(this.newDicType)
            }
            else if (this.dialogVisible.update) {
                this.dicNum = this.updateForm.dicTypes.length + 1;
                this.newDicType.sort = this.dicNum
                this.updateForm.dicTypes.push(this.newDicType)
            }
            this.newDicType = {}
        },
        //修改操作
        update() {
            this.$refs.updateForm.validate(valid => {
                if (valid) {
                    for (let i in this.updateForm.dicTypes) {
                        this.updateForm.dicTypes[i].typeCode = this.updateForm.dataDictionary.typeCode
                    }
                    this.$systemApi.dataDictionary.dicUpdate(this.updateForm)
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
