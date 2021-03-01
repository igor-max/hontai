<template>
  <div :class="{ 'sidebar-container--collapse': !opened }">
    <el-scrollbar>
      <el-menu
        :default-active="activeMenu"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
        :collapse='!opened'
        :collapse-transition="false"
      >
        <sidebar-item
          v-for='route in routes'
          :key='route.path'
          :route='route'
          :base-path='route.path'
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import SidebarItem from "./SidebarItem";
import { mapState } from "vuex";
export default {
  components: { SidebarItem },
  watch: {
    $route() {
      const { path } = this.$route;
      return path;
    },
  },
  computed: {
    ...mapState("permission", ["routes"]),
    ...mapState({
      opened: (state) => state.app.sidebar.opened,
    }),
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      return path;
    },
  },
};
</script>

<style scoped lang="scss">
</style>