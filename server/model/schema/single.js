const mongoose = require('mongoose')
const Schema = mongoose.Schema
const singleSchema = new Schema({
  title: {
    type: String,
    require: true
  },
  summary: {
    type: String,
    require: true
  },
  content: {
    type: String,
    require: true
  },
  tag: {
    type: Array
  },
  style: {
    type: String,
    require: true
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'category'
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
singleSchema.pre('save', function(next) {
  if (this.isNew) {
    this.create_at = this.update_at = Date.now()
  } else {
    this.update_at = Date.now()
  }
  next()
})

//export default mongoose.model('single', singleSchema)
module.exports =  mongoose.model('single', singleSchema)
