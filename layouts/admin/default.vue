<template>
  <el-container class="container">
    <el-header height="auto">
      <my-topbar></my-topbar>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <my-aside></my-aside>
      </el-aside>
      <el-main>
        <nuxt />
      </el-main>
    </el-container>

  </el-container>
</template>

<script>
import myTopbar from 'c/admin/page/topbar/index'
import myAside from 'c/admin/page/aside/index'

export default {
  name: "",
  middleware: 'admin/passport',
  components: {
    myTopbar,
    myAside
  },
  data: () => ({

  })
}
</script>
<style lang="scss">
</style>
