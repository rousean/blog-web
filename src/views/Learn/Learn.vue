<template>
  <div class="learn-container">
    <div class="left-container">
      <div class="left-content">
        <div @click="enterMarkdown">
          <svg-icon
            iconClass="blog-markdown"
            style="width: 28px; height: 28px"
          ></svg-icon>
          <span>新建笔记</span>
        </div>
        <div>
          <svg-icon
            iconClass="blog-draft"
            style="width: 28px; height: 28px"
          ></svg-icon>
          <span>草稿箱</span>
        </div>
      </div>
    </div>
    <div class="middle-container">
      <div
        class="note-content"
        v-for="(key, index) in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
        :key="index"
      >
        <div class="content-header">
          <div class="content-time">一年前</div>
          <div class="content-container">
            <div class="content-tag">
              <span>JavaScript</span>
              <span>·</span>
              <span>CSS</span>
            </div>
          </div>
        </div>
        <div class="content-title">Vue移动端完美适配方案</div>
        <div class="content-brief">
          object.entries()转换一个objec为array。但是，如果你想做相反的事情怎么办？不用再想了！使用
          Object.fromEntries() 来把array转。
        </div>
        <div class="content-svg">
          <div class="look-svg">
            <svg-icon
              iconClass="blog-look"
              style="width: 18px; height: 18px"
            ></svg-icon>
            <div class="look-count">308</div>
          </div>
          <div class="good-svg">
            <svg-icon
              iconClass="blog-good"
              style="width: 17px; height: 17px"
            ></svg-icon>
            <div class="good-count">112</div>
          </div>
        </div>
      </div>
    </div>
    <div class="right-container">
      <div>标签</div>
      <div class="tag-group">
        <el-tag effect="dark">JavaScript</el-tag>
        <el-tag effect="dark">HTML</el-tag>
        <el-tag effect="dark">CSS</el-tag>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Learn',
  data() {
    return {}
  },
  methods: {
    enterMarkdown() {
      this.$router.push('markdown')
    }
  }
}
</script>

<style lang="scss" scoped>
.learn-container {
  display: flex;
}
.left-container {
  flex: 1;
  margin-top: 15px;
}
.left-content {
  background-color: #fff;
  width: 200px;
  height: 200px;
  margin-left: 20px;
  padding: 10px;
}
.middle-container {
  width: 676px;
  background-color: #fff;
  padding: 0 20px;
  margin: 15px 0;
}
.note-content {
  width: 100%;
  height: 140px;
  position: relative;
  padding: 10px;
  margin: 20px 0;
  box-sizing: border-box;
  border-bottom: 1px solid #e5e6eb;
}

.content-header {
  color: #86909c;
  font-size: 14px;
  position: relative;
  left: 0;
  display: flex;
}
.content-time {
  margin-right: 5px;
}
.content-container::before {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: block;
  width: 1px;
  height: 14px;
  background: #e5e6eb;
  content: ' ';
}
.content-tag {
  margin-left: 5px;
}
.content-title {
  font-weight: 700;
  font-size: 17px;
  line-height: 24px;
  color: #1d2129;
  width: 100%;
  margin: 10px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.content-brief {
  color: #86909c;
  font-size: 14px;
  line-height: 22px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.content-svg {
  margin-top: 10px;
  display: flex;
}
.look-svg {
  display: flex;
  align-items: center;
}
.look-count {
  font-size: 14px;
  color: #86909c;
  margin-left: 2px;
}
.good-svg {
  display: flex;
  align-items: center;
  margin-left: 10px;
}
.good-count {
  font-size: 14px;
  color: #86909c;
  margin-left: 2px;
}

.right-container {
  flex: 1;
  margin-top: 15px;
  margin-left: 20px;
}
</style>
