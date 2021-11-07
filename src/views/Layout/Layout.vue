<template>
  <div ref="layoutContainer" class="layout-container">
    <div :style="isShowAudio ? 'filter: blur(5px);' : 'filter: blur(0px);'" @click="falseShowAudio">
      <div class="header-container">
        <el-tabs v-model="currentTab" @tab-click="handleClick" tab-position="top">
          <el-tab-pane name="home">
            <span slot="label">
              <svg-icon class="tab-icon" iconClass="blog-home"></svg-icon>首页
            </span>
          </el-tab-pane>
          <el-tab-pane name="learn">
            <span slot="label">
              <svg-icon class="tab-icon" iconClass="blog-learn"></svg-icon>学习
            </span>
          </el-tab-pane>
          <el-tab-pane name="material">
            <span slot="label">
              <svg-icon class="tab-icon" iconClass="blog-material"></svg-icon>项目
            </span>
          </el-tab-pane>
          <el-tab-pane name="person">
            <span slot="label">
              <svg-icon class="tab-icon" iconClass="blog-person"></svg-icon>关于
            </span>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div>
        <router-view />
      </div>
    </div>
    <div class="github-svg">
      <div class="github-hover">
        <a href="https://github.com/rousean" target="_blank">
          <svg-icon iconClass="blog-github" style="width: 36px; height: 36px"></svg-icon>
        </a>
      </div>
    </div>
    <div
      ref="audioMark"
      class="audio-mark"
      :class="{ 'audio-play-animation': isAudioPlay }"
      @click="changeShowAudio"
      draggable="true"
    >
      <svg-icon iconClass="audio-mark" style="width: 36px; height: 36px"></svg-icon>
    </div>
    <div class="audio-player" v-show="isShowAudio">
      <AudioPlayer @listenChildValue="changeAudioPlay"></AudioPlayer>
    </div>
  </div>
</template>

<script>
import AudioPlayer from '../../components/AudioPlayer/AudioPlayer.vue'
export default {
  data() {
    return {
      currentTab: 'home', // 当前路由
      isShowAudio: false, // 是否显示音乐播放器页面
      isAudioPlay: false // 音乐是否在播放,以此来判断是否开启播放动画
    }
  },
  components: {
    AudioPlayer
  },
  mounted() {
    this.$refs.audioMark.addEventListener('dragend', this.dragentEvent)
    this.$once('hook:beforeDestroy', () => {
      this.$refs.audioMark.removeEventListener('dragend', this.dragentEvent)
    })
  },
  methods: {
    // 音乐播放按钮拖拽事件的回调函数
    dragentEvent(e) {
      e.preventDefault() //阻止默认时间，以免造成可能的奇怪结果
      //X方向上的处理
      if (e.clientX < this.$refs.layoutContainer.clientWidth / 2) {
        this.$refs.audioMark.style.left = 0
      } else {
        this.$refs.audioMark.style.left =
          this.$refs.layoutContainer.clientWidth -
          this.$refs.audioMark.offsetWidth +
          'px'
      }
      //Y方向上的处理
      if (e.clientY < this.$refs.audioMark.offsetWidth / 2) {
        this.$refs.audioMark.style.top = 0
      } else if (
        e.clientY >
        this.$refs.layoutContainer.clientHeight -
          this.$refs.audioMark.offsetHeight
      ) {
        this.$refs.audioMark.style.top =
          this.$refs.layoutContainer.clientHeight -
          this.$refs.audioMark.offsetHeight +
          'px'
      } else {
        this.$refs.audioMark.style.top =
          e.clientY - this.$refs.audioMark.offsetWidth / 2 + 'px'
      }
    },
    // 点击tab切换回调函数
    handleClick(tab, event) {
      this.$router.push(this.currentTab)
    },
    // 改变音乐播放器界面显示状态
    changeShowAudio() {
      this.isShowAudio = !this.isShowAudio
    },
    // 隐藏音乐播放器界面
    falseShowAudio() {
      if (this.isShowAudio) {
        this.isShowAudio = false
      }
    },
    // 监听子组件的音乐播放器状态
    changeAudioPlay(value) {
      this.isAudioPlay = value
    }
  }
}
</script>

