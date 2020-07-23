module.exports = {
  configureWebpack: {

    //解决路径相关
    resolve: {

      //别名 @ =  src( cli3 中 )
      alias: {
        'components': '@/components',
        'content': 'components/content',
        'common': 'components/common',
        'assets': '@/assets',
        'network': '@/network',
        'views': '@/views',
      }
    }
  }
}
