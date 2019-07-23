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
                <el-form-item label="所属楼栋">
                    <el-select
                        clearable
                        v-model="selectForm.buildingId"
                        placeholder="请选择楼栋"
                    >
                        <el-option
                            v-for="item in buildingList"
                            :key="item.value"
                            :label="item.buildingName"
                            :value="item.buildingId"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="所属单元">
                    <el-select
                        clearable
                        v-model="selectForm.elementId"
                        placeholder="请选择单元"
                    >
                        <el-option
                            v-for="item in elementList"
                            :key="item.value"
                            :label="item.elementName"
                            :value="item.elementId"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="所属房屋">
                    <el-select
                        clearable
                        v-model="selectForm.roomId"
                        placeholder="请选择房屋"
                    >
                        <el-option
                            v-for="item in roomList"
                            :key="item.value"
                            :label="item.roomValue"
                            :value="item.roomId"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="身份类型">
                    <el-select
                        clearable
                        v-model="selectForm.identityType"
                        placeholder="请选择身份类型"
                    >
                        <el-option
                            v-for="item in identityTypeList"
                            :key="item.value"
                            :label="item.identityTypeValue"
                            :value="item.identityTypeId"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="关键词">
                    <el-input
                        v-model="selectForm.user"
                        placeholder="关键词"
                    ></el-input>
                </el-form-item>
                <el-form-item label="合同日期">
                    <el-date-picker
                        v-model="selectForm.timeValue"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="合同开始日"
                        end-placeholder="合同结束日"
                        value-format="yyyy/MM/dd"
                    >
                    </el-date-picker>
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
                            v-if="selectForm.type=='1'"
                            @click="openAddDialog()"
                        >新增</el-button>
                        <el-button
                            size="mini"
                            type="warning"
                            plain
                        >导入</el-button>
                        <el-button
                            type="danger"
                            plain
                            size="mini"
                            v-if="selectForm.type=='2'"
                            @click="del(deleteList)"
                        >批量删除</el-button>
                    </template>
                </div>
                <span class="com-page-header-title">住户管理列表
                    <el-radio-group v-model="selectForm.type">
                        <el-radio-button label="1">待审批</el-radio-button>
                        <el-radio-button label="2">已审批</el-radio-button>
                    </el-radio-group>
                </span>
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
                        prop="userName"
                        label="姓名"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="sex"
                        label="性别"
                        align="center"
                    >
                        <template slot-scope="scope">
                            <span v-if="scope.row.sex==1">男</span>
                            <span v-if="scope.row.sex==2">女</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="phone"
                        label="手机号"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="identityType"
                        label="身份类型"
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
                        prop="buildingName"
                        label="所属楼栋"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="elementName"
                        label="所属单元"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="roomId"
                        label="所属房屋"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="checkIn"
                        label="入住时间"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="starttime"
                        label="合同开始日"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="endtime"
                        label="合同结束日"
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
                            >审批</el-button>
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
            title="新增住户"
            :visible.sync="dialogVisible.add"
            width="800px"
            :modal-append-to-body='false'
            center
            class="addZhuHu"
        >
            <div>
                <el-tabs
                    v-model="activeName"
                    @tab-click="handleClick"
                >
                    <el-tab-pane
                        label="住户信息"
                        name="first"
                    >
                        <div>
                            <el-form
                                :model="addForm"
                                :rules="rules"
                                ref="addForm"
                                label-width="110px"
                                class="demo-ruleForm dialog-form"
                                label-position="left"
                            >
                                <el-row>
                                    <el-col :span="11">
                                        <el-form-item
                                            label="姓名"
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
                                            label="证件类型"
                                            prop="documentType"
                                        >
                                            <el-select
                                                clearable
                                                v-model="addForm.documentType"
                                                placeholder="请选择证件类型"
                                            >
                                                <el-option
                                                    label="1"
                                                    value="1"
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
                                            label="证件号码"
                                            prop="documentNumber"
                                        >
                                            <el-input v-model="addForm.documentNumber"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="11">
                                        <el-form-item
                                            label="民族"
                                            prop="nation"
                                        >
                                            <el-select
                                                clearable
                                                v-model="addForm.nation"
                                                placeholder="请选择证件类型"
                                            >
                                                <el-option
                                                    label="1"
                                                    value="1"
                                                ></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                    <el-col
                                        :span="11"
                                        :offset="1"
                                    >
                                        <el-form-item
                                            label="入住时间"
                                            prop="checkIn"
                                        >
                                            <el-date-picker
                                                v-model="addForm.checkIn"
                                                type="date"
                                                value-format="yyyy/MM/dd"
                                                placeholder="选择日期"
                                            >
                                            </el-date-picker>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="11">
                                        <el-form-item
                                            label="手机号"
                                            prop="phone"
                                        >
                                            <el-input v-model="addForm.phone"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col
                                        :span="11"
                                        :offset="1"
                                    >
                                        <el-form-item
                                            label="特殊人群"
                                            prop="spcialCrowd"
                                        >
                                            <el-select
                                                clearable
                                                v-model="addForm.spcialCrowd"
                                                placeholder="请选择特殊人群"
                                            >
                                                <el-option
                                                    label="1"
                                                    value="1"
                                                ></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="11">
                                        <el-form-item
                                            label="婚姻状况"
                                            prop="marriage"
                                        >
                                            <el-input v-model="addForm.marriage"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col
                                        :span="11"
                                        :offset="1"
                                    >
                                        <el-form-item
                                            label="学历"
                                            prop="education"
                                        >
                                            <el-select
                                                clearable
                                                v-model="addForm.education"
                                                placeholder="请选择学历"
                                            >
                                                <el-option
                                                    label="1"
                                                    value="1"
                                                ></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="11">
                                        <el-form-item
                                            label="国籍"
                                            prop="nationality"
                                        >
                                            <el-select
                                                clearable
                                                v-model="addForm.nationality"
                                                placeholder="请选择国籍"
                                            >
                                                <el-option
                                                    label="1"
                                                    value="1"
                                                ></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                    <el-col
                                        :span="11"
                                        :offset="1"
                                    >
                                        <el-form-item
                                            label="政治面貌"
                                            prop="politicsStatus"
                                        >
                                            <el-select
                                                clearable
                                                v-model="addForm.politicsStatus"
                                                placeholder="请选择政治面貌"
                                            >
                                                <el-option
                                                    label="1"
                                                    value="1"
                                                ></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="11">
                                        <el-form-item
                                            label="籍贯"
                                            prop="nativePlace"
                                        >
                                            <el-input v-model="addForm.nativePlace"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col
                                        :span="11"
                                        :offset="1"
                                    >
                                        <el-form-item
                                            label="户籍地址"
                                            prop="domicileAddress"
                                        >
                                            <el-input v-model="addForm.domicileAddress"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="11">
                                        <el-form-item
                                            label="从事职业"
                                            prop="profession"
                                        >
                                            <el-input v-model="addForm.profession"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col
                                        :span="11"
                                        :offset="1"
                                    >
                                        <el-form-item
                                            label="工作单位"
                                            prop="workUnit"
                                        >
                                            <el-input v-model="addForm.workUnit"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="11">
                                        <el-form-item
                                            label="身份类型"
                                            prop="identityType"
                                        >
                                            <el-select
                                                clearable
                                                v-model="addForm.identityType"
                                                placeholder="请选择身份类型"
                                            >
                                                <el-option
                                                    label="1"
                                                    value="1"
                                                ></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                    <el-col
                                        :span="11"
                                        :offset="1"
                                    >
                                        <el-form-item
                                            label="是否业主入住"
                                            prop="ifOwner"
                                        >
                                            <el-radio-group v-model="addForm.ifOwner">
                                                <el-radio :label="1">是</el-radio>
                                                <el-radio :label="2">否</el-radio>
                                            </el-radio-group>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="11">

                                        <el-form-item
                                            label="租房合同"
                                            prop="accessoryContract"
                                        >
                                            <imgUpload
                                                :imgSetting="upload"
                                                :getImgUrl="getImgUrl4"
                                                ref="imgUpload4"
                                            />
                                        </el-form-item>
                                    </el-col>
                                    <el-col
                                        :span="11"
                                        :offset="1"
                                    >
                                        <el-row>
                                            <el-col :span="24">
                                                <el-form-item label="合同开始日">
                                                    <el-date-picker
                                                        v-model="addForm.starttime"
                                                        type="date"
                                                        placeholder="选择日期"
                                                    >
                                                    </el-date-picker>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                        <el-row>
                                            <el-col :span="24">
                                                <el-form-item label="合同结束日">
                                                    <el-date-picker
                                                        v-model="addForm.endtime"
                                                        type="date"
                                                        placeholder="选择日期"
                                                    >
                                                    </el-date-picker>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="11">
                                        <el-form-item
                                            label="证件照片"
                                            prop="accessoryCard"
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
                                            prop="accessoryPicture"
                                        >
                                            <imgUpload
                                                :imgSetting="upload"
                                                :getImgUrl="getImgUrl3"
                                                ref="imgUpload3"
                                            />
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="11">
                                        <el-form-item
                                            label="业主姓名"
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
                                            label="所属片区"
                                            prop="areaId"
                                        >
                                            <el-select
                                                clearable
                                                v-model="addForm.areaId"
                                                placeholder="请选择所属片区"
                                            >
                                                <el-option
                                                    label="1"
                                                    value="1"
                                                ></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>

                                </el-row>
                                <el-row>
                                    <el-col :span="11">
                                        <el-form-item
                                            label="所属楼栋"
                                            prop="buildingId"
                                        >
                                            <el-select
                                                clearable
                                                v-model="addForm.buildingId"
                                                placeholder="请选择所属楼栋"
                                            >
                                                <el-option
                                                    label="1"
                                                    value="1"
                                                ></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                    <el-col
                                        :span="11"
                                        :offset="1"
                                    >
                                        <el-form-item
                                            label="所属单元"
                                            prop="elementId"
                                        >
                                            <el-select
                                                clearable
                                                v-model="addForm.elementId"
                                                placeholder="请选择所属单元"
                                            >
                                                <el-option
                                                    label="1"
                                                    value="1"
                                                ></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>

                                </el-row>
                                <el-row>
                                    <el-col :span="11">
                                        <el-form-item
                                            label="所属房屋"
                                            prop="roomId"
                                        >
                                            <el-select
                                                clearable
                                                v-model="addForm.roomId"
                                                placeholder="请选择所属房屋"
                                            >
                                                <el-option
                                                    label="1"
                                                    value="1"
                                                ></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>

                                </el-row>
                            </el-form>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane
                        label="app权限"
                        name="second"
                    >
                        <div>
                            <el-form
                                :model="addForm"
                                :rules="rules"
                                ref="addForm"
                                label-width="110px"
                                class="demo-ruleForm dialog-form"
                                label-position="left"
                            >
                                <el-row>
                                    <el-col :span="11">
                                        <el-form-item
                                            label="用户名"
                                            prop="areaId"
                                        >
                                            <el-input v-model="addForm.code"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="11">
                                        <el-form-item
                                            label="是否开通"
                                            prop="areaId"
                                        >
                                            <el-radio-group v-model="addForm.sex">
                                                <el-radio :label="1">是</el-radio>
                                                <el-radio :label="2">否</el-radio>
                                            </el-radio-group>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="11">
                                        <el-form-item
                                            label="开通时间"
                                            prop="certificateImg"
                                        >
                                            <el-date-picker
                                                v-model="addForm.code"
                                                type="date"
                                                placeholder="选择日期"
                                            >
                                            </el-date-picker>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-divider></el-divider>
                            </el-form>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane
                        label="续租"
                        name="third"
                    >
                        <div>
                            <el-form
                                :model="addForm"
                                :rules="rules"
                                ref="addForm"
                                label-width="110px"
                                class="demo-ruleForm dialog-form"
                                label-position="left"
                            >
                                <el-row>
                                    <el-col :span="11">
                                        <el-form-item
                                            label="合同开始日"
                                            prop="areaId"
                                        >
                                            <el-date-picker
                                                v-model="addForm.code"
                                                type="date"
                                                placeholder="选择日期"
                                            >
                                            </el-date-picker>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="11">
                                        <el-form-item
                                            label="合同结束日"
                                            prop="areaId"
                                        >
                                            <el-date-picker
                                                v-model="addForm.code"
                                                type="date"
                                                placeholder="选择日期"
                                            >
                                            </el-date-picker>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="11">
                                        <el-form-item
                                            label="租房合同"
                                            prop="certificateImg"
                                        >
                                            <imgUpload
                                                :imgSetting="upload"
                                                :getImgUrl="getImgUrl1"
                                                ref="imgUpload1"
                                            />
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </el-form>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
            <div
                slot="footer"
                class="dialog-footer"
                style="text-align:center"
            >
                <el-button
                    type="primary"
                    @click="dialogVisible.add = false"
                >保 存</el-button>
                <el-button @click="dialogVisible.add = false">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import ctrlPage from "@/components/common/other/CtrlPage";
