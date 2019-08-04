<template>
    <div>
        <el-dialog
            title="新增访客"
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
                            <el-divider content-position="left">访客信息</el-divider>
                            <el-row>
                                <el-col :span="11">
                                    <el-form-item
                                        label="访客姓名"
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
                                        label="手机号码"
                                        prop="phone"
                                    >
                                        <el-input v-model="form.phone"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="11">
                                    <el-form-item
                                        label="性别"
                                        prop="sex"
                                    >
                                        <el-radio-group v-model="form.sex">
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
                                        label="预约时间"
                                        prop="appointmentTime"
                                    >
                                        <el-date-picker
                                            v-model="form.appointmentTime"
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
                                        label="证件类型"
                                        prop="documentType"
                                    >
                                        <Dictionary
                                            :typeCode="1003"
                                            v-model="form.documentType"
                                        />
                                    </el-form-item>
                                </el-col>
                                <el-col
                                    :span="11"
                                    :offset="1"
                                >
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
                            </el-row>
                            <el-row>
                                <el-col :span="11">
                                    <el-row>
                                        <el-col :span="24">
                                            <el-form-item
                                                label="证件号码"
                                                prop="documentNumber"
                                            >
                                                <el-input v-model="form.documentNumber"></el-input>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="24">
                                            <el-form-item
                                                label="陪同人员"
                                                prop="ifEscort"
                                            >
                                                <el-radio-group v-model="form.ifEscort">
                                                    <el-radio :label="1">有</el-radio>
                                                    <el-radio :label="2">无</el-radio>
                                                </el-radio-group>
                                                <span
                                                    v-if="form.ifEscort==1"
                                                    class="peitongBtn"
                                                    @click="addVistor()"
                                                >添加陪同人员</span>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                </el-col>
                                <el-col
                                    :span="11"
                                    :offset="1"
                                >
                                    <el-form-item
                                        label="来访说明"
                                        prop="explains"
                                    >
                                        <el-input
                                            type="textarea"
                                            v-model="form.explains"
                                        ></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </div>
                        <div
                            v-for="(lst,index) in form.peopelVisitors"
                            :key="index"
                        >
                            <el-divider content-position="left">访客信息</el-divider>
                            <el-row>
                                <el-col :span="11">
                                    <el-form-item label="访客姓名">
                                        <el-input v-model="lst.name"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col
                                    :span="11"
                                    :offset="1"
                                >
                                    <el-form-item label="手机号码">
                                        <el-input v-model="lst.phone"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="11">
                                    <el-form-item label="性别">
                                        <el-radio-group v-model="lst.sex">
                                            <el-radio :label="1">男</el-radio>
                                            <el-radio :label="2">女</el-radio>
                                        </el-radio-group>
                                    </el-form-item>
                                </el-col>
                                <el-col
                                    :span="11"
                                    :offset="1"
                                >
                                    <el-form-item label="预约时间">
                                        <el-date-picker
                                            v-model="lst.appointmentTime"
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
                                    <el-form-item label="证件类型">
                                        <Dictionary
                                            :typeCode="1003"
                                            v-model="lst.documentType"
                                        />
                                    </el-form-item>
                                </el-col>
                                <el-col
                                    :span="11"
                                    :offset="1"
                                >
                                    <el-form-item label="车牌号">
                                        <div class="plateNumbers">
                                            <el-select
                                                v-model="lst.plateNumbers[0]"
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
                                                v-model="lst.plateNumbers[1]"
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
                                            <el-input v-model="lst.plateNumbers[2]"></el-input>
                                        </div>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="11">
                                    <el-row>
                                        <el-col :span="24">
                                            <el-form-item label="证件号码">
                                                <el-input v-model="lst.documentNumber"></el-input>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                </el-col>
                                <el-col
                                    :span="11"
                                    :offset="1"
                                >
                                    <el-form-item label="来访说明">
                                        <el-input
                                            type="textarea"
                                            v-model="lst.explains"
                                        ></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </div>
                        <el-divider content-position="left">被访人信息</el-divider>
                        <el-row>
                            <el-col :span="11">
                                <el-form-item
                                    label="被访人"
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
import Dictionary from "@/components/common/select/Dictionary";
import areaId from "@/components/property/selectForm/areaId";
import buildingId from "@/components/property/selectForm/buildingId";
import elementId from "@/components/property/selectForm/elementId";
import roomId from "@/components/property/selectForm/roomId";
export default {
    data() {
        return {
            dialogVisible: false,
            form: {
                appointmentTime: null,
                areaId: null,
                buildingId: null,
                dataSources: 1,
                documentNumber: null,
                documentType: null,
                elementId: null,
                escort: null,
                explains: null,
                ifEscort: null,
                name: null,
                peopelVisitors: [],
                phone: null,
                plateNumbers: [],
                roomId: null,
                sex: null,
                userName: null
            },
            rules: {
                name: [
                    {
                        required: true,
                        message: "请输入访客姓名",
                        trigger: "blur"
                    }
                ],
                phone: [
                    {
                        required: true,
                        message: "请输入手机号码",
                        trigger: "blur"
                    }
                ],
                sex: [
                    {
                        required: true,
                        message: "请选择性别",
                        trigger: "change"
                    }
                ],
                appointmentTime: [
                    {
                        required: true,
                        message: "请选择预约时间",
                        trigger: "change"
                    }
                ],
                documentType: [
                    {
                        required: true,
                        message: "请选择证件类型",
                        trigger: "change"
                    }
                ],
                documentNumber: [
                    {
                        required: true,
                        message: "请输入证件号码",
                        trigger: "blur"
                    }
                ],
                documentType: [
                    {
                        required: true,
                        message: "请选择证件类型",
                        trigger: "change"
                    }
                ],
                ifEscort: [
                    {
                        required: true,
                        message: "请选择陪同人员",
                        trigger: "change"
                    }
                ],
                userName: [
                    {
                        required: true,
                        message: "请输入被访人",
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
                roomId: [
                    {
                        required: true,
                        message: "请选择所属房屋",
                        trigger: "change"
                    }
                ]
            },
            plant: {
                sheng: ['粤', '京', '冀', '沪', '津', '晋', '蒙', '辽', '吉', '黑', '苏', '浙', '皖', '闽', '赣', '鲁', '豫', '鄂', '湘', '桂', '琼', '渝', '川', '贵', '云', '藏', '陕', '甘', '青', '宁'],
                shi: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
            },
            num: 1,
            newForm: {
                appointmentTime: null,
                areaId: null,
                buildingId: null,
                dataSources: 1,
                documentNumber: null,
                documentType: null,
                elementId: null,
                escort: null,
                explains: null,
                ifEscort: null,
                name: null,
                phone: null,
                plateNumbers: [],
                roomId: null,
                sex: null,
                userName: null
            },
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
        //添加陪同人员
        addVistor() {
            this.form.peopelVisitors.push({
                appointmentTime: null,
                areaId: null,
                buildingId: null,
                dataSources: 1,
                documentNumber: null,
                documentType: null,
                elementId: null,
                escort: null,
                explains: null,
                ifEscort: null,
                name: null,
                phone: null,
                plateNumbers: [],
                roomId: null,
                sex: null,
                userName: null
            })
        },
        //新增操作
        add() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    this.form.plateNumbers = this.form.plateNumbers.join('')
                    for (let i in this.form.peopelVisitors) {
                        this.form.peopelVisitors[i].plateNumbers = this.form.peopelVisitors[i].plateNumbers.join('')
                    }
                    let data = { ...this.form, peopelVisitors: JSON.stringify(this.form.peopelVisitors) }
                    console.log(data);

                    this.$propertyApi.personManagement.visitor.add(data)
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
        }
    },
    components: {
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
