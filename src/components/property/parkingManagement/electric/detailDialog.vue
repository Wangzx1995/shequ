<template>
    <div>
        <el-dialog
            title="查看电动车"
            :visible.sync="dialogVisible"
            width="800px"
            :modal-append-to-body='false'
            center
            class="detailDialog"
            @close="closeDialog()"
        >
            <div>
                <el-divider content-position="left">车辆信息</el-divider>
                <el-row>
                    <el-col :span="3">
                        <span>车牌号</span>
                    </el-col>
                    <el-col :span="8">
                        <span>{{form.plateNumbers}}</span>
                    </el-col>
                    <el-col
                        :span="3"
                        :offset="1"
                    >
                        <span>车架号</span>
                    </el-col>
                    <el-col :span="8">
                        <span>{{form.vin}}</span>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="3">
                        <span>车辆照片</span>
                    </el-col>
                    <el-col :span="8">
                        <span>
                            <img
                                v-imgPreview
                                v-for="item in form.accessoryCar"
                                :key="item"
                                :src="$joinImgPrefix(item)"
                            >
                        </span>
                    </el-col>
                    <el-col
                        :span="3"
                        :offset="1"
                    >
                        <span>设备识别号</span>
                    </el-col>
                    <el-col :span="8">
                        <span>{{form.pfid}}</span>
                    </el-col>
                </el-row>
                <el-divider content-position="left">关联房屋</el-divider>
                <el-row>
                    <el-col :span="3">
                        <span>车主名称</span>
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
        showDialog(row) {
            this.dialogVisible = true;
            this.$nextTick(() => {
                this.form = {
                    ...row,
                    accessoryCar: row.accessoryCar ? row.accessoryCar.split(',') : [],
                }
            })
        },
        //关闭dialog
        closeDialog() {
            this.form = {}
            this.dialogVisible = false;
        }
    },
    components: {
    }
};
</script>

<style>
</style>
