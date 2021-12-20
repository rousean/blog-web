import http from '@/http'

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

// 删除文章
export const reqDeleteNote = (params) =>
  http('/learn/deleteNote', params, 'POST')

// 更新文章
export const reqUpdateNote = (params) =>
  http('/learn/updateNote', params, 'POST')

// Markdown上传图片接口
export const reqUploadImage = (params) =>
  http('/learn/uploadImage', params, 'POST')

// 获取文章标签接口
export const reqTagOptions = () => http('/learn/tagOptions')

// 登录接口
export const reqLogin = (params) => http('/user/login', params, 'POST')

// 项目模块
// 项目模块上传图片
export const reqUploadFile = (params) =>
  http('/material/uploadSingle', params, 'POST')

// 获取素材列表
export const reqGetMaterial = (params) =>
  http('/material/getMaterial', params, 'POST')

// 获取项目列表
export const reqGetProject = (params) =>
  http('/material/getProject', params, 'POST')
