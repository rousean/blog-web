import axios from 'axios'
import { Message } from 'element-ui'

const config = {
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 1000
}

function http(url, params = {}, type = 'GET') {
  return new Promise((resolve, reject) => {
    let promise
    if (type === 'GET') {
      let keys = Object.keys(params)
      if (keys.length !== 0) {
        let param = ''
        for (let i = 0; i < keys.length; i++) {
          let key = keys[i]
          let value = params[key]
          if (i === keys.length - 1) {
            param += `${key}=${value}`
          } else {
            param += `${key}=${value}&`
          }
        }
        url = url + '?' + param
      }
      promise = axios.get(url, config)
    } else {
      promise = axios.post(url, params, config)
    }
    // 返回Promise
    promise.then((res) => resolve(res.data)).catch((err) => reject(err))
  })
}

// 数据请求拦截
axios.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 返回响应数据拦截
axios.interceptors.response.use(
  (res) => {
    if (res.status === 200) {
      if (res.data.code === 1) {
        return Promise.resolve(res)
      } else {
        Message({
          type: 'error',
          message: res.data.msg,
          showClose: true
        })
        return Promise.resolve(res)
      }
    }
  },
  (error) => {
    if (error.response.status) {
      switch (error.response.status) {
        case 404:
          ElMessage({
            type: 'error',
            message: '请求路径找不到！',
            showClose: true
          })
          break
        case 502:
          ElMessage({
            type: 'error',
            message: '服务器内部报错！',
            showClose: true
          })
          break
        default:
          break
      }
    }
    return Promise.reject(error)
  }
)

export default http
