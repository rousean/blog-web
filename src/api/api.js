import http from '../http/http'

// 上传图片
export const reqUploadFile = (formData) =>
  http('/material/uploadSingle', formData, 'POST')

// 文章笔记保存
export const reqSaveNote = (data) => http('/learn/saveNote', data, 'POST')

// 获取背景音乐列表
export const reqAudioList = () => http('/audio/audioList')
