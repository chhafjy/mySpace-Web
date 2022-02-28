<template>
    <div>
        <el-container>
            <el-header class="homeHead" style="height: 70px">
                <div class="title">我的空间</div>
                <el-dropdown @command="handleCommand" style="cursor: pointer">
                    <span class="el-dropdown-link">
                        {{user.userName}}<i class="el-icon-arrow-down el-icon--right">
                        <el-avatar class="avatarImg" :size="60" src="" @error="errorHandler">
                            <img :src="user.avatar">
                        </el-avatar>
                        </i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="/user/info">个人中心</el-dropdown-item>
                        <el-dropdown-item command="loginOut">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-header>
            <el-container>
                <el-aside width="200px">
                    <el-menu router>
                        <el-menu-item index="/allDynamic"><i class="fa fa-bookmark-o" aria-hidden="true"/>全部动态
                        </el-menu-item>
                        <el-menu-item index="/myDynamic"><i class="fa fa-bookmark" aria-hidden="true"/>我的动态
                        </el-menu-item>
                        <el-menu-item index="/logBook"><i class="fa fa-book"/>日志</el-menu-item>
                        <el-menu-item index="/myPlan"><i class="fa fa-calendar-check-o"/>计划</el-menu-item>
                        <el-menu-item index="/myFavorites"><i class="fa fa-star"/>我的收藏</el-menu-item>
                        <span v-if="menuMore">
                            <el-menu-item v-for="menu in menus" :index="menu.path"><i :class="menu.icon"/>{{menu.name}}</el-menu-item>
                        </span>
                    </el-menu>
                </el-aside>
                <el-main>
                    <router-view/>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import {getRequest} from "../utils/api";

    export default {
        name: "Home",
        data() {
            return {
                menuMore: false,
                all:'/allDynamic',
                menus: [
                    {
                        path: '',
                        icon: '',
                        name: ''
                    }
                ],
                user: {
                    userId: '',
                    userName:'',
                    account:'',
                    phone:'',
                    avatar:''
                }
            }
        },
        methods: {
            getUserMenus() {
                getRequest('/p/get/user/menu').then(resp => {
                    if (resp.data) {
                        this.menuMore = true;
                    }
                    this.menus = resp.data;
                })
            },
            getUserInfo(){
                getRequest('/login/user/info').then(resp => {
                    console.log(JSON.stringify(resp.data));
                    this.user = resp.data;
                })
            },
            errorHandler(){
                return true;
            },
            handleCommand(command){
                if(command === 'loginOut'){
                    this.$confirm('此操作将退出登录, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                        center: true
                    }).then(() => {
                        this.$message({
                            type: 'success',
                            message: '退出成功!'
                        });
                        getRequest('/user/loginOut');
                        window.sessionStorage.removeItem('Authorization');
                        this.$router.replace('/');
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消'
                        });
                    });
                }else {
                    this.$router.push(command);
                }
            },
            defaultOpen(){
                this.$router.push('/allDynamic');
            }
        },
        mounted() {
            this.getUserMenus();
            // this.defaultOpen();
            this.getUserInfo();
        }
    }
</script>

<style scoped>
    i {
        color: dodgerblue;
        margin: 5px;
    }
    .el-menu-item {
        /*background: bisque;*/
        margin: 5px;
        font-family: 微软雅黑;
    }
    .homeHead {
        background: #409eff;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 15px;
        box-sizing: border-box;
    }
    .title {
        font-size: 30px;
        font-family: 华文楷体;
        color: white;
    }
    .el-dropdown-link {
        cursor: pointer;
        color: white;
        font-size: 15px;
    }
    .el-icon-arrow-down {
        font-size: 12px;
    }
    .el-dropdown-link  .avatarImg{
        margin: 8px;
        vertical-align:middle;
    }
</style>