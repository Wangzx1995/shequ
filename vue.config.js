module.exports = {
    devServer: {
        proxy: {
            '/apiBase': {
                // 基础
                target: 'http://120.27.194.72:8111',
                // target: 'http://192.168.0.107:8111',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/apiBase': ''
                }
            },
            '/apiProperty': {
                // 物业管理
                target: 'http://120.27.194.72:8116',
                // target: 'http://192.168.0.118:8116',
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
                // 安防
                // target: 'http://120.27.194.72:8112',
                target: 'http://192.168.0.107:8112',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/apiSecurity': ''
                }
            }
        }
    },
}