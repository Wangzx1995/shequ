<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    watch: {
      '$route' () {
        // this.setTheme()
      }
    },
    created () {
      this.setTheme()
    },
    methods: {
      setTheme () {
        switch (this.$route.fullPath) {
          case '/test1': {
            console.log(1)
            require('@/style/theme/default/index.css')
            break
          }
          case '/test2': {
            console.log(2)
            require('@/style/theme/21B2C6/index.css')
            break
          }
          default: {
            console.log(3)
            require('@/style/theme/default/index.css')
          }
        }
      }
    }
  }
</script>
