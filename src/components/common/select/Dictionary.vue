<template>
    <el-select
        clearable
        v-model="selected"
        placeholder="请选择"
        @change="onChange"
    >
        <el-option
            v-for="lst in list"
            :label="lst.dicName"
            :value="lst.dicCode"
            :key="lst.dicCode"
        />
    </el-select>
</template>

<script>
export default {
    props: {
        // 类型编码
        typeCode: Number,
        // 默认值
        value: String
    },
    data() {
        return {
            list: [],
            selected: this.value
        }
    },
    mounted() {
        this.getList()
    },
    watch: {
        value() {
            this.selected = this.value
        }
    },
    methods: {
        getList() {
            // 不刷新的情况下只请求一次
            if (!window._dictionary) {
                window._dictionary = {}
            }
            if (window._dictionary[this.typeCode]) {
                this.list = window._dictionary[this.typeCode]
            } else {
                this.$systemApi.dataDictionary.typeToDic({
                    typeCode: this.typeCode
                }).then((res) => {
                    if (res.code == 1000) {
                        this.list = res.data
                        window._dictionary[this.typeCode] = res.data
                    }
                })
            }
        },

        onChange(dicCode) {
            this.$emit('input', dicCode)
        }
    }
}
</script>