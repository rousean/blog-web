<template>
  <div class="material-container">
    <el-upload drag multiple action :http-request="uploadFile">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">
        将文件拖到此处，或
        <em>点击上传</em>
      </div>
      <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
  </div>
</template>

<script>
import { reqUploadFile } from '../../api/api'
export default {
  name: 'Material',
  data() {
    return {}
  },
  methods: {
    async uploadFile(params) {
      let formData = new FormData()
      formData.set('file', params.file)
      const result = await reqUploadFile(formData)
      console.log(result)
    }
  }
}
</script>

<style lang="scss" scoped>
.material-container {
  width: 850px;
  min-height: 880px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  margin-bottom: 20px;
  background-color: #fff;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 5px;
}
</style>
