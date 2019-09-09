<template>
  <el-row class="topbar">
    <el-col :span="24" class="tr">
      欢迎您<span class="username"> {{user.nickname}} </span>
      [<nuxt-link :to="{name: 'admin-logout'}" class="logoutBtn">退出</nuxt-link>]
    </el-col>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
      user: this.$store.state.admin.token.adminInfo
    }
  },
  created() {
    //do something after creating vue instance
    //console.log(this.$store.state.admin.token)
  }
}
</script>

<style lang="scss" scoped>
  .topbar {
    height: 45px;
    line-height: 45px;
    margin-top: 8px;
    padding-right: 20px;
    font-size: 12px;
    background-color: #222;
    color: #fff;
    .logoutBtn {
      color: #72c02c;
    }
    a {
      padding: 0 5px;
    }
  }
</style>
