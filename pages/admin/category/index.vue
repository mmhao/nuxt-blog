<template lang="html">
  <div class="page">
    <el-button
    plain
    @click="rToAdd">
    创建分类
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
        prop="name"
        label="名称"
        width="150">
      </el-table-column>
      <el-table-column
        prop="sort"
        label="排序"
        width="50">
      </el-table-column>
      <el-table-column
        prop="router"
        label="router"
        width="100">
      </el-table-column>
      <el-table-column
        prop="remark"
        label="备注">
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

  </div>
  </div>
</template>

<script>
const {categoryList, deleteCategory} = require('interface/category')
export default {
  data () {
    return {
      tableData: []
    }
  },
  layout: 'admin/default',
  middleware: 'admin/passport',
  asyncData (ctx) {
    let opts = {}
    opts = process.server ? {headers: {cookie: ctx.req.headers.cookie}} : {}
    return categoryList(opts).then((resp)=>{
      let respData = resp.data
      if (respData.code === 20000) {
        let data = respData.data || {}
        let tableData = data.list
        return {tableData}
      } else {
        return {tableData: []}
      }
    })
  },
  methods: {
    rToAdd() {
      this.$router.push({name: 'admin-category-add'})
    },
    rToEdit(row) {
      this.$router.push({name: 'admin-category-edit-id', params: {id: row._id}})
    },
    rRemove(row) {
      let _this = this

      deleteCategory({data:{id: row._id}}).then((resp) => {
        let respData = resp.data || {}
        if (respData.code === 20000) {
          this.$message({
             message: respData.message || '删除成功',
             onClose: ()=>{
               _this.tableData.forEach((v, i)=>{
                 if (v._id === row._id) {
                   _this.tableData.splice(i, 1)
                   //_this.tableData
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
    }
  }
}
</script>

<style lang="css" scoped>
</style>
