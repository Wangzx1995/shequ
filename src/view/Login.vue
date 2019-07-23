<template>
    <div class="login-container">
        <div class="login-main">
            <div class="login-header"></div>
            <div class="login-content">
                <ul>
                    <li>
                        <div>
                            <i class="el-icon-user-solid"></i>
                            <input type="text" placeholder="请输入账号" v-model="account" @input="handleInput(1)">
                        </div>
                        <p>{{ message1 }}</p>
                    </li>
                    <li>
                        <div>
                            <i class="el-icon-unlock"></i>
                            <input type="password" placeholder="请输入密码" v-model="password" @input="handleInput(2)">
                        </div>
                        <p>{{ message2 }}</p>
                    </li>
                    <li>
                        <div class="login-valid-input">
                            <div>
                                <i class="el-icon-unlock"></i>
                                <input type="text" placeholder="请输入验证码" v-model="checkCode" @input="handleInput(3)">
                            </div>
                            <img src="" alt="" class="login-valid-img">
                        </div>
                        <p>{{ message3 }}</p>
                    </li>
                    <li class="login-ext">
                        <label>
                            <input type="checkbox">记住密码
                        </label>
                        <a href="javascript:void(0);">忘记密码</a>
                    </li>
                    <li>
                        <button class="login-btn" @click="commit">登录</button>
                    </li>
                </ul>
            </div>
        </div>
    <!-- <el-form ref="form" :model="form" :rules="rules" style="width:400px;margin:50px auto;">
        <el-form-item prop="account">
            <el-input v-model="form.account" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
            <el-input v-model="form.password" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" style="width:100%;" @click="commit">登录</el-button>
        </el-form-item>
    </el-form> -->
        <p class="login-copyright">copyright © {{ year }}浙江微风智能科技有限公司 版权所有</p>
    </div>
</template>

<script>
    import utils from '@/utils/'
    export default {
        data () {
            return {
                year: new Date().getFullYear(),
                account: null,
                password: null,
                checkCode: null,
                message1: null,
                message2: null,
                message3: null,
            }
        },
        methods: {
            commit () {
                this.validate(valid => {
                    if (valid) {
                        this.$store.dispatch('login', {
                            account: this.account,
                            password: this.password
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
            },
            // 表单验证
            validate (callback) {
                if (utils.isEmpty(this.account)) {
                    this.message1 = '请输入账号'
                }
                if (utils.isEmpty(this.password)) {
                    this.message2 = '请输入密码'
                }
                if (utils.isEmpty(this.checkCode)) {
                    this.message3 = '请输入验证码'
                }
                if (!utils. isEmpty(this.account) && !utils.isEmpty(this.password) && !utils.isEmpty(this.checkCode)) {
                    callback(true)
                } else {
                    callback(false)
                }
            },
            // 表单输入
            handleInput (num) {
                this[`message${num}`] = null
            }
        }
    }
</script>

<style scoped>
    .login-container {
        position: fixed;
        width: 100%;
        height: 100%;
        background: url('/static/images/login-bg.png') no-repeat center;
        background-size: cover;
        background-attachment: fixed;
    }
    .login-main {
        width: 450px;
        overflow: hidden;
        position: absolute;
        top: 50%;
        right: 315px;
        margin-top: -273px;
        border-radius: 4px;
    }
    .login-header {
        height: 90px;
        width: 100%;
        background: rgba(0, 0, 0, .38) url(/static/images/login-logo.png) no-repeat center;
    }
    .login-content {
        padding: 35px 55px;
        background: rgba(255, 255, 255, .2);
    }
    .login-content li > div {
        height: 60px;
        background: #fff;
    }
    .login-content li > div input {
        width: calc(100% - 60px);
        height: 60px;
        font-size: 16px;
        border: none;
        vertical-align: middle;
    }
    .login-content li > div i {
        width: 60px;
        height: 60px;
        text-align: center;
        font-size: 25px;
        color: #c8c8c8;
        vertical-align: middle;
        line-height: 60px;
    }
    .login-content li  p {
        height: 35px;
        padding-left: 30px;
        line-height: 35px;
        font-size: 16px;
        color: #ec2a17;
    }
    .login-valid-input {
        display: flex;
        justify-content: space-between;
        background: none!important;
    }
    .login-valid-input > div {
        width: 220px;
        background: #fff;
    }
    .login-valid-img {
        width: 100px;
        height: 60px;
        background: #fff;
    }
    .login-ext {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
    }
    .login-ext * {
        font-size: 16px;
        color: #fff;
        vertical-align: middle
    }
    .login-ext input {
        margin-right: 8px;
    }
    .login-btn {
        width: 100%;
        height: 60px;
        border-radius: 4px;
        background: #063956;
        border: none;
        color: #fff;
        font-size: 20px;
        cursor: pointer;
    }
    .login-copyright {
        position: absolute;
        right: 0;
        left: 0;
        bottom: 25px;
        font-size: 14px;
        font-family: simsun;
        text-align: center;
        color: #fff;
    }
</style>
