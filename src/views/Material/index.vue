<template>
  <div class="material-container">
    <div class="item-container"
         v-for="list in lists"
         :key="list.titleName">
      <div class="item-title">
        <svg-icon :iconClass="`blog-${list.titleIcon}`"
                  className="title-icon"></svg-icon>
        <span>{{list.titleName}}</span>
      </div>
      <div class="item-wrapper">
        <div class="material-item"
             v-for="item in list.items"
             :key="item.itemTitle"
             @click="open(item.itemUrl)"
             v-animate-css.hover="'pulse'">
          <div>
            <svg-icon :iconClass="`blog-${item.itemIcon}`"
                      className="item-icon"></svg-icon>
            <div>{{item.itemTitle}}</div>
          </div>
          <div>{{item.itemContent}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reqGetMaterial } from '@/api'
export default {
  name: 'Material',
  data() {
    return {
      lists: ''
    }
  },
  async mounted() {
    const res = await reqGetMaterial({})
    if (res.code === 1) {
      this.lists = res.data
    }
  },
  methods: {
    open(url) {
      window.open(url)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/global.scss';
.material-container {
  width: 850px;
  min-height: $min-height;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  margin-bottom: 20px;
  .item-container {
    background: $background-color;
    padding: 20px;
    border-radius: 5px;
    box-shadow: $box-shadow;
    margin-bottom: 20px;
    .item-title {
      margin-left: 10px;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      font-weight: 700;
      .title-icon {
        margin-right: 15px;
        width: 22px;
        height: 22px;
      }
    }
    .item-wrapper {
      display: flex;
      flex-wrap: wrap;
      .material-item {
        width: 240px;
        height: 100px;
        border: 1px solid #eeeeee;
        border-radius: 5px;
        margin: 10px;
        padding: 10px;
        box-sizing: border-box;
        font-size: 12px;
        cursor: url('../../assets/pointer.png'), auto;
        > div:nth-child(1) {
          display: flex;
          margin-bottom: 10px;
          font-size: 12px;
          align-items: center;
          .item-icon {
            width: 26px;
            height: 26px;
            margin-right: 5px;
          }
        }
        > div:nth-child(2) {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          color: #8c8c8c;
        }
      }
      .material-item:hover {
        background: aliceblue;
        box-shadow: $box-shadow;
      }
    }
  }
}
</style>
