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
            value: [String, Number]
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