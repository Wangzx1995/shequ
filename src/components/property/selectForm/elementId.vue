<template>
    <el-select
        clearable
        v-model="selected"
        placeholder="请选择"
        @change="onChange"
    >
        <el-option
            v-for="lst in list"
            :label="lst.elementName"
            :value="lst.elementId"
            :key="lst.elementId"
        />
    </el-select>
</template>

<script>
export default {
    props: {
        // 默认值
        value: [Number, String],
        buildingId: [Number, String]
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
        'buildingId'() {
            this.getList()
        }
    },
    methods: {
        getList() {
            this.$propertyApi.personManagement.household.cascade({
                buildingId: this.buildingId
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