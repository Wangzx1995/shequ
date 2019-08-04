<template>
    <div class="system">
        <div class="com-main-inner selectBox">
            <el-form
                :inline="true"
                :model="selectForm"
                class="demo-form-inline"
                label-position="left"
            >
                <el-form-item label="所属部门">
                    <el-select
                        clearable
                        v-model="selectForm.deptCode"
                        placeholder="请选择所属部门"
                    >
                        <el-option
                            v-for="item in deptList"
                            :key="item.value"
                            :label="item.deptName"
                            :value="item.deptCode"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="职务">
                    <el-select
                        clearable
                        v-model="selectForm.dutyCode"
                        placeholder="请选择职务"
                    >
                        <el-option
                            v-for="item in dutyList"
                            :key="item.value"
                            :label="item.dutyName"
                            :value="item.dutyCode"
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
                            type="primary"
                            plain
                            size="mini"
                        >同步海康</el-button>
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
                            @click="del(deleteList)"
                        >批量删除</el-button>
                    </template>
                </div>
                <span class="com-page-header-title">职务列表</span>
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
                        prop="userName"
                        label="员工姓名"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        label="性别"
                        align="center"
                    >
                        <template slot-scope="scope">
                            <span v-if="scope.row.sex==1">男</span>
                            <span v-if="scope.row.sex==2">女</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="certificateType"
                        label="证件类型"
                        align="center"
                    >
                        <template slot-scope="scope">
                            <span>{{getItemName(scope.row.certificateType,certificateList, 'dicCode', 'dicName')}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="certificateNum"
                        label="证件号码"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="contactInfo"
                        label="联系方式"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="entryTime"
                        label="入职时间"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="resignationTime"
                        label="离职时间"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="deptName"
                        label="所属部门"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="dutyName"
                        label="职务"
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
        <addDialog
            :deptList="deptList"
            :dutyList="dutyList"
            :certificateList="certificateList"
            ref="addDialog"
        />
        <updateDialog
            :updateForm="updateForm"
            :deptList="deptList"
            :dutyList="dutyList"
            :certificateList="certificateList"
            ref="updateDialog"
        />
    </div>
</template>

<script>
import ctrlPage from "@/components/common/other/CtrlPage";
import imgUpload from "@/components/common/upload/imgUpload.vue";
import { getItemName } from "@/filters/index.js";
import addDialog from "@/components/system/estateManage/worker/addDialog";
import updateDialog from "@/components/system/estateManage/worker/updateDialog";
import DictionaryText from '@/components/common/select/DictionaryText'

export default {
    name: "system-worker",
    data() {
        return {
            selectForm: {
                search: "",
                deptCode: "",
                dutyCode: "",
            },
            deptList: [],
            dutyList: [],
            certificateList: [],
            list: [],
            updateForm: {},
            deleteList: [],
        };
    },
    mounted() {
        this.getDeptList()
        this.getDutyList()
        this.getCertificateList()
        this.$refs.page.getList(1);
    },
    methods: {
        getItemName,
        //获取部门列表
        getDeptList() {
            this.$systemApi.estateManage.deptSelect({
                pageNum: 1,
                pageSize: 999999,
                search: ''
            })
                .then(res => {
                    if (res.code == 1000) {
                        this.deptList = res.data.list
                    } else {
                        this.$$message({
                            message: res.message,
                            type: 'error'
                        })
                    }
                })
        },
        //获取职务列表
        getDutyList() {
            this.$systemApi.estateManage.dutySelect({
                pageNum: 1,
                pageSize: 999999,
                search: ''
            })
                .then(res => {
                    if (res.code == 1000) {
                        this.dutyList = res.data.list
                    } else {
                        this.$$message({
                            message: res.message,
                            type: 'error'
                        })
                    }
                })
        },
        //获取证件类型列表
        getCertificateList() {
            this.$systemApi.dataDictionary.typeToDic({
                typeCode: 1003
            })
                .then(res => {
                    if (res.code == 1000) {
                        this.certificateList = res.data
                    } else {
                        this.$$message({
                            message: res.message,
                            type: 'error'
                        })
                    }
                })
        },
        //多选框
        handleSelectionChange(val) {
            this.deleteList = []
            for (let i in val) {
                this.deleteList.push(val[i].id)
            }
        },
        //查询/获取List
        getList(pageIndex, rows, callback) {
            this.$systemApi.estateManage.staffSelect({
                pageNum: pageIndex,
                pageSize: rows,
                search: this.selectForm.search,
                deptCode: this.selectForm.deptCode,
                dutyCode: this.selectForm.dutyCode,
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
                    this.$systemApi.estateManage.staffDelete({
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
        //打开编辑窗口
        openUpdateDialog(form) {
            this.updateForm = form;
            this.$refs.updateDialog.showDialog()
        },
        //打开新增窗口
        openAddDialog() {
            this.$refs.addDialog.showDialog();
        },
    },
    components: {
        ctrlPage,
        imgUpload,
        addDialog,
        updateDialog,
        DictionaryText,
    }
};
</script>

<style>
</style>