<style lang="scss" scoped>
.layout-container {
  position: relative;
}
.header-container {
  width: 100%;
  height: 60px;
  line-height: 60px;
  text-align: center;
  background-color: #fff;
  border-bottom: 1px solid #eee;
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  justify-content: center;
  .tab-icon {
    width: 22px;
    height: 22px;
    vertical-align: text-bottom;
  }
}

.github-svg {
  position: fixed;
  top: 2px;
  left: 2px;
  width: 36px;
  height: 36px;
  -webkit-animation: heartbeat 1.5s ease-in-out infinite both;
  animation: heartbeat 1.5s ease-in-out infinite both;
  @-webkit-keyframes heartbeat {
    from {
      -webkit-transform: scale(1);
      transform: scale(1);
      -webkit-transform-origin: center center;
      transform-origin: center center;
      -webkit-animation-timing-function: ease-out;
      animation-timing-function: ease-out;
    }
    10% {
      -webkit-transform: scale(0.91);
      transform: scale(0.91);
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in;
    }
    17% {
      -webkit-transform: scale(0.98);
      transform: scale(0.98);
      -webkit-animation-timing-function: ease-out;
      animation-timing-function: ease-out;
    }
    33% {
      -webkit-transform: scale(0.87);
      transform: scale(0.87);
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in;
    }
    45% {
      -webkit-transform: scale(1);
      transform: scale(1);
      -webkit-animation-timing-function: ease-out;
      animation-timing-function: ease-out;
    }
  }
  @keyframes heartbeat {
    from {
      -webkit-transform: scale(1);
      transform: scale(1);
      -webkit-transform-origin: center center;
      transform-origin: center center;
      -webkit-animation-timing-function: ease-out;
      animation-timing-function: ease-out;
    }
    10% {
      -webkit-transform: scale(0.91);
      transform: scale(0.91);
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in;
    }
    17% {
      -webkit-transform: scale(0.98);
      transform: scale(0.98);
      -webkit-animation-timing-function: ease-out;
      animation-timing-function: ease-out;
    }
    33% {
      -webkit-transform: scale(0.87);
      transform: scale(0.87);
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in;
    }
    45% {
      -webkit-transform: scale(1);
      transform: scale(1);
      -webkit-animation-timing-function: ease-out;
      animation-timing-function: ease-out;
    }
  }
}
.github-hover {
  width: 36px;
  height: 36px;
  position: relative;
  border-color: #f7f5f1;
}
.github-hover:hover {
  color: #0085a1;
  font-weight: 900;
}
.github-hover::before,
.github-hover::after {
  visibility: hidden;
  opacity: 0;
  transform: translate3d(0, 0, 0);
  transition: all 0.3s ease 0.05s;
}
.github-hover::before {
  content: '';
  position: absolute;
  width: 0;
  height: 0;
  border: 6px solid transparent;
  border-right-color: inherit;
  filter: drop-shadow(-1px 0px 0.5px rgba(180, 160, 120, 0.4));
  top: calc(50% - 6px);
  right: 0;
}
.github-hover::after {
  content: 'Go To GitHub';
  position: absolute;
  background: #f7f5f1;
  font-size: 12px;
  font-weight: normal;
  line-height: 12px;
  padding: 6px 12px;
  white-space: nowrap;
  border-radius: 2px;
  filter: drop-shadow(0px 0px 1px rgba(180, 160, 120, 0.9));
  z-index: -1;
  top: 50%;
  transform: translateY(-50%);
  left: 100%;
  margin-left: -1px;
}
.github-hover:hover::before,
.github-hover:hover::after {
  visibility: visible;
  opacity: 1;
}
.github-hover:hover::before {
  transform: translateX(10px) translateY(0%);
}
.github-hover:hover::after {
  transform: translateX(10px) translateY(-50%);
}
.audio-mark {
  position: fixed;
  top: 30%;
  left: 1880px;
  cursor: pointer;
}
.audio-play-animation {
  animation: rotate 2s linear infinite;
}
@keyframes rotate {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
.audio-player {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
::v-deep .el-tabs__nav-wrap::after {
  background-color: transparent;
}
::v-deep .el-tabs__item {
  font-size: 16px;
}
::v-deep .el-tabs__nav {
  height: 60px;
}
::v-deep .el-tabs__active-bar {
  background-color: transparent;
}
::v-deep .el-tabs__item.is-active {
  color: #1389ff90;
}
</style>
