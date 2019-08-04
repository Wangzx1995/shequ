<template>
    <div>
        <el-dialog
            title="新增车辆"
            :visible.sync="dialogVisible"
            width="800px"
            :modal-append-to-body='false'
            center
            @close="closeDialog()"
        >
            <div class="dialogBody">
                <div>
                    <el-form
                        :model="form"
                        :rules="rules"
                        ref="form"
                        label-width="110px"
                        class="demo-ruleForm dialog-form"
                        label-position="left"
                    >
                        <div>
                            <el-divider content-position="left">车辆信息</el-divider>
                            <el-row>
                                <el-col :span="11">
                                    <el-form-item
                                        label="车牌号"
                                        prop="plateNumbers"
                                    >
                                        <div class="plateNumbers">
                                            <el-select
                                                v-model="form.plateNumbers[0]"
                                                placeholder="请选择"
                                            >
                                                <el-option
                                                    v-for="item in plant.sheng"
                                                    :key="item"
                                                    :label="item"
                                                    :value="item"
                                                >
                                                </el-option>
                                            </el-select>
                                            <el-select
                                                v-model="form.plateNumbers[1]"
                                                placeholder="请选择"
                                            >
                                                <el-option
                                                    v-for="item in plant.shi"
                                                    :key="item"
                                                    :label="item"
                                                    :value="item"
                                                >
                                                </el-option>
                                            </el-select>
                                            <el-input v-model="form.plateNumbers[2]"></el-input>
                                        </div>
                                    </el-form-item>
                                </el-col>
                                <el-col
                                    :span="11"
                                    :offset="1"
                                >
                                    <el-form-item
                                        label="车辆类型"
                                        prop="carType"
                                    >
                                        <Dictionary
                                            :typeCode="1017"
                                            v-model="form.carType"
                                        />
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="11">
                                    <el-form-item
                                        label="车架号"
                                        prop="vin"
                                    >
                                        <el-input v-model="form.vin"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col
                                    :span="11"
                                    :offset="1"
                                >
                                    <el-form-item
                                        label="车辆颜色"
                                        prop="color"
                                    >
                                        <Dictionary
                                            :typeCode="1018"
                                            v-model="form.color"
                                        />
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="11">
                                    <el-form-item
                                        label="车辆照片"
                                        prop="accessoryCar"
                                    >
                                        <imgUpload
                                            :imgSetting="{
                                                limit: 1,
                                                isShow: true
                                            }"
                                            :getImgUrl="getImgUrl1"
                                            ref="imgUpload1"
                                        />
                                    </el-form-item>
                                </el-col>
                                <el-col
                                    :span="11"
                                    :offset="1"
                                >
                                    <el-form-item
                                        label="车位编号"
                                        prop="stallCode"
                                    >
                                        <el-select
                                            v-model="form.stallCode"
                                            placeholder="请选择"
                                        >
                                            <el-option
                                                label="1"
                                                value="1"
                                            >
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </div>
                        <el-divider content-position="left">驾驶人信息</el-divider>
                        <el-row>
                            <el-col :span="11">
                                <el-form-item
                                    label="驾驶人"
                                    prop="userName"
                                >
                                    <el-input v-model="form.userName"></el-input>
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
                                    <elementId
                                        :buildingId="form.buildingId"
                                        v-model="form.elementId"
                                    />
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="11">
                                <el-form-item
                                    label="所属片区"
                                    prop="areaId"
                                >
                                    <areaId v-model="form.areaId" />
                                </el-form-item>
                            </el-col>
                            <el-col
                                :span="11"
                                :offset="1"
                            >
                                <el-form-item
                                    label="所属房屋"
                                    prop="roomId"
                                >
                                    <roomId
                                        :elementId="form.elementId"
                                        v-model="form.roomId"
                                    />
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="11">
                                <el-form-item
                                    label="所属楼栋"
                                    prop="buildingId"
                                >
                                    <buildingId
                                        :areaId="form.areaId"
                                        v-model="form.buildingId"
                                    />
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="24">
                                <el-form-item
                                    label="行驶证"
                                    prop="drivingPermit"
                                >
                                    <imgUpload
                                        :imgSetting="{
                                            limit: 2,
                                        }"
                                        :getImgUrl="getImgUrl2"
                                        ref="imgUpload2"
                                    />
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="24">
                                <el-form-item
                                    label="驾驶证"
                                    prop="drivingLicence"
                                >
                                    <imgUpload
                                        :imgSetting="{
                                            limit: 2,
                                            warp:true
                                        }"
                                        :getImgUrl="getImgUrl3"
                                        ref="imgUpload3"
                                    />
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </div>
                <div>

                </div>
            </div>
            <div
                slot="footer"
                class="dialog-footer"
                style="text-align:center"
            >
                <el-button
                    type="primary"
                    @click="add()"
                >保 存</el-button>
                <el-button @click="closeDialog()">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import imgUpload from "@/components/common/upload/imgUpload.vue";
