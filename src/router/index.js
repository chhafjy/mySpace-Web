import Vue from 'vue'
import VueRouter from 'vue-router';
import Login from "../views/Login";
import Home from "../views/Home";
import AllDynamic from "../views/dynamic/AllDynamic";
import MyDynamic from "../views/dynamic/MyDynamic";
import LogBook from "../views/dynamic/LogBook";
import MyPlan from "../views/dynamic/MyPlan";
import MyFavorites from "../views/dynamic/MyFavorites";
import UserList from "../views/dynamic/UserList";
import UserInfo from "../views/user/UserInfo";
import RegisterUser from "../views/user/RegisterUser";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login
    },
    {
        path: '/home',
        name: 'Home',
        component: Home,
        children: [
            {
                path: '/allDynamic',
                name: 'AllDynamic',
                component: AllDynamic
            },
            {
                path: '/myDynamic',
                name: 'MyDynamic',
                component: MyDynamic
            },
            {
                path: '/logBook',
                name: 'LogBook',
                component: LogBook
            }, {
                path: '/myPlan',
                name: 'MyPlan',
                component: MyPlan
            },
            {
                path: '/myFavorites',
                name: 'MyFavorites',
                component: MyFavorites
            },
            {
                path: '/userList',
                name: 'UserList',
                component: UserList
            }, {
                path: '/user/info',
                name: 'UserInfo',
                component: UserInfo
            }
        ]
    }, {
        path: '/register/user',
        name: 'RegisterUser',
        component: RegisterUser
    }
];

const router = new VueRouter({
    routes
});

export default router
