module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:1111',
        // changeOrigin: true,
        // changeOrigin 是 当我们请求 'http://11.111.1.22:9711' 这个接口时，设置了 true，则会把我们本地的请求伪装为  'http://11.111.1.22:9711' 去请求 'http://11.111.1.22:9711'，
        // 为 false，本地的 http://localhost:8080 则请求不到
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}