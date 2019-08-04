<template>
    <div>
        <el-dialog
            title="新增住户"
            :visible.sync="dialogVisible"
            width="800px"
            :modal-append-to-body='false'
            center
            @close="closeDialog()"
        >
            <div>
                <tabXuzu ref="tabXuzu" />
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
import tabXuzu from "@/components/property/personManagement/household/tabXuzu";

export default {

    data() {
        return {
            dialogVisible: false,
            form: {}
        };
    },
    methods: {
        //打开dialog
        showDialog(row) {
            this.dialogVisible = true;
            this.$nextTick(() => {
                this.form = {
                    ...row
                }
            })
        },
        //关闭dialog
        closeDialog() {
            this.dialogVisible = false;
        },
        //新增操作
        add() {
            this.$refs.tabXuzu.$refs.form.validate(valid => {
                if (valid) {
                    let xuzuForm = {
                        ...this.$refs.tabXuzu.form,
                        accessoryContract: this.$refs.tabXuzu.form.accessoryContract.join(','),
                        userId: this.form.id
                    }
                    this.$propertyApi.personManagement.household
                        .addContinue(xuzuForm)
                        .then(res => {
                            if (res.code == 1000) {
                                this.dialogVisible = false;
                                this.$$message({
                                    message: res.message,
                                    type: "success"
                                });
                                this.$parent.$refs.page.getList(1);
                                this.$refs.tabXuzu.$refs.form.resetFields();
                            } else {
                                this.$$message({
                                    message: res.message,
                                    type: "error"
                                });
                            }
                        })
                }
            })
        }
    },
    components: {
        tabXuzu
    }
};
</script>

<style>
</style>
