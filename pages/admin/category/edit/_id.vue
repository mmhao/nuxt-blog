<template lang="html">
  <div class="page">
    <el-form ref="formRef" :model="formData" :rules="formRule" label-width="80px">
    <el-form-item label="分类名称" prop="name">
      <el-input v-model="formData.name"></el-input>
    </el-form-item>
    <el-form-item label="分类url" prop="router">
      <el-input v-model="formData.router"></el-input>
    </el-form-item>
    <el-form-item label="排序" prop="sort">
      <el-input v-model="formData.sort"></el-input>
    </el-form-item>
    <el-form-item label="备注">
      <el-input type="textarea" v-model="formData.remark"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button @click="rBack">取消</el-button>
    </el-form-item>
  </el-form>
  </div>
</template>

<script>
const {categoryDetail,updateCategory} = require('interface/category')
export default {
  layout: 'admin/default',
  data () {
    return {
      formData: {
        name: '',
        sort: 10,
        router: '',
        remark: ''
      },
      formRule: {
        name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
          { min: 2, max: 16, message: '长度在 2 到 16 个字符', trigger: 'blur' }
        ],
        sort: [
          { required: true, message: '请输入排序数字，数字越大排越后', trigger: 'blur' }
        ],
        router: [
            { required: true, message: '请输入url,类似category/list', trigger: 'blur' },
            { min: 2 ,message: '长度在 2个以上', trigger: 'blur' }
          ],
      }
    }
  },
  asyncData (ctx) {
    let opts = {}
    opts = process.server ? {headers: {cookie: ctx.req.headers.cookie}} : {}

    let params = ctx.params
    opts.params = ctx.params
    return categoryDetail(opts).then((resp)=>{
      let respData = resp.data
      if (respData.code === 20000) {
        let formData = respData.data || {}
        return {formData}
      }
    })
  },
  methods: {
    rBack () {
      this.$router.push({name: 'admin-category'})
    },
    onSubmit () {
      let _this = this
      _this.$refs.formRef.validate((valid) => {
          if (valid) {
            let reqData = {
              id: this.formData._id,
              name: this.formData.name,
              sort: this.formData.sort,
              router: this.formData.router,
              remark: this.formData.remark,
            }
            updateCategory(reqData).then((resp)=>{
              let respData = resp.data || {}
              if (respData.code === 20000) {
                this.$message({
                   message: respData.message || '修改成功',
                   onClose: ()=>{
                     _this.$router.push({name: 'admin-category'})
                   }
                 });
              } else {
                _this.$message({
                   message: respData.message || '修改失败',
                   type: 'warning'
                 });
              }
            })
          } else {
            _this.$message({
               message: '清正确填写表单！',
               type: 'warning'
             });
            return false;
          }
        });

    }
  },
}
</script>

<style lang="css" scoped>
</style>
