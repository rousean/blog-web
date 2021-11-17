<template >
  <div class="note-container">
    <div class="note-title">{{noteTitle}}</div>
    <mavon-editor ref="md"
                  class="mavon-editor"
                  v-model="noteContent"
                  fontSize="16px"
                  :toolbarsFlag="false"
                  defaultOpen="preview"
                  :subfield="false"
                  :navigation="true"
                  previewBackground="#fff"
                  style="box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 12px 0px;"></mavon-editor>
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
  width: 950px;
  height: 100%;
  margin: 0 auto;
  .note-title {
    width: 100%;
    height: 50px;
    margin-top: 20px;
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
    min-height: 850px;
    padding-top: 50px;
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
}
</style>