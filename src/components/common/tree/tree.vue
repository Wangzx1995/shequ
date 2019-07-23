<template>
    <div class="elTree">
        <el-tree
            :data="data"
            show-checkbox
            node-key="id"
            :props="defaultProps"
            ref="tree"
        >
        </el-tree>
        <el-button
            type="primary"
            @click="getKeys()"
        >主要按钮</el-button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            defaultProps: {
                children: "childrens",
                label: "menuName"
            },
            data: [],
        }
    },
    mounted() {
        this.getAccess()
    },
    methods: {
        //查询权限
        getAccess() {
            this.$systemApi.accountManage.accessSelect({
                parentId: -1
            })
                .then(res => {
                    if (res.code == 1000) {
                        this.data = res.data
                        // console.log(res)
                    }
                })
        },
        getKeys() {
            console.log(this.$refs.tree.getHalfCheckedKeys().length == 0)
            if (this.$refs.tree.getHalfCheckedKeys().length == 0) {
                return this.$refs.tree.getCheckedKeys().toString()
            } else {
                return this.$refs.tree.getHalfCheckedKeys() + ',' + this.$refs.tree.getCheckedKeys()
            }
        },
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

