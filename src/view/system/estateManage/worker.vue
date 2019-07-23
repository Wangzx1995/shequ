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
                        prop="sex"
                        label="性别"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="certificateType"
                        label="证件类型"
                        align="center"
                    >
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
        <el-dialog
            title="新增员工"
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
                            label="员工姓名"
                            prop="userName"
                        >
                            <el-input v-model="addForm.userName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col
                        :span="11"
                        :offset="1"
                    >
                        <el-form-item
                            label="所属部门"
                            prop="deptCode"
                        >
                            <el-select
                                clearable
                                v-model="addForm.deptCode"
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
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item
                            label="性别"
                            prop="sex"
                        >
                            <el-radio-group v-model="addForm.sex">
                                <el-radio :label="1">男</el-radio>
                                <el-radio :label="2">女</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                    <el-col
                        :span="11"
                        :offset="1"
                    >
                        <el-form-item
                            label="职务"
                            prop="dutyCode"
                        >
                            <el-select
                                clearable
                                v-model="addForm.dutyCode"
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
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item
                            label="入职时间"
                            prop="entryTime"
                        >
                            <el-date-picker
                                v-model="addForm.entryTime"
                                type="date"
                                placeholder="选择日期"
                                value-format="yyyy/MM/dd"
                            >
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col
                        :span="11"
                        :offset="1"
                    >
                        <el-form-item
                            label="证件类型"
                            prop="certificateType"
                        >
                            <el-select
                                clearable
                                v-model="addForm.certificateType"
                                placeholder="请选择证件类型"
                            >
                                <el-option
                                    v-for="item in certificateList"
                                    :key="item.value"
                                    :label="item.dicName"
                                    :value="item.dicCode"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item
                            label="离职时间"
                            prop="resignationTime"
                        >
                            <el-date-picker
                                v-model="addForm.resignationTime"
                                type="date"
                                placeholder="选择日期"
                                value-format="yyyy/MM/dd"
                            >
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col
                        :span="11"
                        :offset="1"
                    >
                        <el-form-item
                            label="证件号码"
                            prop="certificateNum"
                        >
                            <el-input v-model="addForm.certificateNum"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item
                            label="联系方式"
                            prop="contactInfo"
                        >
                            <el-input v-model="addForm.contactInfo"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col
                        :span="11"
                        :offset="1"
                    >
                        <el-form-item
                            label="证件有效期"
                            prop="certificateTime"
                        >
                            <el-date-picker
                                v-model="addForm.certificateTime"
                                type="date"
                                placeholder="选择日期"
                                value-format="yyyy/MM/dd"
                            >
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item
                            label="证件照片"
                            prop="certificateImg"
                        >
                            <imgUpload
                                :imgSetting="upload"
                                :getImgUrl="getImgUrl1"
                                ref="imgUpload1"
                            />
                            <!-- :imgUrls="(addForm.certificateImg[0]&& addForm.certificateImg[0].split(',')) || []" -->

                            <imgUpload
                                :imgSetting="upload"
                                :getImgUrl="getImgUrl2"
                                ref="imgUpload2"
                            />
                        </el-form-item>
                    </el-col>
                    <el-col
                        :span="11"
                        :offset="1"
                    >
                        <el-form-item
                            label="采集照片"
                            prop="gatherImg"
                        >
                            <imgUpload
                                :imgSetting="upload"
                                :getImgUrl="getImgUrl3"
                                ref="imgUpload3"
                            />

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
            title="编辑员工"
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
                            label="员工姓名"
                            prop="userName"
                        >
                            <el-input v-model="updateForm.userName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col
                        :span="11"
                        :offset="1"
                    >
                        <el-form-item
                            label="所属部门"
                            prop="deptCode"
                        >
                            <el-select
                                clearable
                                v-model="updateForm.deptCode"
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
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item
                            label="性别"
                            prop="sex"
                        >
                            <el-radio-group v-model="updateForm.sex">
                                <el-radio :label="1">男</el-radio>
                                <el-radio :label="2">女</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                    <el-col
                        :span="11"
                        :offset="1"
                    >
                        <el-form-item
                            label="职务"
                            prop="dutyCode"
                        >
                            <el-select
                                clearable
                                v-model="updateForm.dutyCode"
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
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item
                            label="入职时间"
                            prop="entryTime"
                        >
                            <el-date-picker
                                v-model="updateForm.entryTime"
                                type="date"
                                placeholder="选择日期"
                                value-format="yyyy/MM/dd"
                            >
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col
                        :span="11"
                        :offset="1"
                    >
                        <el-form-item
                            label="证件类型"
                            prop="certificateType"
                        >
                            <el-select
                                clearable
                                v-model="updateForm.certificateType"
                                placeholder="请选择证件类型"
                            >
                                <el-option
                                    v-for="item in certificateList"
                                    :key="item.value"
                                    :label="item.dicName"
                                    :value="item.dicCode"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item
                            label="离职时间"
                            prop="resignationTime"
                        >
                            <el-date-picker
                                v-model="updateForm.resignationTime"
                                type="date"
                                placeholder="选择日期"
                                value-format="yyyy/MM/dd"
                            >
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col
                        :span="11"
                        :offset="1"
                    >
                        <el-form-item
                            label="证件号码"
                            prop="certificateNum"
                        >
                            <el-input v-model="updateForm.certificateNum"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item
                            label="联系方式"
                            prop="contactInfo"
                        >
                            <el-input v-model="updateForm.contactInfo"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col
                        :span="11"
                        :offset="1"
                    >
                        <el-form-item
                            label="证件有效期"
                            prop="certificateTime"
                        >
                            <el-date-picker
                                v-model="updateForm.certificateTime"
                                type="date"
                                placeholder="选择日期"
                                value-format="yyyy/MM/dd"
                            >
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item
                            label="证件照片"
                            prop="certificateImg"
                        >
                            <imgUpload
                                :imgSetting="upload"
                                :getImgUrl="getImgUrl1"
                                ref="imgUpload1"
                                :imgUrls="(updateForm.certificateImg&&[updateForm.certificateImg.split(',')[0]])||[]"
                            />
                            <!-- :imgUrls="(form.imgUrl && form.imgUrl.split(',')) || []" -->

                            <imgUpload
                                :imgSetting="upload"
                                :getImgUrl="getImgUrl2"
                                ref="imgUpload2"
                                :imgUrls="(updateForm.certificateImg&&[updateForm.certificateImg.split(',')[1]])||[]"
                            />
                        </el-form-item>
                    </el-col>
                    <el-col
                        :span="11"
                        :offset="1"
                    >
                        <el-form-item
                            label="采集照片"
                            prop="gatherImg"
                        >
                            <imgUpload
                                :imgSetting="upload"
                                :getImgUrl="getImgUrl3"
                                ref="imgUpload3"
                            />

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
import imgUpload from "@/components/common/upload/imgUpload.vue";
import { getItemName } from "@/filters/index.js";

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
            addForm: {
                certificateImg: [],
                certificateNum: '',
                certificateTime: '',
                certificateType: '',
                contactInfo: '',
                deptCode: '',
                deptName: '',
                dutyCode: '',
                dutyName: '',
                entryTime: '',
                gatherImg: [],
                resignationTime: '',
                sex: 0,
                userName: ''
            },
            cardImg: [],
            updateForm: {},
            rules: {
                userName: [
                    {
                        required: true,
                        message: "请输入员工姓名",
                        trigger: "blur"
                    }
                ],
                deptCode: [
                    {
                        required: true,
                        message: "请选择所属部门",
                        trigger: "change"
                    }
                ],
                sex: [
                    {
                        required: true,
                        message: "请选择性别",
                        trigger: "change"
                    }
                ],
                dutyCode: [
                    {
                        required: true,
                        message: "请选择职务",
                        trigger: "change"
                    }
                ],
                entryTime: [
                    {
                        required: true,
                        message: "请选择入职时间",
                        trigger: "change"
                    }
                ],
                certificateType: [
                    {
                        required: true,
                        message: "请选择证件类型",
                        trigger: "change"
                    }
                ],
                certificateNum: [
                    {
                        required: true,
                        message: "请输入证件号码",
                        trigger: "blur"
                    }
                ],
                contactInfo: [
                    {
                        required: true,
                        message: "请输入联系方式",
                        trigger: "blur"
                    }
                ],
                certificateImg: [
                    {
                        required: true,
                        message: '请上传图片',
                        trigger: "change"
                    }
                ]
            },
            dialogVisible: {
                add: false,
                update: false
            },
            deleteList: [],
            upload: {
                limit: 1,
                isShow: true
            }
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
        //新增操作
        add() {
            this.$refs.addForm.validate(valid => {
                if (valid) {
                    this.addForm.deptName = this.getItemName(this.addForm.deptCode, this.deptList, 'deptCode', 'deptName')
                    this.addForm.dutyName = this.getItemName(this.addForm.dutyCode, this.dutyList, 'dutyCode', 'dutyName')
                    this.addForm.certificateImg = this.addForm.certificateImg.join(',')
                    this.addForm.gatherImg = this.addForm.gatherImg.join(',')
                    this.$systemApi.estateManage.staffCreate(this.addForm)
                        .then(res => {
                            if (res.code == 1000) {
                                this.dialogVisible.add = false
                                this.$$message({
                                    message: res.message,
                                    type: 'success'
                                })
                                this.$refs.page.getList(1);
                                this.$refs.imgUpload1.clearFileList();
                                this.$refs.imgUpload2.clearFileList();
                                this.$refs.imgUpload3.clearFileList();
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
            })
        },
        //修改职务
        update() {
            this.$refs.updateForm.validate(valid => {
                if (valid) {
                    this.updateForm.deptName = this.getItemName(this.updateForm.deptCode, this.deptList, 'deptCode', 'deptName')
                    this.updateForm.dutyName = this.getItemName(this.updateForm.dutyCode, this.dutyList, 'dutyCode', 'dutyName')
                    this.$systemApi.estateManage.staffUpdate(this.updateForm)
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
        //获取图片
        getImgUrl1(data) {
            this.addForm.certificateImg[0] = data
        },
        getImgUrl2(data) {
            this.addForm.certificateImg[1] = data
        },
        getImgUrl3(data) {
            this.addForm.gatherImg[0] = data
        },

    },
    components: {
        ctrlPage,
        imgUpload
    }
};
</script>

<style>
</style>
