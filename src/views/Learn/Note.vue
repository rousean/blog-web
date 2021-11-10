<template >
  <div class="note-container">
    <div class="note-title">{{noteTitle}}</div>
    <mavon-editor
      ref="md"
      class="mavon-editor"
      v-model="noteContent"
      fontSize="16px"
      :toolbarsFlag="false"
      defaultOpen="preview"
      :subfield="false"
      :navigation="true"
      previewBackground="#fff"
    ></mavon-editor>
  </div>
</template>
<script>
import { reqGetNoteById } from '../../api/api'
export default {
  name: 'Note',
  data() {
    return {
      noteContent: '',
      noteTitle: ''
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
  width: 850px;
  margin: 10px auto;
  .note-title {
    width: 100%;
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
    margin: 10px 0;
    border-radius: 5px;
  }
  .mavon-editor {
    z-index: 1;
    min-height: 850px;
  }
}

::v-deep .markdown-body img {
  max-width: 600px;
  max-height: 100px;
}
::v-deep .v-note-panel {
  border-radius: 5px;
}
</style>