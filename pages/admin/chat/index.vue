<template lang="html">
  <div class="page">
    <el-button
    plain
    @click="rToAdd">
    创建文章
  </el-button>
  <div class="main">
    <el-table
      :data="tableData"
      stripe
      style="width: 100%">
      <el-table-column
      type="index"
      label="序号"
      width="50">
    </el-table-column>
      <el-table-column
        prop="_id"
        label="id"
        width="200">
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题">
      </el-table-column>
      <el-table-column
        width="100"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="rToEdit(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="rRemove(scope.row)">删除</el-button>
      </template>
      </el-table-column>
    </el-table>
    <div class="tc mt20">
      <el-pagination
        layout="prev, pager, next"
        :page-size="paginationData.pre_page"
        :current-page="paginationData.page"
        :total="paginationData.total"
        @current-change="rCurrentPageChange"
        >
      </el-pagination>
    </div>
  </div>
  </div>
</template>

<script>
const {chatList, deleteChat} = require('interface/chat')
export default {
  data () {
    return {
      tableData: [],
      paginationData: {
        total: 0,
        page: 1,
        pre_page: 10
      }
    }
  },
  layout: 'admin/default',
  middleware: 'admin/passport',
  mounted() {
    this.getList({params: this.paginationData})
  },
  methods: {
    rToAdd() {
      this.$router.push({name: 'admin-chat-add'})
    },
    rToEdit(row) {
      this.$router.push({name: 'admin-chat-edit-id', params: {id: row._id}})
    },
    rRemove(row) {
      let _this = this
      deleteChat({data:{id: row._id}}).then((resp) => {
        let respData = resp.data || {}
        if (respData.code === 20000) {
          this.$message({
             message: respData.message || '删除成功',
             onClose: ()=>{
               _this.tableData.forEach((v, i)=>{
                 if (v._id === row._id) {
                   _this.tableData.splice(i, 1)
                 }
               })
             }
           });
        } else {
          _this.$message({
             message: respData.message || '删除失败',
             type: 'warning'
           });
        }
      })
    },
    rCurrentPageChange(currentPage) {
      this.paginationData.page = currentPage
      this.getList({params: this.paginationData})
    },
    getList(options) {
      let _this = this
      let opts = options || {}
      chatList(opts).then((resp)=>{
        let respData = resp.data
        let data = respData.data || {}
        _this.tableData = data.list || []
        _this.paginationData.total = data.total || 0
      })
    }
  }
}
</script>

<style lang="css" scoped>
</style>
