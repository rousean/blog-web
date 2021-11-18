<template>
  <div class="markdown-container">
    <div class="markdown-header">
      <el-input v-model="noteTitle"
                placeholder="请输入文章标题"></el-input>
      <div class="header-right">
        <el-button type="primary"
                   plain
                   @click="showDrawer">保存</el-button>
        <el-drawer :visible.sync="drawer"
                   :with-header="false">
          <el-form class="form-container"
                   label-width="50px">
            <el-form-item label="标签">
              <el-select v-model="noteTag"
                         multiple
                         filterable
                         allow-create
                         default-first-option
                         placeholder="请选择文章标签">
                <el-option v-for="item in noteTagOptions"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="摘要">
              <el-input type="textarea"
                        :rows="6"
                        placeholder="请输入摘要内容"
                        v-model="noteAbstract"></el-input>
            </el-form-item>
            <el-button type="primary"
                       plain
                       @click="saveNote">确定</el-button>
          </el-form>
        </el-drawer>
      </div>
    </div>
    <div class="editor-container">
      <mavon-editor ref="md"
                    class="mavon-editor"
                    v-model="noteContent"
                    fontSize="16px"
                    :toolbars="toolbars"
                    :ishljs="true"
                    :externalLink="externalLink"
                    :codeStyle="codeStyle"></mavon-editor>
    </div>
    <div class="select-container">
      <el-select v-model="codeStyle"
                 placeholder="请选择">
        <el-option v-for="item in options"
                   :key="item"
                   :label="item"
                   :value="item">
        </el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
import {
  reqGetNoteById,
  reqUploadImage,
  reqSaveNote,
  reqUpdateNote
} from '../../api/api'
import './xcode.min.css'
export default {
  name: 'Markdown',
  data() {
    return {
      noteTitle: '', // 文章标题
      noteTag: [], // 文章标签
      noteContent: '', // 文章内容
      noteAbstract: '', // 文章摘要
      drawer: false,
      codeStyle: 'xcode',
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        quote: true, // 段落引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        // save: true, // 保存（触发events中的save事件）
        navigation: true, // 导航目录
        preview: true, // 预览
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        subfield: true, // 单双栏模式
        htmlcode: true, // 展示html源码
        help: true // 帮助
      },
      noteTagOptions: [
        {
          value: 'JavaScript',
          label: 'JavaScript'
        },
        {
          value: 'HTML',
          label: 'HTML'
        },
        {
          value: 'CSS',
          label: 'CSS'
        },
        {
          value: 'TypeScript',
          label: 'TypeScript'
        },
        {
          value: 'Node',
          label: 'Node'
        },
        {
          value: 'Vue',
          label: 'Vue'
        },
        {
          value: 'Deno',
          label: 'Deno'
        }
      ],
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
      ],
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
      }
    }
  },
  async mounted() {
    const id = this.$route.query.id
    if (id) {
      const res = await reqGetNoteById({ id: id })
      if (res.code === 1) {
        this.noteContent = res.data.noteContent
        this.noteTitle = res.data.noteTitle
        this.noteTag = res.data.noteTag
        this.noteContent = res.data.noteContent
        this.noteAbstract = res.data.noteAbstract
      }
    }
  },
  methods: {
    // 绑定@imgAdd event
    async $imgAdd(pos, $file) {
      // 第一步.将图片上传到服务器.
      let formdata = new FormData()
      formdata.set('file', $file)
      const result = await reqUploadImage(formdata)
      if (result.code === 1) {
        this.$refs.md.$img2Url(
          pos,
          `${process.env.VUE_APP_IMAGE_PATH}/${$file.name}`
        )
      }
    },
    // 是否显示保存弹窗页面
    showDrawer() {
      this.drawer = !this.drawer
    },
    // 点击保存
    async saveNote() {
      if (this.noteTitle === '') {
        this.$message({
          message: '文章标题为空！',
          type: 'warning',
          showClose: true
        })
        return
      }
      if (this.noteTag.length === 0) {
        this.$message({
          message: '文章标签为空！',
          type: 'warning',
          showClose: true
        })
        return
      }
      if (this.content === '') {
        this.$message({
          message: '文章内容为空！',
          type: 'warning',
          showClose: true
        })
        return
      }
      if (this.noteAbstract === '') {
        this.$message({
          message: '文章摘要为空！',
          type: 'warning',
          showClose: true
        })
        return
      }
      const note = {
        id: this.$route.query.id || '',
        noteTitle: this.noteTitle,
        noteTag: this.noteTag,
        noteContent: this.noteContent,
        noteAbstract: this.noteAbstract
      }
      let res = ''
      if (this.$route.query.id) {
        res = await reqUpdateNote(note)
      } else {
        res = await reqSaveNote(note)
      }
      if (res.code === 1) {
        this.$message({
          message: res.msg,
          type: 'success',
          showClose: true
        })
        this.$router.push('/layout/learn')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.markdown-container {
  position: relative;
  height: 100%;
  .markdown-header {
    display: flex;
    align-items: center;
    padding: 10px;
  }
  .header-right {
    margin-left: 10px;
    .form-container {
      padding: 20px;
      text-align: center;
    }
  }
  .editor-container {
    height: 100%;
    width: 100%;
    position: fixed;
    .mavon-editor {
      width: 100%;
      height: 100%;
    }
  }
  .select-container {
    position: absolute;
    top: 62px;
    left: 40%;
  }
}

::v-deep .el-input__inner {
  border: 0px solid #dcdfe6;
  font-size: 14px;
}
::v-deep .el-button {
  padding: 8px 15px;
}
::v-deep .el-tag {
  margin-left: 10px;
}
::v-deep .el-select {
  width: 80%;
}
::v-deep .markdown-body .highlight pre {
  padding: 0px;
}
::v-deep .markdown-body pre {
  padding: 0px;
}
</style>
