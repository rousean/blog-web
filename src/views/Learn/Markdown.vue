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
                <el-option v-for="item in tagOptions"
                           :key="item.label"
                           :label="item.label"
                           :value="item.label"></el-option>
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
    <div class="editor-container"
         id="vditor">
    </div>
  </div>
</template>

<script>
import Vditor from 'vditor'
import 'vditor/dist/index.css'
import {
  reqGetNoteById,
  reqSaveNote,
  reqUpdateNote,
  reqTagOptions
} from '@/api'
export default {
  name: 'Markdown',
  data() {
    return {
      vditor: '',
      noteTitle: '', // 文章标题
      noteTag: [], // 文章标签
      noteContent: '', // 文章内容
      noteAbstract: '', // 文章摘要
      drawer: false,
      tagOptions: []
    }
  },
  async mounted() {
    const id = this.$route.query.id
    const res = await reqTagOptions()
    if (res.code === 1) {
      this.tagOptions = res.data
    }
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
    this.vditor = new Vditor('vditor', {
      width: '100%',
      height: 1080,
      placeholder: '请输入...',
      theme: 'classic',
      typewriterMode: true,
      // cdn: `${process.env.VUE_APP_BASE_URL}`,
      outline: {
        enable: true
      },
      preview: {
        // theme: {
        //   path: `${process.env.VUE_APP_BASE_URL}/dist/css/content-theme`
        // },
        hljs: {
          lineNumber: true
        },
        markdown: {
          toc: true
        }
      },
      // hint: {
      //   emojiPath: `${process.env.VUE_APP_BASE_URL}/dist/images/emoji`
      // },
      cache: {
        enable: false
      },
      upload: {
        url: `${process.env.VUE_APP_BASE_URL}/material/uploadSingle`,
        fieldName: 'file',
        multiple: false,
        format: (files, res) => {
          const fileName = files[0].name
          return JSON.stringify({
            msg: '',
            code: 0,
            data: {
              errfile: [],
              succMap: {
                [`${fileName}`]: `${process.env.VUE_APP_BASE_URL}/opus/${fileName}`
              }
            }
          })
        }
      },
      after: () => {
        this.noteContent && this.vditor.setValue(this.noteContent)
      }
    })
  },
  methods: {
    // 是否显示保存弹窗页面
    showDrawer() {
      this.drawer = !this.drawer
    },
    async saveNote() {
      const note = {
        id: this.$route.query.id || '',
        noteTitle: this.noteTitle,
        noteTag: this.noteTag,
        noteContent: this.vditor.getValue(),
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
        this.$confirm('是否返回文章列表页？', '提示', {
          confirmButtonText: '返回',
          cancelButtonText: '当前页',
          type: 'warning'
        })
          .then(() => {
            this.$router.go(-1)
          })
          .catch(() => {
            this.noteTitle = ''
            this.noteTag = []
            this.noteContent = ''
            this.noteAbstract = ''
            this.drawer = false
          })
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
  }
  .select-container {
    position: absolute;
    top: 62px;
    left: 40%;
    ::v-deep .el-select {
      width: 50%;
      height: 80%;
    }
  }
}

::v-deep .el-input__inner {
  border: 1px solid #dcdfe6;
  font-size: 14px;
}
::v-deep .el-button {
  padding: 8px 15px;
}
::v-deep .el-tag {
  margin-left: 10px;
}
::v-deep .el-select {
  width: 100%;
}
</style>
