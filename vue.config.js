module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://192.168.180.81:30003/api',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
}