<template lang="html">
  <div class="page detailPage">
    <h1>{{formData.title}}</h1>
    <div class="info">
      <span>
        <i class="el-icon-time"></i>
        <b>{{renderDate(formData.create_at)}}</b>
      </span>
      <span v-if="formData.tag.length">
        <i class="el-icon-link"></i>
        <nuxt-link :to="'/tag/'+ t" v-for="(t,index) in formData.tag" :key="index" class="mr10">{{t}}</nuxt-link>
      </span>
      <span>
        <i class="el-icon-folder"></i>
        <nuxt-link :to="'/'+ formData.category.router">{{formData.category.name}}</nuxt-link>
      </span>
    </div>
    <div class="main" v-html="formData.content">
    </div>
  </div>
</template>

<script>
import {renderDate} from 'assets/js/utils/index.js'
const {chatDetail} = require('interface/chat')

export default {
  layout: 'web/default',
  data () {
    return {
      formData: {
        title: '',
        summary: '',
        content: '',
        tag: [],
      },
    }
  },
  asyncData (ctx) {
    let opts = {}
    opts = process.server ? {headers: {cookie: ctx.req.headers.cookie}} : {}

    let params = ctx.params
    opts.params = ctx.params
    return chatDetail(opts).then((resp)=>{
      let respData = resp.data
      if (respData.code === 20000) {
        let formData = respData.data || {}
        return {formData}
      }
    })
  },
  methods: {
    renderDate
  },
}
</script>

<style lang="scss" scoped>

</style>
