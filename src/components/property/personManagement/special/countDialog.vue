<template>
    <div>
        <el-dialog
            title="上门记录"
            :visible.sync="dialogVisible.detail"
            width="800px"
            :modal-append-to-body='false'
            center
            @close="closeDialog()"
        >
            <div class="dialogBody specialPeople">
                <el-form
                    :inline="true"
                    :model="form"
                    class="demo-form-inline"
                    label-position="left"
                    ref="form"
                >
                    <el-form-item label="入住时间">
                        <el-date-picker
                            v-model="form.timeValue"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="合同开始日"
                            end-placeholder="合同结束日"
                            value-format="yyyy-MM-dd"
                        >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button
                            type="primary"
                            @click="getList()"
                        >查询<i class="icon-x-sousuo el-icon--right"></i></el-button>
                    </el-form-item>
                </el-form>
                <div class="com-main-inner">

                    <div class="com-main-inner-table">
                        <el-table
                            :data="list"
                            stripe
                            border
                            style="width: 100%"
                            :header-cell-style="{background:'#effbfb',color:'#1e1e1e',padding:'0'}"
                            :cell-style="{padding:'0',color:'#999999'}"
                        >
                            <el-table-column
                                prop="visittime"
                                label="上门时间"
                                align="center"
                            >
                            </el-table-column>
                            <el-table-column
                                label="状态"
                                align="center"
                            >
                                <template slot-scope="scope">
                                    <span v-if="scope.row.status==1">未到访</span>
                                    <span v-if="scope.row.status==2">已到访</span>
                                    <span v-if="scope.row.status==3">已结束</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="workName"
                                label="上门人员"
                                align="center"
                            >
                            </el-table-column>
                            <el-table-column
                                label="操作"
                                width="100"
                                align="center"
                            >
                                <template slot-scope="scope">
                                    <el-button
                                        type="primary"
                                        @click="openDetail(scope.row)"
                                    >查看</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
        </el-dialog>
        <el-dialog
            width="30%"
            title="查看"
            :visible.sync="dialogVisible.innerVisible"
            :modal-append-to-body='false'
            class="updateDialog"
            center
        >
            <div class="dialogBody">
                <el-row>
                    <el-col :span="6">
                        <span>姓名</span>
                    </el-col>
                    <el-col :span="16">
                        <span>{{row.userName}}</span>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <span>上门人员</span>
                    </el-col>
                    <el-col :span="16">
                        <span>{{row.workName}}</span>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <span>上门时间</span>
                    </el-col>
                    <el-col :span="16">
                        <span>{{row.visittime}}</span>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <span>记录内容</span>
                    </el-col>
                    <el-col :span="16">
                        <span>{{row.content}}</span>
                    </el-col>
                </el-row>
            </div>
        </el-dialog>
    </div>
</template>

<script>

export default {
    data() {
        const _this = this
        return {
            dialogVisible: {
                detail: false,
                innerVisible: false
            },
            form: {
                id: null,
                startTime: null,
                endTime: null,
                timeValue: null,
            },
            list: [],
            row: {}
        };
    },
    watch: {
        "form.timeValue"() {
            if (!this.form.timeValue) {
                this.form.startTime = null;
                this.form.endTime = null;
            } else {
                this.form.startTime = this.form.timeValue[0];
                this.form.endTime = this.form.timeValue[1];
            }
        },
    },
    methods: {
        //打开dialog
        showDialog(row) {
            this.dialogVisible.detail = true;
            this.$nextTick(() => {
                console.log(row)
                this.form.id = row.id
                this.getList()
            })
        },
        //关闭dialog
        closeDialog() {
            this.form = {};
            this.list = [];
            this.dialogVisible.detail = false;
        },
        openDetail(row) {
            this.dialogVisible.innerVisible = true;
            this.row = row
        },
        //查询/获取List
        getList() {
            // if (!this.form.startTime) {
            //     return
            // }
            this.$propertyApi.personManagement.special
                .list({
                    id: this.form.id,
                    startTime: this.form.startTime,
                    endTime: this.form.endTime,
                })
                .then(res => {
                    if (res.code == 1000) {
                        this.list = res.data;
                    } else {
                        this.$$alert({
                            message: res.msg,
                            type: "error"
                        });
                    }
                });
        },
    },
    components: {

    }
};
</script>


