<template>
  <el-row class="topbar">
    <el-col :span="24" class="tr">
      <template v-if="user">
        欢迎您<span class="username">{{user.nickname}}</span>
        [<nuxt-link :to="{name: 'logout'}" class="logoutBtn"> 退出 </nuxt-link>]
      </template>
      <template v-else>
        <nuxt-link :to="{name: 'register'}">注册</nuxt-link> |
        <nuxt-link :to="{name: 'login'}">登录</nuxt-link>
      </template>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
      user: this.$store.state.web.token.userInfo
    }
  }
}
</script>

<style lang="scss" scoped>
  .topbar {
    line-height: 20px;
    margin-top: 8px;
    font-size: 12px;
    .logoutBtn {
      color: #72c02c;
    }
  }
</style>
