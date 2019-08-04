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
                        label: '是'
                    },
                    {
                        id: 2,
                        label: '否'
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
			onChange (id) {
				this.$emit('input', id)
			}
        }
    }
</script>