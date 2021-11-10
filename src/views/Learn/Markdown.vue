<template>
  <div class="markdown-container">
    <header class="markdown-header">
      <el-input v-model="noteTitle" placeholder="请输入文章标题"></el-input>
      <div class="header-right">
        <el-button type="primary" plain @click="showDrawer">保存</el-button>
        <el-drawer :visible.sync="drawer" :with-header="false">
          <el-form class="form-container" label-width="50px">
            <el-form-item label="标签">
              <el-select
                v-model="noteTag"
                multiple
                filterable
                allow-create
                default-first-option
                placeholder="请选择文章标签"
              >
                <el-option
                  v-for="item in noteTagOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="摘要">
              <el-input type="textarea" :rows="3" placeholder="请输入摘要内容" v-model="noteAbstract"></el-input>
            </el-form-item>
            <el-button type="primary" plain @click="saveNote">确定</el-button>
          </el-form>
        </el-drawer>
      </div>
    </header>
    <main class="editor-container">
      <mavon-editor
        ref="md"
        class="mavon-editor"
        v-model="noteContent"
        @save="save"
        fontSize="16px"
        :toolbars="toolbars"
        @imgAdd="$imgAdd"
      ></mavon-editor>
    </main>
  </div>
</template>

<script>
import { reqSaveNote, reqUploadImage } from '../../api/api'
export default {
  name: 'Markdown',
  data() {
    return {
      noteTitle: '', // 文章标题
      noteTag: [], // 文章标签
      noteContent: '', // 文章内容
      noteAbstract: '', // 文章摘要
      drawer: false,
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
      ]
    }
  },
  methods: {
    // 绑定@imgAdd event
    async $imgAdd(pos, $file) {
      // 第一步.将图片上传到服务器.
      let formdata = new FormData()
      formdata.set('file', $file)
      const result = await reqUploadImage(formdata)
      if (resulr.code === 1) {
        this.$refs.md.$img2Url(
          pos,
          `http://localhost:3000/images/${$file.name}`
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
        noteTitle: this.noteTitle,
        noteTag: this.noteTag,
        noteContent: this.noteContent,
        noteAbstract: this.noteAbstract
      }
      const res = await reqSaveNote(note)
      if (res.code === 1) {
        this.$message({
          message: '文章保存成功',
          type: 'success',
          showClose: true
        })
        this.$router.push('/layout/learn')
      }
    },
    // 保存文章内容
    save(value, render) {
      console.log(value)
    }
  }
}
</script>

<style lang="scss" scoped>
.markdown-container {
  .markdown-header {
    display: flex;
    align-items: center;
    margin: 10px;
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
