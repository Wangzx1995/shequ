<template>
    <div>
        <el-dialog
            title="查看车辆"
            :visible.sync="dialogVisible"
            width="800px"
            :modal-append-to-body='false'
            center
            class="detailDialog"
            @close="closeDialog()"
        >
            <div>
                <el-row>
                    <el-col :span="3">
                        <span>仓库编号</span>
                    </el-col>
                    <el-col :span="8">
                        <span>{{form.code}}</span>
                    </el-col>
                    <el-col
                        :span="3"
                        :offset="1"
                    >
                        <span>物资分类</span>
                    </el-col>
                    <el-col :span="8">
                        <span>{{form.code}}</span>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="3">
                        <span>仓库名称</span>
                    </el-col>
                    <el-col :span="8">
                        <span>{{form.name}}</span>
                    </el-col>
                    <el-col
                        :span="3"
                        :offset="1"
                    >
                        <span>物资品牌</span>
                    </el-col>
                    <el-col :span="8">
                        <span>{{form.code}}</span>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="3">
                        <span>负责人</span>
                    </el-col>
                    <el-col :span="8">
                        <span>{{form.linkman}}</span>
                    </el-col>
                    <el-col
                        :span="3"
                        :offset="1"
                    >
                        <span>物资数量</span>
                    </el-col>
                    <el-col :span="8">
                        <span>{{form.stallCode}}</span>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="3">
                        <span>联系方式</span>
                    </el-col>
                    <el-col :span="8">
                        <span>{{form.phone}}</span>
                    </el-col>
                    <el-col
                        :span="3"
                        :offset="1"
                    >
                        <span>已领取</span>
                    </el-col>
                    <el-col :span="8">
                        <span>{{form.elementName}}</span>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="3">
                        <span>仓库地址</span>
                    </el-col>
                    <el-col :span="8">
                        <span>{{form.address}}</span>
                    </el-col>
                    <el-col
                        :span="3"
                        :offset="1"
                    >
                        <span>已报废</span>
                    </el-col>
                    <el-col :span="8">
                        <span>{{form.roomName}}</span>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="3">
                        <span>备注</span>
                    </el-col>
                    <el-col :span="8">
                        <span>{{form.remark}}</span>
                    </el-col>
                </el-row>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import DictionaryText from "@/components/common/select/DictionaryText";
export default {
    data() {
        return {
            dialogVisible: false,
            form: {}
        };
    },
    methods: {
        //打开dialog
        showDialog(id) {
            this.dialogVisible = true;
            this.$nextTick(() => {
                this.getDetailForm(id);
            });
        },
        //关闭dialog
        closeDialog() {
            this.form = {};
            this.dialogVisible = false;
        },
        getDetailForm(id) {
            this.$propertyApi.resourceManagement.store
                .detail({
                    id: id
                })
                .then(res => {
                    if (res.code == 1000) {
                        this.form = res.data;
                    } else {
                        this.$$message({
                            message: res.message,
                            type: "error"
                        });
                    }
                });
        }
    },
    components: {
        DictionaryText
    }
};
</script>

<style>
</style>
