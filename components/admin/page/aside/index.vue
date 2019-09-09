<template lang="html">
<el-row class="tac">
  <el-col :span="24">
    <el-menu
      :default-active="current"
      class="el-menu-vertical-demo"
      :router = "true"
      @open="handleOpen"
      @close="handleClose">
      <el-menu-item index="admin" :route="{name: 'admin'}">
        <i class="el-icon-house"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-document"></i>
          <span>所有文章</span>
        </template>
        <el-menu-item-group>
          <!-- <template slot="title">分组一</template> -->
          <el-menu-item index="item.name" :route="{path: '/admin/' + item.router}" v-for="item in tableData" :key="item._id">{{item.name}}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="admin-category" :route="{name: 'admin-category'}">
        <i class="el-icon-menu"></i>
        <span slot="title">所有分类</span>
      </el-menu-item>

    </el-menu>
  </el-col>

</el-row>
</template>

<script>

export default {
  data () {
    return {
      tableData: this.$store.state.categoryList
    }
  },
  computed: {
    current () {
      let aName = this.$route.path.split('/').splice(1, 2)
      return aName.join('-')
    }
  },
  methods: {
    handleOpen(key, keyPath) {
    },
    handleClose(key, keyPath) {
    }
  }
}
</script>

<style lang="css" scoped>
</style>
