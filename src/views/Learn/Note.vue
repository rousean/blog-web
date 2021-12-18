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
    <div class="outline-container">
      <div>目录</div>
      <div id="outline"></div>
    </div>
  </div>
</template>
<script>
import { reqGetNoteById } from '@/api'
import Vditor from 'vditor'
import 'vditor/dist/index.css'
export default {
  name: 'Note',
  data() {
    return {
      noteContent: '',
      noteTitle: ''
    }
  },
  async mounted() {
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
      cdn: `${process.env.VUE_APP_BASE_URL}`,
      after() {
        const outline = document.getElementById('outline')
        Vditor.outlineRender(preview, outline)
        if (outline.innerText.trim() !== '') {
          outline.style.display = 'block'
        }
        _this.initOutline(preview)
      }
    })
  },
  methods: {
    initOutline(preview) {
      const headerElements = []
      const tocs = []
      Array.from(preview.children).forEach((item) => {
        if (
          item.tagName.length === 2 &&
          item.tagName !== 'HR' &&
          item.tagName.indexOf('H') === 0
        ) {
          headerElements.push(item)
        }
      })
      headerElements.forEach((item) => {
        tocs.push({
          id: item.id,
          offsetTop: item.offsetTop
        })
      })
      this.Vscoll(tocs)
      window.addEventListener('scroll', () => this.Vscoll(tocs))
      this.$once('hook:beforeDestroy', () => {
        window.removeEventListener('scroll', () => this.Vscoll(tocs))
      })
    },
    Vscoll(tocs) {
      const scrollTop = window.scrollY + 60
      const currentElement = document.querySelector(
        '.vditor-outline__item--current'
      )
      for (let i = 0, iMax = tocs.length; i < iMax; i++) {
        if (scrollTop < tocs[i].offsetTop - 30) {
          if (currentElement) {
            currentElement.classList.remove('vditor-outline__item--current')
          }
          let index = i > 0 ? i - 1 : 0
          document.querySelector(
            'span[data-target-id="' + tocs[index].id + '"]'
          ) &&
            document
              .querySelector('span[data-target-id="' + tocs[index].id + '"]')
              .classList.add('vditor-outline__item--current')
          break
        }
      }
    }
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
      margin-bottom: 30px;
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
    height: 500px;
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