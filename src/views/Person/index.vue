<template>
  <div class="person-container">
    <div>
      <div class="person-info">
        <el-avatar :size="100"
                   :src="url"></el-avatar>
        <div>
          <span>路索</span>
          <span>Rousean</span>
        </div>
        <div>路漫漫其修远兮，吾将上下而求索！</div>
      </div>
      <div class="contact-wrapper">
        <div v-animate-css.hover="'pulse'">
          <svg-icon iconClass="blog-github"
                    className="icon-contact"></svg-icon>
          <span @click="open('https://github.com/rousean')">
            GitHub
          </span>
        </div>
        <div v-animate-css.hover="'pulse'">
          <svg-icon iconClass="blog-email"
                    className="icon-contact"></svg-icon>
          <span @click="open('rousean@163.com')">邮箱</span>
        </div>
        <div v-animate-css.hover="'pulse'">
          <svg-icon iconClass="blog-blog"
                    className="icon-contact"></svg-icon>
          <span @click="open('www.rousean.cn')">博客</span>
        </div>
      </div>
    </div>
    <div>
      <div>开源代码</div>
      <div v-for="project in projects"
           :key="project.title">
        <div class="project-name">
          <svg-icon iconClass="blog-project"
                    className="icon-project"></svg-icon>
          <span>{{project.title}}</span>
        </div>
        <div class="project-wrapper"
             v-for="stack in project.stacks"
             :key="stack.title"
             v-animate-css.hover="'pulse'"
             @click="jump(stack.url)">
          <div class="project-content">
            <div>
              <svg-icon :iconClass="stack.tag === '前端' ? 'blog-web' : 'blog-server'"
                        className="icon-coding"></svg-icon>
              <span>{{stack.title}}</span>
            </div>
            <div>{{stack.introduction}}</div>
          </div>
          <div class="book-mark">
            <div>
              <svg-icon iconClass="blog-bookmark"
                        className="icon-mark"></svg-icon>
              <div>{{stack.tag}}</div>
            </div>
          </div>
        </div>
      </div>
      <div>未完待续！敬请期待~~~</div>
    </div>
  </div>
</template>

<script>
import { reqGetProject } from '@/api'
export default {
  name: 'Person',
  data() {
    return {
      url: `${process.env.VUE_APP_IMAGE_PATH}/rousean.jpg`,
      projects: ''
    }
  },
  async mounted() {
    const res = await reqGetProject({})
    if (res.code === 1) {
      this.projects = res.data
    }
  },
  methods: {
    open(url) {
      if (url === 'https://github.com/rousean') {
        window.open(url)
      } else {
        navigator.clipboard.writeText(url).then(() => {
          this.$message({
            message: '复制成功！',
            type: 'success'
          })
        })
      }
    },
    jump(url) {
      window.open(url)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/global.scss';
.person-container {
  width: 850px;
  margin: 20px auto;
  display: flex;
  .person-info {
    width: 260px;
    background-color: $background-color;
    box-sizing: border-box;
    padding: 10px;
    border-radius: 5px;
    text-align: center;
    box-shadow: $box-shadow;
    > div:nth-child(2) {
      margin: 10px;
      > span:nth-child(1) {
        font-weight: 700;
      }
      > span:nth-child(2) {
        margin-left: 10px;
        font-size: 12px;
        color: #8c8c8c;
        vertical-align: bottom;
      }
    }
    > div:nth-child(3) {
      font-size: 12px;
    }
  }
  .contact-wrapper {
    margin-top: 20px;
    > div {
      width: 260px;
      height: 40px;
      display: flex;
      align-items: center;
      background-color: $background-color;
      margin-bottom: 10px;
      border-radius: 5px;
      box-sizing: border-box;
      padding: 10px;
      cursor: url('../../assets/pointer.png'), auto;
      font-size: 12px;
      box-shadow: $box-shadow;
      .icon-contact {
        width: 20px;
        height: 20px;
        margin-right: 5px;
      }
    }
    > div:hover {
      background: aliceblue;
      box-shadow: $box-shadow;
    }
  }
  > div:nth-child(2) {
    flex: 1;
    background-color: $background-color;
    margin-left: 20px;
    min-height: $min-height;
    border-radius: 5px;
    padding: 20px;
    box-sizing: border-box;
    box-shadow: $box-shadow;
    > div:nth-child(1) {
      text-align: center;
      font-weight: 700;
    }
    .project-name {
      margin-top: 20px;
      display: flex;
      align-items: center;
      font-size: 14px;
      color: #409eff;
      .icon-project {
        margin-right: 10px;
        width: 20px;
        height: 20px;
      }
    }
    .project-wrapper {
      width: 100%;
      height: 120px;
      border: 1px solid #eee;
      padding: 10px;
      box-sizing: border-box;
      position: relative;
      margin-top: 15px;
      border-radius: 5px;
      cursor: url('../../assets/pointer.png'), auto;
      .project-content {
        > div:nth-child(1) {
          margin-bottom: 10px;
          font-size: 12px;
          display: flex;
          align-items: center;
          .icon-coding {
            width: 20px;
            height: 20px;
            margin-right: 10px;
          }
        }
        > div:nth-child(2) {
          color: #8c8c8c;
          font-size: 12px;
        }
      }
      .book-mark {
        position: absolute;
        top: -10px;
        right: 0px;
        > div:nth-child(1) {
          position: relative;
          .icon-mark {
            width: 40px;
            height: 40px;
          }
          > div:nth-child(2) {
            z-index: 100;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -70%);
            font-size: 12px;
            color: #00ccff;
            text-align: center;
          }
        }
      }
    }
    .project-wrapper:hover {
      background: aliceblue;
      box-shadow: $box-shadow;
    }
    > div:last-child {
      text-align: center;
      font-size: 12px;
      color: #8c8c8c;
      margin-top: 20px;
    }
  }
}
</style>
