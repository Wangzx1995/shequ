<template>
    <div>
        <el-dialog
            title="查看详情"
            :visible.sync="dialogVisible"
            width="400px"
            :modal-append-to-body='false'
            center
            class="detailDialog"
            @close="closeDialog()"
        >
            <el-row>
                <el-col :span="8">
                    <span>停车场编号</span>
                </el-col>
                <el-col :span="16">
                    <span>{{form.code}}</span>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <span>停车场名称</span>
                </el-col>
                <el-col :span="16">
                    <span>{{form.name}}</span>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <span>固定车位数</span>
                </el-col>
                <el-col :span="16">
                    <span>{{form.settledStall}}</span>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <span>总车位数</span>
                </el-col>
                <el-col :span="16">
                    <span>{{form.totalStall}}</span>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <span>备注</span>
                </el-col>
                <el-col :span="16">
                    <span>{{form.remark}}</span>
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
            this.natureList = list;
            this.dialogVisible = true;
        },
        //关闭dialog
        closeDialog() {
            this.dialogVisible = false;
        }
    }
};
</script>

<style>
</style>
