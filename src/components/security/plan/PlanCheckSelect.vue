<template>
	<el-select v-model="selected" placeholder="请选择" @change="onChange">
    	<el-option
      		v-for="lst in list"
      		:label="lst.label"
      		:value="lst.id"
            :key="lst.id"
            :disabled="lst.id == disabled"
        />
  	</el-select>
</template>

<script>
    export default {
        props: {
            // 默认值
            value: Number,
            disabled: [Number, String, Object]
        },
        data () {
            return {
                list: [
                    {
                        id: 1,
                        label: '通过'
                    },
                    {
                        id: 2,
                        label: '未通过'
                    },
                    {
                        id: 3,
                        label: '待审核'
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