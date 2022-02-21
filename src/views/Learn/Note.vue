<template>
  <div class="note-container">
    <div class="note-content">
      <div class="note-title-wrapper">
        <svg-icon className="blog-title"
                  iconClass="blog-title"></svg-icon>
        <span class="note-title">{{noteTitle}}</span>
      </div>
      <div id="preview"></div>
    </div>
    <div class="outline-container"
         v-show="hasOutline">
      <div>目录</div>
      <div id="outline"></div>
    </div>
  </div>
</template>
<script>
import Vditor from 'vditor'
import 'vditor/dist/index.css'
import { reqGetNoteById } from '@/api'
import { throttle } from '@/utils'
export default {
  name: 'Note',
  data () {
    return {
      noteContent: '',
      noteTitle: '',
      hasOutline: true,
      tocs: ''
    }
  },
  async mounted () {
    window.scrollTo(0, 0)
    const _this = this
    const id = this.$route.query.id
    const res = await reqGetNoteById({ id: id })
    if (res.code === 1) {
      this.noteContent = res.data.noteContent
      this.noteTitle = res.data.noteTitle
    }
    const preview = document.getElementById('preview')
    Vditor.preview(preview, this.noteContent, {
      anchor: 1,
      hljs: {
        lineNumber: true
      },
      after () {
        const outline = document.getElementById('outline')
        Vditor.outlineRender(preview, outline)
        if (outline.innerText.trim() !== '') {
          outline.style.display = 'block'
        }
        const tocs = []
        Array.from(preview.children).forEach((item, i) => {
          if (
            item.tagName.length === 2 &&
            item.tagName !== 'HR' &&
            item.tagName.indexOf('H') === 0
          ) {
            tocs.push({
              id: item.id,
              offsetTop: item.offsetTop
            })
          }
        })
        _this.hasOutline = Boolean(tocs.length)
        if (tocs.length) {
          tocs.unshift({
            id: tocs[0].id,
            offsetTop: 0
          })
          _this.tocs = Object.freeze(tocs)
          _this.initOutline(tocs)
        }
      }
    })
  },
  methods: {
    initOutline (tocs) {
      this.Vscoll()
      window.addEventListener('scroll', this.Vscoll, true)
    },
    Vscoll () {
      const scrollTop = window.scrollY + 60
      const index = this.tocs.findIndex(
        (toc, i) =>
          scrollTop >= toc.offsetTop &&
          scrollTop < (this.tocs[i + 1]?.offsetTop || 1000000000)
      )
      const currentElement = document.querySelector(
        '.vditor-outline__item--current'
      )
      currentElement &&
        currentElement.classList.remove('vditor-outline__item--current')
      const afterElement = document.querySelector(
        `span[data-target-id=${this.tocs[index].id}]`
      )
      afterElement &&
        afterElement.classList.add('vditor-outline__item--current')
    }
  },
  destroyed () {
    window.removeEventListener('scroll', this.Vscoll, true)
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/style/global.scss';
.note-container {
  width: 1150px;
  margin-left: 535px;
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  box-sizing: border-box;
  .note-content {
    width: $width;
    min-height: $min-height;
    background-color: $background-color;
    border-radius: 5px;
    padding: 20px;
    box-sizing: border-box;
    box-shadow: $box-shadow;
    .note-title-wrapper {
      margin-bottom: 5px;
      border-bottom: 1px solid rgb(3, 179, 223);
      display: inline-flex;
      align-items: center;
      width: 100%;
      height: 50px;
      .blog-title {
        width: 26px;
        height: 26px;
        margin-right: 30px;
        vertical-align: middle;
      }
      .note-title {
        font-size: 20px;
        font-weight: 600;
      }
    }
  }
  .outline-container {
    flex: 1;
    margin-left: 20px;
    height: 600px;
    overflow: auto;
    background-color: $background-color;
    border-radius: 5px;
    box-shadow: $box-shadow;
    position: sticky;
    top: 80px;
    padding: 10px;

    > :nth-child(1) {
      font-size: 16px;
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #e4e6eb;
      margin-bottom: 20px;
      text-align: center;
    }
    ::v-deep .vditor-outline {
      font-size: 14px;
      > ul:nth-child(1) {
        padding: 0;
      }
      > li {
        margin-bottom: 10px;
      }
    }
    ::v-deep .vditor-outline__item--current {
      color: #007fff;
      height: 30px;
      padding-left: 10px;
      border-left: 1px solid #007fff;
      background: #649bd330;
    }
  }
}
</style>