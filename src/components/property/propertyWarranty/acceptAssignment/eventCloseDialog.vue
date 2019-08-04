<template>
    <el-dialog
        title="拒绝"
        center
        :visible.sync="dialogVisible"
        width="530px"
        :modal-append-to-body='false'
        @close="closeDialog()"
    >
        <el-form label-width="80px">
            <el-form-item label="拒绝原因">
                <el-input
                    type="textarea"
                    style="width:100%"
                ></el-input>
            </el-form-item>
        </el-form>
        <div
            slot="footer"
            class="dialog-footer"
            style="text-align:center"
        >
            <el-button
                type="info"
                @click="dialogVisible=false"
            >取 消</el-button>
            <el-button
                type="danger"
                @click="dialogVisible=false"
            >确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
export default {
    data() {
        return {
            dialogVisible: false,
            imgUrl: null
        }
    },
    methods: {
        showDialog(id) {
            this.dialogVisible = true
        },
        closeDialog() {
            this.dialogVisible = false
        },
    },
    components: {
    }
}
</script>

<style scoped>
</style>
