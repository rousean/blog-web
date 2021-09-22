<template>
  <!-- 表头信息 -->
  <div class="markdown-container">
    <header class="markdown-header">
      <el-input
        style="flex: 1"
        v-model="noteTitle"
        placeholder="请输入文章标题"
      ></el-input>
      <div class="header-right">
        <div style="display: flex">
          <el-tag
            :key="tag"
            v-for="tag in noteTags"
            closable
            :disable-transitions="false"
            @close="deleteTag(tag)"
          >
            {{ tag }}
          </el-tag>
          <div v-if="computerTagNum">
            <el-input
              v-if="ifAddTag"
              class="input-new-tag"
              ref="saveTagInput"
              v-model="tagValue"
              size="small"
              placeholder="可以添加三个标签"
              @keyup.enter.native="addTag"
              @blur="addTag"
            >
            </el-input>
            <el-button
              v-else
              class="button-new-tag"
              size="small"
              @click="showAddTag"
              type="primary"
              plain
              >+ 标签
            </el-button>
          </div>
        </div>
        <div class="save-container">
          <div class="text-draft">文章将自动保存到草稿箱</div>
          <el-button type="info" plain>草稿箱</el-button>
          <el-button type="primary" @click="saveNote">保存</el-button>
        </div>
      </div>
    </header>
    <!-- markdown编辑 -->
    <mavon-editor
      ref="md"
      class="mavon-editor"
      v-model="noteContent"
      @save="save"
      fontSize="16px"
      :toolbars="toolbars"
    />
  </div>
</template>

<script>
import { reqSaveNote } from '../../api/api'
export default {
  name: 'Markdown',

  data() {
    return {
      noteTitle: '', // 文章标题
      noteTags: [], // 文章标签
      noteContent: '', // 文章内容
      ifAddTag: false, // 是否显示添加标签
      tagValue: '', // 标签值
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
      }
    }
  },
  props: {
    //生成一个用不重复的ID
    noteId: {
      type: String,
      default: function getUUID(randomLength) {
        return Number(
          Math.random().toString().substr(2, 10) + Date.now()
        ).toString(36)
      }
    }
  },
  computed: {
    // 判断标签的个数,最多可以添加三个标签
    computerTagNum() {
      return !(this.noteTags.length >= 3)
    }
  },
  methods: {
    // 删除标签
    deleteTag(tag) {
      this.noteTags.splice(this.noteTags.indexOf(tag), 1)
    },
    // 显示添加标签
    showAddTag() {
      this.ifAddTag = true
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    // 添加标签
    addTag() {
      let tagValue = this.tagValue
      if (this.noteTags.indexOf(tagValue) !== -1) {
        this.$message({
          message: '重复标签！',
          type: 'warning'
        })
        return
      }
      if (tagValue) {
        this.noteTags.push(tagValue)
      }
      this.ifAddTag = false
      this.tagValue = ''
    },
    // 点击保存
    async saveNote() {
      if (this.noteTitle === '') {
        this.$message({
          message: '文章标题为空！',
          type: 'warning'
        })
        return
      }
      if (this.noteTags.length === 0) {
        this.$message({
          message: '文章标签为空！',
          type: 'warning'
        })
        return
      }
      if (this.content === '') {
        this.$message({
          message: '文章内容为空！',
          type: 'warning'
        })
        return
      }
      const note = {
        note_id: this.noteId,
        note_title: this.noteTitle,
        note_tag: this.noteTags,
        note_filename: this.noteTitle + '_' + this.noteId,
        note_content: this.noteContent
      }
      const result = await reqSaveNote(note)
      console.log(result)
    },
    // 保存文章内容
    save(value, render) {
      console.log(value)
    }
  }
}
</script>

<style lang="scss" scoped>
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
.markdown-header {
  display: flex;
  margin: 10px;
}
.header-right {
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: space-between;
  flex: 1;
}
.button-new-tag {
  height: 32px;
  line-height: 30px;
  margin-left: 10px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 150px;
  margin-left: 10px;
  vertical-align: bottom;
}
.save-container {
  display: flex;
  align-items: center;
}
.text-draft {
  color: #c9cdd4;
  margin-right: 10px;
  font-size: 12px;
}
.markdown-container {
  height: 100%;
  width: 100%;
  position: fixed;
}
.mavon-editor {
  width: 100%;
  height: 100%;
}
</style>
