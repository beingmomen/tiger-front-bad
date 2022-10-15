<template>
  <SettingsLayout :title="$t('sidebar.belts')" :breadcrumbs="breadcrumbs">
    <template #content>
      <b-col cols="12">
        <TablesTa title="belt" :headers="headers" :module="module" />
      </b-col>
    </template>
  </SettingsLayout>
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
      breadcrumbs: [
        {
          text: this.$t("sidebar.belts"),
          active: true,
          to: this.localePath("/panel/belts"),
        },
      ],
      headers: [
        { key: "name", label: "Name", sortable: true },
        { key: "color", label: "Color", sortable: true },
        {
          key: "activities",
          label: "Activity",
          sortable: false,
          formatter: (value, key, item) => {
            let data = [];
            value.forEach((el) => data.push(el.name));
            return data;
          },
        },
        "actions",
      ],
    };
  },
  components: {},
};
</script>

<style lang="scss" scoped>
</style>
