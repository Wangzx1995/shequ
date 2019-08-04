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
                    <span>楼栋编号</span>
                </el-col>
                <el-col :span="8">
                    <span>{{form.code}}</span>
                </el-col>
                <el-col
                    :span="3"
                    :offset="1"
                >
                    <span>有无电梯</span>
                </el-col>
                <el-col :span="8">
                    <span v-if="form.elevator==1">有</span>
                    <span v-if="form.elevator==2">无</span>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="3">
                    <span>楼栋名称</span>
                </el-col>
                <el-col :span="8">
                    <span>{{form.name}}</span>
                </el-col>
                <el-col
                    :span="3"
                    :offset="1"
                >
                    <span>建筑年代</span>
                </el-col>
                <el-col :span="8">
                    <span>{{form.buildingAge}}</span>
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
                    <span>产权性质</span>
                </el-col>
                <el-col :span="8">
                    <span>{{getItemName(form.nature,natureList, 'dicCode', 'dicName')}}</span>
                </el-col>
            </el-row>
        </el-dialog>
    </div>
</template>

<script>
import { getItemName } from "@/filters/index.js";
export default {
    data() {
        return {
            dialogVisible: false,
            form: {},
            natureList: []
        };
    },
    methods: {
        getItemName,
        //打开dialog
        showDialog(row, list) {
            this.form = row;
            this.natureList = list
            this.dialogVisible = true;
        },
        //关闭dialog
        closeDialog() {
            this.dialogVisible = false;
        },
    },
};
</script>

<style>
</style>
