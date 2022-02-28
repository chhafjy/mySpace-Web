import axios from "axios";
import { Message } from 'element-ui';
import router from "../router";

//请求拦截器
axios.interceptors.request.use(config => {
    //若已经登录 则携带token
    if (window.sessionStorage.getItem('Authorization')) {
        config.headers['Authorization'] = window.sessionStorage.getItem('Authorization');
    }
    return config;
}, error => {
    console.log(error);
});

//响应拦截器
axios.interceptors.response.use(success => {
    //业务逻辑错误
    if (success.status && success.status == 200) {
        if (success.data.code == 500 || success.data.code == 401 || success.data.code == 403) {
            Message.error({message: success.data.message});
            return;
        }
        // console.log(success.data.code);
        if(success.data.code === 3001){
            return success.data;
        }
        if (success.data.message) {
            Message.success({message: success.data.message})
        }
        // console.log(JSON.stringify(success.data.data));
        return success.data;
    }
}, error => {
    if (error.response.code == 504 || error.response.code == 404) {
        Message.error({message: '服务器被吃了w(ﾟДﾟ)w'});
    } else if (error.response.code == 403) {
        Message.error({message: '权限不够，请联系管理员'});
    } else if (error.response.code == 401) {
        Message.error({message: '未登录ლ(′◉❥◉｀ლ)'});
        router.replace('/');
    } else {
        if (error.response.data.message) {
            Message.error({message: error.response.data.message})
        } else {
            Message.error({message: '未知错误'})
        }
    }
    return;
});
let base = '';
//带JSON参数的post请求
export const postRequest=(url,params)=>{
    return axios({
        method: 'post',
        url: base+url,
        data: params
    });
};

//带JSON参数的get请求
export const getRequest=(url,params)=>{
    return axios({
        method: 'get',
        url: base+url,
        data: params
    });
};

//带JSON参数的put请求
export const putRequest=(url,params)=>{
    return axios({
        method: 'put',
        url: base+url,
        data: params
    });
};

//带JSON参数的delete请求
export const deleteRequest=(url,params)=>{
    return axios({
        method: 'delete',
        url: base+url,
        data: params
    });
};