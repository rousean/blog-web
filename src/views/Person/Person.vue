<template>
  <div class="person-container">
    <el-avatar :size="100"
               :src="url"></el-avatar>
    <div style="margin-top:10px">
      <span>张海东</span>
      <span style="margin-left:10px;font-size:12px;color:#8c8c8c;vertical-align: bottom;">Rousean</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Person',
  data() {
    return {
      url: `${process.env.VUE_APP_IMAGE_PATH}/rousean.jpg`
    }
  }
}
</script>

<style lang="scss" scoped>
.person-container {
  width: 850px;
  min-height: 800px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  margin-bottom: 20px;
  background-color: #fff;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 5px;
  box-shadow: rgb(0 0 0 / 10%) 0px 2px 12px 0px;
}
</style>
