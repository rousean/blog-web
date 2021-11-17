<template>
  <div>
    <div class="learn-container"
         v-if="$route.path === '/layout/learn'">
      <div class="left-container">
        <div class="left-content"
             @click="enterMarkdown"
             v-if="true">
          <svg-icon class="markdown-icon"
                    iconClass="blog-markdown"></svg-icon>
        </div>
      </div>
      <div class="middle-container">
        <div class="note-container"
             v-if="noteData.length > 0">
          <div class="note-content"
               v-for="note in noteData"
               :key="note._id">
            <div class="content-header">
              <div class="content-time">{{dayDif(new Date(), new Date(note.createdAt))}}天前</div>
              <div class="content-container">
                <div v-for="(tag, index) in note.noteTag"
                     :key="tag"
                     :class="[index === note.noteTag.length - 1 ? 'content-tag-last': 'content-tag']">{{tag}}</div>
              </div>
              <div class="content-operate">
                <div @click="deleteNote(note._id)">
                  <svg-icon iconClass="blog-delete"
                            style="width: 16px; height: 16px; margin-right: 10px;"></svg-icon>
                </div>
                <div @click="editNote(note._id)">
                  <svg-icon iconClass="blog-edit"
                            style="width: 16px; height: 16px"></svg-icon>
                </div>
              </div>
            </div>
            <div @click="showNote(note._id)">
              <div class="content-title">{{note.noteTitle}}</div>
              <div class="content-brief">{{note.noteAbstract}}</div>
            </div>
          </div>
        </div>
        <el-empty v-else
                  :image-size="100"></el-empty>
        <el-pagination style="text-align: center;"
                       @current-change="handleCurChange"
                       :current-page="pageNum"
                       :page-size="pageSize"
                       layout="prev, next"
                       :total="pageTotal"
                       prev-text="上一页"
                       next-text="下一页"
                       hide-on-single-page></el-pagination>
      </div>
      <div class="right-container">
        <div class="tag-group">
          <el-tag class="tag-item"
                  ref="elTag"
                  v-for="item in tagOptions"
                  :key="item.label"
                  :type="item.type"
                  :style="{background: (selectTag === item.label ? '#000' : '')}"
                  effect="plain"
                  @click="handleNoteTag(item.label)">{{ item.label }}</el-tag>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { reqGetNote, reqDeleteNote } from '../../api/api'
