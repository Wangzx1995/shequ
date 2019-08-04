<template>
    <div>
        <el-dialog
            title="查看详情"
            :visible.sync="dialogVisible"
            width="800px"
            :modal-append-to-body='false'
            center
            class="detailDialog"
            @close="closeDialog()"
        >
            <div class="dialogBody">
                <div>
                    <el-divider content-position="left">访客信息</el-divider>
                    <el-row>
                        <el-col :span="3">
                            <span>访客姓名</span>
                        </el-col>
                        <el-col :span="8">
                            <span>{{form.name}}</span>
                        </el-col>
                        <el-col
                            :span="3"
                            :offset="1"
                        >
                            <span>手机号码</span>
                        </el-col>
                        <el-col :span="8">
                            <span>{{form.phone}}</span>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="3">
                            <span>性别</span>
                        </el-col>
                        <el-col :span="8">
                            <span>{{form.sex}}</span>
                        </el-col>
                        <el-col
                            :span="3"
                            :offset="1"
                        >
                            <span>预约时间</span>
                        </el-col>
                        <el-col :span="8">
                            <span>{{form.appointmentTime}}</span>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="3">
                            <span>证件类型</span>
                        </el-col>
                        <el-col :span="8">
                            <span>{{form.documentType}}</span>
                        </el-col>
                        <el-col
                            :span="3"
                            :offset="1"
                        >
                            <span>车牌号</span>
                        </el-col>
                        <el-col :span="8">
                            <span>{{form.plateNumbers}}</span>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :span="3">
                            <span>证件号码</span>
                        </el-col>
                        <el-col :span="8">
                            <span>{{form.documentNumber}}</span>
                        </el-col>
                        <el-col
                            :span="3"
                            :offset="1"
                        >
                            <span>来访说明</span>
                        </el-col>
                        <el-col :span="8">
                            <span>{{form.explains}}</span>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="3">
                            <span>二维码</span>
                        </el-col>
                        <el-col :span="8">
                            <span>{{form.explains}}</span>
                        </el-col>
                    </el-row>
                </div>
                <!-- -------------------- -->
                <div
                    v-for="item in form.peopelVisitorList"
                    :key="item.id"
                >
                    <el-divider content-position="left">访客信息</el-divider>
                    <el-row>
                        <el-col :span="3">
                            <span>访客姓名</span>
                        </el-col>
                        <el-col :span="8">
                            <span>{{item.name}}</span>
                        </el-col>
                        <el-col
                            :span="3"
                            :offset="1"
                        >
                            <span>手机号码</span>
                        </el-col>
                        <el-col :span="8">
                            <span>{{item.phone}}</span>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="3">
                            <span>性别</span>
                        </el-col>
                        <el-col :span="8">
                            <span>{{item.sex}}</span>
                        </el-col>
                        <el-col
                            :span="3"
                            :offset="1"
                        >
                            <span>预约时间</span>
                        </el-col>
                        <el-col :span="8">
                            <span>{{item.appointmentTime}}</span>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="3">
                            <span>证件类型</span>
                        </el-col>
                        <el-col :span="8">
                            <span>{{item.documentType}}</span>
                        </el-col>
                        <el-col
                            :span="3"
                            :offset="1"
                        >
                            <span>车牌号</span>
                        </el-col>
                        <el-col :span="8">
                            <span>{{item.plateNumbers}}</span>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :span="3">
                            <span>证件号码</span>
                        </el-col>
                        <el-col :span="8">
                            <span>{{item.documentNumber}}</span>
                        </el-col>
                        <el-col
                            :span="3"
                            :offset="1"
                        >
                            <span>来访说明</span>
                        </el-col>
                        <el-col :span="8">
                            <span>{{item.explains}}</span>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="3">
                            <span>二维码</span>
                        </el-col>
                        <el-col :span="8">
                            <span>{{item.explains}}</span>
                        </el-col>
                    </el-row>
                </div>
                <!-- -------------------- -->

                <div>
                    <el-divider content-position="left">被访人信息</el-divider>
                    <el-row>
                        <el-col :span="3">
                            <span>被访人</span>
                        </el-col>
                        <el-col :span="8">
                            <span>{{form.userName}}</span>
                        </el-col>
                        <el-col
                            :span="3"
                            :offset="1"
                        >
                            <span>单元名称</span>
                        </el-col>
                        <el-col :span="8">
                            <span>{{form.elementName}}</span>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="3">
                            <span>所属片区</span>
                        </el-col>
                        <el-col :span="8">
                            <span>{{form.areaName}}</span>
                        </el-col>
                        <el-col
                            :span="3"
                            :offset="1"
                        >
                            <span>房屋名称</span>
                        </el-col>
                        <el-col :span="8">
                            <span>{{form.roomName}}</span>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="3">
                            <span>楼栋名称</span>
                        </el-col>
                        <el-col :span="8">
                            <span>{{form.buildingName}}</span>
                        </el-col>
                    </el-row>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            dialogVisible: false,
            form: {},
        };
    },

    methods: {
        //打开dialog
        showDialog(id) {
            this.dialogVisible = true;
            this.$nextTick(() => {
                this.getDetailForm(id)
            })
        },
        //关闭dialog
        closeDialog() {
            this.form = {}
            this.dialogVisible = false;
        },
        getDetailForm(id) {
            this.$propertyApi.personManagement.visitor.detail({
                id: id
            })
                .then(res => {
                    if (res.code == 1000) {
                        this.form = res.data
                    } else {
                        this.$$message({
                            message: res.message,
                            type: "error"
                        });
                    }
                });
        }
    },
};
</script>

<style>
</style>
