<template>
  <el-row type="flex" justify="center">
    <el-col :span="10">
      <div class="login">
        <el-form :model="formData" status-icon :rules="formRule" ref="formRef" class="demo-ruleForm">
          <h3 class="title">欢迎注册</h3>
          <el-form-item label="" prop="account">
            <el-input v-model="formData.account" placeholder="请输入账号" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="" prop="password">
            <el-input type="password" v-model="formData.password" placeholder="请输入密码" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="" prop="passwordAgain">
            <el-input type="password" v-model="formData.passwordAgain" placeholder="请再次输入密码" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="" prop="vertycode">
            <el-row>
              <el-col :span="14">
                <el-input type="text" v-model="formData.vertycode" placeholder="请输入验证码" autocomplete="off"></el-input>
              </el-col>
              <el-col :span="10">
                <img class="vertycode" :src="vertycodeSrc" alt="" @click="rChangeVertycode">
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item >
            <el-button class=" w" type="primary" @click="rLogin">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
  </el-col>
  </el-row>
</template>
<script>
const {createUser} = require('interface/user.js')

export default {
  name: "",
  layout: "web/none",
  data () {
    var validatePassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (/\s/g.test(value) || value.length < 3) {
            callback(new Error('密码格式不正确，不能含有空格和长度要大于3'));
          }
          callback()
        }
      };
    var validatePassAgain = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.formData.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      formData: {
        account: '',
        password: '',
        passwordAgain: '',
        vertycode: ''
      },
      vertycodeSrc: '/api/vertycode/10010',
      formRule: {
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 3, max: 30, message: '长度在 3 到 30 个字符', trigger: 'blur' }
        ],
        password: { validator: validatePassword, trigger: 'blur' },
        passwordAgain: [
            { validator: validatePassAgain, trigger: 'blur' }
          ],
        vertycode: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
        ],
      }
    }
  },
  methods: {
    rChangeVertycode () {
      this.vertycodeSrc = '/api/vertycode/' + Date.now()
    },
    rLogin() {
      let _this = this
      _this.$refs.formRef.validate((valid, msg) => {
         if (valid) {

           createUser(this.formData).then(function(resp) {
             let respData = resp.data || {}
             let data = respData.data || {}
             if (respData.code === 20000) {
               _this.$message({
                  message: respData.message || '注册成功',
                  onClose: ()=>{
                    location.replace('/')
                  }
                });
             } else {
               _this.$message({
                  message: respData.message || '注册失败',
                  type: 'warning'
                });
             }

         })
         } else {
           _this.$message({
              message: msg || '请正确填写表单',
              type: 'warning'
            });
           return false;
         }
       });
    }
  }
}
</script>
<style lang="scss" scoped>
.login {
  margin-top: 200px;
  padding: 50px;
  box-shadow: 0 0 5px #eee;
  .title {
    margin-top: -20px;
    line-height: 40px;
    font-size: 24px;
    text-align: center;
  }
  .vertycode {
    display: block;
    width: auto;
    height: 40px;
    margin: 0 auto;
    background-color: #fff;
  }
}
</style>
