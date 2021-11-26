<template>
  <div v-animate-css="'fadeInDown'">
    <div class="learn-container"
         v-if="$route.path === '/layout/learn'">
      <div class="left-container">
        <div class="left-content"
             @click="enterMarkdown"
             v-if="$store.state.token">
          <svg-icon class="markdown-icon"
                    iconClass="blog-markdown"></svg-icon>
        </div>
      </div>
      <div class="middle-container">
        <div class="note-container"
             v-if="noteData.length > 0">
          <kinesis-container v-for="note in noteData"
                             :key="note._id">
            <kinesis-element :strength="0.4"
                             type="scale">
              <div class="note-content">
                <div class="content-header">
                  <div class="content-time">{{dayDif(new Date(), new Date(note.createdAt))}}天前</div>
                  <div class="content-container"
                       v-if="tagOptions">
                    <el-tag v-for="item in note.noteTag"
                            :key="item"
                            :type="tagOptions.find(v => v.label === item).type"
                            effect="plain">{{ item }}</el-tag>
                  </div>
                  <div class="content-operate"
                       v-if="$store.state.token">
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
            </kinesis-element>
          </kinesis-container>
          <el-pagination class="pagination"
                         @current-change="handleCurChange"
                         :current-page="pageNum"
                         :page-size="pageSize"
                         layout="total,prev, next"
                         :total="pageTotal"
                         prev-text="上一页"
                         next-text="下一页"
                         hide-on-single-page></el-pagination>
        </div>
        <el-empty v-else
                  :image-size="100"></el-empty>
      </div>
      <div class="right-container">
        <div class="tag-group"
             v-if="tagOptions">
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
import { reqGetNote, reqDeleteNote, reqTagOptions } from '@/api'
export default {
  name: 'Learn',
  data() {
    return {
      noteData: '',
      pageNum: 1,
      pageSize: 5,
      pageTotal: 0,
      selectTag: 'All',
      tagOptions: ''
    }
  },
  async mounted() {
    this.getData(this.pageNum, this.pageSize)
    const res = await reqTagOptions()
    if (res.code === 1) {
      this.tagOptions = res.data
    }
  },
  methods: {
    async getData(pageNum, pageSize) {
      const res = await reqGetNote({
        pageNum: pageNum,
        pageSize: pageSize,
        condition:
          this.selectTag === 'All'
            ? ''
            : { noteTag: { $elemMatch: { $eq: this.selectTag } } }
      })
      if (res.code === 1) {
        this.noteData = res.data.content
        this.pageSize = res.data.pageSize
        this.pageNum = res.data.pageNum
        this.pageTotal = res.data.pageTotal
      }
    },
    dayDif(startTime, endTime) {
      return Math.ceil(
        Math.abs(startTime.getTime() - endTime.getTime()) / 86400000
      )
    },
    // 编辑文章
    editNote(id) {
      this.$router.push({ path: '/markdown', query: { id: id } })
    },
    // 查看文章内容
    showNote(id) {
      this.$router.push({ path: '/layout/learn/note', query: { id: id } })
    },
    // 新增文章
    enterMarkdown() {
      this.$router.push('/markdown')
    },
    // 删除文章
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
    // 处理页面变化回调
    handleCurChange(val) {
      this.getData(val, this.pageSize)
    },
    // 点击标签回调
    handleNoteTag(tag) {
      this.selectTag = tag
      this.getData(1, 5)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/global.scss';
.learn-container {
  display: flex;
  margin-top: 20px;
  margin-bottom: 20px;
  .left-container {
    flex: 1;
    .left-content {
      width: 160px;
      height: 100px;
      margin-left: 20px;
      border-radius: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: url('../../assets/pointer.png'), auto;
      background-color: transparent;
      .markdown-icon {
        width: 36px;
        height: 36px;
        vertical-align: bottom;
      }
    }
  }
  .middle-container {
    width: $width;
    min-height: $min-height;
    background-color: $background-color;
    border-radius: 5px;
    box-shadow: rgb(0 0 0 / 10%) 0px 2px 12px 0px;
    .note-container {
      margin: 20px;
      min-height: 760px;
      position: relative;
      .note-content {
        height: 140px;
        position: relative;
        padding: 15px 10px;
        box-sizing: border-box;
        border-bottom: 1px solid #e5e6eb;
        cursor: url('../../assets/pointer.png'), auto;
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
            font-size: 12px;
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
            margin-left: 10px;
            zoom: 0.8;
            .content-tag {
              position: relative;
              display: flex;
              align-items: center;
              flex-shrink: 0;
              font-size: 13px;
              padding: 0 5px;
              color: #86909c;
            }
          }
          .content-operate {
            display: flex;
            flex: 2;
            justify-content: flex-end;
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
          font-size: 12px;
          line-height: 22px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          overflow: hidden;
          -webkit-box-orient: vertical;
        }
      }
      .pagination {
        text-align: center;
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }
  .right-container {
    flex: 1;
    .tag-group {
      width: 260px;
      height: 300px;
      background: #ffffffbd;
      border-radius: 5px;
      box-shadow: rgb(0 0 0 / 10%) 0px 2px 12px 0px;
      margin-left: 20px;
      padding: 10px;
      box-sizing: border-box;
      .tag-item {
        cursor: url('../../assets/pointer.png'), auto;
        margin: 10px;
      }
      .tag-item:hover {
        background: aliceblue;
      }
    }
  }
}
::v-deep .el-tag {
  margin-right: 5px;
  padding: 0 5px;
  height: 25px;
  line-height: 25px;
}
::v-deep .btn-prev {
  background: transparent;
}
::v-deep .btn-next {
  background: transparent;
}
::v-deep .el-pagination button:disabled {
  background: transparent;
}
</style>
