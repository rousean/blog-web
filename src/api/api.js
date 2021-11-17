import http from '../http/http'

// 项目模块
// 项目模块上传图片
export const reqUploadFile = (formData) =>
  http('/material/uploadSingle', formData, 'POST')

// 首页模块
// 获取背景音乐列表
export const reqAudioList = () => http('/audio/audioList')

// 学习模块
// 文章笔记保存
export const reqSaveNote = (params) => http('/learn/saveNote', params, 'POST')

// 获取文章列表
export const reqGetNote = (params) => http('/learn/getNote', params, 'POST')

// 根据文章id获取文章内容
export const reqGetNoteById = (params) =>
  http('/learn/getNoteById', params, 'POST')

// 根据文章id获取文章内容
export const reqDeleteNote = (params) =>
  http('/learn/deleteNote', params, 'POST')

export const reqUpdateNote = (params) =>
  http('/learn/updateNote', params, 'POST')

// Markdown上传图片接口
export const reqUploadImage = (params) =>
  http('/learn/uploadImage', params, 'POST')
