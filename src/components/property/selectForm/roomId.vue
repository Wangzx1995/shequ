<template>
    <el-select
        clearable
        v-model="selected"
        placeholder="请选择"
        @change="onChange"
    >
        <el-option
            v-for="lst in list"
            :label="lst.roomName"
            :value="lst.roomId"
            :key="lst.roomId"
        />
    </el-select>
</template>

<script>
export default {
    props: {
        // 默认值
        value: [Number, String],
        elementId: [Number, String],
    },
    data() {
        return {
            list: [],
            selected: this.value
        }
    },
    mounted() {
        // this.getList()
    },
    watch: {
        value() {
            this.selected = this.value
        },
        'elementId'() {
            this.getList()
        }
    },
    methods: {
        getList() {
            this.$propertyApi.personManagement.household.cascade({
                elementId: this.elementId,
            }).then((res) => {
                if (res.code == 1000) {
                    this.list = res.data
                }
            })
        },
        onChange(val) {
            this.$emit('input', val)
        }
    }
}
</script>