<template>
	<span>{{ text }}</span>
</template>

<script>
    export default {
        props: {
            // 默认值
            id: [Number, String, Object]
        },
        data () {
            return {
                list: [
                    {
                        id: 1,
                        label: '是'
                    },
                    {
                        id: 2,
                        label: '否'
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