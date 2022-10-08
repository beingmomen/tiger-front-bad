<template>
  <div>
    <nuxt-link to="/panel/users"> users</nuxt-link>
  </div>
</template>

<script>
export default {
  layout: "admin",
  name: "slug",
  props: {
    test: String,
  },
  mounted() {
    console.warn("test", this.test);
    console.warn("route", this.$route);
  },
};
</script>

<style lang="scss" scoped>
</style>
