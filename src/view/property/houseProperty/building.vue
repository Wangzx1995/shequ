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
                        v-model="selectForm.areaId"
                        placeholder="请选择片区"
                    >
                        <el-option
                            v-for="item in areaList"
                            :key="item.value"
                            :label="item.areaName"
                            :value="item.areaId"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="产权性质">
                    <el-select
                        clearable
                        v-model="selectForm.nature"
                        placeholder="请选择产权性质"
                    >
                        <el-option
                            v-for="item in natureList"
                            :key="item.value"
                            :label="item.dicName"
                            :value="item.dicCode"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="有无电梯">
                    <el-select
                        clearable
                        v-model="selectForm.elevator"
                        placeholder="请选择片区"
                    >
                        <el-option
                            label="有"
                            value="1"
                        ></el-option>
                        <el-option
                            label="无"
                            value="2"
                        ></el-option>
                    </el-select>
                </el-form-item>
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
                            size="mini"
                            type="warning"
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
                            @click="del(deleteList)"
                        >批量删除</el-button>
                    </template>
                </div>
                <span class="com-page-header-title">楼栋管理列表</span>
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
                        prop="code"
                        label="楼栋编号"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="楼栋名称"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="areaName"
                        label="所属片区"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        label="有无电梯"
                        align="center"
                    >
                        <template slot-scope="scope">
                            <span v-if="scope.row.elevator==1">有</span>
                            <span v-if="scope.row.elevator==2">无</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="buildingAge"
                        label="建筑年代"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        label="产权性质"
                        align="center"
                    >
                        <template slot-scope="scope">
                            <span>{{getItemName(scope.row.nature,natureList, 'dicCode', 'dicName')}}</span>
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
                                @click="openDetailDialog(scope.row)"
                            >查看</el-button>
                            <span class="com-page-header-title line"></span>
                            <el-button
                                type="primary"
                                @click="openUpdateDialog(scope.row)"
                            >编辑</el-button>
                            <span class="com-page-header-title line"></span>
                            <el-button
                                type="danger"
                                @click="del(scope.row.id)"
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
            title="新增楼栋"
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
                            label="楼栋编号"
                            prop="code"
                        >
                            <el-input v-model="addForm.code"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col
                        :span="11"
                        :offset="1"
                    >
                        <el-form-item
                            label="有无电梯"
                            prop="elevator"
                        >
                            <el-select
                                clearable
                                v-model="addForm.elevator"
                                placeholder="请选择有无电梯"
                            >
                                <el-option
                                    label="有"
                                    value="1"
                                ></el-option>
                                <el-option
                                    label="无"
                                    value="2"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item
                            label="楼栋名称"
                            prop="name"
                        >
                            <el-input v-model="addForm.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col
                        :span="11"
                        :offset="1"
                    >
                        <el-form-item
                            label="建筑年代"
                            prop="buildingAge"
                        >
                            <el-input v-model="addForm.buildingAge"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item
                            label="所属片区"
                            prop="areaId"
                        >
                            <el-select
                                clearable
                                v-model="addForm.areaId"
                                placeholder="请选择所属片区"
                            >
                                <el-option
                                    v-for="item in areaList"
                                    :key="item.value"
                                    :label="item.areaName"
                                    :value="item.areaId"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col
                        :span="11"
                        :offset="1"
                    >
                        <el-form-item
                            label="产权性质"
                            prop="nature"
                        >
                            <el-select
                                clearable
                                v-model="addForm.nature"
                                placeholder="请选择产权性质"
                            >
                                <el-option
                                    v-for="item in natureList"
                                    :key="item.value"
                                    :label="item.dicName"
                                    :value="item.dicCode"
                                ></el-option>
                            </el-select>
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
            title="编辑楼栋"
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
                            label="楼栋编号"
                            prop="code"
                        >
                            <el-input
                                v-model="updateForm.code"
                                disabled=""
                            ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col
                        :span="11"
                        :offset="1"
                    >
                        <el-form-item
                            label="有无电梯"
                            prop="elevator"
                        >
                            <el-select
                                clearable
                                v-model="updateForm.elevator"
                                placeholder="请选择有无电梯"
                            >
                                <el-option
                                    label="有"
                                    value="1"
                                ></el-option>
                                <el-option
                                    label="无"
                                    value="2"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item
                            label="楼栋名称"
                            prop="name"
                        >
                            <el-input v-model="updateForm.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col
                        :span="11"
                        :offset="1"
                    >
                        <el-form-item
                            label="建筑年代"
                            prop="buildingAge"
                        >
                            <el-input v-model="updateForm.buildingAge"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item
                            label="所属片区"
                            prop="areaId"
                        >
                            <el-select
                                clearable
                                v-model="updateForm.areaId"
                                placeholder="请选择所属片区"
                            >
                                <el-option
                                    v-for="item in areaList"
                                    :key="item.value"
                                    :label="item.areaName"
                                    :value="item.areaId"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col
                        :span="11"
                        :offset="1"
                    >
                        <el-form-item
                            label="产权性质"
                            prop="nature"
                        >
                            <el-select
                                clearable
                                v-model="updateForm.nature"
                                placeholder="请选择产权性质"
                            >
                                <el-option
                                    v-for="item in natureList"
                                    :key="item.value"
                                    :label="item.dicName"
                                    :value="item.dicCode"
                                ></el-option>
                            </el-select>
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
        <el-dialog
            title="查看详情"
            :visible.sync="dialogVisible.detail"
            width="800px"
            :modal-append-to-body='false'
            center
            class="updateDialog"
        >
            <el-row>
                <el-col :span="3">
                    <span>楼栋编号</span>
                </el-col>
                <el-col :span="8">
                    <span>{{detailForm.code}}</span>
                </el-col>
                <el-col
                    :span="3"
                    :offset="1"
                >
                    <span>有无电梯</span>
                </el-col>
                <el-col :span="8">
                    <span v-if="detailForm.elevator==1">有</span>
                    <span v-if="detailForm.elevator==2">无</span>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="3">
                    <span>楼栋名称</span>
                </el-col>
                <el-col :span="8">
                    <span>{{detailForm.name}}</span>
                </el-col>
                <el-col
                    :span="3"
                    :offset="1"
                >
                    <span>建筑年代</span>
                </el-col>
                <el-col :span="8">
                    <span>{{detailForm.buildingAge}}</span>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="3">
                    <span>所属片区</span>
                </el-col>
                <el-col :span="8">
                    <span>{{detailForm.areaId}}</span>
                </el-col>
                <el-col
                    :span="3"
                    :offset="1"
                >
                    <span>产权性质</span>
                </el-col>
                <el-col :span="8">
                    <span>{{getItemName(detailForm.nature,natureList, 'dicCode', 'dicName')}}</span>
                </el-col>
            </el-row>
        </el-dialog>
    </div>
