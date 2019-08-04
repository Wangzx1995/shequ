<template>
    <el-dialog class="select-user-dlg full-footer" title="请选择" :visible.sync="visible" append-to-body center width="546px">
        <el-transfer
            style="text-align: left; display: inline-block"
            v-model="value4"
            filterable
            :left-default-checked="leftDefault"
            :right-default-checked="rightDefault"
            :titles="['未选择', '已选择']"
            :props="props"
            @change="handleChange"
            :data="list"
        />
    </el-dialog>
</template>

<script>
    export default {
        data () {
            return {
                visible: true,
                list: [],
                leftDefault: [2, 3],
                rightDefault: [1],
                props: {
                    key: 'id',
                    label: 'dutyName'
                },
                value: [1],
                value4: [1],
                renderFunc(h, option) {
                    return <span>{ option.key } - { option.label }</span>
                }
            }
        },
        mounted () {
            this.$systemApi.estateManage.staffSelect({
                pageNum: 1,
                pageSize: 999
            }).then(res => {
                this.list = res.data.list
            })
        },
        methods: {
            handleChange () {}
        },
        components: {
            
        }
    }
</script>