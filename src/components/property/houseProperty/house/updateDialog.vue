<template>
    <div>
        <el-dialog
            title="编辑房屋"
            :visible.sync="dialogVisible"
            width="800px"
            :modal-append-to-body='false'
            center
            @close="closeDialog()"
        >
            <el-form
                :model="form"
                :rules="rules"
                ref="form"
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
                            <el-input v-model="form.code"></el-input>
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
                                v-model="form.areaId"
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
                            <el-input v-model="form.name"></el-input>
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
                                v-model="form.buildingId"
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
                            <el-input v-model="form.acreage"></el-input>
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
                                v-model="form.elementId"
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
                            <Dictionary
                                :typeCode="1005"
                                v-model="form.purpose"
                            />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item
                            label="朝向"
                            prop="orientation"
                        >
                            <Dictionary
                                :typeCode="1006"
                                v-model="form.orientation"
                            />
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
                            <Dictionary
                                :typeCode="1004"
                                v-model="form.nature"
                            />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item
                            label="住户可见"
                            prop="residentVisible"
                        >
                            <Dictionary
                                :typeCode="1009"
                                v-model="form.residentVisible"
                            />
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
                                v-model="form.delivery"
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
                                :imgSetting="{limit: 5}"
                                :getImgUrl="getImgUrl3"
                                ref="imgUpload3"
                                :imgUrls="form.accessoryDocument"
                            />
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
                                :imgSetting="{limit: 3}"
                                :getImgUrl="getImgUrl4"
                                ref="imgUpload4"
                                :imgUrls="form.floorPlan"
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
                <el-button @click="closeDialog()">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import Dictionary from '@/components/common/select/Dictionary'
import imgUpload from "@/components/common/upload/imgUpload.vue";

export default {
    props: {
        updateForm: Object,
        areaList: Array
    },
    data() {
        return {
            dialogVisible: false,
            form: {},
            houseType: {
                fang: null,
                ting: null,
                wei: null
            },
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
            buildingList: [],
            elementList: [],
        };
    },
    watch: {
        'form.areaId'() {
            this.getBuildingList(this.form.areaId)
        },
        'form.buildingId'() {
            this.getElementIdList(this.form.buildingId)
        },
    },
    methods: {
        //打开dialog
        showDialog(row) {
            this.dialogVisible = true;
            this.$nextTick(() => {
                // for (let i in this.form) {
                //     this.form[i] = row[i]
                // }
                this.form = {
                    ...row,
                    accessoryDocument: row.accessoryDocument ? row.accessoryDocument.split(',') : [],
                    floorPlan: row.floorPlan ? row.floorPlan.split(',') : [],
                }
                this.houseType.fang = row.houseType.split(',')[0];
                this.houseType.ting = row.houseType.split(',')[1];
                this.houseType.wei = row.houseType.split(',')[2];
            })
        },
        //关闭dialog
        closeDialog() {
            this.$refs.form.resetFields();
            for (let i in this.houseType) {
                this.houseType[i] = null
            }
            this.dialogVisible = false;
            this.$parent.$refs.page.getList(this.$parent.$refs.page.pageIndex);
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
        //修改操作
        update() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    for (let prop of Object.keys(this.houseType)) {
                        if (this.houseType[prop] == null) {
                            this.houseType[prop] = 0
                        }
                    }
                    let newForm = JSON.parse(JSON.stringify(this.form))
                    newForm.houseType = new Array().concat(this.houseType.fang, this.houseType.ting, this.houseType.wei).join(',')
                    newForm = {
                        ...newForm,
                        accessoryDocument: newForm.accessoryDocument.join(','),
                        floorPlan: newForm.floorPlan.join(','),
                    }
                    this.$propertyApi.houseProperty.house.update(newForm)
                        .then(res => {
                            if (res.code == 1000) {
                                this.dialogVisible = false
                                this.$$message({
                                    message: res.message,
                                    type: 'success'
                                })
                                this.$parent.$refs.page.getList(1);
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
        getImgUrl3(data) {
            this.form.accessoryDocument = data.split(',')
        },
        getImgUrl4(data) {
            this.form.floorPlan = data.split(',')
        },
    },
    components: {
        Dictionary,
        imgUpload
    }
};
</script>

<style>
</style>
