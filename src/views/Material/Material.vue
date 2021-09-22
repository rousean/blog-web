<template>
  <el-upload drag multiple action="" :http-request="uploadFile">
    <i class="el-icon-upload"></i>
    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    <div class="el-upload__tip" slot="tip">
      只能上传jpg/png文件，且不超过500kb
    </div>
  </el-upload>
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

<style scoped></style>
