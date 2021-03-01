<template>
  <div v-if='!route.hidden'>
    <el-menu-item
      v-if='hasOneShowingChild(route.children, route)'
      :index="resolvePath(onlyOneChild.path)"
    >
      <i
        v-if='onlyOneChild.meta.icon'
        class="el-icon-menu"
      ></i>
      <span slot="title">{{ onlyOneChild.meta && onlyOneChild.meta.title }}</span>
    </el-menu-item>

    <el-submenu
      v-else
      :index='resolvePath(onlyOneChild.path)'
    >
      <template slot="title">
        <i
          v-if='route.meta.icon'
          class="el-icon-menu"
        ></i>
        <span slot="title">{{ route.meta && route.meta.title }}</span>
      </template>

      <sidebar-item
        v-for='childRoute in route.children'
        :key='childRoute.path'
        :route='childRoute'
        :base-path='resolvePath(childRoute.path)'
      />
    </el-submenu>

  </div>
</template>

<script>
import path from "path";
export default {
  name: "SidebarItem",
  props: {
    route: Object,
    basePath: String,
  },
  data() {
    return {
      onlyOneChild: null,
    };
  },
  methods: {
    hasOneShowingChild(children = [], parent) {
      const showRoutes = children.filter((route) => !route.hidden);
      const len = showRoutes.length;
      if (showRoutes.length === 0) {
        this.onlyOneChild = { ...parent, path: "", noShowingChildren: true };
        return true;
      } else {
        this.onlyOneChild = showRoutes[0];
        return len === 1 ? true : false;
      }
    },
    resolvePath(routePath) {
      return path.resolve(this.basePath, routePath);
    },
  },
};
</script>

<style scoped lang="scss">
</style>
