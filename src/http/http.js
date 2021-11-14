import axios from 'axios'

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

export default http
