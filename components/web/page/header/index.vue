<template lang="html">
  <el-row :gutter="0" class="header">
    <el-col :span="8">
      <div class="logo fl">
        MingHao 博客
      </div>
    </el-col>
    <el-col :span="16">
      <ul class="nav fr" >
        <li :class="isCurrent()">
          <a href="/" >首页</a>
        </li>
        <li v-for="item in navList" :class="isCurrent(item.router)">
          <nuxt-link :to="'/'+item.router">{{item.name}}</nuxt-link>
        </li>
      </ul>
    </el-col>
  </el-row>
</template>

<script>

export default {
  componments: {
  },
  data () {
    return {
      navList: this.$store.state.categoryList
    }
  },
  methods: {
    isCurrent (router = '') {
      let currentPath = this.$route.path.replace(/^\//, '').replace(/\/$/, '')
      let navPath = router.replace(/^\//, '').replace(/\/$/, '')
      // 首页
      if (!currentPath && currentPath === navPath) {
        return'current'
      }
      // 其他页面
      if (navPath && currentPath.indexOf(navPath) > -1) {
        return'current'
      }
      return ''
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  border-bottom: solid 2px #eee;
  .logo {
    font-size: 24px;
  }
  .nav {
    margin-top: 10px;
    li {
      float: left;
      &.current a {
        color: #72c02c;
      }
      &.current a:after {
        opacity: 1;
      }
    }
    a {
      display: block;
      position: relative;
      padding: 0 20px;
      line-height: 40px;
      font-size: 16px;
      color: #687074;
      &:after {
        content: " ";
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 2px;
        opacity: 0;
        transition: opacity .8s;
        overflow: hidden;
        background-color: #72c02c;
      }
      &:hover:after {
        opacity: 1;
      }

    }
  }
}
</style>