export default {
  name: 'Learn',
  data() {
    return {
      noteData: '',
      pageNum: 1,
      pageSize: 5,
      pageTotal: 0,
      selectTag: '',
      tagOptions: [
        {
          type: 'success',
          label: 'JavaScript'
        },
        {
          type: 'danger',
          label: 'HTML'
        },
        {
          type: 'warning',
          label: 'CSS'
        },
        {
          type: 'danger',
          label: 'TypeScript'
        },
        {
          type: 'success',
          label: 'Vue'
        },
        {
          type: 'danger',
          label: 'Node'
        },
        {
          type: 'warning',
          label: 'Deno'
        }
      ]
    }
  },
  async mounted() {
    this.getData()
  },
  methods: {
    async getData() {
      const res = await reqGetNote({
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        condition: this.selectTag
          ? { noteTag: { $elemMatch: { $eq: this.selectTag } } }
          : ''
      })
      if (res.code === 1) {
        this.noteData = res.data.content
        this.pageSize = res.data.pageSize
        this.pageNum = res.data.pageNum
        this.pageTotal = res.data.pageTotal
      }
    },
    editNote(id) {
      this.$router.push({ path: '/markdown', query: { id: id } })
    },
    dayDif(startTime, endTime) {
      return Math.ceil(
        Math.abs(startTime.getTime() - endTime.getTime()) / 86400000
      )
    },
    deleteNote(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const res = await reqDeleteNote({ id: id })
          if (res.code === 1) {
            this.getData()
            this.$message({
              message: '删除成功！',
              type: 'success'
            })
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 查看文章内容
    showNote(id) {
      this.$router.push({ path: '/layout/learn/note', query: { id: id } })
    },
    // 编辑文章
    enterMarkdown() {
      this.$router.push('/markdown')
    },
    // 处理页面变化回调
    async handleCurChange(val) {
      const res = await reqGetNote({
        pageNum: val,
        pageSize: this.pageSize,
        condition: this.selectTag
          ? { noteTag: { $elemMatch: { $eq: this.selectTag } } }
          : ''
      })
      if (res.code === 1) {
        this.noteData = res.data.content
        this.pageSize = res.data.pageSize
        this.pageNum = res.data.pageNum
        this.pageTotal = res.data.pageTotal
      }
    },
    // 点击标签回调
    async handleNoteTag(tag) {
      this.selectTag = tag
      const res = await reqGetNote({
        pageNum: 1,
        pageSize: 5,
        condition: this.selectTag
          ? { noteTag: { $elemMatch: { $eq: this.selectTag } } }
          : ''
      })
      if (res.code === 1) {
        this.noteData = res.data.content
        this.pageSize = res.data.pageSize
        this.pageNum = res.data.pageNum
        this.pageTotal = res.data.pageTotal
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.learn-container {
  display: flex;
  .left-container {
    flex: 1;
    margin-top: 15px;
    .left-content {
      width: 160px;
      height: 100px;
      margin-left: 20px;
      border-radius: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      background-color: #fff;
      .markdown-icon {
        width: 36px;
        height: 36px;
        vertical-align: bottom;
      }
    }
  }
  .middle-container {
    width: 850px;
    min-height: 800px;
    background-color: #fff;
    padding: 10px 20px;
    margin: 15px 0;
    border-radius: 5px;
    .note-container {
      min-height: 800px;
      .note-content {
        width: 100%;
        height: 140px;
        position: relative;
        padding: 15px 10px;
        box-sizing: border-box;
        border-bottom: 1px solid #e5e6eb;
        cursor: pointer;
        .content-header {
          display: flex;
          align-items: center;
          color: #86909c;
          font-size: 14px;
          .content-time {
            position: relative;
            padding-right: 10px;
            line-height: 22px;
            flex-shrink: 0;
          }
          .content-time:after {
            position: absolute;
            top: 50%;
            right: 0;
            transform: translateY(-50%);
            display: block;
            width: 1px;
            height: 14px;
            background: #e5e6eb;
            content: ' ';
          }
          .content-container {
            display: flex;
            .content-tag {
              position: relative;
              display: flex;
              align-items: center;
              flex-shrink: 0;
              font-size: 13px;
              padding: 0 5px;
              color: #86909c;
            }
            .content-tag-last {
              position: relative;
              display: flex;
              align-items: center;
              flex-shrink: 0;
              font-size: 13px;
              padding: 0 5px;
              color: #86909c;
            }
            .content-tag:after {
              position: absolute;
              right: -1px;
              display: block;
              content: ' ';
              width: 2px;
              height: 2px;
              border-radius: 50%;
              background: #4e5969;
            }
          }
          .content-operate {
            display: flex;
            justify-content: flex-end;
            flex: 2;
            z-index: 100;
          }
        }
        .content-title {
          font-weight: 700;
          font-size: 17px;
          line-height: 24px;
          color: #1d2129;
          width: 100%;
          margin: 10px 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .content-brief {
          color: #86909c;
          font-size: 14px;
          line-height: 22px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          overflow: hidden;
          -webkit-box-orient: vertical;
        }
      }
      // .note-content:hover {
      //   box-shadow: 1px 0px 1px 0px rgba(0, 0, 0, 0.35);
      // }
    }
  }
  .right-container {
    flex: 1;
    margin-top: 15px;
    margin-left: 20px;
    .tag-group {
      width: 260px;
      height: 300px;
      background: #fff;
      border-radius: 5px;
      .tag-item {
        cursor: pointer;
        margin: 8px;
      }
      .tag-item:hover {
        background: aliceblue;
      }
    }
  }
}
</style>
