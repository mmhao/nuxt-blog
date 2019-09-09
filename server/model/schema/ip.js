const mongoose = require('mongoose')
let to = require('await-to-js').default
const Schema = mongoose.Schema
const MAX_LOGIN_TIMES = 5 // 限制登录次数
const LOCK_TIME = 30 * 60 * 1000 // 30分钟

const ipSchema = new Schema({
  ip: {
    type: String
  },
  type: {
    type: String,
    require: true
  },
  lockUntil: {
    type: Number,
    default: 0
  },
  loginAttempts: {
    type: Number,
    default: 0
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


// 虚拟字段
ipSchema.virtual('isLocked').get(function(){
  return !!(this.lockUntil && this.lockUntil > Date.now())
})


// 中间件，自动增加创建或更新时间
ipSchema.pre('save', function(next) {
  if (this.isNew) {
    this.create_at = this.update_at = Date.now()
  } else {
    this.update_at = Date.now()
  }
  next()
})


ipSchema.statics.incLoginAttepts = async function({ip, type}) {
    let _this = this
    let [fError, fResult] = await to(_this.findOne({ip, type}, 'ip lockUntil loginAttempts'))
    if (fError) throw new Error(fError);
    // 没登录过
    if (!fResult) {
      let [cError, cResult] = await to(_this.create({ip, type}))
      if (!cError) return true
      else throw new Error(cError);

    }
    // 如果之前登录过且已经没锁定，重置次数
    if (fResult.lockUntil && fResult.lockUntil < Date.now()) {
      let [uError, uResult] = await to({ip: fResult.ip}, _this.update({
        $set: {
          loginAttempts: 1
        },
        $unset: {
          lockUntil: 1
        }
      }))
      if (!uError) return true
      else throw new Error(uError);
    } else {
      // 已经锁定
      if (fResult.lockUntil > Date.now()) {
        return false
      }
      // 正常增加或锁定
      let updates = {
        $inc: {
          loginAttempts: 1
        }
      }
      let entity = new _this()
      // 如果超过次数，锁定
      if (fResult.loginAttempts + 1 >= MAX_LOGIN_TIMES && !entity.isLocked) {
        updates.$set = {
          lockUntil: Date.now() + LOCK_TIME
        }
      }
      let [uError, uResult] = await to(_this.update({ip: fResult.ip},updates))
      if (!uError) return true
      else throw new Error(uError);


    }
  }

//export default mongoose.model('ip', ipSchema)
module.exports =  mongoose.model('ip', ipSchema)
