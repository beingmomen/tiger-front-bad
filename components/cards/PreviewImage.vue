<template>
  <b-col :lg="lg" :md="md" :sm="sm">
    <b-card-code class="border border-3" style="height: 400px">
      <b-img-lazy :src="url" fluid class="w-100 h-100 preview" />
    </b-card-code>
  </b-col>
</template>

<script>
import BCardCode from "~/@core/components/b-card-code/BCardCode.vue";
export default {
  props: {
    module: String,
    storeKey: String,
    path: String,
    lg: {
      type: String,
      default: "6",
    },
    md: {
      type: String,
      default: "6",
    },
    sm: {
      type: String,
      default: "12",
    },
  },
  data() {
    return {};
  },
  computed: {
    url() {
      let url = `${this.$config.NODE_URL_images}/${this.path}/${
        this.$store.getters[`${this.module}/get${this.storeKey}`]
      }`;
      return url;
    },
  },
  components: {
    BCardCode,
  },
};
</script>

<style lang="scss" scoped>
.preview {
  object-fit: contain;
}
</style>
