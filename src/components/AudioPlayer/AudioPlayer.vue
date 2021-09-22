<template>
  <div class="audio-container">
    <!-- 音乐来源 -->
    <audio ref="audio" :src="audioUrl" autoplay></audio>
    <!-- 作曲名与作者 -->
    <div class="audio-title-author" v-if="audioList">
      <div class="audio-title">{{ audioList[audioId].audioTitle }}</div>
      <div class="audio-author">{{ audioList[audioId].audioAuthor }}</div>
    </div>
    <!-- 中间圆心操作 -->
    <div class="audio-handle">
      <div class="audio-circle">
        <DrawCircle></DrawCircle>
      </div>
      <div class="audio-progress">
        <el-progress
          type="circle"
          :percentage="autoPercentage"
          :show-text="false"
          :stroke-width="1"
          :width="205"
        ></el-progress>
      </div>
      <div class="audio-timer">
        <div class="timer-now">{{ audioNow }}</div>
        <div class="timer-line">|</div>
        <div class="timer-total">{{ audioTotal }}</div>
      </div>
      <div class="audio-button">
        <div @click="controlBack">
          <svg-icon
            iconClass="audio-back"
            style="width: 20px; height: 20px"
          ></svg-icon>
        </div>
        <div @click="controlaudio">
          <svg-icon
            :iconClass="isStart ? 'audio-start' : 'audio-stop'"
            style="width: 26px; height: 26px; margin: 0 40px 0 40px"
          ></svg-icon>
        </div>
        <div @click="controlFore">
          <svg-icon
            iconClass="audio-fore"
            style="width: 20px; height: 20px"
          ></svg-icon>
        </div>
      </div>
    </div>
    <!-- 声音操作 -->
    <div class="audio-voice">
      <svg-icon iconClass="audio-mute"></svg-icon>
      <div class="audio-slider">
        <el-slider v-model="audioVoice" @change="controlVolume"></el-slider>
      </div>
      <svg-icon iconClass="audio-voice"></svg-icon>
    </div>
    <!-- 下一首歌曲 -->
    <div class="audio-next">
      <div class="next-text">NEXT</div>
      <div class="next-line"></div>
      <div class="next-content" v-if="audioList">
        <span class="next-content-num">{{ audioId + 2 }}</span>
        <span class="next-content-line">|</span>
        <span class="next-content-title">{{
          audioId === audioList.length - 1
            ? audioList[audioId].audioName.split('.')[0]
            : audioList[audioId + 1].audioName.split('.')[0]
        }}</span>
      </div>
      <div class="next-line"></div>
    </div>
  </div>
</template>

<script>
import DrawCircle from './DrawCircle'
import { reqAudioList } from '../../api/api'
import { throttle, timeHandle } from '../../utils/utils'
const BASICURL = 'http://localhost:3000/audio/'

