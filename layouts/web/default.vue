<template>
  <el-container class="container">
    <el-header height="auto">
      <my-topbar></my-topbar>
      <my-haader></my-haader>
    </el-header>
    <el-main>
      <nuxt />
    </el-main>
    <el-footer height="auto">
      <my-footer></my-footer>
    </el-footer>
  </el-container>
</template>

<script>
import myTopbar from 'c/web/page/topbar/index'
import myHaader from 'c/web/page/header/index'
import myFooter from 'c/web/page/footer/index'

export default {
  name: "",
  components: {
    myTopbar,
    myHaader,
    myFooter
  },
  data: () => ({

  }),
  watch: {
     "$route" () {
       location.reload()
     }
  },
}
</script>
<style lang="scss">
</style>
