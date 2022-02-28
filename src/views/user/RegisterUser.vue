<template>
    <div>
        <el-form :model="registerUser" status-icon :rules="rules" ref="registerUser" label-width="100px"
                 class="register-ruleForm">
            <h3 class="registerTitle">用户注册</h3>
            <el-form-item label="姓名：" prop="userName">
                <el-input v-model.number="registerUser.userName"></el-input>
            </el-form-item>
            <el-form-item label="手机号：" prop="phone">
                <el-input v-model.number="registerUser.phone"></el-input>
            </el-form-item>
            <el-form-item label="密码：" prop="password">
                <el-input type="password" v-model="registerUser.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码：" prop="checkPass">
                <el-input type="password" v-model="registerUser.checkPass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="register">提交</el-button>
                <el-button @click="resetForm('registerUser')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {postRequest} from "../../utils/api";

    export default {
        name: "RegisterUser",
        data() {
            let validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                }
            };
            let validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.registerUser.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                registerUser: {
                    userName: '',
                    password: '',
                    checkPass: '',
                    phone: ''
                },
                rules: {
                    // password: [
                    //     {required: true, validator: validatePass, trigger: 'blur'}
                    // ],
                    checkPass: [
                        {required: true, validator: validatePass2, trigger: 'blur'}
                    ],
                    phone: [
                        {required: true, message: '手机号不能为空', trigger: 'blur'},
                        {pattern: /^1[3456789]\d{9}$/, message: '手机号格式不正确', trigger: 'blur'}
                    ],
                    userName: [
                        {required: true, message: '用户名不能为空', trigger: 'blur'}
                    ]
                }
            };
        },
        methods:{
            register(){
                console.log(111111111111);
                this.$refs.registerUser.validate((valid)=>{
                    if(valid){
                        postRequest('/p/register/login/user', this.registerUser);
                        this.$router.replace("/");
                    }else {
                        this.$message({
                            showClose: true,
                            message: '请正确填写信息',
                            type: 'error'
                        });
                        return false
                    }
                })
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style scoped>
    .register-ruleForm {
        border-radius: 15px;
        background-clip: padding-box;
        margin: 180px auto;
        width: 350px;
        padding: 15px 35px 15px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }
    .registerTitle{
        margin: 20px auto 30px auto;
        text-align: center;
    }
    .el-form-item{
        align-items: center;
    }
</style>