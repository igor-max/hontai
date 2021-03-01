<template>
  <div class="navbar">
    <fold-sidebar-btn class="fold-sidebar-btn" />
    <breadcrumb class="breadcrumb" />
    <div class="right-menu">
      <el-dropdown size="mini">
        <el-avatar class="el-dropdown-link"> user </el-avatar>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native='handleToHome'>首页</el-dropdown-item>
          <el-dropdown-item
            divided
            @click.native='handleLogout'
          >退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import FoldSidebarBtn from "@/components/FoldSidebarBtn";
import Breadcrumb from "@/components/Breadcrumb";
import { logout } from "@/api/login.js";
import { removeToken } from "@/utils/auth.js";
export default {
  components: {
    FoldSidebarBtn,
    Breadcrumb,
  },
  methods: {
    handleLogout() {
      logout();
      removeToken();
      this.$router.push("/login");
    },
    handleToHome() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped lang="scss">
.fold-sidebar-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  float: left;
  width: 50px;
  height: 50px;
  font-size: 22px;
  cursor: pointer;
  margin-right: 10px;
}

.breadcrumb {
  float: left;
  height: 100%;
  line-height: 50px;
}

.right-menu {
  display: flex;
  align-items: center;
  float: right;
  height: 50px;
  padding-right: 15px;
}

.el-dropdown-link {
  cursor: pointer;
}
</style>
