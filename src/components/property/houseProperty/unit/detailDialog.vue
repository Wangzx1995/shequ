<template>
    <div>
        <el-dialog
            title="查看详情"
            :visible.sync="dialogVisible"
            width="800px"
            :modal-append-to-body='false'
            center
            class="updateDialog"
            @close="closeDialog()"
        >
            <el-row>
                <el-col :span="3">
                    <span>单元编号</span>
                </el-col>
                <el-col :span="8">
                    <span>{{form.code}}</span>
                </el-col>
                <el-col
                    :span="3"
                    :offset="1"
                >
                    <span>所属片区</span>
                </el-col>
                <el-col :span="8">
                    <span>{{form.areaName}}</span>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="3">
                    <span>单元名称</span>
                </el-col>
                <el-col :span="8">
                    <span>{{form.name}}</span>
                </el-col>
                <el-col
                    :span="3"
                    :offset="1"
                >
                    <span>所属楼栋</span>
                </el-col>
                <el-col :span="8">
                    <span>{{form.buildingName}}</span>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="3">
                    <span>楼层</span>
                </el-col>
                <el-col :span="8">
                    <span>{{form.floorNumber}}</span>
                </el-col>
            </el-row>
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
            this.form = row
            this.dialogVisible = true;
        },
        //关闭dialog
        closeDialog() {
            this.form = {}
            this.dialogVisible = false;
        },
    },
};
</script>

<style>
</style>
