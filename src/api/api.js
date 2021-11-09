import http from '../http/http'

// 上传图片
export const reqUploadFile = (formData) =>
  http('/material/uploadSingle', formData, 'POST')

// 文章笔记保存
export const reqSaveNote = (params) => http('/learn/saveNote', params, 'POST')

// 获取文章列表
export const reqGetNote = (params) => http('learn/getNote', params, 'POST')

// 获取背景音乐列表
export const reqAudioList = () => http('/audio/audioList')
