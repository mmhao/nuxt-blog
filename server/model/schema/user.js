const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema
const SALT_WORK_FACTOR = 10 // 盐的级别


const userSchema = new Schema({
  account: {
    type: String,
    unique: true,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  nickname: {
    type: String,
  },
  create_at: {
    type: Number,
    require: true
  },
  update_at: {
    type: Number,
    require: true
  },
  deleted: {
    type: Boolean,
    require: true,
    default: false
  }
})



// 中间件，自动增加创建或更新时间
userSchema.pre('save', function(next) {
  if (this.isNew) {
    this.create_at = this.update_at = Date.now()
    this.nickname = this.nickname ||  this.account + Math.random().toString().split('.')[1].substring(0, 5)
  } else {
    this.update_at = Date.now()
  }
  next()
})

// 自动为密码加密
userSchema.pre('save', function(next) {
  let _this = this
  // 不查看密码有没有被更改，没直接返回
  if (!_this.isModified('password')) return next()
  // 根据SALT_WORK_FACTOR获取盐salt然后利用该盐加密
  bcrypt.genSalt(SALT_WORK_FACTOR, (error, salt) => {
    if (error) return next(error)
    // 用盐给密码加密称为hash
    bcrypt.hash(_this.password, salt, (error, hash) => {
      if (error) return next(error)
      _this.password = hash
      next()
    })
  })
})


// 静态方法，有2种
// 只能在new model使用
// userSchema.methods = {
//   comparePassword: (_password, password) => {
//     return new Promise((resolve, reject) => {
//       bcrypt.compare(_password, password, (error, isMatch)=>{
//         if (!error) resolve(isMatch)
//         else reject(error)
//
//       })
//     })
//   }
// }
userSchema.statics = {
  // 方便模型对比密码，_password是用户的参数，password是数据库的密码
  comparePassword: function(_password, password) {
    return new Promise((resolve, reject) => {
      // 解除盐来解密得到密码
      bcrypt.compare(_password, password, (error, isMatch)=>{
        if (!error) resolve(isMatch)
        else reject(error)

      })
    })
  }
}


module.exports =  mongoose.model('user', userSchema)
















//module.exports = mongoose.model('user', userSchema)
