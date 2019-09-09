const mongoose = require('mongoose')
const Schema = mongoose.Schema
const newsSchema = new Schema({
  router: {
    type: String,
    unique: true,
    require: true
  },
  name: {
    type: String,
    require: true
  },
  remark: {
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

module.exports =  mongoose.model('news', newsSchema)
