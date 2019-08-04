<template>
    <div>
        <el-form
            :model="form"
            :rules="rules"
            ref="form"
            label-width="110px"
            class="demo-ruleForm dialog-form"
            label-position="left"
        >
            <el-row>
                <el-col :span="11">
                    <el-form-item
                        label="用户名"
                        prop="areaId"
                    >
                        <el-input v-model="form.code"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="11">
                    <el-form-item
                        label="是否开通"
                        prop="areaId"
                    >
                        <el-radio-group v-model="form.sex">
                            <el-radio :label="1">是</el-radio>
                            <el-radio :label="2">否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="11">
                    <el-form-item
                        label="开通时间"
                        prop="certificateImg"
                    >
                        <el-date-picker
                            v-model="form.code"
                            type="date"
                            placeholder="选择日期"
                        >
                        </el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-divider></el-divider>
        </el-form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {},
            rules: {
            },
        }
    }
}
</script>

<style>
</style>
