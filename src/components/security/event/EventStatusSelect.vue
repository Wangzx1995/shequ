<template>
	<el-select v-model="selected" placeholder="请选择" @change="onChange">
    	<el-option
      		v-for="lst in list"
      		:label="lst.label"
      		:value="lst.id"
            :key="lst.id"
        />
  	</el-select>
</template>

<script>
    export default {
        props: {
            // 默认值
            value: Number
        },
        data () {
            return {
                list: [
                    {
                        id: 1,
                        label: '待受理'
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
                        label: '预案处理'
                    },
                    {
                        id: 6,
                        label: '已撤销'
                    },
                    {
                        id: 7,
                        label: '已结束'
                    }
                ],
                selected: this.value
            }
        },
		watch: {
			value () {
				this.selected = this.value
			}
		},
        methods: {
			onChange (dicCode) {
				this.$emit('input', dicCode)
			}
        }
    }
</script>