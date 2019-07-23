module.exports = {
    devServer: {
        proxy: {
            '/apiProperty': {
                // 物业管理
                target: 'http://192.168.0.118:7000',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/apiProperty': ''
                }
            },
            '/apiSystem': {
                // 平台配置
                target: 'http://120.27.194.72:8111',
                // target: 'http://192.168.0.107:8111',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/apiSystem': ''
                }
            },
            '/apiSecurity': {
                // 平台配置
                target: 'http://192.168.0.107:8112',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/apiPrefixSecurity': ''
                }
            }
        }
    },
}