</template>

<script>
import ctrlPage from "@/components/common/other/CtrlPage";
import { getItemName } from "@/filters/index.js";

export default {
    name: "property-houseProperty-building",
    data() {
        return {
            selectForm: {
                areaId: "",
                nature: "",
                elevator: "",
                search: "",
            },
            list: [],
            areaList: [],
            natureList: [],
            addForm: {
                areaId: null,
                buildingAge: null,
                code: '',
                elevator: null,
                name: '',
                nature: ''
            },
            updateForm: {},
            detailForm: {},
            rules: {
                code: [
                    {
                        required: true,
                        message: "请输入楼栋编号",
                        trigger: "blur"
                    }
                ],
                name: [
                    {
                        required: true,
                        message: "请输入楼栋名称",
                        trigger: "blur"
                    }
                ]
            },
            dialogVisible: {
                add: false,
                update: false,
                detail: false
            },
            deleteList: []
        };
    },
    mounted() {
        this.getSearchList()
        this.getNatureList()
        this.$refs.page.getList(1);
    },
    methods: {
        getItemName,
        //多选框
        handleSelectionChange(val) {
            this.deleteList = []
            for (let i in val) {
                this.deleteList.push(val[i].id)
            }
        },
        //打开新增窗口
        openAddDialog() {
            this.dialogVisible.add = true
            this.$nextTick(() => {
                this.$refs['addForm'].resetFields();
            })
        },
        //打开编辑窗口
        openUpdateDialog(form) {
            this.updateForm = form;
            this.dialogVisible.update = true
        },
        //打开查看窗口
        openDetailDialog(form) {
            this.detailForm = form;
            this.dialogVisible.detail = true
        },
        //获取片区列表
        getSearchList() {
            this.$propertyApi.personManagement.household.cascade().then((res) => {
                if (res.code == 1000) {
                    this.areaList = res.data
                }
            })
        },
        //获取产权性质
        getNatureList() {
            this.$systemApi.dataDictionary.typeToDic({
                typeCode: 1004
            }).then((res) => {
                if (res.code == 1000) {
                    this.natureList = res.data
                }
            })
        },
        //查询/获取List
        getList(pageIndex, rows, callback) {
            this.$propertyApi.houseProperty.building.list({
                pageNum: pageIndex,
                pageSize: rows,
                areaId: this.selectForm.areaId,
                nature: this.selectForm.nature,
                elevator: this.selectForm.elevator,
                search: this.selectForm.search,
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
        //新增操作
        add() {
            this.$refs.addForm.validate(valid => {
                if (valid) {
                    this.$propertyApi.houseProperty.building.add(this.addForm)
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
                    if (Array.isArray(id)) {
                        this.$propertyApi.houseProperty.building.deleteList({
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
                    } else {
                        this.$propertyApi.houseProperty.building.delete({
                            id: id
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
                    }
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
        },
        //修改操作
        update() {
            this.$refs.updateForm.validate(valid => {
                if (valid) {
                    this.$propertyApi.houseProperty.building.update(this.updateForm)
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
