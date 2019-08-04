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
                        id: 2,
                        label: '离线'
                    },
                    {
                        id: 3,
                        label: '故障'
                    }
                ]
            }
        },
        computed: {
            text () {
                const item = this.list.find(v => {
                    return v.id === this.id
                })
                return (item && item.label) || '-'
            }
        }
    }
</script>