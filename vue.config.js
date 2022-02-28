let proxyObj = {};

proxyObj['/'] = {
    //websocket
    ws: false,
    //目标地址
    target: 'http://localhost:8085',
    //发送请求头host会被设置成target
    changeOrigin: true,
    pathRewrite: {
        '^/': '/'
    }
};




module.exports = {
    devServer: {
        host:'localhost',
        port: 8088,   // 端口号
        proxy:proxyObj
    }
};
