<template>
    <div>

        <el-dialog
            title="查看"
            center
            :visible.sync="dialogVisible"
            width="800px"
            :modal-append-to-body='false'
            @close="closeDialog()"
        >

            <div
                class="propertyButler-notice"
                v-if="form"
            >
                <h2>{{form.title}}</h2>
                <div class="content">
                    {{form.content}}
                    <br />
                    <br />
                    <br />
                    <p>{{form.issuer}}</p>
                    <p>{{form.issuetime}}</p>
                </div>
            </div>
            <div
                v-else
                class="com-loading-text"
            >数据加载中...</div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            dialogVisible: false,
            form: null
        };
    },
    methods: {
        showDialog(id) {
            this.form = null;
            this.getData(id);
            this.dialogVisible = true;
        },
        closeDialog() {
            this.dialogVisible = false;
        },
        // 查询详情
        getData(id) {
            this.$propertyApi.propertyButler.notice
                .detail({
                    id: id
                })
                .then(res => {
                    if (res.code == 1000) {
                        this.form = res.data;
                    } else {
                        this.$$message({
                            message: res.message
                        });
                    }
                });
        }
    }
};
</script>