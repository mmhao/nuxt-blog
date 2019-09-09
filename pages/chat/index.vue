<template>
  <div class="page listPage">
    <list :list="tableData.list"></list>
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
const {chatList} = require('interface/chat')
import list from 'c/web/page/list/index'

export default {
  layout: 'web/default',
  components: {
    list
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
    return chatList(opts).then((resp)=>{
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
      let path = this.$route.path
      this.$router.push({path: path, query: {
        pre_page,
        page: currentPage
      }})
    },
  }
}
</script>

<style  lang="scss" scoped>
.page {
  .item {
    padding: 20px;
    margin-top: 30px;
    box-shadow: 0 0 5px #eee;
    .title {
      font-size: 24px;
      line-height: 32px;
      color: #555;
      &:hover {
        color: #72c02c;
      }
    }
    .info {
      margin-top: 20px;
      padding: 5px 0;
      border-top: 1px solid #eee;
      font-size: 12px;
      span {
        margin-right: 20px;
        b {
          margin: 2px;
        }
      }
    }
    .main {
      line-height: 2;
      p {
        margin-top: 10px;
      }
    }
    .readmoreBtn {
      display: inline-block;
      margin-top: 20px;
      color: #72c02c;
    }

  }
  .pagination {
    margin-top: 50px;
  }
}
</style>
