// 别名配置
module.exports = {
  configureWebpack: {
    resolve: {
      extensions: [],
        //别名
      alias: {
       'assets': '@/assets',
       'common': '@/common',
       'component': '@/component',
       'network': '@/network',
        'views':'@/views'
      }
    }
  }
}
