<template>
  <div>
    <el-form ref="form" :model="form" :rules="rules" style="width:400px;margin:50px auto;">
        <el-form-item prop="account">
            <el-input v-model="form.account" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
            <el-input v-model="form.password" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" style="width:100%;" @click="commit">登录</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        form: {
          account: null,
          password: null
        },
        rules: {
          account: [
              {
                  required: true,
                  trigger: 'blur',
                  message: '请输入账号'
              }
          ],
          password: [
              {
                  required: true,
                  trigger: 'blur',
                  message: '请输入密码'
              }
          ]
        }
      }
    },
    methods: {
      commit () {
        this.$refs.form.validate(valid => {
          if (valid) {
            this.$store.dispatch('login', {
              account: this.form.account,
              password: this.form.password
            }).then(res => {
                
              if (this.$route.query.redirectUrl) {
                location.replace(decodeURIComponent(this.$route.query.redirectUrl))
              } else {
                location.replace('/')
              }
            }).catch(err => {
              this.$$message({
                message: err,
                type: 'warning'
              })
            })
          }
        })
      }
    }
  }
</script>

<style scoped>
  
</style>
