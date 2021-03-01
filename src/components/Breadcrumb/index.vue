<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item
      v-for='crumb in crumbs'
      :key='crumb.path'
      :to='crumb.path'
    >{{ crumb.meta.title }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  data() {
    return {
      crumbs: [],
    };
  },
  methods: {
    getBreadcrumb() {
      const matched = this.$route.matched.filter(
        (route) =>
          route.meta && route.meta.title && !route.meta.hiddenBreadcrumb
      );

      if (!this.isDashboard(matched[0])) {
        // 这是把每个面包屑前都加 dashborad ， 没有这个需求则不使用它
        matched.unshift({
          path: "/dashboard",
          meta: { title: "Dashboard" },
        });
      }

      this.crumbs = matched;
    },

    isDashboard(route) {
      return route.name && route.name === "Dashboard";
    },
  },
  created() {
    this.getBreadcrumb();
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    },
  },
};
</script>

<style scoped lang="scss">
</style>
