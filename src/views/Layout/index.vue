<template>
  <div ref="layoutContainer"
       class="layout-container">
    <div :style="isShowAudio ? 'filter: blur(10px);' : 'filter: blur(0px);'"
         @click="falseShowAudio">
      <div class="header-container">
        <div class="header-wrapper">
          <div>
            <span v-animate-css.hover="'rotateIn'">
              <svg-icon class="R"
                        iconClass="blog-R"></svg-icon>
            </span>
            <span>路索生活</span>
          </div>
          <el-tabs :value="$route.matched[1].path === '/r/note' ? '/r/learn' : $route.matched[1].path"
                   @tab-click="handleClick"
                   tab-position="top">
            <!-- <el-tab-pane name="/layout/home">
              <span slot="label">
                <svg-icon class="tab-icon" iconClass="blog-home"></svg-icon>首页
              </span>
              </el-tab-pane> -->
            <el-tab-pane name="/r/learn">
              <span slot="label">
                <div v-animate-css.click="'tada'">
                  <svg-icon class="tab-icon"
                            iconClass="blog-learn"></svg-icon>
                  <span>随笔</span>
                </div>
              </span>
            </el-tab-pane>
            <el-tab-pane name="/r/material">
              <span slot="label">
                <div v-animate-css.click="'tada'">
                  <svg-icon class="tab-icon"
                            iconClass="blog-material"></svg-icon>
                  <span>素材</span>
                </div>
              </span>
            </el-tab-pane>
            <el-tab-pane name="/r/person">
              <span slot="label">
                <div v-animate-css.click="'tada'">
                  <svg-icon class="tab-icon"
                            iconClass="blog-person"></svg-icon>
                  <span>关于</span>
                </div>
              </span>
            </el-tab-pane>
          </el-tabs>
          <div>
            <div @click="handelBack">
              <svg-icon className="return"
                        :iconClass="$route.name === 'Note' ? 'blog-return' : 'blog-re'"></svg-icon>
            </div>
            <div @click="changeFullScreen">
              <svg-icon className="screen"
                        :iconClass="fullScreen ? 'blog-exitscreen' : 'blog-fullscreen'"></svg-icon>
            </div>
            <el-dropdown size="small"
                         @command="handleDialog">
              <span class="el-dropdown-link">
                <el-avatar :size="24"
                           :src="currentUrl"></el-avatar>
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>{{$store.state.token ? '退出' : '登录' }}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </div>
      <div>
        <vue-page-transition name="fade">
          <keep-alive>
            <router-view v-if="$route.meta.keepAlive">
            </router-view>
          </keep-alive>
        </vue-page-transition>
        <vue-page-transition name="fade">
          <router-view v-if="!$route.meta.keepAlive">
          </router-view>
        </vue-page-transition>
      </div>
      <div class="footer-container">
        <div>CopyRight by Rousean</div>
        <div>
          <img :src="url">
          <a href="http://www.beian.gov.cn/portal/recordQuery"
             target="_blank"><span>浙公网安备 33010802012147号</span></a>
          <a href="https://beian.miit.gov.cn/#/Integrated/recordQuery"
             target="_blank"><span>浙ICP备 2021036763号</span></a>
        </div>
      </div>
    </div>
    <div class="github-svg">
      <div class="github-hover">
        <a href="https://github.com/rousean"
           target="_blank">
          <svg-icon iconClass="blog-github"
                    className="icon-github"></svg-icon>
        </a>
      </div>
    </div>
    <div ref="audioMark"
         class="audio-mark"
         :class="{'audio-play-animation': isAudioPlay}"
         draggable="true"
         @click="changeShowAudio">
      <svg-icon iconClass="audio-mark"
                style="width: 36px; height: 36px"></svg-icon>
    </div>
    <vue-page-transition name="fade">
      <div class="audio-player"
           v-show="isShowAudio">
        <AudioPlayer @listenChildValue="changeAudioPlay"></AudioPlayer>
      </div>
    </vue-page-transition>
    <el-dialog :visible.sync="dialogVisible"
               width="20%">
      <span slot="title">
        <svg-icon class="dialog-login"
                  iconClass="blog-login"></svg-icon>
        <span class="admin">管理员登录</span>
      </span>
      <el-form>
        <el-form-item>
          <el-input ref="username"
                    v-model="username">
            <svg-icon slot="prefix"
                      iconClass="blog-username"></svg-icon>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input :type="inputType"
                    v-model="password">
            <svg-icon slot="prefix"
                      iconClass="blog-password"></svg-icon>
            <span slot="suffix"
                  @click="handleInput">
              <svg-icon class="eye"
                        :iconClass="inputType === 'password' ? 'blog-eyeclose' : 'blog-eyeopen'"></svg-icon>
            </span>
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button plain
                   @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   plain
                   @click="login">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import AudioPlayer from '@/components/AudioPlayer'
