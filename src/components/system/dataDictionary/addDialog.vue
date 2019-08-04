<template>
    <div>
        <el-dialog
            title="新增数据字典"
            :visible.sync="dialogVisible"
            width="800px"
            :modal-append-to-body='false'
            center
        >
            <el-form
                :model="form"
                :rules="rules"
                ref="form"
                label-width="100px"
                class="demo-ruleForm dialog-form"
                label-position="left"
            >
                <el-row>
                    <el-col :span="11">
                        <el-form-item
                            label="类型编码"
                            prop="dataDictionary.typeCode"
                        >
                            <el-input v-model="form.dataDictionary.typeCode"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col
                        :span="11"
                        :offset="1"
                    >
                        <el-form-item
                            label="类型名称"
                            prop="dataDictionary.typeName"
                        >
                            <el-input v-model="form.dataDictionary.typeName"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-table
                    :data="form.dicTypes"
                    border
                    style="margin-bottom:20px"
                    height="400"
                >
                    <el-table-column
                        type="index"
                        label="序号"
                        width="80"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        property="dicName"
                        label="字典名称"
                        align="center"
                    >
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.dicName"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                        property="dicCode"
                        label="字典编码"
                        align="center"
                    >
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.dicCode"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="排序"
                        width="100"
                        align="center"
                    >
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.sort"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        width="100"
                        align="center"
                    >
                        <template slot-scope="scope">
                            <el-button
                                type="danger"
                                icon="icon-x-shanchu"
                                @click="delDicTypes(scope.$index)"
                            ></el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-row>
                    <el-col :span="5">
                        <el-input
                            v-model="newDicType.dicName"
                            placeholder="请输入字典名称"
                        ></el-input>
                    </el-col>
                    <el-col
                        :span="5"
                        :offset="1"
                    >
                        <el-input
                            v-model="newDicType.dicCode"
                            placeholder="请输入字典编码"
                        ></el-input>
                    </el-col>
                    <el-col
                        :span="5"
                        :offset="1"
                    >
                        <el-button
                            type="primary"
                            size="mini"
                            @click="addNewDic()"
                        >添加</el-button>
                    </el-col>
                </el-row>
            </el-form>
            <div
                slot="footer"
                class="dialog-footer"
                style="text-align:center"
            >
                <el-button
                    type="primary"
                    @click="add()"
                >保 存</el-button>
                <el-button @click="dialogVisible = false">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    props: {},
    data() {
        return {
            dialogVisible: false,
            form: {
                dataDictionary: {
                    typeCode: '',
                    typeName: '',
                },
                dicTypes: []
            },
            rules: {
                'dataDictionary.typeCode': [
                    {
                        required: true,
                        message: "请输入类型编码",
                        trigger: "blur"
                    }
                ],
                'dataDictionary.typeName': [
                    {
                        required: true,
                        message: "请输入类型名称",
                        trigger: "blur"
                    }
                ]
            },
            newDicType: {
                dicCode: '',
                dicName: '',
                sort: '',
            },
            dicNum: 0,
        };
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
        //新增操作
        add() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    for (let i in this.form.dicTypes) {
                        this.form.dicTypes[i].typeCode = this.form.dataDictionary.typeCode
                    }
                    this.$systemApi.dataDictionary.dicCreate(this.form)
                        .then(res => {
                            if (res.code == 1000) {
                                this.dialogVisible = false
                                this.$$message({
                                    message: res.message,
                                    type: 'success'
                                })
                                this.$parent.$refs.page.getList(this.$parent.$refs.page.pageIndex);
                                this.$refs.form.resetFields();
                                this.form.dicTypes = []
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
        //添加字典
        addNewDic() {
            this.dicNum = this.form.dicTypes.length + 1;
            this.newDicType.sort = this.dicNum
            this.form.dicTypes.push(this.newDicType)
            this.newDicType = {}
            // let arr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
            // for (let i in arr) {
            //     this.form.dicTypes.push(
            //         {
            //             dicCode: '1017-' + i,
            //             dicName: arr[i],
            //             sort: Number(i) + 1,
            //         }
            //     )
            // }
        },
        //删除字典
        delDicTypes(index) {
            this.form.dicTypes.splice(index, 1)
        },
    },
};
</script>

<style>
</style>
