<template>
  <div class="app-wrapper">
    <sidebar class="sidebar-container" />
    <div :class="{'main-container': true, 'main-container--open': !sidebar.opened}">

      <div :class="{'main-header': true, 'fixed-header': fixedHeader, 'fixed-header--open': !sidebar.opened, 'show-tags': showTags}">
        <navbar class="navbar-container" />
        <tags-view
          class="tags-wrapper"
          v-if='showTags'
        />
      </div>
      <app-main class="app-main" />
    </div>
  </div>
</template>

<script>
import { Sidebar, Navbar, TagsView, AppMain } from "./components";
import { mapState } from "vuex";
export default {
  components: {
    Sidebar,
    Navbar,
    TagsView,
    AppMain,
  },
  computed: {
    ...mapState("settings", ["fixedHeader", "showTags"]),
    ...mapState("app", ["sidebar"]),
  },
};
</script>

<style scoped lang="scss">
.main-container {
  height: 100%;
  padding-left: 220px;

  &--open {
    padding-left: 64px;
  }
}

.main-header {
  width: 100%;
  height: 50px;
  background-color: #fff;

  .app-main {
    min-height: calc(100% - 50px);
  }

  &.show-tags {
    height: 85px;

    .app-main {
      min-height: calc(100% - 85px);
    }
  }
}

.fixed-header {
  // ! 这个的width应该会有问题
  position: fixed;
  z-index: 1;
  left: 220px;
  top: 0;

  &--open {
    left: 64px;
  }

  & + .app-main {
    padding-top: 50px;
  }

  &.show-tags + .app-main {
    padding-top: 85px;
  }
}

.navbar-container {
  height: 50px;
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.1);
}

.tags-wrapper {
  padding: 0 14px;
  height: 34px;
  line-height: 34px;
  border-bottom: 1px solid #ccc;
}
</style>
