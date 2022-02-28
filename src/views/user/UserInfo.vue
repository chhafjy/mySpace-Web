<template>
    <div>
        <el-page-header @back="goBack" content="个人中心">
        </el-page-header>
        <div>
            <el-form label-position="top" label-width="55px" :model="user" class="loginUserInfoContainer">
                <h3>个人信息</h3>
                <el-form-item label="名称：">
                    <el-input v-model="user.userName"></el-input>
                </el-form-item>
                <el-form-item label="电话：">
                    <el-input v-model="user.phone"></el-input>
                </el-form-item>
                <el-form-item label="账号：">
                    <el-input :disabled="modifyAccount" v-model="user.account"></el-input>
                </el-form-item>
                <el-form-item style="text-align: center">
                    <el-button type="primary" @click="updateUserInfo()">保存</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import {getRequest, postRequest} from "../../utils/api";

    export default {
        name: "UserInfo",
        data() {
            return {
                user: {
                    userId: '',
                    userName: '',
                    account: '',
                    phone: '',
                    avatar: ''
                },
                modifyAccount: false
            }
        },
        methods: {
            getUserInfo() {
                getRequest('/login/user/info').then(resp => {
                    console.log(JSON.stringify(resp.data));
                    this.user = resp.data;
                    window.sessionStorage.setItem(this.user.userId, this.user.account);
                    if(this.user.modifyAccount === 1){
                        this.modifyAccount = true;
                    }
                })
            },
            goBack() {
                this.$router.push("/home");
            },
            updateUserInfo(){
                let oldAccount = window.sessionStorage.getItem(this.user.userId);
                if(oldAccount === this.user.account){
                    postRequest('/p/update/user/info', this.user).then(resp =>{
                        if(resp){
                            this.getUserInfo();
                        }
                    });
                }else {
                    this.$confirm('每位用户只有一次修改账号的机会, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                        center: true
                    }).then(() => {
                        postRequest('/p/update/user/info', this.user).then(resp => {
                            if(resp){
                                this.getUserInfo();
                            }
                        });
                        // this.$message({
                        //     type: 'success',
                        //     message: '删除成功!'
                        // });
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消'
                        });
                    });
                }
            }
        },
        mounted() {
            this.getUserInfo();
        }
    }
</script>

<style scoped>
    .loginUserInfoContainer {
        border-radius: 15px;
        background-clip: padding-box;
        margin: 180px auto;
        width: 350px;
        padding: 15px 35px 15px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }
    h3{
        margin:20px auto 40px auto;
        text-align: center;
    }
</style>