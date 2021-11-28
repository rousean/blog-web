<template>
  <div class="material-container">
    <div class="item-container"
         v-for="list in lists"
         :key="list.titleName">
      <div class="item-title">
        <svg-icon :iconClass="`blog-${list.titleIcon}`"
                  className="title-icon"></svg-icon>
        <span>{{list.titleName}}</span>
      </div>
      <div class="item-wrapper">
        <div class="material-item"
             v-for="item in list.items"
             :key="item.itemTitle"
             @click="open(item.itemUrl)"
             v-animate-css.hover="'pulse'">
          <div>
            <svg-icon :iconClass="`blog-${item.itemIcon}`"
                      className="item-icon"></svg-icon>
            <div>{{item.itemTitle}}</div>
          </div>
          <div>{{item.itemContent}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Material',
  data() {
    return {
      lists: [
        {
          titleIcon: 'code',
          titleName: '代码基础',
          items: [
            {
              itemIcon: 'JavaScript',
              itemTitle: 'JavaScript基础',
              itemUrl: 'https://wangdoc.com/javascript/',
              itemContent:
                '全面介绍 JavaScript 核心语法，覆盖了 ES5 和 DOM 规范的所有内容'
            },
            {
              itemIcon: 'JavaScript',
              itemTitle: 'JavaScript讲解',
              itemUrl: 'https://zh.javascript.info/',
              itemContent:
                '以最新的 JavaScript 标准为基准。通过简单但足够详细的内容，为你讲解从基础到高阶的 JavaScript 相关知识。'
            },
            {
              itemIcon: 'TypeScript',
              itemTitle: 'TypeScript 入门教程',
              itemUrl:
                'https://github.com/xcatliu/typescript-tutorial#typescript-%E5%85%A5%E9%97%A8%E6%95%99%E7%A8%8B',
              itemContent:
                '从 JavaScript 程序员的角度总结思考，循序渐进的理解 TypeScript。'
            },
            {
              itemIcon: 'Node',
              itemTitle: 'Node.js学习指南',
              itemUrl: 'https://blog.poetries.top/node-learning-notes/',
              itemContent: 'Node.js笔记系统整理'
            },
            {
              itemIcon: 'Vue',
              itemTitle: 'Vue3学习资料',
              itemUrl: 'https://vue3js.cn/',
              itemContent: 'vue3相关资料整理'
            },
            {
              itemIcon: 'es6',
              itemTitle: 'ES6 入门教程',
              itemUrl: 'https://es6.ruanyifeng.com/',
              itemContent:
                '《ECMAScript 6 入门教程》是一本开源的 JavaScript 语言教程，全面介绍 ECMAScript 6 新引入的语法特性。'
            }
          ]
        },
        {
          titleIcon: 'tools',
          titleName: '在线工具',
          items: [
            {
              itemIcon: 'HTML',
              itemTitle: 'HTML在线美化压缩',
              itemUrl: 'https://tool.lu/html/',
              itemContent: 'HTML在线美化压缩'
            },
            {
              itemIcon: 'svg',
              itemTitle: '阿里巴巴矢量图标库',
              itemUrl: 'https://www.iconfont.cn/',
              itemContent: '开源海量矢量图标库'
            }
          ]
        },
        {
          titleIcon: 'community',
          titleName: '技术社区',
          items: [
            {
              itemIcon: 'juejin',
              itemTitle: '掘金论坛',
              itemUrl: 'https://juejin.cn/',
              itemContent: '优秀前端学习文章分享论坛'
            },
            {
              itemIcon: 'segmentfault',
              itemTitle: '思否',
              itemUrl: 'https://segmentfault.com/',
              itemContent: '开放的前端社区'
            }
          ]
        }
      ]
    }
  },
  methods: {
    open(url) {
      window.open(url)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/global.scss';
.material-container {
  width: 850px;
  min-height: $min-height;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  margin-bottom: 20px;
  .item-container {
    background: $background-color;
    padding: 20px;
    border-radius: 5px;
    box-shadow: $box-shadow;
    margin-bottom: 20px;
    .item-title {
      margin-left: 10px;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      font-weight: 700;
      .title-icon {
        margin-right: 15px;
        width: 22px;
        height: 22px;
      }
    }
    .item-wrapper {
      display: flex;
      flex-wrap: wrap;
      .material-item {
        width: 240px;
        height: 100px;
        border: 1px solid #eeeeee;
        border-radius: 5px;
        margin: 10px;
        padding: 10px;
        box-sizing: border-box;
        font-size: 12px;
        cursor: url('../../assets/pointer.png'), auto;
        > div:nth-child(1) {
          display: flex;
          margin-bottom: 10px;
          font-size: 14px;
          align-items: center;
          .item-icon {
            width: 26px;
            height: 26px;
            margin-right: 5px;
          }
        }
        > div:nth-child(2) {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          color: #8c8c8c;
        }
      }
      .material-item:hover {
        background: aliceblue;
        box-shadow: $box-shadow;
      }
    }
  }
}
</style>
