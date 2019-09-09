<template>
  <el-row :gutter="20" class="page">
    <el-col :span="24">
      <template v-if="list.length">
      <div class="item" v-for="item in list">
        <h1>
          <nuxt-link :to="'/' + item.category.router + '/' + item._id">{{item.title}}</nuxt-link>
        </h1>
        <div class="info">
          <span>
            <i class="el-icon-time"></i>
            <b>{{renderDate(item.create_at)}}</b>
          </span>
          <span v-if="item.tag.length">
            <i class="el-icon-link"></i>
            <nuxt-link :to="'/tag/' + t" v-for="(t, index) in item.tag" :key="index" class="mr10">{{t}}</nuxt-link>
          </span>
          <span>
            <i class="el-icon-folder"></i>
            <nuxt-link :to="'/' + item.category.router">{{item.category.name}}</nuxt-link>
          </span>
        </div>
        <div class="main" v-html="item.summary">
        </div>
        <nuxt-link :to="'/' + item.category.router + '/' + item._id" class="readmoreBtn">阅读全文</nuxt-link>
      </div>
      </template>
      <div class="tc" v-else>已经没有数据了</div>
    </el-col>
  </el-row>
</template>
<script>
import {renderDate} from 'assets/js/utils/index.js'

export default {
  name: "",
  props: {
    list: Array
  },
  data: () => ({

  }),
  methods: {
    renderDate
  }
}
</script>
<style lang="scss" scoped>

</style>
