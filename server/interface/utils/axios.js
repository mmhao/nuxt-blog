const axios = require('axios')
const {Message} = require('element-ui');


let xhr = axios.create({
  baseURL: `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 3000}`,
  timeout: 1000,
  headers: {

  }
});

xhr.interceptors.response.use(function (resp) {
  return resp
}, function (error) {
    Message({
      message: '网络错误，请重新刷新或联系管理员',
      errmsg: error,
      type: 'error'
    });
    return Promise.reject(error)
})



//export default xhr
module.exports = xhr;
