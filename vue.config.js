// 配置信息
const path = require('path')
const HotHashWebpackPlugin = require('hot-hash-webpack-plugin')
const WebpackBar = require('webpackbar')

const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)

const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  productionSourceMap: !IS_PROD,
  publicPath: IS_PROD ? process.env.VUE_APP_PUBLIC_PATH : '/',
  outputDir: 'dist',
  assetsDir: 'static',
  parallel: require('os').cpus().length > 1,

  devServer: {
    open: true,
    overlay: {
      warnings: true,
      errors: true
    },
    https: false,
    host: 'localhost',
    port: 8888,
    hotOnly: true
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
  configureWebpack: {},
  chainWebpack: (config) => {
    // 修复热更新
    config.resolve.symlinks(true)
    // 修复 Lazy loading routes Error
    config.plugin('html').tap((args) => {
      args[0].chunksSortMode = 'none'
      return args
    })
    // 添加别名 alias
    config.resolve.alias.set('@', resolve('src'))
    // 打包分析
    if (process.env.IS_ANALY) {
      config.plugin('webpack-report').use(BundleAnalyzerPlugin, [
        {
          analyzerMode: 'static'
        }
      ])
    }
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule.exclude.add(/node_modules/)
    svgRule
      .test(/\.svg$/)
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
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
