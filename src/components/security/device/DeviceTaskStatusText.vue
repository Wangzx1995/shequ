<template>
	<span>{{ text }}</span>
</template>

<script>
    export default {
        props: {
            // 默认值
            id: [String, Number]
        },
        data () {
            return {
                list: [
                    {
                        id: 1,
                        label: '待处理'
                    },
                    {
                        id: 2,
                        label: '已派工'
                    },
                    {
                        id: 3,
                        label: '处理中'
                    },
                    {
                        id: 4,
                        label: '已处理'
                    },
                    {
                        id: 5,
                        label: '已撤销'
                    },
                    {
                        id: 6,
                        label: '已结束'
                    }
                ]
            }
        },
        computed: {
            text () {
                const item = this.list.find(v => {
                    return v.id == this.id
                })
                return (item && item.label) || '-'
            }
        }
    }
</script>