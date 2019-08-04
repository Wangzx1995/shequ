<template>
    <div>
        <el-dialog
            title="权限配置"
            :visible.sync="dialogVisible"
            :modal-append-to-body='false'
            center
            width="500px"
        >
            <div class="elTree">
                <el-tree
                    :data="data"
                    show-checkbox
                    node-key="id"
                    :props="defaultProps"
                    ref="tree"
                    :default-expanded-keys="[117]"
                >
                </el-tree>
            </div>
            <div
                slot="footer"
                class="dialog-footer"
                style="text-align:center"
            >
                <el-button
                    type="primary"
                    @click="distribution()"
                >保 存</el-button>
                <el-button @click="dialogVisible= false">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
    props: {
        updateForm: Object
    },
    data() {
        return {
            dialogVisible: false,
            defaultProps: {
                children: "childrens",
                label: "menuName"
            },
            data: [],
            form: {},
        }
    },
    mounted() {
        this.getAccess()
    },
    watch: {
        updateForm() {
            this.form = this.updateForm;
            this.getRole()
        }
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
        //查询权限
        getAccess() {
            this.$systemApi.accountManage.accessSelect({
                parentId: -1
            })
                .then(res => {
                    if (res.code == 1000) {
                        this.data = res.data
                    }
                })
        },
        //权限回显
        getRole() {
            this.$systemApi.accountManage.roleGetAccess({
                id: this.form.id
            }).then(res => {
                if (res.code == 1000) {
                    this.$refs.tree.setCheckedKeys((res.data.accessEcho && res.data.accessEcho.split(',')) || []);
                }
            })
        },
        //分配权限
        distribution() {
            if (this.$refs.tree.getHalfCheckedKeys().length == 0) {
                this.form.accessConfig = this.$refs.tree.getCheckedKeys().toString()
            } else {
                this.form.accessConfig = this.$refs.tree.getHalfCheckedKeys() + ',' + this.$refs.tree.getCheckedKeys()
            }
            this.form.accessEcho = this.$refs.tree.getCheckedKeys().toString()
            this.$systemApi.accountManage.roleUpdate(this.form)
                .then(res => {
                    if (res.code == 1000) {
                        this.dialogVisible = false
                        this.$$message({
                            message: res.message,
                            type: 'success'
                        })
                        this.$parent.$refs.page.getList(1);
                    } else {
                        this.$$message({
                            message: res.message,
                            type: 'error'
                        })
                    }
                })
        }
    }
}
</script>

<style lang="less">
.elTree {
    .el-tree-node__expand-icon {
        transform: rotate(0);
    }
    .is-expanded {
        & > .el-tree-node__content {
            .el-icon-caret-right {
                &:before {
                    content: "\e6d8";
                    color: #4390f0;
                    border: 1px solid #4390f0;
                }
            }
        }
    }
    .el-icon-caret-right {
        &:before {
            content: "\e6d9";
            color: #4390f0;
            border: 1px solid #4390f0;
        }
    }
    .is-leaf {
        &:before {
            content: "\e6d8";
            color: #4390f0;
            border: 1px solid #4390f0;
        }
    }
}
</style>

