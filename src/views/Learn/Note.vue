<template>
  <div class="note-container">
    <div class="editor-container">
      <div class="note-title">{{noteTitle}}</div>
      <mavon-editor ref="md"
                    class="mavon-editor"
                    v-model="noteContent"
                    fontSize="16px"
                    :toolbarsFlag="false"
                    defaultOpen="preview"
                    :subfield="false"
                    :navigation="false"
                    :ishljs="true"
                    previewBackground="#ffffffbd"
                    boxShadowStyle="0px 10px 12px 0px rgba(0, 0, 0, 0.1)"
                    :externalLink="externalLink"></mavon-editor>
    </div>
  </div>
</template>
<script>
import { reqGetNoteById } from '@/api'
export default {
  name: 'Note',
  data() {
    return {
      noteContent: '',
      noteTitle: '',
      externalLink: {
        markdown_css: function () {
          return `${process.env.VUE_APP_MARKDOWN_PATH}/markdown/github-markdown.min.css`
        },

        hljs_js: function () {
          return `${process.env.VUE_APP_MARKDOWN_PATH}/highlightjs/highlight.min.js`
        },
        hljs_css: function (css) {
          return `${process.env.VUE_APP_MARKDOWN_PATH}/highlightjs/styles/${css}.min.css`
        },
        hljs_lang: function (lang) {
          return `${process.env.VUE_APP_MARKDOWN_PATH}/highlightjs/languages/${lang}.min.js`
        },
        katex_css: function () {
          return `${process.env.VUE_APP_MARKDOWN_PATH}/katex/katex.min.css`
        },
        katex_js: function () {
          return `${process.env.VUE_APP_MARKDOWN_PATH}/katex/katex.min.js`
        }
      }
    }
  },
  async mounted() {
    const id = this.$route.query.id
    const res = await reqGetNoteById({ id: id })
    if (res.code === 1) {
      this.noteContent = res.data.noteContent
      this.noteTitle = res.data.noteTitle
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/style/global.scss';
.note-container {
  padding: 20px;
  position: relative;
  display: flex;
  justify-content: center;
  .select-container {
    display: flex;
    align-items: center;
    position: absolute;
    top: 20px;
    left: 200px;
    > div:nth-child(1) {
      font-size: 14px;
      color: #5e5e5e;
    }
  }
  .editor-container {
    width: 850px;
    .note-title {
      height: 50px;
      line-height: 50px;
      font-weight: 700;
      font-size: 20px;
      text-align: center;
      color: #1d2129;
      background-color: $background-color;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      border-radius: 5px 5px 0 0;
      box-shadow: rgb(0 0 0 / 10%) 0px 2px 12px 0px;
      border-bottom: 1px solid #e5e5e5;
    }
    .mavon-editor {
      z-index: 1;
      min-height: 770px;
      padding-top: 20px;
      border-radius: 0 0 5px 5px;
      background-color: $background-color;
    }
  }
}
::v-deep .markdown-body img {
  max-width: 600px;
  max-height: 100px;
}
::v-deep .v-note-panel {
  border-radius: 5px;
}
::v-deep .v-note-wrapper {
  border-radius: 0;
}
::v-deep .v-note-wrapper .v-note-panel .v-note-navigation-wrapper {
  max-height: 850px;
  position: fixed;
  top: 80px;
  right: 185px;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 12px 0px;
}
::v-deep .markdown-body .highlight pre {
  padding: 0px;
}
::v-deep .markdown-body pre {
  padding: 0px;
}
</style>