const mongoose = require('mongoose')
const Schema = mongoose.Schema
const categorySchema = new Schema({
  router: {
    type: String,
    unique: true,
    require: true
  },
  name: {
    type: String,
    require: true
  },
  sort: {
    type: Number,
    require: true,
    default: 10
  },
  remark: {
    type: String,
    require: true
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
  },
  article: [
    {
      type: Schema.Types.ObjectId,
      ref: 'article'
    }
  ],
  chat: [
    {
      type: Schema.Types.ObjectId,
      ref: 'chat'
    }
  ]
})

// 中间件，自动增加创建或更新时间
categorySchema.pre('save', function(next) {
  if (this.isNew) {
    this.create_at = this.update_at = Date.now()
  } else {
    this.update_at = Date.now()
  }
  next()
})

module.exports =  mongoose.model('category', categorySchema)
