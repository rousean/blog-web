<template>
  <div class="learn-container">
    <div class="left-container">
      <el-button
        type="primary"
        icon="el-icon-edit"
        @click="enterMarkdown"
      ></el-button>
    </div>
    <div class="middle-container">
      <div class="note-content">
        <div class="content-header">
          <div class="content-time">一年前</div>
          <div class="content-container">
            <div class="content-tag">
              <span> JavaScript </span>
              <span>·</span>
              <span> CSS </span>
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
      <div class="note-content">
        <div class="content-header">
          <div class="content-time">一年前</div>
          <div class="content-container">
            <div class="content-tag">
              <span> JavaScript </span>
              <span>·</span>
              <span> CSS </span>
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
.middle-container {
  width: 676px;
}
.note-content {
  width: 100%;
  height: 140px;
  position: relative;
  padding: 10px;
  margin: 15px 0;
  border: 2px solid #efefef;
  // background-image: url('../../assets/images/paper.png');
  background-color: #fffffd;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.27), 0 0 40px rgba(0, 0, 0, 0.06) inset;
  box-sizing: border-box;
}
.note-content::before,
.note-content::after {
  content: '';
  z-index: -1;
  position: absolute;
  left: 10px;
  bottom: 10px;
  width: 30%;
  height: 55%;
  max-height: 100px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  transform: skew(-15deg) rotate(-4deg);
}
.note-content::after {
  left: auto;
  right: 10px;
  transform: skew(15deg) rotate(4deg);
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
.left-container {
  flex: 1;
}
.right-container {
  flex: 1;
}
</style>
