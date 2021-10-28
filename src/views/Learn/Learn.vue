<template>
  <div class="learn-container">
    <div class="left-container">
      <div class="left-content">
        <div class="markdown-content" @click="enterMarkdown">
          <svg-icon
            className="markdown-icon"
            iconClass="blog-markdown"
          ></svg-icon>
          <span>新建笔记</span>
        </div>
        <div class="markdown-content">
          <svg-icon className="markdown-icon" iconClass="blog-draft"></svg-icon>
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
        <div class="content-operate">
          <div>
            <span>
              <svg-icon
                iconClass="blog-look"
                style="width: 16px; height: 16px"
              ></svg-icon>
              <span>308</span>
            </span>
            <span>
              <svg-icon
                iconClass="blog-good"
                style="width: 16px; height: 16px"
              ></svg-icon>
              <span>112</span>
            </span>
          </div>
          <div>
            <span>
              <svg-icon
                iconClass="blog-delete"
                style="width: 16px; height: 16px"
              ></svg-icon>
              <span>删除</span>
            </span>
            <span>
              <svg-icon
                iconClass="blog-edit"
                style="width: 16px; height: 16px"
              ></svg-icon>
              <span>编辑</span>
            </span>
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
  width: 160px;
  height: 180px;
  margin-left: 20px;
  border-radius: 5px;
  padding-top: 10px;
}
.markdown-content {
  width: 100%;
  height: 30px;
  line-height: 20px;
  cursor: pointer;
  text-align: left;
  padding-top: 10px;
}
.markdown-content:hover {
  background-color: rgba(0, 183, 255, 0.39);
}
.markdown-icon {
  width: 22px;
  height: 22px;
  vertical-align: bottom;
  margin: 0 10px 0 5px;
}
.middle-container {
  width: 700px;
  background-color: #fff;
  padding: 0 20px;
  margin: 15px 0;
  border-radius: 5px;
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
.content-operate {
  display: flex;
  margin-top: 15px;
  justify-content: space-between;
}
.look-count {
  font-size: 12px;
  color: #86909c;
  margin-left: 2px;
}
.good-count {
  font-size: 12px;
  color: #86909c;
  margin-left: 2px;
}
.right-container {
  flex: 1;
  margin-top: 15px;
  margin-left: 20px;
}
</style>
