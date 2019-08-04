<template>
    <el-select
        clearable
        v-model="selected"
        placeholder="请选择"
        @change="onChange"
    >
        <el-option
            v-for="lst in list"
            :label="lst.buildingName"
            :value="lst.buildingId"
            :key="lst.buildingId"
        />
    </el-select>
</template>

<script>
export default {
    props: {
        // 默认值
        value: [Number, String],
        areaId: [Number, String]
    },
    data() {
        return {
            list: [],
            selected: this.value
        }
    },
    mounted() {
        this.getList(0)
    },
    watch: {
        value() {
            this.selected = this.value
        },
        'areaId'() {
            if (this.areaId == '') {
                this.getList(0)

            } else {
                this.getList(this.areaId)
            }
        }
    },
    methods: {
        getList(id) {
            this.$propertyApi.personManagement.household.cascade({
                areaId: id,
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