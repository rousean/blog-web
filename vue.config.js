// 配置信息
const path = require('path')
const HotHashWebpackPlugin = require('hot-hash-webpack-plugin')
const WebpackBar = require('webpackbar')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  productionSourceMap: false,
  publicPath: '/',
  outputDir: 'web',
  assetsDir: 'static',
  devServer: {
    open: true,
    port: 8888,
    host: '',
    https: false,
    hotOnly: false
  },
  pwa: {
    iconPaths: {
      favicon32: 'favicon.ico',
      favicon16: 'favicon.ico',
      appleTouchIcon: 'favicon.ico',
      maskIcon: 'favicon.ico',
      msTileImage: 'favicon.ico'
    }
  },
  configureWebpack: {
    plugins: []
  },
  chainWebpack: (config) => {
    config.resolve.alias.set('@', resolve('src'))
    // svg处理
    const svgRule = config.module.rule('svg') // 找到svg-loader
    svgRule.uses.clear() // 清除已有的loader, 如果不这样做会添加在此loader之后
    svgRule.exclude.add(/node_modules/) // 正则匹配排除node_modules目录
    svgRule // 添加svg新的loader处理
      .test(/\.svg$/)
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
    // 修改images loader 添加svg处理
    const imagesRule = config.module.rule('images')
    imagesRule.exclude.add(resolve('src/icons'))
    config.module.rule('images').test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)

    // 生产环境配置
    if (process.env.NODE_ENV === 'production') {
      config.output.filename('./js/[name].[chunkhash:8].js')
      config.output.chunkFilename('./js/[name].[chunkhash:8].js')
      config.plugin('extract-css').tap((args) => [
        {
          filename: 'css/[name].[contenthash:8].css',
          chunkFilename: 'css/[name].[contenthash:8].css'
        }
      ])
      config.plugin('hotHash').use(HotHashWebpackPlugin, [{ version: '1.0.0' }])
      config.plugin('webpackBar').use(WebpackBar)

      config.optimization
        .minimize(true)
        .minimizer('terser')
        .tap((args) => {
          let { terserOptions } = args[0]
          terserOptions.compress.drop_console = true
          terserOptions.compress.drop_debugger = true
          return args
        })
      config.optimization.splitChunks({
        cacheGroups: {
          common: {
            name: 'common',
            chunks: 'all',
            minSize: 1,
            minChunks: 2,
            priority: 1
          },
          vendor: {
            name: 'chunk-libs',
            chunks: 'all',
            test: /[\\/]node_modules[\\/]/,
            priority: 10
          }
        }
      })
    }
  }
}
