<template>
    <div class="property">
        <div class="com-main-inner selectBox">
            <el-form
                :inline="true"
                :model="selectForm"
                class="demo-form-inline"
                label-position="left"
                ref="selectForm"
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
                <el-form-item label="房屋用途">
                    <el-select
                        clearable
                        v-model="selectForm.purpose"
                        placeholder="请选择房屋用途"
                    >
                        <el-option
                            v-for="item in purposeList"
                            :key="item.value"
                            :label="item.dicName"
                            :value="item.dicCode"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="交付时间">
                    <el-date-picker
                        v-model="selectForm.delivery"
                        type="date"
                        value-format="yyyy/MM/dd"
                        placeholder="选择日期"
                    >
                    </el-date-picker>
                </el-form-item>
                <el-form-item
                    label="审批状态"
                    v-if="selectForm.type!='1'"
                >
                    <el-select
                        clearable
                        v-model="selectForm.status"
                        placeholder="请选择审批状态"
                    >
                        <el-option
                            v-for="item in statusList"
                            :key="item.value"
                            :label="item.statusValue"
                            :value="item.statusId"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="关键词">
                    <el-input
                        v-model="selectForm.search"
                        placeholder="关键词"
                    ></el-input>
                </el-form-item>
                <el-form-item>
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
                <span class="com-page-header-title">住房管理列表
                    <el-radio-group v-model="selectForm.type">
                        <el-radio-button label="1">待审核</el-radio-button>
                        <el-radio-button label="2">已审批</el-radio-button>
                    </el-radio-group></span>
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
                        label="房屋编号"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="房屋名称"
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
                        prop="userName"
                        label="业主姓名"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="userPhone"
                        label="联系电话"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="acreage"
                        label="建筑面积㎡"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="delivery"
                        label="交付时间"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        label="房屋用途"
                        align="center"
                    >
                        <template slot-scope="scope">
                            <span>{{getItemName(scope.row.purpose,purposeList, 'dicCode', 'dicName')}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="status"
                        label="审批状态"
                        align="center"
                        v-if="selectForm.type!='1'"
                    >
                        <template
                            slot-scope="scope"
                            v-if="selectForm.type!='1'"
                        >
                            <span>{{getItemName(scope.row.status,statusList, 'statusId', 'statusValue')}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        width="100"
                        align="center"
                        v-if="selectForm.type=='1'"
                    >
                        <template
                            slot-scope="scope"
                            v-if="selectForm.type=='1'"
                        >
                            <el-button
                                type="primary"
                                @click="openAuditingDialog(scope.row)"
                            >审核</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        width="150"
                        align="center"
                        v-if="selectForm.type=='2'"
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
            title="新增房屋"
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
                            label="房屋编号"
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
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item
                            label="房屋名称"
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
                            label="所属楼栋"
                            prop="buildingId"
                        >
                            <el-select
                                clearable
                                v-model="addForm.buildingId"
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
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item
                            label="建筑面积"
                            prop="acreage"
                        >
                            <el-input v-model="addForm.acreage"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col
                        :span="11"
                        :offset="1"
                    >
                        <el-form-item
                            label="所属单元"
                            prop="buildingId"
                        >
                            <el-select
                                clearable
                                v-model="addForm.elementId"
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
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item
                            label="户型"
                            prop="houseType"
                        >
                            <el-row>
                                <el-col :span="7">
                                    <el-input
                                        class="houseType"
                                        maxlength=1
                                        v-model="houseType.fang"
                                    ></el-input>&nbsp;&nbsp;房
                                </el-col>
                                <el-col :span="7">
                                    <el-input
                                        class="houseType"
                                        maxlength=1
                                        v-model="houseType.ting"
                                    ></el-input>&nbsp;&nbsp;厅
                                </el-col>
                                <el-col :span="7">
                                    <el-input
                                        class="houseType"
                                        maxlength=1
                                        v-model="houseType.wei"
                                    ></el-input>&nbsp;&nbsp;卫
                                </el-col>
                            </el-row>
                        </el-form-item>
                    </el-col>
                    <el-col
                        :span="11"
                        :offset="1"
                    >
                        <el-form-item
                            label="房屋用途"
                            prop="purpose"
                        >
                            <el-select
                                clearable
                                v-model="addForm.purpose"
                                placeholder="请选择房屋用途"
                            >
                                <el-option
                                    v-for="item in purposeList"
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
                            label="朝向"
                            prop="orientation"
                        >
                            <el-select
                                clearable
                                v-model="addForm.orientation"
                                placeholder="请选择朝向"
                            >
                                <el-option
                                    v-for="item in orientationList"
                                    :key="item.value"
                                    :label="item.dicName"
                                    :value="item.dicCode"
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
                <el-row>
                    <el-col :span="11">
                        <el-form-item
                            label="住户可见"
                            prop="residentVisible"
                        >
                            <el-select
                                clearable
                                v-model="addForm.residentVisible"
                                placeholder="请选择住户可见"
                            >
                                <el-option
                                    v-for="item in residentVisibleList"
                                    :key="item.value"
                                    :label="item.residentVisibleValue"
                                    :value="item.residentVisibleId"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col
                        :span="11"
                        :offset="1"
                    >
                        <el-form-item
                            label="交付时间"
                            prop="delivery"
                        >
                            <el-date-picker
                                v-model="addForm.delivery"
                                type="date"
                                placeholder="选择日期"
                                value-format="yyyy/MM/dd"
                            >
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-divider></el-divider>
                <el-row>
                    <el-col :span="24">
                        <el-form-item
                            label="房屋证件"
                            prop="accessoryDocument"
                        >
                            <imgUpload
                                :imgSetting="upload1"
                                :getImgUrl="getImgUrl1"
                                ref="imgUpload1"
                                :imgUrls="(addForm.accessoryDocument&&[addForm.accessoryDocument.split(',')])||[]"
                            />
                            <!-- <imgUpload :imgSetting="upload" /> -->
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item
                            label="户型图"
                            prop="floorPlan"
                        >
                            <imgUpload
                                :imgSetting="upload2"
                                :getImgUrl="getImgUrl2"
                                ref="imgUpload2"
                                :imgUrls="(addForm.floorPlan&&[addForm.floorPlan.split(',')])||[]"
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
            title="编辑房屋"
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
                            label="房屋编号"
                            prop="code"
                        >
                            <el-input v-model="updateForm.code"></el-input>
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
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item
                            label="房屋名称"
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
                            label="所属楼栋"
                            prop="buildingId"
                        >
                            <el-select
                                clearable
                                v-model="updateForm.buildingId"
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
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item
                            label="建筑面积"
                            prop="acreage"
                        >
                            <el-input v-model="updateForm.acreage"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col
                        :span="11"
                        :offset="1"
                    >
                        <el-form-item
                            label="所属单元"
                            prop="buildingId"
                        >
                            <el-select
                                clearable
                                v-model="updateForm.elementId"
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
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item
                            label="户型"
                            prop="houseType"
                        >
                            <el-row>
                                <el-col :span="7">
                                    <el-input
                                        class="houseType"
                                        maxlength=1
                                        v-model="houseType.fang"
                                    ></el-input>&nbsp;&nbsp;房
                                </el-col>
                                <el-col :span="7">
                                    <el-input
                                        class="houseType"
                                        maxlength=1
                                        v-model="houseType.ting"
                                    ></el-input>&nbsp;&nbsp;厅
                                </el-col>
                                <el-col :span="7">
                                    <el-input
                                        class="houseType"
                                        maxlength=1
                                        v-model="houseType.wei"
                                    ></el-input>&nbsp;&nbsp;卫
                                </el-col>
                            </el-row>
                        </el-form-item>
                    </el-col>
                    <el-col
                        :span="11"
                        :offset="1"
                    >
                        <el-form-item
                            label="房屋用途"
                            prop="purpose"
                        >
                            <el-select
                                clearable
                                v-model="updateForm.purpose"
                                placeholder="请选择房屋用途"
                            >
                                <el-option
                                    v-for="item in purposeList"
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
                            label="朝向"
                            prop="orientation"
                        >
                            <el-select
                                clearable
                                v-model="updateForm.orientation"
                                placeholder="请选择朝向"
                            >
                                <el-option
                                    v-for="item in orientationList"
                                    :key="item.value"
                                    :label="item.dicName"
                                    :value="item.dicCode"
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
                <el-row>
                    <el-col :span="11">
                        <el-form-item
                            label="住户可见"
                            prop="residentVisible"
                        >
                            <el-select
                                clearable
                                v-model="updateForm.residentVisible"
                                placeholder="请选择住户可见"
                            >
                                <el-option
                                    v-for="item in residentVisibleList"
                                    :key="item.value"
                                    :label="item.residentVisibleValue"
                                    :value="item.residentVisibleId"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col
                        :span="11"
                        :offset="1"
                    >
                        <el-form-item
                            label="交付时间"
                            prop="delivery"
                        >
                            <el-date-picker
                                v-model="updateForm.delivery"
                                type="date"
                                placeholder="选择日期"
                                value-format="yyyy/MM/dd"
                            >
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-divider></el-divider>
                <el-row>
                    <el-col :span="24">
                        <el-form-item
                            label="房屋证件"
                            prop="accessoryDocument"
                        >
                            <imgUpload
                                :imgSetting="upload1"
                                :getImgUrl="getImgUrl3"
                                ref="imgUpload3"
                                :imgUrls="(updateForm.accessoryDocument&&updateForm.accessoryDocument.split(','))||[]"
                            />
                            <!-- <imgUpload :imgSetting="upload" /> -->
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item
                            label="户型图"
                            prop="floorPlan"
                        >
                            <imgUpload
                                :imgSetting="upload2"
                                :getImgUrl="getImgUrl4"
                                ref="imgUpload4"
                                :imgUrls="(updateForm.floorPlan&&updateForm.floorPlan.split(','))||[]"
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
                    <span>房屋编号</span>
                </el-col>
                <el-col :span="8">
                    <span>{{detailForm.code}}</span>
                </el-col>
                <el-col
                    :span="3"
                    :offset="1"
                >
                    <span>所属片区</span>
                </el-col>
                <el-col :span="8">
                    <span>{{detailForm.areaName}}</span>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="3">
                    <span>业主</span>
                </el-col>
                <el-col :span="8">
                    <span>{{detailForm.name}}</span>
                </el-col>
                <el-col
                    :span="3"
                    :offset="1"
                >
                    <span>所属楼栋</span>
                </el-col>
                <el-col :span="8">
                    <span>{{detailForm.buildingName}}</span>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="3">
                    <span>建筑面积</span>
                </el-col>
                <el-col :span="8">
                    <span>{{detailForm.acreage}}</span>
                </el-col>
                <el-col
                    :span="3"
                    :offset="1"
                >
                    <span>所属单元</span>
                </el-col>
                <el-col :span="8">
                    <span>{{detailForm.elementName}}</span>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="3">
                    <span>户型</span>
                </el-col>
                <el-col :span="8">
                    <span>
                        {{detailForm.houseType &&detailForm.houseType.split(',')[0]}}房
                        {{detailForm.houseType &&detailForm.houseType.split(',')[1]}}厅
                        {{detailForm.houseType &&detailForm.houseType.split(',')[2]}}卫
                    </span>
                </el-col>
                <el-col
                    :span="3"
                    :offset="1"
                >
                    <span>房屋用途</span>
                </el-col>
                <el-col :span="8">
                    <span>{{getItemName(detailForm.purpose,purposeList, 'dicCode', 'dicName')}}</span>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="3">
                    <span>朝向</span>
                </el-col>
                <el-col :span="8">
                    <span>{{getItemName(detailForm.orientation,orientationList, 'dicCode', 'dicName')}}</span>
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
            <el-row>
                <el-col :span="3">
                    <span>住户可见</span>
                </el-col>
                <el-col :span="8">
                    <span>{{getItemName(detailForm.residentVisible,residentVisibleList, 'residentVisibleId', 'residentVisibleValue')}}</span>
                </el-col>
                <el-col
                    :span="3"
                    :offset="1"
                >
                    <span>交付时间</span>
                </el-col>
                <el-col :span="8">
                    <span>{{detailForm.delivery}}</span>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="3">
                    <span>房屋证件</span>
                </el-col>
                <el-col
                    :span="4"
                    v-for="img in (detailForm.accessoryDocument && detailForm.accessoryDocument.split(',')) || []"
                    :key="img.value"
                >
                    <img
                        v-imgPreview
                        style="width:90%;marginBottom:20px;marginRight:10px;"
                        :src="$joinImgPrefix(img)"
                    >
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="3">
                    <span>户型图</span>
                </el-col>
                <el-col
                    :span="4"
                    v-for="img in (detailForm.floorPlan && detailForm.floorPlan.split(',')) || []"
                    :key="img.value"
                >
                    <img
                        v-imgPreview
                        style="width:90%;marginBottom:20px;marginRight:10px;"
                        :src="$joinImgPrefix(img)"
                    >
                </el-col>
            </el-row>
            <el-row v-if="detailForm.status==2">
                <el-col :span="3">
                    <span>未通过原因</span>
                </el-col>
                <el-col :span="21">
                    <span>{{detailForm.reason}}</span>
                </el-col>
            </el-row>
            <div
                slot="footer"
                class="dialog-footer"
                style="text-align:center"
                v-if="dialogVisible.idEdit"
            >
                <el-divider></el-divider>
                <el-button
                    type="primary"
                    @click="auditing(detailForm,1)"
                >审批通过</el-button>
                <el-button @click="dialogVisible.innerVisible = true">审批未通过</el-button>
            </div>
        </el-dialog>
        <el-dialog
            width="30%"
            title="原因"
            :visible.sync="dialogVisible.innerVisible"
            :modal-append-to-body='false'
            center
        >
            <el-form
                :model="detailForm"
                :rules="rules2"
                ref="ruleForm"
                label-width="0px"
                class="demo-ruleForm"
            >
                <el-form-item prop="reason">
                    <el-input
                        type="textarea"
                        :rows="5"
                        placeholder="请输入内容"
                        v-model="detailForm.reason"
                    >
                    </el-input>
                </el-form-item>
            </el-form>
            <div
                slot="footer"
                class="dialog-footer"
                style="text-align:center"
            >
                <el-button
                    type="primary"
                    @click="auditing(detailForm,2)"
                >提交</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import ctrlPage from "@/components/common/other/CtrlPage";
import imgUpload from "@/components/common/upload/imgUpload.vue";
import { getItemName } from "@/filters/index.js";

export default {
    name: "property-propertyButler-house",
    data() {
        return {
            selectForm: {
                areaId: null,
                buildingId: null,
                elementId: null,
                purpose: null,
                search: null,
                delivery: null,
                type: '1',
                status: null,
            },
            list: [],
            areaList: [],
            buildingList: [],
            elementList: [],
            purposeList: [],
            orientationList: [],
            residentVisibleList: [
                {
                    residentVisibleId: 1,
                    residentVisibleValue: '是'
                }, {
                    residentVisibleId: 2,
                    residentVisibleValue: '否'
                }
            ],
            natureList: [],
            statusList: [
                {
                    statusId: 1,
                    statusValue: '是'
                }, {
                    statusId: 2,
                    statusValue: '否'
                }
            ],
            addForm: {
                code: null,
                areaId: null,
                buildingId: null,
                elementId: null,
                name: null,
                acreage: null,
                houseType: null,
                purpose: null,
                orientation: null,
                nature: null,
                residentVisible: null,
                delivery: null,
                accessoryDocument: null,
                floorPlan: null,
            },
            houseType: {
                fang: null,
                ting: null,
                wei: null
            },
            auditingForm: {},
            detailForm: {},
            updateForm: {},
            rules: {
                code: [
                    {
                        required: true,
                        message: "请输入房屋编号",
                        trigger: "blur"
                    }
                ],
                name: [
                    {
                        required: true,
                        message: "请输入房屋名称",
                        trigger: "blur"
                    }
                ],
                acreage: [
                    {
                        required: true,
                        message: "请输入建筑面积",
                        trigger: "blur"
                    }
                ],
                areaId: [
                    {
                        required: true,
                        message: "请选择所属片区",
                        trigger: "change"
                    }
                ],
                buildingId: [
                    {
                        required: true,
                        message: "请选择所属楼栋",
                        trigger: "change"
                    }
                ],
                elementId: [
                    {
                        required: true,
                        message: "请选择所属单元",
                        trigger: "change"
                    }
                ],
                purpose: [
                    {
                        required: true,
                        message: "请选择房屋用途",
                        trigger: "change"
                    }
                ],
                nature: [
                    {
                        required: true,
                        message: "请选择产权性质",
                        trigger: "change"
                    }
                ],
            },
            rules2: {
                reason: [
                    { required: true, message: '请填写活动形式', trigger: 'blur' }
                ]
            },
            dialogVisible: {
                add: false,
                auditing: false,
                detail: false,
                update: false,
                innerVisible: false,
                idEdit: false
            },
            deleteList: [],
            upload1: {
                limit: 5,
            },
            upload2: {
                limit: 3,
            }
        };
    },
    mounted() {
        this.getAreaList()
        this.getPurposeList()
        this.getNatureList()
        this.getOrientationList()
        this.$refs.page.getList(1);
    },
    watch: {
        'selectForm.areaId'() {
            this.getBuildingList(this.selectForm.areaId)
        },
        'selectForm.buildingId'() {
            this.getElementIdList(this.selectForm.buildingId)
        },
        'addForm.areaId'() {
            this.getBuildingList(this.addForm.areaId)
        },
        'addForm.buildingId'() {
            this.getElementIdList(this.addForm.buildingId)
        },
        'selectForm.type'() {
            this.$refs.page.getList(1);
            this.$nextTick(() => {
                this.$refs.selectForm.resetFields();
            })
        }
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
            this.dialogVisible.update = true;
            this.houseType.fang = this.updateForm.houseType.split(',')[0]
            this.houseType.ting = this.updateForm.houseType.split(',')[1]
            this.houseType.wei = this.updateForm.houseType.split(',')[2]
        },
        //打开审核窗口
        openAuditingDialog(form) {
            this.detailForm = form;
            this.dialogVisible.detail = true
            this.dialogVisible.idEdit = true
        },
        //打开查看窗口
        openDetailDialog(form) {
            this.detailForm = form;
            this.dialogVisible.detail = true
            this.dialogVisible.idEdit = false
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
        //获取房屋用途
        getPurposeList() {
            this.$systemApi.dataDictionary.typeToDic({
                typeCode: 1005
            }).then((res) => {
                if (res.code == 1000) {
                    this.purposeList = res.data
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
        //获取朝向
        getOrientationList() {
            this.$systemApi.dataDictionary.typeToDic({
                typeCode: 1006
            }).then((res) => {
                if (res.code == 1000) {
                    this.orientationList = res.data
                }
            })
        },
        //查询/获取List
        getList(pageIndex, rows, callback) {
            this.$propertyApi.houseProperty.house.list({
                pageNum: pageIndex,
                pageSize: rows,
                areaId: this.selectForm.areaId,
                buildingId: this.selectForm.buildingId,
                elementId: this.selectForm.elementId,
                purpose: this.selectForm.purpose,
                search: this.selectForm.search,
                delivery: this.selectForm.delivery,
                status: this.selectForm.status,
                type: this.selectForm.type,
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
                    for (let prop of Object.keys(this.houseType)) {
                        if (this.houseType[prop] == null) {
                            this.houseType[prop] = 0
                        }
                    }
                    this.addForm.houseType = new Array().concat(this.houseType.fang, this.houseType.ting, this.houseType.wei).join(',')
                    this.$propertyApi.houseProperty.house.add(this.addForm)
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
                        this.$propertyApi.houseProperty.house.deleteList({
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
                        this.$propertyApi.houseProperty.house.delete({
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
                    for (let prop of Object.keys(this.updateForm.houseType)) {
                        if (this.updateForm.houseType[prop] == null) {
                            this.updateForm.houseType[prop] = 0
                        }
                    }
                    this.updateForm.houseType = new Array().concat(this.houseType.fang, this.houseType.ting, this.houseType.wei).join(',')
                    this.$propertyApi.houseProperty.house.update(this.updateForm)
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
        auditing(form, status) {
            form.status = status
            this.$propertyApi.houseProperty.house.update(form)
                .then(res => {
                    if (res.code == 1000) {
                        this.dialogVisible.detail = false
                        this.dialogVisible.innerVisible = false
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
        },
        //获取图片
        getImgUrl1(data) {
            this.addForm.accessoryDocument = data
        },
        getImgUrl2(data) {
            this.addForm.floorPlan = data
        },
        getImgUrl3(data) {
            this.updateForm.accessoryDocument = data
        },
        getImgUrl4(data) {
            this.updateForm.floorPlan = data
        },
    },
    components: {
        ctrlPage, imgUpload
    }
};
</script>

<style>
</style>
