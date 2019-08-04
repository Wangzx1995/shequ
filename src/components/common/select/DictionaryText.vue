<template>
    <span>{{ text }}</span>
</template>

<script>
export default {
    props: {
        // 类型编码
        typeCode: Number,
        // 默认值
        dicCode: [String, Number]
    },
    data() {
        return {
            list: []
        }
    },
    mounted() {
        this.getList()
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
        }
    },
    computed: {
        text() {
            const item = this.list.find(v => {
                return v.dicCode === this.dicCode
            })
            return (item && item.dicName) || '-'
        }
    }
}
</script>