<template>
	<el-dialog title="结束事件" center :visible.sync="visible" width="530px" append-to-body>
        <el-form :model="form" label-width="80px">
            <el-form-item label="结束原因">
                <el-input type="textarea" style="width:100%"></el-input>
            </el-form-item>
            <el-form-item>
                <div>d</div>
            </el-form-item>
        </el-form>
        <div slot="footer">
            <el-button class="custom-mini" @click="dialogVisible = false">取 消</el-button>
            <el-button class="custom-mini" type="primary" @click="dialogVisible = false">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
    export default {
        data () {
            return {
                visible: true
            }
        },
        created () {
            
        },
        methods: {
            open () {
                this.visible = true
            },
            close () {
                this.visible = false
            }
        },
        components: {
            
        }
    }
</script>

<style scoped>
    
</style>
