// 配置信息
const path = require('path')
const HotHashWebpackPlugin = require('hot-hash-webpack-plugin')
const WebpackBar = require('webpackbar')

const CompressionPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = /\.(js|css|json|ico|svg)(\?.*)?$/i

const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)

function resolve(dir) {
  return path.join(__dirname, dir)
}

let cdn = { externals: {}, js: [], css: [] }

// 生产环境配置
if (IS_PROD) {
  cdn = {
    externals: {
      // externals对象属性解析:'包名':'在项目中引入的名字'
      vue: 'Vue',
      vuex: 'Vuex',
      'vue-router': 'VueRouter',
      axios: 'axios',
      'element-ui': 'ELEMENT',
      d3: 'd3',
      vditor: 'Vditor',
      'particles.js': 'particlesJS'
    },
    js: [
      // vue must at first!
      'https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.min.js',
      'https://cdn.jsdelivr.net/npm/vue-router@3.5.3/dist/vue-router.min.js',
      'https://cdn.jsdelivr.net/npm/vuex@3.6.2/dist/vuex.min.js',
      'https://cdn.jsdelivr.net/npm/axios@0.24.0/dist/axios.min.js',
      'https://cdn.jsdelivr.net/npm/d3@7.2.1/dist/d3.min.js',
      'https://cdn.jsdelivr.net/npm/vditor@3.8.8/dist/index.min.js',
      'https://cdn.jsdelivr.net/npm/vditor@3.8.8/dist/js/i18n/zh_CN.js',
      'https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js',
      'https://unpkg.com/element-ui/lib/index.js'
    ],
    css: [
      'https://unpkg.com/element-ui/lib/theme-chalk/index.css',
      'https://cdn.jsdelivr.net/npm/vditor@3.8.8/dist/index.css'
    ]
  }
}

module.exports = {
  productionSourceMap: !IS_PROD,
  publicPath: IS_PROD ? process.env.VUE_APP_PUBLIC_PATH : '/',
  outputDir: 'web',
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
  configureWebpack: (config) => {
    // 忽略打包配置
    config.externals = cdn.externals
  },
  chainWebpack: (config) => {
    // 修复热更新
    config.resolve.symlinks(true)

    // 修复 Lazy loading routes Error
    config.plugin('html').tap((args) => {
      args[0].chunksSortMode = 'none'
      args[0].title = 'Rousean'
      args[0].cdn = cdn // 配置cdn给插件
      return args
    })
    // 添加别名 alias
    config.resolve.alias.set('@', resolve('src'))

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
    if (IS_PROD) {
      // 移除prefetch插件
      config.plugins.delete('prefetch-index')
      config.plugins.delete('preload-index')

      config.output.filename('js/[name].[chunkhash:8].js')
      config.output.chunkFilename('js/[name].[chunkhash:8].js')
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
          return args
        })
      // 提供带 Content-Encoding 编码的压缩版的资源
      config.plugin('compressionPlugin').use(
        new CompressionPlugin({
          filename: '[path].gz[query]', // 目标文件名
          algorithm: 'gzip', // 压缩算法
          test: productionGzipExtensions, // 满足正则表达式的文件会被压缩
          threshold: 10240, // 只处理比这个值大的资源。按字节计算 10240=10KB
          minRatio: 0.8, // 只有压缩率比这个值小的资源才会被处理
          deleteOriginalAssets: false // 是否删除原资源
        })
      )
      config.optimization.splitChunks({
        cacheGroups: {
          common: {
            name: 'chunk-common',
            chunks: 'all',
            minSize: 1,
            minChunks: 2,
            priority: 1
          },
          vendor: {
            name: 'chunk-vendors',
            chunks: 'all',
            test: /[\\/]node_modules[\\/]/,
            priority: 10
          }
        }
      })
    }
  }
}