import Dictionary from "@/components/common/select/Dictionary";
import areaId from "@/components/property/selectForm/areaId";
import buildingId from "@/components/property/selectForm/buildingId";
import elementId from "@/components/property/selectForm/elementId";
import roomId from "@/components/property/selectForm/roomId";
export default {
    data() {
        const _this = this
        return {
            dialogVisible: false,
            form: {
                accessoryCar: [],
                areaId: null,
                buildingId: null,
                carType: null,
                color: null,
                createtime: null,
                drivingLicence: [],
                drivingPermit: [],
                elementId: null,
                plateNumbers: [],
                roomId: null,
                stallCode: null,
                userName: null,
                vin: null
            },
            rules: {
                plateNumbers: [
                    {
                        required: true,
                        validator(rule, value, callback) {
                            if (_this.form.plateNumbers.length == 3) {
                                callback()
                            } else {
                                callback(new Error('请输入车牌'))
                            }
                        }
                    }
                ],
                userName: [
                    {
                        required: true,
                        message: "请输入驾驶人",
                        trigger: "blur"
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
                roomId: [
                    {
                        required: true,
                        message: "请选择所属房屋",
                        trigger: "change"
                    }
                ]
            },
            plant: {
                sheng: [
                    "粤",
                    "京",
                    "冀",
                    "沪",
                    "津",
                    "晋",
                    "蒙",
                    "辽",
                    "吉",
                    "黑",
                    "苏",
                    "浙",
                    "皖",
                    "闽",
                    "赣",
                    "鲁",
                    "豫",
                    "鄂",
                    "湘",
                    "桂",
                    "琼",
                    "渝",
                    "川",
                    "贵",
                    "云",
                    "藏",
                    "陕",
                    "甘",
                    "青",
                    "宁"
                ],
                shi: [
                    "A",
                    "B",
                    "C",
                    "D",
                    "E",
                    "F",
                    "G",
                    "H",
                    "J",
                    "K",
                    "L",
                    "M",
                    "N",
                    "P",
                    "Q",
                    "R",
                    "S",
                    "T",
                    "U",
                    "V",
                    "W",
                    "X",
                    "Y",
                    "Z"
                ]
            },
            upload: {
                limit: 1,
                isShow: true
            }
        };
    },
    methods: {
        //打开dialog
        showDialog() {
            this.dialogVisible = true;
        },
        //关闭dialog
        closeDialog() {
            this.dialogVisible = false;
        },
        //新增操作
        add() {
            console.log(this.form)
            this.$refs.form.validate(valid => {
                if (valid) {
                    let addForm = {
                        ...this.form,
                        plateNumbers: this.form.plateNumbers.join(''),
                        accessoryCar: this.form.accessoryCar.join(','),
                        drivingLicence: this.form.drivingLicence.join(','),
                        drivingPermit: this.form.drivingPermit.join(','),
                    }
                    this.$propertyApi.parkingManagement.car
                        .add(addForm)
                        .then(res => {
                            if (res.code == 1000) {
                                this.dialogVisible = false;
                                this.$$message({
                                    message: res.message,
                                    type: "success"
                                });
                                this.$parent.$refs.page.getList(1);
                                this.$refs.form.resetFields();
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
        //获取图片
        getImgUrl1(data) {
            this.form.accessoryCar = data.split(',');
        },
        getImgUrl2(data) {
            this.form.drivingPermit = data.split(',');
        },
        getImgUrl3(data) {
            this.form.drivingLicence = data.split(',');
        },
    },
    components: {
        imgUpload,
        Dictionary,
        areaId,
        buildingId,
        elementId,
        roomId
    }
};
</script>

<style>
</style>
