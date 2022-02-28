<template>
    <div>
        <el-form ref="loginForm" :rules="loginRules" :model="loginForm" class="loginContainer">
            <h3 class="loginTitle">登录系统</h3>
            <el-form-item prop="username">
                <el-input type="text" auto-complete="false" v-model="loginForm.account"
                          placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" auto-complete="false" v-model="loginForm.password"
                          placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item prop="captcha">
                <div>
                <el-input type="text" auto-complete="false" v-model="loginForm.captcha" placeholder="点击图片更换验证码"
                          style="width: 210px; vertical-align:middle;margin-right: 10px"></el-input>
                <img :src="captchaUrl" style="vertical-align:middle;" @click="updateCaptcha()">
                </div>
            </el-form-item>
<!--            <el-checkbox v-model="checked" class="loginRemember">注册用户</el-checkbox>-->
            <el-link type="primary" class="loginRemember" @click="$router.push('/register/user')">注册用户</el-link>
            <el-button type="primary" style="width: 100%" @click="loginSubmit()">登录</el-button>
        </el-form>
    </div>
</template>

<script>
    import {postRequest} from "../utils/api";

    export default {
        name: "Login",
        data() {
            return {
                captchaUrl: '/login/captcha?time=' + new Date(),
                loginForm: {
                    account: 'admin',
                    password: '123456',
                    captcha: ''
                },
                loginRules: {
                    account: [{required: true, message: '请输入用户名', trigger: 'blur'}],
                    password: [{required: true, message: '请输入密码', trigger: 'blur'}],
                    captcha: [{required: true, message: '请输入验证码', trigger: 'blur'}]
                },
                checked: true,
            }
        },
        methods: {
            updateCaptcha() {
                this.captchaUrl = '/login/captcha?time=' + new Date();
            },
            loginSubmit() {
                this.$refs.loginForm.validate((valid) => {
                    if (valid) {
                        postRequest('/user/login',this.loginForm).then(resp=>{
                            if(resp){
                                window.sessionStorage.setItem('Authorization', resp.data);
                                this.$router.replace('/home');
                            }
                        })
                    } else {
                        this.$message({
                            showClose: true,
                            message: '请正确填写信息',
                            type: 'error'
                        });
                        return false;
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .loginContainer {
        border-radius: 15px;
        background-clip: padding-box;
        margin: 180px auto;
        width: 350px;
        padding: 15px 35px 15px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }

    .loginTitle {
        margin: 0px auto 40px auto;
        text-align: center;
    }

    .loginRemember {
        text-align: right;
        margin: 0px 0px 10px 0px;
    }
</style>