<template>
  <el-dialog title="修改密码" :visible.sync="visible" @close="onClose" :append-to-body="true" width="420px">
    <el-form :model="form" :rules="rules" ref="form" label-width="80px">
      <el-form-item prop="oldPsd" label="旧密码">
        <el-input type="password" v-model="form.oldPsd" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item prop="newPsd" label="新密码">
        <el-input type="password" v-model="form.newPsd" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item prop="confirmPsd" label="确认密码">
        <el-input type="password" v-model="form.confirmPsd" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="commit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      form: {
        oldPsd: null,
        newPsd: null,
        confirmPsd: null
      },
      rules: {
        oldPsd: [
          {
            required: true,
            message: "请输入旧密码",
            trigger: "blur"
          },
          {
            min: 6,
            max: 20,
            message: "长度在 6 到 20 个字符",
            trigger: "blur"
          }
        ],
        newPsd: [
          {
            required: true,
            message: "请输入新密码",
            trigger: "blur"
          },
          {
            min: 6,
            max: 20,
            message: "长度在 6 到 20 个字符",
            trigger: "blur"
          }
        ],
        confirmPsd: [
          {
            required: true,
            message: "请再次输入新密码",
            trigger: "blur"
          },
          {
            min: 6,
            max: 20,
            message: "长度在 6 到 20 个字符",
            trigger: "blur"
          }
        ]
      }
    }
  },
  methods: {
    onOpen() {
      this.visible = true
    },
    onClose() {
      this.visible = false
      this.$refs.form.resetFields()
    },
    commit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.form.confirmPsd != this.form.newPsd) {
            this.$$alert({
              message: '两次密码不一致！',
              type: 'error'
            })
          } else {
            this.$api.admin
              .updatePsd(
                this.$base64.encode(this.form.oldPsd),
                this.$base64.encode(this.form.newPsd)
              )
              .then(res => {
                if (res.code == 0) {
                  this.$$alert({
                    message: "密码修改成功，请重新登录。",
                    type: "success",
                    showClose: false
                  }).then(() => {
                    this.$store.dispatch("logout").then(() => {
                      this.$router.push({
                        path: "/login",
                        query: {
                          redirectUrl: location.href
                        }
                      })
                    })
                  })
                } else {
                  this.$$alert({
                    message: res.msg,
                    type: 'error'
                  })
                }
              })
          }
        }
      })
    }
  }
}
</script>