<template>
  <div class="logout">
    <div class="tc">
      {{message}}，{{time}}秒后跳转到{{page}}...
    </div>
  </div>
</template>
<script>
const {logoutWeb} = require('interface/passport')
export default {
  name: "",
  layout: 'web/none',
  data: () => ({
    time: 3,
    page: '登录页',
    message: '退出成功'
  }),
  mounted(ctx) {
    let _this = this
    // const cookie = _this.$store.state.cookie
    logoutWeb().then(function(resp) {
      let respData = resp.data || {}

      _this.message = respData.message
      if (respData.code === 20000) {
        _this.page = '登录页'
      } else {
        _this.message = '退出失败'
        _this.page = '上一页'
      }

      let timer = setInterval(() => {
        _this.time = --_this.time
        if (_this.time < 1) {
          clearInterval(timer)
          if (respData.code === 20000) {
            _this.$router.replace({name: 'login'})
          } else {
            _this.$router.go(-1)
          }
        }
      }, 1000)
    })
  },
  // asyncData (ctx) {
  //   // const headers = ctx.req && ctx.req.headers
  //   // //return logout({headers: {cookie: headers.cookie}}).then(function(resp) {
  //   // return logout({headers}).then(function(resp) {
  //   //   let respData = resp.data || {}
  //   //   return respData
  //   // })
  // }
}
</script>
<style lang="scss" scoped>
.logout {
  margin-top: 200px;
  font-size: 32px;
}
</style>
