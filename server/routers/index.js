const router = require('koa-router')();
const path = require("path");
const fs = require('fs');


function includeAllRouter(folder, ignore) {
  let content = [];
      //读取指定文件夹下(dir)的所有文件并遍历
      //console.log('fs.readdirSync(folder)', fs.readdirSync(folder))
  fs.readdirSync(folder).forEach(filename => {
    //取出文件的后缀
    let extname = path.extname(filename);
    //只处理js文件
    if (extname === '.js') {
      //将文件名中去掉后缀
      let name = path.basename(filename, extname);
      //读取文件中的内容并赋值绑定
      if (ignore) {
        if (name !== 'index') {
          content.push(require(path.join(folder, filename)))
        }
      } else {
        content.push(require(path.join(folder, filename)))
      }


    }
  });

  return content
}

const content = includeAllRouter(__dirname, true)
// console.log('__dirname', __dirname)
//  console.log('content', content)
// let content = {}
// const testRouter = require('./test.js')
// const userRouter = require('./user.js')
//content.push(require('./test.js'))
// content.a = require(path.join(__dirname, './test.js'))
// content.b = require(path.join(__dirname, './user.js'))

module.exports = (app) => {
  //testRouter(router)
  //content[0](router)
   //console.log('content', content)
   // testRouter(app)
   // userRouter(app)
  content.forEach(item => {
    item(app)
  })

  //app.use(router.routes(), router.allowedMethods())
}