export default {
  name: 'AudioPlayer',
  data() {
    return {
      audioList: '', // 音乐列表
      audioId: 0, // 列表初始id
      isStart: false, // 音乐播放状态
      audioNow: '00:00', // 音乐播放当前时间
      audioTotal: '00:00', // 音乐总时长
      audioVoice: 50, // 音乐音量
      autoPercentage: 0 // 音乐播放进度占比
    }
  },
  components: {
    DrawCircle
  },
  created() {
    this.getAudioList() // 获取音乐列表数据
  },
  mounted() {
    const audioDOM = this.$refs.audio
    // 绑定audio原生事件
    audioDOM.addEventListener('durationchange', () => {
      this.audioTotal = timeHandle(audioDOM.duration)
    })
    audioDOM.addEventListener(
      'timeupdate',
      throttle(this.handleCurrentTime, 500)
    )
    audioDOM.addEventListener('ended', this.controlFore)
    audioDOM.addEventListener('play', () => {
      this.isStart = true
      this.$emit('listenChildValue', true)
    })
    audioDOM.addEventListener('pause', () => {
      this.isStart = false
      this.$emit('listenChildValue', false)
    })
    // 组件销毁移除事件
    this.$once('hook:beforeDestroy', () => {
      audioDOM.removeEventListener('durationchange', () => {
        this.audioTotal = timeHandle(audioDOM.duration)
      })
    })
    this.$once('hook:beforeDestroy', () => {
      audioDOM.removeEventListener(
        'timeupdate',
        throttle(this.handleCurrentTime, 500)
      )
    })
    audioDOM.removeEventListener('ended', this.controlFore)
    audioDOM.removeEventListener('play', () => {
      this.isStart = true
      this.$emit('listenChildValue', true)
    })
    audioDOM.removeEventListener('pause', () => {
      this.isStart = false
      this.$emit('listenChildValue', false)
    })
  },
  computed: {
    // 计算属性,动态计算音乐的链接
    audioUrl() {
      if (this.audioList) {
        return BASICURL + this.audioList[this.audioId]['audioName']
      } else {
        return ''
      }
    }
  },
  methods: {
    // 获取数据
    async getAudioList() {
      try {
        const result = await reqAudioList()
        this.audioList = result.audioList
      } catch (error) {
        this.$message({
          message: '音乐列表获取失败!',
          type: 'error'
        })
      }
    },
    // 处理当前时间
    handleCurrentTime() {
      const audioDOM = this.$refs.audio
      this.audioNow = timeHandle(audioDOM.currentTime)
      if (audioDOM.duration) {
        let autoPercentage = (
          (audioDOM.currentTime / audioDOM.duration) *
          100
        ).toFixed(0)
        this.autoPercentage = Number(autoPercentage)
      }
    },
    // 上一首按钮
    controlBack() {
      let length = this.audioList.length - 1
      if (this.audioId === 0) {
        this.audioId = length
      } else {
        this.audioId--
      }
      this.autoPercentage = 0
    },
    // 播放暂停按钮
    controlaudio() {
      if (!this.isStart) {
        this.startAudio()
      } else {
        this.stopAudio()
      }
    },
    // 下一首按钮
    controlFore() {
      let length = this.audioList.length - 1
      if (this.audioId === length) {
        this.audioId = 0
      } else {
        this.audioId++
      }
      this.autoPercentage = 0
    },
    // 开始播放
    startAudio() {
      this.isStart = true
      this.$refs.audio.play()
      // this.$emit('listenChildValue', true)
    },
    // 暂停播放
    stopAudio() {
      this.isStart = false
      this.$refs.audio.pause()
      // this.$emit('listenChildValue', false)
    },
    // 音量控制
    controlVolume() {
      this.$refs.audio.volume = (this.audioVoice / 100).toFixed(1)
    }
  }
}
</script>

<style lang="scss" scoped>
.audio-container {
  background-color: rgb(61, 61, 61);
  width: 300px;
  height: 550px;
  margin: 0 auto;
  padding-top: 15px;
  border-radius: 10px;
  box-shadow: 6px 6px 6px rgba(61, 61, 61, 0.8);
}

.audio-title-author {
  color: aliceblue;
  font-family: Saint-Andrews;
  text-align: center;
  margin-top: 35px;
}
.audio-title {
  font-size: 26px;
}
.audio-author {
  font-size: 18px;
  margin-top: 5px;
}
.audio-handle {
  position: relative;
  width: 100%;
  height: 300px;
}
.audio-circle {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.audio-progress {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.audio-timer {
  position: absolute;
  top: 80px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  color: #fff;
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}
.timer-now {
  color: #20a0ff;
}
.timer-line {
  color: #808a87;
  margin: 0 5px 0 5px;
}
.timer-total {
  color: #808a87;
}
.audio-button {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: center;
  z-index: 999;
}
.audio-back {
  width: 20px;
  height: 20px;
}
.audio-voice {
  display: flex;
  align-items: center;
  margin: 0 15px 0 15px;
}
.audio-next {
  width: 80%;
  height: 50px;
  margin: 40px auto;
}
.next-text {
  height: 10px;
  font-size: 12px;
  color: #808a87;
  margin-bottom: 3px;
}
.next-line {
  height: 1px;
  background-color: rgba(100, 100, 100, 0.863);
}
.next-content {
  height: 30px;
  line-height: 30px;
  font-size: 12px;
}
.next-content-num {
  color: #4ae6ff;
}
.next-content-line {
  margin: 0 10px 0 10px;
  color: #fff;
}
.next-content-title {
  color: #fff;
  font-family: Saint-Andrews;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.audio-slider {
  width: 75%;
  margin: 0 auto;
}
::v-deep .el-slider__runway {
  height: 1px;
  background-color: #000000;
}
::v-deep .el-slider__bar {
  height: 1px;
  background-color: #bfbfbf;
}
::v-deep .el-slider__button {
  width: 10px;
  height: 10px;
  border: 3px solid #00ddff;
  background-color: #4ae6ff;
}
::v-deep .el-slider__button-wrapper {
  top: -18px;
}
</style>
