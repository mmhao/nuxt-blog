<template>
  <div class="page listPage">
    <el-row :gutter="20" class="list">
      <el-col :span="24">
        <template v-if="tableData.list.length">
        <div class="item" v-for="item in tableData.list">
          <h1>
            <nuxt-link class="title" :to="'/' + item.router +'/' + item.post._id">{{item.post.title}}</nuxt-link>
          </h1>
          <div class="info">
            <span>
              <i class="el-icon-time"></i>
              <b>{{renderDate(item.post.create_at)}}</b>
            </span>
            <span v-if="item.post.tag.length">
              <i class="el-icon-link"></i>
              <nuxt-link :to="'/tag/' + t" v-for="(t, index) in item.post.tag" :key="index" class="mr10">{{t}}</nuxt-link>
            </span>
            <span>
              <i class="el-icon-folder"></i>
              <nuxt-link :to="'/' + item.router">{{item.name}}</nuxt-link>
            </span>

          </div>
          <div class="main" v-html="item.post.summary">
          </div>
          <nuxt-link  class="readmoreBtn" :to="'/' + item.router +'/' + item.post._id">阅读全文</nuxt-link>
        </div>
        </template>
        <div class="tc" v-else>已经没有数据了</div>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="pagination" v-if="tableData.list.length">
      <el-col :span="24" class="tc">
        <el-pagination
          layout="prev, pager, next"
          :page-size="paginationData.pre_page"
          :current-page="paginationData.page"
          :total="tableData.total"
          @current-change="rCurrentPageChange"
          >
        </el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
const {postList} = require('interface/tag')
import {renderDate} from 'assets/js/utils/index.js'
export default {
  layout: 'web/default',
  components: {
  },
  data () {
    return {
      tableData: {
        total: 0,
        list: []
      },

    }
  },
  asyncData (ctx) {
    let opts = {}
    if (process.server) {
      opts = {headers: {cookie: ctx.req.headers.cookie}, params: {}}
    }
    opts.params = ctx.query
    opts.params.tag = ctx.params.tag
    return postList(opts).then((resp)=>{
      let reapData = resp.data
      if (reapData.code === 20000) {
        let tableData = reapData.data || {}
        return {tableData}
      }
    })
  },
  computed: {
    paginationData () {
      let query = this.$route.query
      let page = parseInt(query.page || 1, 10)
      let pre_page = parseInt(query.pre_page || 10, 10)
      return {
        page,
        pre_page
      }
    }
  },
  methods: {
    rCurrentPageChange(currentPage) {
      let {pre_page} = this.paginationData
      this.$router.push({path: '/', query: {
        pre_page,
        page: currentPage
      }})
    },
    renderDate,
  }
}
</script>

<style  lang="scss" scoped>

</style>
