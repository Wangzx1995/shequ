<template>
    <div>
        <el-dialog
            title="编辑住户"
            :visible.sync="dialogVisible"
            width="800px"
            :modal-append-to-body='false'
            center
            class="addZhuHu"
            @close="closeDialog()"
        >
            <div>
                <el-tabs
                    v-model="activeName"
                    @tab-click="handleClick"
                >
                    <el-tab-pane
                        label="住户信息"
                        name="first"
                    >
                        <tabZhuhu
                            ref="tabZhuhu"
                            :form="form"
                        />
                        <!-- :form="{...form, accessoryCard: form.accessoryCard ? form.accessoryCard.split(',') : []}" -->
                    </el-tab-pane>
                    <el-tab-pane
                        label="app权限"
                        name="second"
                    >
                        <tabApp />
                    </el-tab-pane>
                    <el-tab-pane
                        label="续租"
                        name="third"
                    >
                        <tabXuzu />
                    </el-tab-pane>
                </el-tabs>
            </div>
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
import tabZhuhu from "@/components/property/personManagement/household/tabZhuhu";
import tabApp from "@/components/property/personManagement/household/tabApp";
import tabXuzu from "@/components/property/personManagement/household/tabXuzu";

export default {
    props: {
        areaList: Array,
    },
    data() {
        return {
            dialogVisible: false,
            activeName: 'first',
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
                    accessoryCard: row.accessoryCard ? row.accessoryCard.split(',') : [],
                    accessoryPicture: row.accessoryPicture ? row.accessoryPicture.split(',') : [],
                    accessoryContract: row.accessoryContract ? row.accessoryContract.split(',') : [],
                }
            })
        },
        //关闭dialog
        closeDialog() {
            this.$refs.tabZhuhu.$refs.form.resetFields();
            this.dialogVisible = false;
        },
        handleClick(tab, event) {
            console.log(tab, event);
        },
        getForm1(form) {
            console.log(form)
        },
        //编辑操作
        update() {
            let updateForm = {
                ...this.$refs.tabZhuhu.form,
                accessoryCard: this.$refs.tabZhuhu.form.accessoryCard.join(','),
                accessoryContract: this.$refs.tabZhuhu.form.accessoryContract.join(','),
                accessoryPicture: this.$refs.tabZhuhu.form.accessoryPicture.join(','),
            }
            this.$refs.tabZhuhu.$refs.form.validate(valid => {
                if (valid) {
                    this.$propertyApi.personManagement.household.update(updateForm)
                        .then(res => {
                            if (res.code == 1000) {
                                this.dialogVisible = false
                                this.$$message({
                                    message: res.message,
                                    type: 'success'
                                })
                                this.$parent.$refs.page.getList(1);
                                this.$refs.tabZhuhu.$refs.form.resetFields();
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
    },
    components: {
        tabZhuhu,
        tabApp,
        tabXuzu,
    }
};
</script>

<style>
</style>
