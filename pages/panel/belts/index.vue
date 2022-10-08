<template>
  <b-col cols="12">
    <TablesTa title="belt" :headers="headers" :module="module" />
  </b-col>
</template>

<script>
export default {
  name: "belts",
  layout: "admin",
  async asyncData({ $axios, store, $toast }) {
    await $axios.$get(`/belts`).then((res) => {
      store.dispatch("panel/belts/getAllDataFromApi", res);
    });
    return {};
  },
  data() {
    return {
      module: "panel/belts",
      headers: [
        { key: "name", label: "Name", sortable: true },
        { key: "color", label: "Color", sortable: true },
        "actions",
      ],
    };
  },
  components: {},
};
</script>

<style lang="scss" scoped>
</style>