import { reqLogin } from '@/api'

export default {
  data() {
    return {
      isShowAudio: false, // 是否显示音乐播放器页面
      isAudioPlay: false, // 音乐是否在播放,以此来判断是否开启播放动画
      fullScreen: false, // 全屏状态
      dialogVisible: false, // 登录窗口是否显示
      inputType: 'password',
      username: '',
      password: '',
      url: `${process.env.VUE_APP_IMAGE_PATH}/police.png`
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
    window.addEventListener('resize', () => {
      if (this.timer) {
        return
      }
      this.timer = setTimeout(() => {
        if (!this.checkFullScreen() && this.fullScreen) {
          this.fullScreen = false
        }
        clearTimeout(this.timer)
        this.timer = null
      }, 0)
    })
    this.$once('hook:beforeDestroy', () => {
      window.removeEventListener('resize', () => {
        if (this.timer) {
          return
        }
        this.timer = setTimeout(() => {
          if (!this.checkFullScreen() && this.fullScreen) {
            this.fullScreen = false
          }
          clearTimeout(this.timer)
          this.timer = null
        }, 0)
      })
    })
  },
  computed: {
    currentUrl() {
      return this.$store.state.token
        ? `${process.env.VUE_APP_IMAGE_PATH}/rousean.jpg`
        : `${process.env.VUE_APP_IMAGE_PATH}/user.jpg`
    }
  },
  methods: {
    // 点击tab切换回调函数
    handleClick(tab, event) {
      this.$router.push(tab.name)
    },
    // 音乐播放按钮拖拽事件的回调函数
    dragentEvent(e) {
      e.preventDefault() //阻止默认时间,以免造成可能的奇怪结果
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
    },
    handelBack() {
      if (this.$route.name === 'Note') {
        this.$router.go(-1)
      } else {
        this.$message({
          showClose: true,
          type: 'warning',
          message: '您还处于主页面状态！'
        })
      }
    },
    // 切换全屏
    changeFullScreen() {
      this.fullScreen = !this.fullScreen
      if (this.fullScreen) {
        this.windowFullScreen()
      } else {
        this.windowExitFullScreen()
      }
    },
    // 进入全屏
    windowFullScreen() {
      let docElm = document.documentElement
      if (docElm.requestFullscreen) {
        docElm.requestFullscreen()
      } else if (docElm.msRequestFullscreen) {
        docElm.msRequestFullscreen()
      } else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen()
      } else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen()
      }
    },
    // 退出全屏
    windowExitFullScreen() {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen()
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen()
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen()
      }
    },
    // 检查全屏状态
    checkFullScreen() {
      let isFull =
        document.mozFullScreen ||
        document.fullScreen ||
        document.webkitIsFullScreen ||
        document.webkitRequestFullScreen ||
        document.mozRequestFullScreen ||
        document.msFullscreenEnabled
      if (isFull === undefined) {
        isFull = false
      }
      return isFull
    },
    handleDialog() {
      if (this.$store.state.token) {
        this.$store.dispatch('setToken', '')
        this.$message({
          type: 'success',
          message: '退出成功！',
          showClose: true
        })
      } else {
        this.dialogVisible = true
        this.$nextTick(() => {
          this.$refs.username.focus()
        })
      }
    },
    handleInput() {
      if (this.inputType === 'password') {
        this.inputType = 'text'
      } else {
        this.inputType = 'password'
      }
    },
    async login() {
      const res = await reqLogin({
        username: this.username,
        password: this.password
      })
      if (res.code === 1) {
        this.$store.dispatch('setToken', res.token)
        this.dialogVisible = false
        this.$message({
          type: 'success',
          message: res.msg,
          showClose: true
        })
      } else {
        this.$message({
          type: 'error',
          message: res.msg,
          showClose: true
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/global.scss';
.layout-container {
  width: 100%;
  height: 100%;
  > div:nth-child(1) {
    .header-container {
      width: 100%;
      height: 60px;
      line-height: 60px;
      background: $background-color;
      border-bottom: 1px solid #c0c0c0;
      position: sticky;
      top: 0;
      z-index: 100;
      box-shadow: rgb(0 0 0 / 10%) 0px 2px 12px 0px;
      .header-wrapper {
        width: 850px;
        height: 100%;
        margin: 0 auto;
        display: flex;
        > div:nth-child(1) {
          margin-right: 40px;
          > span:nth-child(1) {
            display: inline-block;
            width: 34px;
            height: 34px;
            cursor: url('../../assets/pointer.png'), auto;
            .R {
              width: 34px;
              height: 34px;
              vertical-align: middle;
            }
          }
          > span:nth-child(2) {
            vertical-align: -webkit-baseline-middle;
            font-size: 12px;
            display: inline-block;
            font-family: cursive;
            color: #8c8c8c;
            font-weight: 700;
            padding-top: 12px;
            box-sizing: border-box;
          }
        }
        > div:nth-child(2) {
          flex: 2;
        }
        > div:nth-child(3) {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          cursor: url('../../assets/pointer.png'), auto;
          .return {
            width: 24px;
            height: 24px;
            margin: 0 10px;
            vertical-align: middle;
          }
          > div:nth-child(2) {
            .screen {
              width: 26px;
              height: 26px;
              margin: 0 20px 0 10px;
              vertical-align: middle;
            }
          }
          .el-dropdown-link {
            display: flex;
            align-items: center;
            margin-top: 3px;
          }
        }
        .tab-icon {
          width: 22px;
          height: 22px;
          vertical-align: text-bottom;
          margin-right: 5px;
          margin-left: 5px;
        }
      }
    }
    .footer-container {
      flex: 1;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      flex-direction: column;
      color: #8c8c8c;
      font-size: 12px;
      img {
        width: 20px;
        height: 20px;
        margin-right: 5px;
      }
      > div:nth-child(1) {
        margin-bottom: 10px;
      }
      > div:nth-child(2) {
        display: flex;
        align-items: center;
        /*包含以下四种的链接*/
        a {
          text-decoration: none;
          color: #8c8c8c;
        }
        /*正常的未被访问过的链接*/
        a:link {
          text-decoration: none;
        }
        /*已经访问过的链接*/
        a:visited {
          text-decoration: none;
        }
        /*鼠标划过(停留)的链接*/
        a:hover {
          text-decoration: none;
        }
        /* 正在点击的链接*/
        a:active {
          text-decoration: none;
        }
        span {
          margin-right: 10px;
          cursor: url('../../assets/pointer.png'), auto;
        }
        span:hover {
          color: #409eff;
        }
      }
    }
  }
  .github-svg {
    position: fixed;
    top: 2px;
    left: 2px;
    width: 36px;
    height: 36px;
    cursor: url('../../assets/pointer.png'), auto;
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
    .github-hover {
      width: 36px;
      height: 36px;
      position: relative;
      border-color: #f7f5f1;
      cursor: url('../../assets/pointer.png'), auto;
      .icon-github {
        width: 36px;
        height: 36px;
        cursor: url('../../assets/pointer.png'), auto;
      }
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
  }
  .audio-mark {
    position: fixed;
    top: 30%;
    left: 1880px;
    cursor: url('../../assets/pointer.png'), auto;
  }
  .audio-play-animation {
    animation: rotate 2s linear infinite;
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
  }
  .audio-player {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .dialog-login {
    width: 26px;
    height: 26px;
    vertical-align: text-bottom;
    margin-right: 5px;
  }
  .admin {
    font-size: 13px;
    color: #5e5e5e;
    font-weight: 700;
  }
  .eye {
    width: 22px;
    height: 22px;
    vertical-align: middle;
  }
}
::v-deep .el-tabs__nav-wrap::after {
  background-color: transparent;
}
::v-deep .el-tabs__item {
  font-family: cursive;
  font-size: 14px;
  cursor: url('../../assets/pointer.png'), auto;
}
::v-deep .el-tabs__nav {
  height: 60px;
}
::v-deep .el-dropdown-menu__item {
  cursor: url('../../assets/pointer.png'), auto;
}
::v-deep .el-tabs__active-bar {
  background-color: transparent;
}
::v-deep .el-tabs__item.is-active {
  color: #1389ff90;
}
::v-deep .el-dialog__footer {
  text-align: center;
  padding: 10px;
}
::v-deep .el-dialog__body {
  padding: 20px 20px 5px 20px;
}
::v-deep .el-button {
  cursor: url('../../assets/pointer.png'), auto;
}
</style>
