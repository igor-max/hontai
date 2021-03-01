<template>
  <div @click='toggleSideBar'>
    <i
      class="el-icon-s-unfold"
      v-if='sidebar.opened'
    ></i>
    <i
      class="el-icon-s-fold"
      v-else
    ></i>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState("app", ["sidebar"]),
  },
  methods: {
    ...mapActions("app", ["toggleSideBar"]),
  },
};
</script>

<style scoped lang="scss">
</style>
