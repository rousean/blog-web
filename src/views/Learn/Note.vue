<template>
  <div class="note-container">
    <div class="note-content">
      <div class="note-title">{{noteTitle}}</div>
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
    const _this = this
    const id = this.$route.query.id
    const res = await reqGetNoteById({ id: id })
    if (res.code === 1) {
      this.noteContent = res.data.noteContent
      this.noteTitle = res.data.noteTitle
    }
    Vditor.preview(document.getElementById('preview'), this.noteContent, {
      anchor: 1,
      after() {
        const outline = document.getElementById('outline')
        Vditor.outlineRender(document.getElementById('preview'), outline)
        if (outline.innerText.trim() !== '') {
          outline.style.display = 'block'
        }
        _this.initOutline()
      }
    })
  },
  methods: {
    initOutline() {
      const headingElements = []
      Array.from(document.getElementById('preview').children).forEach(
        (item) => {
          if (
            item.tagName.length === 2 &&
            item.tagName !== 'HR' &&
            item.tagName.indexOf('H') === 0
          ) {
            headingElements.push(item)
          }
        }
      )
      console.log(headingElements)

      let toc = []
      window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY
        toc = []
        headingElements.forEach((item) => {
          toc.push({
            id: item.id,
            offsetTop: item.offsetTop
          })
        })
        console.log(toc)
        const currentElement = document.querySelector(
          '.vditor-outline__item--current'
        )
        for (let i = 0, iMax = toc.length; i < iMax; i++) {
          if (scrollTop < toc[i].offsetTop - 30) {
            if (currentElement) {
              currentElement.classList.remove('vditor-outline__item--current')
            }
            let index = i > 0 ? i - 1 : 0
            document
              .querySelector('span[data-target-id="' + toc[index].id + '"]')
              .classList.add('vditor-outline__item--current')
            break
          }
        }
      })
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
    .note-title {
      height: 50px;
      line-height: 50px;
      font-weight: 700;
      font-size: 20px;
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
  }
  ::v-deep .vditor-outline__item--current {
    color: aqua;
  }
}
</style>