import imgUpload from "@/components/common/upload/imgUpload.vue";

export default {
    name: "property-personManagement-household",
    data() {
        return {
            selectForm: {
                type: '1',
                areaId: null,
                buildingId: null,
                elementId: null,
                roomId: null,
                identityType: null,
                search: null,
                startTime: null,
                endTime: null,
                status: null,
                timeValue: null
            },
            list: [],
            roomList: [
                {
                    roomId: '1',
                    roomValue: '房屋111'
                }, {
                    roomId: '2',
                    roomValue: '房屋22'
                }
            ],
            identityTypeList: [
                {
                    identityTypeId: '1',
                    identityTypeValue: '儿子'
                }, {
                    identityTypeId: '2',
                    identityTypeValue: '爸爸'
                }
            ],
            areaList: [],
            buildingList: [],
            elementList: [],
            addForm: {
                code: null,
            },
            auditingForm: {},
            detailForm: {},
            updateForm: {},
            rules: {
                num: [
                    {
                        required: true,
                        message: "请输入部门编码",
                        trigger: "blur"
                    }
                ],
                name: [
                    {
                        required: true,
                        message: "请输入部门简称",
                        trigger: "blur"
                    }
                ]
            },
            dialogVisible: {
                add: false,
                auditing: false,
                detail: false,
                update: false,
                innerVisible: false,
            },
            activeName: 'first',
            upload: {
                limit: 1,
                isShow: true
            }
        };
    },
    mounted() {
        this.getAreaList()

        this.$refs.page.getList(1);
    },
    watch: {
        'selectForm.areaId'() {
            this.getBuildingList(this.selectForm.areaId)
        },
        'selectForm.buildingId'() {
            this.getElementIdList(this.selectForm.buildingId)
        },
        'selectForm.timeValue'() {
            if (!this.selectForm.timeValue) {
                this.selectForm.startTime = null
                this.selectForm.endTime = null
            } else {
                this.selectForm.startTime = this.selectForm.timeValue[0]
                this.selectForm.endTime = this.selectForm.timeValue[1]
            }
        },
        'addForm.areaId'() {
            this.getBuildingList(this.addForm.areaId)
        },
        'addForm.buildingId'() {
            this.getElementIdList(this.addForm.buildingId)
        },
    },
    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        },
        test() {
            console.log(this.selectForm)
        },
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
            // this.$nextTick(() => {
            //     this.$refs['addForm'].resetFields();
            // })
        },
        //打开编辑窗口
        openUpdateDialog(form) {
            this.updateForm = form;
            this.dialogVisible.update = true;
        },
        //打开审核窗口
        openAuditingDialog(form) {
            this.detailForm = form;
            this.dialogVisible.detail = true
        },
        //打开查看窗口
        openDetailDialog(form) {
            this.detailForm = form;
            this.dialogVisible.detail = true
        },
        //获取片区
        getAreaList() {
            this.$propertyApi.personManagement.household.cascade({
                areaId: this.selectForm.areaId,
                buildingId: this.selectForm.buildingId,
                elementId: this.selectForm.elementId,
            }).then((res) => {
                if (res.code == 1000) {
                    this.areaList = res.data
                }
            })
        },
        //获取楼栋
        getBuildingList(areaId) {
            this.$propertyApi.personManagement.household.cascade({
                areaId: areaId,
            }).then((res) => {
                if (res.code == 1000) {
                    this.buildingList = res.data
                }
            })
        },
        //获取单元
        getElementIdList(buildingId) {
            this.$propertyApi.personManagement.household.cascade({
                buildingId: buildingId,
            }).then((res) => {
                if (res.code == 1000) {
                    this.elementList = res.data
                }
            })
        },
        //查询/获取List
        getList(pageIndex, rows, callback) {
            this.$propertyApi.personManagement.household.list({
                pageNum: pageIndex,
                pageSize: rows,
                areaId: this.selectForm.areaId,
                buildingId: this.selectForm.buildingId,
                elementId: this.selectForm.elementId,
                roomId: this.selectForm.roomId,
                identityType: this.selectForm.identityType,
                search: this.selectForm.search,
                startTime: this.selectForm.startTime,
                endTime: this.selectForm.endTime,
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
        getImgUrl4(data) {
            this.addForm.gatherImg[0] = data
        },
    },
    components: {
        ctrlPage, imgUpload
    }
};
</script>

<style>
</style>
