<template >
  <div class="note-container">
    <div class="select-container">
      <div>代码主题：</div>
      <el-select v-model="codeStyle"
                 placeholder="请选择">
        <el-option v-for="item in options"
                   :key="item"
                   :label="item"
                   :value="item">
        </el-option>
      </el-select>
    </div>
    <div class="editor-container">
      <div class="note-title">{{noteTitle}}</div>
      <mavon-editor ref="md"
                    class="mavon-editor"
                    v-model="noteContent"
                    fontSize="16px"
                    :toolbarsFlag="false"
                    defaultOpen="preview"
                    :subfield="false"
                    :navigation="true"
                    :ishljs="true"
                    :externalLink="externalLink"
                    :codeStyle="codeStyle"
                    previewBackground="#fff"
                    boxShadowStyle="0px 10px 12px 0px rgba(0, 0, 0, 0.1)"></mavon-editor>

    </div>
  </div>
</template>
<script>
import { reqGetNoteById } from '../../api/api'
import './xcode.min.css'
export default {
  name: 'Note',
  data() {
    return {
      noteContent: '',
      noteTitle: '',
      codeStyle: 'xcode',
      externalLink: {
        markdown_css: () =>
          `${process.env.VUE_APP_BASE_URL}/markdown/github-markdown.min.css`,
        hljs_js: () =>
          `${process.env.VUE_APP_BASE_URL}/highlightjs/highlight.min.js`,
        hljs_css: (css) =>
          `${process.env.VUE_APP_BASE_URL}/highlightjs/styles/${css}.min.css`,
        hljs_lang: (lang) =>
          `${process.env.VUE_APP_BASE_URL}/highlightjs/languages/${lang}.min.js`,
        katex_css: () => `${process.env.VUE_APP_BASE_URL}/katex/katex.min.css`,
        katex_js: () => `${process.env.VUE_APP_BASE_URL}/katex/katex.min.js`
      },
      options: [
        'agate',
        'androidstudio',
        'arduino-light',
        'arta',
        'ascetic',
        'atelier-cave-dark',
        'atelier-cave-light',
        'atelier-dune-dark',
        'atelier-dune-light',
        'atelier-estuary-dark',
        'atelier-estuary-light',
        'atelier-forest-dark',
        'atelier-forest-light',
        'atelier-heath-dark',
        'atelier-heath-light',
        'atelier-lakeside-dark',
        'atelier-lakeside-light',
        'atelier-plateau-dark',
        'atelier-plateau-light',
        'atelier-savanna-dark',
        'atelier-savanna-light',
        'atelier-seaside-dark',
        'atelier-seaside-light',
        'atelier-sulphurpool-dark',
        'atelier-sulphurpool-light',
        'atom-one-dark',
        'atom-one-light',
        'brown-paper',
        'codepen-embed',
        'color-brewer',
        'darcula',
        'dark',
        'darkula',
        'default',
        'docco',
        'dracula',
        'far',
        'foundation',
        'github-gist',
        'github',
        'googlecode',
        'grayscale',
        'gruvbox-dark',
        'gruvbox-light',
        'hopscotch',
        'hybrid',
        'idea',
        'ir-black',
        'kimbie.dark',
        'kimbie.light',
        'magula',
        'mono-blue',
        'monokai-sublime',
        'monokai',
        'obsidian',
        'ocean',
        'paraiso-dark',
        'paraiso-light',
        'pojoaque',
        'purebasic',
        'qtcreator_dark',
        'qtcreator_light',
        'railscasts',
        'rainbow',
        'routeros',
        'school-book',
        'solarized-dark',
        'solarized-light',
        'sunburst',
        'tomorrow-night-blue',
        'tomorrow-night-bright',
        'tomorrow-night-eighties',
        'tomorrow-night',
        'tomorrow',
        'vs',
        'vs2015',
        'xcode',
        'xt256',
        'zenburn'
      ]
    }
  },
  async mounted() {
    const id = this.$route.query.id
    const result = await reqGetNoteById({ id: id })
    if (result.code === 1) {
      this.noteContent = result.data.noteContent
      this.noteTitle = result.data.noteTitle
    }
  }
}
</script>
<style lang="scss" scoped>
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
      background: #fff;
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
      padding-top: 30px;
      border-radius: 0 0 5px 5px;
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