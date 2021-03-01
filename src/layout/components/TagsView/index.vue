<template>
  <div>
    <!-- <el-scrollbar class="tags-scrollbar"> -->
    <el-tag
      v-for="(tag, i) in tags"
      class="dy-tag"
      :key="tag.path"
      :closable='tag.closeable'
      @close='handleCloseTag(tag, i)'
      @click='handleClickTag(tag)'
      size='mini'
      :effect='$route.meta.title === tag.meta.title ? "dark" : "plain"'
    >
      {{ tag.meta.title }}
    </el-tag>
    <!-- </el-scrollbar> -->
  </div>
</template>

<script>
export default {
  name: "TagsView",
  data() {
    return {
      tags: [],
    };
  },
  methods: {
    handleCloseTag(tag, i) {
      const len = this.tags.length;
      this.tags.splice(i, 1);
      // this.$router.go(-1); // 删除不可以直接 go(-1) 因为如果在 tag 中切换会有bug

      // 删除的是选中的 tag
      if (tag.meta.title === this.$route.meta.title) {
        const index = i === len - 1 ? i - 1 : i; // 最后一个取倒数第二个,不是最后一个取当前
        this.$router.push(this.tags[index].path);
      }
      // 不是直接删除
    },
    handleClickTag(tag) {
      this.$router.push(tag.path);
    },
    initTags() {
      this.tags.push({
        path: "/dashboard",
        meta: {
          title: "Dashboard",
        },
        closeable: false,
      });
    },
    addTag() {
      const { path } = this.$route;
      const flag = this.tags.some((v) => v.path === path);
      !flag &&
        this.tags.push({
          ...this.$route,
          closeable: true,
        });
    },
  },
  created() {
    this.initTags();
    this.addTag();
  },
  watch: {
    $route() {
      this.addTag();
    },
  },
};
</script>

<style lang="scss" scoped>
// .el-scrollbar {
//   width: 100%;
//   height: 100%;
//   background-color: pink;

//   &__view {
//     white-space: nowrap;
//   }
// }

// .el-scrollbar .el-scrollbar__wrap .el-scrollbar__view {
// white-space: nowrap;
// }

// 450
// 410  41/45
// 40   4/45

.dy-tag {
  margin-right: 5px;
  cursor: pointer;

  &:last-child {
    margin-right: 0;
  }
}
</style>
