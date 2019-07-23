<template>
  <div>
    test1 ==============  num: {{ num }}
    <el-button type="primary" @click="num ++">加一</el-button>
    <el-button type="danger" @click="num --">减一</el-button>
  </div>
</template>

<script>
  export default {
    name: 'test1',
    data () {
      return {
        num: 0
      }
    },
    created () {
      
    },
    methods: {
      
    },
    components: {
      
    }
  }
</script>