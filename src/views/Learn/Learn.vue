<template>
  <div class="learn-container">
    <div class="left-container">
      <div class="left-content">
        <div class="markdown-content" @click="enterMarkdown">
          <svg-icon class="markdown-icon" iconClass="blog-markdown"></svg-icon>
          <span>新建笔记</span>
        </div>
        <div class="markdown-content">
          <svg-icon class="markdown-icon" iconClass="blog-draft"></svg-icon>
          <span>草稿箱</span>
        </div>
      </div>
    </div>
    <div class="middle-container">
      <div class="note-container">
        <div class="note-content" v-for="note in noteData" :key="note.id">
          <div class="content-header">
            <div class="content-time">{{dayDif(new Date(), new Date(note.createdAt))}}天前</div>
            <div class="content-container">
              <div
                v-for="(tag, index) in note.noteTag"
                :key="tag"
                :class="[index === note.noteTag.length - 1 ? 'content-tag-last': 'content-tag']"
              >{{tag}}</div>
            </div>
          </div>
          <div class="content-title">{{note.noteTitle}}</div>
          <div class="content-brief">{{note.noteAbstract}}</div>
          <div class="content-operate">
            <div>
              <svg-icon iconClass="blog-delete" style="width: 16px; height: 16px"></svg-icon>
              <span>删除</span>
            </div>
            <div>
              <svg-icon iconClass="blog-edit" style="width: 16px; height: 16px"></svg-icon>
              <span>编辑</span>
            </div>
          </div>
        </div>
      </div>
      <el-pagination
        style="text-align: center;"
        @current-change="handleCurChange"
        :current-page="pageNum"
        :page-size="pageSize"
        layout="prev, next"
        :total="pageTotal"
        prev-text="上一页"
        next-text="下一页"
      ></el-pagination>
    </div>
    <div class="right-container">
      <div class="tag-group">
        <el-tag
          class="tag-item"
          ref="elTag"
          v-for="(item, index) in tagOptions"
          :key="item.label"
          :type="item.type"
          effect="plain"
          @click="handleNoteTag(item.label, index)"
        >{{ item.label }}</el-tag>
      </div>
    </div>
  </div>
</template>

<script>
import { reqGetNote } from '../../api/api'
export default {
  name: 'Learn',
  data() {
    return {
      noteData: '',
      pageNum: 1,
      pageSize: 5,
      pageTotal: 0,
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
          label: 'Node'
        },
        {
          type: 'danger',
          label: 'Vue'
        },
        {
          type: 'warning',
          label: 'Deno'
        }
      ]
    }
  },
  methods: {
    async handleCurChange(val) {
      const res = await reqGetNote({
        pageNum: val,
        pageSize: this.pageSize
      })
      if (res.code === 1) {
        this.noteData = res.data.content
        this.pageSize = res.data.pageSize
        this.pageNum = res.data.pageNum
        this.pageTotal = res.data.pageTotal
      }
    },
    async handleNoteTag(tag, index) {
      const res = await reqGetNote({
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        condition: { noteTag: { $elemMatch: { $eq: tag } } }
      })
      if (res.code === 1) {
        this.noteData = res.data.content
        this.pageSize = res.data.pageSize
        this.pageNum = res.data.pageNum
        this.pageTotal = res.data.pageTotal
      }
      this.$nextTick(() => {
        this.$refs.elTag[index].$el.style.background = '#000'
      })
    },
    enterMarkdown() {
      this.$router.push('/markdown')
    },
    dayDif(startTime, endTime) {
      return Math.ceil(
        Math.abs(startTime.getTime() - endTime.getTime()) / 86400000
      )
    }
  },
  async mounted() {
    const res = await reqGetNote({
      pageNum: this.pageNum,
      pageSize: this.pageSize
    })
    if (res.code === 1) {
      this.noteData = res.data.content
      this.pageSize = res.data.pageSize
      this.pageNum = res.data.pageNum
      this.pageTotal = res.data.pageTotal
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
      background-color: #fff;
      width: 160px;
      height: 180px;
      margin-left: 20px;
      border-radius: 5px;
      padding-top: 10px;
      .markdown-content {
        width: 100%;
        height: 30px;
        line-height: 20px;
        cursor: pointer;
        text-align: left;
        padding-top: 10px;
      }
      .markdown-content:hover {
        background-color: rgba(0, 183, 255, 0.39);
      }
      .markdown-icon {
        width: 22px;
        height: 22px;
        vertical-align: bottom;
        margin: 0 10px 0 5px;
      }
    }
  }
  .middle-container {
    width: 750px;
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
              padding: 0 10px;
              color: #86909c;
            }
            .content-tag-last {
              position: relative;
              display: flex;
              align-items: center;
              flex-shrink: 0;
              font-size: 13px;
              padding: 0 10px;
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
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .content-operate {
          display: flex;
          margin-top: 10px;
        }
      }
      .note-content:hover {
        box-shadow: 0 0 10px 0px rgba(0, 0, 0, 0.35);
      }
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
