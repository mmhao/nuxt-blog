<template lang="html">
  <div class="page">
    <el-form ref="formRef" :model="formData" :rules="formRule"  label-width="80px">
    <el-form-item label="标题" prop="title">
      <el-input v-model="formData.title"></el-input>
    </el-form-item>
    <el-form-item label="描述" class="summaryEditorBox">
      <div class="quill-editor"
         v-model="formData.summary"
         v-quill:summarylEditor="summaryEditorOption"
         >
       </div>
       <div class="summaryEditorToolbar"></div>
    </el-form-item>
    <el-form-item label="内容" class="contentEditorBox">
      <div class="quill-editor"
         v-model="formData.content"
         v-quill:contentEditor="contentEditorOption"
         >
       </div>

    </el-form-item>
    <el-form-item label="文章标签">
      <el-tag
        :key="t"
        v-for="t in formData.tag"
        closable
        :disable-transitions="false"
        @close="rRemoveTag(t)">
        {{t}}
      </el-tag>
      <el-input
        class="input-new-tag"
        v-if="showTagInput"
        v-model="tagInput"
        ref="saveTagInput"
        size="small"
        @keyup.enter.native="rTagInputConfirm"
        @blur="rTagInputConfirm"
      >
      </el-input>
      <el-button v-else class="button-new-tag" size="small" @click="rShowInput">+ New Tag</el-button>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">确定修改</el-button>
      <el-button @click="rBack">取消</el-button>
    </el-form-item>
  </el-form>
  </div>
</template>

<script>
const {articleDetail,updateArticle} = require('interface/article')
export default {
  layout: 'admin/default',
  data () {
    return {
      formData: {
        title: '',
        summary: '',
        content: '',
        tag: [],
      },
      style: '', // 用来存哪个链接，类似c/news c/case这种来区分
      path: '',
      showTagInput: false,
      tagInput: '',
      formRule: {
        title: [
            { required: true, message: '请输入标题', trigger: 'blur' },
            { min: 2, max: 16, message: '长度在 2 到 200 个字符', trigger: 'blur' }
          ]
      },
      summaryEditorOption: {
        placeholder: '请输入摘要内容，最好是总结内容',
        modules: {
          toolbar: ".summaryEditorToolbar"
        }
      },
      contentEditorOption: {
        placeholder: '请输入正文',
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"], // 加粗 斜体 下划线 删除线
            ["blockquote", "code-block"], // 引用  代码块

            // [{ header: 1 }, { header: 2 }], // 1、2 级标题
            [{ list: "ordered" }, { list: "bullet" }], // 有序、无序列表
            [{ script: "sub" }, { script: "super" }], // 上标/下标
            [{ indent: "-1" }, { indent: "+1" }], // 缩进
            // [{'direction': 'rtl'}],  // 文本方向

            [{ size: ["small", false, "large", "huge"] }], // 字体大小
            [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题

            [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
            [{ font: [] }], // 字体种类
            [{ align: [] }], // 对齐方式

            ["clean"], // 清除文本格式
            ["link", "image", "video"] // 链接、图片、视频
          ]
        }
      },

    }
  },
  asyncData (ctx) {
    let opts = {}
    opts = process.server ? {headers: {cookie: ctx.req.headers.cookie}} : {}

    let params = ctx.params
    opts.params = ctx.params
    return articleDetail(opts).then((resp)=>{
      let reapData = resp.data
      let formData = reapData.data || {}
      return {formData}
    })
  },
  mounted() {
    let aRouter = this.$route.path.split('/')
    this.path = aRouter.slice(0, 4).join('/')
    this.style = aRouter.splice(2, 2).join('/')
  },
  methods: {
    rBack () {
      this.$router.push({path: this.path})
    },
    rShowInput() {
      this.showTagInput = true;
       this.$nextTick(_ => {
         this.$refs.saveTagInput.$refs.input.focus();
       });
    },
    rRemoveTag (tag) {
      this.formData.tag.splice(this.formData.tag.indexOf(tag), 1);
    },
    rTagInputConfirm() {
      let inputValue = this.tagInput.replace(/\s/g, '');
        if (inputValue) {
          this.formData.tag.push(inputValue);
        }
        this.showTagInput = false;
        this.tagInput = '';
    },
    onSubmit () {
      let _this = this
      _this.$refs.formRef.validate((valid) => {
          if (valid) {
            if (!_this.formData.summary.replace(/\s/g, '') || !_this.formData.content.replace(/\s/g, '')) {
              _this.$message({
                 message: '摘要或内容不能为空',
                 type: 'warning'
               });
               return
            }
            let reqData = {
              id: this.formData._id,
              title: this.formData.title,
              summary: this.formData.summary,
              content: this.formData.content,
              tag: this.formData.tag,
              style: _this.style
            }

            updateArticle(reqData).then((resp)=>{
              let respData = resp.data || {}
              if (respData.code === 20000) {
                this.$message({
                   message: respData.message || '修改成功',
                   onClose: ()=>{
                     _this.$router.push({path: this.path})
                   }
                 });
              } else {
                _this.$message({
                   message: respData.message || '修改失败',
                   type: 'warning'
                 });
              }
            })
          }
        });

    }
  },
}
</script>

<style lang="scss" scoped>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
.summaryEditorToolbar {
  display: none;
}
.summaryEditorBox .ql-container {
  height: 80px;
}
.contentEditorBox .ql-container {
  height: 300px;
}
</style>
